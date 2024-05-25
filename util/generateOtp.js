const guestLoginSchema = require("../model/guestLoginModel");
// const guestOtpSchema = require("../model/guestOtpModel");
const bcrypt = require("bcrypt");
const otpgenerator = require("otp-generator");
const axios = require("axios");
// const I = require("loadash");

exports.generateOtp = async (req, res) => {
  console.log("req for phone", req);

  const guest = await guestLoginSchema.findOne({
    phone: req,
  });
  //   console.log(guest);
  if (guest) {
    return null;
  }
  const OTP = otpgenerator.generate(4, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
  });

  console.log(OTP);
  console.log("OTP TAK AAYE");
  return OTP.toString();
};
