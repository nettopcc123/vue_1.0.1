// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import  VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import store from './store';
import Vuex from 'vuex'
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
import $ from 'jquery';
import promise from 'es6-promise';
promise.polyfill();

import http from '@/utils/http';
import api from '@/utils/api';


//leancloud.cn
var AV = require('leancloud-storage');
var AV = require('leancloud-storage/live-query');
var { Query, User } = AV;
// 实时消息服务
var { Realtime, TextMessage } = require('leancloud-realtime');



import 'babel-polyfill';
import Es6Promise from 'es6-promise';
require('es6-promise').polyfill();
Es6Promise.polyfill();

/**
 4. 拼团详情
 */
export const groupDetail = param => {
  return req.get('/RestHome/GroupDetail',param);
}


Vue.prototype.axios = axios;
Vue.prototype.http = http;
Vue.prototype.api = api;
Vue.use(VueAwesomeSwiper,Vuex,$);
Vue.prototype.http = http;
Vue.prototype.api = api;
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { 
    App 
  },
  template: '<App/>'
})

//获取当前时间
Vue.prototype.getNowFormatDate = function() {
    var date = new Date();
    var getWeek = date.getDay();
    var week = '  星期';
    switch(getWeek){
        case 0:
            week += '日';
            break;
        case 1:
            week += '一';
            break;
        case 2:
            week += '二';
            break;
        case 3:
            week += '三';
            break;
        case 4:
            week += '四';
            break;
        case 5:
            week += '五';
            break;
        case 6:
            week += '六';
            break;
    };
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate + week;
    return currentdate;
};


Vue.use(Toast, {
    type: 'center',
    duration: 3000,
    wordWrap: true,
    width: '150px'
});


//判断用户是否登入
router.beforeEach((to, from, next) => {
    // 这里会持续性的输出 null
    console.log(JSON.stringify(store.state.user.user));
    if(store.state.user.user !== null){
        next()
    }else {
      console.log('用户尚未登录');
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        })
    }
})
