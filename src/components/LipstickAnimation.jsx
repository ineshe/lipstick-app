import { useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'motion/react';
import './LipstickAnimation.css';
import UspList from './UspList';
import Stage from './StageText';

function LipstickAnimation() {
    const animationWrapper = useRef(null);
    const canvasRef = useRef(null);
    const frameCount = 140;
    const { scrollYProgress } = useScroll({
        target: animationWrapper,
        offset: ['start start', 'end end']
    });
    const currentFrame = index => (
        `/assets/image-sequenz/Render${index
        .toString()
        .padStart(4, '0')}.webp`
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

        const img = images[index - 1];
        if (!img.complete) {
            img.onload = () => drawFrame(index);
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // "Cover"-Verhalten wie bei CSS background-size: cover
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.naturalWidth / img.naturalHeight;

        let drawWidth, drawHeight;
        if (imgRatio > canvasRatio) {
            // Bild ist breiter als Canvas, also an Höhe anpassen
            drawHeight = canvas.height;
            drawWidth = img.naturalWidth * (canvas.height / img.naturalHeight);
        } else {
            // Bild ist höher als Canvas, also an Breite anpassen
            drawWidth = canvas.width;
            drawHeight = img.naturalHeight * (canvas.width / img.naturalWidth);
        }

        // center image
        const x = (canvas.width - drawWidth) / 2;
        const y = (canvas.height - drawHeight) / 2;

        ctx.drawImage(img, x, y, drawWidth, drawHeight);
    }, [images]);
    
    return (
        <div ref={animationWrapper} style={{ position: 'relative', height: '300vh', width: '100%' }}>
            <canvas
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