import Vue from 'vue'
import extraAPIs from '../apis/extraAPIs'

/**
 * 获取新闻列表
 * request: {
 *   query: {
 *     type: 新闻类型
 *   }
 * }
 */
const getNewsList = function (type) {
  return Vue.http.get(
    `${extraAPIs.GET_NEWS_LIST}?type=${type}`
  )
}

/**
 * 生成二维码
 */
const getQrcode = function (textContent) {
  return Vue.http.get(
    `${extraAPIs.GET_QRCODE}?textContent=${textContent}`
  )
}

/**
 * 获取每日一文
 */
const getOneArticle = function () {
  return Vue.http.get(
    `${extraAPIs.GET_ONE_ARTICLE}`
  )
}

/**
 * 获取随机每日一文
 */
const getOneRandomArticle = function () {
  return Vue.http.get(
    `${extraAPIs.GET_ONE_ARTICLE}/random`
  )
}

/**
 * 获取RSSHub订阅内容
 */
const getRssReader = function (rssURI) {
  return Vue.http.post(
    `${extraAPIs.GET_RSS_READER}`,
    { rssURI }
  )
}

export default ({
  getRssReader,
  getNewsList,
  getQrcode,
  getOneArticle,
  getOneRandomArticle
})
