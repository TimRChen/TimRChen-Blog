<template>
  <div class="admin-comment-list container">
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            您可以在此管理您的文章评论.
          </h2>
        </div>
      </div>
    </section>
    <br>
    <table class="table">
      <thead>
        <tr>
          <th>文章ID</th>
          <th>评论昵称</th>
          <th>评论内容</th>
          <th>创建时间</th>
          <th>删除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(comment, key) in commentList" v-bind:key="key">
          <td>
            <h6 class="title is-6">{{ comment.essayId.substr(-6, comment.essayId.length - 1) }}</h6>
          </td>
          <td>{{ comment.name }}</td>
          <td class="content-abstract has-text-info">{{ comment.content }}</td>
          <td>{{ new Date(comment.meta.createAt).toLocaleDateString() }}</td>
          <td>
            <button class="button is-info is-focused" v-bind:class="{ 'is-loading': deleteLoading }" v-on:click="deleteComment(comment._id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

  import commentActions from '@/actions/commentActions';

  export default {
    data() {
      return {
        commentList: [],
        deleteLoading: false
      }
    },
    mounted: function () {
      const _self = this;
      // 获取文章列表
      commentActions.getAdminList().then(res => {
        const comments = res.body.comments;
        // a > b return -1 | a < b return 1
        comments.sort((a, b) => a.meta.createAt > b.meta.createAt ? -1 : 1);
        _self.commentList = comments;
      });
    },
    methods: {
      deleteComment: function (commentId) {
        const _self = this;
        if (confirm('确定删除该条评论?')) {
          _self.deleteLoading = true; // 启用等待动画
          if (commentId) {
            commentActions.deleteComment(commentId).then(res => {
              _self.commentList = _self.commentList.filter(comment => comment._id !== commentId);
              _self.deleteLoading = false; // 关闭等待动画
              console.log(res.body.message);
            }).catch(error => {
              _self.deleteLoading = false; // 关闭等待动画
              console.error(`Error:\n${error}`);
            });
          } else {
            _self.deleteLoading = false; // 关闭等待动画
            alert('Error: commentId not found.');
          }
        }
      }
    }
  };


</script>

<style>

  .admin-comment-list {
    margin-top: 5%!important;
  }

  .content-abstract {
    width: 538px;
    display: -webkit-box;
    min-height: 100px;
    overflow: auto;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }


</style>