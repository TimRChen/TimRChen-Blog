<template>

  <div class="container admin">
    <!-- 隐藏的表单域，用于存储文章的id -->
    <!-- <input type="hidden" name="_id" value="essay._id"> -->
    <br>
    <div class="field">
      <label class="essay-title-tip label">文章标题</label>
      <div class="control">
        <input type="text" class="essay-title input" placeholder="请输入文章标题" v-model="title" />
      </div>
    </div>
    <br>
    <div class="field">
      <label class="essay-content-tip label">内容区域</label>
      <div class="control">
        <textarea type="text" class="essay-content textarea" placeholder="请输入文章内容" v-model="content" />
      </div>
    </div>
    <br>
    <div class="field">
      <label class="upload-img label">文章图片</label>
      <div class="control">
        <input type="file" />
      </div>
    </div>
    <br>
    <div class="field">
      <button class="button" v-on:click="sendEssay()">发布文章</button>
    </div>
  </div>

</template>

<script>

  import essayActions from '../../actions/essayActions';


  export default {
    data() {
      return {
        title: "",
        content: "",
        picUrl: ""
      };
    },
    methods: {
      sendEssay: function () {
        const _self = this;
        let essayInfo = {
          title: _self.title,
          content: _self.content,
          picUrl: _self.picUrl
        };
        essayActions.newEssay(essayInfo).then(res => {
          debugger
        }).catch(err => {
          console.error(err);
        });
      }
    }
  };


</script>

<style>

</style>