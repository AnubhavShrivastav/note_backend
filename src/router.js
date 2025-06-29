const express = require("express");
const userRouter = require("./user/routes");
const noteRouter = require("./notes/routes");
const authMiddleware = require("./middleware");

const router = express.Router();



router.use("/users", userRouter);
router.use("/notes", authMiddleware, noteRouter);

module.exports = router;
