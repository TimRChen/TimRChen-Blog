import Vue from 'vue';
import userAPIs from '../apis/userAPIs';

/**
 * Signup
 */
const signUp = function (username, password) {
  return Vue.http.post(
    userAPIs.POST_SIGNUP,
    {
        "username": username,
        "password": password
    }
  );
};


/**
 * Login
 */
const login = function (username, password) {
  return Vue.http.post(
    userAPIs.POST_LOGIN,
    {
        "username": username,
        "password": password
    }
  );
};

export default ({
  signUp,
  login
});