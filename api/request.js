import axios from 'axios'
// import qs from 'qs'
// import app from 'vue'

axios.create({
	baseURL: 'http://127.0.0.1/api',
	timeout: 10000, //超时时间
	responseType: "json",
	responseEncoding: 'utf8',
})
// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'


// 添加请求拦截器
axios.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	// 传递token信息
	const token = sessionStorage.getItem('token')
	console.log('请求拦截器')
	config.headers.Authorization = token
	// config.headers['authorization'] = token
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});


/* axios.interceptors.response.use(res => {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        // 接收判断登录的状态码
        let status = res.status
        console.log(status);
        console.log(res);
        switch (status) {
            case 200:
                // 说明登录成功
                return res.data;

            case 401:
                // 登录失效
                // 响应成功的拦截
                console.log('响应拦截器：')
                    // console.log(res.data)
                Vue.prototype.$message.error(res.data.message)
                sessionStorage.removeItem('DT')
                router.push('/login')
                break
            case 404:
                if (res.data.message !== null) {
                    Vue.prototype.$message.error(res.data.message)
                } else {
                    Vue.prototype.$message.error('未知错误')
                }
                break
            case 500:
                // 错误
                if (res.data.message !== null) {
                    Vue.prototype.$message.error(res.data.message)
                } else {
                    res
                    Vue.prototype.$message.error('未知错误')
                }
                break
            case 1001:
            case 1002:
                removeToken()
                router.replace({ path: '/admin/login' })
                break;
            default:
                break
        }
        return res;
    },
    err => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        // return Promise.reject(err);
        console.log(err)
        console.log(err.response)
        return err;
        if (err.response.data.message) {
            Vue.prototype.$message.error(err.response.data.message)
            return Promise.reject(err.response.data.message) // 返回接口返回的错误信息
        } else {
            // 返回状态码不为200时候的错误处理
            Vue.prototype.$message.error(err.toString())
            return Promise.resolve(err)
        }
    }); */

// 添加响应拦截器
axios.interceptors.response.use(
	res => {
		const data = res.data
		// console.log(res);
		// res是响应的结果
		// switch (response.data.code) {
		switch (res.status) {
			case 200:
				if (data.code != 0) {
					uni.showToast({
						title: data.msg,
						icon: 'error',
						duration: 850
					});
					console.log('axioa响应200拦截error', data)
				}
				return data.data

				{
					/*
					                  case 401:
					                      // 登录失效
					                      // 响应成功的拦截
					                      uni.showToast({
					                          title: data.msg,
					                          icon: 'error',
					                          duration: 850
					                      });
					                      console.log('响应拦截器：res.401,登录失效', data)
					                          // console.log(response.data)
					                          // Vue.prototype.$message.error(response.data.message)
					                          // sessionStorage.removeItem('DT')
					                          // router.push('/login')
					                      break
					                  case 402:
					                      uni.showToast({
					                          title: data.msg,
					                          icon: 'error',
					                          duration: 850
					                      });
					                      console.log(data.msg)
					                          // console.log(response.data)
					                          // Vue.prototype.$message.error(response.data.message)
					                          // sessionStorage.removeItem('DT')
					                      break
					                      if (res.data.message !== null) {
					                          Vue.prototype.$message.error(res.data.message)
					                      } else {
					                          Vue.prototype.$message.error('未知错误')
					                      }
					                      break
					                  case 404:
					                      console.log(data.msg)
					                      if (data.message == null) {
					                          data.msg = '未知错误'
					                      }
					                      uni.showToast({
					                          title: data.msg,
					                          icon: 'error',
					                          duration: 850
					                      });
					                      break
					                  case 500:
					                      // 错误
					                      if (res.data.message !== null) {
					                          Vue.prototype.$message.error(res.data.message)
					                      } else {
					                          Vue.prototype.$message.error('未知错误')
					                      }
					                      break
					                      */
				}

				default:
					console.log(res)
					if (data.msg == null) {
						data.msg = '未知错误'
					}
					uni.showToast({
						title: data.msg,
						icon: 'error',
						duration: 850
					});
					return res.data
		}
	},
	err => {
		console.log(err, 'status!=200,err');
		const res = err.response
		console.log(err.message);
		const data = res.data
		// console.log(data, 'data');
		if (data.msg === null || data.msg === '') {
			data.msg = "未知错误"
		}
		switch (res.status) {
			case 401:
				// 登录失效
				uni.showToast({
					title: data.msg,
					icon: 'error',
					duration: 850
				});
				setTimeout(() => {
					console.log('跳转到登录页面')
					uni.navigateTo({
						url: '/pages/login/login'
					})
					uni.switchTab({
						url: '/pages/login/login'
					})
				}, 850)
				break
			case 404:
				console.log(data.msg)
				uni.showToast({
					title: data.msg,
					icon: 'error',
					duration: 850
				});
				break
			case 500:
				console.log(err.message);
				// console.log(data.msg)
				uni.showToast({
					title: '找不到请求，请联系管理员',
					icon: 'error',
					duration: 850
				});
				break
			default:
				return res.data
		}
		return Promise.resolve(err.response.data)
	}
)

axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
	return new Promise((resolve, reject) => {
		console.log(config, 'config')
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				console.log("执行完成：", response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}

/**
 * 响应拦截
 * <pre>
 *   错误代码一般有两个：response.status(标准)、response.data.code(非标准，code为自定义命名)
 *   两者可能不一致
 *   response=>拦截response.status为100-399类
 *   error=>拦截response.status为非100-399类
 * </pre>
 */
// axios.interceptors.response.use(
//     //后台返回response.status虽为成功
//     response => {
//         console.log(response)
//         if (response.data != null) {
//             const res = response.data
//             if (res.code !== undefined && res.msg !== undefined) {
//                 //response.data.code为错误代码
//                 if (response.status !== 200 || res.code !== 200 || !res.success) {
//                     const code = res.code;
//                     const msg = res.msg || "请联系管理员解决";
//                     showCodeMsg(code, msg);
//                     // return Promise.reject( msg)
//                 }
//                 console.log("ssssss")
//                 return response
//             }
//         }
//         return getErrResultData(response.status, "非系统服务器返回数据格式");
//     },
//     //response.status为错误类的处理
//     error => {
//         console.log(error)
//         let msg;
//         let status = error.response.status;
//         if (error.response.data.code === undefined) console.log('response err:\n' + JSON.stringify(error.response));
//         if (error.response) {
//             const res = error.response.data
//             if (res.code !== undefined && res.msg !== undefined) {
//                 msg = res.msg || "请联系管理员解决";
//                 showCodeMsg(status, msg);
//             } else {
//                 if (status == '404') {
//                     showCodeMsg(404, "请求不存在<br/>" + error.response.config.url);
//                 } else if (String(error.response.data).includes('ECONNREFUSED'))
//                     showMsg('数据服务器离线，请联系管理员');
//                 else showMsg('未知异常，请联系管理员');
//             }
//         } else if (error.message.includes('timeout')) {
//             showMsg('请求超时，请检查网络连接!');
//         } else {
//             showMsg(error.message, 30, '未知异常');
//         }
//         // 下面会在控制台显示“Uncaught (in promise) Error: Request failed with status code XXX"
//         // 错误信息以显示，再抛出异常无意义
//         // return Promise.reject(error.response.data)
//         return getErrResultData(status, "非系统服务器返回数据格式");
//     }
// );

// function showCodeMsg(code, msg) {
//     if (code === 401) {
//         process401();
//         return Promise.reject('无效/过期的会话，请重新登录。')
//     } else if (code === 400) {
//         showMsg(msg, 30, '客户端错误');
//     } else if (code === 403) {
//         showMsg(msg || '权限不足');
//     } else if (code === 404) {
//         showMsg(msg || '请求不存在');
//     } else if (code === 500) {
//         showMsg(msg, 30, '服务器异常');
//     } else if (code === 501) {
//         showMsg(msg || '您的操作被取消或不允许提交');
//     } else {
//         showMsg(msg, 30, '其他异常');
//     }
// }

// /**
//  * 显示信息
//  * @param msg 主信息
//  * @param duration 停留时间，秒。不输入或null默认30
//  * @param auxMsg 小字号显示的附加信息
//  * @param data 携带数据
//  */
// function showMsg(msg, duration, auxMsg, data) {
//     const hasData = data != null && data !== '';
//     const hasAuxMsg = auxMsg != null && auxMsg !== "";
//     let message = "<p><strong>" + msg + "</strong></p>";
//     if (hasData) message += "<br/><p><small>返回数据:" + JSON.stringify(data) + "</small></p>";
//     if (hasAuxMsg) message += "<br/><small><i>" + auxMsg + "</i></small>";
//     if (duration == null) duration = 30000;
//     else duration = duration * 1000;
//     // ElMessage({
//     //     duration: duration,
//     //     showClose: true,
//     //     message: message,
//     //     grouping: true,
//     //     type: 'error',
//     //     dangerouslyUseHTMLString: true,
//     // })
// }

// function process401() {
//     // ElMessageBox.confirm('无效/过期的服务器访问，请重新登录。', '确定登出', {
//     //     confirmButtonText: '重新登录',
//     //     cancelButtonText: '取消',
//     //     type: 'warning'
//     // }).then(() => {
//     //     logout().then(() => {
//     //         location.reload() // 重实例化router
//     //     })
//     // })
// }

// function getErrResultData(code, msg) {
//     return {
//         code: code,
//         msg: msg,
//         success: false,
//         data: null
//     };
// }


export default axios
