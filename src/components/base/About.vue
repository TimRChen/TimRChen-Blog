<template>
  <div class="about-me container">
    
    <section class="hero is-dark is-bold">
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
    <br>

    <div class="card">
      <div class="card-image">
        <figure class="image is-3by4">
          <img v-bind:style="{ filter: 'grayscale(100%)' }" src="../../assets/space.jpeg" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <p class="title">
          “一生想做浪漫极客.”
        </p>
        <div class="content">
          <p>Name: <a class="tag is-info">黄睿晨</a></p>
          <p>I'm: <a class="tag is-info">male</a></p>
          <p>Age: <a class="tag is-info">22</a></p>
          <p>Emotion: <a class="tag is-dark">single dog</a></p>
          <p>Current Status: <a class="tag is-dark">Busy</a></p>
          <p>Hobit: <a class="tag is-dark">guitar - contact me.</a></p>
          <p>Dream: <a class="tag is-dark">do anything.</a></p>
          <p>Email: <a class="tag is-info">timrchen@foxmail.com</a></p>
          <p>GitHub: <a class="tag is-info" href="https://github.com/TimRChen" target="_blank">https://github.com/TimRChen</a></p>
          <p>Time: <a class="tag is-info">2017.11.03</a></p>
          <p>
            <strong>"Programming is the art of telling another human what one wants the computer to do."</strong>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

</script>

<style>
  .about-me {
    margin-top: 5%!important;
  }


</style>