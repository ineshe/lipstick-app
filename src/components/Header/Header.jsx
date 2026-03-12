import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import LogoIcon from '../LogoIcon/LogoIcon';
import './Header.css';
import { LuLogIn } from "react-icons/lu";
import { LuShoppingCart } from "react-icons/lu";
import { FiMapPin } from "react-icons/fi";
import { BsBag } from "react-icons/bs";
import { IoBagOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";


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
            backgroundColor: 'rgba(0,0,0,0.1)',
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
            <div className='header viewport-content'>
                <nav className='header__menu'>
                    <ul className='list'>
                        <li className='item'>Neu</li>
                        <li className='item'>Kollektionen</li>
                        <li className='item'>Online Outlet</li>
                    </ul>
                </nav>
                <div className='header__icon'>
                    <LogoIcon />
                </div>
                {/* <div>Filiale suchen <FiMapPin /></div> */}
                <div className='header__actions'>
                    <button className='header-action-btn' aria-label="Account">
                        <IoPersonOutline />
                    </button>
                    <button className='header-action-btn' aria-label="Shopping bag">
                        <BsBag />
                    </button>
                </div>
            </div>
                

        </motion.div>
    );
}

export default Header
