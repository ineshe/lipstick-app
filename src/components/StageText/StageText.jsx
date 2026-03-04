import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import StageButton from '../StageButton';
import './StageText.css';

function Stage() {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.7 }); // true when 70%+ visible

    return (
        <div className='stage-wrapper viewport-content' ref={ref}>
            <motion.div 
                className='stage-content' 
                style={{ y: '-58%' }}
                animate={{ x: isInView ? 0 : '100vw' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                <div className='stage-text'>
                    <div className='page-title'>
                        <h1 className='stage-headline'>
                            Lumines&nbsp;Lips<span id="copyright">&reg;</span>
                        </h1>
                        
                    </div>
                    <p className='stage-subline'>
                        Mauris sit amet risus faucibus, pharetra arcu sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat
                    </p>
                </div>
                <StageButton />
            </motion.div>
        </div>
    );
}

export default Stage
