import Vue from 'vue';
import essayAPIs from '../apis/essayAPIs';


const newEssay = function (essayInfo) {
  return Vue.http.get(
    essayAPIs.POST_NEW_ESSAY,
    {
      "title": essayInfo.title,
      "content": essayInfo.content,
      "picUrl": essayInfo.picUrl
    }
  );
};


export default ({
  newEssay
});