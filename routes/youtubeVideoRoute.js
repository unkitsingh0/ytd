const express = require("express");
const {
  handelYoutubeVideoLink,
} = require("../controllers/youtubeVideoController");
const router = express.Router();

router.post("/download", handelYoutubeVideoLink);

module.exports = router;
