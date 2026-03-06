import './Footer.css';

function Footer() {
    return (
            <div className="footer">
                <div className="footer-main-content viewport-content">
                    <ul className="footer-column">
                        <li className="footer-item">
                            <h2>Service</h2>
                        </li>                        
                        <li className="footer-item">
                            <a className="footer-nav-link" href="#">Versand & Lieferung</a>
                        </li>
                        <li className="footer-item">
                            <a className="footer-nav-link" href="#">Rückgabe & Umtausch</a>
                        </li>
                        <li className="footer-item">
                            <a className="footer-nav-link" href="#">FAQ</a>
                        </li>
                        <li className="footer-item">
                            <a className="footer-nav-link" href="#">Kontakt</a>
                        </li>                        
                    </ul>                    
                    <ul className="footer-column">
                        <li className="footer-item">
                            <h2>Shop</h2>
                        </li>                          
                        <li className="footer-item">
                            <a className="footer-nav-link" href="#">Kollektion</a>
                        </li>
                        <li className="footer-item">
                            <a className="footer-nav-link" href="#">Limited Edition</a>
                        </li>                        
                        <li className="footer-item">
                            <a className="footer-nav-link" href="#">Bestseller</a>
                        </li>
                    </ul>
                    <ul className="footer-column">
                        <li className="footer-item">
                            <h2>Marke</h2>
                        </li>
                        <li className="footer-item">
                            <a className="footer-nav-link" href="#">Über uns</a>
                        </li>
                        <li className="footer-item">
                            <a className="footer-nav-link" href="#">Nachhaltigkeit</a>
                        </li>
                        <li className="footer-item">
                            <a className="footer-nav-link" href="#">Newsletter</a>
                        </li>                    
                    </ul>
                    <div className="footer-column">
                        <div className="footer-item">
                            <h2 className='title'>In Verbindung bleiben</h2>
                        </div>
                        <div className="footer-social">
                            <span>FB</span>
                            <span>YT</span>
                            <span>IG</span>
                        </div>
                    </div>           
                </div>
                <div className="footer-bottom">
                    <div className="viewport-content">
                        <div className="footer-bottom-container">
                            <div className='footer-item'>© 2026</div>
                            <ul className="footer-bottom-menu">
                                <li className="footer-item">
                                    <a className="footer-nav-link" href="#">Impressum</a>
                                </li>
                                <li className="footer-item">
                                    <a className="footer-nav-link" href="#">AGB</a>
                                </li>
                                <li className="footer-item">
                                    <a className="footer-nav-link" href="#">Cookie-Einstellungen</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Footer
