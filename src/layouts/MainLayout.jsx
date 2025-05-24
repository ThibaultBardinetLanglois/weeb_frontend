import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

/**
 * MainLayout
 * 
 * Layout component that wraps every page with a consistent structure:
 * - A header at the top
 * - A main content area (populated via React Router's <Outlet />)
 * - A footer at the bottom
 * 
 * This component is used in route configuration to define a common layout
 * for multiple pages.
 * 
 * @returns {JSX.Element} The main layout structure of the app
 */
const MainLayout = () => {
  return (
    <>
        <Header />
        <main><Outlet /></main>
        <Footer />
    </>
  )
}

export default MainLayout
