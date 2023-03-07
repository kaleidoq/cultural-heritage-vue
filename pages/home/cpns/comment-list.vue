<template>
	<view class="comment animate__animated animate__fadeInLeft animate__fast">
		<slot></slot>
		<!-- 头像 -->
		<image class="rounded-full mx-10 head-image" :src="info.user_head" mode="aspectFill">
		</image>
		<view class="flex-1 flex flex-col mx-10">
			<view class="text-30 font-bold text-blue">
				{{info.user_nickname}}
			</view>
			<view class="text-gray-500 mt-10">
				{{info.comment_create_time|gettime}}
			</view>
			<view class="comment-text text-26 my-10" :class="'isComment' ?'':'line-2'">
				{{info.comment_content}}
			</view>
			<view v-if="!isComment" class="comment-replay text-blue flex infos-center justify-between"
				@tap="goComment()">
				<view class="ml-10">
					回复
				</view>
				<!-- <view v-if="info.children.length!=0" class="mr-20">
					共 {{info.children.length}} 条回复 >
				</view> -->
				<view v-if="info.chilCount!=0" class="mr-20">
					共 {{info.chilCount}} 条回复 >
				</view>
			</view>
			<!-- <view class="flex justify-between text-24 my-10">

			</view> -->
		</view>
	</view>

</template>

<script>
	export default {
		name: 'comment-list',
		props: {
			item: Object,
			index: {
				type: [Number, String],
				default: -1
			},
			isComment: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				info: null
			}
		},
		watch: {
			item: {
				handler(val) {
					this.info = val
					console.log(this.info)
				},
				immediate: true
			}
		},
		methods: {
			goComment() {
				if (this.isComment) return // 页，不跳转
				this.$u.route('pages/home/comment', {
					data: JSON.stringify(this.info)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.comment {
		display: flex;
		margin: 20rpx;
		width: 95%;

		.comment-text {
			max-width: calc(100vw - 160rpx);
		}

		.comment-replay {
			height: 40rpx;
		}
	}
</style>
