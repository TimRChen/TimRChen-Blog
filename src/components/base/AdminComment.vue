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
    <table class="table is-bordered">
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
          <td>{{ comment.essayId.substr(-6, comment.essayId.length - 1) }}</td>
          <td>{{ comment.name }}</td>
          <td class="content-abstract">{{ comment.content }}</td>
          <td>{{ new Date(comment.meta.createAt).toLocaleDateString() }}</td>
          <td>
            <button class="button is-danger" v-on:click="deleteComment(comment._id)">删除</button>
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
        commentList: []
      }
    },
    beforeCreate: function () {
      const _self = this;
      // 获取文章列表
      commentActions.getAdminList().then(res => _self.commentList = res.body.comments);
    },
    methods: {
      deleteComment: function (commentId) {
        const _self = this;
        if (commentId) {
          if (confirm('确定删除该条评论?')) {
            commentActions.deleteComment(commentId).then(res => {
              _self.commentList = _self.commentList.filter(comment => comment._id !== commentId);
              alert(res.body.message);
            });
          }
        } else {
          alert('Error: commentId not found.');
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