import './Header.css';

function Header() {
    return (
        <div className='top-bar-wrapper'>
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