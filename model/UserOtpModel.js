const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: function () {
      // Set OTP expiration to 1 hour from now
      return new Date(new Date().getTime() + 60 * 60 * 1000);
    },
    index: { expires: "1h" }, // MongoDB TTL index for automatic expiration
  },
});

module.exports = mongoose.model("OTP", otpSchema);
