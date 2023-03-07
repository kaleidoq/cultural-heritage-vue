<template>
	<view class="home-page">
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text"
					placeholder="搜索图片、文章、视频" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green light round">搜索</button>
			</view>
		</view>
		<u-grid :col="3">
			<u-grid-item>
				<u-icon name="photo" :size="46"></u-icon>
				<view class="grid-text">图片</view>
			</u-grid-item>
			<u-grid-item>
				<u-icon name="lock" :size="46"></u-icon>
				<view class="grid-text">锁头</view>
			</u-grid-item>
			<u-grid-item>
				<u-icon name="hourglass" :size="46"></u-icon>
				<view class="grid-text">沙漏</view>
			</u-grid-item>
		</u-grid>
		<!-- <template class="content-box">
			<view class="content" v-for="(item, index) in listData" :key="index">
				<view class="art-item">
					<view v-if="item.is_cover">
						<u-image class="art-cover" :src="item.cover_pic+''" mode="widthFix">
						</u-image>
					</view>
					<view class="art-title">{{item.title}}</view>
					<view class="art-desc" v-if="!item.is_cover">
						{{item.content}}
					</view>
				</view>
				<view class="user-item">
					<u-image class="user-head" :src="item.head" mode="widthFix"></u-image>
					<view class="user-name">{{item.nickname}}</view>
				</view>
			</view>

		</template> -->
		<!-- <Article-cover :listData="listData"></Article-cover> -->
		<article-cover-waterfull :list="listData"></article-cover-waterfull>

	</view>
</template>

<script>
	// import {
	// 	getArticleCover,
	// 	// dowmloadPic
	// } from ' ../../api'
	export default {
		data() {
			return {
				tabvalue: 0,
				listData: [], //流动布局数据
			}
		},
		created() {
			this.getArticleList()
		},
		methods: {
			// 获得首页文章信息
			async getArticleList() {
				const data = await getArticleCover()
				/* 				// console.error(data)
								data.map(async item => {
									// 判断是否有封面
									if (item.is_cover) {
										item.cover_pic = await dowmloadPic({
											pic_id: item.cover_pic
										})
									}
									// 获取头像信息
									// item.head = await dowmloadPic({
									// 	pic_id: item.head_id
									// })

									// base64转文件
									// base64ToPath().then(url => {
									// 	item.head = url
									// 	console.log(url)
									// }).catch(err => {
									// 	console.error(err)
									// })
									// console.log(item.head)
								}) */
				this.listData = data
				console.log(this.listData)
				// console.log(data[0].cover_pic)
			},
			// 搜索框聚焦
			InputFocus() {},
			// 搜索框同步
			InputBlur() {},
		},

	}
</script>

<style lang="less" scoped>

</style>
