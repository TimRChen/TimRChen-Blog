<template>
  <div class="extra-feature container">
    <section class="hero is-info is-warning">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            新的一天！{{ nowDate }}
          </h2>
        </div>
      </div>
    </section>

    <div class="feature-box">
      <div class="card">
        <!-- 1 -->
        <a v-on:click="opened = 'news'">
          <div class="card" v-show="opened === 'normal'">
            <div class="card-content">
              <div class="media">
                <h1 class="title is-5">军事新闻资讯</h1>
              </div>
            </div>
          </div>
        </a>
        <!-- 2 -->
        <a v-on:click="opened = 'qrcode'">
          <div class="card" v-show="opened === 'normal'">
            <div class="card-content">
              <div class="media">
                <h1 class="title is-5">二维码生成工具</h1>
              </div>
            </div>
          </div>
        </a>
        <!-- 3 -->
        <a v-on:click="opened = 'shortUrl'">
          <div class="card" v-show="opened === 'normal'">
            <div class="card-content">
              <div class="media">
                <h1 class="title is-5">短链接转换</h1>
              </div>
            </div>
          </div>
        </a>
        <!-- 4 -->
        <a v-on:click="opened = 'robot'">
          <div class="card" v-show="opened === 'normal'">
            <div class="card-content">
              <div class="media">
                <h1 class="title is-5">聊天机器人</h1>
              </div>
            </div>
          </div>
        </a>

        <a class="back-to-main" v-on:click="opened = 'normal'">
          <div class="card" v-show="opened !== 'normal'">
            <div class="card-content">
              <div class="media">
                <h1 class="title is-5">点击此处进行返回</h1>
              </div>
            </div>
          </div>
        </a>

        <transition name="component-jump" mode="out-in">
          <!-- 新闻资讯服务 START -->
          <div class="news" v-show="opened === 'news'">
            <news></news>
          </div>
        </transition>

        <transition name="component-jump" mode="out-in">
          <!-- 二维码生成工具 START -->
          <div class="qrcode" v-show="opened === 'qrcode'">
            <qrcode></qrcode>
          </div>
        </transition>

        <transition name="component-jump" mode="out-in">
          <!-- 短链接服务 START -->
          <div class="short-url" v-show="opened === 'shortUrl'">
            <short-url></short-url>
          </div>
        </transition>

        <transition name="component-jump" mode="out-in">
          <!-- ROBOT START -->
          <div class="robot" v-show="opened === 'robot'">
            <robot></robot>
          </div>
        </transition>

        <!-- 此处返回按钮是为了方便篇幅过长的应用 -->
        <a class="back-to-main" v-on:click="opened = 'normal'" v-show="opened !== 'normal' && opened !== 'shortUrl' && opened !== 'qrcode'">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <h1 class="title is-5">点击此处进行返回</h1>
              </div>
            </div>
          </div>
        </a>

      </div>
    </div>

  </div>
</template>

<script>
  import Moment from 'moment';

  import News from '@/components/base/news/News';
  import Robot from '@/components/base/robot/Robot';
  import Qrcode from '@/components/base/qrcode/Qrcode';
  import ShortUrl from '@/components/base/shortUrl/ShortUrl';

  export default {
    data() {
      return {
        opened: 'normal' // 打开状态
      }
    },
    components: {
      News,
      Robot,
      Qrcode,
      ShortUrl
    },
    computed: {
      nowDate: function () {
        return Moment(new Date()).format('YYYY年MM月DD日')
      }
    }
  };
</script>

<style>

  .extra-feature {
    margin-top: 5%!important;
  }

  .feature-box {
    margin-top: 10px;
  }

  /* Vue 多组件切换过渡动画 */
  .component-jump-enter-active, .component-jump-leave-active {
    transition: opacity .3s ease-in;
  }
  .component-jump-enter, .component-jump-leave-to
  /* .component-jump-leave-active for below version 2.1.8 */ {
    opacity: 0;
    /* transform: scale(2, 2) */
  }


</style>