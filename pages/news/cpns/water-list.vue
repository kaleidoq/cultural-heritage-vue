<template>
	<view>
		<view class="demo-warter  animate__animated animate__fadeInDown animate__fast" v-for="(item, index) in list"
			:key="index">
			<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
			<!-- <u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load> -->
			<!-- 盒子里的具体内容 -->
			<view class="water-item" @tap="toDetail(item.goods_id)">

				<image class="image" shape="square" border-radius="25rpx" :src="item.cover" mode="widthFix">
					<!-- <u-loading slot="loading"></u-loading> -->
				</image>

				<view class="text-30 mt-10 line-1">{{item.title}}</view>
				<!-- <view class="text-28 mt-10 line-1">
				{{item.content}}
			</view> -->
				<view class="flex flex-row justify-end mt-20 text-red mr-20">
					<view class="">
						￥
					</view>
					<view class="text-34">
						{{item.price}}
					</view>
				</view>
			</view>
			<view class="flex flex-row mt-10 items-center">
				<u-avatar size="30" :src="item.user.head"></u-avatar>
				<view class="text-28 mx-30 line-1 ">{{item.user.nickname}}</view>

				<!-- <view class="btn-like">
				<text class="lg text-gray cuIcon-appreciate padding-lr-xs"></text>
				{{item.like_count}}
			</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'WaterList',
		props: {
			list: {
				type: Array,
				default: () => ({})
			},
			// loadStatus: {
			// 	type: String,
			// 	default: 'loadmore'
			// }
		},
		data() {
			return {

			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				console.log(this.item)
			},
			toDetail(id) {
				uni.navigateTo({
					url: "/pages/goods/goods_detail?goods_id=" + id
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	// 左右两个盒子
	.demo-warter {
		width: 320rpx;
		// padding-left: 20rpx;
		border-radius: 12px;
		padding: 10px 0;
	}

	.water-item {
		// width: 100%;

		.image {
			// padding: 10rpx;
		}

		.title {
			font-size: 30rpx;
		}
	}
</style>
