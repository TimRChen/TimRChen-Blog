<template>
  <header id="header" class="banner-mask">

    <!-- 导航栏 -->
    <div class="nav-header container">
      <div class="nav-header-container">
        <!-- route 1 -->
        <a href="#/" class="button is-dark is-inverted is-outlined">Home</a>

        <div class="dropdown is-hoverable" v-if="loginStatus === 'logged'">
          <div class="dropdown-trigger">
            <button class="button is-dark is-inverted is-outlined" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>Drop</span>
              <span class="icon is-small">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <p><strong>欢迎您，超级管理员.</strong></p>
              </div>
              <a href="#/edit" class="dropdown-item" v-if="loginStatus === 'logged'">Edit</a>
              <hr class="dropdown-divider">
              <a href="#/admin" class="dropdown-item" v-if="loginStatus === 'logged'">Admin</a>
            </div>
          </div>
        </div>
        <!-- Todo: 关于我介绍页 -->
        <a href="#/about" class="button is-dark is-inverted is-outlined">About</a>
        <!-- <a class="signUp button is-dark is-inverted is-outlined" v-on:click="showSignUpModal = true" v-if="loginStatus === 'noLogged'">SignUp</a> -->
        <a class="login button is-dark is-inverted is-outlined" v-on:click="showLoginModal = true" v-if="loginStatus === 'noLogged'">Login</a>
        <a class="login button is-dark is-inverted is-outlined" v-on:click="logout()" v-if="loginStatus === 'logged'">Logout</a>
      </div>
    </div>

    <!-- signUp modal todo: 注册完后需要将相关注册逻辑隐藏!!! -->
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
      <div class="home-info-container">
        <h2>Timrchen</h2>
        <h3>Life is Art.</h3>
      </div>
    </div>

    <div class="return-top-btn">
      <button class="button is-large is-primary is-inverted" v-on:click="scrollToTop(1000)">TOP</button>
    </div>



  </header>
</template>

<script>

  import userActions from '../actions/userActions';


  export default {
    data() {
      return {
        // todo: 注册完后需要将相关注册逻辑隐藏!!!
        // showSignUpModal: false,
        showLoginModal: false,
        username: '',
        password: '',
        loginStatus: 'noLogged'
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
      // signUp: function () {
      //   const _self = this;
      //   let username = _self.username;
      //   let password = _self.password;
      //   if (username.length !== 0 && password !== 0) {
      //     userActions.signUp(username, password).then(res => {
      //       if (res.ok) {
      //         alert(res.body.message);
      //         _self.username = '';
      //         _self.password = '';
      //         _self.showSignUpModal = false;
      //       }
      //     }).catch(err => {
      //       alert(err.body.message);
      //       _self.username = '';
      //       _self.password = '';
      //       console.error(err);
      //     })
      //   } else {
      //     alert('情输入完整用户账号/密码!');
      //   }
      // },
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
    text-align: center;
    margin-top: 4%;
  }

  .home-info-container a {
    color: inherit;
  }
  .home-info-container a:hover {
    color:#fff;
  }
  .header-wrap h2 {
    font-size: 42px!important;
    font-weight: 200!important;
  }

  .header-wrap h3 {
    font-weight: 200!important;
  }

  .return-top-btn {
    position: fixed;
    right: 2%;
    bottom: 10%;   
  }


</style>
