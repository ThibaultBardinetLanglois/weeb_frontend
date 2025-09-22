import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Header.style.scss';

/**
 * Header Component
 * 
 * This component renders a responsive header with navigation links,
 * a burger menu for mobile devices, and authentication buttons.
 * 
 * Features:
 * - Responsive navigation bar with burger toggle on smaller screens
 * - Automatically closes burger menu on navigation when screen is narrow
 * - Uses React Router's <Link> for client-side routing
 * 
 * @returns {JSX.Element} A header section with branding, navigation, and burger menu
 */
const Header = () => {
    const { isConnected, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    // State to track whether the burger menu is open or closed
    const [burgerIsOpen, setBurgerIsOpen] = useState(false);

    // Toggle the burger menu open or closed
    const toggleBurger = () => setBurgerIsOpen(!burgerIsOpen);

    /**
     * Closes the burger menu on link click if screen width is 620px or less.
     * This ensures the menu collapses on mobile navigation.
     */
    const closeBurgerMenu = () => {
        if (window.innerWidth <= 620) {
            setBurgerIsOpen(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout(); // cleans the context + session
            closeBurgerMenu();
            navigate("/", { replace: true }); // replace the current history entry instead of adding a new one.
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="header-container">
            <Link to="/" className='header-container__home-link'>Weeb</Link>

            {/* Navigation bar */}
            <header className={`header-container__navbar ${burgerIsOpen ? "change" : ""}`}>
                <nav>
                    <ul>
                        <li><Link to="/">Weeb</Link></li>
                        <li><Link to="/" onClick={closeBurgerMenu}>About Us</Link></li>
                        <li><Link to="/contact" onClick={closeBurgerMenu}>Contact</Link></li>
                        {/* Publication visible only if logged in */}
                        {isConnected && (
                            <li>
                                <Link 
                                className="button button--transparent button--border-transition"
                                to="/articles/publication" onClick={closeBurgerMenu}>Publication
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>

                {/* Auth buttons */}
                <div className="header-container__navbar_buttons">
                    {!isConnected ? (
                        <>
                            <Link
                                to="/login"
                                className="button button--transparent button--border-transition"
                                onClick={closeBurgerMenu}
                            >
                                Log In
                            </Link>
                            <Link
                                to="/register"
                                className="button button--purple"
                                onClick={closeBurgerMenu}
                            >
                                Join Now
                            </Link>
                        </>
                    ) : (
                        <button
                            className="button button--transparent button--border-transition"
                            onClick={handleLogout}
                            type="button"
                            >
                                Logout
                        </button>
                    )}
                </div>
            </header>

            {/* Burger menu button */}
            <div 
                className={`header-container__burger-block ${burgerIsOpen ? "activate" : ""}`}
                onClick={toggleBurger}
            >
                <div className={`header-container__burger-block-line ${burgerIsOpen ? "top-rotate" : ""}`}></div>
                <div className={`header-container__burger-block-line ${burgerIsOpen ? "hidden" : ""}`}></div>
                <div className={`header-container__burger-block-line ${burgerIsOpen ? "bottom-rotate" : ""}`}></div>
            </div>
        </div>
    )
}

export default Header