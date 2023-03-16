const express = require("express");
const { ctrlWrapper } = require("../../middleware");
const { authCtrls } = require("../../controllers");
const router = express.Router("");

router.post("/signup", ctrlWrapper(authCtrls.signup));
router.post("/signin", ctrlWrapper(authCtrls.signin));

module.exports = router;
