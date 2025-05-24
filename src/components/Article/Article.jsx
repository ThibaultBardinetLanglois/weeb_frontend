import "./Article.style.scss";

/**
 * Article Component
 * 
 * This stateless functional component displays an article block
 * with a title and content. It expects the following props:
 * 
 * @param {Object} props - Component props
 * @param {string} props.author - The name of the article's author (currently unused)
 * @param {string} props.title - The title of the article
 * @param {string} props.content - The main content or body of the article
 * 
 * @returns {JSX.Element} A JSX element representing the article block
 */
const Article = ({ author, title, content  }) => (
    <div className="article-bloc">
        <h3>{title}</h3>
        <p>{content}</p>
        <p className="author-text">{author ? author : "Anonyme"}</p>
    </div>
);

export default Article;
