<template>
  <div id="main" class="content homepage">

    <div class="content-area container">
      <div class="site-content">
        <article
          v-scroll-show        
          class="post-item "
          v-for="(essay, key) in essayObj"
          v-bind:key="key"
        >
          <div class="post-image" v-bind:style="{ backgroundImage: `url(${ essay.picUrl })`,  backgroundSize: 'cover', backgroundPosition: '50%' }">
            <div class="info-mask">
              <div class="mask-wrapper">

                <h2 class="post-title">
                  <router-link to="/essay" v-on:click.native="getEssayDetails(essay._id)" >{{ essay.title }}</router-link>
                </h2>

                <div class="post-info">
                  <span class="post-time">
                    发表于
                    {{ essay.meta.createAt }}
                  </span>
                </div>

              </div>
            </div>
          </div>
        </article>

      </div>
    </div>

  </div>
</template>

<script>

  import essayActions from '../actions/essayActions';
  import Bus from '../plugins/bus';

  export default {
    data() {
      return {
        essayObj: {}
      }
    },
    beforeCreate: function () {
      const _self = this;

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
        essayActions.getEssayDetails(essayId).then(res => {
          if (res.status === 200) {
            var essayDetails = res.body.essay;
            window.sessionStorage.setItem('essayId', essayId);
            // 触发get-essay-details事件
            Bus.$emit('get-essay-details', essayDetails, essayId);
          }
        }).catch(err => {
          console.error(err);
        });
      },

    },

    // 注册自定义指令 v-scroll-show 监听滚动条
    directives: {
        scrollShow: {
            bind: (el) => {
              window.addEventListener('scroll', () => {
                if (document.body.scrollTop > el.offsetTop) {
                  el.style.animation = 'comeIn 1s ease-in-out';
                }
              });
            },
            unbind: (el) => { // Todo: 目前组件销毁并不会 移除scroll监听事件
              window.removeEventListener('scroll', () => {
                console.log('remove scroll is done.')
              });
            }
        }
    }

  }
</script>

<style>

  /* 列表动画 */
  @keyframes comeIn {
    from {
      margin-left: 60%;
      filter: blur(20px);
    }
    to {
      margin-left: 0%;
    }
  }


  .site-content {
    padding-top: 50px;
  }

  .post-item {
    position: relative;
    margin-bottom: 30px;
    background-color: #fff;
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
    box-shadow: 10px 10px 5px #888888;
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
    line-height: 1.4;
    color: #fff;
  }

  .mask-wrapper .post-title a:hover {
    color: #bc403e;
  }

  .mask-wrapper .post-title a {
    color: inherit;
  }

  .mask-wrapper .post-info {
    font-size: 14px;
    font-family: exoregular;
  }
  

</style>
