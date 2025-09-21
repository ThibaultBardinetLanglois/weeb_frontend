import { useState } from "react";


/**
 * useFirstnameField
 * 
 * Custom React hook for managing and validating a first name input field.
 * Handles change events, validation rules, error messaging, and state reset.
 * 
 * Validation Rules:
 * - First name is required
 * - Maximum length: 99 characters
 * 
 * @returns {Object} An object containing:
 *  - firstname {string} : The current value of the first name input
 *  - handleFirstnameChange {function} : Change handler to update and validate input
 *  - errorFirstname {boolean} : Indicates if there's a validation error
 *  - errorFirstnameMsg {string} : Error message describing the validation issue
 *  - resetFirstname {function} : Resets the first name value to an empty string
 */
const useFirstnameField = () => {
    const [firstname, setFirstname] = useState("");
    const [errorFirstname, setErrorFirstname] = useState(false);
    const [errorFirstnameMsg, setErrorFirstnameMsg] = useState("");

    /**
   * Handles input changes and validates the first name.
   */
    const handleFirstnameChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue.length === 0 || inputValue.length >= 100) {
            handleFirstnameError(inputValue);
        } else {
            setFirstname(inputValue);
            setErrorFirstnameMsg("");
            setErrorFirstname(false);
        }
    };

    /**
   * Sets appropriate error states and messages based on validation rules.
   */
    const handleFirstnameError = (firstname) => {
        if (firstname.length === 0) {
            setFirstname(firstname);
            setErrorFirstname(true);
            setErrorFirstnameMsg("Ce champ est requis !");
        } else if (firstname.length >= 100) {
            setErrorFirstname(true);
            setErrorFirstnameMsg("Ce champ ne peut pas contenir plus de 99 caractères !");
        }
    };

    /** Resets the field back to an empty string. */
    const resetFirstname = () => setFirstname("");

    return { firstname, handleFirstnameChange, errorFirstname, errorFirstnameMsg, resetFirstname };
};

export default useFirstnameField;
