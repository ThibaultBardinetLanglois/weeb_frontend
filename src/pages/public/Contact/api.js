import { bareAxios } from "../../../api/axiosInstance";


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
        const response = await bareAxios.post('contact/', {
            first_name: data.firstname,
            last_name: data.name,
            phone: data.phoneNumber,
            email: data.email,
            message: data.message
        });
        return response;
    } catch (error) {
        console.error("Erreur lors de l'envoi des données :", error);
        throw error; 
    }
};
