<template>
  <footer class="site-footer" v-once>
    <p class="copyright">Copyright © 2018 享受创造的快乐.</p>
    <div class="link-group">
      <span class="txt-box">
        <a href="http://www.miitbeian.gov.cn/" target="_blank">京ICP备17058358号-1</a>
      </span>
    </div>
  </footer>
</template>

<script>
  export default {

  }
</script>

<style scoped>
/* footer.pug */
  .site-footer {
    padding: 30px 0 0 0;
    font-family: exoregular;
    text-align: center;
    color: rgba(0,0,0,.44);
    border-bottom: 1px solid #e2e2e2;
  }

  .link-group {
    width: 100%;
    margin-top: 30px;
    height: 30px;
    line-height: 30px;
  }

  .txt-box {
    font-size: 12px;
  }
  .txt-box > a {
    color: #000;
  }

  /* 竖屏 */
  @media screen and (max-width: 768px) {
    .site-footer {
      font-size: 14px;
      padding: 30px 0 0 0;
      font-family: exoregular;
      text-align: center;
      color: rgba(0,0,0,.44);
      border-bottom: 1px solid #e2e2e2;
    }
  }

</style>
