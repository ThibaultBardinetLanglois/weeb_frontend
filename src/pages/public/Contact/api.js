// import axios from "axios";

export const postMessageApiCall = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {

        // Envoi des données avec Axios (remplace cette URL par ton API)
        // const response = await axios.post("https://api", data);

        return { data: data, status: 'OK', method: 'POST', code: 201 }; 
    } catch (error) {
        console.log("Erreur lors de l'envoi des données :", error);
        throw error; 
    }
};
