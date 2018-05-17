import Vue from 'vue'
import commentAPIs from '../apis/commentAPIs'

/**
 * GET - 获取文章评论列表
 */
const getCommentList = function (essayId) {
  return Vue.http.get(
    `${commentAPIs.GET_COMMENT_LIST}?essayId=${essayId}`
  )
}

/**
 * GET - 获取后台评论列表
 */
const getAdminList = function () {
  return Vue.http.get(
    commentAPIs.GET_ADMIN_LIST
  )
}

/**
 * POST
 * @param {Object} commentInfo - 评论信息
 */
const createComment = function (commentInfo) {
  return Vue.http.post(
    commentAPIs.POST_CREATE_COMMENT,
    {
      'essayId': commentInfo.essayId,
      'name': commentInfo.name,
      'content': commentInfo.content
    }
  )
}

/**
 * DELETE - 删除评论
 * @param {String} commentId - 评论Id
 */
const deleteComment = function (commentId) {
  return Vue.http.delete(
    commentAPIs.DELETE_COMMENT,
    {
      'params': {
        'commentId': commentId
      }
    }
  )
}

export default ({
  getCommentList,
  getAdminList,
  createComment,
  deleteComment
})
