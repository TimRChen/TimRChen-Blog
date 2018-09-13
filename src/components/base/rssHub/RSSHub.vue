<template>
  <div class="card-content">
    <div class="media">
      <h1 class="title is-4 is-dark">RSS订阅</h1>
    </div>

    <div class="content">
      <p class="tag is-dark">看你想看</p>

      <div class="tabs is-small">
        <ul>
          <li :class="{ 'is-active': rssType === '知乎日报' }" @click="rssType = '知乎日报'"><a>知乎日报</a></li>
          <li :class="{ 'is-active': rssType === '知乎热点' }" @click="rssType = '知乎热点'"><a>知乎热点</a></li>
          <li :class="{ 'is-active': rssType === '掘金' }" @click="rssType = '掘金'"><a>掘金</a></li>
          <li :class="{ 'is-active': rssType === '今日头条' }" @click="rssType = '今日头条'"><a>今日头条</a></li>
        </ul>
      </div>

      <div class="loading-txt" v-if="loading && loadStatus === 'success'">加载中...</div>

      <div class="loading-txt" v-if="loadStatus === 'failed'">加载失败，请刷新页面重试</div>

      <div class="article-area" v-if="!loading">

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
                <div class="content timrchen-diy-content" v-html="article.description"></div>
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
        loading: true,
        loadStatus: 'success', // success | failed
        watchInSite: '',
        rssType: '今日头条', // 知乎日报 | 掘金 | 知乎热点 | 今日头条
        articleList: []
      }
    },
    mounted () {
      const rssURI = '/readhub/category/topic';
      extraActions.getRssReader(rssURI).then(res => {
        this.articleList = res.body;
        this.loading = false;
      }).catch(error => {
        console.error(error);
        this.loadStatus = 'failed';
      });
    },
    watch: {
      rssType () {
        this.loading = true;
        this.changeContent();
      }
    },
    methods: {
      changeContent () {
        const rssURIMap = {
          '知乎日报': '/zhihu/daily',
          '知乎热点': 'zhihu/hotlist',
          '掘金': '/juejin/category/frontend',
          '今日头条': '/readhub/category/topic'
        };
        const rssURI = rssURIMap[this.rssType];
        extraActions.getRssReader(rssURI).then(res => {
          this.articleList = res.body;
          this.loading = false;
        }).catch(error => {
          console.error(error);
          this.loadStatus = 'failed';
        });
      },
      deleteImg (str) {
        return str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, '');
      },
      digest (str) {
        str = this.deleteImg(str);
        const divReg = /\<div[^\>]+\>[\r\n.]*\<\/div\>/gi;
        if (divReg.test(str)) str = str.replace(divReg, '');
        return `${str.slice(0, 150)}...`;
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
