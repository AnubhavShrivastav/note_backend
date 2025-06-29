require('dotenv').config();
require('constants')
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./src/db");
const routes = require("./src/router");
const { CONSTANTS } = require("./src/constants");

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());

app.use("/", routes);

app.listen(CONSTANTS.PORT, () => {
  console.log("Server started on port ", CONSTANTS.PORT);
});
