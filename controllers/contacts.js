const { createError } = require("../helpers");
const { Contact } = require("../models");

const listContacts = async (req, res) => {
  const { id } = req.user;
  const contacts = await Contact.find({ owner: id }, "-owner");
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId, "-owner");
  if (!contact) {
    throw createError(404, `There is no contact with id=${contactId}`);
  }
  res.json(contact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw createError(404, `There is no contact with id=${contactId}`);
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const { id } = req.user;
  const newContact = req.body;
  newContact.owner = id;
  const contact = await Contact.create(newContact);
  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw createError(404, `There is no contact with id=${contactId}`);
  }
  res.json(contact);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
