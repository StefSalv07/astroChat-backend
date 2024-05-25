const zod = require("zod");
//phone number validation and otp validation and countryCode

const guestLoginValidation = zod.object({
  body: zod.object({
    // phone: zod.string().min(10),
    // otp: zod.string().min(4).max(4),
  }),
});

module.exports = guestLoginValidation;
