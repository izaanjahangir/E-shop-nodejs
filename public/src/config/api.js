import helpers from "./helpers";

const login = body => helpers.fetchApi("/user/login", "POST", body);
const fetchProducts = body => helpers.fetchApi("/product/find", "POST", body);
const fetchAllCategories = () => helpers.fetchApi("/category", "GET");
const fetchProductById = body =>
  helpers.fetchApi(`/product/find/${body.id}`, "GET");

export default {
  login,
  fetchProducts,
  fetchAllCategories,
  fetchProductById
};
