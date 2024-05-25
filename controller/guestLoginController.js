const guestLoginSchema = require("../model/guestLoginModel");
// const guestOtpSchema = require("../model/guestOtpModel");
const bcrypt = require("bcrypt");
const otpgenerator = require("otp-generator");
const axios = require("axios");
const { generateOtp } = require("../util/generateOtp");
const { verifyOtp } = require("../util/verifyOtp");

exports.guestSignup = async (req, res) => {
  const phone = req.body.phone;
  console.log("req_body", req.body);
  console.log("phone", phone);

  if (!phone) {
    res.json({
      message: "Phone Number Required!",
      status: 500,
    });
  } else {
    const otp = await generateOtp(phone);
    console.log("otp", otp);
    if (otp != null) {
      const salts = bcrypt.genSaltSync(10);
      const hashedOtp = bcrypt.hashSync(otp, salts);
      console.log("hotp", hashedOtp);

      const newguest = guestLoginSchema({ phone: phone, otp: hashedOtp });

      newguest
        .save()
        .then((data) => {
          res.json({
            message: "Guest Added!",
            data: data,
            status: 200,
          });
        })
        .catch((err) => {
          res.json({
            message: "Error Adding Guest!",
            error: err,
            status: 500,
          });
        });
    } else {
      res.json({
        message: "You already registerd!",
        status: 500,
      });
    }
  }
};

exports.verifyGuestUser = async (req, res) => {
  const otp = req.body.otp;
  verifyOtp(res, otp);
};

// exports.verifyGuestOtp = async (req, res) => {
//   const otpHolder = await guestOtpSchema.findOne({
//     phone: req.body.phone,
//   });
//   // const otp = generateotp(req.body.phone);
//   console.log();
//   if (otpHolder.length == 0) return;
//   res.json({
//     status: 500,
//     message: "OTP Expired!",
//   });
//   const findlastOtp = otpHolder[otpHolder.length - 1];
//   const validOtpandUser = await bcrypt.compare(req.body.otp, findlastOtp.otp);
//   if (validOtpandUser && req.body.phone && validOtpandUser) {
//   }
// };

// exports.addGuest = (req, res) => {
//   const guest = new guestLoginSchema(req.body);
//   guestLoginSchema
//     .findOne({ phone: req.body.phone })
//     .then((data) => {
//       console.log(data);
//       if (data == undefined || data == null) {
//         // console.log(data);
//         guest.save().then((data) => {
//           res.json({
//             message: "OTP Send!",
//             // data: data,
//             // status: 200,
//           });
//         });
//       } else {
//         // console.log(data);
//         res.json({
//           message: "Guest Already Exists!",
//           status: 500,
//         });
//       }
//     })
//     .catch((err) => {
//       res.send({
//         message: "Error Saving Guest!",
//         error: err,
//         status: 500,
//       });
//     });
// };
