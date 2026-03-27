import './Usp.css';
import { useEffect } from 'react';
import { m, usePresence } from "motion/react"

function UspItem({ usp }) {

    const variants = {
        initial:  {
            y: 30,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
        },
        exit: {
            y: -30,
            opacity: 0,
        }       
    };

    const [isPresent, safeToRemove] = usePresence();

    useEffect(() => {
        // Remove from DOM 400ms after being removed from React
        !isPresent && setTimeout(safeToRemove, 400)
    }, [isPresent])

    return (
        <m.div
            key={usp.id}
            className={'usp-item'}
            variants={variants}
            initial="initial"
            animate="visible"
            exit="exit"
            transition={{ 
                duration: 0.15, 
                ease: "easeOut",
                delay: isPresent ? 0.1 : 0  // Pause before entering, no delay on exit
            }}
        >
            <h2 className='usp-item-headline'>{usp.headline}</h2>
            <p className='usp-item-content'>{usp.content}</p>
        </m.div>
    );
}

export default UspItem