import { useRef, useEffect, useCallback } from 'react';
import { useMotionValueEvent, useTransform } from 'motion/react';
import './LipstickModel.css';
import useIsMobile from '../hooks/use-is-mobile';
import { useImageLoaderWorker } from '../hooks/useImageLoaderWorker';

function LipstickModel({ scrollYProgress }) {
    const animationSpacer = useRef(null);
    const canvasRef = useRef(null);
    const totalFrames = 140;
    const framePath = useCallback((index) => (
        `/assets/image-sequenz/Render${index
        .toString()
        .padStart(4, '0')}.webp`
    ), []);
    
    const { isMobile } = useIsMobile();
    const { isLoaded, imageBitmaps } = useImageLoaderWorker(totalFrames, framePath);

    const imgMiddle = useTransform(
        scrollYProgress, 
        [0, 0.1], 
        isMobile ? [0.275, 0.7] : [1, 0.5]
    );

    const lastIndexRef = useRef(1);
    const reqFrameRef = useRef(null);
    const ctxRef = useRef(null);
    const lastDrawnIndexRef = useRef(null);

    // Store imageBitmaps in a ref for stable access in drawFrame
    const imageBitmapsRef = useRef(imageBitmaps);
    useEffect(() => {
        imageBitmapsRef.current = imageBitmaps;
    }, [imageBitmaps]);

    const drawFrame = useCallback((index) => {
        if (lastDrawnIndexRef.current === index) return;

        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!ctx || !canvas) return;

        const img = imageBitmapsRef.current[index - 1];
        if (!img) return;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgNaturalWidth = img.width;
        const imgNaturalHeight = img.height;

        let drawHeight = canvasHeight;
        let drawWidth = imgNaturalWidth * (drawHeight / imgNaturalHeight);

        if (isMobile) { 
            drawHeight *= 0.75;
            drawWidth *= 0.75;
        }

        const x = canvasWidth / 2 - drawWidth * imgMiddle.get();
        const y = (canvasHeight - drawHeight) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, x, y, drawWidth, drawHeight);
        
        lastDrawnIndexRef.current = index;
    }, [isMobile, imgMiddle]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.max(
            1,
            Math.min(totalFrames, Math.floor(latest * totalFrames))
        );
        lastIndexRef.current = index;
        if (reqFrameRef.current) cancelAnimationFrame(reqFrameRef.current);
        reqFrameRef.current = requestAnimationFrame(() => {
            drawFrame(index);
            reqFrameRef.current = null;
        });
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        ctxRef.current = canvas.getContext('2d');

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            lastDrawnIndexRef.current = null;
            drawFrame(lastIndexRef.current);
        };

        window.addEventListener('resize', handleResize);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        return () => {
            window.removeEventListener('resize', handleResize);
            if (reqFrameRef.current) cancelAnimationFrame(reqFrameRef.current);
        };
    }, [drawFrame]);

    // Draw frame when images are loaded
    useEffect(() => {
        if (isLoaded) {
            drawFrame(lastIndexRef.current);
        }
    }, [isLoaded, imageBitmaps, drawFrame]);
    
    return (
        <div className="lipstick-animation-wrapper" ref={animationSpacer}>
            <canvas
                id='lipstick'
                ref={canvasRef}
                aria-hidden='true'
                role='presentation'
                style={{
                    position: 'sticky',
                    inset: '0',
                    zIndex: 7,
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                }}
            />

            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    height: '100%',
                    zIndex: 5,
                }}
            />
        </div>
    )
}

export default LipstickModel