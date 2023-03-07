<template>
	<view>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-back text-gray" @tap="back"></text>
			</view>
			<view class="content text-bold">
				<!-- 这里显示该页面的名字！！！ -->
				<slot></slot>
			</view>
			<view class="action">
				<text class="cuIcon-more"></text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "tab-top",
		data() {
			return {

			};
		},
		methods: {
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style>

</style>
