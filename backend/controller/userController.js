const User = require("../models/UserModel");
const bcrypt = require("../utils/bcryptUtil");
const { SUCCESS, ERROR, STATUS_CODES } = require("../utils/constants");

// Register a new user
exports.registerUser = async (req, res) => {
  const { userID, username, phone, location, email, password, profilePicture } =
    req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { userID }, { username }],
    });

    if (existingUser) {
      return res
        .status(STATUS_CODES.CONFLICT)
        .json({ error: ERROR.USER_EXISTS });
    }

    const hashedPassword = await bcrypt.hashPassword(password); // ✅ Corrected password hashing
    const newUser = new User({
      userID,
      username,
      phone,
      location,
      email,
      profilePicture,
      points: 0,
      passwordHash: hashedPassword,
      accountStatus: "active",
    });

    await newUser.save();
    res.status(STATUS_CODES.CREATED).json({ message: SUCCESS.USER_CREATED });
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .json({ error: ERROR.REGISTRATION_FAILED, details: error.message });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ error: ERROR.INVALID_CREDENTIALS });
    }

    const isMatch = await bcrypt.comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ error: ERROR.INVALID_CREDENTIALS });
    }

    res.status(STATUS_CODES.OK).json({ message: SUCCESS.LOGIN_SUCCESS, user });
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .json({ error: ERROR.LOGIN_FAILED, details: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await User.findOne({ userID });
    if (!user) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ error: ERROR.USER_NOT_FOUND });
    }

    res.status(STATUS_CODES.OK).json({ message: SUCCESS.USER_FETCHED, user });
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .json({ error: ERROR.FETCHING_USER, details: error.message });
  }
};

// Update user info
exports.updateUser = async (req, res) => {
  const { userID } = req.params;
  const updates = req.body;

  try {
    if (updates.password) {
      updates.passwordHash = await bcrypt.hashPassword(updates.password);
      delete updates.password;
    }

    const updatedUser = await User.findOneAndUpdate({ userID }, updates, {
      new: true,
    });
    if (!updatedUser) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ error: ERROR.USER_NOT_FOUND });
    }

    res
      .status(STATUS_CODES.OK)
      .json({ message: SUCCESS.USER_UPDATED, user: updatedUser });
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .json({ error: ERROR.UPDATING_USER, details: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { userID } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ userID });
    if (!deletedUser) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ error: ERROR.USER_NOT_FOUND });
    }

    res
      .status(STATUS_CODES.OK)
      .json({ message: SUCCESS.USER_DELETED, user: deletedUser });
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .json({ error: ERROR.DELETING_USER, details: error.message });
  }
};
