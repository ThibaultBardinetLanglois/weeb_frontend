import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.style.scss';

const Header = () => {
    const [burgerIsOpen, setBurgerIsOpen] = useState(false);
    const toggleBurger = () => setBurgerIsOpen(!burgerIsOpen);

    // Fonction qui ferme le burger menu lors du redirection vers une page
    const closeBurgerMenu = () => {
        if (window.innerWidth <= 620) {
            setBurgerIsOpen(false);
        }
    };

    return (
        <div className="header-container">
            <Link to="/" className='header-container__home-link'>Weeb</Link>
            <header className={`header-container__navbar ${burgerIsOpen ? "change" : ""}`}>
                <nav>
                    <ul>
                        <li><Link to="/">Weeb</Link></li>
                        <li><Link to="/" onClick={closeBurgerMenu}>About Us</Link></li>
                        <li><Link to="/contact" onClick={closeBurgerMenu}>Contact</Link></li>
                    </ul>
                </nav>
                <div className="header-container__navbar_buttons">
                    <Link 
                        to="/login" 
                        className='button button--transparent button--border-transition'
                        onClick={closeBurgerMenu}
                    >Log In</Link>
                    <Link 
                        to="/register" 
                        className='button button--purple'
                        onClick={closeBurgerMenu}
                    >Join Now</Link>
                </div>
            </header>

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