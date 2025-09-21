/**
 * Vérifie si une adresse email a un format valide.
 *
 * @param {string} email - L'adresse email à valider
 * @returns {boolean} true si le format est valide, false sinon
 */
export const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Vérifie si un mot de passe respecte les recommandations OWASP :
 * - Longueur minimale : 14 caractères
 * - Pas de restrictions de composition
 * - Accepte tout type de caractère (y compris espaces et Unicode)
 *
 * @param {string} password - Le mot de passe à valider
 * @returns {boolean} true si valide, false sinon
 */
export const isValidPassword = (password) => {
    return typeof password === "string" && password.length >= 14;
};

/**
 * Vérifie si un numéro de téléphone a un format valide basique.

 * Exemples acceptés :
 *  +33 1 23 45 67
 *  +1-202-555-0173
 *  (01) 23 45 67
 *  0123456789
 *
 * @param {string} phone - Le numéro de téléphone à valider
 * @returns {boolean} true si le format correspond, false sinon
 */
export const isValidPhoneNumber = (phone) =>
    /^(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,5}[-.\s]?\d{3,5}$/.test(phone);


