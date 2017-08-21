import Vue from 'vue';
import userAPIs from '../apis/userAPIs';


/**
 * JWT
 */
const getAuth = function () {
  return Vue.http.get(
    userAPIs.GET_AUTH
  );
};

/**
 * get UserInfo
 */
const getUserInfo = function () {
  return Vue.http.get(
    userAPIs.GET_USERINFO
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
  getUserInfo,
  signUp,
  login
});