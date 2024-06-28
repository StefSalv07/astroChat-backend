const mongoose = require("mongoose");
const jwt =require('jsonwebtoken');
const schema = mongoose.Schema;
const guestSchema = new schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
    },
    otpExpires: { type: Date },
    createdAt: {
      type: String,
      default: function () {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const date = currentDate.getDate().toString().padStart(2, "0");
        let hours = currentDate.getHours();
        const minutes = currentDate.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strHours = hours.toString().padStart(2, "0");
        return `${date}-${month}-${year} ${strHours}:${minutes} ${ampm}`;
      },
    },
  },
  {
    timestamps: true,
  }
);
guestSchema.pre("save", function (next) {
  const now = new Date();
  if (this.isNew || this.isModified("otp")) {
    this.otpExpires = new Date(now.getTime() + 2 * 60 * 1000); // Expires in 1 minute
  }
  next();
});

guestSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

module.exports = mongoose.model("guest", guestSchema);
