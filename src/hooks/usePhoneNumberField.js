import { useState } from "react";
import { isValidPhoneNumber } from "../utils/string.utils";

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
