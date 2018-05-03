<template>
  <div class="about-me container">

    <div class="card diy-card">
      <div class="card-content">
        <p class="title">
          “享受创造的乐趣。”
        </p>
        <div class="content">
          <p>Name: <a class="tag is-warning">黄睿晨</a></p>
          <p>I'm: <a class="tag is-link">male</a></p>
          <p>Age: <a class="tag is-link">23</a></p>
          <p>Emotion: <a class="tag is-danger">In love</a></p>
          <p>Current Status: <a class="tag is-danger">Busy</a></p>
          <p>Hobit: <a class="tag is-info">guitar</a></p>
          <p>Dream: <a class="tag is-primary">be great.</a></p>
          <p>Email: <a class="tag is-white" href="mailto:timrchen@foxmail.com">timrchen@foxmail.com</a></p>
          <p>GitHub: <a class="tag is-white" href="https://github.com/TimRChen" target="_blank">https://github.com/TimRChen</a></p>
          <p>Time: <a class="tag">2018.04.17</a></p>
          <p>
            <strong>"Programming is the art of telling another human what one wants the computer to do."</strong>
          </p>
        </div>
      </div>
      <!-- <div class="card-image">
        <figure class="image is-16by9">
          <img v-bind:style="{ filter: 'grayscale(100%)' }" src="http://p55j3yvgo.bkt.clouddn.com/component/space.jpeg" alt="Placeholder image">
        </figure>
      </div> -->
    </div>

    <section class="hero is-link">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            欢迎来访小站，个人的一亩三分地，辛苦耕耘，谢谢关注.
          </h2>
          <a class="button is-dark is-inverted is-outlined" href="https://github.com/TimRChen" target="_blank">
            <span class="icon">
              <i class="fa fa-github"></i>
            </span>
            <span>Follow</span>
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script>

</script>

<style scoped>

  .about-me {
    margin-top: 5%;
  }

  .diy-card {
    margin-bottom: 5%;
  }

  /* 竖屏 */
  @media screen and (max-width: 768px) {
    .about-me {
      margin-top: 0;
    }
    .diy-card {
      margin-bottom: 0;
    }
  }

</style>