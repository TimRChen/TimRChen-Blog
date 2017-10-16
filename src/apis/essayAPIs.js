import _ from 'lodash';
import domains from './domains';
const addDomain = domain => path => domain + path;
const { timDomain } = domains;

const APIs = {
  POST_NEW_ESSAY: '/api/essay/new', // 新建文章接口
  GET_ESSAY_LIST: '/api/essay/list', // 初始化文章首页列表
  POST_ESSAY_PAGE: '/api/essay/page', // 获取某一页文章列表
  GET_ESSAY_DETAILS: '/api/essay/details', // 获取文章详细内容
  DELETE_ESSAY: '/api/essay/delete', // 删除文章
};


export default _.each(APIs, (path, key) => {
  APIs[key] = addDomain(timDomain)(path);
});