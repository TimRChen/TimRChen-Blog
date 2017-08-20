/**
 * vue plugin - http拦截器，用于添加http request 或 response的header信息; 关于plugin的开发规范，参考https://vuejs.org/guide/plugins.html
 * @params { object } Vue - Vue constructor
 * @params { object } options - 关于在此拦截器中的一些配置参以及执行逻辑
 **/
const httpInterceptor = {
  install(Vue, options) {
    Vue.http.interceptors.push((...args) => {
      options.operation(...args);
    });
  }
};

export default httpInterceptor;