import { useRef, useEffect, useCallback } from 'react';

/**
 * Hook for managing canvas-based frame animations
 * @param {Object} options
 * @param {ImageBitmap[]} options.frames - Array of ImageBitmap frames
 * @param {number} options.totalFrames - Total number of frames
 * @param {boolean} options.isMobile - Whether device is mobile
 * @param {() => number} [options.getHorizontalOffset] - Function returning horizontal offset (0-1)
 * @param {() => number} [options.getVerticalOffset] - Function returning vertical anchor (0-1)
 * @param {() => number} [options.getScale] - Function returning additional scale factor
 * @returns {Object} { canvasRef, drawFrame, isCanvasReady }
 */
export function useCanvasAnimation({
    frames,
    totalFrames,
    isMobile,
    getHorizontalOffset = () => 0.5,
    getVerticalOffset = () => 0.5,
    getScale = () => 1
}) {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const lastDrawnIndexRef = useRef(null);
    const reqFrameRef = useRef(null);

    const findNearestFrame = useCallback((targetIndex) => {
        if (frames[targetIndex - 1]) {
            return targetIndex;
        }
        
        for (let offset = 1; offset < totalFrames; offset++) {
            if (frames[targetIndex - 1 + offset]) {
                return targetIndex + offset;
            }
            if (frames[targetIndex - 1 - offset]) {
                return targetIndex - offset;
            }
        }
        return 1;
    }, [frames, totalFrames]);

    const drawFrame = useCallback((index) => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!ctx || !canvas) return;

        const actualIndex = findNearestFrame(index);
        if (lastDrawnIndexRef.current === actualIndex) return;

        const img = frames[actualIndex - 1];
        if (!img) return;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgNaturalWidth = img.width;
        const imgNaturalHeight = img.height;

        // Calculate viewport-content boundaries (90% width, max 1260px, centered)
        const maxContentWidth = 1260;
        const contentWidth = Math.min(canvasWidth * 0.9, maxContentWidth);
        const contentLeft = (canvasWidth - contentWidth) / 2;

        let drawHeight = canvasHeight;
        let drawWidth = imgNaturalWidth * (drawHeight / imgNaturalHeight);

        const scale = getScale();
        drawHeight *= scale;
        drawWidth *= scale;

        const verticalOffset = getVerticalOffset();
        const y = (canvasHeight - drawHeight) * verticalOffset;

        const horizontalOffset = getHorizontalOffset();
        // Position within viewport-content boundaries
        // horizontalOffset: 0 = left edge, 0.5 = center, 1 = right edge
        const x = contentLeft + (contentWidth * horizontalOffset) - (drawWidth / 2);
        
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, x, y, drawWidth, drawHeight);
        
        lastDrawnIndexRef.current = actualIndex;
    }, [frames, isMobile, getHorizontalOffset, getVerticalOffset, getScale, findNearestFrame]);

    const scheduleFrame = useCallback((index) => {
        if (reqFrameRef.current) cancelAnimationFrame(reqFrameRef.current);
        reqFrameRef.current = requestAnimationFrame(() => {
            drawFrame(index);
            reqFrameRef.current = null;
        });
    }, [drawFrame]);

    // Setup canvas and handle resize
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        ctxRef.current = canvas.getContext('2d');

    let resizeTimeout;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            lastDrawnIndexRef.current = null;
        }, 100); // adjust delay as needed
    };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (resizeTimeout) clearTimeout(resizeTimeout);
            if (reqFrameRef.current) cancelAnimationFrame(reqFrameRef.current);
        };
    }, []);

    return {
        canvasRef,
        drawFrame,
        scheduleFrame,
        isCanvasReady: !!ctxRef.current
    };
}

export default useCanvasAnimation;
