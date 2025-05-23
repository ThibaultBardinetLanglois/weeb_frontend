import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Composant s'activant à chaque changement de page et permettant d'être positionné en haut de cette dernière
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); 
    }, [pathname]); 

    return null;
};

export default ScrollToTop;
