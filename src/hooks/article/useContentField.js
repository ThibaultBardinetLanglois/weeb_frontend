import { useState } from "react";

/**
 * useContentField
 * 
 * Custom React hook for managing a content input field with validation.
 * Handles state, error detection, and error messages for a textarea or long text input.
 * 
 * Validation Rules:
 * - Content is required
 * - Maximum length: 999 characters
 * 
 * @returns {Object} An object containing:
 *  - content {string} : The current content input value
 *  - handleContentChange {function} : Handler for updating and validating the content input
 *  - errorContent {boolean} : Indicates whether the current content has a validation error
 *  - errorContentMsg {string} : A content describing the validation error
 *  - resetContent {function} : Clears the content input field
 */
const useContentField = () => {
    const [content, setContent] = useState("");
    const [errorContent, setErrorContent] = useState(false);
    const [errorContentMsg, setErrorContentMsg] = useState("");

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

    const resetContent = () => setContent("");

    return { content, handleContentChange, errorContent, errorContentMsg, resetContent };
};

export default useContentField;
