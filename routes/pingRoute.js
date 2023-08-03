const express = require("express");
const { handelPing } = require("../controllers/pingController");
const router = express.Router();

router.get("/", handelPing);

module.exports = router;
