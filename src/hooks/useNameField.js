import { useState } from "react";

/**
 * useNameField
 * 
 * Custom React hook for managing and validating a generic name input field.
 * Useful for full names, last names, or any other name-type input.
 * 
 * Validation Rules:
 * - Name is required
 * - Maximum length: 99 characters
 * 
 * @returns {Object} An object containing:
 *  - name {string} : The current value of the name input
 *  - handleNameChange {function} : Input change handler with validation
 *  - errorName {boolean} : True if the name input is invalid
 *  - errorNameMsg {string} : Error message describing the validation issue
 *  - resetName {function} : Resets the name input value to an empty string
 */
const useNameField = () => {
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState(false);
    const [errorNameMsg, setErrorNameMsg] = useState("");

    const handleNameChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue.length === 0 || inputValue.length >= 100) {
            handleNameError(inputValue);
        } else {
            setName(inputValue);
            setErrorNameMsg("");
            setErrorName(false);
        }
    };

    const handleNameError = (name) => {
        if (name.length === 0) {
            setName(name);
            setErrorName(true);
            setErrorNameMsg("Ce champ est requis !");
        } else if (name.length >= 100) {
            setErrorName(true);
            setErrorNameMsg("Ce champ ne peut pas contenir plus de 99 caractères !");
        }
    };

    const resetName = () => setName("");

    return { name, handleNameChange, errorName, errorNameMsg, resetName };
};

export default useNameField;
