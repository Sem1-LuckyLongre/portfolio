const express = require("express");
const router = express.Router();
const createContact  = require("../controllers/contact-controllers");

router.post("/contact", createContact);

module.exports = router;
