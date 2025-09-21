import { useState } from "react";
import { isValidPassword } from "../../utils/string.utils";

/**
 * usePasswordField
 * 
 * Custom React hook for managing and validating a password input field.
 * Encapsulates logic for state management, format checks, and error handling.
 * 
 * Validation Rules:
 * - Password is required
 * - Maximum length: 99 characters
 * - Must match a valid password format (controlled by isValidPassword)
 * 
 * @returns {Object} An object containing:
 *  - password {string} : The current password value
 *  - handlePasswordChange {function} : Change handler that validates the input
 *  - errorPassword {boolean} : Indicates whether the current password has an error
 *  - errorPasswordMsg {string} : Error message for the validation issue
 *  - resetPassword {function} : Resets the password to an empty string
 */
const usePasswordField = () => {
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPasswordMsg, setErrorPasswordMsg] = useState("");

    /**
   * Handles input changes and runs validation.
   */
    const handlePasswordChange = (event) => {
        const inputValue = event.target.value;
        
        if (
            inputValue.length === 0 ||
            inputValue.length >= 100 ||
            !isValidPassword(inputValue)
        ) {
            handlePasswordError(inputValue);
        } else {
            setPassword(inputValue);
            setErrorPasswordMsg("");
            setErrorPassword(false);
        }
    };

    /**
   * Sets appropriate error messages depending on validation rules.
   */
    const handlePasswordError = (password) => {
        if (password.length === 0) {
            setPassword(password);
            setErrorPassword(true);
            setErrorPasswordMsg("Ce champ est requis !");
        } else if (password.length >= 100) {
            setErrorPassword(true);
            setErrorPasswordMsg("Ce champ ne peut pas contenir plus de 99 caractères !");
        } else if (!isValidPassword(password)) {
            setPassword(password);
            setErrorPassword(true);
            setErrorPasswordMsg("Ce champ doit être au bon format !");
        }
    }

    /** Resets the password back to an empty string. */
    const resetPassword = () => setPassword("");

    return { password, handlePasswordChange, errorPassword, errorPasswordMsg, resetPassword };
};

export default usePasswordField;