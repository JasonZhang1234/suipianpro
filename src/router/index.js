import Vue from 'vue'
import Router from 'vue-router'
import err from '@/views/err'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: "sessionBuild"
      }
    },
    {
      path: '/sessionBuild',
      name: 'sessionBuild',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/sessionBuild'),
      meta: {
        title: '验证中...'
      }
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/components/HelloWorld')
    },
    {
      path: '/Home',
      name: 'Home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Home'),
      meta: {
        title: '主页',
        keepAlive:true
      }
    },
    {
      path: '/fragment',
      name: 'fragment',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/fragment/FragmentPerson'),
      meta: {
        title: '碎片查看',
        keepAlive:true
      }
    },
    {
      path: '/guanliqueyin',
      name: 'guanliqueyin',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/guanliqueyin/guanliqueyin'),
      meta: {
        title: '管理确认',
        keepAlive:true
      }
    },
    {
      path: '/queren',
      name: 'queren',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/guanliqueyin/queren'),
      meta: {
        title: '排班表确认',
        keepAlive:true
      }
    },
    {
      path: '/fenfa',
      name: 'fenfa',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/guanliqueyin/fenfa'),
      meta: {
        title: '排他性碎片分发',
        keepAlive:true
      }
    },
    {
      path: '/shuipianlingyong',
      name: 'shuipianlingyong',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/shuipianlingyong'),
      meta: {
        title: '临时碎片领用',
        keepAlive:true
      }
    },
    {
      path: '/suipianshenhe',
      name: 'suipianshenhe',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/suipianshenhe'),
      meta: {
        title: '临时碎片审核',
        keepAlive:true
      }
    },
    {
      path: '/xinxi',
      name: 'xinxi',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/xinxi'),
      meta: {
        title: '信息',
        keepAlive:true
      }
    },
    {
      path: '/err',
      name: 'err',
      component: err
    }, 
    {
      path: '*',
      component: err
    },
  ]
})
