const mongoose = require('mongoose');

// Define the schema for the User collection
const UserSchema = new mongoose.Schema(
  {
    // Unique identifier for the user
    userID: { type: String, required: true, unique: true },
    
    // Username chosen by the user
    username: { type: String, required: true, unique: true },
    
    // User's phone number
    phone: { type: String, required: true },
    
    // User's location (e.g., city, country)
    location: { type: String, required: true },
    
    // User's email address
    email: { type: String, required: true, unique: true },
    
    // Points earned by the user in the system
    points: { type: Number, default: 0 },
    
    // Hashed password for user authentication
    passwordHash: { type: String, required: true },
    
    // Account status (e.g., active, suspended)
    accountStatus: { type: String, default: "active" },
    
    // Date and time when the account was created
    createdAt: { type: Date, default: Date.now },
    
    // Timestamp of the user's last login
    lastLogin: { type: Date },
    
    // URL or path to the user's profile picture
    profilePicture: { type: String, default: "" },
    
    // User preferences (can store settings or preferences as an object)
    preferences: { type: Object, default: {} }
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true
  }
);

// Create the User model based on the schema
const User = mongoose.model('User', UserSchema);

// Export the User model for use in other parts of the application
module.exports = User;
