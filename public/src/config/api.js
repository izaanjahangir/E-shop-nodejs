import helpers from "./helpers";

const fetchProducts = body => helpers.fetchApi("/product/find", "POST", body);

export default {
  fetchProducts
};
