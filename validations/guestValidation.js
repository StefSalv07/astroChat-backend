const zod = require("zod");

const guestValidation = zod.object({
  body: zod.object({
    name: zod
      .string()
      .min(2, "The minimum length of name should be 2")
      .max(50, "The maximum length of name should be 50"),
    email: zod
      .string()
      .email("Invalid email format")
      .regex(
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        "Email must be a valid Gmail address"
      ),
    // otp: zod.string().refine((value) => /^[0-9]{6}$/.test(value), {
    //   message: "OTP must be a 6-digit number",
    // }),
    // phone: zod
    //   .string()
    //   .min(10, "The minimum length of phone should be 10")
    //   .max(15, "The maximum length of phone should be 15"),
    // createdAt: zod.string().optional(), // Optional because it will be generated automatically
  }),
});

module.exports = guestValidation;
