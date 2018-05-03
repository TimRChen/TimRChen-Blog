<template>
  <header id="header" class="banner-mask" v-bind:style="bannerStyle">

    <!-- 导航栏 -->
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="http://www.timrchen.site">
          <img src="http://p55j3yvgo.bkt.clouddn.com/logo/timrchen_logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" v-bind:class="{ 'is-active': dropDownStatus && dropDownDevice === 'mobile' }" v-on:click="clickDropdown('mobile')">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <transition name="component-jump" mode="out-in">
        <div class="navbar-item" v-show="dropDownStatus && dropDownDevice === 'mobile'">
          <div class="navbar-dropdown">
            <a class="navbar-item" href="#/" v-on:click="dropDownStatus = false">主页</a>
            <a class="navbar-item" href="#/about" v-on:click="dropDownStatus = false">关于我</a>
            <a class="navbar-item" href="#/extra" v-on:click="dropDownStatus = false">有趣的应用</a>
            <a class="navbar-item" v-on:click="scrollToTop(2000); dropDownStatus = false">返回顶部</a>
          </div>
        </div>
      </transition>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href="#/">Home</a>
          <a class="navbar-item" href="#/about">About</a>
          <a class="navbar-item" href="#/extra">Extra</a>
          <div class="navbar-item has-dropdown" v-if="loginStatus === 'logged'" v-bind:class="{ 'is-active': dropDownStatus && dropDownDevice === 'pc' }" v-on:click="clickDropdown('pc')">
            <a class="navbar-link">Dashboard</a>
            <div class="navbar-dropdown">
              <a class="navbar-item" href="#/edit">Edit</a>
              <a class="navbar-item" href="#/admin-essay">Essay</a>
              <a class="navbar-item" href="#/admin-comment">Comment</a>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <a class="navbar-item" v-on:click="showLoginModal = true" v-if="loginStatus === 'noLogged'">Login</a>
          <a class="navbar-item" v-on:click="logout()" v-if="loginStatus === 'logged'">Logout</a>
        </div>
      </div>
    </nav>

    <!-- login modal -->
    <div class="modal" v-bind:class="{ 'is-active': showLoginModal === true }">
      <div class="modal-background" v-on:click="showLoginModal = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Login</p>
          <button class="delete" aria-label="close" v-on:click="showLoginModal = false"></button>
        </header>
        <section class="modal-card-body">

          <div class="filed has-text-danger" v-show="inputMissThree">👁👁请注意，输入超过3次错误禁止输入!</div>

          <!-- username -->
          <div class="field" v-show="!inputMissThree">
            <label class="label">Hi, guys.</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input is-dark" type="text" v-model="username" autofocus v-bind:disabled="inputMissThree">
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fa fa-check"></i>
              </span>
            </div>
          </div>

          <!-- password -->
          <div class="field" v-show="!inputMissThree">
            <label class="label">Big brother is watching you.</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input is-dark" type="password" name="password" v-model="password" v-on:keyup.enter="login" v-bind:disabled="inputMissThree">
              <span class="icon is-small is-left">
                <i class="fa fa-key"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fa fa-check"></i>
              </span>
            </div>
          </div>

        </section>
        <footer class="modal-card-foot">
          <button class="button is-focus is-dark" v-on:click="login">Login</button>
          <button class="button is-focus" v-on:click="showLoginModal = false">Cancel</button>
        </footer>
      </div>
    </div>

    <!-- 大标题 -->
    <div class="header-wrap">
      <div class="home-info-container">
        <div class="foo">
          <div class="letter" v-bind:data-letter="bannerTitle">{{ bannerTitle }}</div>
          <br>
          <div class="letter subtitle-letter" v-bind:data-letter="bannerSubtitle">{{ bannerSubtitle }}</div>
        </div>
      </div>
    </div>

    <!-- 返回顶部 -->
    <div class="return-top-btn" v-once>
      <button class="button is-outlined is-black" v-on:click="scrollToTop(1000)">TOP</button>
    </div>

    <!-- signUp modal TODO: 注册完后需要将相关注册逻辑隐藏!!! -->
    <!-- <div class="modal" v-bind:class="{'is-active': showSignUpModal === true}">
      <div class="modal-background" v-on:click="showSignUpModal = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">signUp</p>
          <button class="delete" aria-label="close" v-on:click="showSignUpModal = false"></button>
        </header>
        <section class="modal-card-body">

          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input" type="text" v-model="username" autofocus>
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fa fa-check"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input" type="password" name="password" v-model="password">
              <span class="icon is-small is-left">
                <i class="fa fa-key"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fa fa-check"></i>
              </span>
            </div>
          </div>

        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" v-on:click="signUp()">signUp</button>
          <button class="button" v-on:click="showSignUpModal = false">Cancel</button>
        </footer>
      </div>
    </div> -->

  </header>
</template>

<script>
  import Bus from '../plugins/bus';
  import userActions from '../actions/userActions';

  export default {
    data() {
      return {
        dropDownDevice: 'pc', // 当前进行下拉操作设备 mobile | pc
        dropDownStatus: false, // 下拉状态
        // warning: 注册完后需要将相关注册逻辑隐藏!!!
        // showSignUpModal: false,
        showLoginModal: false,
        bannerStyle: {
          'background': 'url(http://p55j3yvgo.bkt.clouddn.com/component/banner.jpeg)'
        },
        bannerTitle: 'Timrchen',
        bannerSubtitle: 'Life is Art.',
        username: '',
        password: '',
        loginStatus: 'noLogged',
        inputMissCount: 0, // 输入错误次数
        inputMissThree: false // 账号密码输入错误3次以上
      }
    },
    // initial
    beforeCreate: function () {
      const _self = this;
      const auth = localStorage.getItem('Authorization');
      if (auth) {
        // 初始化验证身份
        userActions.getAuth().then(res => {
          if (res.ok) {
            _self.loginStatus = res.body.state;
          }
        }).catch(error => {
          console.log(error);
        });
      }
    },
    mounted: function () {
      const _self = this;
      Bus.$on('current-banner-data', (bannerData) => {
        _self.bannerStyle.background = `url(${bannerData.picUrl})`;
        _self.bannerTitle = bannerData.essayTitle;
        _self.bannerSubtitle = bannerData.createTime;
      });
    },
    updated: function () {
        const _self = this;
        // 返回默认页时替换banner图片
        Bus.$on('banner-change-to-default', (value) => {
          _self.bannerStyle.background = 'url(http://p55j3yvgo.bkt.clouddn.com/component/banner.jpeg)';
          _self.bannerTitle = 'Timrchen';
          _self.bannerSubtitle = 'Life is Art.';
        });
    },
    methods: {
      /**
       * 点击下拉
       */
      clickDropdown: function (device) {
        const _self = this;
        let dropDownStatus = _self.dropDownStatus;
        _self.dropDownStatus = !dropDownStatus;
        _self.dropDownDevice = device;
      },
      /**
        todo: 注册完后需要将相关注册逻辑隐藏!!!
        signUp: function () {
          const _self = this;
          let username = _self.username;
          let password = _self.password;
          if (username.length !== 0 && password !== 0) {
            userActions.signUp(username, password).then(res => {
              if (res.ok) {
                alert(res.body.message);
                _self.username = '';
                _self.password = '';
                _self.showSignUpModal = false;
              }
            }).catch(err => {
              alert(err.body.message);
              _self.username = '';
              _self.password = '';
              console.error(err);
            })
          } else {
            alert('情输入完整用户账号/密码!');
          }
        },
      */
      login: function () {
        const _self = this;
        let username = _self.username;
        let password = _self.password;
        if (username.length !== 0 && password !== 0) {
          userActions.login(username, password).then(res => {
            if (res.ok) {
              alert(res.body.message);
              _self.username = '';
              _self.password = '';
              _self.showLoginModal = false;
              // 返回 JWT Token
              window.localStorage.setItem('Authorization', `Bearer ${res.body.token}`);

              // jwt 验证身份，获取登录状态
              userActions.getAuth().then(res => {
                if (res.ok) {
                  _self.loginStatus = res.body.state;
                }
              }).catch(err => {
                console.error(err);
              });
            }
          }).catch(err => {
            alert(err.body.message);
            _self.username = '';
            _self.password = '';
            _self.inputMissCount += 1;
            console.error(err);
            // 输入超过3次错误，禁用输入
            if (_self.inputMissCount >= 3) _self.inputMissThree = true;
          });
        } else {
          _self.inputMissThree ? alert('认真你就输了，请点"cancel"进行退出.') : alert('请输入完整用户账号/密码!');
        }
      },
      logout: function () {
        const _self = this;
        userActions.logout().then(res => {
          if (res.ok) {
            alert(res.body.message);
            _self.loginStatus = res.body.state;
            window.localStorage.removeItem('Authorization');
          }
        }).catch(err => {
          console.error(err);
        });
      },

      // return to top
      scrollToTop: function (scrollDuration) {
        const scrollHeight = window.scrollY,
              scrollStep = Math.PI / ( scrollDuration / 15 ),
              cosParameter = scrollHeight / 2;
        let scrollCount = 0,
            scrollMargin,
            scrollInterval = setInterval(function () {
              if ( window.scrollY != 0 ) {
                scrollCount = scrollCount + 1;  
                scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
                window.scrollTo( 0, ( scrollHeight - scrollMargin ) );
              } else {
                clearInterval(scrollInterval);
              }
            }, 1);
      }

    }
  }
</script>

<style scoped>

  .banner-mask {
    background-position: 50%!important;
    background-size: cover!important;
    position: relative;
    padding: 20px 0 0;
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

  .container {
    max-width: 900px!important;
    margin-right: auto!important;
    margin-left: auto!important;
    width: 90%!important;
  }
  .nav-header {
    padding-top: 30px;
    font-family: exoregular;
    position: relative;
  }

  .nav-header .nav-header-container .login {
    position: absolute;
    right: 0px;
  }

  .nav-header .nav-header-container .tips {
    position: absolute;
    right: 110px;
    color: #fff;
    font-size: 16px;
  }

  .nav-header .nav-header-container .signUp {
    position: absolute;
    right: 80px;
  }

  .nav-header .nav-header-container .logout {
    position: absolute;
    right: 0px;
  }

  .header-wrap {
    position: relative;
    text-align: center;
    color: #fff;
    font-family: 'Lato', sans-serif;
  }
  .header-wrap .foo {
    width: 90%;
    margin: 20vh auto;
    text-align: center;
  }
  .header-wrap .letter {
    display: inline-block;
    font-weight: 900;
    font-size: 2em;
    position: relative;
    color: #000;
    transform-style: preserve-3d;
    perspective: 400;
    z-index: 1;
  }
  .header-wrap .subtitle-letter {
    font-size: 1em;
  }
  .header-wrap .letter:before, .letter:after {
    position: absolute;
    content: attr(data-letter);
    transform-origin: top left;
    top:0;
    left:0;
  }
  /* .header-wrap .letter, .letter:before, .letter:after {
    transition: all 0.3s ease-in-out;
  } */
  .header-wrap .letter:before {
    color: #fff;
    text-shadow: 
      -1px 0px 1px rgba(255,255,255,.8),
      1px 0px 1px rgba(0,0,0,.8);
    z-index: 3;
    transform:
      rotateX(0deg)
      rotateY(-15deg)
      rotateZ(0deg);
  }
  .header-wrap .letter:after {
    color: rgba(0,0,0,.11);
    z-index:2;
    transform:
      scale(1.08,1)
      rotateX(0deg)
      rotateY(0deg)
      rotateZ(0deg)
      skew(0deg,1deg);
  }
  /* .header-wrap .letter:hover:before{
    color: #fafafa;
    transform:
      rotateX(0deg)
      rotateY(-40deg)
      rotateZ(0deg);
  }
  .header-wrap .letter:hover:after{
    transform:
      scale(1.08,1)
      rotateX(0deg)
      rotateY(40deg)
      rotateZ(0deg)
      skew(0deg,22deg);
  } */

  .return-top-btn {
    position: fixed;
    right: 2%;
    bottom: 10%;
    z-index: 999;
  }

  /* 竖屏 */
  @media screen and (max-width: 768px) {
    .header-wrap {
      position: relative;
      text-align: center;
      color: #fff;
      text-align: center;
      margin-top: 42%;
    }
    .header-wrap .foo {
      width: 80%;
    }
    .return-top-btn {
      opacity: 0;
      display: none;
    }
  }

  /* Vue 多组件切换过渡动画 */
  .component-jump-enter-active, .component-jump-leave-active {
    transition: opacity .5s ease-in-out;
  }
  .component-jump-enter, .component-jump-leave-to
  /* .component-jump-leave-active for below version 2.1.8 */ {
    opacity: 0;
    /* transform: scale(2, 2) */
  }

</style>
