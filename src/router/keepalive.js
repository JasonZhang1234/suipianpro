import router from '@/router'
import { Toast } from 'vant';

let routerStack = []
router.beforeEach((to, from, next) => {
    Toast.clear()

  if (to.name === routerStack[routerStack.length - 1]) {
    // 后退
    console.log("后退")
    routerStack.pop()
  } else {
    // 前进
    console.log("前进")

    routerStack.push(to.name)
  }
  next();
})
