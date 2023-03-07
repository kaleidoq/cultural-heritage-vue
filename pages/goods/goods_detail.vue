<template>
	<view>
		<!-- 轮播图 -->
		<u-swiper :list="images" keyName="image" indicator indicatorMode="line" circular showTitle height="400rpx"
			previousMargin="30" nextMargin="30" bgColor="#ffffff"></u-swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				images: []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {}
		}
	}
</script>

<style>

</style>
