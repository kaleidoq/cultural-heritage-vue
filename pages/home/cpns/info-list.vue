<template>
	<!-- 资讯列表 -->
	<view class="info-list wrap-card border-b animate__animated animate__fadeInLeft animate__fast">
		<!-- 头像栏 -->
		<view v-if="isUSer" class="flex flex-row justify-between items-center mr-15 mb-20">
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
			<view v-if="isShowFollow"
				class="flex flex-row justify-center items-center bg-gray-100 rounded-10 px-10 py-5 text-28">
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
		<view @click="goDetail()">
			<!-- 标题 -->
			<view class="w-100 line-1 text-36 my-10">{{info.title}}</view>
			<view v-if="isDetail">
				<!-- <view class="p-20 rounded-10 bg-gray-100 mt-20">
				{{info.content}}
			</view> -->
				<view class="p-20 mt-20">
					{{info.content}}
				</view>
				<image class="mt-5 w-full rounded-30" mode="widthFix" v-for="(item,index) in info.images" :key="index"
					:src="item" lazy-load>
				</image>
			</view>
			<view v-if="isContent&&!isDetail">
				<view v-if="info.cover_pic" class="relative flex flex-row justify-center items-center">
					<!-- 图片 -->
					<image class="w-full rounded-30 img-cover" mode="aspectFill" :src="info.cover_pic" lazy-load>
					</image>
				</view>
				<view v-else class="p-20 rounded-10 bg-gray-100 mt-20 line-3">
					{{info.content}}
				</view>
			</view>
		</view>
		<!-- 标签 -->
		<view v-if="tags" class="flex flex-row mt-20 flex-wrap items-center">
			<view class="border border-gray-200 round text-gray-400 px-15 px-8 ml-15" v-for="(item,index) in tags"
				:key="index">
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
</template>

<script>
	import {
		setFollow
	} from '@/utils/api/user.js'
	import {
		putLike,
		putCollect
	} from '@/utils/api/article.js'
	import {
		splitTag
	} from '../../../utils/filters'
	/*
	 * InfoList 内容列表
	 * @description 用于首页图文列表信息
	 * @author MrThinco
	 * @property {Object} item 列表信息
	 * @property {Number} index 列表信息索引
	 * @property {Boolean} isDetail 是否详情页
	 */
	export default {
		props: {
			item: Object,
			index: {
				type: [Number, String],
				default: -1
			},
			isDetail: {
				type: Boolean,
				default: false
			},
			isContent: {
				type: Boolean,
				default: true
			},
			isUSer: {
				type: Boolean,
				default: true
			},
			isShowFollow: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				info: null,
				tags: []
			}
		},
		watch: {
			item: {
				handler(val) {
					this.info = val
					this.init()
				},
				immediate: true
			}
		},
		methods: {
			async init() {
				this.tags = splitTag(this.info.tags)
				console.log(this.tags)
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
			// 表情处理
			/* handleIcon(type, item = null) {
				if (!item) return
				let index = item.index
				if (type === 'smile') {
					if (index === 1) {
						return 'active,icondianzan'
					} else {
						return 'iconthumbsup'
					}
				}
				// else {
				// 	if (index === 2) {
				// 		return 'active,iconz-nolikeFill'
				// 	} else {
				// 		return 'iconz-nolike'
				// 	}
				// }
			}, */
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
			// 评论
			async handleCollect(value) {
				const data = await putCollect(this.info.article_id, value)
				console.log(data)
				if (data.code == 0) {
					this.info.is_collect = !this.info.is_collect
				}
				if (value) this.info.collect_count++
				else this.info.collect_count--
			},
			// 分享
			handleShare() {
				if (!this.isDetail) return this.goDetail()
				this.$emit('share')
			},
			// 进入详情页
			goDetail() {
				if (this.isDetail) return // 详情页，不跳转
				this.$u.route('pages/home/detail', {
					data: JSON.stringify(this.info)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info-list {
		.img-header {
			width: 80rpx;
			height: 80rpx;
			border-radius: 100%;
		}

		.img-cover {
			max-height: 300rpx;
		}

		.tag-age {
			background-color: $uni-color-blue;
			color: #FFFFFF;
			font-size: 24rpx;
			padding: 2rpx 10rpx;
			margin-left: 10rpx;
			border-radius: 20rpx;

			&.girl {
				background-color: $uni-color-pink;
			}
		}

		.icon-play {
			position: absolute;
			font-size: 120rpx;
			color: #FFF;
		}

		.play-info {
			position: absolute;
			right: 10rpx;
			bottom: 10rpx;
			color: #FFF;
			background-color: rgba(153, 153, 153, 0.75);
			border-radius: 50rpx;
			padding: 5rpx 20rpx;
			font-size: 25rpx;
		}

		.active {
			color: #19be6b;

			view {
				color: #19be6b;
			}
		}
	}
</style>
