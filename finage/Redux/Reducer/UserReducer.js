import * as ActionList from "../Actions/ActionsList";
const initialState = {
  IS_LOGGED: false,
  TOKEN: null,
  info: null,
  verification_from: "",
  category: [],
  request_status: "",
  user_by_category: null,
  orders: [],
  review: [],
  wallet: null,
  msg: [],
  expo_token: null,
  notification: [],
  language: [],
  selected_language: null,
  promos: [],
  order_details: null,
  favorites: [],
};
// eslint-disable-next-line
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.IS_LOGGED_IN:
      return { ...state, IS_LOGGED: true };
    case ActionList.IS_LOGGED_OUT:
      return { ...state, IS_LOGGED: false };
    case ActionList.TOKEN:
      return { ...state, TOKEN: payload };
    case ActionList.VERIFICATION_FROM:
      return { ...state, verification_from: payload };
    case ActionList.CATEGORY:
      return { ...state, category: payload };
    case ActionList.REQUEST_STATUS:
      return { ...state, request_status: payload };
    case ActionList.CATEGORY_SELECTED:
      return { ...state, user_by_category: payload };
    case ActionList.ORDER:
      return { ...state, orders: payload };
    case ActionList.WORKER_INFORMATION:
      return { ...state, info: payload };
    case ActionList.REVIEW:
      return { ...state, review: payload };
    case ActionList.WALLET:
      return { ...state, wallet: payload };
    case ActionList.ORDER_MESSAGE:
      return { ...state, msg: payload };
    case ActionList.EXPO_TOKEN:
      return { ...state, expo_token: payload };
    case ActionList.NOTIFICATION:
      return { ...state, notification: payload };
    case ActionList.LANGUAGE:
      return { ...state, language: payload };
    case ActionList.SELECTED_LANGUAGE:
      return { ...state, selected_language: payload };
    case ActionList.PROMOS:
      return { ...state, promos: payload };
    case ActionList.ORDER_DETAILS:
      return { ...state, order_details: payload };
    case ActionList.FAVORITES:
      return { ...state, favorites: payload };
    default:
      return state;
  }
};
