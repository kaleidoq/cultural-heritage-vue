<template>
	<view>
		<view v-if="list.length==0">
			<u-empty text="本来无一物,何处惹尘埃" icon="/static/img/demo/winter.svg" textSize="16" marginTop='25%' mode="list">
			</u-empty>
		</view>
		<view class="flex flex-col m-20 border rounded-20" v-for="(item,index) in list" :key="index">
			<view class="flex m-20">
				<view class="flex mr-30" @click="toDetail(item.goods_id)">
					<image :src="item.cover" mode="aspectFill" style="width: 250rpx;height: 180rpx;"></image>
				</view>
				<view class="flex flex-col w-full">
					<view @click="toDetail(item.goods_id)">
						<view class="text-32 font-bold mt-20">
							{{item.title}}
						</view>
						<view class="mt-20 line-1">
							{{item.content}}
						</view>
					</view>

					<view class="flex flex-row justify-between">
						<view class="flex text-30 text-red my-20">
							￥{{item.price}}
						</view>
						<view class="flex justify-end mt-20">
							<navigator :url="'/pages/home/release_good?type=update&goods_id='+item.goods_id"
								class="cu-tag">
								编辑
							</navigator>
							<view class="cu-tag line-orange" @tap="show(index)" data-target="DialogModal1">
								删除
							</view>

						</view>
					</view>
				</view>
			</view>
			<view class="flex border border-gray-100 mx-20">
			</view>
			<view class="flex justify-between mx-30 my-20" v-if="item.is_promote">
				<navigator v-if="item.is_promote" :url="'/pages/paper/chat?user_id='+item.buyer_user_id"
					class="flex cu-tag line-gray">
					<view class="cuIcon-message font-size-lg text-gray"></view>
					联系买家
				</navigator>
				<view class="" v-if="item.status==0">
					已被拍下，等待买家付款
				</view>
				<view class="cu-btn sm line-green" v-if="item.status==1"
					@tap="setDeliver(item.order_id,item.buyer_user_id)">
					已发货，通知买家
				</view>
				<view class="" v-if="item.status==2">
					已发货，等待买家收货
				</view>
				<view class="" v-if="item.status==3">
					已售出，完成订单
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="showModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">删除</view>
					<view class="action" @tap="showModal=false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					删除这个商品？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="showModal=false">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="deleteGoods()">确定</button>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		deleteGoods,
		getUserGoodsList,
	} from '@/utils/api/goods.js'
	import {
		setDeliver
	} from '@/utils/api/order.js'
	export default {
		data() {
			return {
				showModal: false,
				choose: Number,
				list: []
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			async getList() {
				const {
					data: res
				} = await getUserGoodsList()
				console.log(res)
				this.list = res.map((item) => {
					var imgList = item.images.split(',')
					item.cover = imgList[0]
					return item
				})
				console.log(this.list)
				// this.list = list
			},
			// showModal(e) {
			// 	console.log(e)
			// 	this.modalName = e.currentTarget.dataset.target
			// },
			show(index) {
				this.showModal = true
				this.index = index
			},
			async setDeliver(order, user) {
				uni.showLoading({
					title: '状态修改成功！正在转入聊天界面···'
				})
				console.log(order, user)
				const {
					data: res
				} = await setDeliver(order)
				setTimeout(() => {
					this.$u.route('/pages/paper/chat', {
						user_id: JSON.stringify(user)
					})
					uni.hideLoading()
				}, 1000)
				console.log(res)
			},
			async deleteGoods() {
				const {
					data: msg
				} = await deleteGoods(this.list[this.index].goods_id)
				this.showModal = false
				uni.showLoading({
					title: '删除中···'
				})
				setTimeout(() => {
					this.list.splice(this.index, 1)
					console.log(this.list)
					uni.hideLoading()
					uni.showToast({
						title: msg,
						icon: 'none'
					})
				}, 1000)
			},
			toDetail(id) {
				uni.navigateTo({
					url: "/pages/goods/goods_detail?goods_id=" + id
				})
			}
		}
	}
</script>

<style>

</style>
