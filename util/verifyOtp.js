const brycpt = require("bcrypt");
const guestLoginSchema = require("../model/guestLoginModel");
exports.verifyOtp = async (res, otp) => {
  const dbotp = await guestLoginSchema.findOne();
  console.log("DBOTP", dbotp.otp);
  console.log("USER KA ITP", otp);
  const hashedOtp = brycpt.compare(otp, dbotp.otp);
  const guest = await guestLoginSchema.findOne({
    otp: hashedOtp,
  });
  if (guest) {
    res.json({
      message: "OTP Verified",
      status: 200,
    });
  } else {
    res.json({
      message: "OTP Not Verified",
      status: 500,
    });
  }
};
