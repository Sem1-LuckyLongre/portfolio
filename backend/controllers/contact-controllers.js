const Contact = require("../models/contact");

const createContact = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ msg: "Contacts Not Found" });
    }
    res.status(201).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createContact, getContacts };
