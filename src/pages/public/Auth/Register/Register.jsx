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

/**
 * Register Component
 * 
 * A page component for handling user registration.
 * Uses custom hooks to manage and validate form fields (name, firstname, email, password),
 * and handles user registration through an API call.
 * 
 * Features:
 * - Input validation with visual error messages
 * - Submission only enabled when all fields are valid
 * - Displays a loader during API call
 * - Shows modal messages for success or failure
 * 
 * @returns {JSX.Element} The rendered registration form
 */
const Register = () => {
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    /******** HOOKS **********/
    // Name field
    const { name, handleNameChange, errorName, errorNameMsg, resetName } = useNameField();
    // Firstname field
    const { firstname, handleFirstnameChange, errorFirstname, errorFirstnameMsg, resetFirstname } = useFirstnameField();
    // Email field
    const { email, handleEmailChange, errorEmail, errorEmailMsg, resetEmail } = useEmailField();
    // Password field
    const { password, handlePasswordChange, errorPassword, errorPasswordMsg, resetPassword } = usePasswordField();

    /**
     * Handles form submission:
     * Sends the form data to the backend via registerApiCall,
     * handles response, resets inputs, and displays modal feedback.
     */
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

    // Checks if all fields are valid to enable submission
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
                    {/* Name Field */}
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

                    {/* Firstname Field */}
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

                    {/* Email Field */}
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
                    
                    {/* Password Field */}
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

                {/* Submit Section */}
                <div className="auth-register-page__form-bottom">
                    {loading && <CircularProgress className='auth-register-page__form-bottom-loader' size={35} thickness={4} />}
                    <button className={`button ${(!generalCheck()) ? 'button--disabled' : 'button--purple'}`} type="submit">Valider</button>
                </div>
            </form>

            <p> Déjà inscrit ? <Link to="/login">Se connecter</Link></p>

            {/* Modal Feedback */}
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