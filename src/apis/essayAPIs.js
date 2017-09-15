import _ from 'lodash';
import domains from './domains';
const addDomain = domain => path => domain + path;
const { timDomain } = domains;

const APIs = {
  POST_NEW_ESSAY: '/api/essay/new', // 新建文章接口
  GET_ESSAY_LIST: '/api/essay/list', // 获取文章列表
  GET_ESSAY_DETAILS: '/api/essay/details', // 获取文章详细内容
};


export default _.each(APIs, (path, key) => {
  APIs[key] = addDomain(timDomain)(path);
});