<template>
  <div id="app">
    <tim-header></tim-header>
    <router-view></router-view>
    <tim-footer></tim-footer>
  </div>
</template>

<script>
  import TimHeader from './components/TimHeader.vue';
  import TimFooter from './components/TimFooter.vue';

  export default {
    name: 'app',
    components: {
      TimHeader,
      TimFooter
    }
  }

</script>

<style>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none!important;
    font-family: freight-display-pro,serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* background image */
  body {
    background-image: url('./assets/bg.gif');
    background-repeat: repeat;
    background-color: #FFFDFA;

  }  

</style>
