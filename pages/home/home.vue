<template>
	<!-- 首页 -->
	<view class="home">
		<!-- 小程序导航栏 -->
		<!-- #ifdef MP-WEIXIN -->
		<u-navbar placeholder>
			<!-- <view slot="left" class="iconfont iconqiandao"></view> -->
			<view slot="center" class="nav-center">
				<u-search placeholder="搜索新鲜事" @click="handleSearch()" :showAction="false" disabled></u-search>
			</view>
			<view slot="right" class="iconfont iconPensyumaobi" @click="handlePublish()"></view>
		</u-navbar>
		<!-- #endif -->
		<!-- 标签 -->
		<!-- <u-sticky bgColor="#fff">
			<u-tabs class="wrap-card" ref="tabs" @change="changeTab" :list="tablist" :current="tabIndex"
				lineColor="#01906c" :activeStyle="{color:'#01906c'}" :inactiveStyle="{color:'#909399'}" lineWidth="30"
				:scrollable="false">
			</u-tabs>
		</u-sticky> -->
		<!-- 下滑框选择分类和筛选 -->
		<ren-dropdown-filter :filterData='filterData' :defaultIndex='defaultIndex' @onSelected='selected'>
		</ren-dropdown-filter>
		<!-- 列表 -->
		<scroll-view :scroll-top="scrollTops" class="w-full h-full flex" scroll-y @scrolltolower="reachBottom"
			@scroll="scroll">
			<!-- 利用一个空盒子占住上面下滑框的位置 -->
			<view class="flex" style="height: 110rpx;">
			</view>
			<!-- 无内容 -->
			<template v-if="list.length<=0">
				<u-empty text="本来无一物,何处惹尘埃" icon="/static/img/demo/winter.svg" textSize="16" marginTop='25%'
					mode="list"></u-empty>
			</template>
			<!-- 有内容 -->
			<template v-else>
				<!-- 列表 -->
				<info-list :item="item1" v-for="(item1,index1) in list" :key="index1" :index="item1.article_id"
					@follow="handleFollow">
					<!-- <view v-if="item1.is_cover" class="relative flex flex-row justify-center items-center">
					-->
					<!-- 图片 -->
					<!-- 	 	<image class="w-full rounded-30 img-cover" mode="aspectFill" :src="item1.cover_pic"
							lazy-load>
						</image>
					</view>
					<view class="p-20 rounded-10 bg-gray-100 mt-20 line-3">
						{{item1.content}}
					</view> -->
				</info-list>
				<u-loadmore :status="loadStatus"></u-loadmore>
			</template>
		</scroll-view>
		<!-- <swiper class="flex-1" :current="swiperIndex" @animationfinish="animationfinish">
			<swiper-item class="h-full" v-for="(item, index) in swiperList" :key="index">
				<scroll-view :ref="'scrollView'+index" :scroll-top="scrollTops[tabIndex]" class="w-full h-full" scroll-y
					@scrolltolower="reachBottom" @scroll="scroll"> -->
		<!-- 无内容 -->
		<!-- <template v-if="item==null || item.list.length<=0">
						<u-empty text="本来无一物,何处惹尘埃" icon="/static/img/demo/winter.svg" textSize="16" marginTop='25%'
							mode="list"></u-empty>
					</template> -->
		<!-- 有内容 -->
		<!-- <template v-else> -->
		<!-- 列表 -->
		<!-- <info-list :item="item1" v-for="(item1,index1) in item.list" :key="index1"
							:index="item1.article_id" @mark="handleMark" @follow="handleFollow"> -->
		<!-- <view v-if="item1.is_cover" class="relative flex flex-row justify-center items-center">
							-->
		<!-- 图片 -->
		<!-- 	 	<image class="w-full rounded-30 img-cover" mode="aspectFill" :src="item1.cover_pic"
									lazy-load>
								</image>
							</view>
							<view class="p-20 rounded-10 bg-gray-100 mt-20 line-3">
								{{item1.content}}
							</view> -->
		<!-- </info-list>
						<u-loadmore :status="loadStatus[tabIndex]"></u-loadmore>
					</template> -->

		<!-- </scroll-view> -->
		<!-- </swiper-item> -->
		<!-- </swiper> -->
		<!-- 回到顶部 -->
		<!-- <view v-if="scrollTop > 400" class="go-top" @click="goTop">
			<u-icon color="#01906c" name="arrow-up" size="24"></u-icon>
		</view> -->
		<view class="plus" @click="handlePublish()">
			<!-- <u-icon color="#01906c" name="arrow-up" size="24"></u-icon> -->
			<u-icon color="#01906c" name="plus" size="30"></u-icon>
		</view>
	</view>
</template>

<script>
	import {
		getClassify
	} from "@/utils/api/news.js"
	import {
		getArticleList
	} from '@/utils/api/article.js'
	import InfoList from "@/pages/home/cpns/info-list.vue"
	export default {
		components: {
			InfoList
		},
		data() {
			return {
				scrollTops: 0,
				scrollTop: 0,
				// scrollTops: [0, 0, 0, 0, 0, 0],
				// scrollTop: [0, 0, 0, 0, 0, 0],
				// 加载更多 // loadmore/ loading / nomore
				loadStatus: 'loadmore',
				// 标签栏
				filterData: [
					[],
					[{
						text: '最新评论',
						value: 'last_comment_time',
						select: true
					}, {
						text: '最新发布',
						value: 'create_time'
					}, {
						text: '最多收藏',
						value: 'collect_count'
					}, {
						text: '最多评论',
						value: 'comment_count'
					}, {
						text: '最多喜欢',
						value: 'like_count'
					}]
				],
				select: [0, 'last_comment_time'],
				defaultIndex: [0, 0],
				tabIndex: 0,
				tablist: [{
						name: "首页"
					},
					{
						name: "非遗"
					},
					{
						name: "手工"
					},
					{
						name: "摆件",
					},
					{
						name: "饰品"
					}
				],
				// 列表数据
				swiperIndex: 0,
				// 每个列表的数据
				swiperNum: [0, 0, 0, 0, 0, 0],
				swiperList: [null, null, null, null, null],
				// swiperList: newsList
				list: [],
				needRefresh: false
			}
		},
		onTabItemTap(e) {
			console.log(e, 'onTabItemTap')
			if (this.needRefresh) {
				this.list = []
				this.getList()
			} else {
				this.needRefresh = true
			}
		},
		onHide() {
			console.log('hide')
			this.needRefresh = false
		},
		// 监听原生标题栏搜索输入框点击事件
		onNavigationBarSearchInputClicked() {
			this.handleSearch()
		},
		// 监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e) {
			// console.log(e)
			switch (e.index) {
				case 0:
					this.handlePublish()
					break;
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			// 正常情况下接口返回应该很会很快。故意延迟调用，让用户有在刷新的体验感
			setTimeout(() => {
				this.list = []
				this.getList();
			}, 800);
		},
		created() {
			this.getList()
			this.getClassify()
			console.log('home created')
			// this.$socket.emit('init', '前台连接发送信息')
		},
		onLoad() {
			// this.getList()
			// this.getClassify()
		},
		methods: {
			async getClassify() {
				const {
					data: res
				} = await getClassify()
				// this.filterData = res
				let list = [{
					text: '综合分类',
					value: 0,
					select: true
				}]
				res.map(item => {
					let el = {
						text: item.class_name,
						value: item.class_id
					}
					list.push(el)
					// console.log(item)
				})
				this.filterData.splice(0, 1, list)
				// console.log(res)
				// console.log(this.filterData)
			},
			// 选择筛选列表结束
			selected(res) {
				// console.log(res)
				console.log(res)
				this.select = []
				res.map(i => {
					this.select.push(i[0].value)
				})
				this.list = []
				this.getList()
				console.log(this.select)
			},
			// 发布
			handlePublish() {
				this.$u.route('/pages/home/release')
			},
			// 搜索
			handleSearch() {
				this.$u.route('/pages/home/search', {
					type: 'info'
				})
			},
			// tab栏切换
			changeTab(item) {
				this.tabIndex = item.index
				this.swiperIndex = item.index
				this.getList(item.index)
			},
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				this.tabIndex = e.detail.current
				this.swiperIndex = e.detail.current
			},
			// scroll-view到底部加载更多
			reachBottom() {
				// 是否可加载
				if (this.loadStatus !== 'loadmore') return
				// 加载中
				this.loadStatus = "loading"
				setTimeout(() => {
					this.getList()
					this.loadStatus = "loadmore"
				}, 1000);
			},
			async getList() {
				// 获得全部文章数据
				var {
					data: res
				} = await getArticleList(
					this.list.length, this.select[0], this.select[1]
				)
				console.log(res)
				res.map(item => {
					this.list.push(item)
				})
				if (res.length < 10)
					this.loadStatus = 'nomore'
			},
			// 获取列表
			/* async getList(index) {
				let list = []
				switch (index) {
					case 0:
						// 获得全部文章数据
						var {
							data: res
						} = await getArticleCover({
							length: this.swiperNum[index]
						})
						list = res
						break;
					default:
						var {
							data: res
						} = await getClassifyArticleCover(index, this.swiperNum[index])
						list = res
				}
				// console.log(this.swiperList[index])
				if (this.swiperNum[index] != 0) {
					this.swiperList[index].list = this.swiperList[index].list.concat(list)
				} else this.swiperList.splice(index, 1, {
					list: list
				})
				this.swiperNum.splice(index, 1, this.swiperNum[index] + list.length)
				console.log(this.swiperList[index].list)
				console.log(this.swiperList)
				// 加载更多
				if (list.length == 0) this.loadStatus.splice(this.tabIndex, 1, "nomore")
				else
					this.loadStatus.splice(this.tabIndex, 1, "loadmore")
			}, */

			// 滚动触发
			scroll(e) {
				// const index = this.tabIndex
				this.scrollTop = e.detail.scrollTop
				// this.scrollTop.splice(index, 1, e.detail.scrollTop) // 400显示回到顶部
			},
			// 回到顶部
			goTop() {
				// const index = this.tabIndex
				// 解决view层不同步的问题
				// this.scrollTops.splice(index, 1, this.scrollTop[index])
				this.scrollTops = this.scrollTop[index]
				this.$nextTick(function() {
					this.scrollTops.splice(index, 1, 0)
					this.scrollTop.splice(index, 1, 0)
				})
			},

			// 关注
			async handleFollow(item) {
				/* const {
					data: res
				} = await setFollow({
					flag: value,
					follower_id: this.info.user_id
				})
				this.info.is_follow = item.value
				console.log(res)
				console.log(this.info.is_follow)
				this.swiperList[this.swiperIndex].list[item.index].isFollow = item.value
				const title = item.value ? '关注成功' : '取消成功'
				uni.showToast({
					title,
					icon: 'none',
				})
				this.getArticleCover() */
			},
			goRelease() {}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top) - var(--window-bottom)); // 视高 - 内容区顶部 - 内容区底部
		width: 100%;

		// 小程序导航栏
		/* #ifdef MP-WEIXIN */
		/deep/ .u-navbar {
			.iconfont {
				font-size: 48rpx;
				color: $uni-color-green;
			}


			.u-navbar__content {
				margin-right: 180rpx !important; // 胶囊按钮
			}
		}

		/* #endif */

		// 回到顶部
		.go-top {
			position: fixed;
			right: 30rpx;
			bottom: 100rpx;
			height: 80rpx;
			width: 80rpx;
			background: #E5E7EB;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 100%;
		}

		.plus {
			position: fixed;
			right: 50rpx;
			bottom: 130rpx;
			height: 100rpx;
			width: 100rpx;
			background: #e9e9eb;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 100%;
		}
	}
</style>
