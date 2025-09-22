import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTitleField from "../../../hooks/article/useTitleField";
import useContentField from "../../../hooks/article/useContentField";
import FieldGeneration from "../../../components/FieldGeneration/FieldGeneration";
import { createArticle } from "../../public/Article/api";
import CircularProgress from "@mui/material/CircularProgress";
import ModalComponent from "../../../components/Modal/Modal";
import "./Article.style.scss";

/**
 * ArticleCreate Page Component
 *
 * A dedicated page for creating a new article. It renders a form with:
 * Validates input fields using custom hooks and submits the data to the backend API.
 * Displays a modal to indicate success or failure of the message submission.
 *
 * Uses custom hooks for field state/validation, posts data via `createArticle`,
 * and shows a modal for success/error. A loader appears during submission.
 */
const ArticleCreate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    /******** HOOKS **********/
    const { title, handleTitleChange, errorTitle, errorTitleMsg, resetTitle } = useTitleField();
    const { content, handleContentChange, errorContent, errorContentMsg, resetContent } = useContentField();

    /**
     * Submit form to API (all fields required, including author)
     */
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = {
                title: title.trim(),
                content: content.trim(),
            };

            const response = await createArticle(formData);

             if (response.status === 201 && response.statusText === "Created") {
                resetTitle();
                resetContent();

                setModalOpen(true);
                setModalTitle("Succès !");
                setModalMessage("L’article a été créé avec succès.");
                setTimeout(() => {
                    navigate("/articles");
                }, 1000);
            } else {
                setModalOpen(true);
                setModalTitle("Échec !");
                setModalMessage("Une erreur est survenue lors de la création de l’article.");
            }
        } catch (err) {
            setModalOpen(true);
            setModalTitle("Échec !");
            setModalMessage("Suite à un échec serveur la donnée n'a pas été envoyée. Veuillez réessayez plus tard");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Global validation to enable the submit button
     * - title required & valid
     * - author required & valid
     * - content required & valid
     */
    const generalCheck = () =>
        title.trim().length > 0 &&
        !errorTitle &&
        content.trim().length > 0 &&
        !errorContent;

    return (
        <div className="page article-page">
            <h1>Créer un article</h1>

            <form className="article-page__form" onSubmit={handleFormSubmit}>
                    {/* Title Field */}
                <div className="article-page__form-field-block">
                    {FieldGeneration && FieldGeneration(
                        "Titre",
                        "text",
                        "titre",
                        "standard",
                        "100%",
                        title,
                        handleTitleChange,
                        99
                    )}
                    <p className={`field-error ${errorTitle ? "appear" : "disappear"}`}>{errorTitleMsg}</p>
                </div>

                {/* Content Field */}
                <div className="article-page__form-field-block">
                    {FieldGeneration && FieldGeneration(
                        "Contenu",
                        "text",
                        "contenu",
                        "standard",
                        "100%",
                        content,
                        handleContentChange,
                        5000
                    )}
                    <p className={`field-error ${errorContent ? "appear" : "disappear"}`}>{errorContentMsg}</p>
                </div>

                {/* Submit button and Loader */}
                <div className="article-page__form-bottom">
                    {loading && <CircularProgress className="article-page__form-bottom-loader" size={35} thickness={4} />}
                    <button
                        className={`button ${!generalCheck() || loading ? "button--disabled" : "button--purple"}`}
                        type="submit"
                        disabled={!generalCheck() || loading}
                    >
                        Créer l’article
                    </button>
                </div>
            </form>

            {/* Feedback Modal */}
            <ModalComponent
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitle}
                message={modalMessage}
            />
        </div>
    );
};

export default ArticleCreate;
