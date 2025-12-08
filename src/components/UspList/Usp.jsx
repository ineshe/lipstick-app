import { motion } from 'motion/react';
import './Usp.css';

function Usp({ usp, isActive }) {
    return (
        <motion.div
            className='usp-item'
            initial= {{ opacity: 0 }}
            whileInView={{ 
                opacity: 1,
                transition: { 
                    duration: 0.8,
                    default: { ease: 'easeOut' }
                }
            }}
            viewport={{ margin: '-30% 0px -30% 0px' }}
        >
            <h2 className='usp-item-headline'>{usp.headline}</h2>
            <p className='usp-item-content'>{usp.content}</p>
        </motion.div>
    );
}

export default Usp