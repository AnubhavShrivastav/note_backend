require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require("./src/db");
const routes = require("./src/router");
const { CONSTANTS } = require("./src/constants");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(CONSTANTS.PORT, () => {
  console.log("Server started on port ", CONSTANTS.PORT);
});
