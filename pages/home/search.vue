<template>
	<!-- 首页/搜索页 -->
	<view class="search wrap-card">
		<!-- 小程序导航栏 -->
		<!-- #ifdef MP-WEIXIN -->
		<u-navbar placeholder autoBack>
			<view slot="center" class="nav-center">
				<u-search placeholder="请输入内容" @click="search()" disabled></u-search>
			</view>
		</u-navbar>
		<!-- #endif -->
		<template v-if="showHistory==true">
			<view class="flex items-center">
				<text class="text-30">搜索历史</text>
				<!-- 	<u--text v-if="records.length > 0" prefixIcon="trash" align="right" iconStyle="font-size: 19px"
					text="清空" @click="delRecord('all')"></u--text> -->
			</view>
			<view class="flex flex-wrap mt-20">
				<view class="mr-20 my-10 p-10 border rounded text-24 text-gray-500 relative"
					v-for="(item,index) in records" :key="index" @longpress="editState(index)"
					@click="handleSearch(item)">
					<text>{{item}}</text>
					<u-icon v-if="item.edit" class="close-tag" name="close-circle" @click="delRecord('single',index)">
					</u-icon>
				</view>
			</view>
			<view class="flex items-center mt-30">
				<text class="text-30">热门搜索</text>
			</view>
			<view class="flex flex-col mt-20 bg-gray-100 rounded-30">
				<view class="flex text-30 py-30" v-for="(item,index) in hotSearch" :key="index"
					@click="handleSearch(item)">
					<view class=" flex w-20 items-center justify-center">
						{{index+1}}
					</view>
					<view class="w-70">
						{{item}}
					</view>
				</view>
			</view>
		</template>
		<!-- 分段器，选择搜索的方向 -->
		<template v-else>
			<!-- <u-subsection :list="indexList" :current="tabIndex" @change="sectionChange"></u-subsection> -->
			<u-tabs :list="indexList" @click="sectionChange"></u-tabs>
		</template>
		<!-- 无内容 -->
		<template
			v-if="tabIndex === 0 && list.info.length==0 || tabIndex === 1 && list.user.length==0 || tabIndex === 2 && list.tags.length==0">
			<u-empty text="本来无一物,何处惹尘埃" icon="/static/img/demo/winter.svg" textSize="16" marginTop='25%' mode="list">
			</u-empty>
		</template>
		<!-- 资讯列表 -->
		<template v-if="tabIndex === 0">
			<info-list :item="item" v-for="(item,index) in list.info" :key="index">
			</info-list>
		</template>
		<!-- 用户列表 -->
		<template v-else-if="tabIndex === 1">
			<friend-list :item="item" v-for="(item,index) in list.user" :key="index">
			</friend-list>
		</template>
		<!-- 话题列表 -->
		<template v-else-if="tabIndex === 2">
			<info-list :item="item" v-for="(item,index) in list.tags" :key="index">
			</info-list>
		</template>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		searchArticle,
		searchUser,
		getHotSearch,
		getSearchHistory,
		searchTags
	} from "@/utils/api/search.js"
	import InfoList from "@/pages/home/cpns/info-list.vue"
	import TopicList from "@/pages/news/cpns/topic-list.vue"
	import FriendList from "@/pages/paper/cpns/friend-list.vue"

	export default {
		components: {
			InfoList,
			TopicList,
			FriendList
		},
		data() {
			return {
				type: 'info', // user:用户 news:动态 topic:话题
				keyword: '',
				records: [], //搜索历史
				hotSearch: [], //热搜内容
				showHistory: true,
				list: {
					info: [],
					user: [],
					tags: []
				},
				indexList: [{
					name: "文章"
				}, {
					name: "用户"
				}, {
					name: "标签"
				}],
				tabIndex: 0,

			}
		},
		// 监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.search()
			}
		},
		// 监听原生标题栏搜索输入框输入内容变化事件
		onNavigationBarSearchInputChanged(e) {
			this.keyword = e.text
			// this.search()
		},
		// 监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发
		onNavigationBarSearchInputConfirmed() {
			this.search()
		},
		onLoad(e) {
			console.log(e)
			this.type = e.type
			this.init()
			// #ifdef APP-PLUS
			this.editNavPlaceholder()
			// #endif
		},
		watch() {
			// this.getInfo()
		},
		methods: {
			async init() {
				const {
					data: res
				} = await getHotSearch()
				const {
					data: history
				} = await getSearchHistory()
				console.log(res)
				console.log(history)
				this.records = history
				this.hotSearch = res
			},
			// 搜索
			search() {
				this.showHistory = false
				this.keyword = this.keyword.trim()
				// 数据校验
				if (this.keyword === '') {
					return this.$refs.uToast.show({
						type: 'error',
						message: '请输入搜索内容'
					})
				}
				// 收起键盘
				uni.hideKeyboard()
				// 加载中
				uni.showLoading({
					title: '加载中',
				})
				// 清空列表中的数据
				// this.list =
				setTimeout(() => {
					uni.hideLoading()
					// switch (this.tabIndex) {
					// 	case 0:
					this.getInfo()
					// 		break
					// 	case 1:
					this.getUser()
					this.getTags()
					// 		break
					// 	case 'topic':
					// 		break
					// }
					console.log(this.list)
				}, 1000)
			},
			// 搜索用户信息
			async getUser() {
				const {
					data: user
				} = await searchUser(this.list.user.length, this.keyword)
				user.map(item => {
					this.list.user.push(item)
				})
			},
			// 搜索文章信息
			async getInfo() {
				const {
					data: info
				} = await searchArticle(this.list.info.length, this.keyword)
				console.log(info)
				info.map(item => {
					this.list.info.push(item)
				})
			},
			// 搜索标签信息
			async getTags() {
				const {
					data: tags
				} = await searchTags(this.list.tags.length, this.keyword)
				console.log(tags)
				tags.map(item => {
					this.list.tags.push(item)
				})
			},
			// 删除记录
			delRecord(type, index = 0) {
				if (type === 'all') return this.records = []
				else return this.records.splice(index, 1)
			},
			// 编辑状态
			editState(index) {
				this.records[index].edit = this.records[index].edit ? !this.records[index].edit : true
			},
			// 修改导航栏输入框占位符
			editNavPlaceholder() {
				// 修改原生导航栏：搜索框占位符
				let pageTitle = '请输入内容'
				switch (this.type) {
					case 'user':
						pageTitle = '请输入昵称'
						break
					case 'info':
						pageTitle = '请输入新鲜事'
						break
					case 'topic':
						pageTitle = '请输入话题'
						break
				}
				const currentWebview = this.$mp.page.$getAppWebview() // 获取当前窗口对象实例
				const tn = currentWebview.getStyle().titleNView // 获取原生导航栏
				tn.searchInput.placeholder = pageTitle // 设置占位符
				currentWebview.setStyle({
					titleNView: tn
				})
			},

			// 分段器进行选择
			sectionChange(item) {
				let index = item.index
				this.tabIndex = index;
				setTimeout(() => {
					uni.hideLoading()
					switch (index) {
						case 1:
							if (this.list.user.length === 0)
								this.getUser()
							break
						case 'topic':
							if (this.list.user.length === 0)
								this.getTags()
							break
					}
					console.log(this.list)
				}, 1000)
			},

			handleSearch(key) {
				this.keyword = key
				this.search()
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}



	.search {

		// 小程序导航栏
		/* #ifdef MP-WEIXIN */
		/deep/ .u-navbar {

			.u-navbar__content {
				margin-right: 180rpx !important; // 胶囊按钮
			}

			.nav-center {
				width: 100%;
				margin-left: 80rpx; // 返回按钮
				margin-top: 2000rpx;
			}
		}

		/* #endif */

		.close-tag {
			position: absolute;
			top: -15rpx;
			right: -5px;
		}
	}
</style>
