import { useState } from 'react';
import useNameField from '../../../../hooks/common/useNameField';
import useFirstnameField from '../../../../hooks/common/useFirstnameField';
import useEmailField from '../../../../hooks/common/useEmailField';
import usePasswordField from '../../../../hooks/auth/usePasswordField';
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
            const formData = { lastname: name, firstname, email, password }; // "lastname" key expected by API
            const response = await registerApiCall(formData);

            // If the API returns a success message
            if (response.status === 201) {
                resetName();
                resetFirstname();
                resetEmail();
                resetPassword();
                setModalOpen(true);
                setModalTitle("Succès !");
                setModalMessage("Vous êtes dorénavant enregistré. Vous pourrez vous connecter lorsqu'un administrateur aura validé votre demande");
            } else {
                setModalOpen(true);
                setModalTitle("Échec !");
                setModalMessage("Une erreur est survenue lors de votre inscription.");
            }
        } catch (err) {
            // Network or API error
            console.error("Erreur API :", err);

            let errorMsg = "Suite à un échec serveur, votre inscription n'a pas pu être traitée. Veuillez réessayer plus tard";

            if (err.status === 400 && err.data.non_field_errors) {
                errorMsg = err.data.non_field_errors[0]; // Display the first message if validation fails
            }  else {
                // Retrieve the first error key (ex: "email")
                const firstKey = Object.keys(err.data)[0];
                if (firstKey && Array.isArray(err.data[firstKey])) {
                  errorMsg = err.data[firstKey][0];
                }
            }

            setModalOpen(true);
            setModalTitle("Échec !");
            setModalMessage(errorMsg);
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
