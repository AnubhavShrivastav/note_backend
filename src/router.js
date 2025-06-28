const express = require("express");
const userRouter = require("./user/routes");
const noteRouter = require("./notes/routes");
const cors = require("cors");
const authMiddleware = require("./middleware");

const router = express.Router();
const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://note-meapp.netlify.app",
  credentials: true,
}));

router.use("/users", userRouter);
router.use("/notes", authMiddleware, noteRouter);

module.exports = router;
