import axiosInstance from "../../../api/axiosInstance";


/**
 * registerApiCall
 *
 * Envoie les données d'inscription d'un utilisateur vers le backend.
 *
 * @param {Object} data - Données du formulaire d'inscription
 * @param {string} data.firstname - Prénom de l'utilisateur
 * @param {string} data.lastname - Nom de l'utilisateur
 * @param {string} data.email - Adresse email de l'utilisateur
 * @param {string} data.password - Mot de passe de l'utilisateur
 *
 * @returns {Promise<Object>} Réponse Axios du serveur
 *
 * @throws {Error} Lève une erreur si la requête échoue (erreur réseau ou erreur retournée par l’API)
 */
export async function registerApiCall(data) {
    try {
        const response = await axiosInstance.post('auth/register/', data);
        return response;
    } catch (error) {
        if (error.response) {
            // On relance une erreur plus structurée
            // eslint-disable-next-line
            throw {
                status: error.response.status,
                data: error.response.data,
            };
        } else {
            // eslint-disable-next-line
            throw {
                status: null,
                data: { message: error.message },
            };
        }
    }
}
