const express = require("express");
const guestLoginController = require("../controller/guestLoginController");
const router = express.Router();

const valdiate = require("../middleware/zodMiddleWare");
const guestLoginValidation = require("../util/guestLoginValidation");
router.post(
  "/guest",
  valdiate(guestLoginValidation),
  guestLoginController.guestSignup
);

router.post("/guest/verify", guestLoginController.verifyGuestUser);
module.exports = router;
