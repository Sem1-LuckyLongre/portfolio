const express = require("express");
const router = express.Router();
const contactController  = require("../controllers/contact-controllers");

router.post("/contact", contactController.createContact);
router.get("/getcontacts", contactController.getContacts); 

module.exports = router;
