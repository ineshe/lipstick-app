import { motion } from 'motion/react';
import './StageButton.css';
import ChevronRight from '../../assets/icons/chevron-right.svg';

const iconVariants = {
    rest: { x: 0 },
    hover: {
        x: 3,
        transition: {
            type: 'spring',
            stiffness: 420,
            damping: 18,
            mass: 0.4,
        },
    },
};

function StageButton() {
    return (
        <motion.button
            type="button"
            className="stage-button glow-on-hover"
            initial="rest"
            whileHover="hover"
        >
            Jetzt sichern
            <motion.span 
                style={{
                    y: '.07em',
                }}
                variants={iconVariants}>
                <ChevronRight />
            </motion.span>
        </motion.button>
    );
}

export default StageButton
