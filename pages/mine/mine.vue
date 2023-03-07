<template>
	<!-- 我的 -->
	<view class="my">
		<!-- 状态栏 -->
		<view class="status-bar bg-white pt-30"></view>
		<!-- 头像栏 -->
		<view class="flex items-center wrap-card" hover-class="bg-gray-100" @click="$u.route('/pages/mine/set')">
			<image class="header-img" :src="info.head" mode="" @click.stop="$u.route('/pages/mine/user-space')"></image>
			<view class="flex flex-col flex-1 px-20">
				<text class="text-32 font-bold">{{info.nickname}}</text>
				<text class="text-28 text-gray-500 mt-10">总帖子&nbsp;{{articleNum}}&nbsp;&nbsp;</text>
			</view>
			<text class="iconfont iconqianjin"></text>
		</view>
		<!-- 统计栏 -->
		<view class="wrap-card flex items-center justify-around">
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
		</view>
		<!-- 广告位 -->
		<!-- <view class="wrap-card">
			<image class="adv-img rounded-20" src="../../static/img/list/05.svg" mode="aspectFill"></image>
		</view> -->
		<!-- 设置 -->
		<u-cell-group :border='false'>
			<u-cell title="个人空间" isLink size="large" :border='false' @click="goPage('user-space')">
				<text slot="icon" class="iconfont iconhuiyuan"></text>
			</u-cell>
			<u-cell title="收藏" isLink size="large" :border='false' @click="goPage('collection')">
				<text slot="icon" class="iconfont iconshoucang"></text>
			</u-cell>

			<u-cell title="创作中心" isLink size="large" :border='false' @click="goPage('myWork')">
				<text slot="icon" class="iconfont iconshezhi1"></text>
			</u-cell>
			<!-- #ifdef MP-WEIXIN -->
			<u-cell title="设置" isLink size="large" :border='false' @click="goPage('set')">
				<text slot="icon" class="iconfont iconshezhi1"></text>
			</u-cell>
			<!-- #endif -->
		</u-cell-group>
	</view>
</template>

<script>
	import {
		getMineInfo
	} from "@/utils/api/user.js"
	export default {
		data() {
			return {
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my {

		.header-img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
		}

		.adv-img {
			height: 200rpx;
			width: 100%;
		}
	}
</style>
