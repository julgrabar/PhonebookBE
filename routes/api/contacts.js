const express = require("express");
const { ctrlWrapper } = require("../../middleware");
const { contactsCtrls } = require("../../controllers");
const router = express.Router();

router.get("/", ctrlWrapper(contactsCtrls.listContacts));

router.get("/:contactId", ctrlWrapper(contactsCtrls.getContactById));

router.post("/", ctrlWrapper(contactsCtrls.addContact));

router.delete("/:contactId", ctrlWrapper(contactsCtrls.removeContact));

router.put("/:contactId", ctrlWrapper(contactsCtrls.updateContact));

module.exports = router;
