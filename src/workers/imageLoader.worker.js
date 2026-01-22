let totalFrames = 0;

self.onmessage = async (e) => {
    const { type, payload } = e.data;

    switch (type) {
        case 'INIT':
            totalFrames = payload.totalFrames;
            const framePaths = payload.framePaths;
            
            // Priority frames: first frame, and evenly distributed keyframes
            const priorityIndices = [
                0,  // First frame (visible immediately)
                Math.floor(totalFrames * 0.25),
                Math.floor(totalFrames * 0.5),
                Math.floor(totalFrames * 0.75),
                totalFrames - 1  // Last frame
            ];

            // Load priority frames first
            const priorityPromises = priorityIndices.map(async (index) => {
                const imageBitmap = await loadImage(framePaths[index]);
                // Send each priority frame immediately as it loads
                if (imageBitmap) {
                    self.postMessage({
                        type: 'FRAME_LOADED',
                        payload: { index, imageBitmap }
                    }, [imageBitmap]);
                }
            });
            
            await Promise.all(priorityPromises);
            
            // Signal that priority frames are done
            self.postMessage({
                type: 'PRIORITY_COMPLETE',
                payload: { priorityIndices }
            });

            // Load remaining frames in batches
            const remainingIndices = Array.from({ length: totalFrames }, (_, i) => i)
                .filter(i => !priorityIndices.includes(i));
            
            const batchSize = 10;
            let loadedCount = priorityIndices.length;
            
            for (let i = 0; i < remainingIndices.length; i += batchSize) {
                const batch = remainingIndices.slice(i, i + batchSize);
                
                const batchPromises = batch.map(async (index) => {
                    const imageBitmap = await loadImage(framePaths[index]);
                    // Send each frame as it loads
                    if (imageBitmap) {
                        self.postMessage({
                            type: 'FRAME_LOADED',
                            payload: { index, imageBitmap }
                        }, [imageBitmap]);
                    }
                    loadedCount++;
                });
                
                await Promise.all(batchPromises);

                // Report progress
                self.postMessage({
                    type: 'PROGRESS',
                    payload: {
                        loaded: loadedCount,
                        total: totalFrames,
                        percent: Math.round((loadedCount / totalFrames) * 100)
                    }
                });
            }

            // Signal all frames are loaded
            self.postMessage({
                type: 'ALL_LOADED',
                payload: { total: totalFrames }
            });
            break;

        case 'CLEANUP':
            // Nothing to clean up - all bitmaps transferred to main thread
            break;
    }
};

async function loadImage(path) {
    try {
        const response = await fetch(path);
        const blob = await response.blob();
        return await createImageBitmap(blob);
    } catch (error) {
        console.error(`Failed to load image: ${path}`, error);
        return null;
    }
}
