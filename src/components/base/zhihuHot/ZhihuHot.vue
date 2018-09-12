<template>
  <div class="card-content">
    <div class="media">
      <h1 class="title is-4 is-dark">知乎日报</h1>
    </div>

    <div class="content">
      <p class="tag is-dark">RSS订阅</p>

      <div class="loading-txt" v-if="!loading">加载中...</div>

      <div class="article-area" v-if="loading">

        <div class="card timrchen-diy-card" v-for="article in articleList" :key="article.title">
          <header class="card-header">
            <p class="card-header-title">{{ article.title }}</p>
          </header>
          <div class="card-content" v-html="digest(article.description)"></div>
          <footer class="card-footer">
            <a href="javascript: void(0);" class="card-footer-item" @click="watchInSite = article.title">点击查看全文</a>
          </footer>
          <div class="modal" v-if="watchInSite === article.title" :class="{ 'is-active' : watchInSite === article.title }">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <h1 class="title is-4">{{ article.title }}</h1>
              </header>
              <section class="modal-card-body">
                <div class="content is-small timrchen-diy-content" v-html="deleteImg(article.description)"></div>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-dark" @click="watchInSite = null">关闭</button>
              </footer>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
  import extraActions from '@/actions/extraActions'

  export default {
    data () {
      return {
        loading: false,
        watchInSite: '',
        articleList: []
      }
    },
    mounted () {
      const rssURI = '/zhihu/hotlist';
      extraActions.getRssReader(rssURI).then(res => {
        this.articleList = res.body;
        this.loading = true;
      }).catch(error => {
        console.error(error);
      });
    },
    methods: {
      deleteImg (str) {
        return str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, '');
      },
      digest (str) {
        str = this.deleteImg(str);
        return `${str.slice(0, 50)}...`;
      }
    }
  }

</script>

<style scoped>

.article-card button {
  margin: 10px auto;
}

.timrchen-diy-card {
  margin: 20px auto;
}

.timrchen-diy-content {
  overflow: hidden;
}

</style>
