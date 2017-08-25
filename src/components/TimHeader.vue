<template>
  <header id="header" class="banner-mask">
    <!-- <div id="barbg"> -->
      <!-- 进度条 -->
      <!-- <div id="bar"></div> -->
    <!-- </div> -->

    <!-- 导航栏 -->
    <div class="nav-header container">
      <div class="nav-header-container">
        <!-- route 1 -->
        <a href="/" class="button is-dark is-inverted is-outlined">Home</a>
        <a class="signUp button is-dark is-inverted is-outlined" v-on:click="showSignUpModal = true" v-if="loginStatus === 'noLogged'">SignUp</a>        
        <a class="login button is-dark is-inverted is-outlined" v-on:click="showLoginModal = true" v-if="loginStatus === 'noLogged'">Login</a>
        <a class="login button is-dark is-inverted is-outlined" v-on:click="logout()" v-if="loginStatus === 'logged'">Logout</a>
      </div>
    </div>

    <!-- signUp modal todo: 注册完后需要将相关注册逻辑隐藏!!! -->
    <div class="modal" v-bind:class="{'is-active': showSignUpModal === true}">
      <div class="modal-background" v-on:click="showSignUpModal = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">signUp</p>
          <button class="delete" aria-label="close" v-on:click="showSignUpModal = false"></button>
        </header>
        <section class="modal-card-body">

          <!-- username -->
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
            <!-- <p class="help is-success">This username is available</p> -->
          </div>

          <!-- password -->
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
    </div>


    <!-- login modal -->
    <div class="modal" v-bind:class="{'is-active': showLoginModal === true}">
      <div class="modal-background" v-on:click="showLoginModal = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Login</p>
          <button class="delete" aria-label="close" v-on:click="showLoginModal = false"></button>
        </header>
        <section class="modal-card-body">

          <!-- username -->
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
            <!-- <p class="help is-success">This username is available</p> -->
          </div>

          <!-- password -->
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
          <button class="button is-primary" v-on:click="login()">Login</button>
          <button class="button" v-on:click="showLoginModal = false">Cancel</button>
        </footer>
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

  import userActions from '../actions/userActions';


  export default {
    data() {
      return {
        // todo: 注册完后需要将相关注册逻辑隐藏!!!
        showSignUpModal: false,
        showLoginModal: false,
        username: '',
        password: '',
        loginStatus: 'noLogged',
      }
    },
    // initial
    beforeCreate: function () {
      const _self = this;

      // 初始化验证身份
      userActions.getAuth().then(res => {
        if (res.ok) {
          _self.loginStatus = res.body.state;
        }
      }).catch(err => {
        console.error(err);
      });

    },
    methods: {
      // todo: 注册完后需要将相关注册逻辑隐藏!!!
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
            debugger
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
      logout: function () {
        
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
