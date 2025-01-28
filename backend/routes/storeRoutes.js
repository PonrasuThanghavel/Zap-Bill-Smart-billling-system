const express = require('express');
const router = express.Router();
const storeController = require('../controller/storeController');

// Routes for CRUD operations
router.post('/', storeController.createStore);                  // Create a store
router.get('/', storeController.getAllStores);                 // Get all stores
router.get('/:storeid', storeController.getStore);             // Get a specific store by ID
router.put('/:storeid', storeController.updateStore);          // Update a specific store
router.delete('/:storeid', storeController.deleteStore);       // Delete a specific store


module.exports = router;
