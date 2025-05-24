import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * 
 * A utility component that scrolls the window to the top
 * whenever the route (pathname) changes.
 * 
 * This improves UX by ensuring users always start at the top
 * of a new page, especially in single-page applications.
 * 
 * @returns {null} This component renders nothing to the UI
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); 
    }, [pathname]); 

    return null;
};

export default ScrollToTop;
