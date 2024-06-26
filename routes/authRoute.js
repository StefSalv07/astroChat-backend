const express = require("express");
const router = express.Router();
const { logout, verifyJwt } = require("../controller/authController");

router.post("/checkAuth", verifyJwt);
router.post("/logout", logout);

module.exports = router;
