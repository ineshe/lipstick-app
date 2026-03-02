import './Footer.css';

function Footer() {
    return (
            <>
                <div className="viewport-content">
                    <div className="footer-row">
                        <ul className="footer-column">
                            <li className="footer-nav-list-item">
                                <h2>Service</h2>
                            </li>                        
                            <li className="footer-nav-list-item">
                                <a className="footer-nav-link" href="#">Versand & Lieferung</a>
                            </li>
                            <li className="footer-nav-list-item">
                                <a className="footer-nav-link" href="#">Rückgabe & Umtausch</a>
                            </li>
                            <li className="footer-nav-list-item">
                                <a className="footer-nav-link" href="#">FAQ</a>
                            </li>
                            <li className="footer-nav-list-item">
                                <a className="footer-nav-link" href="#">Kontakt</a>
                            </li>                        
                        </ul>                    
                        <ul className="footer-column">
                            <li className="footer-nav-list-item">
                                <h2>Shop</h2>
                            </li>                          
                            <li className="footer-nav-list-item">
                                <a className="footer-nav-link" href="#">Kollektion</a>
                            </li>
                            <li className="footer-nav-list-item">
                                <a className="footer-nav-link" href="#">Limited Edition</a>
                            </li>                        
                            <li className="footer-nav-list-item">
                                <a className="footer-nav-link" href="#">Bestseller</a>
                            </li>
                        </ul>
                        <ul className="footer-column">
                            <li className="footer-nav-list-item">
                                <h2>Marke</h2>
                            </li>
                            <li className="footer-nav-list-item">
                                <a className="footer-nav-link" href="#">Über uns</a>
                            </li>
                            <li className="footer-nav-list-item">
                                <a className="footer-nav-link" href="#">Nachhaltigkeit</a>
                            </li>
                            <li className="footer-nav-list-item">
                                <a className="footer-nav-link" href="#">Newsletter</a>
                            </li>                    
                        </ul>
                        <div>
                            <div className="footer-social">
                                <span>FB</span>
                                <span>YT</span>
                                <span>IG</span>
                            </div>
                        </div>
                                        
                    </div>
                </div>
                <div className="footer-line-bottom-wrapper">
                    <div className="footer-line-bottom viewport-content">
                        <div className='footer-line-bottom-copyright'>© 2026</div>    
                        <ul className="footer-line-bottom-menu">
                            <li className="footer-nav-list-item">
                                <a className="footer-nav-link" href="#">Impressum</a>
                            </li>
                            <li className="footer-nav-list-item">
                                <a className="footer-nav-link" href="#">AGB</a>
                            </li>
                            <li className="footer-nav-list-item">
                                <a className="footer-nav-link" href="#">Cookie-Einstellungen</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </>
    );
}

export default Footer
