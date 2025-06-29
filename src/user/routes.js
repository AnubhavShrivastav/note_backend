const express = require("express");
const User = require("./user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { CONSTANTS } = require("../constants");
const router = express.Router();

const app = express();
app.use(express.json());

// login user
// check if user exists by email
// if exists check if password matches
// generate token
// send token and message
// else error invalid login

// login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ user }, CONSTANTS.JWT_SECRET, { expiresIn: "7d" });

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Register a new user
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //  Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    //  Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(), // Save user registration date
    });

    //  Save to Database
    await user.save();

    //  Generate JWT Token
    const token = jwt.sign({ user }, CONSTANTS.JWT_SECRET, { expiresIn: "7d" });

    //  Return user details & token
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Update a user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, password, updatedAt: new Date() },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send({ message: "User marked as deleted", user });
  } catch (error) {
    res.status(500).send({ message: "Error deleting user", error });
  }
});

module.exports = router;
