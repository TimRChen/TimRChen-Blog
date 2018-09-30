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
            <div class="post-image" v-bind:style="{ backgroundImage: `url(${ essay.picUrl })`,  backgroundSize: 'cover', backgroundPosition: '50%' }">
              <div class="info-mask">
                <div class="mask-wrapper">
                  <h2 class="post-title">{{ essay.title }}</h2>
                  <div class="post-info">
                    <span class="post-time">
                      {{ formatTime(essay.meta.createAt) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </article>
      </div>

      <!-- 分页组件 -->
      <nav class="pagination is-centered is-rounded is-small" role="navigation" aria-label="pagination">
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
  import Moment from 'moment';

  export default {
    data() {
      return {
        essayObj: {},
        totalPages: "", // 总页数
        currentPage: 1  // 记录当前点击页码
      }
    },
    beforeCreate: function () {
      // 获取文章列表
      essayActions.getEssayList().then(res => {
        if (res.status === 200) {
          let essaySum = res.body.essaySum;
          this.essayObj = res.body.essays;
          this.totalPages = Math.ceil(essaySum / 4);
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
       * 格式化发布时间
       */
      formatTime: function (time) {
        return Moment(time, Moment.ISO_8601).format('dd. YYYY.MM.DD HH:MM');
      },
      /**
       * 获取页面列表函数
       * @argument choosePage 选择页码
       */
      getPage: function (choosePage) {
        sessionStorage.setItem('lastPage', choosePage); // 记录上次浏览页码
        window.scrollTo(0, 0); // 跳回顶部
        this.currentPage = choosePage; // 记录当前点击页码
        essayActions.getPage(choosePage).then(res => {
          const essaySum = res.body.essaySum;
          this.essayObj = res.body.essays;
          this.totalPages = Math.ceil(essaySum / 6); // 当新增文章时，更新总页数
        }).catch(err => {
          err.body.message ? alert(err.body.message) : console.error(err);
        });
      },
      getNextPage: function () {
        const currentPage = this.currentPage;
        const totalPages =  this.totalPages;
        const nextPage = (currentPage + 1) <= totalPages ? currentPage + 1 : totalPages;
        this.getPage(nextPage);
      },
      getPreviousPage: function () {
        const currentPage = this.currentPage;
        const nextPage = (currentPage - 1 > 0) ? currentPage - 1 : 1;
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
    background-color: #fff;
    box-shadow: 10px 10px 14px #888888;
    margin-bottom: 30px;
    border-radius: 10px;
    overflow: hidden;
    height: 340px;
  }

  @media screen and (min-width: 768px) {
    .site-content {
      display: flex;
      flex-flow: wrap;
    }
    .post-item {
      width: 28%;
      height: 300px;
      transform: skew(-2deg);
      margin: 10px 2.5% 80px;
      box-shadow: 0 10px 20px #888888;
    }
    .post-item:hover {
      animation: scaleBoom 2s ease-in-out infinite;
    }
    @keyframes scaleBoom {
      0% {
        transform: skew(-2deg) scale(1, 1);
      }
      50% {
        transform: skew(-2deg) scale(.9, .9);
      }
      100% {
        transform: skew(-2deg) scale(1, 1);
      }
    }
  }

  .post-image {
    height: 100%;
    display: block;
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
