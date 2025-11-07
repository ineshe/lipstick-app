import { useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import './Header.css';

function Header() {

    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)

    useMotionValueEvent(scrollY, "change", (current) => {
        const diff = current - scrollY.getPrevious()
        setHidden(diff > 0 ? true : false)
    })

    return (
        <div className={`top-bar-wrapper ${hidden ? "hidden" : ""}`}>
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
        </div>
    );
}

export default Header