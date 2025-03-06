const express = require("express");
const Note = require("./desc");
const router = express.Router();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// 📌 POST API to Save Notes in MongoDB
router.post("/", async (req, res) => {
  try {
    console.log("🔍 Incoming Data:", req.body);
    console.log("User ID:", req.user);

    const { description, color } = req.body;

    if (!description)
      return res.status(400).json({ error: "⚠️ Description is required!" });

    const newNote = new Note({
      user: req.user.user._id,
      description,
      createdAt: new Date(),
      color,
    });
    await newNote.save();
    console.log(newNote);
    res.status(201).json({ message: "✅ Note saved!", note: newNote });
  } catch (err) {
    console.error("❌ Error saving note:", err);
    res.status(500).json({ error: "❌ Error saving note" });
  }
});

// Get all note
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.user._id,
      deletedAt: null,
    }).populate("user", "name email");
    console.log("📄 Notes fetched:", notes); // Debugging
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Error fetching notes!" });
  }
});

// Update a note
router.put("/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.description,
        user: req.user.user._id,
        updatedAt: new Date(), // Set the updated date manually
      },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "❌ Note not found!" });
    }

    res.json(updatedNote);
  } catch (err) {
    console.error("❌ Error updating note:", err);
    res.status(500).json({ error: "❌ Internal Server Error" });
  }
});

// Delete a note
router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndUpdate(
      { _id: req.params.id, user: req.user.user._id },
      { deletedAt: new Date() }, // Set the deletedAt timestamp
      { new: true }
    );

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "✅ Note  deleted successfully!", deletedNote });
  } catch (err) {
    console.error("Error during soft delete:", err);
    res.status(500).send("Error deleting note");
  }
});

module.exports = router;
