const Store = require("../models/storeModel.js");
const { SUCCESS, ERROR, STATUS_CODES } = require("../utils/constants");

// CREATE a new store
exports.createStore = async (req, res) => {
  const {
    storeId,
    storeName,
    storeOwner,
    storeContact,
    storeEmail,
    streetAddress,
    city,
    state,
    pincode,
    openingTime,
    closingTime,
    updatedBy,
  } = req.body;

  try {
    const newStore = new Store({
      storeId,
      storeName,
      storeOwner,
      storeContact,
      storeEmail,
      streetAddress,
      city,
      state,
      pincode,
      openingTime,
      closingTime,
      updatedBy,
    });

    const savedStore = await newStore.save();

    res.status(STATUS_CODES.CREATED).json({
      message: SUCCESS.ITEM_CREATED,
      data: savedStore,
    });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_ERROR).json({
      error: ERROR.CREATING_ITEM,
      details: error.message,
    });
  }
};

// READ all stores
exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.status(STATUS_CODES.OK).json({
      message: SUCCESS.ITEM_FETCHED,
      data: stores,
    });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_ERROR).json({
      error: ERROR.FETCHING_ITEM,
      details: error.message,
    });
  }
};

// READ a single store by storeId
exports.getStore = async (req, res) => {
  const { storeid } = req.params;

  try {
    const store = await Store.findOne({ storeId: storeid });

    if (store) {
      res.status(STATUS_CODES.OK).json({
        message: SUCCESS.ITEM_FETCHED,
        data: store,
      });
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({
        error: ERROR.ITEM_NOT_FOUND,
      });
    }
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_ERROR).json({
      error: ERROR.FETCHING_ITEM,
      details: error.message,
    });
  }
};

// UPDATE a store by storeId
exports.updateStore = async (req, res) => {
  const { storeid } = req.params;

  try {
    const updatedStore = await Store.findOneAndUpdate(
      { storeId: storeid }, // Filter by storeId
      { $set: req.body }, // Update fields from the request body
      { new: true }, // Return the updated document
    );

    if (updatedStore) {
      res.status(STATUS_CODES.OK).json({
        message: SUCCESS.ITEM_UPDATED,
        data: updatedStore,
      });
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({
        error: ERROR.ITEM_NOT_FOUND,
      });
    }
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_ERROR).json({
      error: ERROR.UPDATING_ITEM,
      details: error.message,
    });
  }
};

// DELETE a store by storeId
exports.deleteStore = async (req, res) => {
  const { storeid } = req.params;

  try {
    const deletedStore = await Store.findOneAndDelete({ storeId: storeid });

    if (deletedStore) {
      res.status(STATUS_CODES.OK).json({
        message: SUCCESS.ITEM_DELETED,
        data: deletedStore,
      });
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({
        error: ERROR.ITEM_NOT_FOUND,
      });
    }
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_ERROR).json({
      error: ERROR.DELETING_ITEM,
      details: error.message,
    });
  }
};
