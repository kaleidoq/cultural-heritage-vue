<template>
	<!-- 小纸条列表 -->
	<view class="paper-item flex items-center p-20 border-b border-gray-100" hover-class="bg-gray" @click="goChat">
		<image class="item-img mr-20 rounded-full" :src="item.head" mode=""></image>
		<view class="flex-1 flex flex-col">
			<view class="flex justify-between items-center">
				<text class="text-30">{{item.nickname}}</text>
				<text class="text-28 text-gray-500">{{item.last_chat_time|gettime}}</text>
			</view>
			<view class="flex justify-between items-center text-26 text-gray-500">
				<text class="item-content line-1">{{item.content}}</text>
				<u-badge type="error" max="99" :value="item.unread_count"></u-badge>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {

			}
		},
		methods: {
			goChat() {
				console.log(this.item)
				this.$u.route('/pages/paper/chat', {
					user_id: JSON.stringify(this.item.another_id)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.paper-item {
		.item-img {
			width: 80rpx;
			height: 80rpx;
		}

		.item-content {
			max-width: 500rpx;
		}
	}
</style>
