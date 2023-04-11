<template>
	<view>
		<!-- 商家信息 -->

		<!-- 	<view class="bg-white ">
			<view class=" cf padding-sm">
				<view class="radius fl padding-sm ">
					<image src='http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg'></image>
					<view class="fr padding-name">
						<view>Amibition</view>
						<view>
							<text>发布于毕节</text>
						</view>
					</view>
				</view>
				<view class=" fr padding-time ">
					<text>35分钟前来过</text>
				</view>
			</view>
		</view> -->
		<!-- 头像栏 -->
		<view class="flex flex-row justify-between items-center mr-15 mb-20 px-20">
			<!-- 头像 -->
			<navigator :url="'/pages/mine/user-space?user_id='+goods.user_id"
				class="flex flex-row justify-center items-center">
				<image class=" head-image mr-20" :src="user.head" mode="aspectFill" lazy-load></image>
				<view class="flex flex-col justify-center items-start">
					<view class=" text-gray-700 text-30">
						{{user.nickname}}
					</view>
				</view>
			</navigator>
			<!-- 关注 -->
			<view class="flex flex-row justify-center items-center bg-gray-100 rounded-10 px-10 py-5 text-28">
				<template v-if="user.is_follow">
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
		<!-- 商家信息end -->

		<!-- 商品内容 -->
		<view class='contanier bg-white padding-sm top-20'>
			<view class='price'>
				<text class='price-symbol'>￥</text>
				<text class='price-size'>{{goods.price}}</text>
				<text v-if="goods.old_price!=null" class='price-ori'>￥{{goods.old_price}}</text>
				<!-- <view class="cu-tag">不讲价</view> -->
			</view>
			<view class="text-40 mt-20 font-bold">
				{{goods.title}}
			</view>
			<view class='bg-white top-20 font-size'>

				{{goods.content}}

			</view>

			<!-- 交易方式 -->
			<view class='hint'>
				<!-- <text>本交易仅支持自提、当面交易、邮寄</text> -->
			</view>
			<!-- end -->

			<!-- 图片位置 -->
			<block v-for="(item,index) in images" :key="index">
				<image class='img' :src='item' mode="widthFix"></image>
			</block>
			<!--图片位置end  -->

			<view class='browse'>
				<view>
					<text></text>
					<!-- <text>担保交易</text> -->
				</view>
				<view class="text-gray text-left text-sm padding-browse">
					<text class="cuIcon-attentionfill margin-lr-xs"></text>
					浏览人数：{{goods.look}}
					<!-- 		<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
					<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
					<text class="cuIcon-messagefill margin-lr-xs"></text> 30 -->
				</view>

			</view>

		</view>
		<!-- 商品内容end -->

		<!-- 商家信息 -->
		<view class='bg-white top-20 padding-sm '>
			<view class='in_regard_to'>
				<view>
					<!-- <image src='../img/tiao.png'></image> -->
				</view>
				<view>
					<text class='in_regard_to_text'>关于卖家</text>
				</view>
			</view>

			<navigator url='/pages/my/my_detail/my_detail'>
				<view class="cu-list menu-avatar">
					<view class="cu-item arrow ">
						<view class="cu-avatar round lg" :style="{backgroundImage:`url(${user.head})`}">
						</view>
						<view class="content">
							<view class="text-grey">{{user.nickname}}</view>
							<view class="text-gray text-sm flex">
								<text class="text-cut">
									<text class="cuIcon-infofill text-red  margin-right-xs"></text>
									{{user.introduce}}
								</text>
							</view>
						</view>
						<view class="action arrow">
							<view class="cuIcon-right"></view>
						</view>
					</view>
				</view>
			</navigator>
			<!-- 
			<view class='bg-gray top-30 information '>
				<view class='Business_information'>
					<view>5</view>
					<view>
						<text>在售宝贝</text>
					</view>
				</view>
				<view class='Business_information'>
					<view>5</view>
					<view>
						<text>累计交易</text>
					</view>
				</view>
				<view class='Business_information'>
					<view>5</view>
					<view>
						<text>在线宝贝</text>
					</view>
				</view>
			</view>
 -->
			<!-- 

			<scroll-view scroll-x="true" style=" white-space: nowrap; display: flex" class='top-20'>
				<block v-for="(item,index) in 10" :key="index">
					<view class='item-inline'>
						<navigator url='' hover-class='none'>
							<view class="item-inline bg-img padding-top-xl flex align-end"
								:style=" 'background-image: url(' + url + ');' ">
								<view class="bg-shadeBottom  padding-top-xl flex-sub">
									￥200
								</view>
							</view>
						</navigator>
					</view>
				</block>

			</scroll-view> -->
		</view>

		<!-- end -->

		<!-- 消息 -->
		<!-- 	<view class='bg-white top-20 padding-sm '>
			<view class='in_regard_to'>
				<view>
				</view>
				<view>
					<text class='in_regard_to_text'>消息（10）</text>
				</view>
			</view>

			<view class='msg padding-sm' v-for="(item,index) in 3" wx:key="id">

				<view class="cu-avatar round lg"
					style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);">
				</view>

				<view class='msg-conetent'>
					<view>Amibition
						<text class="cuIcon-timefill text-green msg-timer  margin-right-xs"></text>
						<text class='msg-timers'>2018-6-11</text>
					</view>
					<view>发射点撒旦点发射点撒旦发生发射点射点</view>

				</view>

			</view>
		</view> -->

		<!-- end -->

		<!-- 相识商品 -->
		<!-- <view class='bg-white top-20 '>


			<view class='in_regard_to'>
			
				<view>
					<text class='in_regard_to_text'>相似商品</text>
				</view>
			</view>

 -->
		<!-- 内容 -->
		<!-- <view class='container-flex '>
				<view class='card-menu container margin-top' v-for="(item,index) in 10" :key="index">
					<navigator url='/pages/home/home_detail/home_detail' hover-class='none'>
						<view class='container_img'>
							<image src='http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg'></image>
						</view>
						<view class='container_text'><text class=''>Huawei/华为Mate 20 Pro运气真好双卡双待全网通</text></view>
						<view class='container_price'>
							<text class='container_price_text_0'>￥980</text>
						
							<view class="cu-tag line-orange">全新</view>
						</view>
						<view class='container_line'></view>
						<view class='container_user'>
							<image src='http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg'></image>
							<text>Amibition</text>
						</view>
					</navigator>
				</view>
			</view> -->
		<!-- 内容end -->


		<!-- </view> -->

		<!-- end -->


		<!-- 操作选项卡 -->
		<view class="cu-bar bg-white tabbar border shop fixation flex justify-between">
			<view class="flex flex-row">
				<button class="action" @tap='toChat'>
					<view class="cuIcon-service text-green">
						<view class="cu-tag badge"></view>
					</view>
					聊一聊
				</button>
				<view class="action" @tap="collect">
					<view :class="is_collect?'cuIcon-favorfill text-red':'cuIcon-favor'">
						<view class="cu-tag badge">{{favorNum}}</view>
					</view>
					收藏
				</view>
			</view>
			<!-- 	<view class="action">
				<view class="cuIcon-appreciatefill text-orange"> -->
			<!-- <view class="cu-tag badge">99</view> -->
			<!-- </view>
				点赞
			</view> -->

			<!-- <view class="bg-red submit" @tap="buy">立即购买</view> -->
			<view class="cu-btn bg-green mr-30" @tap="buy">立即购买</view>
		</view>
		<!-- end -->

	</view>
</template>

<script>
	import {
		getGoods,
		putGoodLook,
		getGoodCollectCount,
		putCollect
	} from '@/utils/api/goods.js'
	import {
		getUserIntro,
		setFollow
	} from '@/utils/api/user.js'
	export default {
		data() {
			return {
				goods: {},
				user: {},
				images: [],
				is_collect: Boolean,
				favorNum: 0,
			}
		},
		onLoad(e) {
			console.log(e)
			this.goods.goods_id = e.goods_id
			this.init(e.goods_id)
		},
		methods: {
			// 初始化
			async init(id) {
				await putGoodLook(id)
				this.getList(id)
			},
			async getList(id) {
				const {
					data: goods
				} = await getGoods(id)
				this.goods = goods
				const image = goods.images
				console.log(goods)
				this.images = image.split(",")
				this.getUser(goods.user_id)
				this.getCount(goods.goods_id)
			},
			async getUser(id) {
				let {
					data: user
				} = await getUserIntro(id)
				this.user = user
				console.log(user)
			},
			async getCount(good) {
				console.log(good)
				const {
					data: count
				} = await getGoodCollectCount(good)
				console.log(count)
				this.favorNum = count.collect_count
				this.is_collect = count.is_collect
			},
			// 点击跳转订单详细页面
			buy(e) {
				console.log(e);
				uni.navigateTo({
					url: '/pages/goods/goods_order?goods_id=' + this.goods.goods_id
				});
			},
			toChat() {
				uni.navigateTo({
					url: "/pages/paper/chat?user_id=" + this.goods.user_id
				})
			},
			// 关注
			async follow(value) {
				const data = await setFollow({
					flag: value,
					follower_id: this.goods.user_id
				})
				// this.info.is_follow = !this.info.is_follow
				console.log(data)
				this.user.is_follow = value
				// console.log(this.is_follow)
				const title = value ? '关注成功' : '取消成功'
				uni.showToast({
					title,
					icon: 'none',
				})
			},
			async collect() {
				const {
					data: res
				} = await putCollect(this.goods.goods_id, this.is_collect)
				if (res.affectedRows == 1) {
					this.is_collect = !this.is_collect
					this.favorNum = this.is_collect ? this.favorNum + 1 : this.favorNum - 1
				}
				// console.log(res)
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 商家信息 */

	.padding-name {
		padding-top: 25rpx;
		padding-left: 20rpx;
	}

	.padding-name text {
		color: gray;
		font-size: 20rpx;
	}

	.fl image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
	}

	.padding-time {
		padding-top: 45rpx;
	}

	text-title-size {
		font-size: 50rpx;
		color: gray;
	}

	/* 商家信息end */

	/* 商品内容 */
	.top-20 {
		margin-top: 20rpx;
	}

	.price-size {
		font-size: 50rpx;
		color: red;
	}

	.price-symbol {
		font-size: 20rpx;
		color: red;
	}

	.price-ori {
		margin-left: 25rpx;
		text-decoration: line-through;
	}

	.font-size text {
		font-size: 35rpx;
		color: black;
	}

	.hint {
		margin-top: 20rpx;
		color: black;
		font-size: 35rpx;
	}

	.img {
		margin-top: 10rpx;
		width: 100%;
		height: 800rpx;
	}

	.cu-tag {
		margin-left: 20rpx;
		/* padding: 0rpx; */
		font-size: 22rpx;
	}

	.browse {
		display: flex;
		justify-content: space-between;
	}

	.browse-tiem {
		font-size: 23rpx;
		color: gray;
	}

	.padding-browse {
		padding: 10rpx;
	}

	/* 商品内容end */

	/* 商家信息 */
	.in_regard_to {
		display: flex;
		align-items: center;
	}

	.in_regard_to image {
		width: 50rpx;
		height: 65rpx;
	}

	.in_regard_to_text {
		font-size: 35rpx;
		color: black;
		font-family: inherit;
	}

	.top-30 {
		margin-top: 30rpx;

	}

	.Business_information {
		/* width: 30%; */
		padding: 5rpx;
		display: flex;
		flex-direction: column;
		align-content: center;
		align-items: center;

	}

	.information {
		/* border-top-left-radius: 5%;
  border-top-right-radius: 5%; */
		border-radius: 20rpx;
		padding: 10rpx;
		display: flex;
		justify-content: space-around;
	}

	.item-inline {
		display: inline-block;
		margin-right: 10rpx;
		height: 150rpx;
		width: 230rpx;
	}

	/* end */

	/* 消息 */
	.msg {
		display: flex;
	}

	.msg-conetent {
		margin-left: 30rpx;
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		margin-top: 10rpx;
		width: 80%;
	}

	.msg-timer {
		padding-left: 20rpx;
	}

	.msg-timers {
		color: gray;
		font-size: 22rpx;
	}

	/* end */



	/* 相似商品 */
	.container {
		margin-left: 29rpx;
		margin-right: 20rpx;
		/* float: left; */
		height: 530rpx;
		width: 43%;
		background: white;
		margin-bottom: 20rpx;

	}

	.container_img image {
		height: 300rpx;
		width: 100%;
	}

	.container_text {
		color: black;
		padding: 10rpx;
		font-size: 23rpx;
	}

	.container_price {
		display: flex;
		justify-content: space-between;
		padding-left: 8rpx;
		padding-right: 8rpx;
	}

	.container_price_text_0 {
		color: red;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	}

	.container_price_text_1 {
		font-size: 22rpx;
	}

	.container_line {
		width: 100%;
		background: gainsboro;
		height: 1rpx;
		margin-top: 10rpx;
	}

	.container_user {
		margin-top: 20rpx;
		display: flex;
		line-height: 50rpx;
	}

	.container_user image {
		margin-left: 10rpx;
		margin-right: 50rpx;
		height: 50rpx;
		width: 50rpx;
	}

	.container-flex {
		display: flex;
		flex-wrap: wrap;
	}

	/* end */

	/* 底部操作选项卡 */
	.fixation {
		position: fixed;
		bottom: 0rpx;
		width: 100%;
	}

	.margin-rigth-20 {
		margin-right: 20rpx;
	}

	/* end */
</style>
