const mongoose = require("mongoose");
const { CONSTANTS } = require("./constants");

mongoose.connect(CONSTANTS.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected successfully");
});

module.exports = db;
