const mongoose = require("mongoose");

// Define the schema for the Store collection
const StoreSchema = new mongoose.Schema(
  {
    // Unique identifier for the store
    storeId: { type: String, required: true },

    // Name of the store
    storeName: { type: String, required: true },

    // Name of the store owner
    storeOwner: { type: String, required: true },

    // Contact number for the store
    storeContact: { type: Number, required: true },

    // Email address for the store (validated on the frontend)
    storeEmail: { type: String, required: true },

    // Street address of the store
    streetAddress: { type: String, required: true },

    // City where the store is located
    city: { type: String, required: true },

    // State where the store is located
    state: { type: String, required: true },

    // Postal code for the store's location
    pincode: { type: String, required: true },

    // Opening time of the store
    openingTime: { type: String, required: true },

    // Closing time of the store
    closingTime: { type: String, required: true },

    // Name or ID of the person who last updated the store record
    updatedBy: { type: String, required: true },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  },
);

// Create the Store model based on the schema
const Store = mongoose.model("Store", StoreSchema);

// Export the Store model for use in other parts of the application
module.exports = Store;
