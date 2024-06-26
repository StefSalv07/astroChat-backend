const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");
function generateSixDigitToken() {
  return Math.floor(100000 + Math.random() * 900000);
}

const astrologerModel = new schema(
  {
    profilePic: {
      // type: String,
      // required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    // dateOfBirth: {
    //   type: String,
    //   required: true,
    //   validate: {
    //     validator: function (v) {
    //       return /^\d{2}\d{2}\d{4}$/.test(v);
    //     },
    //     message: (props) =>
    //       `${props.value} is not a valid date of birth! Format should be ddmmyyyy.`,
    //   },
    // },
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

    address: {
      type: String,
      required: true,
    },
    primarySkills: {
      type: [String],
      required: true,
    },
    allSkills: {
      type: [String],
      required: true,
    },
    expirence: {
      type: Number,
      required: true,
    },
    hoursContribution: {
      type: Number,
      required: true,
    },
    pricePerMin: {
      type: Number,
      required: true,
    },
    chatDoneWith: {
      type: [schema.Types.ObjectId],
      ref: "user",
    },
    // serviceType: {
    //   type: schema.Types.ObjectId,
    //   ref: "serviceType",
    // },
    serviceType: {
      type: [String],
    },
    whyOnBoard: {
      type: String,
      required: true,
    },
    mainSourceOfIncome: {
      type: String,
      required: true,
    },
    refFrom: {
      type: String,
      required: true,
    },
    learnedAstrologyFrom: {
      type: String,
      required: true,
    },
    links: {
      type: [String],
      required: true,
    },
    minExpSal: {
      type: Number,
    },
    longBio: {
      type: String,
      required: true,
    },

    qualifications: {
      type: [String],
      required: true,
    },
    tokenNumber: {
      type: Number,
      required: true,
      default: generateSixDigitToken,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
astrologerModel.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("User password hashed", this.password);
  }
  next();
});
module.exports = mongoose.model("astrologer", astrologerModel);
