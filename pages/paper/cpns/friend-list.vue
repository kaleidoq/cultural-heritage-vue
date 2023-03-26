<template>
	<!-- 小纸条/好友列表 -->
	<view
		class="user-list p-20 flex items-center border-b border-gray-100 animate__animated animate__fadeInLeft animate__fast"
		hover-class="bg-gray-100">
		<image class="user-img mr-20 rounded-full" :src="item.head" mode="aspectFill"></image>
		<view class="flex flex-col flex-1">
			<text class="text-30 font-bold mb-10 pt-20">{{item.nickname}}</text>
			<text class="text-24 font-thin text-gray mb-10 line-1">{{item.introduce}}</text>
			<!-- <view class="iconfont iconxingbie-nan tag-age"
				:class="[item.sex == 0 ? 'iconxingbie-nan' :'iconxingbie-nv girl']">
				<text class="ml-10">{{item.age}}</text>
			</view> -->
		</view>
		<view class="flex" @click="goChat">
			<text class="cuIcon-commentfill text-grey text-32 mr-10"></text>
			<view>聊聊</view>
			<!-- 	<text v-if="!item.is_follow" class="iconfont iconxuanze text-38 text-gray-300"></text>
			<text v-if="item.is_follow" class="iconfont iconxuanze1 text-38 text-green"></text> -->
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
		methods: {
			goChat() {
				console.log(this.item)
				this.$u.route('/pages/paper/chat', {
					user_id: JSON.stringify(this.item.user_id)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 用户列表
	.user-list {
		.user-img {
			width: 100rpx;
			height: 100rpx;
		}

		// 性别图标
		.tag-age {
			background-color: $uni-color-blue;
			color: #FFFFFF;
			font-size: 24rpx;
			padding: 2rpx 10rpx;
			border-radius: 20rpx;
			max-width: 60rpx;

			&.girl {
				background-color: $uni-color-pink;
			}
		}
	}
</style>
