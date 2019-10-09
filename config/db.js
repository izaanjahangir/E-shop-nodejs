const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to MONGODB"))
  .catch(err => console.log("error in MONGODB =>", err));

mongoose.set("useCreateIndex", true);

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set("useFindAndModify", false);

mongoose.set('useUnifiedTopology', true);