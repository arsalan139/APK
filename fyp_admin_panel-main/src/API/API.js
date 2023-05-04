import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4000/api/',
  headers: {
    'x-auth-token': window.localStorage.getItem('Token')
      ? window.localStorage.getItem('Token')
      : null,
  },
});
