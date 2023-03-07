import App from './App'

// #ifndef VUE3
import Vue from 'vue'
// uViewUI
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
// 引入配置文件
import $config from "@/utils/lib/config.js"
Vue.prototype.$config = $config
// 引入助手函数
import $tool from '@/utils/lib/tool.js'
Vue.prototype.$tool = $tool

import * as filters from '@/utils/filters.js' //引用。相对路径根据你创建的位置与名称自行修改
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})
console.log('filters------', filters)
//在Vue实例创建之前注册全局过滤器
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
