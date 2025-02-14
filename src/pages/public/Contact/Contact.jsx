import { useState } from 'react';
import useNameField from '../../../hooks/useNameField';
import useFirstnameField from '../../../hooks/useFirstnameField';
import usePhoneNumberField from '../../../hooks/usePhoneNumberField';
import useEmailField from '../../../hooks/useEmailField';
import useMessageField from '../../../hooks/useMessageField';
import FieldGeneration from '../../../components/FieldGeneration/FieldGeneration';
import { postMessageApiCall } from './api';
import CircularProgress from "@mui/material/CircularProgress";
import ModalComponent from '../../../components/Modal/Modal';
import "./Contact.style.scss";

const Contact = () => { 
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    /******** HOOKS **********/
    /***** Traitement du champ "name" *****/
    const { name, handleNameChange, errorName, errorNameMsg, resetName } = useNameField();
    /***** Traitement du champ "firstname" *****/
    const { firstname, handleFirstnameChange, errorFirstname, errorFirstnameMsg, resetFirstname } = useFirstnameField();
    /***** Traitement du champ "phoneNumber" *****/
    const { phoneNumber, handlePhoneNumberChange, errorPhoneNumber, errorPhoneNumberMsg, resetPhoneNumber } = usePhoneNumberField();
    /***** Traitement du champ "email" *****/
    const { email, handleEmailChange, errorEmail, errorEmailMsg, resetEmail } = useEmailField();
    /***** Traitement du champ "message" *****/
    const { message, handleMessageChange, errorMessage, errorMessageMsg, resetMessage } = useMessageField();

    /***** Traitement de la soumission du formulaire *****/
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = { 
                name, 
                firstname, 
                phoneNumber, 
                email, 
                message 
            };
            const response = await postMessageApiCall(formData);

            console.log("Réponse du serveur :", response);
            if (response.status === 'OK') {
                resetName();
                resetFirstname();
                resetPhoneNumber()
                resetEmail();
                resetMessage();
                setModalOpen(true);
                setModalTitle("Succès !");
                setModalMessage("Votre message a bien été envoyé.");
            } else {
                setModalOpen(true);
                setModalTitle("Échec !");
                setModalMessage("Votre message n'a pas pu être bien traité.");
            }


        } catch (err) {
            setModalOpen(true);
            setModalTitle("Échec !");
            setModalMessage("Suite à un échec serveur votre message n'a bien été envoyé. Veuillez réessayez plus tard");
        } finally {
            setLoading(false);
        }
    };

    const generalCheck = () => (
        name.length > 0 &&
        !errorName &&
        firstname.length > 0 &&
        !errorFirstname &&
        phoneNumber.length > 0 &&
        !errorPhoneNumber &&
        email.length > 0 &&
        !errorEmail &&
        message.length > 0 &&
        !errorMessage
    )
    

    return (
        <div className="page contact-page">
            <h1>Votre avis compte !</h1>
            <p className='contact-page__description'>
                Votre retour est essentiel pour nous améliorer ! Partagez votre expérience, dites-nous ce que vous aimez et ce que nous pourrions améliorer. Vos suggestions nous aident à faire de ce blog une ressource toujours plus utile et enrichissante. 
            </p>

            <form className='contact-page__form' onSubmit={handleFormSubmit}>
                <div className="contact-page__form-top">
                    <div className="contact-page__form-top-field-block">
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

                    <div className="contact-page__form-top-field-block">
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


                    <div className="contact-page__form-top-field-block">
                        {FieldGeneration && FieldGeneration(
                            "Téléphone", 
                            "text", 
                            "téléphone", 
                            "standard", 
                            "100%", 
                            phoneNumber,
                            handlePhoneNumberChange, 
                            100
                        )}
                        <p className={`field-error ${errorPhoneNumber ? 'appear' : 'disappear'}`}>{errorPhoneNumberMsg}</p>
                    </div>

                    <div className="contact-page__form-top-field-block">
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
                </div>
                
                <div className="contact-page__form-msg-field-block">
                    {FieldGeneration && FieldGeneration(
                        "Message", 
                        "text", 
                        "message", 
                        "standard", 
                        "100%",
                        message,
                        handleMessageChange, 
                        1000
                    )}
                    <p className={`field-error ${errorMessage ? 'appear' : 'disappear'}`}>{errorMessageMsg}</p>
                </div>

                <div className="contact-page__form-bottom">
                    {loading && <CircularProgress className='contact-page__form-bottom-loader' size={35} thickness={4} />}
                    <button className={`button ${(!generalCheck()) ? 'button--disabled' : 'button--purple'}`} type="submit">Contact</button>
                </div>
            </form>

            <ModalComponent
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitle}
                message={modalMessage}
            />
        </div>
    )
}

export default Contact