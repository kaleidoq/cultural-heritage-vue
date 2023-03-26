<template>
	<view class="flex justify-center">
		<view class="fixed" style="bottom: 150rpx;">
			<view class="flex flex-col justify-around">
				<button @tap="toUrl('article')" class="cu-btn line-green round lg shadow mt-20 p-40">
					发布帖子</button>
				<button @tap="toUrl('good')" class="cu-btn line-green round lg shadow mt-20 p-40">
					发布商品</button>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {}
		},

		methods: {
			toUrl(type) {
				if (type == "article")
					uni.navigateTo({
						url: "/pages/home/release"
					})
				else
					uni.navigateTo({
						url: "/pages/home/release_good"
					})
			}
		}
	}
</script>

<style>

</style>
