import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';
import TimBody from '@/components/TimBody.vue';
import Essay from '@/components/base/Essay';
import EditEssay from '@/components/base/EditEssay';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'body',
      component: TimBody
    },
    {
      path: '/essay',
      name: 'essay',
      component: Essay
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditEssay
    }
  ]
});
