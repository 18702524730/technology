// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import './assets/css/reset.css'
import './assets/css/common.css'
import './assets/css/font/iconfont.css'
import 'font-awesome/css/font-awesome.min.css'
import 'animate.css/animate.min.css'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import { routes } from './router'
import vueWechatTitle from 'vue-wechat-title'
import Plugin from '@/plugins'
import $ from 'jquery'

window.$ = $;

//import echarts from 'echarts';
//window.echarts = echarts;
//Vue.prototype.$echarts = echarts;
import {Radio, RadioGroup, Checkbox, CheckboxGroup } from 'element-ui'
Vue.use(Plugin)
Vue.component(Radio.name, Radio)
Vue.component(Checkbox.name, Checkbox)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(CheckboxGroup.name, CheckboxGroup)

Vue.use(vueWechatTitle)
import { WechatPlugin, ToastPlugin ,Icon ,XDialog, Msg, AlertPlugin, Loading, Toast, Alert, Calendar, PopupPicker, Popup, Checklist} from 'vux'
Vue.use(WechatPlugin)
Vue.use(ToastPlugin)
Vue.use(Icon)
Vue.use(XDialog)
Vue.use(Msg)
Vue.use(AlertPlugin)
Vue.component('loading', Loading)
Vue.component('toast', Toast)
Vue.component('alert', Alert)
Vue.component('calendar', Calendar)
Vue.component('popup-picker', PopupPicker)
Vue.component('popup', Popup)
Vue.component('check-list', Checklist)


//import VueScroller from './components/vue-scroller'
//Vue.use(VueScroller)

// import loadingGif from 'assets/img/prehold.png'
// import errhold from 'assets/img/errhold.png'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
//   error: errhold,
//   loading: loadingGif,
  attempt: 1
})

//mockdata数据模拟
//import Mock from './mock'
//Mock.bootstrap();

Vue.use(VueRouter)
Vue.use(VueCookie);
Vue.use(VueAxios, axios)

// 得到URL查询参数
function getQueryObj () {
  let obj_ = {};
  if (location.href.split('?')[1]) {
    let arr_ = location.href.split('?')[1].split('&');
    arr_.forEach( item => {
      let arr = item.split('=');
      obj_[arr[0]] = arr[1]
    })
  }
  return obj_
}

// axios默认传统表单提交方式
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 配置全局根路径
var rootUrl = CONFIG.rootUrl;
global.Path = axios.defaults.baseURL = CONFIG.rootUrl;
//axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
// Add a request interceptor
axios.interceptors.request.use(function(config) {
    // Do something before request is sent
    let obj_ = getQueryObj();
    if (obj_.sessionId) {
      config.headers.MiniAppSessionId = obj_.sessionId;
    }
    if (obj_.miniAppType) {
      config.headers.MiniAppType = obj_.miniAppType;
    }
    if (obj_.key) {
      // 合伙人小程序跳转过来的话用小程序的token
      config.headers.Authorization = obj_.key;
    } else {
      config.headers.Authorization = VueCookie.get('user_token');
    }
    // config.headers.Authorization = VueCookie.get('user_token'); // || 'iprp_member-1c9923cdc0c1475cb69506c01a46a0708a6792c29d3a4a8abbb0d245eb31035f';
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// 拦截未登录
axios.interceptors.response.use(function(response) {
    // Do something with response data
    return response.data;
}, function(error) {
    // Do something with response error
    return Promise.reject(error);
});

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
    routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
    // A跳转到B，B页面停留在A页面的滚动位置；解决方法：将scrollTop设置为0
    window.scroll(0, 0);
    next();
  });


FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app-box')
