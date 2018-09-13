<template>
  <div class="extra-feature container">

    <div class="feature-box">
      <div class="card">

        <a v-on:click="opened = 'rssHub'">
          <div class="card" v-show="opened === 'normal'">
            <div class="card-content">
              <div class="media">
                <h1 class="title is-5">RSS订阅</h1>
              </div>
            </div>
          </div>
        </a>

        <a v-on:click="opened = 'oneArticle'">
          <div class="card" v-show="opened === 'normal'">
            <div class="card-content">
              <div class="media">
                <h1 class="title is-5">每日一文</h1>
              </div>
            </div>
          </div>
        </a>

        <a v-on:click="opened = 'morseCode'">
          <div class="card" v-show="opened === 'normal'">
            <div class="card-content">
              <div class="media">
                <h1 class="title is-5">摩斯电码加密工具</h1>
              </div>
            </div>
          </div>
        </a>

        <a v-on:click="opened = 'news'">
          <div class="card" v-show="opened === 'normal'">
            <div class="card-content">
              <div class="media">
                <h1 class="title is-5">新闻资讯</h1>
              </div>
            </div>
          </div>
        </a>

        <a v-on:click="opened = 'qrcode'">
          <div class="card" v-show="opened === 'normal'">
            <div class="card-content">
              <div class="media">
                <h1 class="title is-5">二维码生成工具</h1>
              </div>
            </div>
          </div>
        </a>

        <a v-on:click="opened = 'shortUrl'">
          <div class="card" v-show="opened === 'normal'">
            <div class="card-content">
              <div class="media">
                <h1 class="title is-5">短链接转换</h1>
              </div>
            </div>
          </div>
        </a>

        <a v-on:click="opened = 'robot'">
          <div class="card" v-show="opened === 'normal'">
            <div class="card-content">
              <div class="media">
                <h1 class="title is-5">聊天机器人</h1>
              </div>
            </div>
          </div>
        </a>

        <!-- 内容部分 -->
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
          <!-- RSSHub START -->
          <div class="rssHub" v-if="opened === 'rssHub'">
            <rss-hub></rss-hub>
          </div>
        </transition>

        <transition name="component-jump" mode="out-in">
          <!-- 每日一文 START -->
          <div class="oneArticle" v-if="opened === 'oneArticle'">
            <one-article></one-article>
          </div>
        </transition>

        <transition name="component-jump" mode="out-in">
          <!-- 摩斯电码加密/解密服务 START -->
          <div class="morseCode" v-if="opened === 'morseCode'">
            <morse-code></morse-code>
          </div>
        </transition>

        <transition name="component-jump" mode="out-in">
          <!-- 新闻资讯服务 START -->
          <div class="news" v-if="opened === 'news'">
            <news></news>
          </div>
        </transition>

        <transition name="component-jump" mode="out-in">
          <!-- 二维码生成工具 START -->
          <div class="qrcode" v-if="opened === 'qrcode'">
            <qrcode></qrcode>
          </div>
        </transition>

        <transition name="component-jump" mode="out-in">
          <!-- 短链接服务 START -->
          <div class="short-url" v-if="opened === 'shortUrl'">
            <short-url></short-url>
          </div>
        </transition>

        <transition name="component-jump" mode="out-in">
          <!-- ROBOT START -->
          <div class="robot" v-if="opened === 'robot'">
            <robot></robot>
          </div>
        </transition>

        <!-- 此处返回按钮是为了方便篇幅过长的应用 -->
        <a class="back-to-main" v-on:click="opened = 'normal'" v-show="opened === 'news' ||  opened === 'oneArticle' || opened === 'rssHub'">
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

    <section class="hero is-link">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            人生如若不去追求梦想，那还有什么意义呢？ {{ nowDate }}
          </h2>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
  import Moment from 'moment';

  import News from '@/components/base/news/News';
  import Robot from '@/components/base/robot/Robot';
  import Qrcode from '@/components/base/qrcode/Qrcode';
  import RssHub from '@/components/base/rssHub/RSSHub';
  import ShortUrl from '@/components/base/shortUrl/ShortUrl';
  import MorseCode from '@/components/base/morseCode/MorseCode';
  import OneArticle from '@/components/base/oneArticle/OneArticle';

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
      RssHub,
      ShortUrl,
      MorseCode,
      OneArticle,
    },
    computed: {
      nowDate: function () {
        return Moment(new Date()).format('YYYY年MM月DD日')
      }
    }
  };
</script>

<style scoped>

  .extra-feature {
    margin-top: 5%;
  }

  .feature-box {
    margin-bottom: 5%;
  }

  /* 竖屏 */
  @media screen and (max-width: 768px) {
    .extra-feature {
      margin-top: 0;
    }

    .feature-box {
      margin-bottom: 0;
    }
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