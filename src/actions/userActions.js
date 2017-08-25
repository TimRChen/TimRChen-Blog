import Vue from 'vue';
import userAPIs from '../apis/userAPIs';


/**
 * 验证JWT是否有效
 */
const getAuth = function (token) {
  return Vue.http.get(
    userAPIs.GET_AUTH
  );
};

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
  getAuth,
  signUp,
  login
});