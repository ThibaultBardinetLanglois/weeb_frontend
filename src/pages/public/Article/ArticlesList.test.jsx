jest.mock("./api", () => ({
    getAllArticles: jest.fn(),
}));

jest.mock("@mui/material/CircularProgress", () => {
    return function MockLoader() {
        return <div data-testid="loader">Loading...</div>;
    };
});

import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ArticlesListPage from "./ArticlesList";
import { getAllArticles } from "./api";

const renderPage = () =>
    render(
        <MemoryRouter>
            <ArticlesListPage />
        </MemoryRouter>,
    );

describe("ArticlesListPage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("affiche le loader pendant le chargement", async () => {
        getAllArticles.mockResolvedValueOnce([]);

        renderPage();

        expect(screen.getByTestId("loader")).toBeInTheDocument();

        await waitFor(() => expect(getAllArticles).toHaveBeenCalledTimes(1));
    });

    test("affiche une liste d'articles", async () => {
        getAllArticles.mockResolvedValueOnce([
            {
                id: 1,
                title: "Article 1",
                content: "Contenu",
                author: "Auteur",
                publication_date_str: "2025-01-01",
            },
        ]);

        renderPage();

        expect(await screen.findByText("Article 1")).toBeInTheDocument();
    });

    test("affiche un message si aucun article", async () => {
        getAllArticles.mockResolvedValueOnce([]);

        renderPage();

        expect(
            await screen.findByText("Aucun article trouvé."),
        ).toBeInTheDocument();
    });

    test("affiche un modal en cas d'erreur API", async () => {
        getAllArticles.mockRejectedValueOnce(new Error("Erreur API"));

        renderPage();

        expect(await screen.findByText("Aïe")).toBeInTheDocument();
    });
});
