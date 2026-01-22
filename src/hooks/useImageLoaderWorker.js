import { useEffect, useRef, useState } from 'react';

export function useImageLoaderWorker(totalFrames, framePath) {
    const workerRef = useRef(null);
    const [isReady, setIsReady] = useState(false); // Priority frames loaded
    const [imageBitmaps, setImageBitmaps] = useState([]);
    
    useEffect(() => {
        // Create the worker
        workerRef.current = new Worker(
            new URL('../workers/imageLoader.worker.js', import.meta.url),
            { type: 'module' }
        );

        const worker = workerRef.current;

        // Handle messages from worker
        worker.onmessage = (e) => {
            const { type, payload } = e.data;

            switch (type) {
                case 'FRAME_LOADED':
                    // Add each frame as it arrives
                    setImageBitmaps(prev => {
                        const newBitmaps = [...prev];
                        newBitmaps[payload.index] = payload.imageBitmap;
                        return newBitmaps;
                    });
                    break;
                case 'PRIORITY_COMPLETE':
                    // Priority frames are ready, show UI
                    setIsReady(true);
                    break;
            }
        };

        // Generate all frame paths
        const framePaths = Array.from({ length: totalFrames }, (_, i) => framePath(i + 1));

        // Initialize the worker with frame paths
        worker.postMessage({
            type: 'INIT',
            payload: { totalFrames, framePaths }
        });

        return () => {
            worker.postMessage({ type: 'CLEANUP' });
            worker.terminate();
        };
    }, [totalFrames, framePath]);

    return { isReady, imageBitmaps };
}
