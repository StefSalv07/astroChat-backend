const astrologerModel = require("../model/astrologerModel");
const userModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const { generateOTP } = require("../util/otp");
const {
  sendMail,
  getRegistrationEmailTemplate,
  getOtpEmailTemplateForAstrologers,
} = require("../util/mailer");
//debug console.log("Debug astrologer controller called")
exports.register = async (req, res) => {
  const astrologer = new astrologerModel(req.body);
  console.log("body", astrologer);

  const user = await userModel.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({
      message: "Email is already registered as a user",
      status: 400,
    });
  }
  await astrologerModel
    .findOne({ email: req.body.email })
    .then((data) => {
      if (!data) {
        astrologer
          .save()
          .then((data) => {
            res.json({
              message: "Astrologer Registered Successfully",
              data: data,
              status: 200,
            });

            const welcomeEmailTemplate = getRegistrationEmailTemplate(
              data.userName
            );
            sendMail(
              data.email,
              "Welcome to Our Application",
              welcomeEmailTemplate
            )
              .then(() => {
                console.log("Welcome email sent successfully");
              })
              .catch((emailErr) => {
                console.error("Failed to send welcome email", emailErr);
              });
          })
          .catch((err) => {
            res.status(400).json({
              message: "Astrologer Registration Failed",
              data: err,
            });
          });
      } else {
        res.json({
          message: "Astrologer Already Registered",
          data: data,
          status: 200,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: "Astrologer Registration Failed",
        data: err,
      });
    });
};

exports.getAllAstrologers = async (req, res) => {
  await astrologerModel
    .find()
    .then((data) => {
      res.json({
        message: "Astrologer List",
        data: data,
        status: 200,
      });

      console.log("getting all Users", data);
    })
    .catch((err) => {
      res.json({
        message: "Astrologer List Failed",
        data: err,
        status: 400,
      });

      console.log("error getting astrologers", err);
    });
};
exports.updateAstrologerById = async (req, res) => {
  const id = req.params.id;
  const astrologer = req.body;
  console.log("update for id", id);
  console.log("update for astrologer", astrologer);
  await astrologerModel
    .findByIdAndUpdate({ _id: id }, astrologer, { new: true })
    .then((data) => {
      if (!data) {
        res.json({
          message: "No Astrologer Found",
          status: 404,
        });
      } else {
        res.json({
          message: "Astrologer Updated Successfully",
          data: data,
          status: 200,
        });

        console.log("astrologer updated", data);
      }
    })
    .catch((err) => {
      res.json({
        message: "Astrologer Update Failed",
        data: err,
        status: 400,
      });
    });
};
exports.deleteAstrologerById = async (req, res) => {
  const id = req.params.id;
  console.log("delete for id", id);
  await astrologerModel
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      if (!data) {
        res.json({
          message: "No Astrologer Found",
          status: 404,
        });
      } else {
        res.json({
          message: "Astrologer Deleted Successfully",
          data: data,
          status: 200,
        });

        console.log("astrologer deleted", data);
      }
    })
    .catch((err) => {
      res.json({
        message: "Astrologer Deletion Failed",
        data: err,
        status: 400,
      });
    });
};
exports.getAstrologerById = async (req, res) => {
  const id = req.params.id;
  console.log("get for id", id);
  await astrologerModel
    .findById({ _id: id })
    .then((data) => {
      if (!data) {
        res.json({
          message: "No Astrologer Found",
          status: 404,
        });
      } else {
        res.json({
          message: "Astrologer Found Successfully",
          data: data,
          status: 200,
        });

        console.log("astrologer found", data);
      }
    })
    .catch((err) => {
      res.json({
        message: "Astrologer Finding Failed",
        data: err,
        status: 400,
      });
    });
};
exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log("email", email);
  console.log("password", password);
  astrologerModel
    .findOne({ email: req.body.email })
    .then((astrologer) => {
      if (!astrologer) {
        return res.status(404).json({
          message: "Astrologer not found",
          status: 404,
        });
      }
      console.log("enter hash area");
      bcrypt
        .compare(password, astrologer.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(400).json({
              message: "Invalid credentials",
              status: 400,
            });
          }

          const loginSuccessEmailTemplate =
            getLoginSuccessEmailTemplateForAstrologer();
          sendMail(
            astrologer.email,
            "Login Successful",
            loginSuccessEmailTemplate
          );

          res.status(200).json({
            message: "Login successful",
            status: 200,
            data: astrologer,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error comparing passwords",
            status: 500,
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error finding astrologer",
        status: 500,
        error: err.message,
      });
    });
};


exports.loginViaEmail = async (req, res) => {
  const { email } = req.body;
  console.log("Email for login via email", email);

  try {
    // Find astrologer by email
    const astrologer = await astrologerModel.findOne({ email });

    if (!astrologer) {
      return res.status(400).json({
        message: "Astrologer not found",
        status: 400,
      });
    }

    // Generate OTP
    const otpValue = generateOTP();

    // Save OTP to OTP collection
    const otp = new otpModel({
      userId: astrologer._id,
      otp: otpValue,
    });

    const savedOtp = await otp.save();

    // Send OTP via email
    const otpEmailTemplate = getOtpEmailTemplateForAstrologers(savedOtp.otp);
    sendMail(email, "Login OTP", otpEmailTemplate)
      .then(() => {
        // Respond with success message
        res.json({
          message: "OTP sent to email",
          status: 200,
          email,
        });
      })
      .catch((err) => {
        console.error("Error sending OTP:", err);
        res.status(400).json({
          message: "Error sending OTP",
          status: 400,
          error: err.message,
        });
      });
  } catch (err) {
    // Handle errors from async operations
    console.error("Error in loginViaEmail:", err);
    res.status(400).json({
      message: "Error finding astrologer",
      status: 400,
      error: err.message,
    });
  }
};
