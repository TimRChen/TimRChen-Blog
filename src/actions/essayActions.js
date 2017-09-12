import Vue from 'vue';
import essayAPIs from '../apis/essayAPIs';

/**
 * POST
 * @param {Object} essayInfo - 文章信息
 */
const newEssay = function (essayInfo) {
  return Vue.http.post(
    essayAPIs.POST_NEW_ESSAY,
    {
      "title": essayInfo.title,
      "content": essayInfo.content,
      "picUrl": essayInfo.picUrl
    }
  );
};


/**
 * GET - 获取文章列表
 */
const getEssayList = function () {
  return Vue.http.get(
    essayAPIs.GET_ESSAY_LIST
  );
};


/**
 * GET - 获取文章详细内容
 * @param {String} essayId - 文章Id
 */
const getEssayDetails = function (essayId) {
  return Vue.http.get(
    essayAPIs.GET_ESSAY_DETAILS,
    {
      "params": {
        "essayId": essayId
      }
    }
  )

}

 


export default ({
  newEssay,
  getEssayList,
  getEssayDetails
});