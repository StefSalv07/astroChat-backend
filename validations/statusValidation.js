const zod = require("zod");

const statusValidation = zod.object({
  body: zod.object({
    statusName: zod
      .string()
      .min(2, "The minimum length of statusName should be 2")
      .max(50, "The maximum length of statusName should be 50"),
    statusDesc: zod.string().optional(), // Assuming statusDesc is not required based on your schema
  }),
});

module.exports = statusValidation;
