import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-section">
                        <h4 className="footer-brand">
                            <i className="fa-solid fa-house-chimney"></i> StayHub
                        </h4>
                        <p className="footer-tagline">Your home away from home</p>
                    </div>
                    <div className="footer-section">
                        <h5>Explore</h5>
                        <ul>
                            <li><a href="/">All Listings</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h5>Connect</h5>
                        <div className="social-icons">
                            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                            <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 StayHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
