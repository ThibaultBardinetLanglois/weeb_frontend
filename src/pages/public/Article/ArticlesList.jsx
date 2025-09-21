import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getAllArticles } from './api';
import Article from '../../../components/Article/Article';
import CircularProgress from "@mui/material/CircularProgress";
import ModalComponent from '../../../components/Modal/Modal';
import "./Article.style.scss";

/**
 * ArticlePage
 * 
 * This page component fetches and displays a list of articles from an API.
 * It handles loading states, error handling via a modal, and displays a message
 * if no articles are found after data is loaded.
 * 
 * - Fetches data on mount using useEffect
 * - Displays a loader while fetching
 * - Shows an error modal if the API call fails
 * - Displays each article using the <Article /> component
 * - Gracefully handles an empty list of articles
 * 
 * @returns {JSX.Element} The rendered article list page
 */
const ArticlesListPage = () => {
    const [articles, setArticles] = useState();
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    // Fetch article data from the API
    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getAllArticles();
            setArticles(data);

            if(!data) {
                setModalOpen(true);
                setModalTitle("Aïe");
                setModalMessage("Une erreur est survenue lors du chargement des articles.");
            }
        } catch (err) {
            setModalOpen(true);
            setModalTitle("Aïe");
            setModalMessage("Une erreur est survenue lors du chargement des articles.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // Trigger fetch on component mount
    useEffect(() => {
        fetchData();
    }, []);

    return (
    <div className="page article-page">
        <h2>Liste des <span>articles</span></h2>

        {/* Loading spinner */}
        {loading && <CircularProgress className='loader' size={35} thickness={4} />}

        <div className="articles-list">
            {/* Render articles only after loading and successful API response */}
            {!loading && articles && articles?.length > 0 &&
                articles.map(article => (
                    <Link key={article.id} to={`/articles/${article.id}`} className="article-link">
                        <Article
                            key={article.id}
                            title={article.title}
                            content={article.content}
                            author={article?.author}
                            publicationDate={article.publication_date_str}
                        />
                    </Link>
                ))
            }
        </div>

        {/* 
            Show empty message only when the fetch has completed and no articles were returned.
            Avoids prematurely showing the message during the initial loading state.
        */}
        {articles && articles?.length === 0 && <p className='list-empty-info'>Aucun article trouvé.</p>}

        {/* Modal for displaying error message if API call fails */}
        <ModalComponent
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title={modalTitle}
            message={modalMessage}
        />
    </div>
    );
};

export default ArticlesListPage;
