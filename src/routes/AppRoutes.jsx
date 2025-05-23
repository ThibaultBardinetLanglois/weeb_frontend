import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/public/Home/Home';
import Login from '../pages/public/Auth/Login/Login';
import Register from '../pages/public/Auth/Register/Register';
import Contact from '../pages/public/Contact/Contact';

const AppRoutes = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
