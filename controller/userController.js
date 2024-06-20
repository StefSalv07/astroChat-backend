const userModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const otpModel = require("../model/UserOtpModel");
// debug console console.log("user Controller.js")
const { generateOTP } = require("../util/otp");
const {
  sendMail,
  getWelcomeEmailTemplate,
  getLoginSuccessEmailTemplate,
  getOtpEmailTemplate,
  getPasswordChangeEmailTemplate,
} = require("../util/mailer");
exports.signup = async (req, res) => {
  const user = new userModel(req.body);

  userModel
    .findOne({ email: req.body.email })
    .then((data) => {
      if (data == undefined || data == null) {
        user
          .save()
          .then((data) => {
            const welcomeEmailTemplate = getWelcomeEmailTemplate(
              data.firstName
            );
            sendMail(
              data.email,
              "Welcome to Our Application",
              welcomeEmailTemplate
            );
            res.json({
              message: "User added successfully",
              status: 200,
              data: data,
            });
            console.log("User=>", data);
          })
          .catch((err) => {
            res.json({
              message: "Error adding User",
              status: 400,
              error: err.message,
            });
          });
      } else {
        res.json({
          message: "User already exists",
          status: 500,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Error finding User",
        status: 400,
        error: err.message,
      });
    });
};

// console.log("Signup called")
exports.getAllUsers = async (req, res) => {
  await userModel
    .find()
    .then((data) => {
      res.json({
        message: "All Users",
        status: 200,
        data: data,
      });
      console.log("User fetched", data);
    })
    .catch((err) => {
      res.json({
        message: "Error finding Users",
        status: 400,
        error: err.message,
      });
    });
};
// console.log("Get All Users called")
exports.getUserById = async (req, res) => {
  const id = req.params.id;
  console.log("Getting User for id => ", id);

  await userModel
    .findById({ _id: id })
    .then((data) => {
      res.json({
        message: "User By Id",
        status: 200,
        data: data,
      });
      console.log("User fetched", data);
    })
    .catch((err) => {
      res.json({
        message: "Error finding User",
        status: 400,
        error: err.message,
      });
    });
};
// console.log("Get User By Id called")
exports.updateUserById = async (req, res) => {
  const id = req.params.id;
  console.log("Getting User for id => ", id);
  const update = req.body;
  await userModel
    .findByIdAndUpdate({ _id: id }, update, { new: true })
    .then((data) => {
      res.json({
        message: "User updated successfully",
        status: 200,
        data: data,
      });
      console.log("User updated", data);
    })
    .catch((err) => {
      res.json({
        message: "Error updating User",
        status: 400,
        error: err.message,
      });
    });
};
// console.log("Update User By Id called")
exports.deleteUserById = async (req, res) => {
  const id = req.params.id;
  console.log("Getting User for id => ", id);
  await userModel
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json({
        message: "User deleted successfully",
        status: 200,
        data: data,
      });
      console.log("User deleted", data);
    })
    .catch((err) => {
      res.json({
        message: "Error deleting User",
        status: 400,
        error: err.message,
      });
    });
};
// console.log("Delete User By Id called")
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Find astrologer by email
  astrologerModel
    .findOne({ email: req.body.email })
    .then((astrologer) => {
      // If astrologer is not found, return error
      if (!astrologer) {
        return res.status(404).json({
          message: "Astrologer not found",
          status: 404,
        });
      }

      // Compare passwords
      bcrypt
        .compare(password, astrologer.password)
        .then((isMatch) => {
          // If passwords don't match, return error
          if (!isMatch) {
            return res.status(400).json({
              message: "Invalid credentials",
              status: 400,
            });
          }

          // Send login success email
          const loginSuccessEmailTemplate = getLoginSuccessEmailTemplate();
          sendMail(
            astrologer.email,
            "Login Successful",
            loginSuccessEmailTemplate
          )
            .then(() => {
              // Return success response with astrologer data
              res.status(200).json({
                message: "Login successful",
                status: 200,
                data: astrologer,
              });
            })
            .catch((emailErr) => {
              console.error("Failed to send login success email:", emailErr);
              res.status(500).json({
                message: "Failed to send login success email",
                status: 500,
                error: emailErr.message,
              });
            });
        })
        .catch((bcryptErr) => {
          console.error("Error comparing passwords:", bcryptErr);
          res.status(500).json({
            message: "Error comparing passwords",
            status: 500,
            error: bcryptErr.message,
          });
        });
    })
    .catch((findErr) => {
      console.error("Error finding astrologer:", findErr);
      res.status(500).json({
        message: "Error finding astrologer",
        status: 500,
        error: findErr.message,
      });
    });
};
exports.loginViaEmail = (req, res) => {
  const { email } = req.body;

  // Find user by email
  userModel
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.json({
          message: "User not found",
          status: 400,
        });
      }

      // Generate OTP
      const otpValue = generateOTP();

      // Save OTP to OTP collection
      const otp = new otpModel({
        userId: user._id,
        otp: otpValue,
      });

      return otp.save();
    })
    .then((savedOtp) => {
      // Send OTP via email
      const otpEmailTemplate = getOtpEmailTemplate(savedOtp.otp);
      return sendMail(email, "Login OTP", otpEmailTemplate);
    })
    .then(() => {
      res.json({
        message: "OTP sent to email",
        status: 200,
        email: email,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error sending OTP",
        status: 400,
        error: err.message,
      });
    });
};
// console.log("Login called")
exports.logout = async (req, res) => {};
exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  console.log("Request email:", email); // Check the email received in the request

  // Find the user by email
  userModel
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        console.log("User not found with email:", email);
        return res.status(400).json({
          message: "User not found",
          status: 400,
        });
      }

      // Find the OTP in OTP collection
      otpModel
        .findOne({ otp: otp })
        .then((otpData) => {
          if (!otpData) {
            return res.status(400).json({
              message: "Invalid OTP",
              status: 400,
            });
          }

          // Check if OTP has expired (assuming otpExpires is in the OTP model)
          if (otpData.otpExpires < Date.now()) {
            return res.status(400).json({
              message: "OTP expired",
              status: 400,
            });
          }

          // Mark OTP as used or delete it from OTP collection
          // For example, assuming setting it as used:
          otpData.used = true;
          otpData
            .save()
            .then(() => {
              // Proceed with your logic after OTP verification
              res.status(200).json({
                message: "OTP verified successfully",
                status: 200,
                data: user,
              });
            })
            .catch((error) => {
              console.error("Error marking OTP as used:", error);
              res.status(400).json({
                message: "Error marking OTP as used",
                status: 400,
                error: error.message,
              });
            });
        })
        .catch((error) => {
          console.error("Error finding OTP:", error);
          res.status(400).json({
            message: "Error finding OTP",
            status: 400,
            error: error.message,
          });
        });
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(400).json({
        message: "Error finding user",
        status: 400,
        error: error.message,
      });
    });
};
exports.forgetPassword = (req, res) => {
  const { email } = req.body;

  console.log("Request email:", email); // Check the email received in the request

  // Find user by email
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        console.log("User not found with email:", email);
        return res.status(400).json({
          message: "User not found",
          status: 400,
        });
      }

      // Generate OTP
      const otpValue = generateOTP();

      // Save OTP to OTP collection
      const otp = new otpModel({
        userId: user._id,
        otp: otpValue,
      });
      return otp
        .save()
        .then(() => {
          // Send OTP via email
          const otpEmailTemplate = getOtpEmailTemplate(otpValue);
          return sendMail(email, "Reset Password OTP", otpEmailTemplate);
        })
        .then(() => {
          // Respond with success message
          res.status(200).json({
            message: "OTP sent to email for password reset",
            status: 200,
            email: email,
          });
        });
    })
    .catch((err) => {
      console.error("Error handling forget password:", err);
      res.status(400).json({
        message: "Error handling forget password",
        status: 400,
        error: err.message,
      });
    });
};
exports.changePassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find user by email
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        status: 400,
      });
    }

    // Find the OTP in OTP collection
    const otpData = await otpModel.findOne({
      userId: user._id,
      otp: req.body.otp,
    });
    if (!otpData) {
      return res.status(400).json({
        message: "Invalid OTP",
        status: 400,
      });
    }

    // Check if OTP has expired (assuming otpExpires is in the OTP model)
    if (otpData.otpExpires < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
        status: 400,
      });
    }

    // Update user's password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPassword, salt);
    await user.save();

    // Mark OTP as used or delete it from OTP collection
    // For example, assuming setting it as used:
    otpData.used = true;
    await otpData.save();

    res.status(200).json({
      message: "Password changed successfully",
      status: 200,
    });
    const emailTemplate = getPasswordChangeEmailTemplate();
    return sendMail(email, "Password Changed Successfully", emailTemplate);
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(400).json({
      message: "Error changing password",
      status: 400,
      error: err.message,
    });
  }
};
// console.log("Forget Password called")
// console.log("Logout called")
// console.log("Verify OTP called")
// console.log("User Controller.js")
