import { motion, useScroll, useTransform } from 'motion/react';
import StageButton from '../StageButton';
import './StageText.css';

function Stage() {
    const { scrollY } = useScroll();
    
    const x = useTransform(
        scrollY,
        [window.innerHeight * 0.3, window.innerHeight * 0.5], // Start at 30vh, complete by 50vh
        ['0%', '100%']
    );

    return (
        <div className='stage-wrapper viewport-content'>
            <motion.div className='stage-content' style={{ x, y: '-58%' }}>
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
