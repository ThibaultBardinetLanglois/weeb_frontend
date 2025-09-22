import axios from "axios";


/**
 * Axios instance with interceptors.
 * 
 * - Sends HttpOnly cookies with every request.
 * - Attaches the Authorization header with the access token.
 * - Automatically attempts to refresh expired access tokens.
 */
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true, // important so that the HttpOnly cookie is sent
});

/**
 * Bare Axios instance.
 *
 * Used only for refreshing tokens, since it does not include
 * Authorization headers or response interceptors.
 */
export const bareAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

/**
 * Callback triggered when refresh token fails.
 * Set by the AuthContext so it can handle logout and navigation.
 */
let onRefreshFailed = null;

/**
 * Register a callback that runs when the refresh token fails.
 * @param {Function} cb - Callback function provided by AuthContext
 */
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
                // Use the bare instance (without Authorization) to request a new access token
                const refreshResponse = await bareAxios.post("auth/token/refresh/");
                const newAccess = refreshResponse.data.access;

                sessionStorage.setItem("accessToken", newAccess);
                originalConfig.headers["Authorization"] = `Bearer ${newAccess}`;

                return axiosInstance(originalConfig);
            } catch (refreshErr) {
                // Delegate cleanup + navigation to AuthContext
                if (onRefreshFailed) onRefreshFailed();
                return Promise.reject(refreshErr);
            }
        }
        
        return Promise.reject(err);
    }
);

export default axiosInstance;


/**
 * Alternative with baseAxios:
 *
 * - Protect API routes using axiosInstance.
 * - Use bareAxios (without interceptors) for refresh calls.
 * - If /token/refresh/ fails → logout without infinite loop.
 */