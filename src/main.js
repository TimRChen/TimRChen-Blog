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

/**
 * http拦截器插件
 */
Vue.use(httpInterceptor, {
  operation: (...args) => {
    const [request, next] = args;
    request.headers.map.Authorization = [localStorage.getItem('Authorization') || ''];
    next((response) => {
      if (typeof response.headers.map.Authorization === 'object') {
        localStorage.setItem('Authorization', response.headers.map.Authorization[0]);
      } else if (typeof response.headers.map.authorization === 'object') {
        localStorage.setItem('Authorization', response.headers.map.Authorization[0]);
      }
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
