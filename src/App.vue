<template>
  <div id="app">
    <tim-header></tim-header>
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <tim-footer></tim-footer>
  </div>
</template>

<script>
  import TimHeader from './components/TimHeader.vue';
  import TimFooter from './components/TimFooter.vue';

  export default {
    name: 'app',
    components: { TimHeader, TimFooter }
  }

</script>

<style>
  * {
    text-decoration: none!important;
    /* font-family: freight-display-pro,serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* background image */
  body {
    background-image: url('./assets/bg.gif');
    background-repeat: repeat;
    background-color: #FFFDFA;
  }

  /* Vue 多组件切换过渡动画 */
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity 0.2s ease-in-out;
  }
  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }

</style>
