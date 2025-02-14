import { useState } from "react";
import { isValidEmail } from "../utils/string.utils";

const useEmailField = () => {
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorEmailMsg, setErrorEmailMsg] = useState("");

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

    const resetEmail = () => setEmail("");

    return { email, handleEmailChange, errorEmail, errorEmailMsg, resetEmail };
};

export default useEmailField;