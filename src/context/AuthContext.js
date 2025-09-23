import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance, { bareAxios, setOnRefreshFailed } from "../api/axiosInstance";

export const AuthContext = createContext();

/**
 * AuthProvider
 *
 * Provides authentication state and actions (login/logout) to the app.
 * Stores the access token, decoded user payload, and a boolean connection flag.
 */
export const AuthProvider = ({ children }) => {
    // === AuthContext State ===
    const [authContextReady, setAuthContextReady] = useState(false);
    // Signals when the initial context bootstrapping (silent refresh attempt) is complete.
    // Prevents premature redirects before we know if the user is connected or not.

    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null); // Contiendra le payload du token
    const [isConnected, setIsConnected] = useState(false);

    /**
   * Register a callback executed when the refresh token flow fails.
   * The axios layer will call this when /auth/token/refresh/ returns 401/invalid,
   * so we can centrally logout and redirect without circular imports.
   */
    useEffect(() => {
        setOnRefreshFailed(async () => {
            await logout();
            window.location.assign("/login");
        });
    }, []);


    /**
   * App boot: attempt a silent refresh using the HttpOnly refresh cookie.
   * If successful, hydrate context (token, user) and set Authorization default.
   * If not, clear any stale access token and remove the Authorization header.
   *
   * Note:
   * - We skip the call if there is clearly no access token in storage to avoid
   *   unnecessary 401 noise during initial loads for anonymous users.
   * - We guard against setState on unmounted by using a local "mounted" flag.
   */
    useEffect(() => {
        // Avoid unnecessary server calls if we know there's no access token at all.
        if (!sessionStorage.getItem("accessToken")) {
            setAuthContextReady(true); // important
            return;
        }

        let mounted = true; // guard to avoid setState on unmounted components

        // IIFE to use async/await inside useEffect without naming a function
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
                } else {
                    // No access returned => we consider not connected
                    setIsConnected(false);
                }
            } catch (err) {
                const status = err?.response?.status;

                // If the refresh cookie is absent/invalid/expired → we also invalidate it on the server side
                if (status === 401 || status === 403) {
                    try {
                        await logout(); 
                    } catch (_) {}
                } else {
                    // network/server errors: do not blacklist at all costs; just clean local
                    sessionStorage.removeItem("accessToken");
                    delete axiosInstance.defaults.headers.common.Authorization;
                    if (mounted) setIsConnected(false);
                }
            } finally {
                if (mounted) setAuthContextReady(true);  // Signal boot complete
            }
        })();

        // Cleanup: prevent state updates after unmount
        return () => (mounted = false);
    }, []);


    /**
   * Login user.
   * @param {{ email: string, password: string }} data - credentials payload
   * @returns {Promise<{ok: boolean, message?: string}>}
   */
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

                // Apply Authorization to all subsequent requests using axiosInstance
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
    

    /**
   * Logout user.
   * Sends a server-side logout to clear the refresh cookie, then resets local state.
   */
    const logout = async () => {
        try {
            // Use bareAxios so no Authorization header is attached
            await bareAxios.post("auth/logout/", {}); // deletes the cookie as per server logic
        } catch (e) {
            console.warn("Logout server-side failed:", e);
        } finally {
            setAccessToken(null);
            setUser(null);
            setIsConnected(false);
            sessionStorage.removeItem("accessToken");
            // Remove the global Authorization header on the axios instance
            delete axiosInstance.defaults.headers.common.Authorization;
        }
    };


    return (
        <AuthContext.Provider 
            value={{ authContextReady, accessToken, user, isConnected, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
