const express = require("express");
const roleController = require("../controller/roleController");
const router = express.Router();
const rolevalidation = require("../validations/roleValidation");
const validate = require("../middleware/zodMiddleWare");

router.post("/role", validate(rolevalidation), roleController.addRole);
router.get("/role", roleController.getAllRoles);
router.delete("/role", roleController.deleteRoleById);
router.get("/role/:id", roleController.getRoleById);
router.put("/role/:id", roleController.updateRole);

// router.get("/role/:id", roleController.getRoleById);

module.exports = router;
