import { useState } from "react";
import { isValidPhoneNumber } from "../utils/string.utils";


/**
 * usePhoneNumberField
 * 
 * Custom React hook for managing and validating a phone number input field.
 * Handles value updates, validation checks, and error messaging.
 * 
 * Validation Rules:
 * - Phone number is required
 * - Must match a valid phone number format (validated by isValidPhoneNumber)
 * 
 * @returns {Object} An object containing:
 *  - phoneNumber {string} : The current phone number value
 *  - handlePhoneNumberChange {function} : Change handler that validates the input
 *  - errorPhoneNumber {boolean} : Indicates if there's a validation error
 *  - errorPhoneNumberMsg {string} : Error message describing the issue
 *  - resetPhoneNumber {function} : Clears the phone number input
 */
const usePhoneNumberField = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
    const [errorPhoneNumberMsg, setErrorPhoneNumberMsg] = useState("");

    const handlePhoneNumberChange = (event) => {
        const inputValue = event.target.value;
        
        if (inputValue.length === 0 || !isValidPhoneNumber(inputValue)) {
            handlePhoneNumberError(inputValue);
        } else {
            setPhoneNumber(inputValue);
            setErrorPhoneNumberMsg("");
            setErrorPhoneNumber(false);
        }
    };

    const handlePhoneNumberError = (phoneNumber) => {
        if (phoneNumber.length === 0) {
            setPhoneNumber(phoneNumber);
            setErrorPhoneNumber(true);
            setErrorPhoneNumberMsg("Ce champ est requis !");
        } else if (!isValidPhoneNumber(phoneNumber)) {
            setPhoneNumber(phoneNumber);
            setErrorPhoneNumber(true);
            setErrorPhoneNumberMsg("Ce champ doit être au bon format !");
        }
    }

    const resetPhoneNumber = () => setPhoneNumber("");

    return { phoneNumber, handlePhoneNumberChange, errorPhoneNumber, errorPhoneNumberMsg, resetPhoneNumber };
};

export default usePhoneNumberField;
