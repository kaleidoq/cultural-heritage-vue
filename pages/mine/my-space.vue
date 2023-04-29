<template>
	<!-- 我的/个人空间 -->
	<view class="user-space">
		<!-- <image class="w-full" :src="backgroundImg" mode="widthFix"></image>
		<view class="flex w-full h-full top-1-4 rounded-30 bg-white align-center flex-col absolute"> -->
		<!-- <view class="head">
				<image class="flex space-head relative rounded-full" :src="info.head"></image>
			</view>
			<view class="text-40">
				{{info.nickname}}
			</view>
			<view class="text-26  my-20">
				{{info.introduce}}
			</view> -->

		<!-- 标签切换 -->
		<!-- <u-sticky bgColor="#fff">
				<view class="nav-center">
					<view :class="{'active':tabIndex === index}" @click="changeTab(index)"
						v-for="(item,index) in tabList" :key="index">
						<view class="nav-title">
							{{item.name}}
						</view>
					</view>
				</view>
			</u-sticky> -->
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
		<scroll-view :scroll-top="tabList[tabIndex].scrollTops" class="w-full h-full" scroll-y
			@scrolltolower="reachBottom" @scroll="scroll">
			<!-- 无内容 -->
			<template v-if="list==null || list.length<=0">
				<u-empty text="本来无一物,何处惹尘埃" icon="/static/img/demo/winter.svg" textSize="16" marginTop='25%'
					mode="list"></u-empty>
			</template>
			<!-- 有内容 -->
			<template v-else>
				<!-- 列表 -->
				<view class="flex flex-col w-full">
					<!-- 帖子列表 -->

					<info-list :item="item" v-for="(item,index) in list" :key="index" :index="index" :isUSer="false"
						:isShowSpace="false">
						<template #bottom>
							<view class="border-title">
								<view class="flex justify-end mx-20" @click="delectArticle(item.article_id)">
									删除
								</view>
							</view>
						</template>
					</info-list>
					<u-loadmore :status="loadStatus"></u-loadmore>
				</view>
			</template>
		</scroll-view>

	</view>
	</view>
</template>

<script>
	import {
		getUserInfo,
		getUserArticle
	} from "@/utils/api/user.js"
	import {
		delectArticle
	} from "@/utils/api/article.js"
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
						loadStatus: 'loadmore',
						scrollTops: 0,
						scrollTop: 0,
					},
					{
						name: "商品",
						loadStatus: 'loadmore',
						scrollTops: 0,
						scrollTop: 0,
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
				if (data != null) this.info.user_id = 0
				this.getUserInfo()
				this.getUserArticle()
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
				// console.log(res)
				// this.tabList[this.tabIndex].push({
				// 	list: res
				// })
				// this.tabList[this.tabIndex].list = res
				res.map(item => {
					this.list.push(item)
				})
				// this.list = res
				if (this.list.length < 10) {
					this.tabList[this.tabIndex].loadStatus = 'nomore'
				}
				// console.log(this.tabList[this.tabIndex])

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
			},
			async delectArticle(id) {

				const {
					data: res
				} = await delectArticle(id)
				console.log(res)
				uni.showToast({
					title: res,
					icon: 'none',
				})
				this.getUserArticle()
			},
			// scroll-view到底部加载更多
			reachBottom() {
				// 是否可加载
				if (this.tabList[this.tabIndex].loadStatus !== 'loadmore') return
				// 加载中
				this.tabList[this.tabIndex].loadStatus = "loading"
				setTimeout(() => {
					this.getUserArticle()
				}, 1000);
			},
			// 滚动触发
			scroll(e) {
				const index = this.tabIndex
				this.tabList[index].scrollTop = e.detail.scrollTop // 400显示回到顶部
			},
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
			width: 100vw;
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
