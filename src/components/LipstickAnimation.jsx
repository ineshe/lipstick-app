import { useRef, useEffect, useMemo, useCallback, useState, use } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform, scale } from 'motion/react';
import './LipstickAnimation.css';
import UspList from './UspList';
import useIsMobile from '../hooks/use-is-mobile';

function LipstickAnimation() {
    const animationSpacer = useRef(null);
    const canvasRef = useRef(null);
    const frameCount = 140;
    const { scrollYProgress } = useScroll({
        target: animationSpacer,
        offset: ['start start', 'end end']
    });
    const currentFrame = index => (
        `/assets/image-sequenz/Render${index
        .toString()
        .padStart(4, '0')}.webp`
    );
    const { isMobile } = useIsMobile();
    const xOffsetNormalized = useTransform(
        scrollYProgress, 
        [0, 0.2],
        isMobile ? [-600, 600] : [0, 0]
    );

    const lastIndexRef = useRef(1);
    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        const index = Math.max(1, Math.min(frameCount, Math.floor(latest * frameCount)));
        if (index !== lastIndexRef.current) {
            lastIndexRef.current = index; 
            requestAnimationFrame(() => {
                drawFrame(index);
            });
        }
    });

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {

    });
    
    const images = useMemo(() => {
        const arr = [];
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            if(img.decode) {
                img.decode().catch(() => {});
            }
            arr.push(img);
        }
        return arr;
    }, [frameCount, currentFrame]);

    useEffect(() => {
        const handleResize = () => drawFrame(lastIndexRef.current);
        window.addEventListener('resize', handleResize);
        drawFrame(lastIndexRef.current);
    }, []);

    const drawFrame = useCallback((index) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if(!ctx) return;

        const img = images[index - 1];
        if (!img.complete) {
            img.onload = () => drawFrame(index);
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        var drawWidth, drawHeight;
        drawHeight = canvas.height;
        drawWidth = img.naturalWidth * (drawHeight / img.naturalHeight);

        if(canvas.width < canvas.height) { 
            drawHeight = drawHeight * 0.75;
            drawWidth = drawWidth * 0.75;
        }

        // center image
        var x = (canvas.width - drawWidth) / 2;
        var y = (canvas.height - drawHeight) / 2;

        ctx.drawImage(img, xOffsetNormalized.get(), 0, img.naturalWidth, img.naturalHeight, x, y, drawWidth, drawHeight);
    }, [images]);
    
    return (
        <div className="lipstick-animation-wrapper" ref={animationSpacer}>
            <motion.canvas
                id='lipstick'
                ref={canvasRef}
                aria-hidden='true'
                role='presentation'
                style={{
                    position: 'sticky',
                    left: '0',
                    top: '0',
                    width: '100%',
                    height: '100vh',
                }}
            />
            <UspList />
        </div>
    )
}

export default LipstickAnimation