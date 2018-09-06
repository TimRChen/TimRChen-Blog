<template>
  <div id="main" class="content homepage">
    <div class="content-area container">
      <!-- 文章列表 -->
      <div class="site-content">
        <article
          class="post-item"
          v-for="(essay, key) in essayObj"
          v-bind:key="key">
          <router-link v-bind:to="{name: 'essay', params: {id: essay._id}}">
            <div class="post-image" v-bind:style="{ backgroundImage: `url(${ essay.picUrl })`,  backgroundSize: 'cover', backgroundPosition: '50%', backgroundAttachment: 'fixed' }">
              <div class="info-mask">
                <div class="mask-wrapper">
                  <h2 class="post-title">{{ essay.title }}</h2>
                  <div class="post-info">
                    <span class="post-time">
                      {{ new Date(essay.meta.createAt).toUTCString() }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </article>
      </div>

      <!-- 分页组件 -->
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <a class="pagination-previous" v-on:click="getPreviousPage">Previous</a>
        <a class="pagination-next" v-on:click="getNextPage">Next page</a>
        <ul class="pagination-list">
          <li v-for="(page, key) in totalPages" v-bind:key="key">
            <a
              class="pagination-link"
              v-bind:class="{ 'is-current': page === currentPage }"
              v-on:click="getPage(page)">
                {{ page }}
            </a>
          </li>
          <!-- <li><span class="pagination-ellipsis">&hellip;</span></li> -->
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  import essayActions from '../actions/essayActions';

  export default {
    data() {
      return {
        essayObj: {},
        totalPages: "", // 总页数
        currentPage: 1  // 记录当前点击页码
      }
    },
    beforeCreate: function () {
      const _self = this;

      // 获取文章列表
      essayActions.getEssayList().then(res => {
        if (res.status === 200) {
          let essaySum = res.body.essaySum;
          _self.essayObj = res.body.essays;
          _self.totalPages = Math.ceil(essaySum / 4);
        }
      }).catch(err => {
        console.error(err);
      });
    },
    mounted: function () {
      const lastPage = sessionStorage.getItem('lastPage');
      if (lastPage && Number(lastPage) !== 0) this.getPage(Number(lastPage));
    },
    methods: {
      /**
       * 获取页面列表函数
       * @argument choosePage 选择页码
       */
      getPage: function (choosePage) {
        const _self = this;

        sessionStorage.setItem('lastPage', choosePage); // 记录上次浏览页码
        window.scrollTo(0, 0); // 跳回顶部
        this.currentPage = choosePage; // 记录当前点击页码

        essayActions.getPage(choosePage).then(res => {
          let essaySum = res.body.essaySum;
          _self.essayObj = res.body.essays;
          _self.totalPages = Math.ceil(essaySum / 4); // 当新增文章时，更新总页数
        }).catch(err => {
          err.body.message ? alert(err.body.message) : console.error(err);
        });
      },
      getNextPage: function () {
        let currentPage = this.currentPage;
        let totalPages =  this.totalPages;
        let nextPage = (currentPage + 1) <= totalPages ? currentPage + 1 : totalPages;
        this.getPage(nextPage);
      },
      getPreviousPage: function () {
        let currentPage = this.currentPage;
        let nextPage = (currentPage - 1 > 0) ? currentPage - 1 : 1;
        this.getPage(nextPage);
      }
    }
  }
</script>

<style scoped>

  .container {
    max-width: 900px!important;
    margin-right: auto!important;
    margin-left: auto!important;
    width: 90%!important;
  }

  .post-item {
    position: relative;
    margin-bottom: 30px;
    background-color: #fff;
    box-shadow: 10px 10px 14px #888888;
    border-radius: 10px;
    overflow: hidden;
  }

  .post-image {
    display: block;
    height: 340px;
    position: relative;
  }

  .post-item .info-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: transparent -webkit-linear-gradient(top,transparent,rgba(0,0,0,.4)) repeat scroll 0 0;
    background: transparent linear-gradient(180deg,transparent 0,rgba(0,0,0,.4)) repeat scroll 0 0;
  }


  .info-mask {
    display: block;
    padding: 30px;
  }
  
  .post-item:hover .info-mask {
    background: transparent linear-gradient(180deg,transparent 0,rgba(0,0,0,.8)) repeat scroll 0 0;
  }

  .mask-wrapper {
    position: absolute;
    bottom: 10px;
    color: #fff;
    left: 20px;
    right: 20px;
  }

  .mask-wrapper .post-title {
    font-family: 'Lato', sans-serif;
    font-size: 36px;
    font-weight: 200;
    line-height: 1.4;
    color: #fff;
  }

  .post-item:hover .info-mask .mask-wrapper .post-title {
    color: greenyellow;
  }

  .mask-wrapper .post-info {
    font-size: 14px;
    font-family: exoregular;
  }
  

  .pagination-list li {
    list-style: none;
  }


</style>
