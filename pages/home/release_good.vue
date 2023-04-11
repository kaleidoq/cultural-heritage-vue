<template>
	<view>
		<form @submit="formSubmit" ref="form">
			<!-- 标题 -->
			<view class="cu-form-group margin-top">
				<view class="title">标题</view>
				<input v-model="form.title" bindinput="getTitleValue" name="title" placeholder="起一个清晰的标题吧"></input>
			</view>
			<!-- end -->

			<!-- 内容 -->
			<view class="cu-form-group margin-top">
				<textarea v-model="form.content" name="content" maxlength="1000" placeholder="描述一下这个商品吧"></textarea>
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
				<!-- <view class="grid col-4 grid-square flex-sub">
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
				</view> -->
				<view class="flex">
					<u-upload ref="upload" :fileList="imgList" @afterRead="handUpload" @delete="deletePic" name="1"
						multiple :maxCount="9" previewFullImage>
					</u-upload>
				</view>
			</view>
			<!-- end -->

			<!-- 价钱 -->
			<view class="cu-form-group margin-top">
				<view class="title">出售价:</view>
				<input type="digit" @input="moneyInput" :value="form.price" placeholder="请输入价钱" maxlength='7'
					name="newPrice"></input>

				<!-- <view class="title">原价:</view>
				<input type="digit" v-model="form.old_price" placeholder="请输入原价" maxlength='7' name="oriPrice"></input> -->
			</view>
			<!-- end -->

			<!-- 地址选择 -->
			<view class="cu-form-group" @tap="showCity">
				<view class="title">发货地址选择</view>
				<text class="title">{{form.address}}</text>
				<text class="title cuIcon-right"></text>
			</view>
			<city-picker themeColor="#007AFF" ref="cityPicker" :pickerValueDefault="region.value"
				@onConfirm="confirmCity">
			</city-picker>
			<!-- end -->

			<!-- 选择分类  -->
			<view class="cu-form-group flex" @click="showClassify">
				<view class="title">分类:</view>
				<class-picker ref="classPicker" @onConfirm="confirmClassify"></class-picker>
			</view>
			<!-- end -->

			<!-- 添加标签 -->
			<view class="cu-form-group">
				<view class="title" style="width:200rpx;">标签:</view>
				<view class="tag_container flex flex-wrap">
					<zyTag ref="zyAddTag" type="info" v-for="(item,index) in tagList" :text="'# '+item +' x'" closable
						@delete="deleteTag(item)" />
					<view class="zy_tag_add">
						<input v-if="tagList.length<5" placeholder="+ 添加标签" class="zy_tag_add_input" v-model="addValue"
							@confirm="confirmTag" />
					</view>
				</view>
			</view>
			<!-- end -->

			<!-- 交易方式 -->
			<!-- <view class="cu-form-group">
				<view class="title">交易方式</view>
				<checkbox-group name="means" @change="checkboxChange">
					<checkbox :class="checkboxs[0].checked?'checked':'' " :checked="checkboxs[0].checked?true:false"
						value="自提"></checkbox> 自提
					<checkbox :class="checkboxs[1].checked?'checked':'' " :checked="checkboxs[1].checked?true:false"
						value='同城面交'></checkbox> 同城面交
					<checkbox :class="checkboxs[2].checked?'checked':'' " :checked="checkboxs[2].checked?true:false"
						value='邮寄'></checkbox> 邮寄
				</checkbox-group>

			</view> -->
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
		pathToBase64
	} from 'image-tools'
	import {
		addGoods,
		getGoods
	} from "@/utils/api/goods.js"
	import zyTag from '@/uni_modules/zy-tag/components/zy-tag/zy-tag.vue'
	export default {
		components: {
			zyTag
		},
		data() {
			return {
				type: '',
				goods_id: Number,
				imgList: [], //图片上传
				images: [],
				addValue: '', //tag添加
				tagList: [],
				// // 交易方式
				// checkboxs: [{
				// 		value: "自提",
				// 		checked: false
				// 	},
				// 	{
				// 		value: "同城面交",
				// 		checked: false
				// 	},
				// 	{
				// 		value: "邮寄",
				// 		checked: false
				// 	},
				// ],
				form: {
					title: 'Ceshi ',
					content: 'scascascasc',
					images: '',
					address: '',
					class_id: 0,
					// old_price: '',
					price: '',
					tags: null
				},
				region: {
					label: "",
					value: [0, 0, 0]
				}
			}
		},
		onLoad(e) {
			console.log(e)
			if (e.type == 'update') {
				this.goods_id = parseInt(e.goods_id)
				this.getGoods()
			}
		},
		methods: {
			async getGoods() {
				const {
					data: goods
				} = await getGoods(this.goods_id)
				this.images = goods.images.split(',')
				this.images.map(item => {
					this.imgList.push({
						url: item
					})
				})
				console.log(this.imgList)
				if (goods.tags)
					this.tagList = goods.tags.split('|')
				console.log(goods)
				this.form = goods
			},
			confirmClassify(e) {
				this.form.class_id = e
				// console.log(e)
			},
			showClassify() {
				this.$refs.classPicker.show(true)
			},
			//添加标签input框回车事件
			confirmTag() {
				this.tagList.push(this.addValue)
				this.addValue = ''
			},
			//删除标签
			deleteTag(item) {
				this.tagList.splice(this.tagList.indexOf(item), 1);
			},
			showCity() {
				this.$refs.cityPicker.show()
			},
			// 修改城市
			confirmCity(e) {
				this.region = e;
				// this.cityPickerValue = e.value;
				console.log('e', e)
				this.form.address = e.label
			},
			// 图片上传
			ChooseImage() {
				uni.chooseImage({
					count: 9, //默认9
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
			// 删除图片
			deletePic(event) {
				this.images.splice(event.index, 1)
				this.imgList.splice(event.index, 1)
			},
			// 手动上传
			async handUpload(event) {
				console.log('event', event)
				let lists = [].concat(event.file)
				console.log(lists)
				console.log(this.imgList)
				let imgListLen = this.imgList.length
				lists.map((item) => {
					this.imgList.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.handUploadSubmit(lists[i].url)
					let item = this.imgList[imgListLen]
					this.imgList.splice(imgListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					imgListLen++
				}
			},
			async handUploadSubmit(url) {
				// 上传本地文件
				if (url.startsWith('blob')) {
					pathToBase64(url) //图像转base64工具
						.then(async base64 => {
							//将文件转化为base64
							url = await this.uploadFilePromise(base64); //同时将头像上传至数据库进行存储
							console.log('url', url)
							this.images.push(url)
							// console.log('this.imgList', this.imgList)
							console.log('this.images', this.images)
						})
						.catch(error => {
							console.error(error)
						})
				}
				return url
			},
			// 上传图片
			async uploadFilePromise(url) {
				const {
					data: res
				} = await uploadPic({
					pic: url
				})
				// console.log(res)
				return res
			},


			//限制只能到小数点2位
			moneyInput(e) {
				e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
				console.log(e.target.value)
				this.form.price = e.target.value
			},
			// 选择交易方式
			// checkboxChange: function(e) {
			// 	console.log(e);
			// 	//获取选择状态
			// 	var item = this.checkboxs,
			// 		values = e.detail.value;
			// 	for (var i = 0; i < item.length; i++) {
			// 		item[i].checked = false; //初始化选择状态
			// 		for (var j = 0; j < values.length; j++) {
			// 			if (item[i].value == values[j]) {
			// 				item[i].checked = true;
			// 				break;
			// 			}
			// 		}
			// 	}
			// },
			// 提交
			async formSubmit() {
				// console.log(e)
				console.log(this.form)
				if (this.images != '') {
					this.form.images = this.images.join(',')
				}
				if (this.tagList.length != 0)
					this.form.tags = this.tagList.join('|')
				if (this.form.title == '') {
					uni.showToast({
						title: '标题是大家知道你文章的重点噢，请输入标题',
						icon: 'none'
					})
					return
				} else if (this.form.content == '') {
					uni.showToast({
						title: '不要忘记输入商品的介绍噢',
						icon: 'none'
					})
					return
				} else if (this.form.images == '') {
					uni.showToast({
						title: '添加图片让大家了解你的商品吧',
						icon: 'none'
					})
					return
				} else if (this.form.price == '') {
					uni.showToast({
						title: '请输入价格噢',
						icon: 'none'
					})
					return
				} else if (this.form.address == '') {
					uni.showToast({
						title: '请正确选择地址噢',
						icon: 'none'
					})
					return
				}
				if (this.type == 'update') {
					var {
						data: res
					} = await updateGoods(this.form)
				} else {
					var {
						data: res
					} = await addGoods(this.form)
				}
				uni.showLoading({
					title: '上传中'
				})
				console.log(res)
				if (res.affectedRows == 1) {
					uni.hideLoading()
					uni.showToast({
						title: '发布成功！',
						icon: 'none'
					})
					this.form = []
					setTimeout(() => {
						// uni.navigateBack({
						// 	delta: 1,
						// 	// animationType: 'pop-out',
						// 	animationDuration: 200
						// });
						uni.switchTab({
							url: '/pages/home/home'
						})
					}, 1000)
				} else {
					uni.hideLoading()
					uni.showToast({
						title: '发布失败！请稍后再试',
						icon: 'none'
					})
					return
				}
				// else if(this.form.class_id==-1){
				// 	uni.showToast({
				// 		title: '不选择分类的话会',
				// 		icon: 'none'
				// 	})
				// }
			}
		},

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
