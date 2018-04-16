<template>
  <div class="admin-essay-list container">
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            在此对您的文章进行修改及查看访问量。
          </h2>
        </div>
      </div>
    </section>
    <br>
    <div class="main-content">
      <table class="table is-striped is-hoverable table-box">
        <thead>
          <tr>
            <th>标题</th>
            <th>创建时间</th>
            <th>内容概要</th>
            <th>访问量</th>
            <th>编辑</th>
            <th>删除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="essay in essayList" v-bind:key="essay._id">
            <td>
              <tr class="has-text-info essay-title">{{ essay.title }}</tr>
              <tr>
                <span class="tag">{{ essay._id.substr(-6, essay._id.length - 1) }}</span>
              </tr>
            </td>
            <td>{{ new Date(essay.meta.createAt).toLocaleDateString() }}</td>
            <td class="has-text-dark">
              <div class="content-abstract">{{ essay.content }}</div>
            </td>
            <td>
              <span class="tag is-warning">
                {{ essay.pv }}
              </span>
            </td>
            <td>
              <router-link to="/edit" v-on:click.native="editEssay(essay._id)">
                <button class="button is-focused is-info">编辑</button>
              </router-link>
            </td>
            <td>
              <button class="button is-danger is-outlined" v-bind:class="{ 'is-loading': deleteLoading }" v-on:click="deleteEssay(essay._id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

  import essayActions from '@/actions/essayActions';

  export default {
    data() {
      return {
        essayList: {},
        deleteLoading: false
      }
    },
    mounted: function () {
      const _self = this;
      // 获取文章列表
      essayActions.getAdminList().then(res => {
        const essays = res.body.essays
        // a > b return -1 | a < b return 1
        essays.sort((a, b) => a.meta.createAt > b.meta.createAt ? -1 : 1);
        _self.essayList = essays
      });
    },
    methods: {
      deleteEssay: function (essayId) {
        const _self = this;
        if (confirm('确定删除文章?')) {
          _self.deleteLoading = true; // 启用等待动画
          if (essayId) {
            essayActions.deleteEssay(essayId).then(res => {
              _self.essayList = _self.essayList.filter(essay => essay._id !== essayId);
              _self.deleteLoading = false; // 关闭等待动画
              console.log(res.body.message);
            }).catch(error => {
              _self.deleteLoading = false; // 关闭等待动画
              console.error(`Error:\n${error}`);
            });
          } else {
            _self.deleteLoading = false; // 关闭等待动画
            alert('Error: essayId not found.');
          }
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

<style scoped>

  .admin-essay-list {
    margin-top: 5%!important;
  }

  .main-content {
    overflow: auto;
  }

  .main-content .table-box {
    width: 100%;
  }

  .essay-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .content-abstract {
    width: 400px;
    max-height: 100px;
    display: inline-block;
    word-wrap: break-word;
    overflow: auto;
  }

</style>