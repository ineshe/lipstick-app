import { motion, useTransform } from 'motion/react';
import { useState } from 'react';
import './Usp.css';

function Usp({ usp }) {
    const [activeIndex, setActiveIndex] = useState(0);


    const variants = {
        hidden:  {
            opacity: 0
        },
        visible: {
            opacity: 1
        }
    };

    // const opacity = useTransform(whileInView)

    return (
        <motion.div
            key={activeIndex}
            // variants={variants}
            className='usp-item'
            // initial= 'hidden'
            // transition={{ duration: 0.3, ease: 'easeOut' }}
            // whileInView='visible'
            // viewport={{ margin:'-30% 0px -30% 0px', amount: '0.5' }}
        >
            <h2 className='usp-item-headline'>{usp.headline}</h2>
            <p className='usp-item-content'>{usp.content}</p>
        </motion.div>
    );
}

export default Usp