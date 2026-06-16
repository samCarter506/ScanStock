const User = require("../db_schema/user");
const moment = require("moment");

/**
 * Get All Users
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { Password: 0 });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Get User By ID
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne(
      { UserID: req.params.id },
      { Password: 0 }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Create User
 */
exports.createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      UserID: req.body.UserID,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = new User({
      UserID: req.body.UserID,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Password: req.body.Password,
      UserGroup: req.body.UserGroup || [],
      CreateDate: moment().format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      LastUpdate: moment().format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      LastUpdateUser: req.body.UserID,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Update User
 */
exports.updateUser = async (req, res) => {
  
  try {
    const user = await User.findOne({
      UserID: req.params.id,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.FirstName =
      req.body.FirstName || user.FirstName;

    user.LastName =
      req.body.LastName || user.LastName;

    user.UserGroup =
      req.body.UserGroup || user.UserGroup;

    user.LastUpdate = moment().format(
      "YYYY-MM-DD HH:mm:ss"
    );

    user.LastUpdateUser =
      req.body.LastUpdateUser ||
      user.LastUpdateUser;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Delete User
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      UserID: req.params.id,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};