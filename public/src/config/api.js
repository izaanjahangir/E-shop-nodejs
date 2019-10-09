import helpers from "./helpers";

const login = body => helpers.fetchApi("/user/login", "POST", body);
const register = body => helpers.fetchApi("/user/register", "POST", body);
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
const createCategory = (body, token) =>
  helpers.fetchApi("/category/create", "POST", body, token, "form-data");
const createProduct = (body, token) =>
  helpers.fetchApi("/product/create", "POST", body, token, "form-data");
const fetchOrders = (body, token) =>
  helpers.fetchApi("/order/allorders", "POST", body, token);

export default {
  login,
  register,
  fetchProducts,
  fetchAllCategories,
  fetchProductById,
  fetchUserById,
  changePassword,
  updateUser,
  charge,
  createCategory,
  createProduct,
  fetchOrders
};
