const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const statusSchema = new Schema(
  {
    statusName: {
      type: String,
      unique: true,
      lowercase: true,
    },
    statusDesc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("status", statusSchema);
