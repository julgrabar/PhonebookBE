const { Schema, model } = require("mongoose");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Contact must have name"],
      minLength: 3,
      maxLength: 50,
    },
    email: { type: String, required: true, validate: /.+@.+\..+/i },
    phone: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
