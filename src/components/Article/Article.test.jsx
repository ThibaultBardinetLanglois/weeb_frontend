import { render, screen } from "@testing-library/react";
import Article from "./Article";

describe("Article component", () => {
    /* =============================
     RENDER DE BASE
  ============================== */
    test("se rend sans crash", () => {
        render(
            <Article
                title="Titre"
                content="Contenu"
                author="Auteur"
                publicationDate="2025-01-01"
            />,
        );
    });

    /* =============================
     CONTENU PRINCIPAL
  ============================== */
    test("affiche le titre et le contenu", () => {
        render(
            <Article
                title="Mon article"
                content="Voici le contenu"
                author="John Doe"
                publicationDate="2025-01-01"
            />,
        );

        expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
            "Mon article",
        );

        expect(screen.getByText("Voici le contenu")).toBeInTheDocument();
    });

    /* =============================
     AUTEUR
  ============================== */
    test("affiche le nom de l'auteur si fourni", () => {
        render(
            <Article
                title="Article"
                content="Contenu"
                author="Jane Doe"
                publicationDate="2025-01-01"
            />,
        );

        expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    });

    test("affiche 'Anonyme' si l'auteur est absent", () => {
        render(
            <Article
                title="Article"
                content="Contenu"
                publicationDate="2025-01-01"
            />,
        );

        expect(screen.getByText("Anonyme")).toBeInTheDocument();
    });

    /* =============================
     DATE DE PUBLICATION
  ============================== */
    test("affiche la date de publication", () => {
        render(
            <Article
                title="Article"
                content="Contenu"
                author="Auteur"
                publicationDate="2025-02-15"
            />,
        );

        expect(screen.getByText("2025-02-15")).toBeInTheDocument();
    });

    /* =============================
     STRUCTURE HTML
  ============================== */
    test("contient exactement un titre h3 et trois paragraphes", () => {
        render(
            <Article
                title="Article"
                content="Contenu"
                author="Auteur"
                publicationDate="2025-01-01"
            />,
        );

        const headings = screen.getAllByRole("heading", { level: 3 });
        const paragraphs = document.querySelectorAll("p");

        expect(headings).toHaveLength(1);
        expect(paragraphs).toHaveLength(3);
    });

    /* =============================
     ROBUSTESSE
  ============================== */
    test("supporte un contenu long", () => {
        const longContent = "Lorem ipsum ".repeat(50);

        render(
            <Article
                title="Article long"
                content={longContent}
                author="Auteur"
                publicationDate="2025-01-01"
            />,
        );

        const paragraph = screen.getByText((text) =>
            text.startsWith("Lorem ipsum"),
        );

        expect(paragraph).toBeInTheDocument();
    });
});
