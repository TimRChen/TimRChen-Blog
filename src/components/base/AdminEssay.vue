<template>
  <div class="admin-essay-list container">
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            您可以在此对您的文章进行修改及查看访问量，甚至可以更改文章banner图片资源
          </h2>
        </div>
      </div>
    </section>
    <br>
    <table class="table is-bordered">
      <thead>
        <tr>
          <th>标题</th>
          <th>内容概要</th>
          <th>创建时间</th>
          <th>编辑</th>
          <th>删除</th>
          <th>访问量</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(essay, key) in essayList"
          v-bind:key="key"
        >
          <td>{{ essay.title }}</td>
          <td class="content-abstract">{{ essay.content }}</td>
          <td>{{ new Date(essay.meta.createAt).toLocaleDateString() }}</td>
          <td>
            <router-link to="/edit" v-on:click.native="editEssay(essay._id)">编辑</router-link>
          </td>
          <td>
            <button class="button is-danger" v-on:click="deleteEssay(essay._id)">删除</button>
          </td>
          <td>
            <span class="tag is-success is-medium">
              {{ essay.pv }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

  import essayActions from '@/actions/essayActions';

  export default {
    data() {
      return {
        essayList: {}
      }
    },
    beforeCreate: function () {
      const _self = this;
      // 获取文章列表
      essayActions.getAdminList().then(res => _self.essayList = res.body.essays);
    },
    methods: {
      deleteEssay: function (essayId) {
        const _self = this;

        if (essayId) {
          if (confirm('确定删除文章?')) {
            essayActions.deleteEssay(essayId).then(res => {
              _self.essayList = _self.essayList.filter(essay => essay._id !== essayId);
              alert(res.body.message);
            });
          }
        } else {
          alert('Error: essayId not found.')
        }

      },
      editEssay: function (essayId) {
        const _self = this;
        window.sessionStorage.removeItem('essayId');
        window.sessionStorage.setItem('essayId', essayId);
      }
    }
  };


</script>

<style>

  .admin-essay-list {
    margin-top: 5%!important;
  }

  .content-abstract {
    width: 100%;
    display: -webkit-box;
    min-height: 100px;
    overflow: auto;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
  }


</style>