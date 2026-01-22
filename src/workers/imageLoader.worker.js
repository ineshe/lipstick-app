let totalFrames = 0;
let loadedCount = 0;

self.onmessage = async (e) => {
    const { type, payload } = e.data;

    switch (type) {
        case 'INIT':
            totalFrames = payload.totalFrames;
            loadedCount = 0;
            const framePaths = payload.framePaths;
            
            // Load all images
            const loadPromises = framePaths.map(async (path, index) => {
                try {
                    const response = await fetch(path);
                    const blob = await response.blob();
                    const imageBitmap = await createImageBitmap(blob);
                    
                    loadedCount++;
                    // Report progress
                    self.postMessage({
                        type: 'PROGRESS',
                        payload: {
                            loaded: loadedCount,
                            total: totalFrames
                        }
                    });
                    
                    return imageBitmap;
                } catch (error) {
                    console.error(`Failed to load image ${index}:`, error);
                    loadedCount++;
                    return null;
                }
            });

            const images = await Promise.all(loadPromises);
            
            // Transfer all ImageBitmaps back to main thread
            self.postMessage(
                {
                    type: 'LOADED',
                    payload: { imageBitmaps: images }
                },
                // Transfer the ImageBitmaps (they become unusable in worker after this)
                images.filter(img => img !== null)
            );
            break;

        case 'CLEANUP':
            // Nothing to clean up since bitmaps are transferred to main thread
            break;
    }
};
