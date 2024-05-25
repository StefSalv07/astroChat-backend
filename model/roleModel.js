const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roleSchema = new Schema(
  {
    roleName: {
      type: String,
      unique: true,
      lowercase: true,
    },
    roleDesc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("roles", roleSchema);
