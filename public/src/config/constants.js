import {
  faUser,
  faLock,
  faEnvelope,
  faHeart,
  faShoppingCart,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faCaretDown,
  faTrashAlt,
  faCheckCircle,
  faTimes,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";

let BASE_URL = "/api";

if (window.location.hostname === "localhost") {
  BASE_URL = "http://localhost:5000/api";
}

export default {
  BASE_URL,
  icons: {
    faUser,
    faLock,
    faEnvelope,
    faHeart,
    faShoppingCart,
    faArrowAltCircleRight,
    faArrowAltCircleLeft,
    faCaretDown,
    faTrashAlt,
    faCheckCircle,
    faTimes,
    faExclamationCircle
  },
  MESSAGE_BOX_DURATION: 2000
};
