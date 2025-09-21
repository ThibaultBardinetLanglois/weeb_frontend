import { useState } from "react";

/**
 * useContentField
 * 
 * Custom React hook for managing a content/textarea input field with validation.
 * 
 * Validation Rules:
 * - Field is required
 * - Maximum length: 999 characters
 * 
 * @returns {Object} An object containing:
 *  - content {string} : The current input value
 *  - handleContentChange {function} : Handler for updating and validating the content
 *  - errorContent {boolean} : Indicates whether the field has a validation error
 *  - errorContentMsg {string} : The error message describing the validation issue
 *  - resetContent {function} : Clears the input field
 */
const useContentField = () => {
    const [content, setContent] = useState("");
    const [errorContent, setErrorContent] = useState(false);
    const [errorContentMsg, setErrorContentMsg] = useState("");

    /**
   * Handles input changes and validates content.
   */
    const handleContentChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue.length === 0 || inputValue.length >= 1000) {
            handleContentError(inputValue);
        } else {
            setContent(inputValue);
            setErrorContentMsg("");
            setErrorContent(false);
        }        
    };

    /**
   * Sets appropriate error states and messages based on validation rules.
   */
    const handleContentError = (content) => {
        if (content.length === 0) {
            setContent(content);
            setErrorContent(true);
            setErrorContentMsg("Ce champ est requis !");
        } else if (content.length >= 1000) {
            setErrorContent(true);
            setErrorContentMsg("Ce champ ne peut pas contenir plus de 999 caractères !");
        }
    };

    /** Resets the field back to an empty string. */
    const resetContent = () => setContent("");

    return { content, handleContentChange, errorContent, errorContentMsg, resetContent };
};

export default useContentField;
