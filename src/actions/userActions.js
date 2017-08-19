import Vue from 'vue';
import userAPIs from '../apis/userAPIs';


/**
 * Login
 */
const login = function (username, password) {
  return Vue.http.post(
    userAPIs.POST_LOGIN(),
    {
        "username": username,
        "password": password
    }
  );
};

export default ({
  login
});