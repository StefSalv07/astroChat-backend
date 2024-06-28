const express = require("express");
const router = express.Router();
const serviceTypeController = require("../controller/serviceController");
router.post("/serviceType", serviceTypeController.addServiceType);
router.get("/serviceType", serviceTypeController.getAllServiceType);
router.get("/serviceType/:id", serviceTypeController.getServiceTypeById);
router.put("/serviceType/:id", serviceTypeController.updateServiceTypeById);
router.delete("/serviceType/:id", serviceTypeController.deleteServiceType);

module.exports = router;
