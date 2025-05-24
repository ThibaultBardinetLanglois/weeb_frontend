import axios from "axios";

const BASE_URL = "http://localhost:8000/api/contact/"; 

/**
 * postMessageApiCall
 * 
 * Sends a message (e.g., from a contact form) to the backend API.
 * 
 * @param {Object} data - Message form data (name, email, message)
 * @returns {Promise<Object>} Axios response from the server
 * @throws Will throw an error if the request fails
 */
export const postMessageApiCall = async (data) => {
    try {
        const response = await axios.post(BASE_URL, {
            first_name: data.firstname,
            last_name: data.name,
            phone: data.phoneNumber,
            email: data.email,
            message: data.message
        });
        return response;
    } catch (error) {
        console.log("Erreur lors de l'envoi des données :", error);
        throw error; 
    }
};
