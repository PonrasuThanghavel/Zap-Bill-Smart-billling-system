const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

async function hashPassword(password) {
  if (!password) throw new Error("Password is required"); // ✅ Prevents empty password
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}

async function comparePasswords(password, hashedPassword) {
  if (!password || !hashedPassword)
    throw new Error("Both password and hash are required");
  return bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPassword, comparePasswords };
