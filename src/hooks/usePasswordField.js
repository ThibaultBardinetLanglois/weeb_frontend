import { useState } from "react";
import { isValidPassword } from "../utils/string.utils";

const usePasswordField = () => {
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPasswordMsg, setErrorPasswordMsg] = useState("");

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

    const resetPassword = () => setPassword("");

    return { password, handlePasswordChange, errorPassword, errorPasswordMsg, resetPassword };
};

export default usePasswordField;