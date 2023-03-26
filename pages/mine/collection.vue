<template>
	<view class="p-10">
		<!-- <view class="ml-30 text-28 flex p-10">
			共xxx篇收藏
		</view> -->
		<view class="flex flex-col" v-for="(todo,index) in Data" :key="index">
			<view class="ml-20 my-10">
				{{todo.time}}
			</view>
			<view class="flex flex-row flex-wrap">
				<view v-for="(item,index) in todo.subList" :key="index" class="overflow-hidden flex mx-10 my-5"
					@click="goDetail(item.article_id)">
					<image v-if="item.cover_pic" class="flex content" :src="item.cover_pic" mode="aspectFill">
					</image>
					<view v-else class="flex flex-col p-12 bg-gray-100 content">
						<view class="title line-1 text-28 pb-5">
							{{item.title}}
						</view>
						<view class="flex line-5">
							{{item.content}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <scroll-view :scroll-top="scrollTops" class="w-full h-full" scroll-y @scrolltolower="reachBottom"
				@scroll="scroll"> -->
		<!-- 无内容 -->
		<!-- <template v-if="lists==null || lists.length<=0">
					<u-empty text="快去寻找自己的喜爱吧" icon="/static/img/demo/winter.svg" textSize="16" marginTop='25%'
						mode="list"></u-empty>
				</template> -->
		<!-- 有内容 -->
		<!-- <template v-else>
					<view class="">

					</view>
					<u-loadmore :status="loadStatus"></u-loadmore>
				</template>

			</scroll-view> -->


		<!-- 回到顶部 -->
		<!-- <view v-if="scrollTop > 400" class="go-top" @click="goTop">
			<u-icon color="#01906c" name="arrow-up" size="24"></u-icon>
		</view> -->
	</view>
</template>

<script>
	import {
		getCollection
	} from '@/utils/api/user.js'
	export default {
		data() {
			return {
				scrollTop: 0,
				scrollTops: 0,
				loadStatus: 'loadmore',
				Data: [],
				lists: [],
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				this.getList()
			},
			async getList() {
				const {
					data: res
				} = await getCollection(this.lists.length)
				console.log(res)
				this.lists = this.lists.concat(res)
				var dataAll = this.lists
				dataAll.forEach((item, index) => {
					item.time = item.collect_time.slice(0, 10);
				})
				console.log(dataAll)
				//return false;
				//定义一个空数组
				let newArr = [];
				//通过forEach循环数组
				this.lists.forEach((item, i) => {
					let index = -1;
					//然后在跑到这里筛选 根据不同的时间放置不同的数组    some（）用来查找数组中是否存在某个值  如果存在 就return true
					let isExists = newArr.some((newItem, j) => {
						if (item.time == newItem.time) {
							index = j;
							return true;
						}
					})
					//代码是先跑这里的if条件判读  
					if (!isExists) {
						newArr.push({
							time: item.time,
							subList: [item]
						})
					} else {
						newArr[index].subList.push(item);
					}
					this.Data = newArr
					// console.log(newArr)
				})
			},
			// 滚动触发
			scroll(e) {
				this.scrollTop = e.detail.scrollTop // 400显示回到顶部
			},
			// 回到顶部
			goTop() {
				// 解决view层不同步的问题
				this.$nextTick(function() {
					this.scrollTops = 0
					this.scrollTop = 0
				})
			},
			// swiper滑动结束，分别设置tabs和swiper的状态
			// animationfinish(e) {
			// 	this.tabIndex = e.detail.current
			// 	this.swiperIndex = e.detail.current
			// },
			// scroll-view到底部加载更多
			reachBottom() {
				// 是否可加载
				if (this.loadStatus !== 'loadmore') return
				// 加载中
				this.loadStatus = "loading"
				setTimeout(() => {
					this.getList()
				}, 1000);
			},
			// 去详情页
			goDetail(id) {
				if (this.isDetail) return // 详情页，不跳转
				this.$u.route('pages/home/detail', {
					article_id: JSON.stringify(id)
				})


			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		width: 220rpx !important;
		height: 220rpx;
		border-radius: 20rpx;
	}

	.title {
		width: 220rpx;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
