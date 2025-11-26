import { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'motion/react';
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
    const xForMobile = useTransform(
        scrollYProgress, [0, 0.2],
        ['25%', '-25%']
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

        const MAX_DRAW_WIDTH = 1000;

        const img = images[index - 1];
        if (!img.complete) {
            img.onload = () => drawFrame(index);
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let drawWidth, drawHeight;
        drawWidth = Math.min(canvas.width, MAX_DRAW_WIDTH);
        drawHeight = img.naturalHeight * (drawWidth / img.naturalWidth);

        // center image
        const x = (canvas.width - drawWidth) / 2;
        const y = (canvas.height - drawHeight) / 2;

        ctx.drawImage(img, x, y, drawWidth, drawHeight);
    }, [images]);
    
    return (
        <div ref={animationSpacer} style={{ position: 'relative', height: '300vh', width: '100%' }}>
            <motion.canvas
                id='lipstick'
                ref={canvasRef}
                aria-hidden='true'
                role='presentation'
                style={{
                    position: 'sticky',
                    left: '0',
                    top: '0',
                    width: '100vw',
                    height: '100vh',
                    x: isMobile ? xForMobile : '0%',
                }}
            />
            <UspList />
        </div>
    )
}

export default LipstickAnimation