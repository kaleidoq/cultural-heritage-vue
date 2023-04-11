<template>
	<view>
		<!-- 内容 -->
		<view class='pg'>
			<view class='container bg-white'>
				<view class='container-top'>
					<image :src='image' mode="aspectFill"> </image>
				</view>

				<view class='container-top_rigth'>
					<view class='container-top_rigth_1'><text>{{goods.title}}</text></view>
					<view class='container-top_rigth_2'>
						<view class='container-top_rigth_2_1'>
							<text class='text-price text-red text-xl'>{{goods.price}}</text>
						</view>
						<view v-if="goods.old_price!=null" class='container-top_rigth_2_2'><text
								class='text-price'>{{goods.old_price}}</text></view>
					</view>
				</view>
			</view>

			<!-- 地址 -->
			<view class="flex justify-between text-26 mt-30">
				<view class="flex justify-center align-center ml-20"><text>收货地址</text></view>
				<view class="flex" @tap="selectCgn()">
					<view class="flex flex-col">
						<view class="text-right mb-10">
							<text>{{consignee.name}}</text><text class="ml-20">{{consignee.tel}}</text>
						</view>
						<view class="text-right"><text>{{consignee.region}}
								{{consignee.address}}
							</text>
						</view>
					</view>
					<view style="margin: auto 20rpx;"><text class='cuIcon-right lg text-gray'></text></view>
				</view>

			</view>
			<view class='freight bg-white'>
				<view class='line-freight'></view>


				<!-- <view class='freight-price'>
					<view class='freight-price-1'>运费</view>
					<view><text class='text-price text-red freight-price-1'>0.0</text></view>
				</view> -->

			</view>
		</view>
		<!-- end -->

		<!-- 底部操作栏 -->
		<view class='foot bg-white'>
			<view class='foot-1'><text class='foot-1_1'>实付款:</text><text
					class='text-price text-red foot-1_2'>{{goods.price}}</text></view>
			<view class='foot-2' @click="confim"><text>确定</text></view>
		</view>

		<!-- end -->

	</view>
</template>

<script>
	import {
		getGoods
	} from '@/utils/api/goods.js'
	import {
		getDefCgn,
		initOrder
	} from '@/utils/api/order.js'
	export default {
		data() {
			return {
				goods: {},
				image: '',
				consignee: {},
				actual_price: Number
			}
		},
		onLoad(e) {
			console.log(e)
			this.goods.goods_id = e.goods_id
			this.init(e.goods_id)
		},
		onShow() {
			this.getStore()
		},
		methods: {
			async init(id) {
				const {
					data: goods
				} = await getGoods(id)
				this.goods = goods
				let imgs = goods.images.split(',')
				this.image = imgs[0]
				const {
					data: cgn
				} = await getDefCgn()
				if (cgn) {
					let _region = cgn.region.split(',')
					cgn.region = _region[0]
					this.consignee = cgn
				} else this.getStore()
			},
			getStore() {
				uni.getStorage({
					key: 'selectAddress',
					success: (e) => {
						console.log(e)
						let cgn = e.data
						let _region = cgn.region.label
						cgn.region = _region
						this.consignee = cgn
						uni.removeStorage({
							key: 'saveAddress'
						})
					}
				})
			},
			selectCgn() {
				uni.navigateTo({
					url: "/pages/order/consignee?type=select"
				})
			},

			/**
			 * 确定订单
			 */
			async confim() {
				//发起支付 支付成功跳转 订单详细页面  失败着提示
				console.log(this.goods)
				const {
					data: mes
				} = await initOrder(this.goods.goods_id, this.consignee.cgn_id, this.goods.user_id, this.goods.price)
				console.log(mes)
				//跳转订单页面
				uni.navigateTo({
					url: '/pages/goods/finish_buy?order_id=' + mes,
				})
			},
		}
	}
</script>

<style>
	/* 内容 */
	.pg {
		padding: 20rpx;
	}

	.container {
		padding: 20rpx;
		height: 280rpx;
		width: 100%;
		display: flex;

	}

	.container-top image {
		height: 240rpx;
		width: 230rpx;
	}

	.container-top_rigth {
		margin-left: 20rpx;
	}

	.container-top_rigth_2 {
		display: flex;
		align-items: center;
		margin-top: 110rpx;
	}

	.container-top_rigth_2_2 text {
		margin-left: 20rpx;
		text-decoration: line-through;
		padding-left: 5rpx;
		padding-right: 5rpx;
	}

	.container-top_rigth_1 text {
		font-size: 30rpx;
		font-weight: 550;
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

	}

	/* end */

	/* 地址位置 */

	.freight {
		height: 100rpx;
		width: 100%;
		padding: 20rpx;
	}

	.line-freight {
		width: 100%;
		height: 2rpx;
		background: gainsboro;
	}

	.freight-price {
		display: flex;
		justify-content: space-between;
		margin-top: 25rpx;
	}

	.freight-price-1 {
		font-weight: 600;
	}

	/* end */

	/* 底部栏 */
	.foot {
		position: fixed;
		bottom: 0;
		display: flex;
		width: 100%;
		height: 100rpx;

	}

	.foot-1 {
		width: 70%;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
	}

	.foot-2 {
		background: red;
		width: 30%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.foot-2 text {
		color: white;
	}

	.foot-1_1 {
		font-weight: 600;
		color: black;
	}

	.foot-1_2 {
		padding-left: 10rpx;
		font-weight: 550;
	}

	/* end */
</style>
