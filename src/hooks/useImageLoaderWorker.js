import { useEffect, useRef, useState, useCallback } from 'react';

export function useImageLoaderWorker(totalFrames, framePath) {
    const workerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
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
                case 'LOADED':
                    // Receive all transferred ImageBitmaps from worker
                    setImageBitmaps(payload.imageBitmaps);
                    setIsLoaded(true);
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

    const getFrame = useCallback((index) => {
        workerRef.current?.postMessage({
            type: 'GET_FRAME',
            payload: { index }
        });
    }, []);

    return { isLoaded, imageBitmaps, getFrame };
}
