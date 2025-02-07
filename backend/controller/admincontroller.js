const Admin = require("../models/AdminModel");
const { SUCCESS, ERROR, STATUS_CODES } = require("../utils/constants");

exports.getAdminById = async (req, res) => {
  const { adminid } = req.params;
  try {
    // Querying the database using the `adminid`
    const admin = await Admin.findOne({ adminid: adminid });
    console.log(adminid);
    if (!admin) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ error: ERROR.ADMIN_NOT_FOUND }); // Error if admin not found
    }
    res
      .status(STATUS_CODES.OK)
      .json({ success: SUCCESS.FETCH_SUCCESS, data: admin }); // Success response with the admin data
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .json({ error: ERROR.FETCHING_ADMIN }); // Error during query execution
  }
};
