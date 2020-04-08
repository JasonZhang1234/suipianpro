// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/index.js'
import App from './App'
import router from './router'
// import 'font-awesome/css/font-awesome.css'
import 'vant/lib/index.css';
import Vant from 'vant'
import FastClick from 'fastclick'//解决移动端300毫秒的延迟
import 'lib-flexible/flexible.js'//px转换rem
import './assets/css/reset.css'
import axios from 'axios'
// import 'amfe-flexible';
Vue.prototype.axios = axios;

//项目域名地址
const url = 'https://www.fastmock.site/mock/0e50275c5a4869346fad8794b8fea2a9/suipian';
let ROOT;
//由于封装的axios请求中，会将ROOT打包进去，为了方便之后不再更改，判断了当前环境，而生成的不同的ROOT
if (process.env.NODE_ENV === 'development') {
    //开发环境下的代理地址，解决本地跨域跨域，配置在config目录下的index.js dev.proxyTable中
    ROOT = "/udss"
} else {
    //生产环境下的地址
    ROOT = url;
}
axios.defaults.withCredentials = true 
axios.defaults.baseURL = url;
Vue.use(Vant)
// Vue.config.productionTip = false
Vue.config.debug = false;
/** 
 * 
*/
/** 
 * filter过滤器
*/

Vue.filter('sStandardAnswerFilter',function(val){
    val.replace(/[\r\n]/g,"<br>");
    var item = val.split('[')[0];
    item.replace('[','<img>')
    return item;
});
  /**
   * <input v-d1 v-model="num" />
   */
  Vue.directive('d1', {
    bind: function (el, binding, vnode) {
      el.$handler = function (e) {
        const val = el.value
        const reg = new RegExp('/^\d*\.?\d{0,1}/','g')
        // debugger;
        if (val && !reg.test(val)) {
        //   el.value = val.match(/^\d*(\.?\d{0,1})/g)) || "";
            el.value = (val.match(/^\d*(\.?\d{0,1})/g)[0]) || "" 
            // el.value = el.value.replace(/^\./g, ""); //验证第一个字符是数字而不是  
            // el.value = el.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
            // el.value = el.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            // el.value = el.value.replace(/^(\-)*(\d+)\.(\d{4}).*$/, '$1$2.$3'); //只能输入6个小数  
            // el.value = el.value.replace(/\.\d$/,''); // 
        //   el.dispatchEvent(new Event('input', { bubbles: true }))
        }
      }

      el.addEventListener('input', el.$handler)
    },
    unbind: function (el, binding, vnode) {
      el.removeEventListener('input', el.$handler)
    }
  })
FastClick.attach(document.body);//解决移动端300毫秒的延迟
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
      }
    next();
})

/* eslint-disable no-new */
new Vue({
   el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'})
