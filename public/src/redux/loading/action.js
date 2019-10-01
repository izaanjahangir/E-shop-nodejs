const startLoading = () => ({ type: "CHANGE_LOADING_STATE", payload: true });
const stopLoading = () => ({ type: "CHANGE_LOADING_STATE", payload: false });

export default {
  startLoading,
  stopLoading
};
