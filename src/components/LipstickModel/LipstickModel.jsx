import { useRef, useEffect, useCallback } from 'react';
import { useMotionValueEvent, useTransform } from 'motion/react';
import './LipstickModel.css';
import { useImageLoaderWorker } from '../../hooks/useImageLoaderWorker';
import { useCanvasAnimation } from '../../hooks/useCanvasAnimation';
import { MOBILE_QUERY } from '../../lib/breakpoints';

const TOTAL_FRAMES = 140;

function LipstickModel({ scrollYProgress }) {
    const isMobile = window.matchMedia(MOBILE_QUERY).matches;
    const lastIndexRef = useRef(1);

    const framePath = useCallback((index) => (
        `/assets/image-sequenz/Render${index.toString().padStart(4, '0')}.webp`
    ), []);

    const { isReady, imageBitmaps } = useImageLoaderWorker(TOTAL_FRAMES, framePath);

    // horizontal position: 0 = left edge, 0.5 = center, 1 = right edge
    const offsetXMobile = useTransform(
        scrollYProgress,
        [0, 0.15, 0.5, 1],
        [0.75, 0.5, 0.5, 0.5]
    );

    const offsetXDesktop = useTransform(
        scrollYProgress,
        [0, 0.15, 0.5, 1],
        [0.1, 0.5, 0.5, 0.5]
    );

    const offsetY = useTransform(
        scrollYProgress, [0, 0.6, 1], [0.6, 1, 1]
    );

    const scale = useTransform(
        scrollYProgress, [0,  1], [0.7, 0.5]
    );

    const { canvasRef, drawFrame, scheduleFrame } = useCanvasAnimation({
        frames: imageBitmaps,
        totalFrames: TOTAL_FRAMES,
        isMobile,
        getHorizontalOffset: () => isMobile ? offsetXMobile.get() : offsetXDesktop.get(),
        getVerticalOffset: () => isMobile ? offsetY.get() : 0.5,
        getScale: () => isMobile ? scale.get() : 1
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
