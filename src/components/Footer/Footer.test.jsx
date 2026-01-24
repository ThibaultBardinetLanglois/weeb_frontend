jest.mock("../../context/AuthContext", () => {
    const React = require("react");

    return {
        AuthContext: React.createContext({
            user: null,
            isConnected: false,
        }),
    };
});

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

const renderFooter = () =>
    render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>,
    );

describe("Footer component", () => {
    /* =============================
     RENDER GLOBAL
  ============================== */
    test("se rend sans crash", () => {
        renderFooter();
    });

    test("utilise une balise footer (accessibilité)", () => {
        renderFooter();
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    /* =============================
     BRANDING & COPYRIGHT
  ============================== */
    test("affiche le nom de l'application", () => {
        renderFooter();
        expect(screen.getByText("Weeb")).toBeInTheDocument();
    });

    test("affiche le copyright", () => {
        renderFooter();
        expect(
            screen.getByText("@ 2025 Weeb, Inc. All rights reserved."),
        ).toBeInTheDocument();
    });

    /* =============================
     SECTIONS PRINCIPALES
  ============================== */
    test("affiche toutes les sections du footer", () => {
        renderFooter();

        expect(screen.getByText("PRODUCT")).toBeInTheDocument();
        expect(screen.getByText("SOLUTIONS")).toBeInTheDocument();
        expect(screen.getByText("RESSOURCES")).toBeInTheDocument();
        expect(screen.getByText("COMPANY")).toBeInTheDocument();
    });

    /* =============================
     CONTENU DES SECTIONS
  ============================== */
    test("affiche les liens Product", () => {
        renderFooter();

        const items = [
            "Pricing",
            "Overview",
            "Browse",
            "Accessibility",
            "Five",
        ];

        items.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    test("affiche les liens Solutions", () => {
        renderFooter();

        const items = ["Brainstorming", "Ideation", "Wireframing", "Research"];

        items.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    test("affiche les liens Ressources", () => {
        renderFooter();

        const items = ["Help Center", "Blog", "Tutorials"];

        items.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    test("affiche les liens Company", () => {
        renderFooter();

        const items = ["About", "Press", "Events", "Careers"];

        items.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    /* =============================
     RÉSEAUX SOCIAUX
  ============================== */
    test("affiche toutes les icônes de réseaux sociaux", () => {
        renderFooter();

        expect(screen.getByAltText("Youtube Icon")).toBeInTheDocument();
        expect(screen.getByAltText("Facebook Icon")).toBeInTheDocument();
        expect(screen.getByAltText("Twitter Icon")).toBeInTheDocument();
        expect(screen.getByAltText("Instagram Icon")).toBeInTheDocument();
        expect(screen.getByAltText("Linkedin Icon")).toBeInTheDocument();
    });

    test("contient exactement 5 liens de réseaux sociaux", () => {
        renderFooter();

        const links = screen.getAllByRole("link");
        expect(links).toHaveLength(5);
    });

    /* =============================
     STRUCTURE HTML
  ============================== */
    test("contient au moins 5 listes (sections + réseaux)", () => {
        renderFooter();

        const lists = screen.getAllByRole("list");
        expect(lists.length).toBeGreaterThanOrEqual(5);
    });
});
