<template>
  <div id="main" class="content homepage">

    <div class="content-area container">
      <div class="site-content">
        <article
          class="post-item"
          v-scroll-show        
          v-for="(essay, key) in essayObj"
          v-bind:key="key"
          v-bind:class="{'scrollAnimate': scrollListen}"
        >
          <router-link to="/essay" v-on:click.native="getEssayDetails(essay._id)" >
            <div class="post-image" v-bind:style="{ backgroundImage: `url(${ essay.picUrl })`,  backgroundSize: 'cover', backgroundPosition: '50%' }">
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
    </div>

  </div>
</template>

<script>

  import essayActions from '../actions/essayActions';

  const ctx = '@@ctx'; // 用于标记el元素的key值

  let component; // 申请 component 变量用于存储 组件 this 变量

  export default {
    data() {
      return {
        scrollListen: false,
        essayObj: {}
      }
    },
    beforeCreate: function () {
      const _self = this;
      component = this;

      // 获取文章列表
      essayActions.getEssayList().then(res => {
        if (res.status === 200) {
          _self.essayObj = res.body.essays;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    methods: {
      // 获取文章详细信息
      getEssayDetails: function (essayId) {
        const _self = this;
        window.sessionStorage.removeItem('essayId');
        window.sessionStorage.setItem('essayId', essayId);
      },

    },

    // 注册自定义指令 v-scroll-show 监听滚动条
    directives: {
        scrollShow: {
            bind: (el) => {
              let listenScroll = function (e) {
                if (document.body.scrollTop + 340 > el.offsetTop && component.scrollListen === false) {
                  console.log('listening Scroll...');
                  component.scrollListen = true;
                }
              }

              el[ctx] = {
                listenScroll
              };

              window.addEventListener('scroll', listenScroll);
            },
            unbind: (el) => { // 移除scroll监听事件
              window.removeEventListener('scroll', el[ctx].listenScroll);
              component = null; // 释放 component 变量
            }
        }
    }

  }
</script>

<style>

  /* 列表动画 */
  @keyframes comeIn {
    from {
      /* margin-left: 10%; */
      /* filter: blur(20px); */
      opacity: 0.4;
      transform: translate3d(100px, 0, 0);
    }
    to {
      /* margin-left: 0%; */
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .scrollAnimate {
    animation: comeIn .5s ease-in-out;
  }

  .container {
    max-width: 900px!important;
    margin-right: auto!important;
    margin-left: auto!important;
    width: 90%!important;
  }


  .site-content {
    padding-top: 50px;
  }

  .post-item {
    position: relative;
    margin-bottom: 30px;
    background-color: #fff;
    box-shadow: 10px 10px 14px #888888;
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
    background: transparent -webkit-linear-gradient(top,transparent,rgba(0,0,0,.8)) repeat scroll 0 0;
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
    font-size: 36px;
    font-weight: 200!important;
    line-height: 1.4;
    color: #fff;
  }

  .post-item:hover .info-mask .mask-wrapper .post-title {
    color: #bc403e;
  }

  .mask-wrapper .post-title {
    color: inherit;
  }

  .mask-wrapper .post-info {
    font-size: 14px;
    font-family: exoregular;
  }
  

</style>
