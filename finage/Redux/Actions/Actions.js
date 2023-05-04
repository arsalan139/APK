import * as ActionList from './ActionsList';
import API from '../../API/Finage';
import jwtdecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'native-base';
import { English } from '../../constants/language';
import { io } from 'socket.io-client';
import axios from 'axios';
const status = io('http://192.168.100.6:4000/status', {
  autoConnect: true,
});

const SUCCESS = (msg) => {
  return Toast.show({
    text: msg,
    style: { margin: 10, borderRadius: 7 },
    textStyle: { textAlign: 'center' },
    type: 'success',
  });
};

const ERROR = (msg) => {
  return Toast.show({
    text: msg,
    type: 'danger',
    style: { margin: 10, borderRadius: 7 },
    textStyle: { textAlign: 'center' },
  });
};

export const EXPO_TOKEN = (payload) => ({
  type: ActionList.EXPO_TOKEN,
  payload,
});

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

export const VERIFICATION_FROM = (payload) => ({
  type: ActionList.VERIFICATION_FROM,
  payload,
});

export const USER = (data) => {
  return async (dispatch) => {
    await AsyncStorage.setItem('Token', data);
    API.defaults.headers.common['x-auth-token'] = data;
    dispatch(TOKEN(jwtdecode(data)));
    status.emit('online', {
      id: jwtdecode(data).id,
      role: jwtdecode(data).role,
      name: jwtdecode(data).name,
    });
    dispatch(GET_CATEGORY());
  };
};

export const USER_STATUS_IN = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('Token');
    if (token !== null) {
      API.defaults.headers.common['x-auth-token'] = token;
      dispatch(TOKEN(jwtdecode(token)));
      dispatch(GET_CATEGORY());
      dispatch(IS_LOGGED_IN());
    }
  };
};

export const USER_STATUS_OUT = () => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem('Token');
    status.emit('offline', {
      id: jwtdecode(token).id,
      role: jwtdecode(token).role,
      name: jwtdecode(token).name,
    });
    await AsyncStorage.removeItem('Token');
    dispatch(IS_LOGGED_OUT());
  };
};

export const LOGIN = (data, callback) => {
  return async (dispatch) => {
    await API.post('auth/login', data)
      .then((res) => {
        dispatch(USER(res.data));
        SUCCESS('Your are now logged in!');
        dispatch(GET_LANGUAGES_BY_ID());
        callback();
        dispatch(IS_LOGGED_IN());
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const GOOGLE_LOGIN = (data, callback) => {
  return async (dispatch) => {
    await API.post('/auth/api/login', data)
      .then((res) => {
        SUCCESS('Login Successful!');
        dispatch(USER(res.data));
        dispatch(GET_LANGUAGES_BY_ID());
        callback();
        dispatch(IS_LOGGED_IN());
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const REGISTRATION = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post('auth/signUp', data)
      .then((res) => {
        dispatch(USER(res.data));
        SUCCESS('Registration is successful!');
        dispatch(SELECTED_LANGUAGES(English));
        callback();
      })
      .catch((error) => {
        console.log(error.message, error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const PHONE_VERIFICATION = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post('auth/phone-verification', data)
      .then((res) => {
        SUCCESS('Code is Sended!');
        callback();
      })
      .catch((error) => {
        console.log(error.message, error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const CODE_VERIFICATION = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post('auth/code-verification', data)
      .then((res) => {
        SUCCESS('Phone is verified!');
        callback();
        if (data.from === 'SignUp') {
          dispatch(IS_LOGGED_IN());
        }
      })
      .catch((error) => {
        console.log(error.message, error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const FORGET = (data, callback) => {
  return async (dispatch) => {
    await API.post('auth/forget', data)
      .then((res) => {
        SUCCESS('Email Has been Sent!');
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const STATUS = (payload) => ({
  type: ActionList.REQUEST_STATUS,
  payload,
});

export const GET_APPLICATION_STATUS = (id, callback, errorCb) => {
  return async (dispatch) => {
    await API.get('worker/application/status/' + id)
      .then((res) => {
        dispatch(STATUS(res.data));
        callback(res.data);
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const APPLICATION = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post('worker/application/', data)
      .then((res) => {
        SUCCESS('Your Request has been Submitted!');
        dispatch(STATUS(res.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const GET_INFORMATION = (Id, callback, errorCb) => {
  return async (dispatch) => {
    await API.get('user/' + Id)
      .then((res) => {
        callback(res.data);
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const UPDATE_INFORMATION = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.put('user/', data)
      .then((res) => {
        SUCCESS('Profile is updated!');
        dispatch(USER(res.data.token));
        callback(res.data.User);
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const CHANGE_PASSWORD = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.put('user/password', data)
      .then((res) => {
        SUCCESS('Password is updated!');
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const CATEGORY = (payload) => ({
  type: ActionList.CATEGORY,
  payload,
});

export const SELECTED_CATEGORY = (payload) => ({
  type: ActionList.CATEGORY_SELECTED,
  payload,
});

export const GET_CATEGORY = () => {
  return async (dispatch) => {
    await API.get('/categories/')
      .then((res) => {
        dispatch(CATEGORY(res.data));
        // callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        // errorCb();
      });
  };
};

export const GET_USER_BY_CATEGORY = (category, callback, errorCb) => {
  return async (dispatch) => {
    await API.get('/worker/category/' + category)
      .then((res) => {
        console.log(res.data);
        dispatch(SELECTED_CATEGORY({ result: res.data, field: category }));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const ORDER_LIST = (payload) => ({
  type: ActionList.ORDER,
  payload,
});

export const GET_ORDER = (id, callback) => {
  return async (dispatch) => {
    await API.get('/order/active/' + id)
      .then((res) => {
        dispatch(ORDER_LIST(res.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const GET_ORDER_HISTORY = (id, callback) => {
  return async (dispatch) => {
    await API.get('/order/history/' + id)
      .then((res) => {
        dispatch(ORDER_LIST(res.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const ADD_ORDER = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post('/order/', data)
      .then((res) => {
        SUCCESS('Order has been Placed! Can be Canceled with in 1 minute!');
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const REJECT_ORDER = (user, id, callback, errorCb) => {
  return async (dispatch) => {
    await API.put('/order/rejected/' + id)
      .then((res) => {
        SUCCESS('The order has been rejected Successfully!');
        dispatch(GET_ORDER(user, callback));
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const CANCEL_ORDER = (user, id, callback, errorCb) => {
  return async (dispatch) => {
    await API.put('/order/cancel/' + id)
      .then((res) => {
        SUCCESS('The order has been canceled Successfully!');
        dispatch(GET_ORDER(user, callback));
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const ACCEPTED_ORDER = (user, id, hours, callback, errorCb) => {
  return async (dispatch) => {
    await API.put('/order/accepted/' + id, { hours })
      .then((res) => {
        SUCCESS('The order has been Accepted Successfully!');
        dispatch(GET_ORDER(user, callback));
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const COMPLETED_ORDER = (id, data, callback, errorCb) => {
  return async (dispatch) => {
    await API.put('/order/completed/' + id, data)
      .then((res) => {
        SUCCESS('The order has been completed Successfully!');
        dispatch(GET_ORDER(id, callback));
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const DETAILS = (payload) => ({
  type: ActionList.ORDER_DETAILS,
  payload,
});

export const GET_ORDER_BY_ID = (id, callback) => {
  return async (dispatch) => {
    await API.get('/order/' + id)
      .then((res) => {
        dispatch(DETAILS(res.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const INFORMATION = (payload) => ({
  type: ActionList.WORKER_INFORMATION,
  payload,
});

export const GET_WORKER_INFORMATION = (id, callback) => {
  return async (dispatch) => {
    await API.get('/worker/' + id)
      .then((res) => {
        dispatch(INFORMATION(res.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const REVIEW = (payload) => ({
  type: ActionList.REVIEW,
  payload,
});

export const GET_REVIEW = (id, callback) => {
  return async (dispatch) => {
    await API.get(`/review/${id}`)
      .then((response) => {
        dispatch(REVIEW(response.data));
        callback();
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR('Bad Request!');
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const ADD_REVIEW = (id, data, callback) => {
  return async (dispatch) => {
    await API.post('/review/', data)
      .then((response) => {
        dispatch(GET_WORKER_INFORMATION(id, callback));
        SUCCESS('Review Added Successful!');
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR('Bad Request!');
        } else {
          ERROR('Network Error!');
        }
        callback();
      });
  };
};

export const WALLET = (payload) => ({
  type: ActionList.WALLET,
  payload,
});

export const GET_WALLET = (id, callback) => {
  return async (dispatch) => {
    await API.get(`/wallet/${id}`)
      .then((response) => {
        dispatch(WALLET(response.data));
        callback();
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR('Bad Request!');
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const ADD_WALLET = (data, msg, callback) => {
  return async (dispatch) => {
    await API.post('/wallet/', data)
      .then((response) => {
        dispatch(WALLET(response.data));
        console.log(response.data);
        SUCCESS(msg);
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR('Bad Request!');
        } else {
          ERROR('Network Error!');
        }
        callback();
      });
  };
};

export const PAYMENT_WITH_API = (id, data, callback) => {
  return async (dispatch) => {
    await axios
      .post(
        'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction',
        data
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.pp_ResponseCode === '000') {
          let d = {
            user: id,
            amount: parseInt(response.data.pp_Amount) / 100,
            transaction_id: response.data.pp_TxnRefNo,
            method: response.data.pp_TxnType,
          };
          dispatch(ADD_WALLET(d, response.data.pp_ResponseMessage, callback));
        } else {
          ERROR(response.data.pp_ResponseMessage);
          callback();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR('Bad Request!');
        } else {
          ERROR('Network Error!');
        }
        callback();
      });
  };
};

export const PAY_PENDING_WALLET = (id, callback) => {
  return async (dispatch) => {
    await API.put('/wallet/payPendingDues/' + id)
      .then((response) => {
        dispatch(GET_WALLET(id, callback));
        SUCCESS('Dues has been Payed!');
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR('Bad Request!');
        } else {
          ERROR('Network Error!');
        }
        callback();
      });
  };
};

export const COMPLAINT_BOX = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post('/complaint/', data)
      .then((response) => {
        SUCCESS('Compliant has been Sended!');
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR('Bad Request!');
        } else {
          ERROR('Network Error!');
        }
        errorCb();
      });
  };
};

export const MESSAGE = (payload) => ({
  type: ActionList.ORDER_MESSAGE,
  payload,
});

export const GET_MESSAGE = (id, callback) => {
  return async (dispatch) => {
    await API.get('/order/msg/' + id)
      .then((response) => {
        dispatch(MESSAGE(response.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR('Bad Request!');
        } else {
          ERROR('Network Error!');
        }
        errorCb();
      });
  };
};

export const NOTIFICATION = (payload) => ({
  type: ActionList.NOTIFICATION,
  payload,
});

export const GET_NOTIFICATION = (id, callback) => {
  return async (dispatch) => {
    await API.get('/notification/' + id)
      .then((res) => {
        dispatch(NOTIFICATION(res.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const LANGUAGES = (payload) => ({
  type: ActionList.LANGUAGE,
  payload,
});

export const GET_LANGUAGES = (callback) => {
  return async (dispatch) => {
    await API.get('/language/')
      .then((res) => {
        dispatch(LANGUAGES(res.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const SELECTED_LANGUAGES = (payload) => ({
  type: ActionList.SELECTED_LANGUAGE,
  payload,
});

export const GET_LANGUAGES_BY_ID = () => {
  return async (dispatch) => {
    let id = await AsyncStorage.getItem('Language');
    if (id) {
      await API.get('/language/' + id)
        .then((res) => {
          dispatch(SELECTED_LANGUAGES(res.data.terms));
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response) {
            ERROR(error.response.data);
          } else if (error.request) {
            ERROR(error.message);
          } else {
            ERROR(error.message);
          }
          dispatch(SELECTED_LANGUAGES(English));
        });
    } else {
      dispatch(SELECTED_LANGUAGES(English));
    }
  };
};

export const GET_LANGUAGE = (callback) => {
  return async (dispatch) => {
    await API.get('/language/')
      .then((res) => {
        dispatch(LANGUAGES(res.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const PROMO = (payload) => ({
  type: ActionList.PROMOS,
  payload,
});

export const GET_PROMOS_BY_ID = (id, callback) => {
  return async (dispatch) => {
    await API.get('/promos/' + id)
      .then((res) => {
        dispatch(PROMO(res.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const ADD_PROMO_CODE = (id, code, callback) => {
  return async (dispatch) => {
    await API.put('/user/promoUsed/' + code)
      .then((res) => {
        SUCCESS('Promo is Add');
        dispatch(GET_PROMOS_BY_ID(id, callback));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const PAYMENT_INTENT = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post('/wallet/create-payment-intent', data)
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR('Bad Request!');
        } else {
          ERROR('Network Error!');
        }
        errorCb();
      });
  };
};

export const ADD_TO_FAVORITES = (data, callback) => {
  return async (dispatch) => {
    await API.put('/user/addFavorite', data)
      .then((response) => {
        dispatch(GET_ORDER_BY_ID(data.order, callback));
        SUCCESS('Added to Favorites');
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR('Bad Request!');
        } else {
          ERROR('Network Error!');
        }
        callback();
      });
  };
};

export const REMOVE_FROM_FAVORITES = (data, callback) => {
  return async (dispatch) => {
    await API.put('/user/removeFavorite', data)
      .then((response) => {
        if (data.order) {
          dispatch(GET_ORDER_BY_ID(data.order, callback));
        } else {
          dispatch(GET_FAVORITES(data.id, callback));
        }

        SUCCESS('Remove from Favorites');
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR('Bad Request!');
        } else {
          ERROR('Network Error!');
        }
        callback();
      });
  };
};
export const USER_FAVORITES = (payload) => ({
  type: ActionList.FAVORITES,
  payload,
});

export const GET_FAVORITES = (id, callback) => {
  return async (dispatch) => {
    await API.get('/user/favorites/' + id)
      .then((res) => {
        dispatch(USER_FAVORITES(res.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.message);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};
