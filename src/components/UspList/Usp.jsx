import { motion } from 'motion/react';
import './UspList.css';
import { animate } from 'motion';

function Usp({ usp }) {

    const variants = {
        initial:  {
            y: 20,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
        },
        exit: {
            y: -20,
            opacity: 0,
        }       
    };

    const oddEven = usp.id % 2 === 0 ? 'even' : 'odd';

    return (
        <motion.div
            key={usp.id}
            className={'usp-item ' + oddEven}
            variants={variants}
            initial="initial"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeIn" }}
        >
            <h2 className='usp-item-headline'>{usp.headline}</h2>
            <p className='usp-item-content'>{usp.content}</p>
        </motion.div>
    );
}

export default Usp