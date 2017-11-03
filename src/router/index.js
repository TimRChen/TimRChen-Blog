import Vue from 'vue'
import Router from 'vue-router'
import TimBody from '@/components/TimBody'
import AdminEssay from '@/components/base/AdminEssay'
import AdminComment from '@/components/base/AdminComment'
import About from '@/components/base/About'
import Essay from '@/components/base/Essay'
import EditEssay from '@/components/base/EditEssay'
import Extra from '@/components/base/Extra'

Vue.use(Router)

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
      path: '/admin-essay',
      name: 'admin-essay',
      component: AdminEssay
    },
    {
      path: '/admin-comment',
      name: 'admin-comment',
      component: AdminComment
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/extra',
      name: 'extra',
      component: Extra
    }
  ]
})
