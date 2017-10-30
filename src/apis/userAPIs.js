import _ from 'lodash'
import domains from './domains'
const addDomain = domain => path => domain + path
const { timDomain } = domains

const APIs = {
  GET_AUTH: '/api/auth',
  GET_LOGOUT: '/logout',
  POST_LOGIN: '/login',
  POST_SIGNUP: '/signup'
}

export default _.each(APIs, (path, key) => {
  APIs[key] = addDomain(timDomain)(path)
})
