import './Footer.css';

function Footer() {
    return (
        <footer className="footer-wrapper ">
            <div className="viewport-content">
                <div className="footer-columns">
                    <div className="footer-column">
                        <div className="footer-logo">
                            <div>LOGO</div>
                        </div>                
                    </div>
                    <ul className="footer-nav-list footer-column">
                        <li className="footer-nav-list-item">
                        <a className="footer-nav-link" href="#">Ausstellungen</a>
                        </li>
                        <li className="footer-nav-list-item">
                            <a className="footer-nav-link" href="#">Öffnungszeiten</a>
                        </li>
                        <li className="footer-nav-list-item">
                            <a className="footer-nav-link" href="#">Eintrittspreise</a>
                        </li>
                        <li className="footer-nav-list-item">
                            <a className="footer-nav-link" href="#">Anfahrt</a>
                        </li>
                    </ul>
                    <ul className="footer-nav-list footer-column">
                        <li className="footer-nav-list-item">
                            <a className="footer-nav-link" href="#">Newsletter</a>
                        </li>
                        <li className="footer-nav-list-item">
                            <a className="footer-nav-link" href="#">Kontakt</a>
                        </li>
                        <li className="footer-nav-list-item">
                            <a className="footer-nav-link" href="#">Über uns</a>
                        </li>
                    </ul>
                    <ul className="footer-nav-list footer-column">
                        <li className="footer-nav-list-item">
                            <a className="footer-nav-link" href="#">Impressum</a>
                        </li>
                        <li className="footer-nav-list-item">
                            <a className="footer-nav-link" href="#">Datenschutz</a>
                        </li>
                        <li className="footer-nav-list-item">
                            <a className="footer-nav-link" href="#">AGB</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer