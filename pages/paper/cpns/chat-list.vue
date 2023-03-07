<template>
	<!-- 小纸条/聊天列表 -->
	<view class="chat-list">
		<!-- 时间 -->
		<view v-if="formatTime" class="py-20 flex items-center justify-center text-gray-400">
			{{formatTime}}
		</view>
		<!-- 消息 -->
		<view class=" flex items-center px-20 my-20" :class="{'flex-row-reverse': item.user_id != another.user_id}">
			<image class="user-img rounded-full" :src="item.head" mode="aspectFill"></image>
			<view class="chat-bubble mx-20 p-20 rounded-10 bg-gray-100">{{item.content}}</view>
		</view>
	</view>
</template>

<script>
	import $time from '@/utils/lib/time.js'
	export default {
		props: {
			item: Object, // 当前消息
			pretime: [Number, String], // 上一条消息时间
			another: Object
		},
		data() {
			return {
				// uid: 1, // 模拟：当前登录用户id
			}
		},
		computed: {
			// 格式化时间
			formatTime() {
				return $time.getChatTime(new Date(this.item.send_time).getTime(), new Date(this.pretime).getTime())
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.chat-list {
		.user-img {
			width: 100rpx;
			height: 100rpx;
		}

		.chat-bubble {
			max-width: 400rpx;
		}
	}
</style>
