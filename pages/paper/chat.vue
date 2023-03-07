<template>
	<!-- 小纸条/聊天列表 -->
	<view class="chat">
		<!-- 聊天列表 -->
		<!-- 方式一：通过js计算高度控制：scroll-view高度 -->
		<!-- <scroll-view :style="`height:${scrollHeight}px;`" scroll-y="true"> -->
		<!-- 方式二：通过css布局控制：scroll-view高度 -->
		<scroll-view class="chat-scroll" scroll-y="true" :scroll-top="scrollTop" scroll-with-animation>
			<!-- 消息列表：绑定id，用于滚动到该元素  -->
			<chat-list v-for="(item,index) in list" :key="index" :item="item"
				:pretime="index > 0 ? list[index-1].send_time : 0" :another="anothUser"></chat-list>
		</scroll-view>
		<!-- 底部操作栏 -->
		<bottom-input @submit="submit"></bottom-input>
	</view>
</template>

<script>
	// import {
	// 	chatList
	// } from "@/utils/data/data.js"
	import {
		getUserChatInfo
	} from "@/utils/api/user.js"
	import {
		getChatList,
		submitChat
	} from "@/utils/api/paper.js"
	import ChatList from "@/pages/paper/cpns/chat-list.vue"
	import BottomInput from "@/components/bottom-input/bottom-input.vue"
	export default {
		components: {
			ChatList,
			BottomInput
		},
		data() {
			return {
				// 和主用户聊天的另一个用户
				anothUser: {
					user_id: 0
				},
				scrollTop: 99999,
				scrollInto: '',
				scrollHeight: 0,
				// 聊天列表
				list: [],
				// 这个聊天列表的id
				list_id: 0,
				mainUser: {
					head: ''
				}
			}
		},
		onLoad(e) {
			console.log(e)
			this.anothUser.user_id = e.user_id
			this.mainUser.head = uni.getStorageSync("head")
			// 设置scrollHeight
			uni.getSystemInfo({
				success: (res) => {
					// 屏幕高度（screenHeight) = 手机状态栏的高度(statusBarHeight) + 导航栏高度(44px) + 可使用窗口高度(windowHeight)
					// 可使用窗口高度 = scroll-view高度 + 其他组件高度
					this.scrollHeight = res.windowHeight - uni.upx2px(82)
				}
			})
			this.init()
		},
		// 页面加载完成
		onReady() {
			// 滚动到底部
			// this.scrollToBottom()
		},
		methods: {
			// 初始化
			init() {
				this.getUserChatInfo()
				this.getChatList()
				this.scrollToBottom()
			},
			// 获得用户昵称头像
			async getUserChatInfo() {
				const {
					data: res
				} = await getUserChatInfo({
					user_id: this.anothUser.user_id
				})
				console.log(res)
				this.anothUser.head = res.head
				this.anothUser.nickname = res.nickname
				uni.setNavigationBarTitle({
					title: this.anothUser.nickname,
					success: () => {
						console.log('修改标题成功')
					},
					fail: () => {
						console.log('修改标题失败')
					},
				})
			},
			// 获得用户消息列表
			async getChatList() {
				const {
					data: res
				} = await getChatList({
					user_id: this.anothUser.user_id
				})
				console.log(res)
				this.list_id = res.list_id
				this.list = res.list
			},
			// 发送消息
			async submit(content) {
				const obj = {
					user_id: 1,
					head: this.mainUser.head,
					// username: 'jay',
					content: content,
					// type: 'text',
					send_time: this.$u.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss')
				}
				const res = await submitChat({
					content: content,
					list_id: this.list_id,
					another_id: this.anothUser.user_id
				})
				console.log(res)
				if (res.code == 0) {
					this.list_id = res.data.list_id
					this.list.push(obj)
					console.log(this.list)
					// 滚动到底部
					setTimeout(() => {
						this.scrollToBottom()
					}, 500)
				} else this.$u.toast("消息发送失败")

			},
			// 滚动到底部
			scrollToBottom() {
				setTimeout(() => {
					this.scrollTop = this.scrollTop + 1;
				}, 300)
			},

		}
	}
</script>

<style lang="scss" scoped>
	.chat {

		// 通过绝对定位控制scroll-view高度
		.chat-scroll {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 85rpx;
		}

		.bottom-handle {
			border-top: 2rpx solid $uni-border-color1;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			height: 85rpx;
			background-color: #fff;
			display: flex;
			align-items: center;

			.send-btn {
				width: 80rpx;
				text-align: center;
			}
		}
	}
</style>
