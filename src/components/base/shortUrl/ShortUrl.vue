<template>
  <div class="card-content">
    <div class="media">
      <h1 class="title is-4 is-dark">短链接服务</h1>
    </div>
    <div class="content">
      <p class="tag is-link">1.内容需要 2.用户友好 3.便于管理</p>
      <div class="field has-addons">
        <div class="control">
          <input class="input" type="text" placeholder="输入将要缩短的长网址" v-model="longUrl">
        </div>
        <div class="control">
          <a class="button" v-on:click="generateShortUrl">
            生成短链
          </a>
        </div>
      </div>
      <span class="tag is-dark show-short-url" v-show="shorUrl.length > 0">{{ shorUrl }}</span>
      <span class="tag is-warning">短链服务api为 <a href="http://suo.im/">http://suo.im/</a> 提供</span>
    </div>
  </div>
</template>
<script>
  /**
   * 短链生成 API
   * JSONP
   * request: queryString:  url=urlencode('输入链接');
   */
  const shortUrlAPI = 'http://suo.im/api.php?format=jsonp&url=';

  export default {
    data() {
      return {
        longUrl: '', // 输入长链接
        shorUrl: '' // 输出短链
      }
    },
    methods: {
      generateShortUrl: function () { // 生成短链接
        const _self = this;
        let longUrl = _self.longUrl;
        if (longUrl) {
          _self.$http.jsonp(
            shortUrlAPI + encodeURIComponent(longUrl), // encodeURIComponent可将 # 号进行编码，这样就能将 # 传入服务器中
            {
              jsonp: 'callback',
              jsonpCallback: 'jsonPCallback'
            }
          ).then((data) => {
            let url = data.body.url;
            let err = data.body.err;
            if (url) {
              _self.shorUrl = url;
              alert('短链接已生成，感谢使用服务!');
               _self.longUrl = '';
            } else if (err) {
              alert(err);
              _self.longUrl = '';
            }
          });
        } else {
          alert('请输入需要转换的链接!');
        }
      }
    }
  };
</script>
<style>

</style>
