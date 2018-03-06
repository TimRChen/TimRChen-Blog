import _ from 'lodash'
import domains from './domains'
const addDomain = domain => path => domain + path
const { timDomain } = domains

const APIs = {
  GET_NEWS_LIST: '/api/extra/news',
  GET_QRCODE: '/api/extra/qrcode'
};

export default _.each(APIs, (path, key) => {
  APIs[key] = addDomain(timDomain)(path)
});
