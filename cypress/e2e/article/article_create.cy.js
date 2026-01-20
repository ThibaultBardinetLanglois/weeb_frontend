describe("Article creation (authenticated user)", () => {
    it("allows a logged-in user to create an article", () => {
        // 1️⃣ Visit login page
        cy.visit("/login");

        // 2️⃣ Login
        cy.get('input[autocomplete="email"]').type("cypress@example.com");
        cy.get('input[autocomplete="password"]').type("cypress-password");
        cy.get("form").submit();

        // 3️⃣ Verify user is logged in
        cy.contains("Logout").should("be.visible");

        // 4️⃣ Go to article creation page (protected route)
        cy.visit("/articles/publication");

        cy.contains("Créer un article").should("be.visible");

        // 5️⃣ Fill article form
        cy.get('input[autocomplete="titre"]').type("Article Cypress E2E");
        cy.get('input[autocomplete="contenu"]').type(
            "This article was created using Cypress end-to-end tests.",
        );

        // 6️⃣ Submit form
        cy.contains("Créer l’article").click();

        // 7️⃣ Success modal appears
        cy.contains("Succès !").should("be.visible");
        cy.contains("L’article a été créé avec succès.").should("be.visible");

        // 8️⃣ Automatic redirection to articles list
        cy.url().should("include", "/articles");

        // 9️⃣ Newly created article is visible
        cy.contains("Article Cypress E2E").should("be.visible");
    });
});
