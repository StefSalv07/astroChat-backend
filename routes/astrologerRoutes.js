const express = require("express");
const router = express.Router();
const validate = require("../middleware/zodMiddleWare");
const astrologerValidation = require("../validations/astrologerValidations");
const astroController = require("../controller/AstrologerController");
router.post(
  "/astro/register",
  validate(astrologerValidation),
  astroController.register
);
router.post("/astro/login", astroController.login);
router.post("/astro/loginEmail", astroController.loginViaEmail);
router.get("/astro", astroController.getAllAstrologers);
router.get("/astro/:id", astroController.getAstrologerById);
router.put("/astro/:id", astroController.updateAstrologerById);
router.delete("/astro/:id", astroController.deleteAstrologerById);
// router.post("/astro/forgotPassword", astroController.forgotPassword);
// router.post("/astro/changePassword", astroController.changePassword);
module.exports = router;
