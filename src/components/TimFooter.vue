<template>
  <footer class="site-footer clearfix u-textAlignCenter">
    Copyright © 2017 TimRChen - Just relax in here
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
