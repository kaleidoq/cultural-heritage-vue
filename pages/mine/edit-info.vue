<template>
	<!-- 我的/设置/修改资料 -->
	<view class="edit-info wrap-card">
		<u-cell-group :border='false'>
			<u-cell title="头像" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleHeader">
				<image slot="value" class="header-img" :src="form.head" mode="aspectFill"></image>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="昵称" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleName">
				<view slot="value">
					{{form.nickname}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="性别" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleSex">
				<view slot="value">
					{{sexList[form.sex]}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="生日" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}">
				<view slot="value">
					<uni-datetime-picker ref="birth" type="date" :clear-icon="false" v-model="form.birthday">
						{{form.birthday}}
					</uni-datetime-picker>
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF" @click="handleBirth"></u-icon>
			</u-cell>
			<!-- <u-cell title="情感" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleEmotion">
				<view slot="value">
					{{emoList[form.emotion]}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="职业" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleJob">
				<view slot="value">
					{{jobList[form.job]}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell> -->
			<u-cell title="家乡" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="showCity">
				<view slot="value">
					{{form.address}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="介绍" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleIntroduce">
				<view slot="value">
					{{form.introduce}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
		</u-cell-group>
		<!-- 底部操作 -->
		<view class="wrap-bottom-bar">
			<view class="bar-placeholder"></view>
			<view class="bar-content">
				<u-button :customStyle="btnStyle" :ripple="true" shape="circle" @click="submit">完成</u-button>
			</view>
		</view>
		<!-- 昵称 -->
		<uni-popup ref="inputNameDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="输入昵称" :value="form.nickname" placeholder="请输入内容"
				@confirm="nameConfirm"></uni-popup-dialog>
		</uni-popup>
		<!-- 介绍 -->
		<uni-popup ref="inputIntroDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="输入介绍" :value="form.introduce" placeholder="请输入内容"
				@confirm="introConfirm"></uni-popup-dialog>
		</uni-popup>
		<!-- 城市选择 -->
		<city-picker themeColor="#007AFF" ref="cityPicker" :pickerValueDefault="cityDefault" @onConfirm="confirmCity">
		</city-picker>
	</view>
</template>

<script>
	import {
		getUserInfoList,
		updateUserInfo
	} from "@/utils/api/user.js"
	export default {
		data() {
			return {
				form: {
					head: '',
					nickname: 'MrThinco',
					sex: 0,
					birth: '2020-10-10',
					address: '四川成都',
					introduce: ''
				},
				sexList: ['男', '女', '保密'],
				cityDefault: [0, 0, 1],
				// 按钮配置
				btnStyle: {
					width: "90%",
					height: "75rpx",
					background: "linear-gradient(-45deg,#01906c,#34D399)",
					color: "#FFFFFF",
					fontSize: "30rpx",
				},
			}
		},
		onLoad() {
			this.getUserInfoList()
		},
		methods: {
			async getUserInfoList() {
				const {
					data: res
				} = await getUserInfoList()
				console.log(res)
				res.birthday = uni.$u.date(res.birthday, 'yyyy-mm-dd')
				this.form = res
			},
			// 修改头像
			handleHeader() {
				// 选择图片
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						this.form.avatar = res.tempFilePaths[0]
					}
				})
			},
			// 修改昵称
			handleName() {
				this.$refs.inputNameDialog.open()
			},
			handleIntroduce() {
				this.$refs.inputIntroDialog.open()
			},
			nameConfirm(val) {
				this.form.nickname = val
			},
			introConfirm(val) {
				this.form.introduce = val
			},
			// 修改性别
			handleSex() {
				const _this = this
				uni.showActionSheet({
					itemList: this.sexList,
					success: function(res) {
						_this.form.sex = res.tapIndex
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				})
			},
			// 修改生日
			handleBirth() {
				this.$refs.birthday.show()
			},
			// 修改情感
			handleEmotion() {
				const _this = this
				uni.showActionSheet({
					itemList: this.emoList,
					success: function(res) {
						_this.form.emotion = res.tapIndex
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				})
			},
			// 修改职业
			handleJob() {
				const _this = this
				uni.showActionSheet({
					itemList: this.jobList,
					success: function(res) {
						_this.form.job = res.tapIndex
					},
					fail: function(res) {
						console.log(res.errMsg)
					}
				})
			},
			// 修改城市
			confirmCity(e) {
				console.log('e', e)
				this.form.address = e.label
			},
			showCity() {
				this.$refs.cityPicker.show()
			},
			// 提交
			async submit() {
				const res = await updateUserInfo(this.form)
				console.log(res)
				uni.showToast({
					title: res.msg,
					icon: 'none',
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.edit-info {
		.header-img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			margin-right: 10rpx;
		}
	}
</style>
