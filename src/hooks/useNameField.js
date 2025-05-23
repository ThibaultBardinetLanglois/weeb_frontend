import { useState } from "react";

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
