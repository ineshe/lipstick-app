import { m, LazyMotion, domAnimation, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import LogoIcon from '../LogoIcon/LogoIcon';
import './Header.css';
import { BsBag } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { MOBILE_QUERY } from '../../lib/breakpoints'

function Header() {
    const { scrollY } = useScroll()
    const [scrollDirection, setScrollDirection] = useState("up")
    const isMobile = window.matchMedia(MOBILE_QUERY).matches

    useMotionValueEvent(scrollY, "change", (current) => {
        const scrollDiff = current - scrollY.getPrevious()
        setScrollDirection(scrollDiff > 0 ? "down" : "up")
    })

    const animationStates = {
        hidden: { 
            y: -50, opacity: 0,
            transition: { duration: 0.12, ease: "easeOut" }
        },
        visible: {
            y: 0, opacity: 1,
            backgroundColor: 'rgba(0,0,0,0.1)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            transition: { duration: 0.12, ease: "easeOut" }

        },
    }

    const headerMotion = scrollDirection === "up" || isMobile ? "visible" : "hidden";

    return (
        <LazyMotion features={domAnimation} strict>
            <m.div className={'header-wrapper'}
                variants={animationStates}
                initial="visible"
                animate={headerMotion}
            >
                <div className='viewport-content'>
                    <div className='header'>
                        <nav className='header__menu'>
                            <ul className='list'>
                                <li className='item bg'>Neu</li>
                                <li className='item bg'>Kollektionen</li>
                                <li className='item bg'>Online Outlet</li>
                            </ul>
                        </nav>
                        <div className='header__icon'>
                            <LogoIcon height={40} />
                        </div>
                        <div className='header__actions'>
                            <button className='header-action-btn bg' aria-label="Account">
                                <IoPersonOutline />
                            </button>
                            <button className='header-action-btn bg' aria-label="Shopping bag">
                                <BsBag />
                            </button>
                            <button id="menu-button" className='header-action-btn bg' aria-label="Menu">
                                <IoMenu />
                            </button>
                        </div>
                    </div>
                </div>
            </m.div>
        </LazyMotion>
    );
}

export default Header
