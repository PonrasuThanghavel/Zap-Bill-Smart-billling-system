const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventoryController');

// Route to get all inventory items
router.get('/getallitems', inventoryController.getAllItems);

// Route to get a single inventory item by product ID
router.get('/:prodid', inventoryController.getItemById);

// Route to add a new inventory item
router.post('/additem', inventoryController.addItem);

// Route to update an inventory item
router.put('/:prodid', inventoryController.updateItem);

// Route to delete an inventory item
router.delete('/:prodid', inventoryController.deleteItem);

module.exports = router;
