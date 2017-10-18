<template>
  <footer class="site-footer clearfix u-textAlignCenter">
    <p class="copyright">Copyright © 2017 TimRChen - Just relax in here</p>
    <a href="http://www.miitbeian.gov.cn/" target="_blank">
      <span class="tag is-black">京ICP备17058358号-1</span>
    </a>
  </footer>
</template>

<script>
  export default {

  }
</script>

<style>
/* footer.pug */
  .site-footer {
    padding: 30px 0 30px 0;
    font-family: exoregular;
    color: rgba(0,0,0,.44);
  }
  .u-textAlignCenter {
    text-align: center;
  }

  .copyright {
    margin-bottom: 10px;
  }

  /* 竖屏 */
  @media screen and (orientation:portrait) and (max-width: 720px) {
    .site-footer {
      font-size: 14px;
      padding: 30px 0 30px 0;
      font-family: exoregular;
      color: rgba(0,0,0,.44);
    }
  }

</style>
