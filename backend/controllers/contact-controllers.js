const Contact = require("../models/contact");

const createContact = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    res.status(201).json({ message: "Contact created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createContact;
