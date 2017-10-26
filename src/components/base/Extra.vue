<template>
  <div class="extra-feature container">
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            额外的一些小功能，辛苦开发，不打算试试啊？~
          </h2>
        </div>
      </div>
    </section>

    <div class="long-to-short">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <h1 class="title is-4 tag is-dark">短链接服务</h1>
          </div>
          <div class="content">
            <p class="tag is-link">1.内容需要 2.用户友好 3.便于管理</p>            
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="text" placeholder="输入将要缩短的长网址" v-model="longUrl">
              </div>
              <div class="control">
                <a class="button is-info" v-on:click="makeShortUrl">
                  生成短链
                </a>
              </div>
            </div>
            <div class="show-short-url">{{ shorUrl }}</div>
            <span class="tag is-dark">该短链服务api由 <a href="http://suo.im/">http://suo.im/</a> 提供</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import Vue from 'vue';

  /**
   * 短链生成 API
   * request: queryString:  url=urlencode('输入链接');
   */
  // const shortUrlAPI = 'http://suo.im/api.php?url=';
  const shortUrlAPI = 'http://6du.in/?is_api=1&lurl=';


  export default {
    data() {
      return {
        longUrl: '', // 输入长链接
        shorUrl: '', // 输出短链
      }
    },
    methods: {
      makeShortUrl: function () {
        const _self = this;
        let longUrl = _self.longUrl;
        _self.generateShortUrl(longUrl).then(res => {
          debugger
        });
      },
      generateShortUrl: function (longUrl) {
        const _self = this;
        if (longUrl) {
          return Vue.http.get(
            `${shortUrlAPI}${longUrl}`
          );
        }
      }
    }
  };
</script>

<style>

  .extra-feature {
    margin-top: 5%!important;
  }

  .long-to-short {
    margin-top: 10px;
  }


</style>