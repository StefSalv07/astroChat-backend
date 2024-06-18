const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const { Schema } = require("zod");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    profilePic: {
      type: String,
      // required: true,
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
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{2}\d{2}\d{4}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid date of birth! Format should be ddmmyyyy.`,
      },
    },
    langKnown: {
      type: [String],
      required: true,
    },
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
    pinCode: {
      type: Number,
      required: true,
    },
    timeOfBirth: {
      type: String,
      required: true,
      // validate: {
      //   validator: function (v) {
      //     return /^(0[1-9]|1[0-2]):[0-5][0-9]:(AM|PM)$/.test(v);
      //   },
      //   message: (props) =>
      //     `${props.value} is not a valid time of birth! Format should be HH:MM AM/PM.`,
      // },
    },
    pinCode: {
      type: Number,
      required: true,
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
      required: true,
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
module.exports = mongoose.model("user", userSchema);
