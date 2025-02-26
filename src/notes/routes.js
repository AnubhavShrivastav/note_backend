const express = require("express");
const Note = require("./desc");
const router = express.Router();
const cors = require("cors");
const authenticateUser = require("../middleware")
const app = express();
app.use(express.json());
app.use(cors());


// 📌 POST API to Save Notes in MongoDB
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) return res.status(400).json({ error: "⚠️ Description is required!" });

    const newNote = new Note({ description, createdAt: new Date()
    });
    await newNote.save();

    res.status(201).json({ message: "✅ Note saved!", note: newNote });
  } catch (err) {
    res.status(500).json({ error: "❌ Error saving note" });
  }
});


// Get all note
router.get("/", authenticateUser, async (req, res) => {
  try {
    const notes = await Note.find({ deletedAt: null });
    console.log("📄 Notes fetched:", notes);  // Debugging
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "❌ Error fetching notes!"});
  }
});

// Update a note
router.put("/:id", authenticateUser, async (req, res) => {
  try {
   
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    {
      description: req.body.description,
      updatedAt: new Date()  // Set the updated date manually
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
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },  // Set the deletedAt timestamp
      { new: true }
    );

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: '✅ Note  deleted successfully!', deletedNote });
  } catch (err) {
    console.error('Error during soft delete:', err);
    res.status(500).send('Error deleting note');
  }
});

module.exports = router;
