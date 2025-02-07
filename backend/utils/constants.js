module.exports = {
  SUCCESS: {
    ITEM_FETCHED: "Item(s) fetched successfully", // Matches GET operations (all or single items).
    ITEM_ADDED: "Item added successfully", // Matches the POST operation (create).
    ITEM_UPDATED: "Item updated successfully", // Matches the PUT operation (update).
    ITEM_DELETED: "Item deleted successfully", // Matches the DELETE operation.
  },
  ERROR: {
    FETCHING_ITEM: "Error fetching the item(s)", // Matches GET operations.
    ITEM_NOT_FOUND: "Item not found", // Matches cases where the item is missing.
    ADDING_ITEM: "Error adding the item", // Matches POST operation (create).
    UPDATING_ITEM: "Error updating the item", // Matches PUT operation (update).
    DELETING_ITEM: "Error deleting the item", // Matches DELETE operation.
    ADMIN_NOT_FOUND: "Admin user not found", // Matches admin-specific errors.
    FETCHING_ADMIN: "Error fetching admin details", // Matches admin-specific fetch errors.
  },
  STATUS_CODES: {
    OK: 200, // Matches successful operations (GET, DELETE, etc.).
    CREATED: 201, // Matches the POST operation (create).
    NOT_FOUND: 404, // Matches missing item cases.
    INTERNAL_ERROR: 500, // Matches server-side errors.
  },
};
