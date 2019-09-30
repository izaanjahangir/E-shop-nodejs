import constants from "./constants";

const fetchApi = async (route, method, body, authorization) => {
  try {
    const url = constants.BASE_URL + route;
    const headers = {
      "Content-Type": "application/json"
    };

    const options = {
      method
    };

    if (method !== "GET") {
      options.headers = headers;
      options.body = JSON.stringify(body);
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
