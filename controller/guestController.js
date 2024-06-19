// Debug-console
//console.log("2.1guest controller called")
const guestModel = require("../model/guestModel");
const {
  sendMail,
  getOtpEmailTemplate,
  getWelcomeEmailTemplate,
} = require("../util/mailer");
const { generateOTP } = require("../util/otp");

exports.addGuest = async (req, res) => {
  await guestModel
    .findOne({ email: req.body.email })
    .then((data) => {
      if (!data || data == undefined) {
        const otp = generateOTP();
        const guest = new guestModel({
          email: req.body.email,
          phone: req.body.phone,
          name: req.body.name,
          otp: otp,
          otpExpires: Date.now() + 300,
        });
        console.log("req.body", guest);
        guest
          .save()
          .then((data) => {
            const emailTemplate = getOtpEmailTemplate(otp);
            sendMail(guest.email, "Your OTP Code", emailTemplate);
            res.json({
              message: "Guest User added successfully",
              status: 200,
            });
          })
          .catch((err) => {
            res.json({
              message: "Error adding Guest User",
              status: 400,
              error: err.message,
            });
          });
      } else {
        res.json({
          message: "Guest User already exists",
          status: 500,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Error finding Guest User",
        status: 400,
        error: err.message,
      });
    });
};
// console.log("Guest User added Successsfully")

exports.verifyOtp = async (req, res) => {
  const { otp } = req.body;

  try {
    // Find the guest by OTP and ensure OTP is valid and not expired
    const guest = await guestModel.findOne({
      otp: otp,
      //   otpExpires: { $gt: Date.now() },
    });

    if (!guest) {
      return res.status(400).json({
        message: "Invalid OTP or OTP expired",
        status: 400,
      });
    }

    // Mark guest as verified
    guest.verified = true;
    const savedGuest = await guest.save();

    // Send welcome email
    const welcomeEmailTemplate = getWelcomeEmailTemplate(savedGuest.name);
    await sendMail(
      savedGuest.email,
      "Welcome to Our App",
      welcomeEmailTemplate
    );

    // Respond with success message
    res.status(200).json({
      message: "OTP verified successfully. Welcome email sent.",
      status: 200,
      data: savedGuest,
    });
  } catch (error) {
    // Handle errors
    console.error("Error verifying OTP:", error);
    res.status(400).json({
      message: "Error verifying OTP",
      status: 400,
      error: error.message, // Send error message for debugging
    });
  }
};

// console.log("Guest User added Successsfully")
exports.getAllGuests = async (req, res) => {
  await guestModel
    .find()
    .then((data) => {
      res.json({
        message: "Guest User fetched successfully",
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error fetching Guest User",
        status: 400,
        error: err.message,
      });
    });
};
// console.log("Guest User fetched Successsfully")
exports.getGuestById = async (req, res) => {
  const id = req.params.id;
  await guestModel
    .findById({ _id: id })
    .then((data) => {
      res.json({
        message: "Guest User fetched by ID successfully",
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error fetching Guest User by ID",
        status: 400,
        error: err.message,
      });
    });
};
// console.log("Guest User fetched by ID Successsfully")
exports.updateGuest = async (req, res) => {
  const id = req.params.id;
  const update = req.body.body;
  await guestModel
    .findByIdAndUpdate({ _id: id }, update, { new: true })
    .then((data) => {
      res.json({
        message: "Guest User updated successfully",
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error updating Guest User",
        status: 400,
        error: err.message,
      });
    });
};
// console.log("Guest User updated Successsfully")
exports.deleteGuestById = async (req, res) => {
  const id = req.params.id;
  await guestModel
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json({
        message: "Guest User deleted successfully",
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error deleting Guest User",
        status: 400,
        error: err.message,
      });
    });
};
//console.log("guest controller ended")
