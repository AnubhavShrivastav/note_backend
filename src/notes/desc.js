const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
description:  { type: String, required: true },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date },
deletedAt: { type: Date, default: null }  // Add deletedAt with default null
},{
    timestamps:true
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
