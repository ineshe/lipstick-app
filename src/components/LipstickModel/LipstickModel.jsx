import { useRef, useEffect, useCallback } from 'react';
import { useMotionValueEvent, useTransform } from 'motion/react';
import './LipstickModel.css';
import useIsMobile from '../../hooks/use-is-mobile';
import { useImageLoaderWorker } from '../../hooks/useImageLoaderWorker';
import { useCanvasAnimation } from '../../hooks/useCanvasAnimation';

const TOTAL_FRAMES = 180;

function LipstickModel({ scrollYProgress }) {
    const { isMobile } = useIsMobile();
    const lastIndexRef = useRef(1);

    const framePath = useCallback((index) => (
        `/assets/image-sequenz/Render${index.toString().padStart(4, '0')}.webp`
    ), []);

    const { isReady, imageBitmaps } = useImageLoaderWorker(TOTAL_FRAMES, framePath);

    // upper to left | 0.5 center | lower to right
    const imgMiddle = useTransform(
        scrollYProgress,
        [0, 0.1, 0.5, 1],
        isMobile ? [0.275, 0.6, 0.5, 0.5] : [0.775, 0.5, 0.5, 0.5]
    );

    const { canvasRef, drawFrame, scheduleFrame } = useCanvasAnimation({
        frames: imageBitmaps,
        totalFrames: TOTAL_FRAMES,
        isMobile,
        getHorizontalOffset: () => imgMiddle.get()
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(latest * TOTAL_FRAMES)));
        lastIndexRef.current = index;
        scheduleFrame(index);
    });

    // Draw frame when images are ready or on resize
    useEffect(() => {
        if (isReady) {
            drawFrame(lastIndexRef.current);
        }
    }, [isReady, imageBitmaps, drawFrame]);

    return (
        <div className="lipstick-animation-wrapper">
            <canvas
                id='lipstick-canvas'
                ref={canvasRef}
                aria-hidden='true'
                role='presentation'
                style={{
                    opacity: isReady ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                }}
            />
        </div>
    );
}

export default LipstickModel
