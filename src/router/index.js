import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';
import TimBody from '@/components/TimBody';
import Admin from '@/components/base/Admin';
import About from '@/components/base/About';
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
      path: '/essay/:id',
      name: 'essay',
      component: Essay
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditEssay
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
});
