import Vue from 'vue'
import extraAPIs from '../apis/extraAPIs'

/**
 * 获取新闻列表
 */
const getNewsList = function (token) {
  return Vue.http.get(
    extraAPIs.GET_NEWS_LIST
  );
};

export default ({
    getNewsList
});
