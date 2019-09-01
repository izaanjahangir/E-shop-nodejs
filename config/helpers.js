const handleMongooseError = response => {
  let returnResponse = {};

  if (response.name === "ValidationError") {
    const errorsArray = [];
    for (item in response.errors) {
      errorsArray.push(response.errors[item].message);
    }

    returnResponse.message = errorsArray;
  } else if ("message" in response) {
    returnResponse = response;
  }

  return returnResponse;
};

module.exports = {
  handleMongooseError
};
