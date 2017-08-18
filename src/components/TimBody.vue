<template>
  <div id="main" class="content homepage">

    <div class="content-area container">
      <div class="site-content">
        <!-- need v-for -->
        <article class="post-item">
          <!-- image -->
          <div class="post-image">
            <div class="info-mask">
              <div class="mask-wrapper">

                <h2 class="post-title">
                  <!-- route 2 -->
                  <router-link to="/essay">Test</router-link>
                </h2>

                <div class="post-info">
                  <span class="post-time">
                    show time
                  </span>
                </div>

              </div>
            </div>
          </div>
        </article>

      </div>
    </div>

  </div>
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

  .site-content {
    padding-top: 50px;
  }

  .post-item {
    position: relative;
    margin-bottom: 30px;
    background-color: #fff;
  }

  .post-image {
    display: block;
    height: 340px;
    background: url('../assets/camera.jpg');
    background-size: cover;
    background-position: 50%;
    position: relative;
  }

  .post-item .info-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: transparent -webkit-linear-gradient(top,transparent,rgba(0,0,0,.4)) repeat scroll 0 0;
    background: transparent linear-gradient(180deg,transparent 0,rgba(0,0,0,.4)) repeat scroll 0 0;
  }

  .info-mask {
    display: block;
    padding: 30px;
  }
  
  .post-item:hover .info-mask {
    background: transparent -webkit-linear-gradient(top,transparent,rgba(0,0,0,.8)) repeat scroll 0 0;
    background: transparent linear-gradient(180deg,transparent 0,rgba(0,0,0,.8)) repeat scroll 0 0;
  }

  .mask-wrapper {
    position: absolute;
    bottom: 10px;
    color: #fff;
    left: 20px;
    right: 20px;
  }

  .mask-wrapper .post-title {
    font-size: 36px;
    line-height: 1.4;
    color: #fff;
  }

  .mask-wrapper .post-title a:hover {
    color: #bc403e;
  }

  .mask-wrapper .post-title a {
    color: inherit;
  }

  .mask-wrapper .post-info {
    font-size: 14px;
    font-family: exoregular;
  }

</style>
