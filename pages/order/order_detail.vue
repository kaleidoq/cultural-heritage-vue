<template>
	<view>
		<!-- 步骤条 -->
		<view class="bg-white padding-sm ">
			<view class="cu-steps">
				<view class="cu-item" :class="index>basics?'':'text-green'" v-for="(item,index) in basicsList"
					:key="index">
					<text class="cuIcon-roundcheckfill"></text>
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- end -->


		<!-- 价钱 -->
		<view class='price bg-white'>

			<view class='price-item'>
				<view class="my-30">
					<text class='text-sl text-red text-uni'>￥{{order.price}}</text>
				</view>
				<view class='price-explain'>
					<text>{{basicsList[basics].text}}</text>
				</view>
				<view class='price-explain-1'>
					<!-- <text>
						<text class='text-red'>9</text>
						<text class='text-black'>天</text>
						<text class='text-red'>2</text>
						<text class='text-black'>小时</text>
						<text class='text-red'>21</text>
						<text class='text-black'>分后</text>
					</text> -->
				</view>
				<view class='price-explain-1s text-center'>
					<text>买家仍未确定收货,系统会自动确认,<br />欠款会打到您的微信账户中</text>
				</view>
			</view>
		</view>
		<!-- end -->
		<!-- 分离线 -->
		<view class='line'></view>
		<!-- end -->
		<!-- 物流描述 -->
		<view class='logistics padding bg-white'>
			<view><text class='text-black ml-20'>见面交易，无需物流</text></view>
			<!-- <view><text class='text-blue text-weight' bindtap='toLogisticsDetails'>物流详情</text></view> -->
		</view>
		<!-- end -->
		<!-- 分离线 -->
		<view class='line'></view>
		<!-- end -->
		<!-- 商品描述 -->
		<view class='shoppin_detail bg-white mx-20'>
			<view class='shoppin_detail_img'>
				<image :src="order.cover" mode="aspectFill">
				</image>
			</view>
			<view class='shopping_detail '>
				<view class='shopping_detail_title'>
					<view class='shopping_detail_title_1 text-cut'>
						<text class='text-black text-black'>{{order.goods_title}}</text>
					</view>

					<navigator :url="'/pages/paper/chat?user_id='+order.seller_user_id" class='text-blue text-weight'>
						联系买家</navigator>
				</view>
			</view>
		</view>
		<!-- end -->

		<!-- 分离线 -->
		<view class='line'></view>
		<!-- end -->

		<!-- 交易信息 -->
		<view class='shopping bg-white'>
			<!-- <view class='shopping_desc margin-bottom-xs-15'>
				<text>买家昵称</text>
				<text>{{cgn_name}}</text>
			</view> -->

			<view class='shopping_desc margin-bottom-xs-15'>
				<text>订单编号</text>
				<text>{{order.order_id}}</text>
			</view>

			<view class='shopping_desc margin-bottom-xs-15'>
				<text>交易编号</text>
				<text>213423421342142134234324213</text>
			</view>

			<view class='shopping_desc '>
				<text>交易时间</text>
				<!-- <text>{{order.creat_time|gettime}}</text> -->
				<text>{{order.creat_time|formatTime}}</text>
			</view>

		</view>
		<!-- end -->

		<!-- 分离线 -->
		<view class='line'></view>
		<!-- end -->


		<!-- 确定按钮 -->
		<view class='comfirm bg-white'>

			<button class='bg-green cu-btn margin-tb-sm comfirm_button lg'>提醒买家收货</button>

		</view>
		<!-- end -->

	</view>
</template>

<script>
	import {
		getOrderDesc
	} from '@/utils/api/order.js'
	export default {
		data() {
			return {
				basics: 1, //控制步骤条状态
				// 步骤条
				basicsList: [{
						text: '已经拍下，请尽快付款噢',
						name: '已拍下'
					}, {
						text: '请等待卖家发货噢',
						name: '已付款'
					}, {
						text: '请稍微期待它的到来噢',
						name: '已发货'
					}, {
						text: '这单交易已经完成了噢',
						name: '交易成功'
					}
					// , {
					// 	text: '',
					// 	name: '待评价'
					// }
				],
				order: {}
			}
		},
		onLoad(e) {
			console.log(e)
			this.order_id = e.order_id
			this.init(e.order_id)
		},
		methods: {
			async init(id) {
				const {
					data: item
				} = await getOrderDesc(id)
				console.log(item)
				let imgs = item.goods_images.split(',')
				item.cover = imgs[0]
				this.basics = item.status
				this.order = item
				console.log(this.order)
			}
		}
	}
</script>

<style>
	/* 价钱 */
	.price {
		width: 100%;
		padding: 60rpx;
		height: 380rpx;
	}

	/* end */
	/* price */
	.price-item {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.price-explain text {
		font-size: 32rpx;
		color: gray;
		font-weight: 55;
	}

	.price-explain-1 {
		width: 31%;
		margin-top: 20rpx;
		display: flex;
		align-content: center;
		align-items: center;
	}

	.price-explain-1 text {
		font-size: 25rpx;
		font-weight: 550;

	}

	.price-explain-1s text {
		font-size: 25rpx;
		color: black;
		font-weight: 550;

	}

	.price-explain-1s {
		width: 95%;
	}

	.line {
		width: 100%;
		height: 4rpx;
		background: gainsboro;
	}

	/* end */

	/* 物流信息 */
	.logistics {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 170rpx;
	}

	/* end */

	/* 商品描述 */
	.shoppin_detail {
		display: flex;
		padding: 20rpx;
		height: 250rpx;
		align-items: center;
	}

	.shoppin_detail_img image {
		height: 130rpx;
		width: 130rpx;
	}

	.shopping_detail {
		margin-left: 20rpx;
		width: 100%;
	}

	.shopping_detail-2 {
		margin-top: 20rpx;
	}

	.shopping_detail_title {
		display: flex;
		justify-content: space-between;
		width: 95%;
	}

	.shopping_detail_title_1 {
		width: 75%;
	}

	/* end */

	/* 交易信息 */
	.shopping {
		padding: 30rpx;
		height: 235rpx;
	}

	.shopping_desc {
		display: flex;
		justify-content: space-between;
	}

	.shopping text {
		font-size: 28rpx;
	}

	.margin-bottom-xs-15 {
		margin-bottom: 15rpx;
	}

	/* end */

	/* 确定 */
	.comfirm {
		width: 100%;
		height: 150rpx;
		padding: 20rpx;
	}

	.comfirm_button {
		width: 100%;
	}

	/* end */
</style>
