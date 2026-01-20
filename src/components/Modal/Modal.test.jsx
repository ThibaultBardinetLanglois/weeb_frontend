import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalComponent from "./Modal";

describe("ModalComponent", () => {
    const defaultProps = {
        open: true,
        onClose: jest.fn(),
        title: "Titre du modal",
        message: "Message du modal",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    /* =============================
     RENDER / VISIBILITÉ
  ============================== */
    test("ne s'affiche pas quand open=false", () => {
        render(<ModalComponent {...defaultProps} open={false} />);

        expect(screen.queryByText(defaultProps.title)).not.toBeInTheDocument();

        expect(
            screen.queryByText(defaultProps.message),
        ).not.toBeInTheDocument();
    });

    test("s'affiche quand open=true", () => {
        render(<ModalComponent {...defaultProps} />);

        expect(screen.getByText(defaultProps.title)).toBeInTheDocument();

        expect(screen.getByText(defaultProps.message)).toBeInTheDocument();
    });

    /* =============================
     CONTENU
  ============================== */
    test("affiche le titre et le message correctement", () => {
        render(<ModalComponent {...defaultProps} />);

        const title = screen.getByRole("heading", { level: 4 });
        const message = screen.getByText(defaultProps.message);

        expect(title).toHaveTextContent(defaultProps.title);
        expect(message).toBeInTheDocument();
    });

    /* =============================
     ACCESSIBILITÉ
  ============================== */
    test("utilise les attributs aria correctement", () => {
        render(<ModalComponent {...defaultProps} />);

        const modal = screen.getByRole("presentation");
        expect(modal).toHaveAttribute("aria-labelledby", "modal-modal-title");
        expect(modal).toHaveAttribute(
            "aria-describedby",
            "modal-modal-description",
        );
    });

    /* =============================
     INTERACTIONS
  ============================== */
    test("appelle onClose quand on clique en dehors du modal", async () => {
        const user = userEvent.setup();

        render(<ModalComponent {...defaultProps} />);

        // MUI rend le backdrop comme un élément role="presentation"
        const backdrop = document.querySelector(".MuiBackdrop-root");
        expect(backdrop).toBeInTheDocument();

        await user.click(backdrop);

        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    /* =============================
     ERREUR
  ============================== */
    test("supporte des titres et messages dynamiques", () => {
        render(
            <ModalComponent
                open
                onClose={jest.fn()}
                title="Erreur"
                message="Une erreur est survenue"
            />,
        );

        expect(screen.getByText("Erreur")).toBeInTheDocument();
        expect(screen.getByText("Une erreur est survenue")).toBeInTheDocument();
    });
});
