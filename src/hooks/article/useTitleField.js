import { useState } from "react";


/**
 * useTitleField
 * 
 * Custom React hook for managing and validating a title input field.
 * Handles change events, validation rules, error messaging, and state reset.
 * 
 * Validation Rules:
 * - Title is required
 * - Maximum length: 99 characters
 * 
 * @returns {Object} An object containing:
 *  - title {string} : The current value of the title input
 *  - handleTitleChange {function} : Change handler to update and validate input
 *  - errorTitle {boolean} : Indicates if there's a validation error
 *  - errorTitleMsg {string} : Error message describing the validation issue
 *  - resetTitle {function} : Resets the title value to an empty string
 */
const useTitleField = () => {
    const [title, setTitle] = useState("");
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorTitleMsg, setErrorTitleMsg] = useState("");

    const handleTitleChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue.length === 0 || inputValue.length >= 100) {
            handleTitleError(inputValue);
        } else {
            setTitle(inputValue);
            setErrorTitleMsg("");
            setErrorTitle(false);
        }
    };

    const handleTitleError = (title) => {
        if (title.length === 0) {
            setTitle(title);
            setErrorTitle(true);
            setErrorTitleMsg("Ce champ est requis !");
        } else if (title.length >= 100) {
            setErrorTitle(true);
            setErrorTitleMsg("Ce champ ne peut pas contenir plus de 99 caractères !");
        }
    };

    const resetTitle = () => setTitle("");

    return { title, handleTitleChange, errorTitle, errorTitleMsg, resetTitle };
};

export default useTitleField;
