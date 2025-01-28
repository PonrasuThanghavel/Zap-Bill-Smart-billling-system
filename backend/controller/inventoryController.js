const Inventory = require('../models/InventoryModel');
const { SUCCESS, ERROR, STATUS_CODES } = require('../utils/constants');

// Get all inventory items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Inventory.find();
    
    res.status(STATUS_CODES.OK).json({ message: SUCCESS.ITEM_FETCHED, items });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_ERROR).json({ error: ERROR.FETCHING_ITEM });
  }
};

// Get a single item by product ID
exports.getItemById = async (req, res) => {
  const { prodid } = req.params;
  try {
    const item = await Inventory.findOne({ prodid });
    if (!item) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: ERROR.ITEM_NOT_FOUND });
    }
    res.status(STATUS_CODES.OK).json(item);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_ERROR).json({ error: ERROR.FETCHING_ITEM });
  }
};

// Add a new item to inventory
exports.addItem = async (req, res) => {
  const { prodid, prodname, prodprice, prodstock } = req.body;
  try {
    const newItem = new Inventory({ prodid, prodname, prodprice, prodstock });
    await newItem.save();
    res.status(STATUS_CODES.CREATED).json({ message: SUCCESS.ITEM_ADDED, item: newItem });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_ERROR).json({ error: ERROR.ADDING_ITEM });
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  const { prodid } = req.params;
  const updates = req.body;
  try {
    const updatedItem = await Inventory.findOneAndUpdate({ prodid }, updates, { new: true });
    if (!updatedItem) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: ERROR.ITEM_NOT_FOUND });
    }
    res.status(STATUS_CODES.OK).json({ message: SUCCESS.ITEM_UPDATED, item: updatedItem });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_ERROR).json({ error: ERROR.UPDATING_ITEM });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  const { prodid } = req.params;
  try {
    const deletedItem = await Inventory.findOneAndDelete({ prodid });
    if (!deletedItem) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: ERROR.ITEM_NOT_FOUND });
    }
    res.status(STATUS_CODES.OK).json({ message: SUCCESS.ITEM_DELETED, item: deletedItem });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_ERROR).json({ error: ERROR.DELETING_ITEM });
  }
};
