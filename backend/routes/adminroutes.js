const express = require("express");
const router = express.Router();
const adminController = require("../controller/admincontroller");

router.get("/:adminid", adminController.getAdminById);

module.exports = router;
