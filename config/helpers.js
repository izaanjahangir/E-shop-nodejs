const mongoose = require("mongoose");
const mkdirp = require("mkdirp");

const isValidMongooseId = id => mongoose.Types.ObjectId.isValid(id);

const makeFolder = path => mkdirp(path);

const handleMongooseError = response => {
  let returnResponse = {};

  if (response.name === "ValidationError") {
    const errorsArray = [];
    for (item in response.errors) {
      errorsArray.push(response.errors[item].message);
    }

    returnResponse.message = errorsArray;
  } else if ("message" in response) {
    returnResponse = { message: response.message };
  }

  return returnResponse;
};

module.exports = {
  handleMongooseError,
  isValidMongooseId,
  makeFolder
};
