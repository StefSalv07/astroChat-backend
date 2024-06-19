const zod = require("zod");
const roleValidation = zod.object({
  body: zod.object({
    roleName: zod.string().min(3).max(255),
    roleDesc: zod.string().min(3).max(255),
  }),
});

module.exports = roleValidation;
