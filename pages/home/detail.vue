<template>
	<!-- 首页/详情页 -->
	<!-- h5 滚动穿透不需要处理，wx、app 需要 使用 page-meta 组件配合阻止滚动穿透 -->
	<page-meta :page-style="'overflow:'+(showShare?'hidden':'visible')"></page-meta>
	<view class="detail">
		<!-- 详细信息 -->
		<!-- <info-list :item="info" isDetail @comment="handleComment" @share="handleShare"
			@follow="handleFollow">
			<view class="text-30 my-20 text-gray-600">{{info.content}}</view>
			<view>
			</view>
		</info-list> -->
		<!-- 资讯列表 -->
		<view class="info-list wrap-card border-b animate__animated animate__fadeInLeft animate__fast">
			<!-- 头像栏 -->
			<view class="flex flex-row justify-between items-center mr-15 mb-20">
				<!-- 头像 -->
				<view class="flex flex-row justify-center items-center">
					<image class=" head-image mr-20" :src="info.head" mode="aspectFill" lazy-load
						@click.stop="$u.route('/pages/mine/user-space',{user_id:info.user_id})"></image>
					<view class="flex flex-col justify-center items-start">
						<view class=" text-gray-700 text-30">
							{{info.nickname}}
						</view>
						<view class="mt-10 textgray-200 text-22">
							{{info.create_time | gettime}}
						</view>
					</view>
				</view>
				<!-- 关注 -->
				<view class="flex flex-row justify-center items-center bg-gray-100 rounded-10 px-10 py-5 text-28">
					<template v-if="info.is_follow">
						<text @click="follow(false)">
							已关注
						</text>
					</template>
					<template v-else>
						<view class="flex items-center" @click="follow(true)">
							<text class="iconfont iconjia mr-10 text-24"></text>关注
						</view>
					</template>
				</view>
			</view>
			<!-- 具体内容 -->
			<view>
				<!-- 标题 -->
				<view class="w-100 line-1 text-36 my-10">{{info.title}}</view>
				<view>
					<!-- <view class="p-20 rounded-10 bg-gray-100 mt-20">
					{{info.content}}
				</view> -->
					<!-- <view class="text-30 my-20 text-gray-600">{{info.content}}</view>
				<view> -->
					<view class="p-20 mt-20">
						{{info.content}}
					</view>
					<image class="mt-5 w-full rounded-30" mode="widthFix" v-for="(item,index) in info.images"
						:key="index" :src="item" lazy-load>
					</image>
				</view>
				<view>
					<view v-if="info.cover_pic" class="relative flex flex-row justify-center items-center">
						<!-- 图片 -->
						<image class="w-full rounded-30 img-cover" mode="aspectFill" :src="info.cover_pic" lazy-load>
						</image>
					</view>
				</view>
			</view>
			<!-- 标签 -->
			<view v-if="info.tags" class="flex flex-row mt-20 flex-wrap items-center">
				<view class="border border-gray-200 round text-gray-400 px-15 px-8 ml-15"
					v-for="(item,index) in info.tags" :key="index">
					# {{item}}</view>
			</view>
			<!-- 点赞、收藏 -->
			<view class="flex flex-row justify-end items-center text-gray-500 mt-15">
				<view class="flex flex-row justify-center items-center mr-20">
					<view v-if="info.is_like" class="cuIcon-likefill mr-10 text-36" @click.stop="handleLike(false)">
					</view>
					<view v-else class="cuIcon-like mr-10 text-36" @click.stop="handleLike(true)">
					</view>
					{{info.like_count | fileThousand}}
				</view>
				<view class="flex flex-row justify-center items-center mr-20">
					<view v-if="info.is_collect" class="cuIcon-favorfill mr-10 text-36" @click="handleCollect(false)">
					</view>
					<view v-else class="cuIcon-favor mr-10 text-36" @click="handleCollect(true)"></view>
					{{info.collect_count|fileThousand}}
				</view>
				<view class="flex flex-row justify-center items-center mr-20" @click="goDetail()">
					<view class="cuIcon-comment mr-10 text-36"></view>
					{{info.comment_count|fileThousand}}
				</view>
			</view>
		</view>
		<u-gap height="20" bgColor="#F9FAFB"></u-gap>
		<!-- 商品界面 -->
		<view v-if="info.goods_id!=null" class="flex goods p-20 justify-start" @click="goGoods()">
			<image class="flex pic" :src="goods.pic" mode="aspectFill"></image>
			<view class="flex flex-col">
				<view class="flex text-30 line-1">
					{{goods.title}}
				</view>
				<view class="flex text-36 text-orange-600 line-1">
					￥{{goods.price}}
				</view>
				<view class="flex text-gray text-22">
					快去看看这个商品吧，</br>说不定它的下个主人就是你噢
				</view>
			</view>
		</view>
		<u-gap height="20" bgColor="#F9FAFB"></u-gap>
		<!-- 评论区 -->
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
		putLike,
		putCollect
	} from '@/utils/api/article.js'
	import {
		setFollow
	} from '@/utils/api/user.js'
	import {
		getGoods
	} from '@/utils/api/goods.js'
	import {
		splitTag
	} from '../../utils/filters'
	import commentList from "@/pages/home/cpns/comment-list.vue"
	export default {
		components: {
			commentList
		},
		data() {
			return {
				showComment: true, // 评论
				showShare: false, // 分享
				article_id: -1,
				info: {},
				goods: {},
				commentList: []
			}
		},
		onLoad(e) {
			console.log(e.article_id)
			this.article_id = e.article_id
			e.article_id && this.init(JSON.parse(e.article_id))
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
			async init(article_id) {
				console.log(article_id)
				const {
					data: res
				} = await getArticle({
					article_id: article_id
				})
				if (res.image != null) {
					res.images = res.image.split(",")
				}
				if (res.goods_id != null) {
					let {
						data: good
					} = await getGoods(res.goods_id)
					console.log(good)
					this.goods = good
					this.goods.images = this.goods.images.split(',')
					this.goods.pic = this.goods.images[0]
				}

				console.log(res)
				this.info = {
					...res,
				}
				uni.setNavigationBarTitle({
					title: this.info.title
				})
				console.log(this.info)
				this.info.tags = splitTag(this.info.tags)
				this.getComment()
			},
			async getComment() {
				const {
					data: comment
				} = await getComment({
					article_id: this.article_id
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
				this.info.comment_count = this.info.comment_count + 1
				this.getComment()
				// this.showComment = false
			},
			// 关注
			async follow(value) {
				// this.$emit('follow', {
				// 	value,
				// 	index: this.index
				// })
				const {
					data: res
				} = await setFollow({
					flag: value,
					follower_id: this.info.user_id
				})
				this.info.is_follow = value
				console.log(res)
				console.log(this.info.is_follow)
				// this.swiperList[this.swiperIndex].list[item.index].isFollow = item.value
				const title = value ? '关注成功' : '取消成功'
				uni.showToast({
					title,
					icon: 'none',
				})
			},
			// 为文章点赞
			async handleLike(value) {
				const data = await putLike(this.info.article_id, value)
				console.log(data)
				if (data.code == 0) {
					this.info.is_like = !this.info.is_like
				}
				if (value) this.info.like_count++
				else this.info.like_count--

			},
			// 收藏
			async handleCollect(value) {
				const data = await putCollect(this.info.article_id, value)
				console.log(data)
				if (data.code == 0) {
					this.info.is_collect = !this.info.is_collect
				}
				if (value) this.info.collect_count++
				else this.info.collect_count--
			},
			goGoods() {
				this.$u.route('pages/goods/goods_detail', {
					goods_id: JSON.stringify(this.goods.goods_id)
				})
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

	.goods {
		.pic {
			width: 200rpx;
			height: 150rpx;
			border-radius: 20rpx;
			margin-right: 20rpx;
		}
	}
</style>
