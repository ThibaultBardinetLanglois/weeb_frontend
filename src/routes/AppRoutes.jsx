import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/public/Home/Home';
import Login from '../pages/public/Auth/Login/Login';
import Register from '../pages/public/Auth/Register/Register';
import Contact from '../pages/public/Contact/Contact';
import ArticlesList from '../pages/public/Article/ArticlesList';
import ArticleDetails from "../pages/public/Article/ArticleDetails";
import ArticlePublication from "../pages/private/Article/ArticlePublication";
import ProtectedRoute from '../ProtectedRoutes';

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
 * - `/articles/:id` → Article details page
 * - `/articles/:publication` → Article publication form
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
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/articles" element={<ArticlesList />} />
                    <Route path="/articles/:id" element={<ArticleDetails />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Private routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/articles/publication" element={<ArticlePublication />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
