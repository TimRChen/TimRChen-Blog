// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import '../node_modules/bulma/css/bulma.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import httpInterceptor from './plugins/httpInterceptor';

Vue.config.productionTip = false;

Vue.use(VueResource);


Vue.use(httpInterceptor, {
  operation: (...args) => {
    const [request, next] = args;
    debugger
    next(response => {
      debugger
      return response;
    });
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
