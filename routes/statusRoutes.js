const express = require("express");
const router = express.Router();
const statusController = require("../controller/statusController");
const validate = require("../middleware/zodMiddleWare");
const statusValidation = require("../validations/statusValidation");
router.post("/status", validate(statusValidation), statusController.addStatus);
router.get("/status", statusController.getAllStatus);
router.get("/status/:id", statusController.getStatusById);
router.put(
  "/status/:id",
  validate(statusValidation),
  statusController.updateStatus
);
router.delete("/status/:id", statusController.deleteStatusById);

module.exports = router;
