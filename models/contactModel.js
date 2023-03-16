const { Schema, model } = require("mongoose");

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Contact must have name"],
    minLength: 3,
    maxLength: 50,
  },
  email: String,
  phone: String,
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
