import { useRef, useEffect } from 'react';
import { LazyMotion, domAnimation, m, useInView, useSpring } from 'motion/react';
import { MOBILE_QUERY } from '../../lib/breakpoints';
import StageButton from '../StageButton';
import './StageText.css';

function Stage() {
    const ref = useRef(null);
    const isMobile = window.matchMedia(MOBILE_QUERY).matches;
    const isInView = useInView(ref, { amount: 0.88 });
    
    const x = useSpring(0, { stiffness: 180, damping: 35, visualDuration: 0.2 });
    const buttonSkewX = useSpring(0, { stiffness: 180, damping: 35, visualDuration: 0.2 });
    
    useEffect(() => {
        x.set(isInView || isMobile ? 0 : window.innerWidth);
        buttonSkewX.set(isInView || isMobile ? 0 : -15);
    }, [isInView, isMobile, x, buttonSkewX]);

    return (
        <LazyMotion features={domAnimation} strict>
            <div className='stage-wrapper viewport-content' ref={ref}>
                <m.div 
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
                </m.div>
                {isMobile && <StageButton skewX={buttonSkewX} />}
            </div>
        </LazyMotion>
    );
}

export default Stage
