<template>
  <footer class="site-footer">
    <p class="copyright">Copyright © 2017 TimRChen</p>
    <div class="link-group">
      <span class="tag is-black">
        <a href="http://www.miitbeian.gov.cn/" target="_blank">京ICP备17058358号-1</a>
      </span>
      <span class="tag is-black">友情链接：<a href="https://m.kuaidi100.com/" target="_blank">快递查询</a></span>
    </div>
  </footer>
</template>

<script>
  export default {

  }
</script>

<style>
/* footer.pug */
  .site-footer {
    padding: 30px 0 0 0;
    font-family: exoregular;
    text-align: center;
    color: rgba(0,0,0,.44);
  }

  /* 竖屏 */
  @media screen and (orientation:portrait) and (max-width: 720px) {
    .site-footer {
      font-size: 14px;
      padding: 30px 0 0 0;
      font-family: exoregular;
      text-align: center;
      color: rgba(0,0,0,.44);
    }
  }

  .link-group {
    width: 100%;
    background-color: #000;
    margin-top: 30px;
  }

</style>
