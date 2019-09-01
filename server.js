const express = require("express");
const app = express();

require("dotenv").config();
require("./config/db");

const port = process.env.PORT;

app.listen(port, () => console.log(`server is running on port ${port}`));
