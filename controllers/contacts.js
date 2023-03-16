const { Contact } = require("../models");
const { NotFound } = require("http-errors");

const listContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    const err = new Error();
    err.status = 404;
    err.message = `There is no contact with id=${contactId}`;
    res.status(404).send(err.message);
    return err;
  }
  res.json(contact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    const err = new Error();
    err.status = 404;
    err.message = `There is no contact with id=${contactId}`;
    res.status(404).send(err.message);
    return err;
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    const err = new Error();
    err.status = 404;
    err.message = `There is no contact with id=${contactId}`;
    res.status(404).send(err.message);
    return err;
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
