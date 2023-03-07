<template>
	<!-- 我的/个人空间 -->
	<view class="user-space">
		<image class="w-full" :src="backgroundImg" mode="widthFix"></image>
		<view class="flex w-full h-full top-1-4 rounded-30 bg-white align-center flex-col absolute">
			<view class="head">
				<image class="flex space-head relative rounded-full" :src="info.head"></image>
			</view>
			<view class="text-40">
				{{info.nickname}}
			</view>
			<view class="text-26  my-20">
				{{info.introduce}}
			</view>
			<view class="flex flex-row w-50 justify-around my-20">
				<view class="flex-1 flex flex-col items-center justify-center">
					<text class="font-bold text-32">12</text>
					<text class="text-26">粉丝</text>
				</view>
				<view class="flex-1 flex flex-col items-center justify-center">
					<text class="font-bold text-32">12</text>
					<text class="text-26">关注</text>
				</view>
				<view class="flex-1 flex flex-col items-center justify-center">
					<text class="font-bold text-32">12</text>
					<text class="text-26">发帖</text>
				</view>

			</view>
			<view class="flex justify-around w-80 mb-20">
				<template>
					<view v-if="is_follow" @click="follow(false)" class="cu-btn bg-gray-100 shadow font-light sm">
						<text>已经关注啦</text>
					</view>
					<view v-else @click="follow(true)" class="cu-btn bg-gray-100 shadow sm">
						<text>给个关注吧</text>
					</view>
				</template>
				<view class="cu-btn bg-gray-100 shadow sm" @tap="$u.route('/pages/paper/chat',{user_id:info.user_id})">
					一起聊聊吧</view>
			</view>
			<!-- 标签切换 -->
			<u-sticky bgColor="#fff">
				<view class="nav-center">
					<view :class="{'active':tabIndex === index}" @click="changeTab(index)"
						v-for="(item,index) in tabList" :key="index">
						<view class="nav-title">
							{{item.name}}
						</view>
					</view>
				</view>
			</u-sticky>
			<!-- 列表内容 -->
			<view v-if="tabIndex === 0">
				<!-- <view class="p-30 border-b">
					<view class="text-30 mb-20">
						个人信息
					</view>
					<view class="text-28 my-10">
						性别：<text class="text-gray-500">魔杰座</text>
					</view>
					<view class="text-28 my-10">
						年龄：<text class="text-gray-500">UI设计</text>
					</view>
					<view class="text-28 my-10">
						故乡：<text class="text-gray-500">中国</text>
					</view>
					<view class="text-28">
						个人介绍：<text class="text-gray-500">未婚</text>
					</view>
					<view class="text-28">
						简介：
						<text class="text-gray-500">你的倒影是我带不走的风景，就像居无定所的云还在旅行！</text>
					</view>
				</view> -->
			</view>
			<view class="flex flex-col w-full" v-else>
				<!-- 帖子列表 -->
				<info-list :item="item" v-for="(item,index) in list" :key="index" :index="index" @mark="handleMark"
					:isUSer="false">
				</info-list>
				<u-loadmore :status="loadStatus"></u-loadmore>
			</view>
			<!-- 顶部弹窗 -->
			<u-popup :show="showPopup" @close="showPopup = false" mode="top" :safeAreaInsetTop="true">
				<view class="flex justify-center items-center text-30 py-20 border-b" hover-class="bg-gray"
					@click="popupHandle('friend')">
					<text class="iconfont iconpinglun mr-20"></text>拉黑用户
				</view>
				<view class="flex justify-center items-center text-30 py-20" hover-class="bg-gray"
					@click="popupHandle('clear')">
					<text class="iconfont iconliaotian mr-20"></text>马上聊天
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	// import {
	// 	newsList
	// } from "@/utils/data/data.js"
	import {
		getUserInfo,
		getUserArticle,
		getFollow,
		setFollow
	} from "@/utils/api/user.js"
	import InfoList from "@/pages/home/cpns/info-list.vue"
	export default {
		components: {
			InfoList
		},
		data() {
			return {
				showPopup: false,
				backgroundImg: '/static/img/background.jpg',
				info: [],
				// 导航标签
				tabIndex: 1,
				list: [],
				is_follow: Boolean,
				tabList: [{
						name: "主页",
					},
					{
						name: "帖子",
						loadStatus: 'loadmore'
					},
					{
						name: "动态",
						loadStatus: 'loadmore'
					}
				],
			}
		},
		computed: {
			loadStatus() {
				return this.tabList[this.tabIndex].loadStatus
			}
		},
		// 监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e) {
			switch (e.index) {
				case 0:
					// 打开菜单功
					this.showPopup = true
					break
			}
		},
		onLoad(e) {
			console.log(e)
			e && this.init(e)
		},
		methods: {
			// 初始化
			init(data) {
				if (data != null) this.info.user_id = data.user_id
				this.getUserInfo()
				this.getFollow()
				this.list = this.getUserArticle()
			},
			// 获得某位用户的具体信息
			async getUserInfo() {
				const {
					data: res
				} = await getUserInfo({
					user_id: this.info.user_id
				})
				console.log(res)
				this.info = res
			},
			// 获得某位用户的全部文章信息
			async getUserArticle() {
				const {
					data: res
				} = await getUserArticle({
					user_id: this.info.user_id
				})
				console.log(res)
				// this.tabList[this.tabIndex].push({
				// 	list: res
				// })
				// this.tabList[this.tabIndex].list = res
				this.list = res
				console.log(this.tabList[this.tabIndex])
				return res
			},
			async getFollow() {
				console.log(this.info.user_id)
				const {
					data: res
				} = await getFollow({
					follower_id: this.info.user_id
				})
				console.log(res)
				this.is_follow = res.is_follow
				console.log(this.is_follow)
			},
			// 关注
			async follow(value) {
				const data = await setFollow({
					flag: value,
					follower_id: this.info.user_id
				})
				// this.info.is_follow = !this.info.is_follow
				console.log(data)
				this.is_follow = value
				console.log(this.is_follow)
				const title = value ? '关注成功' : '取消成功'
				uni.showToast({
					title,
					icon: 'none',
				})
			},
			// tabbar点击
			changeTab(index) {
				this.tabIndex = index
				this.swiperIndex = index
				switch (index) {
					case 1:
						// this.list = this.getUserArticle()
						break;
					case 2:
						break
				}
			},
			// 关注
			handleFollow(item) {
				this.tabList[this.tabIndex].list[item.index].isFollow = item.value
				const title = item.value ? '关注成功' : '取消成功'
				uni.showToast({
					title,
					icon: 'none',
				})
			},
			goChat() {
				this.$u.router('/pages/paper/chat&user_id=' + this.info.user_id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head {
		height: 80rpx;

		.space-head {
			width: 150rpx;
			height: 150rpx;
			top: -100rpx;

		}
	}


	.user-space {
		.header {
			position: relative;

			.header-img {
				width: 180rpx;
				height: 180rpx;
				border-radius: 100%;
			}

			.handle-icon {
				position: absolute;
				right: -10rpx;
				top: -20rpx;
				color: #fff;
				background: #4B5563;
				opacity: 0.8;
				padding: 12rpx;
				border-radius: 100%;
			}
		}

		.nav-center {
			height: 80rpx;
			width: 100%;
			text-align: center;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			background-color: #fff;

			.nav-title {
				height: 80rpx;
				line-height: 80rpx;
				width: 120rpx;
				font-size: 30rpx;
				padding: 0 15rpx;
				font-weight: bold;
				color: $uni-text-color-gray;
			}

			.active {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;

				.nav-title {
					color: $uni-color-green;
				}
			}

		}
	}
</style>
