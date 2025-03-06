const mongoose = require("mongoose");
const NoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },

    description: { type: String, required: true },
    color: {
      type: String,
      immutable: true, // This prevents color from changing on updates
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
