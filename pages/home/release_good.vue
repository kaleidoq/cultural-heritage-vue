<template>
	<view>
		<form @submit="formSubmit" @reset="">
			<!-- 标题 -->
			<view class="cu-form-group margin-top">
				<view class="title">标题</view>
				<input bindinput="getTitleValue" name="title" placeholder="起一个清晰的标题吧"></input>
			</view>
			<!-- end -->

			<!-- 内容 -->
			<view class="cu-form-group margin-top">
				<textarea @tap="getContentValue" name="content" maxlength="1000" @input="textareaAInput"
					placeholder="描述一下这个商品吧"></textarea>
			</view>
			<!-- end -->

			<!-- 图片 -->
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}}/9
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
						:data-url="imgList[index]">
						<image :src="imgList[index]" mode='aspectFill'></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class="cuIcon-close"></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length < 1">
						<text class="cuIcon-cameraadd"></text>
					</view>
				</view>
			</view>
			<!-- end -->

			<!-- 地址选择 -->
			<view class="cu-form-group" @tap="showCity">
				<view class="title">地址选择</view>
				<text class="title">{{region.label}}</text>
				<text class="title cuIcon-right"></text>
			</view>
			<city-picker themeColor="#007AFF" ref="cityPicker" :pickerValueDefault="region.value"
				@onConfirm="confirmCity">
			</city-picker>
			<!-- end -->

			<!-- 价钱 -->
			<view class="cu-form-group margin-top">
				<view class="title">出售价:</view>
				<input type="digit" @input="moneyInput" :value="money" placeholder="请输入价钱" maxlength='7'
					name="newPrice"></input>

				<view class="title">原价:</view>
				<input type="digit" @input="newInput" :value="newMoney" placeholder="请输入原价" maxlength='7'
					name="oriPrice"></input>

			</view>
			<!-- end -->

			<!-- 选择分类  -->
			<view class="cu-form-group" @click="showPicker=true">
				<view class="title">分类:</view>
				<u-picker :show="showPicker" ref="uPicker" :columns="columns" keyName="class_name"
					@confirm="confirmPicker" @change="changePicker">
				</u-picker>
				<view class="title">
					{{classify}}
				</view>
				<text class="title cuIcon-right"></text>
			</view>
			<!-- end -->

			<!-- 新旧 -->
			<!-- <view class="cu-form-group">
				<view class="title">新旧:</view>
				<input disabled="true" name="itemLists" :value='itemLists[itemListsIndex]'></input>
				<button class="cu-btn  bg-green" role="button" aria-disabled="false" @tap="newState">选择</button>
			</view> -->
			<!-- end -->

			<!-- 交易方式 -->
			<view class="cu-form-group">
				<view class="title">交易方式</view>
				<checkbox-group name="means" @change="checkboxChange">
					<checkbox :class="checkboxs[0].checked?'checked':'' " :checked="checkboxs[0].checked?true:false"
						value="自提"></checkbox> 自提
					<checkbox :class="checkboxs[1].checked?'checked':'' " :checked="checkboxs[1].checked?true:false"
						value='同城面交'></checkbox> 同城面交
					<checkbox :class="checkboxs[2].checked?'checked':'' " :checked="checkboxs[2].checked?true:false"
						value='邮寄'></checkbox> 邮寄
				</checkbox-group>

			</view>
			<!-- end -->

			<!-- 确定发布 -->
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green margin-tb-sm lg" form-type="submit">确定发布</button>
			</view>
			<!-- end -->
		</form>


	</view>

	</view>
</template>

<script>
	import {
		uploadPic
	} from "@/utils/api/picture.js"
	import {
		getClassify
	} from "@/utils/api/news.js"
	export default {
		data() {
			return {
				picker: [{
					classify_id: 1,
					classify_name: '手机'
				}, ],
				itemListsIndex: 0, //几层新下标（默认全新）
				itemLists: ['全新', '99新', '95新', '85新', '8新'], //几次新
				classify: '其他闲置', //分类选择默认
				money: '', //出售价
				newMoney: '', //原价
				showPicker: false,
				columns: [],
				classify: '',
				imgList: [], //图片上传
				multiIndex: [0, 0, 0], //地址选择下标
				multiArray: [

				], //默认选择地址
				region: {
					label: "",
					value: [0, 0, 0]
				}, //选择地址
				// 交易方式
				checkboxs: [{
						value: "自提",
						checked: false
					},
					{
						value: "同城面交",
						checked: false
					},
					{
						value: "邮寄",
						checked: false
					},
				],
			}
		},
		onLoad() {
			this.getClassify()
		},
		methods: {
			async getClassify() {
				const {
					data: res
				} = await getClassify()
				this.columns.push(res)
				this.columns.push(res[0].children)
				console.log(this.columns)
			},
			showCity() {
				this.$refs.cityPicker.show()
			},
			// 修改城市
			confirmCity(e) {
				this.region = e;
				// this.cityPickerValue = e.value;
				// console.log('e', e)
				// this.form.address = e.label
			},
			// 选择器改变时
			changePicker(e) {
				console.log(e)
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					console.log(e)
					console.log(this.columns)
					picker.setColumnValues(1, this.columns[0][index].children)
				}
			},
			// 回调参数为包含columnIndex、value、values
			confirmPicker(e) {
				console.log('confirm', e)
				this.form.class_id = e.value[1].class_id
				this.classify = e.value[0].class_name + '   ' + e.value[1].class_name
				this.showPicker = false
			},

			// 图片上传
			ChooseImage() {
				uni.chooseImage({
					count: 5, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			// 删除照片
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除这个照片吗？',
					cancelText: '再看看',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1);
							this.imgList = this.imgList
						}
					}
				})
			},

			//限制只能到小数点2位
			moneyInput: function(e) {
				var money;
				if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
					money = e.detail.value;
				} else {
					money = e.detail.value.substring(0, e.detail.value.length - 1);
				}
				this.money = money;
			},

			//原价验证
			newInput: function(e) {
				var money;
				if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
					money = e.detail.value;
				} else {
					money = e.detail.value.substring(0, e.detail.value.length - 1);
				}
				this.newMoney = money;
			},


			// 选择交易方式
			checkboxChange: function(e) {
				console.log(e);
				//获取选择状态
				var item = this.checkboxs,
					values = e.detail.value;
				for (var i = 0; i < item.length; i++) {
					item[i].checked = false; //初始化选择状态
					for (var j = 0; j < values.length; j++) {
						if (item[i].value == values[j]) {
							item[i].checked = true;
							break;
						}
					}
				}


			},

			// 新旧程度
			newState: function(e) {
				var that = this;
				uni.showActionSheet({
					itemList: that.itemLists,
					success(e) {
						that.itemListsIndex = e.tapIndex
					}
				})
			},
			// 拦截模态框滚动事件
			modeMove: function() {

			},

			// 显示分类模态框
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			// 隐藏分类模态框
			hideModal(e) {
				this.modalName = null
			},
			// 得到分类的值
			getClassify: function(e) {
				this.classify = e.currentTarget.dataset.name,
					this.classify_id = e.currentTarget.dataset.value
				this.hideModal();
			},
		},
		onLoad(options) {

		},
		onShow() {

		},
		onHide() {

		},
		// 出发下拉刷新
		onPullDownRefresh() {
			// 模拟刷新完成
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);
		}
	}
</script>

<style>
	.rule {
		display: flex;
		justify-content: space-between;
	}

	.margin-top-xl-170 {
		margin-top: 170rpx;
	}
</style>
