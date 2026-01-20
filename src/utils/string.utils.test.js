import {
    isValidEmail,
    isValidPassword,
    isValidPhoneNumber,
} from "./string.utils";

describe("utils/strings.utils", () => {
    describe("isValidEmail", () => {
        test("retourne true pour des emails valides classiques", () => {
            expect(isValidEmail("test@example.com")).toBe(true);
            expect(isValidEmail("john.doe+tag@sub.domain.fr")).toBe(true);
            expect(isValidEmail("a@b.co")).toBe(true);
        });

        test("retourne false pour des formats invalides", () => {
            expect(isValidEmail("")).toBe(false);
            expect(isValidEmail("test")).toBe(false);
            expect(isValidEmail("test@")).toBe(false);
            expect(isValidEmail("@example.com")).toBe(false);
            expect(isValidEmail("test@example")).toBe(false);
            expect(isValidEmail("test@@example.com")).toBe(false);
            expect(isValidEmail("test@exa mple.com")).toBe(false);
        });

        test("retourne false si des espaces entourent l'email (pas de trim implicite)", () => {
            expect(isValidEmail(" test@example.com ")).toBe(false);
        });
    });

    describe("isValidPassword", () => {
        test("retourne true si string et longueur >= 14", () => {
            expect(isValidPassword("12345678901234")).toBe(true);
            expect(isValidPassword("a-very-long-password")).toBe(true);
            expect(isValidPassword("mot de passe très long")).toBe(true);
            expect(isValidPassword("密码密码密码密码密码密码码码")).toBe(true);
        });

        test("retourne false si longueur < 14", () => {
            expect(isValidPassword("")).toBe(false);
            expect(isValidPassword("short")).toBe(false);
            expect(isValidPassword("1234567890123")).toBe(false);
        });

        test("retourne false si pas une string", () => {
            expect(isValidPassword(null)).toBe(false);
            expect(isValidPassword(undefined)).toBe(false);
            expect(isValidPassword(12345678901234)).toBe(false);
            expect(isValidPassword({})).toBe(false);
            expect(isValidPassword([])).toBe(false);
        });
    });

    describe("isValidPhoneNumber", () => {
        test("retourne true pour des formats acceptés (exemples)", () => {
            expect(isValidPhoneNumber("+1-202-555-0173")).toBe(true);
            expect(isValidPhoneNumber("0123456789")).toBe(true);
            expect(isValidPhoneNumber("+33123456789")).toBe(true);
        });

        test("retourne false pour des formats invalides", () => {
            expect(isValidPhoneNumber("")).toBe(false);
            expect(isValidPhoneNumber("abcdef")).toBe(false);
            expect(isValidPhoneNumber("++33 1 23 45 67")).toBe(false);
            expect(isValidPhoneNumber("01 23")).toBe(false);
            expect(isValidPhoneNumber("01 23 45 67 8900000")).toBe(false);
        });

        test("retourne false si le téléphone contient des caractères non attendus", () => {
            expect(isValidPhoneNumber("+33 (0)1 23 45 67")).toBe(false);
            expect(isValidPhoneNumber("01 23 45 67 ext 123")).toBe(false);
        });
    });
});
