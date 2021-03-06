import Vue from 'vue'
import Router from 'vue-router'
import Detail from '@/components/Detail'
import List from '@/components/List'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/movie/:title',
      name: 'Detail',
      component: Detail
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})
