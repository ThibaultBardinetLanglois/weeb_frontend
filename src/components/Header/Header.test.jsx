jest.mock("../../context/AuthContext", () => {
    const React = require("react");
    return {
        AuthContext: React.createContext({
            isConnected: false,
            logout: jest.fn(),
        }),
    };
});

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import { AuthContext } from "../../context/AuthContext";

/* =============================
   MOCK useNavigate
============================== */
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

/* =============================
   HELPERS
============================== */
const renderHeader = ({ isConnected = false, logout = jest.fn() } = {}) => {
    return render(
        <AuthContext.Provider value={{ isConnected, logout }}>
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        </AuthContext.Provider>,
    );
};

describe("Header component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    /* =============================
     RENDER GLOBAL
  ============================== */
    test("se rend sans crash", () => {
        renderHeader();
    });

    test("affiche le logo / lien home", () => {
        renderHeader();
        expect(screen.getAllByText("Weeb")[0]).toBeInTheDocument();
    });

    /* =============================
     NAVIGATION (non connecté)
  ============================== */
    test("affiche les boutons Login et Join Now quand non connecté", () => {
        renderHeader({ isConnected: false });

        expect(screen.getByText("Log In")).toBeInTheDocument();
        expect(screen.getByText("Join Now")).toBeInTheDocument();
        expect(screen.queryByText("Logout")).not.toBeInTheDocument();
    });

    test("n'affiche PAS le lien Publication quand non connecté", () => {
        renderHeader({ isConnected: false });

        expect(screen.queryByText("Publication")).not.toBeInTheDocument();
    });

    /* =============================
     NAVIGATION (connecté)
  ============================== */
    test("affiche le bouton Logout quand connecté", () => {
        renderHeader({ isConnected: true });

        expect(screen.getByText("Logout")).toBeInTheDocument();
        expect(screen.queryByText("Log In")).not.toBeInTheDocument();
        expect(screen.queryByText("Join Now")).not.toBeInTheDocument();
    });

    test("affiche le lien Publication quand connecté", () => {
        renderHeader({ isConnected: true });

        expect(screen.getByText("Publication")).toBeInTheDocument();
    });

    /* =============================
     LOGOUT
  ============================== */
    test("logout appelle la fonction logout et redirige vers /", async () => {
        const logoutMock = jest.fn().mockResolvedValue();

        renderHeader({ isConnected: true, logout: logoutMock });

        const logoutButton = screen.getByText("Logout");
        await userEvent.click(logoutButton);

        expect(logoutMock).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });

    /* =============================
     BURGER MENU
  ============================== */
    test("ouvre et ferme le menu burger au clic", () => {
        renderHeader();

        const burger = document.querySelector(
            ".header-container__burger-block",
        );
        const navbar = document.querySelector(".header-container__navbar");

        // fermé par défaut
        expect(navbar.className).not.toContain("change");

        // ouvre
        fireEvent.click(burger);
        expect(navbar.className).toContain("change");

        // referme
        fireEvent.click(burger);
        expect(navbar.className).not.toContain("change");
    });

    test("ferme le burger menu lors d'un clic sur un lien en mobile", async () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 600,
        });

        renderHeader();

        const burger = document.querySelector(
            ".header-container__burger-block",
        );
        fireEvent.click(burger);

        const navbar = document.querySelector(".header-container__navbar");
        expect(navbar.className).toContain("change");

        const contactLink = screen.getByText("Contact");
        await userEvent.click(contactLink);

        expect(navbar.className).not.toContain("change");
    });

    /* =============================
     ACCESSIBILITÉ / STRUCTURE
  ============================== */
    test("contient une navigation", () => {
        renderHeader();
        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    test("contient au moins 3 liens de navigation", () => {
        renderHeader();
        const links = screen.getAllByRole("link");
        expect(links.length).toBeGreaterThanOrEqual(3);
    });
});
