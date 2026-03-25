import { m } from 'motion/react';
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

function StageButton({ skewX }) {
    return (
        <m.button
            type="button"
            className="stage-button glow-on-hover"
            style={{ skewX }}
            initial="rest"
            whileHover="hover"
        >
            Jetzt sichern
            <m.span 
                style={{
                    y: '.07em',
                }}
                variants={iconVariants}>
                <ChevronRight />
            </m.span>
        </m.button>
    );
}

export default StageButton
