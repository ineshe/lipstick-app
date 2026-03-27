import { delay } from 'motion';
import './Usp.css';
import { m } from "motion/react"

function UspItem({ usp }) {

    const variants = {
        initial:  {
            y: 10, opacity: 0,
            transition: {
                default: { type: "spring", stiffness: 180, damping: 35, duration: 0.05 },
                opacity: { ease: "linear" },
                delay: 0.02
            } 
        },
        visible: {
            y: 0, opacity: 1,
            scale: 1,
            transition: {
                default: { type: "spring", stiffness: 180, damping: 35, duration: 0.1 },
                opacity: { ease: "linear" },
            }
        },
        exit: {
            y: -10, opacity: 0,
            transition: {
                default: { type: "spring", stiffness: 180, damping: 35, duration: 0.05 },
                opacity: { ease: "linear" },
            }

        }       
    };

    return (
        <m.div
            key={usp.id}
            className={'usp-item'}
            variants={variants}
            initial="initial"
            animate="visible"
            exit="exit"
        >
            <h2 className='usp-item-headline'>{usp.headline}</h2>
            <p className='usp-item-content'>{usp.content}</p>
        </m.div>
    );
}

export default UspItem