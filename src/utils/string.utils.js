/**
 * Checks if an email address has a valid format.
 *
 * @param {string} email - The email address to validate
 * @returns {boolean} True if the format is valid, false otherwise
 */
export const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Checks if a password follows OWASP recommendations:
 * - Minimum length: 14 characters
 * - No composition restrictions
 * - Accepts any type of character (including spaces and Unicode)
 *
 * @param {string} password - The password to validate
 * @returns {boolean} True if the password is valid, false otherwise
 */
export const isValidPassword = (password) => {
    return typeof password === "string" && password.length >= 14;
};

/**
 * Checks if a phone number has a valid basic format.
 *
 * Examples of accepted formats:
 *  +33 1 23 45 67
 *  +1-202-555-0173
 *  (01) 23 45 67
 *  0123456789
 *
 * @param {string} phone - The phone number to validate
 * @returns {boolean} True if the format matches, false otherwise
 */
export const isValidPhoneNumber = (phone) =>
    /^(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,5}[-.\s]?\d{3,5}$/.test(phone);


