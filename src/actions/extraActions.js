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

/**
 * 生成二维码
 */
const getQrcode = function (textContent) {
  return Vue.http.get(
    `${extraAPIs.GET_QRCODE}?textContent=${textContent}`
  );
};


export default ({
    getNewsList,
    getQrcode
});
