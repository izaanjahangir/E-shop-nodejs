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

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("public/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`server is running on port ${port}`));
