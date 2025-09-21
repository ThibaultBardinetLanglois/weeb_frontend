import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true, // important pour que le cookie HttpOnly soit envoyé
});

// L'appel au refresh token requiere qu'il n'y ait pas d'access token dans l'entête Authorization
// Instance SANS intercepteurs et sans access token pour auth/token/refresh/
export const bareAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

/* ---- Callback fourni pour le contexte lors de l'échec du refresh token pour régénérer l'access token ---- */
let onRefreshFailed = null;
export function setOnRefreshFailed(cb) { onRefreshFailed = cb; }

axiosInstance.interceptors.response.use(
    res => res,
    async err => {
        const originalConfig = err.config;

        const isAuthRoute =
            originalConfig.url.includes("/token/") || originalConfig.url.includes("/login");

        if (err.response?.status === 401 && !originalConfig._retry && !isAuthRoute) {
            originalConfig._retry = true;
            try {
                // On utilise l'instance axios dépouillée d'access token pour en régénérer un
                const refreshResponse = await bareAxios.post("auth/token/refresh/");
                const newAccess = refreshResponse.data.access;

                sessionStorage.setItem("accessToken", newAccess);
                originalConfig.headers["Authorization"] = `Bearer ${newAccess}`;

                return axiosInstance(originalConfig);
            } catch (refreshErr) {
                // -> on laisse le contexte gérer la purge + navigation
                 if (onRefreshFailed) onRefreshFailed();
                return Promise.reject(refreshErr);
            }
        }
        
        return Promise.reject(err);
    }
);

export default axiosInstance;


/* La solution avec baseAxios
Tu continues de protéger toutes tes routes API avec axiosInstance.
Tu fais le refresh avec un autre client baseAxios qui ne déclenche pas d'intercepteur.

Donc :
- Si /api/protected/ retourne 401
- axiosInstance appelle /token/refresh/ avec baseAxios
- Si /token/refresh/ échoue → on déconnecte, mais pas de boucle*/
