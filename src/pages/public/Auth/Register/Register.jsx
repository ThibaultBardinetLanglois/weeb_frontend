import { useState } from 'react';
import useNameField from '../../../../hooks/useNameField';
import useFirstnameField from '../../../../hooks/useFirstnameField';
import useEmailField from '../../../../hooks/useEmailField';
import usePasswordField from '../../../../hooks/usePasswordField';
import { Link } from 'react-router-dom';
import FieldGeneration  from '../../../../components/FieldGeneration/FieldGeneration';
import { registerApiCall } from '../api';
import CircularProgress from "@mui/material/CircularProgress";
import ModalComponent from '../../../../components/Modal/Modal';
import "./Auth-register.style.scss";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    /******** HOOKS **********/
    /***** Traitement du champ "name" *****/
    const { name, handleNameChange, errorName, errorNameMsg, resetName } = useNameField();
    /***** Traitement du champ "firstname" *****/
    const { firstname, handleFirstnameChange, errorFirstname, errorFirstnameMsg, resetFirstname } = useFirstnameField();
    /***** Traitement du champ "email" *****/
    const { email, handleEmailChange, errorEmail, errorEmailMsg, resetEmail } = useEmailField();
    /***** Traitement du champ "password" *****/
    const { password, handlePasswordChange, errorPassword, errorPasswordMsg, resetPassword } = usePasswordField();

    /***** Traitement de la soumission du formulaire *****/
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = { name, firstname, email, password };
            const response = await registerApiCall(formData);

            console.log("Réponse du serveur :", response);
            if (response.status === 'OK') {
                resetName();
                resetFirstname();
                resetEmail();
                resetPassword();
                setModalOpen(true);
                setModalTitle("Succès !");
                setModalMessage("Vous êtes dorénavant enregistré.");
            } else {
                setModalOpen(true);
                setModalTitle("Échec !");
                setModalMessage("Votre inscription n'a pas pu être bien traité.");
            }
        } catch (err) {
            setModalOpen(true);
            setModalTitle("Échec !");
            setModalMessage("Suite à un échec serveur votre inscription n'a pas pu être bien traité. Veuillez réessayez plus tard");
        } finally {
            setLoading(false);
        }
    };

    const generalCheck = () => (
        name.length > 0 &&
        !errorName &&
        firstname.length > 0 &&
        !errorFirstname &&
        email.length > 0 &&
        !errorEmail &&
        password.length > 0 &&
        !errorPassword
    )
        

    return (
        <div className="page auth-register-page">
            <h1>S'enregistrer</h1>
            <form className='auth-register-page__form' onSubmit={handleFormSubmit}>
                <div className="auth-register-page__form-top">
                    <div className="auth-register-page__form-top-field-block">
                        {FieldGeneration && FieldGeneration(
                            "Nom", 
                            "text", 
                            "name", 
                            "standard", 
                            "100%", 
                            name,
                            handleNameChange, 
                            100
                        )}
                        <p className={`field-error ${errorName ? 'appear' : 'disappear'}`}>{errorNameMsg}</p>
                    </div>

                    <div className="auth-register-page__form-top-field-block">
                        {FieldGeneration && FieldGeneration(
                            "Prénom", 
                            "text", 
                            "prénom", 
                            "standard", 
                            "100%", 
                            firstname,
                            handleFirstnameChange, 
                            100
                        )}
                        <p className={`field-error ${errorFirstname ? 'appear' : 'disappear'}`}>{errorFirstnameMsg}</p>
                    </div>

                    <div className="auth-register-page__form-top-field-block">
                        {FieldGeneration && FieldGeneration(
                            "Email", 
                            "text", 
                            "email", 
                            "standard", 
                            "100%", 
                            email,
                            handleEmailChange, 
                            100
                        )}
                        <p className={`field-error ${errorEmail ? 'appear' : 'disappear'}`}>{errorEmailMsg}</p>
                    </div>
                    
                    <div className="auth-register-page__form-top-field-block">
                        {FieldGeneration && FieldGeneration(
                            "Password", 
                            "password", 
                            "password", 
                            "standard", 
                            "100%",
                            password,
                            handlePasswordChange, 
                            1000
                        )}
                        <p className={`field-error ${errorPassword ? 'appear' : 'disappear'}`}>{errorPasswordMsg}</p>
                    </div>
                </div>

                <div className="auth-register-page__form-bottom">
                    {loading && <CircularProgress className='auth-register-page__form-bottom-loader' size={35} thickness={4} />}
                    <button className={`button ${(!generalCheck()) ? 'button--disabled' : 'button--purple'}`} type="submit">Valider</button>
                </div>
            </form>

            <p> Déjà inscrit ? <Link to="/login">Se connecter</Link></p>

            <ModalComponent
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitle}
                message={modalMessage}
            />
        </div>
    )
}

export default Register