import {
  faUser,
  faLock,
  faEnvelope,
  faHeart,
  faShoppingCart,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faCaretDown,
  faTrashAlt
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
    faTrashAlt
  }
};
