const zod = require("zod");

const userValidation = zod.object({
  body: zod.object({
    // profilePic: zod
    //   .string()
    //   .url("Invalid URL format for profilePic")
    //   .optional(),
    // userName: zod
    //   .string()
    //   .min(2, "The minimum length of userName should be 2")
    //   .max(50, "The maximum length of userName should be 50"),
    // firstName: zod
    //   .string()
    //   .min(2, "The minimum length of firstName should be 2")
    //   .max(50, "The maximum length of firstName should be 50"),
    // lastName: zod
    //   .string()
    //   .min(2, "The minimum length of lastName should be 2")
    //   .max(50, "The maximum length of lastName should be 50"),
    // email: zod
    //   .string()
    //   .email("Invalid email format")
    //   .regex(
    //     /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
    //     "Email must be a valid Gmail address"
    //   ),
    // phone: zod
    //   .string()
    //   .min(10, "The minimum length of phone should be 10")
    //   .max(15, "The maximum length of phone should be 15"),
    // password: zod
    //   .string()
    //   .min(8, "The minimum length of password should be 8")
    //   .max(100, "The maximum length of password should be 100"),
    // gender: zod.string().optional(),
    // dateOfBirth: zod
    //   .string()
    //   .regex(/^\d{2}\d{2}\d{4}$/, "Date of Birth must be in ddmmyyyy format"),
    // langKnown: zod
    //   .array(zod.string())
    //   .min(1, "At least one language must be known"),
    // state: zod
    //   .string()
    //   .min(2, "The minimum length of state should be 2")
    //   .max(50, "The maximum length of state should be 50"),
    // country: zod
    //   .string()
    //   .min(2, "The minimum length of country should be 2")
    //   .max(50, "The maximum length of country should be 50"),
    // pincode: zod
    //   .number()
    //   .min(4, "The minimum length of pincode should be 4")
    //   .max(10, "The maximum length of pincode should be 10"),
    // timeOfBirth: zod
    //   .string()
    //   .regex(
    //     /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
    //     "Time of Birth must be in HH:MM AM/PM format"
    //   ),
    // status: zod.string().optional(),
    // address: zod
    //   .string()
    //   .min(5, "The minimum length of address should be 5")
    //   .max(255, "The maximum length of address should be 255"),
    razorpayPaymentId: zod.string().optional(),
    razorpayOrderId: zod.string().optional(),
    paymentStatus: zod.string().optional(),
  }),
});

module.exports = userValidation;
