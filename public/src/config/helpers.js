import constants from "./constants";

const fetchApi = async (route, method, body, authorization, type) => {
  try {
    const url = constants.BASE_URL + route;
    const headers = {
      "Content-Type": "application/json"
    };

    if (type === "form-data") {
      delete headers["Content-Type"];
    }

    const options = {
      method
    };

    if (method !== "GET") {
      options.headers = headers;
      options.body = JSON.stringify(body);
    }

    if (type === "form-data") {
      delete options.body;
      options.body = body;
    }

    if (authorization) {
      headers.Authorization = "Bearer " + authorization;
    }

    const response = await fetch(url, options);
    const json = await response.json();

    if (response.status !== 200) {
      throw json;
    }

    return json;
  } catch (e) {
    throw e;
  }
};

export default {
  fetchApi
};
