import { useRef, useEffect } from 'react';
import { motion, useInView, useSpring } from 'motion/react';
import { useIsMobile } from '../../hooks/use-is-mobile';
import StageButton from '../StageButton';
import './StageText.css';

function Stage() {
    const ref = useRef(null);
    const { isMobile } = useIsMobile();
    const isInView = useInView(ref, { amount: 0.88 });
    
    const x = useSpring(0, { stiffness: 180, damping: 35, visualDuration: 0.2 });
    const buttonSkewX = useSpring(0, { stiffness: 180, damping: 35, visualDuration: 0.2 });
    
    useEffect(() => {
        x.set(isInView || isMobile ? 0 : window.innerWidth);
        buttonSkewX.set(isInView || isMobile ? 0 : -15);
    }, [isInView, isMobile, x, buttonSkewX]);

    return (
        <div className='stage-wrapper viewport-content' ref={ref}>
            <motion.div 
                className='stage-content' 
                style={{ x }}
            >
                <div className='stage-text'>
                    <h1 className='stage-headline'>
                        Lumines&nbsp;Lips<span id="copyright">&reg;</span>
                    </h1>
                    <p className='stage-subline'>
                        Mauris sit amet risus faucibus, pharetra arcu sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat
                    </p>
                </div>
                {!isMobile && <StageButton skewX={buttonSkewX} />}
            </motion.div>
            {isMobile && <StageButton skewX={buttonSkewX} />}
        </div>
    );
}

export default Stage
