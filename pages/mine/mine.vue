<template>
	<!-- 我的 -->
	<view class="flex-col">
		<!-- 状态栏 -->
		<view class="UCenter-bg" :style="{ backgroundImage: `url(${imgBackground})` }" catchtap='toMy_detail'>
			<!-- <image src="" class="png"></image> -->
		</view>
		<!-- 个人信息 -->
		<navigator class="flex w-full h-full top-1-3 rounded-30 bg-white align-center flex-col" url="/pages/mine/set">
			<view class="head">
				<image class="flex space-head relative rounded-full" :src="info.head"></image>
			</view>
			<view class="text-40">
				{{info.nickname}}
			</view>
			<view class="text-26  my-20">
				{{info.introduce}}
			</view>
		</navigator>
		<!-- 头像栏 -->
		<!-- <view class="flex items-center wrap-card" hover-class="bg-gray-100" @click="$u.route('/pages/mine/set')">
			<image class="header-img" :src="info.head" mode="" @click.stop="$u.route('/pages/mine/user-space')"></image>
			<view class="flex flex-col flex-1 px-20">
				<text class="text-32 font-bold">{{info.nickname}}</text>
				<text class="text-28 text-gray-500 mt-10">总帖子&nbsp;{{articleNum}}&nbsp;&nbsp;</text>
			</view>
			<text class="iconfont iconqianjin"></text>
		</view> -->
		<!-- 统计栏 -->

		<view class="padding flex text-center text-grey bg-white shadow-warp">

			<view class="flex flex-sub flex-direction solid-right" bindtap='toPraise'>
				<view class="text-xxl text-orange">{{articleNum}}</view>
				<view class="margin-top-sm">
					<text class="cuIcon-newfill"></text> 帖子
				</view>
			</view>
			<view class="flex flex-sub flex-direction solid-right" bindtap='toAttention'>
				<view class="text-xxl text-blue">{{followNum}}</view>
				<view class="margin-top-sm">
					<text class="cuIcon-favorfill"></text>关注数
				</view>
			</view>
			<view class="flex flex-sub flex-direction" bindtap='toFans'>
				<view class="text-xxl text-green">{{fanNum}}</view>
				<view class="margin-top-sm">
					<text class="cuIcon-fork"></text>粉丝数
				</view>
			</view>

		</view>
		<!-- 设置详细 -->
		<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
			<view class="cu-item arrow">
				<view class="content" @tap="goPage('my-space')">
					<text class="cuIcon-moneybagfill text-red"></text>
					<text class="text-grey">我的发布</text>
					<!-- <text class='ml-20 num'>{{articleNum}}</text> -->
				</view>
			</view>

			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url='/pages/goods/goods-list'>
					<text class="cuIcon-titles text-green"></text>
					<text class="text-grey">我的商品</text>
					<!-- <text class='ml-10 num'>99</text> -->
				</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="/pages/order/order_buy_list">
					<text class="cuIcon-formfill text-green"></text>
					<text class="text-grey">我买到的</text>
					<!-- <text class='ml-10 num'>1</text> -->
				</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator url="/pages/order/consignee" class="content" hover-class="none">
					<text class="cuIcon-locationfill text-grey"></text>
					<text class="text-grey">收货地址</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<view class="content" bindtap="toCollect" @click="goPage('collection')">
					<text class="cuIcon-favorfill text-red"></text>
					<text class="text-grey">我的收藏</text>
					<!-- <text class='ml-10 num'>39</text> -->
				</view>
			</view>
			<view class="cu-item arrow">
				<button class="cu-btn content" open-type="feedback">
					<text class="cuIcon-writefill text-cyan"></text>
					<text class="text-grey">意见反馈</text>
				</button>
			</view>
			<view class="cu-item arrow content">
				<button class='cu-btn content' @click="clearAllStore">
					<text class="cuIcon-creativefill text-orange"></text>
					<text class="text-grey">清除缓存</text>
				</button>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url='/pages/message/message_chat/message_chat' hover-class="none">
					<text class="cuIcon-evaluate_fill text-orange"></text>
					<text class="text-grey">客服中心</text>
				</navigator>
			</view>
		</view>
		<!-- <view class="wrap-card flex items-center justify-around">
			<view class="flex flex-col items-center justify-center">
				<view class="text-30 font-bold">
					帖子
				</view>
				<view class="text-28 text-gray-500 mt-10">
					{{articleNum}}
				</view>
			</view>
			<view class="flex flex-col items-center justify-center">
				<view class="text-30 font-bold">
					关注
				</view>
				<view class="text-28 text-gray-500 mt-10">
					{{followNum}}
				</view>
			</view>
			<view class="flex flex-col items-center justify-center">
				<view class="text-30 font-bold">
					粉丝
				</view>
				<view class="text-28 text-gray-500 mt-10">
					{{fanNum}}
				</view>
			</view>
			<view class="flex flex-col items-center justify-center">
				<view class="text-30 font-bold">
					商品
				</view>
				<view class="text-28 text-gray-500 mt-10">
					0
				</view>
			</view>
		</view> -->
		<!-- 广告位 -->
		<!-- <view class="wrap-card">
			<image class="adv-img rounded-20" src="../../static/img/list/05.svg" mode="aspectFill"></image>
		</view> -->
		<!-- 设置 -->
		<!-- <u-cell-group :border='false'>
			<u-cell title="个人空间" isLink size="large" :border='false' @click="goPage('my-space')">
				<text slot="icon" class="iconfont iconhuiyuan"></text>
			</u-cell>
			<u-cell title="收藏" isLink size="large" :border='false' @click="goPage('collection')">
				<text slot="icon" class="iconfont iconshoucang"></text>
			</u-cell>

			<u-cell title="创作中心" isLink size="large" :border='false' @click="goPage('myWork')">
				<text slot="icon" class="iconfont iconshezhi1"></text>
			</u-cell> -->
		<!-- #ifdef MP-WEIXIN -->
		<!-- <u-cell title="设置" isLink size="large" :border='false' @click="goPage('set')">
				<text slot="icon" class="iconfont iconshezhi1"></text>
			</u-cell> -->
		<!-- #endif -->
		<!-- </u-cell-group> -->
	</view>
</template>

<script>
	import {
		getMineInfo
	} from "@/utils/api/user.js"
	export default {
		data() {
			return {
				imgBackground: '/static/img/background.jpg',
				info: [],
				articleNum: 0,
				followNum: 0,
				fanNum: 0,
				collectNum: 0,
				// 统计列表
				countList: [{
						num: this.articleNum,
						name: '帖子'
					},
					{
						num: this.fanNum,
						name: '粉丝'
					},
					{
						num: this.collectNum,
						name: '收藏'
					},
					{
						num: 750,
						name: '商品'
					}
				],
				// 设置列表
				setList: [{
						icon: 'iconhuiyuan',
						name: '个人空间',
						url: 'user-space'
					},
					{
						icon: 'iconliulan',
						name: '浏览历史'
					},
					{
						icon: 'iconrenzheng',
						name: '社区认证'
					},
					{
						icon: 'iconshenhe',
						name: '审核帖子'
					},
					// #ifdef MP-WEIXIN
					{
						icon: 'iconshezhi1',
						name: '我的设置',
						url: 'set'
					}
					// #endif
				]
			}
		},
		// 监听导航栏按钮点击
		onNavigationBarButtonTap() {
			this.goSet()
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			async getInfo() {
				const {
					data: res
				} = await getMineInfo()
				this.info = res[0]
				this.followNum = res[1].followNum
				this.fanNum = res[2].fanNum
				this.articleNum = res[3].articleNum
				this.collectNum = res[4].collectNum
				console.log(res)
			},
			goSet() {
				this.$u.route('/pages/mine/set')
			},
			goPage(url) {
				if (url) this.$u.route('/pages/mine/' + url)
			},
			// 清除全部缓存
			clearAllStore: function(res) {
				uni.showModal({
					title: '清除缓存',
					content: '是否要清除全部缓存!',
					success: function(res) {
						if (res.confirm) {
							uni.clearStorage({
								success: function(res) {
									uni.showToast({
										title: '清除成功',
										duration: 1000
									})
								},
								fail: function(res) {
									uni.showToast({
										title: '清除失败',
										icon: 'none',
										duration: 1000
									})
								}
							});
						}

					}

				})

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
			top: -80rpx;
		}
	}

	// .my {

	// 	.header-img {
	// 		width: 100rpx;
	// 		height: 100rpx;
	// 		border-radius: 100%;
	// 	}

	// 	.adv-img {
	// 		height: 200rpx;
	// 		width: 100%;
	// 	}
	// }

	.UCenter-bg {
		// background-image: url();
		background-size: cover;
		height: 450rpx;
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 200rpx;
		height: 200rpx;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}
</style>
