import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/public/Home/Home';
import Login from '../pages/public/Auth/Login/Login';
import Register from '../pages/public/Auth/Register/Register';
import Contact from '../pages/public/Contact/Contact';
import ArticlePage from '../pages/public/Article/Article';

/**
 * AppRoutes
 * 
 * Defines all client-side routes for the application using React Router.
 * Wraps all routes with a common `MainLayout`, which includes header and footer.
 * Automatically scrolls to the top of the page on each route change using `ScrollToTop`.
 * 
 * Routes:
 * - `/` → Home page
 * - `/articles` → Article listing
 * - `/contact` → Contact form page
 * - `/login` → User login form
 * - `/register` → User registration form
 * 
 * @returns {JSX.Element} Router setup for the entire application
 */
const AppRoutes = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/articles" element={<ArticlePage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
