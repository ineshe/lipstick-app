import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import './Header.css';

function Header() {

    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)
    const [top, setTop] = useState(true)

    useMotionValueEvent(scrollY, "change", (current) => {
        const scrolled = current - scrollY.getPrevious()
        setHidden(scrolled > 0 ? true : false)
        setTop(current < 1 ? true : false)
    })

    const variants = {
        hidden: { 
            y: 0, opacity: 0,
            transition: { duration: 0.12, ease: "easeInOut" }
        },
        top: {
            y: 0, opacity: 1,
            backgroundColor: 'rgba(0,0,0,0.2)',
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            transition: { duration: 0.06, ease: "easeInOut" }
        },
        scrolled: {
            y: 1, opacity: 1,
            backgroundColor: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            transition: { duration: 0.12, ease: "easeInOut" }
        }
    }

    const activeVariant = hidden ? "hidden" : (top ? "top" : "scrolled")

    return (
        <motion.div className={'header-wrapper'}
            variants={variants}
            animate={activeVariant}
        >
            <div className='top-bar'>
                <nav className='menu'>
                    <ul className='menu-list'>
                        <li className='menu-list-item'>Home</li>
                        <li className='menu-list-item'>Shop</li>
                        <li className='menu-list-item'>About</li>
                        <li className='menu-list-item'>Contact</li>
                    </ul>
                </nav>
            </div>
        </motion.div>
    );
}

export default Header