const express = require("express");
const app = express();

require("dotenv").config();
require("./config/db");

const port = process.env.PORT;

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/user", require("./route/user"));

app.listen(port, () => console.log(`server is running on port ${port}`));
