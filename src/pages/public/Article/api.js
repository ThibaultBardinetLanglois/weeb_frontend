import axios from 'axios';

const API_URL = 'http://localhost:8000/api/articles/';

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
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
    }
};