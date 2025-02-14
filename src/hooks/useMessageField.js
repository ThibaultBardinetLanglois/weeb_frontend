import { useState } from "react";

const useMessageField = () => {
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorMessageMsg, setErrorMessageMsg] = useState("");

    const handleMessageChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue.length === 0 || inputValue.length >= 1000) {
            handleMessageError(inputValue);
        } else {
            setMessage(inputValue);
            setErrorMessageMsg("");
            setErrorMessage(false);
        }        
    };

    const handleMessageError = (message) => {
        if (message.length === 0) {
            setMessage(message);
            setErrorMessage(true);
            setErrorMessageMsg("Ce champ est requis !");
        } else if (message.length >= 1000) {
            setErrorMessage(true);
            setErrorMessageMsg("Ce champ ne peut pas contenir plus de 999 caractères !");
        }
    };

    const resetMessage = () => setMessage("");

    return { message, handleMessageChange, errorMessage, errorMessageMsg, resetMessage };
};

export default useMessageField;
