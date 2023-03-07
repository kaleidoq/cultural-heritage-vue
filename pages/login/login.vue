<template>
	<view class="login">

		<!-- 平台区分 登录-->
		<!-- #ifdef MP-WEIXIN -->
		<button class="btn-auth" open-type="getUserInfo" @getuserinfo="wxGetUserInfo"
			withCredentials="true">微信授权获取用户信息</button>
		<!-- #endif -->
		<!-- #ifdef H5 || APP-PLUS-->
		<view class="user-icon">
			<image :src="userImg"></image>
		</view>
		<u-form :model="loginInfo" :rules="loginRules" :errorType="errorType" ref="loginForm">
			<u-form-item label="姓名" labelWidth="50px" prop="username" borderBottom>
				<u-input v-model="loginInfo.username" clearable />
			</u-form-item>
			<u-form-item label="密码" labelWidth="50px" prop="password" borderBottom>
				<u-input v-model="loginInfo.password" clearable />
			</u-form-item>
		</u-form>
		<!-- 登录按钮 -->
		<view class="btn">
			<u-button size="default" :loading="isLogining" :ripple="true" @click="login">
				{{ isLogining ? "登 录 中" : "登 录" }}
			</u-button>
			<u-button size="default" @click="resign">
				注册
			</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
		<!-- #endif -->
		<view class="copy-right">标签</view>
	</view>
</template>

<script>
	// import {
	// 	userLogin
	// } from '../../api'

	export default {
		data() {
			return {
				loginInfo: {
					username: "admin",
					password: "123456",
				},
				// 登录界面的用户图标
				userImg: "../../static/icon/icon-1/user.png",
				// 登录按钮的懒加载
				isLogining: false,
				// 输入框的长度
				pdMaxLength: 100,
				// 验证条件
				loginRules: {
					username: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					password: [{
						required: true,
						message: '请输入密码',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}]
				},
				// 验证错误消息提示
				errorType: ['border-bottom'],
				isFocus: false,
				focus: false
			};
		},
		methods: {

			onReady() {
				// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
				this.$refs.loginForm.setRules(this.loginRules)
			},
			/* focus() {
				this.isFocus = true
			},
			blur() {
				// 失去焦点事件先于清除事件触发，因此让其延迟即可先触发 clearInput 事件
				setTimeout(() => {
					this.isFocus = false
				}, 1)
			}, */

			// 平台区分,登录
			wxGetUserInfo() {
				// #ifdef H5 || APP-PLUS
				uni.getStorage({
					key: 'userinfo',
					success: (res) => {
						this.auth = true;
						this.nickname = res.data.nickname;
						this.thumb = res.data.thumb;
					}
				})
				// #endif
			},
			// 登录按钮
			login() {
				this.isLogining = true
				this.$refs.loginForm.validate(async valid => {
					if (valid) {
						const data = await userLogin(this.loginInfo)
						// console.log(res)
						console.log("data", data)
						sessionStorage.setItem('token', data.token)
						uni.switchTab({
							url: '/pages/index/index'
						})
					} else
						console.log('验证失败');
				})
				this.isLogining = false
			},
			// 微信界面的登录入口
			wxGetUserInfo() {},
			// 跳转注册页面
			resign() {
				// uni.navigateTo({
				// 	url: '/pages/resign/resign'
				// })
			}
		},
	};
</script>

<style lang="scss" scoped>
	.login {
		width: 80%;
		margin: auto;
	}

	.user-icon {
		padding-top: 200rpx;
		margin-bottom: 50rpx;
		width: 100%;
		display: flex;
		justify-content: center;

		>image {
			width: 150rpx;
			height: 150rpx;
		}
	}

	.btn {
		margin-top: 40rpx;

		.login-btn {
			width: 100%;
			border-radius: 20rpx;
			border: $uni-color-primary;
			background-color: $uni-color-primary;
			color: $uni-text-color-inverse;
		}
	}

	.copy-right {
		position: absolute;
		left: 0;
		// bottom: 100rpx;
		bottom: 0;
		width: 100%;
		color: $uni-text-color-grey;
		text-align: center;
		font-size: 24rpx;
	}
</style>
