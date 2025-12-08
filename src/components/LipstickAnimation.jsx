import { useRef, useEffect, useMemo, useCallback, useState, use } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform, scale } from 'motion/react';
import './LipstickAnimation.css';
import UspList from './UspList/UspList';
import useIsMobile from '../hooks/use-is-mobile';
import Stage from './StageText';

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
        Math.min(frameCount, Math.floor(latest * frameCount))
      );
      lastIndexRef.current = index;
      if (reqFrameRef.current) cancelAnimationFrame(reqFrameRef.current);
      reqFrameRef.current = requestAnimationFrame(() => {
        drawFrame(index);
        reqFrameRef.current = null;
      });
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
        return () => {
            window.removeEventListener('resize', handleResize);
            if (reqFrameRef.current) cancelAnimationFrame(reqFrameRef.current);
        };
    });

    const drawFrame = useCallback((index) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if(!ctx) return;

        const img = images[index - 1];
        if (!img.complete) {
            img.onload = () => drawFrame(index);
            return;
        }

        // set canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        // set draw dimensions and resets context
        let drawHeight = canvas.height;
        let drawWidth = img.naturalWidth * (drawHeight / img.naturalHeight);

        if(isMobile) { 
            drawHeight *= 0.75;
            drawWidth *= 0.75;
        }

        var x = canvas.width / 2 - drawWidth * imgMiddle.get();
        var y = (canvas.height - drawHeight) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, x, y, drawWidth, drawHeight);

    }, [images, isMobile, imgMiddle]);
    
    return (
        <div className="lipstick-animation-wrapper" ref={animationSpacer}>
            
            <canvas
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
                    zIndex: 7,
                }}
            />
            <Stage />
            <UspList />
        </div>
    )
}

export default LipstickAnimation