import { Link } from 'react-router-dom';
import YoutubeIcon from '../../assets/icons/youtube.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';
import TwitterIcon from '../../assets/icons/twitter.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';
import LinkedinIcon from '../../assets/icons/linkedin.svg';
import './Footer.style.scss';

/**
 * Footer Component
 * 
 * A presentational footer component containing company information,
 * product and resource links, and social media icons.
 * 
 * Structure:
 * - Top section includes categorized link groups (Product, Solutions, Resources, Company)
 * - Bottom section includes copyright
 *   and social media links (Youtube, Facebook, Twitter, Instagram, LinkedIn)
 * 
 * @returns {JSX.Element} A footer element with navigational and branding content
 */
const Footer = () => {
    return (
        <footer>
            {/* Top part of the footer: navigation and company links */}
            <div className="footer-top-part">
                <p>Weeb</p>
                <div className="footer-top-part__product-block">
                    <ul>
                        <li>PRODUCT</li>
                        <li>Pricing</li>
                        <li>Overview</li>
                        <li>Browse</li>
                        <li>Accessibility</li>
                        <li>Five</li>
                    </ul>
                </div>
                <div className="footer-top-part__solutions-block">
                    <ul>
                        <li>SOLUTIONS</li>
                        <li>Brainstorming</li>
                        <li>Ideation</li>
                        <li>Wireframing</li>
                        <li>Research</li>
                    </ul>
                </div>
                <div className="footer-top-part__ressources-block">
                    <ul>
                        <li>RESSOURCES</li>
                        <li>Help Center</li>
                        <li>Blog</li>
                        <li>Tutorials</li>
                    </ul>
                </div>
                <div className="footer-top-part__company-block">
                    <ul>
                        <li>COMPANY</li>
                        <li>About</li>
                        <li>Press</li>
                        <li>Events</li>
                        <li>Careers</li>
                    </ul>
                </div>
            </div>
            
            {/* Bottom part of the footer: copyright and social links */}
            <div className="footer-bottom-part">
                <p className='footer-bottom-part__copyright'>@ 2025 Weeb, Inc. All rights reserved.</p>
                <ul className="footer-bottom-part__social-links-block">
                    <li>
                        <Link to="#">
                            <img src={YoutubeIcon} alt="Youtube Icon" />
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <img src={FacebookIcon} alt="Facebook Icon" />
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <img src={TwitterIcon} alt="Twitter Icon" />
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <img src={InstagramIcon} alt="Instagram Icon" />
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <img src={LinkedinIcon} alt="Linkedin Icon" />
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer
