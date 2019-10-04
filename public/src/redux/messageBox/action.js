import constants from "../../config/constants";

const openMessageBox = payload => dispatch => {
  dispatch({
    type: "OPEN_MESSAGE_BOX",
    payload
  });

  setTimeout(
    () =>
      dispatch({
        type: "CLOSE_MESSAGE_BOX"
      }),
    constants.MESSAGE_BOX_DURATION
  );
};

const closeMessageBox = () => ({ type: "CLOSE_MESSAGE_BOX" });

export default {
  openMessageBox,
  closeMessageBox
};
