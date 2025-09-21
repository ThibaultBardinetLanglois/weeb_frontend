import axiosInstance, { bareAxios } from "../../../api/axiosInstance";


/**
 * getAllArticles
 * 
 * Fetches all articles from the backend API.
 * 
 * Makes a GET request to `${API_URL}` and returns the response data.
 * Logs an error to the console if the request fails.
 * 
 * @returns {Promise<Array|undefined>} An array of articles if successful, or undefined on error
 */
export const getAllArticles = async () => {
    try {
        const response = await bareAxios.get('articles/');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
    }
};

/**
 * getArticleById
 *
 * Récupère un article unique depuis l’API en fonction de son identifiant.
 *
 * @param {number|string} id - L'identifiant unique de l’article (ex: 42)
 *
 * @returns {Promise<Object|undefined>} 
 *   - Les données de l’article si la requête réussit
 *   - `undefined` si une erreur survient (elle est loguée en console)
 *
 * @throws Ne lève pas explicitement d’erreur : en cas de problème,
 *         la fonction capture l’exception et logge dans la console.
 */
export const getArticleById = async (id) => {
    try {
        const response = await bareAxios.get(`articles/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de l’article :", error);
    }
};



/**
 * createArticle
 *
 * Sends a POST request to the API to create a new article.
 * Uses a Bearer token stored in localStorage for authentication.
 *
 * @param {Object} data - The article data to create
 * @param {string} data.title - The article title
 * @param {string} data.content - The article content
 *
 * @returns {Promise<Object>} The response data (created article)
 *
 * @throws {Error} A structured error object containing:
 *   - error.status {number|null} : HTTP status code from the API (e.g., 400, 500), or null if network error
 *   - error.data {Object} : The error body returned by the server or a network error message
 */
export async function createArticle(data) {
    try {
        const res = await axiosInstance.post('articles/', data);
        return {
            status: res.status,
            statusText: res.statusText,
            data: res.data
        }
    } catch (error) {
        console.error("Error during API article creation call:", error);

        if (error.response) {
            const err = new Error("API error");
            err.status = error.response.status;
            err.data = error.response.data;
            throw err;
        } else {
            // Network issue
            const err = new Error(error.message);
            err.status = null;
            err.data = { message: error.message };
            throw err;
        }
    }
}

