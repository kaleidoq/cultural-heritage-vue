<template>
	<view class="flex flex-col align-center">
		<view class="cuIcon-roundcheck mt-50 mb-30 text-green" style="fontSize: 250rpx;">
		</view>
		<view class="flex">
			<navigator :url="'/pages/order/order_detail?order_id='+order_id"
				class="cu-btn line-olive round lg shadow mt-20 mr-30">
				查看订单
			</navigator>
			<view @tap="toHome" class="cu-btn line-olive round lg shadow mt-20">
				返回首页
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_id: Number
			}
		},
		onLoad(e) {
			console.log(e)
			this.order_id = e.order_id
		},
		methods: {
			toHome() {
				uni.switchTab({
					url: "/pages/home/home"
				})
			}
		}
	}
</script>

<style>

</style>
