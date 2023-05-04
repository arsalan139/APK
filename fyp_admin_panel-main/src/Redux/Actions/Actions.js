import * as ActionList from "./ActionsList";
import API from "../../API/API";
import jwtdecode from "jwt-decode";
import { toast } from "react-toastify";

const SUCCESS = (msg) => {
  return toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const ERROR = (msg) => {
  return toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const IS_LOGGED_IN = () => ({
  type: ActionList.IS_LOGGED_IN,
});

export const IS_LOGGED_OUT = () => ({
  type: ActionList.IS_LOGGED_OUT,
});

export const TOKEN = (payload) => ({
  type: ActionList.TOKEN,
  payload,
});

export const USER = (data) => {
  return async (dispatch) => {
    await window.localStorage.setItem("Token", data);
    dispatch(TOKEN(jwtdecode(data)));
    dispatch(IS_LOGGED_IN());
  };
};

export const USER_STATUS_IN = () => {
  return async (dispatch) => {
    const token = await window.localStorage.getItem("Token");
    if (token !== null) {
      dispatch(TOKEN(jwtdecode(token)));
      dispatch(IS_LOGGED_IN());
    }
  };
};

export const USER_STATUS_OUT = () => {
  return async (dispatch) => {
    await window.localStorage.removeItem("Token");
    dispatch(IS_LOGGED_OUT());
  };
};

export const LOGIN = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post("/auth/adminLogin", data)
      .then((res) => {
        SUCCESS("Your are Logged In!");
        dispatch(USER(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const PROFILE_UPDATE = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.put("/admin/", data)
      .then((res) => {
        dispatch(TOKEN(res.data));
        SUCCESS("Profile Updated!");
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const ALL_ADMIN = (payload) => ({
  type: ActionList.ALL_ADMIN,
  payload,
});

export const GET_ADMIN_LIST = (callback) => {
  return async (dispatch) => {
    await API.get("/admin/")
      .then((res) => {
        dispatch(ALL_ADMIN(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
      });
  };
};

export const ADD_ADMIN = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post("/admin/", data)
      .then((res) => {
        dispatch(ALL_ADMIN(res.data));
        SUCCESS("Admin is Added!");
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const DELETE_ADMIN = (id, callback, errorCb) => {
  return async (dispatch) => {
    await API.delete("/admin/" + id)
      .then((res) => {
        dispatch(GET_ADMIN_LIST(callback));
        SUCCESS("Admin is Deleted!");
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const ADD_PROMO = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post("/promos/", data)
      .then((res) => {
        SUCCESS("Promo is Added!");
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const GET_USER_BY_EMAIL = (data, callback, errorCb) => {
  return async (dispatch) => {
    console.log(data);
    await API.post("/admin/userEmail/", data)
      .then((res) => {
        callback(res.data);
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const ALL_LANGUAGE = (payload) => ({
  type: ActionList.ALL_LANGUAGE,
  payload,
});

export const GET_LANGUAGE_LIST = (callback) => {
  return async (dispatch) => {
    await API.get("/language/")
      .then((res) => {
        dispatch(ALL_LANGUAGE(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
      });
  };
};

export const ADD_LANGUAGE = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post("/language/", data)
      .then((res) => {
        dispatch(ALL_LANGUAGE(res.data));
        SUCCESS("Language is Added!");
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const DELETE_LANGUAGE = (id, callback, errorCb) => {
  return async (dispatch) => {
    await API.delete("/language/" + id)
      .then((res) => {
        dispatch(ALL_LANGUAGE(res.data));
        SUCCESS("Language is Deleted!");
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const ALL_CATEGORIES = (payload) => ({
  type: ActionList.ALL_CATEGORIES,
  payload,
});

export const GET_CATEGORIES_LIST = (callback) => {
  return async (dispatch) => {
    await API.get("/categories/")
      .then((res) => {
        dispatch(ALL_CATEGORIES(res.data));
        callback(res.data);
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
      });
  };
};

export const ADD_CATEGORIES = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post("/categories/", data)
      .then((res) => {
        dispatch(ALL_CATEGORIES(res.data));
        SUCCESS("Categories is Added!");
        callback(res.data);
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const UPDATE_CATEGORIES = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.put("/categories/", data)
      .then((res) => {
        dispatch(ALL_CATEGORIES(res.data));
        SUCCESS("Categories is Updated!");
        callback(res.data);
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const DELETE_CATEGORIES = (id, callback, errorCb) => {
  return async (dispatch) => {
    await API.delete("/categories/" + id)
      .then((res) => {
        dispatch(ALL_CATEGORIES(res.data));
        SUCCESS("Categories is Deleted!");
        callback(res.data);
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const ALL_USERS = (payload) => ({
  type: ActionList.ALL_USERS,
  payload,
});

export const GET_USERS_LIST = (callback) => {
  return async (dispatch) => {
    await API.get("/admin/userList")
      .then((res) => {
        dispatch(ALL_USERS(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
      });
  };
};

export const RESTRICTS_USER = (id, accessedForm, callback, errorCb) => {
  return async (dispatch) => {
    await API.put("/admin/restrict/" + id)
      .then((res) => {
        console.log("User1");
        if (accessedForm === "User") {
          console.log("User");
          dispatch(GET_USERS_LIST(callback));
        } else if (accessedForm === "Worker") {
          dispatch(GET_WORKERS_LIST(callback));
        }
        SUCCESS(`${accessedForm} is Restricted!`);
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const REMOVE_USER_RESTRICTION = (
  id,
  accessedForm,
  callback,
  errorCb
) => {
  return async (dispatch) => {
    await API.put("/admin/removeRestriction/" + id)
      .then((res) => {
        if (accessedForm === "User") {
          dispatch(GET_USERS_LIST(callback));
        } else if (accessedForm === "Worker") {
          dispatch(GET_WORKERS_LIST(callback));
        }
        SUCCESS(`${accessedForm} Restriction is Removed!`);
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const DELETE_USER = (id, accessedForm, callback, errorCb) => {
  return async (dispatch) => {
    await API.delete("/user/" + id)
      .then((res) => {
        if (accessedForm === "User") {
          dispatch(GET_USERS_LIST(callback));
        } else if (accessedForm === "Worker") {
          dispatch(GET_WORKERS_LIST(callback));
        }
        SUCCESS(`${accessedForm} is Deleted!`);
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const ALL_WORKERS = (payload) => ({
  type: ActionList.ALL_WORKERS,
  payload,
});

export const GET_WORKERS_LIST = (callback) => {
  return async (dispatch) => {
    await API.get("/admin/workerList")
      .then((res) => {
        dispatch(ALL_WORKERS(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
      });
  };
};

export const ALL_PENDING_REQUEST = (payload) => ({
  type: ActionList.ALL_PENDING_REQUEST,
  payload,
});

export const GET_PENDING_REQUEST = (callback) => {
  return async (dispatch) => {
    await API.get("/admin/pendingApplication/")
      .then((res) => {
        dispatch(ALL_PENDING_REQUEST(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const VERIFY_PENDING_REQUEST = (id, callback, errorCb) => {
  return async (dispatch) => {
    await API.put("/admin/verified/" + id)
      .then((res) => {
        SUCCESS("Verification is Completed!");
        dispatch(GET_PENDING_REQUEST(callback));
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const GET_USERS_PDF = () => {
  return async (dispatch) => {
    await API.get("/admin/userPdf")
      .then((res) => {})
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
      });
  };
};

export const GET_WORKER_PDF = () => {
  return async (dispatch) => {
    await API.get("/admin/workerPdf")
      .then((res) => {})
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
      });
  };
};

export const GET_CATEGORIES_PDF = () => {
  return async (dispatch) => {
    await API.get("/admin/categoriesPdf")
      .then((res) => {})
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
      });
  };
};

export const DASHBOARD = (payload) => ({
  type: ActionList.DASHBOARD,
  payload,
});

export const GET_DASHBOARD = (callback) => {
  return async (dispatch) => {
    await API.get("/admin/dashboard")
      .then((res) => {
        dispatch(DASHBOARD(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const ALL_COMPLAINT = (payload) => ({
  type: ActionList.ALL_COMPLAINT,
  payload,
});

export const GET_COMPLAINT = (callback) => {
  return async (dispatch) => {
    await API.get("/admin/complaints")
      .then((res) => {
        dispatch(ALL_COMPLAINT(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const USER_CONTACT = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post("/admin/contactUser", data)
      .then((res) => {
        SUCCESS("Email has been sent successfully!");
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const COMMISSION = (payload) => ({
  type: ActionList.COMMISSION,
  payload,
});

export const GET_COMMISSION = (callback) => {
  return async (dispatch) => {
    await API.get("/commission")
      .then((res) => {
        dispatch(COMMISSION(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const UPDATE_COMMISSION = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post("/commission", data)
      .then((res) => {
        dispatch(COMMISSION(res.data));
        SUCCESS("Commission is updated!");
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request.data);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};
