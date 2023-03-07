<template>
	<!-- 首页/详情页 -->
	<!-- h5 滚动穿透不需要处理，wx、app 需要 使用 page-meta 组件配合阻止滚动穿透 -->
	<page-meta :page-style="'overflow:'+(showShare?'hidden':'visible')"></page-meta>
	<view class="detail">
		<!-- 详细信息 -->
		<info-list :item="info" isDetail @mark="handleMark" @comment="handleComment" @share="handleShare"
			@follow="handleFollow">
			<view class="text-30 my-20 text-gray-600">{{info.content}}</view>
			<view>
				<!-- 	<image class="w-full" v-for="(item,index) in info.images" :key="index" :src="item" mode="aspectFill"
					@click="handlePreview(index)"></image> -->
			</view>
		</info-list>
		<u-gap height="20" bgColor="#F9FAFB"></u-gap>
		<view class="p-20 text-30 font-bold">
			最新评论<text class="ml-10">{{info.comment_count}}</text>
		</view>
		<!-- 评论列表 -->
		<view v-for="(item,index) in commentList" :key="index">
			<!-- 头像 -->
			<!-- <image class="rounded-full mx-10 head_image" :src="item.user_head" mode="aspectFill">
			</image>
			<view class="flex-1 flex flex-col mx-10">
				<view class="text-28 font-bold text-blue">
					{{item.user_nickname}}
				</view>
				<view class="text-gray-500">
					{{item.comment_create_time}}
				</view>
				<view class="comment-text text-26 line-2 my-10">
					{{item.comment_content}}
				</view>
				<view class="comment-replay text-blue flex items-center justify-between">
					<view>{{item.comment_count}}条回复</view>
					<view class="content-end text-blue mr-30">
						回复
					</view>
				</view>
				<view class="flex justify-between text-24 my-10">

				</view>
			</view> -->
			<comment-list :item="item"></comment-list>
		</view>
		<bottom-input v-if="showComment" @submit="submit"></bottom-input>
		<!-- 分享功能 -->
		<popup-share :show.sync="showShare"></popup-share>
		<!-- 底部操作栏 -->
		<view class="bottom-input">

		</view>

	</view>

</template>

<script>
	import {
		getArticle,
		getComment,
		submitComment,
	} from '@/utils/api/article.js'
	import {
		setFollow
	} from '@/utils/api/user.js'
	import InfoList from "@/pages/home/cpns/info-list.vue"
	import commentList from "@/pages/home/cpns/comment-list.vue"
	export default {
		components: {
			InfoList,
			commentList
		},
		data() {
			return {
				showComment: true, // 评论
				showShare: false, // 分享
				info: {},
				commentList: []
			}
		},
		onLoad(e) {
			console.log(e.data)
			e.data && this.init(JSON.parse(e.data))
		},
		// 监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e) {
			switch (e.index) {
				case 0:
					// 分享
					this.showShare = true
					break;
			}
		},
		onBackPress() {
			this.showShare = false
		},
		// 监听：小程序中用户点击分享
		onShareAppMessage() {
			return {
				title: this.info.title,
				path: '/pages/home/detail?data=' + JSON.stringify(this.info)
			}
		},
		methods: {
			// 初始化
			async init(data) {
				console.log(data)
				const {
					data: res
				} = await getArticle({
					article_id: data.article_id
				})
				if (res.image != null) {
					res.images = res.image.split(",")
				}
				console.log(res)
				this.info = {
					...res,
					// ...result
				}
				uni.setNavigationBarTitle({
					title: data.title
				})
				console.log(this.info)
				this.getComment()
			},
			async getComment() {
				const {
					data: comment
				} = await getComment({
					article_id: this.info.article_id
				})
				this.commentList = comment
				console.log(comment)
			},
			// 评论
			handleComment() {
				this.showComment = true
			},
			// 分享
			handleShare() {
				this.showShare = true
			},
			// 关注
			async handleFollow(item) {
				// console.log('handleFollow')
				const {
					data: res
				} = await setFollow({
					flag: item.value,
					follower_id: this.info.user_id
				})
				this.info.is_follow = !this.info.is_follow
				// console.log(res)
				const title = res
				uni.showToast({
					title,
					icon: 'none',
				})
			},
			// 预览
			handlePreview(current) {
				uni.previewImage({
					urls: this.info.images,
					current
				})
			},
			// 提交评论
			async submit(data) {
				const info = this.commentList
				const res = await submitComment({
					article: this.info.article_id,
					parent: 0,
					content: data
				})
				console.log(res)
				this.getComment()
				// this.showComment = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		.comment {
			display: flex;
			margin: 20rpx;

			.comment-text {
				max-width: calc(100vw - 160rpx);
			}

			.comment-replay {
				height: 40rpx;
			}
		}

		.bottom-input {
			height: 100rpx;
		}
	}
</style>
