<style lang="scss">
	/* 每个页面公共css */
	/* uViewUI */
	@import "@/uni_modules/uview-ui/index.scss";
	/* uni-ui库 */
	// @import '/static/css/uni.css';
	/* 图标库 */
	@import "/static/css/iconfont.css";
	/* 动画库 */
	@import "/static/css/animate.css";
	/* 样式库 */
	@import '/static/css/thinco.scss';

	// colorui
	@import "/static/colorui/icon.css";
	@import "/static/colorui/main.css";

	/* #ifdef H5 */
	/* 针对h5页面取消返回按钮 */
	uni-page[data-page="pages/paper/friend"] .uni-page-head-hd {
		display: none;
	}

	/* #endif */
	// 隐藏小程序滚动条（无用）
	/* #ifdef MP-WEIXIN */
	::-webkit-scrollbar {
		display: none;
	}

	/* #endif */
</style>

<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 网络监听
			this.$tool.getNetwork()
			this.$tool.onNetwork()
			// #ifdef APP-PLUS
			// 检测更新
			// this.$tool.update()
			// 获取网络状态
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		created() {
			// uni.request({
			// 	url: '/',
			// 	method: 'GET',
			// 	// data: options.data,
			// 	header: {
			// 		// "Authorization": token, //自定义请求头信息
			// 		// 'Content-type': options.headers['Content-Type'] || 'application/x-www-form-urlencoded;charset=UTF-8'
			// 	},
			// 	success: (res) => {
			// 		// const data = res.data
			// 		console.log('response', res)
			// 		return resolve(res.data)
			// 	},
			// 	fail: (fail) => {
			// 		console.log('fail', fail)
			// 		return reject(fail);
			// 	}
			// })
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
