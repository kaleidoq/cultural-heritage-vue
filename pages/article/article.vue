<template>
	<view>
		<tab-top>帖子名</tab-top>
		<view class="padding flex justify-between align-center">
			<!-- 头像 -->
			<view class=" flex justify-center align-center">
				<u-avatar class="margin-right-sm" :src="list.head" mode="circle" lazy-load @tap="toUser"></u-avatar>
				<!-- 昵称 -->
				<view class="flex flex-direction justify-center align-start">
					<text class="margin-bottom-xs text-lg">{{list.nickname}}</text>
					<text>{{list.create_time}}</text>
				</view>
			</view>

			<!-- 关注 -->
			<view class="">
				<template v-if="list.isFollow">
					<button class="cu-btn round bg-green light" style="width:150upx" @click="follow(false)">
						已关注
					</button>
				</template>
				<template v-else>
					<button class="cu-btn round bg-green light" style="width:150upx" @click="follow(true)">
						关注
					</button>
				</template>
			</view>
		</view>
		<view class="art-desc padding">
			<!-- 标题 -->
			<view class="text-xl text-black text-bold margin-bottom-xl">{{list.title}}buibk</view>
			<!-- 帖子具体内容 -->
			<view v-show="list.image">
				<u-lazy-load class="margin-bottom-sm" v-for="(item, index) in list.images" :key="index" :image="item"
					@tap="handlePreview(index)">
				</u-lazy-load>
			</view>
			<view class=" text-lg">{{list.content}}
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getAllPic,
		getArticle,
		getArtToUser,
		setFollow
	} from '../../api'
	export default {
		data() {
			return {
				list: [],
				article_id: 0,
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.article_id);
			this.article_id = option.article_id;
			//打印出上个页面传递的参数。传递的是id=1，则获取到的就是option.id
			this.getArticleList(option.article_id)
		},
		created() {
			// this.getArticleList(this.article_id)
		},
		methods: {
			// 获得帖子内容
			async getArticleList(id) {
				const data = await getArticle({
					article_id: id
				})
				if (data.image != null) {
					const imgurl = await getAllPic({
						pic_id: data.image
					})
					data.images = imgurl
				}
				this.list = data
				console.log(this.list);
			},
			// 关注的话取关,未关注的关注
			async follow(flag) {
				const res = await setFollow({
					flag: flag,
					follower_id: this.list.user_id
				})
				console.log(res)
				this.list.isFollow = !this.list.isFollow
			},
			// 获得文章的图片
			async getPic(id) {
				await getAllPic({
					pic_id: id
				})
			},
			// 预览图片
			handlePreview(current) {
				uni.previewImage({
					urls: this.list.images,
					current
				})
			},

		}
	}
</script>

<style>

</style>
