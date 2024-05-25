const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jsonWebToken = require("jsonwebtoken");
require("dotenv").config(); // to use the .env file
const guestLoginSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      //   required: true,
    },
    countryCode: {
      type: String,
      required: true,
      default: "+91",
    },
  },
  {
    timestamps: true,
  }
);
guestLoginSchema.methods.generateJWT = () => {
  return jsonWebToken.sign(
    {
      _id: this._id,
      phone: this.phone,
      otp: this.otp,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};
module.exports = mongoose.model("guests", guestLoginSchema);
