import { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform, scale } from 'motion/react';
import './LipstickModel.css';
import useIsMobile from '../hooks/use-is-mobile';

function LipstickModel({ scrollYProgress }) {
    const animationSpacer = useRef(null);
    const canvasRef = useRef(null);
    const totalFrames = 140;
    const framePath = index => (
        `/assets/image-sequenz/Render${index
        .toString()
        .padStart(4, '0')}.webp`
    );
    const { isMobile } = useIsMobile();

    const imgMiddle = useTransform(
        scrollYProgress, 
        [0, 0.1], 
        isMobile ? [0.275, 0.7] : [1, 0.5]
    );

    const lastIndexRef = useRef(1);
    const reqFrameRef = useRef(null);

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
    

    /* stores preloaded images between frames */
    const preloadedImages = useMemo(() => {
        const images = [];
        for (let fx = 1; fx <= totalFrames; fx++) {
            const image = new Image();
            image.src = framePath(fx);
            if (image.decode) {
                image.decode().catch(() => {});
            }
            images.push(image);
        }
        return images;
    }, [totalFrames, framePath]);

    const ctxRef = useRef(null);
    const lastDrawnIndexRef = useRef(null);

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
        drawFrame(lastIndexRef.current);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (reqFrameRef.current) cancelAnimationFrame(reqFrameRef.current);
        };
    }, []);

    

    // useCallback to avoid redefining on each render
    const drawFrame = useCallback((index) => {
        // Skip if already showing this frame
        if (lastDrawnIndexRef.current === index) return;

        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!ctx || !canvas) return;

        const img = preloadedImages[index - 1];
        if (!img || !img.complete || !img.naturalWidth) {
            img.addEventListener('load', () => drawFrame(index), { once: true });
            return;
        }

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgNaturalWidth = img.naturalWidth;
        const imgNaturalHeight = img.naturalHeight;

        // set draw dimensions and resets context
        let drawHeight = canvasHeight;
        let drawWidth = imgNaturalWidth * (drawHeight / imgNaturalHeight);

        if(isMobile) { 
            drawHeight *= 0.75;
            drawWidth *= 0.75;
        }

        var x = canvasWidth / 2 - drawWidth * imgMiddle.get();
        var y = (canvasHeight - drawHeight) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, 0, 0, imgNaturalWidth, imgNaturalHeight, x, y, drawWidth, drawHeight);
        
        lastDrawnIndexRef.current = index;
        
    }, [preloadedImages, isMobile, imgMiddle]);
    
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
                }}
            />

            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    height: '100%',
                    zIndex: 5,
                }}
            >
            </div>

        </div>
    )
}

export default LipstickModel