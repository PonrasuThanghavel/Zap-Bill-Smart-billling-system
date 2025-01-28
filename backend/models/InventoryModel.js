const mongoose = require('mongoose');

// Define the schema for the Inventory collection
const InventorySchema = new mongoose.Schema(
  {
    // Unique identifier for the inventory record (Primary Key)
    inventoryID: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      unique: true, 
      auto: true 
    },
    
    // Identifier for the product (Foreign Key to Product Table)
    productID: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: 'Product'  // Assuming you have a 'Product' model
    },
    
    // Name of the product
    productName: { 
      type: String, 
      required: true 
    },
    
    // Quantity of the product in stock
    quantity: { 
      type: Number, 
      required: true 
    },
    
    // Minimum quantity before restocking is required
    thresholdLimit: { 
      type: Number, 
      required: true 
    },
    
    // Timestamp for the last update to this inventory item
    lastUpdated: { 
      type: Date, 
      default: Date.now 
    }
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true
  }
);

// Create the Inventory model based on the schema
const Inventory = mongoose.model('Inventory', InventorySchema);

// Export the Inventory model for use in other parts of the application
module.exports = Inventory;
