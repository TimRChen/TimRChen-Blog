<template>
  <header id="header" class="banner-mask">
    <div id="barbg">
      <!-- 进度条 -->
      <div id="bar"></div>
    </div>

    <!-- 导航栏 -->
    <div class="nav-header container">
      <div class="nav-header-container">
        <!-- route 1 -->
        <a href="/" class="back-home">Home</a>
      </div>
    </div>

    <!-- 大标题 -->
    <div class="header-wrap">
      <div class="container">
        <div class="home-info-container">
          <a href="/">
            <h2>TimRChen</h2>
          </a>
          <h3>Life is Art.</h3>
        </div>
      </div>
    </div>

  </header>
</template>

<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>

<style>

  .banner-mask {
    background: url('../assets/banner.jpeg');
    background-position: 50%;
    background-size: cover;
    position: relative;
    padding: 20px 0;
    height: 360px;
  }

  .banner-mask:before {
    position: absolute;
    background-color: rgba(0,0,0,.15);
    content: "";
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  /* #barbg {
    position: absolute;
    top: 0px;
    height: 5px;
    background: rgb(224,224,224);
  } */

  /* #barbg #bar {
    width: 0px;
    height: 5px;
    background: rgb(245,0,87);
  } */

  .container {
    max-width: 900px;
    margin-right: auto;
    margin-left: auto;
    width: 90%;
  }
  .nav-header {
    padding-top: 30px;
    font-family: exoregular;
    position: relative;
  }
  .nav-header .nav-header-container a {
    display: inline-block;
    border: 1px solid hsla(0, 0%, 100%, .8);
    color: hsla(0,0%,100%,.8);
    font-size: 14px;
    padding: 3px 12px;
    border-radius: 3px;
    margin-right: 8px;
    text-decoration: none;
  }
  /* .nav-header .nav-header-container .dropdown-menu, .nav-header .nav-header-container .dropdown-menu a{
    color: #000;
  }
  .nav-header .nav-header-container .dropdown-menu, .nav-header .nav-header-container .dropdown-menu a:hover {
    color: #000;
  } */
  .nav-header .nav-header-container a:hover {
    color: #fff;
    border-color: #fff;
  }

  /* .nav-header .nav-header-container .login {
    position: absolute;
    right: 0px;
  } */

  /* .nav-header .nav-header-container .tips {
    position: absolute;
    right: 110px;
    color: #fff;
    font-size: 16px;
  } */

  /* .nav-header .nav-header-container .signUp {
    position: absolute;
    right: 80px;
  }

  .nav-header .nav-header-container .logout {
    position: absolute;
    right: 0px;
  } */

  .header-wrap {
    position: relative;
    /*text-align: center;*/
    color: #fff;
    font-family: exoregular;
  }
  .home-info-container a {
    color: inherit;
  }
  .home-info-container a:hover {
    color:#fff;
  }
  .header-wrap h2 {
    font-size: 42px;
    margin-top: 130px;
  }

</style>
