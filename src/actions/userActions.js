import Vue from 'vue'
import userAPIs from '../apis/userAPIs'

/**
 * 验证JWT是否有效
 */
const getAuth = function (token) {
  return Vue.http.get(
    userAPIs.GET_AUTH
  )
}

/**
 * Logout
 */
const logout = function () {
  return Vue.http.get(
    userAPIs.GET_LOGOUT
  )
}

/**
 * Signup
 */
// const signUp = function (username, password) {
//   return Vue.http.post(
//     userAPIs.POST_SIGNUP,
//     {
//       'username': username,
//       'password': password,
//       'secretOrPrivateKey': 'timrchenqian'
//     }
//   )
// }

/**
 * Login
 */
const login = function (username, password) {
  return Vue.http.post(
    userAPIs.POST_LOGIN,
    {
      'username': username,
      'password': password
    }
  )
}

export default ({
  getAuth,
  logout,
  // signUp,
  login
})
