import helpers from "./helpers";

const login = body => helpers.fetchApi("/user/login", "POST", body);
const updateUser = (body, token) =>
  helpers.fetchApi("/user/update", "POST", body, token, "form-data");
const fetchProducts = body => helpers.fetchApi("/product/find", "POST", body);
const fetchAllCategories = () => helpers.fetchApi("/category", "GET");
const fetchProductById = body =>
  helpers.fetchApi(`/product/find/${body.id}`, "GET");
const fetchUserById = body => helpers.fetchApi(`/user/${body.id}`, "GET");
const changePassword = (body, token) =>
  helpers.fetchApi("/user/changepassword", "POST", body, token);
const charge = (body, token) =>
  helpers.fetchApi("/user/charge", "POST", body, token);

export default {
  login,
  fetchProducts,
  fetchAllCategories,
  fetchProductById,
  fetchUserById,
  changePassword,
  updateUser,
  charge
};
