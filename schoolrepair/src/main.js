import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "element-ui/lib/theme-chalk/index.css"
import "./plugins/element";
import axios from "axios"
import util from "./util/util"

Vue.prototype.utils = util
Vue.config.productionTip = false
Vue.prototype.$http = axios

axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem("token"); //拦截器拦截请求，每次请求头带认证token请求
    config.timeout = 5000;
    return config;
})


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')