const mongoose = require("mongoose");
// const { Schema } = require("zod");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    roleId: {
      type: schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    countryCode: {
      type: Number,
      default: "+91",
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    langKnown: [
      {
        type: String,
        required: true,
      },
    ],
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    timeOfBirth: {
      type: Date,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
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
      default: "isActive",
    },
    address: {
      type: String,
      required: true,
    },
  },
  // transactionId:{
  // type: schema.Types.ObjectId,
  //     required: true
  // // },
  // paymentId: {
  //   type: schema.Types.ObjectId,
  //   required: true,
  // },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("users", userSchema);
