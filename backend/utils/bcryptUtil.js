const bcrypt = require('bcrypt');

// Default salt rounds for bcrypt
const SALT_ROUNDS = 12;

/**
 * Hashes a password with a salt using bcrypt
 * @param {string} password - The plain password to hash
 * @returns {Promise<string>} - The hashed password
 */
async function hashPassword(password) {
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    // Hash password with salt
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message);
  }
}

/**
 * Verifies if a password matches a hashed password
 * @param {string} password - The plain password to check
 * @param {string} hashedPassword - The stored hashed password to compare against
 * @returns {Promise<boolean>} - True if password matches, otherwise false
 */
async function verifyPassword(password, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error verifying password: ' + error.message);
  }
}

/**
 * Generates a salt using bcrypt
 * @returns {Promise<string>} - The generated salt
 */
async function generateSalt() {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return salt;
  } catch (error) {
    throw new Error('Error generating salt: ' + error.message);
  }
}

/**
 * Compares a plain password to a hashed password
 * @param {string} password - The plain password to compare
 * @param {string} hash - The hashed password to compare against
 * @returns {Promise<boolean>} - True if they match, otherwise false
 */
async function comparePasswords(password, hash) {
  try {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (error) {
    throw new Error('Error comparing passwords: ' + error.message);
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateSalt,
  comparePasswords,
};
