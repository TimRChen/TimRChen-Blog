import _ from 'lodash'
import domains from './domains'
const addDomain = domain => path => domain + path

const APIs = {
  GET_COMMENT_LIST: '/api/comment/list', // 获取文章评论列表
  GET_ADMIN_LIST: '/api/comment/admin/list', // 获取评论后台列表
  POST_CREATE_COMMENT: '/api/comment/create', // 发表评论
  DELETE_COMMENT: '/api/comment/delete' // 删除评论
}

export default _.each(APIs, (path, key) => {
  APIs[key] = addDomain(domains)(path)
})
