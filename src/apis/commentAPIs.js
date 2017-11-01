import _ from 'lodash'
import domains from './domains'
const addDomain = domain => path => domain + path
const { timDomain } = domains

const APIs = {
  GET_COMMENT_LIST: '/api/comment/list',
  POST_CREATE_COMMENT: '/api/comment/create'
}

export default _.each(APIs, (path, key) => {
  APIs[key] = addDomain(timDomain)(path)
})
