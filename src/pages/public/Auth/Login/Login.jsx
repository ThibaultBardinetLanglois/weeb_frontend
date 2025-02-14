import { useState } from 'react';
import useEmailField from '../../../../hooks/useEmailField';
import usePasswordField from '../../../../hooks/usePasswordField';
import { Link } from 'react-router-dom';
import FieldGeneration  from '../../../../components/FieldGeneration/FieldGeneration';
import { loginApiCall } from '../api';
import CircularProgress from "@mui/material/CircularProgress";
import ModalComponent from '../../../../components/Modal/Modal';
import "./Auth-login.style.scss";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    /***** Traitement du champ "email" *****/
    const { email, handleEmailChange, errorEmail, errorEmailMsg, resetEmail } = useEmailField();
    /***** Traitement du champ "password" *****/
    const { password, handlePasswordChange, errorPassword, errorPasswordMsg, resetPassword } = usePasswordField();
    
    /***** Traitement de la soumission du formulaire *****/
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

                <div className="auth-login-page__form-bottom">
                    {loading && <CircularProgress className='auth-login-page__form-bottom-loader' size={35} thickness={4} />}
                    <button className={`button ${(!generalCheck()) ? 'button--disabled' : 'button--purple'}`} type="submit">Se connecter</button>
                </div>
            </form>

            <Link className='forgot-password-link' to="#">Mot de passe oublié ?</Link>
            <p className='register-redirection-block'>Vous n’avez pas de compte ? Vous pouvez en <Link to="/register">créer un</Link></p>

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
