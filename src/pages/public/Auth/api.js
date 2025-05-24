// import axios from "axios";

/**
 * registerApiCall
 * 
 * Sends user registration data to the backend.
 * 
 * @param {Object} data - Registration form data (name, firstname, email, password)
 * @returns {Promise<Object>} Axios response from the server
 * @throws Will throw an error if the request fails
 */
export const registerApiCall = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
        // While waiting for backend authentication to take effect

        return { data: data, status: 'OK', method: 'POST', code: 201 }; 
    } catch (error) {
        console.log("Erreur lors de l'envoi des données :", error);
        throw error; 
    }
};

/**
 * loginApiCall
 * 
 * Sends user login credentials to the backend.
 * 
 * @param {Object} data - Login form data (email and password)
 * @returns {Promise<Object>} Axios response from the server
 * @throws Will throw an error if the request fails
 */
export const loginApiCall = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
        // While waiting for backend authentication to take effect

        return { data: data, status: 'OK', method: 'POST', code: 201 }; 
    } catch (error) {
        console.log("Erreur lors de l'envoi des données :", error);
        throw error; 
    }
};
