const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const moment = require("moment");

const userSchema = new mongoose.Schema(
  {
    UserID: {
      type: String,
      required: true,
      unique: true
    },

    FirstName: {
      type: String,
      required: true
    },

    LastName: {
      type: String,
      required: true
    },

    Password: {
      type: String,
      required: true
    },

    ConfirmedPassword: {
      type: Boolean,
      default: false
    },

    CreateDate: {
      type: String,
      default: () =>
        moment().format("YYYY-MM-DD HH:mm:ss")
    },

    LastUpdate: {
      type: String,
      default: () =>
        moment().format("YYYY-MM-DD HH:mm:ss")
    },

    LastUpdateUser: {
      type: String,
      default: null
    },

    UserGroup: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SysUserRoles"
      }
    ]
  },
  {
    collection: "SysUsers"
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("Password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.Password = await bcrypt.hash(
    this.Password,
    salt
  );
});

userSchema.methods.verifyPassword =
  async function (password) {
    return await bcrypt.compare(
      password,
      this.Password
    );
  };

module.exports = mongoose.model(
  "SysUsers",
  userSchema
);