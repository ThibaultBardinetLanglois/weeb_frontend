import { useState } from "react";
import { isValidEmail } from "../../utils/string.utils";

/**
 * useEmailField
 * 
 * Custom React hook for managing email input state and validation.
 * Provides handlers for change events, validation feedback, and state reset.
 * 
 * Validation Rules:
 * - Email is required
 * - Must not exceed 99 characters
 * - Must match a valid email format
 * 
 * @returns {Object} An object containing:
 *  - email {string} : The current email value
 *  - handleEmailChange {function} : Change handler to update and validate email
 *  - errorEmail {boolean} : Boolean indicating if the current email has an error
 *  - errorEmailMsg {string} : A message describing the email validation error
 *  - resetEmail {function} : Resets the email state to an empty string
 */
const useEmailField = () => {
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorEmailMsg, setErrorEmailMsg] = useState("");

    /**
   * Handles input change and runs validation.
   */
    const handleEmailChange = (event) => {
        const inputValue = event.target.value;
        
        if (
            inputValue.length === 0 ||
            inputValue.length >= 100 ||
            !isValidEmail(inputValue)
        ) {
            handleEmailError(inputValue);
        } else {
            setEmail(inputValue);
            setErrorEmailMsg("");
            setErrorEmail(false);
        }
    };

    /**
   * Sets error state and messages based on validation rules.
   */
    const handleEmailError = (email) => {
        if (email.length === 0) {
            setEmail(email);
            setErrorEmail(true);
            setErrorEmailMsg("Ce champ est requis !");
        } else if (email.length >= 100) {
            setErrorEmail(true);
            setErrorEmailMsg("Ce champ ne peut pas contenir plus de 99 caractères !");
        } else if (!isValidEmail(email)) {
            setEmail(email);
            setErrorEmail(true);
            setErrorEmailMsg("Ce champ doit être au bon format !");
        }
    }

    /** Resets the field back to an empty string. */
    const resetEmail = () => setEmail("");

    return { email, handleEmailChange, errorEmail, errorEmailMsg, resetEmail };
};

export default useEmailField;