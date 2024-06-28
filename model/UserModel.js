const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const { Schema } = require("zod");
const jwt=require('jsonwebtoken');
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    profilePic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    userName: {
      type: String,
    },
    // firstName: {
    //   type: String,
    // },
    // lastName: {
    //   type: String,
    // },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: String,
      // required: true,
      // validate: {
      //   validator: function (v) {
      //     return /^\d{2}\d{2}\d{4}$/.test(v);
      //   },
      //   message: (props) =>
      //     `${props.value} is not a valid date of birth! Format should be ddmmyyyy.`,
      // },
    },
    langKnown: {
      type: [String],
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
    timeOfBirth: {
      type: String,

      // validate: {
      //   validator: function (v) {
      //     return /^(0[1-9]|1[0-2]):[0-5][0-9]:(AM|PM)$/.test(v);
      //   },
      //   message: (props) =>
      //     `${props.value} is not a valid time of birth! Format should be HH:MM AM/PM.`,
      // },
    },
    role:{
      type: String,
      default:"user"
    },
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
    status: {
      type: schema.Types.ObjectId,
      ref: "status",
    },
    address: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
      required: false,
    },
    razorpayOrderId: {
      type: String,
      required: false,
    },
    paymentStatus: {
      type: String,
      required: false,
    },
    astrologerId: [
      {
        type: schema.Types.ObjectId,
        ref: "astrologer",
        // required:true
      },
    ],
    // transactionId:{
    // type: schema.Types.ObjectId,
    //     required: true
    // // },
    // paymentId: {
    //   type: schema.Types.ObjectId,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    console.log("User password hashed", this.password);
  }
  next();
});
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

module.exports = mongoose.model("user", userSchema);
