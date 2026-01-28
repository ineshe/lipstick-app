import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import './Header.css';

function Header() {

    const { scrollY } = useScroll()
    const [scrollDirection, setScrollDirection] = useState("up")

    useMotionValueEvent(scrollY, "change", (current) => {
        const scrollDiff = current - scrollY.getPrevious()
        setScrollDirection(scrollDiff > 0 ? "down" : "up")
    })

    const animationStates = {
        hidden: { 
            y: -50, opacity: 0,
            transition: { duration: 0.12, ease: "easeInOut" }
        },
        visible: {
            y: 0, opacity: 1,
            backgroundColor: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            transition: { duration: 0.12, ease: "easeInOut" }
        },
    }

    const headerMotion = scrollDirection === "up" ? "visible" : "hidden";

    // console.log('Header render:', {headerMotion, scrollDirection});

    return (
        <motion.div className={'header-wrapper'}
            variants={animationStates}
            initial="visible"
            animate={headerMotion}
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
