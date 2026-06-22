const User = require("../db_schema/user");
const moment = require("moment");
const UserGroup = require("../db_schema/userGroups");

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
    console.log(req.body)
    if (!req.body.Password) {
      return res.status(400).json({
        success: false,
        message: "Password is required"
      });
    }

    if (req.body.Password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters"
      });
    }

    if (!req.body.UserGroup) {
      return res.status(400).json({
        success: false,
        message: "Role is required"
      });
    }
    const existingUser = await User.findOne({
      UserID: req.body.userID,
    });

    const RoleCheck = await UserGroup.findOne({
      Role:req.body.UserGroup
    })

  
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = new User({
      UserID: req.body.userID,
      FirstName: req.body.firstName,
      LastName: req.body.lastName,
      Password: req.body.Password,
      UserGroup: RoleCheck._id,
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
 * Get currently logged in user's profile
 */
exports.getMyProfile = async (req, res) => {
  try {
    console.log(req)
    const user = await User.findOne(
      { UserID: req.user.UserId },
      { Password: 0 }
    ).populate("UserGroup", "Role");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


/**
 * Update currently logged in user's profile
 */
exports.updateMyProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      UserID: req.user.UserID
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found"
      });
    }

    user.FirstName =
      req.body.firstName ??
      req.body.FirstName ??
      user.FirstName;

    user.LastName =
      req.body.lastName ??
      req.body.LastName ??
      user.LastName;

    user.LastUpdate = moment().format(
      "YYYY-MM-DD HH:mm:ss"
    );

    user.LastUpdateUser = user.UserID;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        UserID: user.UserID,
        FirstName: user.FirstName,
        LastName: user.LastName
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


/**
 * Change currently logged in user's password
 */
exports.changeMyPassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword
    } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required"
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters"
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirmation password do not match"
      });
    }

    const user = await User.findOne({
      UserID: req.user.UserID
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const passwordCorrect =
      await user.verifyPassword(currentPassword);

    if (!passwordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect"
      });
    }

    user.Password = newPassword;

    user.LastUpdate = moment().format(
      "YYYY-MM-DD HH:mm:ss"
    );

    user.LastUpdateUser = user.UserID;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
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