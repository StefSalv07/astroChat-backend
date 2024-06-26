const express = require("express");
const router = express.Router();

const raingController = require("../controller/ratingController");

router.post("/rate", raingController.addRating);
router.get("/rate/:astroId", raingController.getRatingByAstrologerId);

module.exports = router;
