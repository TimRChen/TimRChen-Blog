<template>
  <header id="header" class="banner">

    <!-- 导航栏 -->
    <nav class="navbar is-fixed-top navbar-define-by-timrchen" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="http://www.timrchen.site">
          <img src="../assets/timrchen_logo.png" alt="TIMRCHEN" width="112" height="28">
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

    <!-- 文章背景 -->
    <div class="bk-image-container" v-show="currentHeaderStatus === 'essay'" v-bind:style="{'background': bkImage}">
      <!-- 文章标题 -->
      <div class="essay-title-wrap" v-show="currentHeaderStatus === 'essay'">
        <div class="essay-title">{{ essayTitle }}</div>
        <div class="essay-subtitle">Post by TimRChen on {{ essaySubtitle }}</div>
      </div>
    </div>

    <!-- 主页大标题 -->
    <div class="main-title-container" v-show="currentHeaderStatus === 'other'">
      <div class="main-title-wrap">
        <div class="letter" data-letter="向死而生">向死而生</div>
        <br>
        <div class="letter subtitle-letter" data-letter="Live to death.">Live to death.</div>
      </div>
    </div>

    <!-- login modal -->
    <div class="modal" v-bind:class="{ 'is-active': showLoginModal === true }">
      <div class="modal-background" v-on:click="showLoginModal = false"></div>
      <div class="modal-content">

        <div class="filed has-text-danger" v-show="inputMissThree">👁👁请注意，输入超过3次错误禁止输入!</div>

        <!-- username -->
        <div class="field" v-show="!inputMissThree">
          <label class="label">Hi, guys.</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input is-small is-rounded" type="text" v-model="username" autofocus v-bind:disabled="inputMissThree">
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
            <input class="input is-small is-rounded" type="password" name="password" v-model="password" v-on:keyup.enter="login" v-bind:disabled="inputMissThree">
            <span class="icon is-small is-left">
              <i class="fa fa-key"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-check"></i>
            </span>
          </div>
        </div>

      </div>
    </div>

    <!-- 返回顶部 -->
    <div class="return-top-btn" v-once>
      <button class="button is-focused is-dark" v-on:click="scrollToTop(1000)">↑</button>
    </div>

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
        showLoginModal: false,
        bkImage: '',
        essayTitle: 'test',
        essaySubtitle: 'testtest',
        currentHeaderStatus: 'other', // other | essay
        username: '',
        password: '',
        loginStatus: 'noLogged',
        inputMissCount: 0, // 输入错误次数
        inputMissThree: false // 账号密码输入错误3次以上
      }
    },
    beforeCreate: function () {
      const auth = localStorage.getItem('Authorization');
      if (auth) {
        // 初始化验证身份
        userActions.getAuth().then(res => {
          if (res.ok) {
            this.loginStatus = res.body.state;
          }
        }).catch(error => {
          console.log(error);
        });
      }
    },
    mounted: function () {
      Bus.$on('current-banner-data', (bannerData) => {
        this.currentHeaderStatus = 'essay';
        this.bkImage = `url(${bannerData.picUrl})`;
        this.essayTitle = bannerData.essayTitle;
        this.essaySubtitle = bannerData.createTime;
      });
    },
    updated: function () {
        // 返回默认页时替换banner图片
        Bus.$on('banner-change-to-default', (value) => {
          this.bkImage = '';
          this.currentHeaderStatus = 'other';
        });
    },
    methods: {
      /**
       * 点击下拉
       */
      clickDropdown: function (device) {
        let dropDownStatus = this.dropDownStatus;
        this.dropDownStatus = !dropDownStatus;
        this.dropDownDevice = device;
      },
      login: function () {
        const username = this.username;
        const password = this.password;
        if (username.length !== 0 && password !== 0) {
          userActions.login(username, password).then(res => {
            if (res.ok) {
              alert(res.body.message);
              this.username = '';
              this.password = '';
              this.showLoginModal = false;
              // 返回 JWT Token
              window.localStorage.setItem('Authorization', `Bearer ${res.body.token}`);

              // jwt 验证身份，获取登录状态
              userActions.getAuth().then(res => {
                if (res.ok) {
                  this.loginStatus = res.body.state;
                }
              }).catch(err => {
                console.error(err);
              });
            }
          }).catch(err => {
            alert(err.body.message);
            this.username = '';
            this.password = '';
            this.inputMissCount += 1;
            console.error(err);
            // 输入超过3次错误，禁用输入
            if (this.inputMissCount >= 3) this.inputMissThree = true;
          });
        } else {
          this.inputMissThree ? alert('认真你就输了，请点"cancel"进行退出.') : alert('请输入完整用户账号/密码!');
        }
      },
      logout: function () {
        userActions.logout().then(res => {
          if (res.ok) {
            alert(res.body.message);
            this.loginStatus = res.body.state;
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

  .banner {
    position: relative;
    overflow: hidden;
  }

  .navbar-define-by-timrchen {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.12);
  }

  .bk-image-container {
    background-position: 50%!important;
    background-size: cover!important;
    height: 400px;
    margin-top: 52px;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
  }

  .bk-image-container .essay-title-wrap {
    color: #fff;
    background-image: linear-gradient(-180deg,transparent,#000 180%);
    padding-bottom: 60px;
  }

  .bk-image-container .essay-title-wrap .essay-title {
    font-family: -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,"PingFang SC","Hiragino Sans GB",STHeiti,"Microsoft YaHei","Microsoft JhengHei","Source Han Sans SC","Noto Sans CJK SC","Source Han Sans CN","Noto Sans SC","Source Han Sans TC","Noto Sans CJK TC","WenQuanYi Micro Hei",SimSun,sans-serif;
    font-size: 55px;
    font-weight: 500;
    margin: 0 200px;
    text-align: left;
  }

  .bk-image-container .essay-title-wrap .essay-subtitle {
    font-family: Lora,'Times New Roman',serif;
    font-style: italic;
    font-size: 20px;
    font-weight: 600;
    margin: 0 200px;
    text-align: left;
  }

  .main-title-container {
    color: #fff;
    font-family: 'Lato', sans-serif;
    height: 300px;
    margin-top: 52px;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  .main-title-container .main-title-wrap {
    text-align: center;
  }

  .main-title-container .letter {
    display: inline-block;
    font-weight: 900;
    font-size: 3em;
    position: relative;
    color: #fff;
    transform-style: preserve-3d;
    perspective: 400;
  }

  .main-title-container .subtitle-letter {
    font-size: 1em;
  }

  .main-title-container .letter:before, .letter:after {
    position: absolute;
    content: attr(data-letter);
    transform-origin: top left;
    top:0;
    left:0;
  }

  .main-title-container .letter:before {
    color: #000;
    text-shadow: 
      -1px 0px 1px rgba(255,255,255,.8),
      1px 0px 1px rgba(0,0,0,.8);
    transform:
      rotateX(0deg)
      rotateY(-15deg)
      rotateZ(0deg);
  }

  .return-top-btn {
    position: fixed;
    right: 2%;
    bottom: 10%;
    z-index: 999;
  }

  .return-top-btn button {
    border-radius: 8px;
  }

  /* 竖屏 */
  @media screen and (max-width: 768px) {
    .bk-image-container {
      justify-content: flex-end;
    }
    .bk-image-container .essay-title-wrap {
      background-image: linear-gradient(-180deg,transparent,#000 180%);
      padding-bottom: 10px;
    }
    .bk-image-container .essay-title-wrap .essay-title {
      font-size: 2em;
      margin: 0 40px;
      text-align: left;
    }
    .bk-image-container .essay-title-wrap .essay-subtitle {
      font-size: 16px;
      margin: 0 0 0 40px;
    }
    .main-title-container {
      position: relative;
      text-align: center;
      color: #fff;
      text-align: center;
      margin-top: 52px;
    }
    .main-title-container .foo {
      width: 80%;
    }
    .return-top-btn {
      opacity: 0;
      display: none;
    }
  }

  /* Vue 多组件切换过渡动画 */
  .component-jump-enter-active, .component-jump-leave-active {
    transition: opacity .6s ease-out;
  }
  .component-jump-enter, .component-jump-leave-to {
    opacity: 0;
  }

</style>
