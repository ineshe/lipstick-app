import { motion, scale } from 'motion/react';
import './UspList.css';
import { animate } from 'motion';
import { usePresence } from "motion/react"
import { useEffect } from 'react';

function Usp({ usp }) {

    const variants = {
        initial:  {
            y: 50,
            opacity: 0,
            scale: 0.95,
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
        },
        exit: {
            y: -50,
            opacity: 0,
            scale: 0.95,
        }       
    };

    const [isPresent, safeToRemove] = usePresence();

    useEffect(() => {
        // Remove from DOM 300ms after being removed from React
        !isPresent && setTimeout(safeToRemove, 400)
    }, [isPresent])

    return (
        <motion.div
            key={usp.id}
            className={'usp-item'}
            variants={variants}
            initial="initial"
            animate="visible"
            exit="exit"
            transition={{ 
                duration: 0.2, 
                ease: "easeInOut",
                delay: isPresent ? 0.15 : 0  // Pause before entering, no delay on exit
            }}
        >
            <h2 className='usp-item-headline'>{usp.headline}</h2>
            <p className='usp-item-content'>{usp.content}</p>
        </motion.div>
    );
}

export default Usp