const url_all = {
	'DEV': 'http://127.0.0.1/api', // 开发

}
let BASEURL = url_all['DEV']

function getToken() {
	let token = uni.getStorageSync("token");
	// console.log('token', token)
	if (token == null) {
		// 	options.headers = {
		// 		"Authorization": token
		// 	};
		// } else {
		uni.showToast({
			title: "请先进行登录",
			icon: 'error',
			duration: 850
		});
		setTimeout(() => {
			console.log('跳转到登录页面')
			uni.navigateTo({
				url: '/pages/mine/login'
			})
		}, 850)
	}
	return token
}

export const request = (options = {}) => {
	return new Promise((resolve, rejects) => {
		handleRequest(options, resolve, rejects)
	})
}


// 发起请求
function handleRequest(options, resolve, reject) {
	let token = getToken()
	// console.log('option', options)
	uni.request({
		url: BASEURL + options.url,
		method: options.method,
		data: options.data,
		header: {
			"Authorization": token, //自定义请求头信息
			// 'Content-type': options.headers['Content-Type'] || 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		success: (res) => {
			const data = res.data
			// console.log('response', res)
			if (res.statusCode != 200) {
				switch (res.statusCode) {
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
								url: '/pages/mine/login'
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
				}
			} else return resolve(res.data)
		},
		fail: (fail) => {
			console.log('fail', fail)
			return reject(fail);
		}
	})
}


export const upload = (options = {}) => {
	return new Promise((resolve, rejects) => {
		handleUpload(options, resolve, rejects)
	})
}


// 发起请求
function handleUpload(options, resolve, reject) {
	let token = getToken()
	console.log('options', options)
	uni.uploadFile({
		url: BASEURL + options.url,
		filePath: options.data,
		// name: 'file',
		// formData: {
		// 	user: 'test'
		// },
		header: {
			"Authorization": token, //自定义请求头信息
			// 'Content-type': options.headers['Content-Type'] || 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		success: (res) => {
			console.log('response', res)
			setTimeout(() => {
				resolve(res.data.data)
			}, 1000)
		}
	});
}
