import * as ActionList from "../Actions/ActionsList";
const initialState = {
  IS_LOGGED: false,
  TOKEN: null,
  info: null,
  allAdmin: [],
  allLanguage: [],
  allCategories: [],
  allUsers: [],
  allWorkers: [],
  allPendingRequest: [],
  dashboard: null,
  allComplaint: [],
  commission: 0,
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
    case ActionList.ALL_ADMIN:
      return { ...state, allAdmin: payload };
    case ActionList.ALL_LANGUAGE:
      return { ...state, allLanguage: payload };
    case ActionList.ALL_CATEGORIES:
      return { ...state, allCategories: payload };
    case ActionList.ALL_USERS:
      return { ...state, allUsers: payload };
    case ActionList.ALL_WORKERS:
      return { ...state, allWorkers: payload };
    case ActionList.ALL_PENDING_REQUEST:
      return { ...state, allPendingRequest: payload };
    case ActionList.ALL_COMPLAINT:
      return { ...state, allComplaint: payload };
    case ActionList.DASHBOARD:
      return { ...state, dashboard: payload };
    case ActionList.COMMISSION:
      return { ...state, commission: payload };
    default:
      return state;
  }
};
