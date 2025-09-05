import { useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, useScroll, useMotionValueEvent, useTransform } from 'motion/react'
import './Lipstick.css'

function UspList() {
    const usps = [{
        id: 0,
        headline: 'Pflegend',
        content: 'Intensive Farbe trifft auf pflegende Inhaltsstoffe – für samtweiche Lippen mit jedem Auftrag.'
    }, {
        id: 1,
        headline: 'Langanhaltend',
        content: 'Strahlende Lippenfarbe, die den ganzen Tag hält – ohne Nachschminken, ohne Kompromisse.'
    }, {
        id: 2,
        headline: 'Glanz-Effekt',
        content: 'Spieglein, Glanz – unwiderstehlich strahlende Lippen mit nur einem Auftrag.'
    }];

    const uspList = usps.map((usp) => {
        const start = 50;
        const step = 100;
        const top = `${start + (usp.id + 1) * step}vh`;
        const right = usp.id % 2 === 1 ? '0px' : 'undefined';

        return (
            <motion.div 
                style={{
                    position: 'absolute',
                    width: '35%',
                    padding: '1rem',
                    top,
                    right,
                }}
                key={usp.id}
                initial= {{ opacity: 0 }}
                whileInView={{ 
                    opacity: 1,
                    transition: { 
                        duration: 0.1,
                        default: { ease: 'easeOut' }
                    }
                }}
                viewport={{ margin: '-30% 0px -30% 0px' }}
            >
                <h2>{usp.headline}</h2>
                <p>{usp.content}</p>
            </motion.div>
        );
    });

    return uspList;
}

function Lipstick() {
    const animationWrapper = useRef(null);
    const canvasRef = useRef(null);
    const frameCount = 100;
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

        const scale = canvas.width / img.naturalWidth;
        const imgHeight = img.naturalHeight * scale;

        // center image vertically
        const y = (canvas.height - imgHeight) / 2;

        ctx.drawImage(img, 0, y, canvas.width, imgHeight);
    }, [images]);
    
    return (
        <>
            <div ref={animationWrapper} className='viewport-content' style={{ position: 'relative', height: '500vh', width: '100%' }}>
                <canvas
                    ref={canvasRef}
                    aria-hidden='true'
                    role='presentation'
                    style={{
                        position: 'fixed',
                        left: '0',
                        top: '0',
                        width: '100%',
                        height: '100%',
                    }}
                />
                <UspList />
            </div>
            <div style={{ height: '100vh', width: '100%' }}></div>
        </>
    )
}

export default Lipstick