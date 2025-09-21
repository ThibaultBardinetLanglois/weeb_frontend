import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "./api";
import CircularProgress from "@mui/material/CircularProgress";
import ModalComponent from "../../../components/Modal/Modal";
import "./Article.style.scss";

const ArticleDetails = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

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

    useEffect(() => {
        fetchArticle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) return <CircularProgress className="loader" size={35} thickness={4} />;

    // Si !article est vrai, le return coupe le rendu après et le reste du JSX ne s'affiche pas.
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
