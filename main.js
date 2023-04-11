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
// console.log('filters------', filters)
//在Vue实例创建之前注册全局过滤器
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})


// #ifndef MP-WEIXIN
// 实时聊天socket
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
	debug: true,
	// connection: SocketIO('http://127.0.0.1:5000'), //使用Socket.IO-client
	connection: 'http://127.0.0.1:80',
	extraHeaders: {
		'Access-Control-Allow-Origin': '*',
		'cors_allowed_origins': "*",
		'async_mode': 'eventlet'
	},
	allowEIO3: true,
}))
// #endif 
// //socket 连接参数
// const socketOptions = {
// 	autoConnect: false, // 自动连接     这里为我项目需求  需要在指定情况下才连接socket
// }

// // 注册
// Vue.use(
// 	new VueSocketIO({
// 		debug: true, // debug调试，生产建议关闭
// 		connection: SocketIO("http://127.0.0.1:80", socketOptions),
// 		store, // 如果没有使用到store可以不用写
// 	})
// )
// import VueSocketIO from 'vue-socket.io'
// // import SocketIO from "socket.io-client"
// // 注册
// Vue.use(
// 	new VueSocketIO({
// 		debug: true, // debug调试，生产建议关闭
// 		connection: '127.0.0.1',
// 		// store, // 如果没有使用到store可以不用写
// 	})
// )



// Vue.config.productionTip = false

// // socket 连接参数
// const socketOptions = {
// 	autoConnect: false, // 自动连接     这里为我项目需求  需要在指定情况下才连接socket
// }

// // 注册
// Vue.use(
// 	new VueSocketIO({
// 		debug: true, // debug调试，生产建议关闭
// 		connection: SocketIO("127.0.0.1:1024", socketOptions),
// 		store, // 如果没有使用到store可以不用写
// 	})
// )


// new Vue({
// 	// 这里为全局监听socket事件消息，监听函数这里只写了一点，其实很有很多事件。
// 	sockets: {
// 		connecting() {
// 			console.log('正在连接')
// 		},
// 		disconnect() {
// 			console.log("Socket 断开");
// 		},
// 		connect_failed() {
// 			cosnole.log('连接失败')
// 		},
// 		connect() {
// 			console.log('socket connected')
// 		}
// 	},
// 	// router,
// 	// store,
// 	render: h => h(App)
// }).$mount('#app')


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	// sockets: {
	// connecting() {
	// 	console.log('正在连接')
	// },
	// disconnect() {
	// 	console.log("Socket 断开");
	// },
	// connect_failed() {
	// 	console.log('连接失败')
	// },
	// connect() {
	// 	console.log('socket connected')
	// },
	// connection() {
	// 	console.log('connection')
	// },
	// welcome(data) {
	// 	console.log(data)
	// }
	// },
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
