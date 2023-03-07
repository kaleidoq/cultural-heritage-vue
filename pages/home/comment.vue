<template>
	<view>
		<view class="pb-70">
			<comment-list :item="commentList" :isComment="true"></comment-list>
			<view class="flex ml-70" v-for="item1 in children" :key="item1.comment_id">
				<comment-list :item="item1" :isComment="true"></comment-list>
			</view>
			<!-- 底部操作栏 -->
		</view>
		<bottom-input @submit="submit"></bottom-input>
	</view>
</template>

<script>
	import CommentList from "@/pages/home/cpns/comment-list.vue"
	import BottomInput from "@/components/bottom-input/bottom-input.vue"
	import {
		submitComment,
		getChilComment
	} from '@/utils/api/article.js'
	export default {
		components: {
			CommentList,
			BottomInput
		},
		data() {
			return {
				showComment: false, // 评论
				showShare: false, // 分享
				info: {},
				commentList: [],
				children: []
			}
		},
		onLoad(e) {
			console.log(e.data)
			e.data && this.init(JSON.parse(e.data))
		},
		mounted() {
			// this.getChilComment(info.comment_id)
		},
		methods: {
			// 初始化
			async init(data) {
				console.log(data)
				this.getChilComment(data.comment_id)
				this.commentList = data
			},
			// 提交评论
			async submit(content) {
				const info = this.commentList
				const res = await submitComment({
					article: info.article_id,
					parent: info.comment_id,
					content: content
				})
				console.log(res)
				this.getChilComment(info.comment_id)
			},
			async getChilComment(id) {
				const {
					data: res
				} = await getChilComment({
					parent_comment_id: id
				})
				this.children = res
				this.commentList.children = res
				console.log(this.commentList)
			}

		}
	}
</script>

<style>

</style>
