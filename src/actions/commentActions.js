import Vue from 'vue'
import commentAPIs from '../apis/commentAPIs'

/**
 * GET - 获取评论列表
 */
const getCommentList = function (essayId) {
  return Vue.http.get(
    `${commentAPIs.GET_COMMENT_LIST}?essayId=${essayId}`
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

export default ({
  getCommentList,
  createComment
})
