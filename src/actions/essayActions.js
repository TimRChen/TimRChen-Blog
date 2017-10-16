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
      "essayId": essayInfo.essayId,
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
 * POST - 获取某页文章列表
 */
const getPage = function (nextPage) {
  return Vue.http.post(
    essayAPIs.POST_ESSAY_PAGE,
    {
      "nextPage": nextPage
    }
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
  );
};


/**
 * DELETE - 删除文章
 * @param {String} essayId - 文章Id
 */
const deleteEssay = function (essayId) {
  return Vue.http.delete(
    essayAPIs.DELETE_ESSAY,
    {
      "params": {
        "essayId": essayId
      }
    }
  );
};


export default ({
  newEssay,
  getEssayList,
  getPage,
  getEssayDetails,
  deleteEssay
});