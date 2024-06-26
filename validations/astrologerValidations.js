const zod = require("zod");

const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
// const dateOfBirthRegex = /^\d{2}\d{2}\d{4}$/;
const longBioMinWords = 2;
const longBioMaxWords = 60;

const astrologerValidation = zod.object({
  body: zod.object({
    // profilePic: zod.string().optional(),
    userName: zod.string().min(1, "UserName is required"),
    email: zod
      .string()
      .email("Invalid email format")
      .regex(emailRegex, "Email must be a valid Gmail address"),
    password: zod.string().min(1, "Password is required"),
    phone: zod.string().min(1, "Phone is required"),
    gender: zod.string().min(1, "Gender is required"),
    // dateOfBirth: zod
    //   .string()
    //   .regex(dateOfBirthRegex, "Date of Birth must be in ddmmyyyy format"),
    langKnown: zod.array(zod.string()).min(1, "Language is required"),
    state: zod.string().min(1, "State is required"),
    city: zod.string().min(1, "City is required"),
    country: zod.string().min(1, "Country is required"),
    pinCode: zod.number().min(1, "Pin Code is required"),
    createdAt: zod.string().optional(), // Optional because it will be generated automatically
    status: zod.string().optional(), // Assuming ObjectId is string for validation purposes
    address: zod.string().min(1, "Address is required"),
    primarySkills: zod
      .array(zod.string())
      .min(1, "Primary Skills are required"),
    allSkills: zod.array(zod.string()).min(1, "All Skills are required"),
    expirence: zod.number().min(1, "Experience is required"),
    hoursContribution: zod.number().min(1, "Hours Contribution is required"),
    pricePerMin: zod.number().min(1, "Price per Minute is required"),
    // serviceType: zod.string().optional(), // Assuming ObjectId is string for validation purposes
    // whyOnBoard: zod.array(zod.string()).min(1, "Why On Board is required"),
    // mainSourceOfIncome: zod
    //   .array(zod.string())
    //   .min(1, "Main Source Of Income is required"),
    refFrom: zod.string().min(1, "Reference From is required"),
    // chatDoneWith: zod.string().optional(), // Assuming ObjectId is string for validation purposes
    learnedAstrologyFrom: zod
      .string()
      .min(1, "Learned Astrology From is required"),
    links: zod.array(zod.string()).min(1, "Links are required"),
    minExpSal: zod.number().optional(),
    longBio: zod
      .string()
      .min(
        longBioMinWords,
        `Long Bio must be at least ${longBioMinWords} words`
      )
      .max(
        longBioMaxWords,
        `Long Bio must be at most ${longBioMaxWords} words`
      ),
    // statusId: zod.string().optional(), // Assuming ObjectId is string for validation purposes
    qualifications: zod
      .array(zod.string())
      .min(1, "Qualifications are required"),
    tokenNumber: zod.number().optional(), // This will be generated automatically
  }),
});

module.exports = astrologerValidation;
