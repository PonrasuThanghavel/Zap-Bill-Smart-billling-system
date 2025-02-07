const mongoose = require("mongoose");

// Define the schema for the User collection
const UserSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    points: { type: Number, default: 0 },
    passwordHash: { type: String, required: true },
    accountStatus: { type: String, default: "active" },
    lastLogin: { type: Date },
    profilePicture: { type: String, default: "" },
  },
  { timestamps: true }, // Fixed syntax
);

// Create the User model based on the schema
const User = mongoose.model("User", UserSchema);

// Export the User model for use in other parts of the application
module.exports = User;
