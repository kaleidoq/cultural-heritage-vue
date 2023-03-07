<template>
	<view class="wrap">
		<u-waterfall class="fall-content" v-model="flowList" ref="uWaterfall">
			<template v-slot:left="{leftList}">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
					<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
					<!-- <u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load> -->
					<!-- 盒子里的具体内容 -->
					<view class="art-item" @tap="toDetail(item.article_id)">
						<view v-if="item.is_cover">
							<u-image class="art-cover" shape="square" border-radius="25rpx" :src="item.cover_pic"
								mode="widthFix">
								<!-- <u-loading slot="loading"></u-loading> -->
							</u-image>
						</view>
						<view class="art-title" v-if="item.is_cover">{{item.title}}</view>
						<view class="art-desc" v-else>
							<view class="art-title">{{item.title}}</view>
							<view>
								{{item.content}}
							</view>
						</view>
					</view>
					<view class="user-item">
						<u-avatar class="user-head" size="50" :src="item.head"></u-avatar>

						<!-- <u-image class="user-head" shape="circle" center width="200rpx" heigth="200rpx"
							src="https://img0.baidu.com/it/u=739571774,785000047&fm=253&fmt=auto&app=138&f=PNG?w=580&h=481">
					 <u-loading slot="loading"></u-loading> 
						</u-image>-->
						<view class="user-name">{{item.nickname}}</view>
						<view class="btn-like">
							<text class="lg text-gray cuIcon-appreciate padding-lr-xs"></text>
							{{item.like_count}}
							<!-- <u-icon name="thumb-up"> -->
							<!-- </u-icon> -->

						</view>

					</view>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
					<!-- 盒子里的具体内容 -->
					<view class="art-item" @tap="toDetail(item.article_id)">
						<view v-if="item.is_cover">
							<u-image class="art-cover" shape="square" border-radius="25rpx" :src="item.cover_pic"
								mode="widthFix">
								<!-- <u-loading slot="loading"></u-loading> -->
							</u-image>
						</view>
						<view class="art-title" v-if="item.is_cover">{{item.title}}</view>
						<!-- 只有文章没有封面时显示 -->
						<view class="art-desc" v-else>
							<view class="art-title">{{item.title}}</view>
							<view>
								{{item.content}}
							</view>
						</view>
					</view>
					<view class="user-item">
						<u-avatar class="user-head" size="50" :src="item.head"></u-avatar>

						<!-- <u-image class="user-head" shape="circle" center width="200rpx" heigth="200rpx"
							src="https://img0.baidu.com/it/u=739571774,785000047&fm=253&fmt=auto&app=138&f=PNG?w=580&h=481">
					 <u-loading slot="loading"></u-loading>
						</u-image> -->
						<view class="user-name">{{item.nickname}}</view>
						<view class="btn-like">
							<u-icon name="thumb-up">
							</u-icon>{{item.like_count}}
						</view>

					</view>
				</view>
			</template>
		</u-waterfall>
		<button @tap="a">dianji </button>
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
	</view>
</template>

<script>
	export default {
		props: ['list'],
		data() {
			return {
				loadStatus: 'loadmore',
				flowList: [],
			}
		},
		filters: {
			filLike() { //转换喜欢的数量，上千
				this.list.map(item => {
					if (item.like_count / 10000 != 0) {
						return item.like_count / 10000 + '万'
					}
				})
			}
		},
		created() {
			this.addRandomData();
		},
		onLoad() {
			// this.addRandomData();
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			// 模拟数据加载
			setTimeout(() => {
				this.addRandomData();
				this.loadStatus = 'loadmore';
			}, 1000)
		},
		methods: {
			addRandomData() {
				console.log(this.list)
				for (let i = 0; i < this.list.length; i++) {
					let index = i;
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = JSON.parse(JSON.stringify(this.list[index]))
					item.id = this.$u.guid();
					this.flowList.push(item);
				}
			},
			remove(id) {
				this.$refs.uWaterfall.remove(id);
			},
			clear() {
				this.$refs.uWaterfall.clear();
			},
			toDetail(id) {
				console.log(id, '去详情')
				uni.navigateTo({
					url: '/pages/article/article?article_id=' + id
				})
				uni.showToast({
					title: '去详情',
					icon: 'error',
					duration: 850
				});
			}

		}
	}
</script>

<style>
	/*	 page不能写带scope的style标签中，否则无效 */
	/* page {
		background-color: rgb(240, 240, 240);
	} */
</style>

<style lang="scss" scoped>
	// 瀑布流的盒子
	.fall-content {
		padding-left: 12px;
		margin-bottom: 10px;
		// padding: 7rpx;
	}

	// 左右两个盒子
	.demo-warter {
		border-radius: 8px;
		// margin: 5px;
		padding-top: 15px;
		margin-right: 12px;
		// background-color: #ffffff;
		// padding: 8px;
		position: relative;
	}

	.art-title {
		font-size: 35rpx;
		margin-bottom: 20rpx;
		font-weight: 700;
	}

	.art-desc {
		// border: 1rpx solid #4b5364;
		background-color: #f5f5f5;
		padding: 10px 10px;
		margin-bottom: 20rpx;
		border-radius: 20rpx;
	}

	.user-item {
		display: flex;
		// flex-direction: row;
		align-items: center;
		// justify-content: space-between;
		margin-bottom: 20rpx;

		.user-name {
			flex: 3;
			padding: 0 10rpx;
			text-align: left;
		}

	}

	// .u-close {
	// 	position: absolute;
	// 	top: 32rpx;
	// 	right: 32rpx;
	// }

	// .demo-image {
	// 	width: 100%;
	// 	border-radius: 4px;
	// }

	// .demo-title {
	// 	font-size: 30rpx;
	// 	margin-top: 5px;
	// 	color: $u-main-color;
	// }

	// .demo-tag {
	// 	display: flex;
	// 	margin-top: 5px;
	// }

	// .demo-tag-owner {
	// 	background-color: $u-type-error;
	// 	color: #FFFFFF;
	// 	display: flex;
	// 	align-items: center;
	// 	padding: 4rpx 14rpx;
	// 	border-radius: 50rpx;
	// 	font-size: 20rpx;
	// 	line-height: 1;
	// }

	// .demo-tag-text {
	// 	border: 1px solid $u-type-primary;
	// 	color: $u-type-primary;
	// 	margin-left: 10px;
	// 	border-radius: 50rpx;
	// 	line-height: 1;
	// 	padding: 4rpx 14rpx;
	// 	display: flex;
	// 	align-items: center;
	// 	border-radius: 50rpx;
	// 	font-size: 20rpx;
	// }

	// .demo-price {
	// 	font-size: 30rpx;
	// 	color: $u-type-error;
	// 	margin-top: 5px;
	// }

	// .demo-shop {
	// 	font-size: 22rpx;
	// 	color: $u-tips-color;
	// 	margin-top: 5px;
	// }
</style>
