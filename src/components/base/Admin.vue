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
    <table class="table is-bordered is-striped is-narrow is-fullwidth">
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
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>前往编辑</td>
          <td>删除</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

  export default {
    data() {
      return {

      }
    },

    methods: {

    }
  };


</script>

<style>

  .admin-essay-list {
    margin-top: 5%;
  }



</style>