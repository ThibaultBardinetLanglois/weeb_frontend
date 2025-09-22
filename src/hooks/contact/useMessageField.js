import { useState } from "react";

/**
 * useMessageField
 * 
 * Custom React hook for managing a message input field with validation.
 * Handles state, error detection, and error messages for a textarea or long text input.
 * 
 * Validation Rules:
 * - Message is required
 * - Maximum length: 999 characters
 * 
 * @returns {Object} An object containing:
 *  - message {string} : The current message input value
 *  - handleMessageChange {function} : Handler for updating and validating the message input
 *  - errorMessage {boolean} : Indicates whether the current message has a validation error
 *  - errorMessageMsg {string} : A message describing the validation error
 *  - resetMessage {function} : Clears the message input field
 */
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
