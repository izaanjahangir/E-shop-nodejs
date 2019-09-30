import helpers from "./helpers";

const fetchProducts = body => helpers.fetchApi("/product/find", "POST", body);
const fetchProductById = body => helpers.fetchApi(`/product/find/${body.id}`, "GET");

export default {
  fetchProducts,
  fetchProductById
};
