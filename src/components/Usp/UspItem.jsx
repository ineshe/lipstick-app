import './Usp.css';
import { m } from "motion/react"


function UspItem({ usp }) {

    const variants = {
        initial:  {
            y: 25, opacity: 0,
        },
        visible: {
            y: 0, opacity: 1,
            transition: {
                // delay = Dauer der Exit-Animation: das neue Item erscheint
                // erst, wenn das vorherige ausgeblendet ist
                default: { ease: "linear", duration: 0.2, delay: 0.1 },
            }
        },
        exit: {
            opacity: 0,
            transition: {
                default: { ease: "linear", duration: 0.1 },
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
