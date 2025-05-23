import { useState } from "react";

const useFirstnameField = () => {
    const [firstname, setFirstname] = useState("");
    const [errorFirstname, setErrorFirstname] = useState(false);
    const [errorFirstnameMsg, setErrorFirstnameMsg] = useState("");

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

    const resetFirstname = () => setFirstname("");

    return { firstname, handleFirstnameChange, errorFirstname, errorFirstnameMsg, resetFirstname };
};

export default useFirstnameField;
