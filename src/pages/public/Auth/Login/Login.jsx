import { useState } from 'react';
import useEmailField from '../../../../hooks/useEmailField';
import usePasswordField from '../../../../hooks/usePasswordField';
import { Link } from 'react-router-dom';
import FieldGeneration  from '../../../../components/FieldGeneration/FieldGeneration';
import { loginApiCall } from '../api';
import CircularProgress from "@mui/material/CircularProgress";
import ModalComponent from '../../../../components/Modal/Modal';
import "./Auth-login.style.scss";

/**
 * Login Component
 * 
 * A page component for handling user login functionality.
 * Uses custom hooks for email and password input validation,
 * and handles authentication via an API call.
 * 
 * Features:
 * - Input validation with visual feedback
 * - Submit button disabled until all fields are valid
 * - Displays modal with success or error messages
 * - Shows loader while waiting for API response
 * 
 * @returns {JSX.Element} The rendered login form and associated UI
 */
const Login = () => {
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    /******** HOOKS **********/
    // Email field management
    const { email, handleEmailChange, errorEmail, errorEmailMsg, resetEmail } = useEmailField();
    // Password field management
    const { password, handlePasswordChange, errorPassword, errorPasswordMsg, resetPassword } = usePasswordField();
    
    // Handles form submission and API interaction
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = { email, password };
            const response = await loginApiCall(formData);

            console.log("Réponse du serveur :", response);
            if (response.status === 'OK') {
                resetEmail();
                resetPassword();
                setModalOpen(true);
                setModalTitle("Succès !");
                setModalMessage("Vous êtes dorénavant connecté.");
            } else {
                setModalOpen(true);
                setModalTitle("Échec !");
                setModalMessage("Votre connexion n'a pas pu être bien traité.");
            }
        } catch (err) {
            setModalOpen(true);
            setModalTitle("Échec !");
            setModalMessage("Suite à un échec serveur votre connexion n'a pas pu être bien traité. Veuillez réessayez plus tard");
        } finally {
            setLoading(false);
        }
    };

    // Returns true if form is valid and ready to submit
    const generalCheck = () => (
        email.length > 0 &&
        !errorEmail &&
        password.length > 0 &&
        !errorPassword
    )

    return (
        <div className="page auth-login-page">
            <h1>Se connecter</h1>
            <form className='auth-login-page__form' onSubmit={handleFormSubmit}>
                {/* Email Field */}
                <div className="auth-login-page__form-field-block">
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
                <div className="auth-login-page__form-field-block">
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

                {/* Submit Section */}
                <div className="auth-login-page__form-bottom">
                    {loading && <CircularProgress className='auth-login-page__form-bottom-loader' size={35} thickness={4} />}
                    <button className={`button ${(!generalCheck()) ? 'button--disabled' : 'button--purple'}`} type="submit">Se connecter</button>
                </div>
            </form>

            <Link className='forgot-password-link' to="#">Mot de passe oublié ?</Link>
            <p className='register-redirection-block'>Vous n’avez pas de compte ? Vous pouvez en <Link to="/register">créer un</Link></p>

            {/* Modal for feedback messages */}
            <ModalComponent
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitle}
                message={modalMessage}
            />
        </div>
      );
}

export default Login
