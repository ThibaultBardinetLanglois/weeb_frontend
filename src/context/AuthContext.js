import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance, { bareAxios, setOnRefreshFailed } from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null); // Contiendra le payload du token
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        /* 
            On branche le crochet setOnRefreshFailed au montage : si l'appel au refresh token échoue → logout + /login
            Quand le AuthProvider se monte, il appelle setOnAuthFailed et donne à api.js une fonction concrète :
            Si le refresh échoue, alors appelle logout() et redirige vers /login.
            Du coup, la variable onAuthFailed dans api.js n’est plus null, elle contient maintenant la callback passée depuis le provider.
            On évite d'importer la fonction logout du AuthContext dans le fichier axiosInstance pour ne pas créer d'imports circulaires
        */
        setOnRefreshFailed(async () => {
            await logout();
            window.location.assign("/login");
        });
    }, []);

    /* 
        Chargement de page: On tente un refresh de l'access token et du refresh token via cookie HttpOnly(ci-précédement connecté) 
        sinon l'état précédent du context est effacé, le hook isConnected est mis à false et l'utilisateur redirigé vers la page de loggin
        sans avoir effectué de logout et bien reset l'état du context de l'application
    */
    useEffect(() => {
        /* 
            Variable qui sert uniquement de garde-fou dans les effets asynchrones.
            Si le composant se démonte (nouveau rechargement de page par exemple => cas extrêmement minime mais à prendre en considération) avant que 
            l'appel asynchrone à l'api ne se résolve, on a une mise à jour d’état sur un composant démonté → React loggue un warning du style : 
            "Can't perform a React state update on an unmounted component."
        */
        let mounted = true;

        // Éviter des erreurs 500 inutiles liées à l'expiration du refresh token si tu sais qu’il n’y a pas d’accessToken.
        if (!sessionStorage.getItem("accessToken")) return;

        // Astuce syntaxique pour pouvoir utiliser await proprement dans useEffect.
        (async () => {
            try {
                const response = await bareAxios.post("auth/token/refresh/");
                
                if (response?.data?.access && mounted) {
                    const token = response.data.access;
                    const decoded = jwtDecode(token);

                    setAccessToken(token);
                    setUser(decoded);
                    setIsConnected(true);
                    sessionStorage.setItem("accessToken", token);
                    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
                }
            } catch (_) {
                // pas connecté (refresh expiré)
                sessionStorage.removeItem("accessToken");
                delete axiosInstance.defaults.headers.common.Authorization;
            } 
        })();
        // IIFE (Immediately Invoked Function Expression)
        // S'exécute immédiatement en async dans useEffect sans polluer le scope avec un nom de fonction

        // Quand le composant se démonte, la variable passe à false → la mise à jour du contexte ne s’exécute plus.
        return () => (mounted = false);
    }, []);


    // Login utilisateur
    const login = async (data) => {
        try {
            const response = await axiosInstance.post("auth/login/", data);

            if (response.status === 200 && response.statusText === "OK") {
                const token = response.data.access;
                const decoded = jwtDecode(token);
    
                setAccessToken(token);
                setUser(decoded);
                setIsConnected(true);
                sessionStorage.setItem("accessToken", token);

                // Pose l'Authorization pour TOUTES les futures requêtes effectuées avec axiosInstance
                axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    
                return { ok: true };
            } else {
                return { ok: false, message: "Serveur actuellement inaccessible" }; 
            }
        } catch (err) {
            const status = err?.response?.status;

            if (status === 401 || status === 403 || status === 400) {
                return { ok: false, message: err.response.data.detail };
            }

            return { ok: false, message: "Impossible de se connecter. Réessayer plus tard." };
        }
    };
    

    // 🚪 Déconnexion de l'utilisateur
    const logout = async () => {
        try {
            await bareAxios.post("auth/logout/", {}); // supprime le cookie contenu dans la config
        } catch (e) {
            console.warn("Logout server-side failed:", e);
        } finally {
            setAccessToken(null);
            setUser(null);
            setIsConnected(false);
            sessionStorage.removeItem("accessToken");
            // Retire l'Authorization global
            delete axiosInstance.defaults.headers.common.Authorization;
        }
    };


    return (
        <AuthContext.Provider 
            value={{ accessToken, user, isConnected, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
