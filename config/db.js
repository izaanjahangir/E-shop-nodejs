const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to MONGODB"))
  .catch(err => console.log("error in MONGODB =>", err));
