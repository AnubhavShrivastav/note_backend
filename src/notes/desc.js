const mongoose = require("mongoose");
const getRandomColor = require("../colorUtils");
const NoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user", // Reference to User model
      required: true,
    },

    description: { type: String, required: true },
    color: {
      type: String,
      default: getRandomColor, // Optional color field
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    deletedAt: { type: Date, default: null }, // Add deletedAt with default null
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
