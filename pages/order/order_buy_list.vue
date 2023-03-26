<template>
	<view>
		<!-- 内容 -->
		<view class='pa'>
			<view class='container bg-white shadow-warp' v-for="(item,index) in orderList" :key="index">
				<navigator class='container-top' :url="'/pages/order/order_detail?order_id='+item.order_id">
					<view class='container-top-1'>
						<image :src="item.cover" mode="aspectFill"></image>
					</view>
					<view class='container-top-2'>
						<view class='container-top-2_1 text-cut'>
							<text>{{item.goods_title}}</text>
						</view>
						<view class='container-top-2_2'><text class='text-price text-sm text-red'>{{item.price}}</text>
						</view>
						<view>
							<text class='cuIcon-time lg text-gray'></text>
							<text class='text-xxm'>{{statusList[item.status]}}</text>
						</view>
					</view>
				</navigator>

				<view class='container-line'></view>

				<view class='container-under'>
					<view class='container-under-1 flex'>
						<text class='cuIcon-message font-size-lg text-black'></text>
						<navigator :url="'/pages/paper/chat?user_id='+item.seller_user_id"
							class='text-sm text-black text-blue'>
							联系买家</navigator>
					</view>
					<view class='container-under-2'>
						<view v-if="item.status===0" class="cu-tag line-green padding">去付款</view>
						<view v-if="item.status===1" class="cu-tag line-green padding">等待发货</view>
						<view v-if="item.status===2" class="cu-tag line-green padding">确认收货</view>
					</view>
					<view>
						<!-- <view class="cu-tag line-black padding">…</view> -->
						<view class="cu-tag line-green padding">…</view>
					</view>
				</view>

			</view>

		</view>

		<!-- end -->

	</view>
</template>

<script>
	import {
		queryOrder
	} from '@/utils/api/order.js'
	export default {
		data() {
			return {
				statusList: ["未支付", "等待卖家发货", "等待收货", "已收到"],
				orderList: []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			async init() {
				const {
					data: list
				} = await queryOrder()
				// console.log(list)
				// this.orderList = list
				list.map((item) => {
					let imgs = item.goods_images.split(',')
					item.cover = imgs[0]
					this.orderList.push(item)
				})
				// console.log(list)
				console.log(this.orderList)
			}
		}
	}
</script>

<style scoped>
	/* pages/my/my_sale/my_sale.wxss */

	.pa {
		padding: 20rpx;
	}

	/* 内容 */
	.container {
		padding: 20rpx;
		height: 300rpx;
		width: 100%;
		margin-bottom: 20rpx;
	}

	.container-top-2 {
		margin-left: 20rpx;
		width: 120%;

	}

	.container-top-1 image {
		width: 150rpx;
		height: 150rpx;
	}

	.container-top {
		display: flex;
		align-items: center;

	}

	.container-top-2_1 {
		margin-bottom: 20rpx;
		width: 50%;
	}

	.container-top-2_1 text {
		font-weight: 600;
	}

	.container-top-2_2 {
		margin-bottom: 20rpx;
	}

	.container-top-2_2 text {
		font-size: 25rpx;
		font-weight: 750;
	}

	.text-xxm {
		font-size: 22rpx;
		color: gray;
		padding-left: 10rpx;
	}

	.container-line {
		width: 95%;
		height: 3rpx;
		background: gainsboro;
		margin-top: 25rpx;
	}

	.container-under {
		display: flex;
		margin-top: 25rpx;
		align-items: center;
	}

	.font-size-lg {
		font-size: 35rpx;
		padding-right: 10rpx;

	}

	.container-under-1 {
		width: 65%;
	}

	.container-under-2 {
		margin-right: 20rpx;
	}

	/* end */
</style>
