import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "./api";
import CircularProgress from "@mui/material/CircularProgress";
import ModalComponent from "../../../components/Modal/Modal";
import "./Article.style.scss";

/**
 * ArticleDetails
 *
 * Page component that displays the details of a single article.
 * Fetches the article by its `id` from the API and handles loading/error states.
 *
 * Features:
 * - Fetches article data when the component mounts or when `id` changes.
 * - Displays a loader while fetching.
 * - Shows article content, author, and publication date.
 * - Handles API errors by showing a modal with feedback.
 *
 * @component
 * @returns {JSX.Element} The article detail page
 */
const ArticleDetails = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    /**
   * Retrieves article data by ID from the API.
   * Displays an error modal if the fetch fails.
   */
    const fetchArticle = async () => {
        try {
            const data = await getArticleById(id);
            setArticle(data);
        } catch (err) {
            setModalOpen(true);
            setModalTitle("Erreur");
            setModalMessage("Impossible de charger l'article.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch article whenever the `id` changes
    useEffect(() => {
        fetchArticle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // Show loader while fetching
    if (loading) return <CircularProgress className="loader" size={35} thickness={4} />;

    // If no article was found, stop rendering and display fallback message
    if (!article) return <p>Aucun article trouvé.</p>;

    return (
        <div className="page article-detail-page">
            <h2>{article.title}</h2>
            <p className="content-text">{article.content}</p>
            <p className="author-text">{article?.author ? article.author : "Anonyme"}</p>
            <p>{article.publication_date_str}</p>

            <ModalComponent
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitle}
                message={modalMessage}
            />
        </div>
    );
};

export default ArticleDetails;
