<template>
	<view>
		<!-- 搜索框 -->
		<view class="cu-bar search bg-white fixed top-0">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<!-- <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input> -->
				<input @tap="toSearch" :adjust-position="false" type="text" placeholder="搜索商品"
					confirm-type="search"></input>
			</view>
			<!-- <view class="action">
				<button class="cu-btn bg-green shadow-blur round">搜索</button>
			</view> -->
		</view>
		<u-waterfall class="flex fall-content" v-model="lists" ref="uWaterfall">

			<!-- <view class="flex flex-row flex-wrap p-10"> -->

			<template v-slot:left="{leftList}">
				<water-list :list="leftList"></water-list>
				<!-- <view class="demo-warter" v-for="(item, index) in leftList" :key="index">
						<view class="water-item" @tap="toDetail(item.goods_id)">

							<image class="image" shape="square" border-radius="25rpx" :src="item.cover" mode="widthFix">
							</image>

							<view class="text-30 mt-10 line-1">{{item.title}}</view>
							<view class="flex flex-row justify-end mt-20 text-red mr-20">
								<view class="">
									￥
								</view>
								<view class="text-34">
									{{item.price}}
								</view>
							</view>
						</view>
						<view class="flex flex-row mt-10 items-center">
							<u-avatar size="30" :src="item.user.head"></u-avatar>
							<view class="text-28 mx-30 line-1 ">{{item.user.nickname}}</view>
						</view>
					</view> -->
			</template>
			<template v-slot:right="{rightList}">
				<water-list :list="rightList"></water-list>
			</template>
		</u-waterfall>
		<u-loadmore :status="loadStatus" @loadmore="getList()"></u-loadmore>
		<!-- </scroll-view> -->
		<!-- <view class="flex flex-col w-1-2 p-20 border rounded-20 m-20" v-for="(item,index) in lists">
			<view class="image flex flex-col">
				<image :src="item.cover" mode="aspectFill" lazy-load></image>
			</view>
			<view class="flex title">
				{{item.title}}
			</view>
			<view class="flex">
				{{item.price}}
			</view>
		</view> -->
		<view class="plus" @click="handlePublish()">
			<!-- <u-icon color="#01906c" name="arrow-up" size="24"></u-icon> -->
			<u-icon color="#01906c" name="plus" size="30"></u-icon>
		</view>
	</view>
</template>

<script>
	import {
		getGoodsList
	} from "@/utils/api/goods.js"
	import {
		getUserIntro
	} from "@/utils/api/user.js"
	import WaterList from '@/pages/news/cpns/water-list.vue'
	export default {
		components: {
			WaterList
		},
		data() {
			return {
				lists: [],
				loadStatus: 'loadmore',
				scrollTops: 0,
				scrollTop: 0,
				needRefresh: false
			}
		},
		// 点击导航栏触发
		onTabItemTap(e) {
			if (this.needRefresh) {
				this.$refs.uWaterfall.clear();
				this.lists = []
				this.getList()
				console.log(e, 'onTabItemTap')
			} else {
				this.needRefresh = true
			}
		},
		onHide() {
			// console.log('hide')
			this.needRefresh = false
		},
		onLoad() {
			this.init()
			this.needRefresh = true
		},
		// 滑动到底部触发
		onReachBottom() {
			// 是否可加载
			if (this.loadStatus !== 'loadmore') return
			this.loadStatus = 'loading';
			setTimeout(() => {
				this.getList();
			}, 1000)
		},
		methods: {
			init() {
				this.getList()
			},
			async getList() {
				const res = await getGoodsList(this.lists.length)
				console.log(res)
				res.map(async item => {
					const {
						data: user
					} = await getUserIntro(item.user_id)
					// let user =this.getUser(item.user_id)
					item.user = user
					let imgs = item.images.split(',')
					item.cover = imgs[0]
					this.lists.push(item)
				})
				// this.lists = this.lists.concat(res)
				console.log(this.lists)
				if (res.length < 10)
					this.loadStatus = 'nomore'
				else
					this.loadStatus = 'loadmore';
			},
			// async getUser(id) {
			// 	const {
			// 		data: user
			// 	} = await getUserIntro(id)
			// 	return user
			// },

			// scroll-view到底部加载更多
			reachBottom() {
				console.log('weeeeddffffe')
				// 是否可加载
				if (this.loadStatus !== 'loadmore') return
				// 加载中
				this.loadStatus = "loading"
				setTimeout(() => {
					this.getList()
					console.log('weeeee')
					this.loadStatus = "loadmore"
				}, 1000);
			},
			// 滚动触发
			scroll(e) {
				// const index = this.tabIndex
				this.scrollTop = e.detail.scrollTop
				// this.scrollTop.splice(index, 1, e.detail.scrollTop) // 400显示回到顶部
			},
			// 搜索
			handleSearch() {
				this.$u.route('/pages/home/search', {
					type: 'info'
				})
			},

			toSearch() {
				this.$u.route('/pages/home/search', {
					type: 'info'
				})
			},
			handlePublish() {
				this.$u.route('/pages/home/release_good')
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 瀑布流的盒子
	.fall-content {
		margin-top: 100rpx;
		padding-left: 15px;
		// margin-bottom: 10px;
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
</style>
