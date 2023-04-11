<template>
	<!-- 首页/发布页 -->
	<view class="release">
		<!-- 自定义导航栏 -->
		<u-navbar :autoBack="true" placeholder>
			<!-- <view slot="center">
				<view class="flex justify-center items-center text-30 w-100" @click="changeAction">
					{{actionCurrent}}
					<view class="iconfont iconxiala2"></view>
				</view>
			</view> -->
		</u-navbar>

		<!-- 底部操作栏 -->
		<view class="bottom-handle">
			<!-- 
			<view class="iconfont icontupian text-50 mx-10 animate__animated" hover-class="animate__jello"
				@click="handleBottom('upload')"></view> -->
			<view class="ml-auto mr-20">
				<u-button text="发布" color="linear-gradient(to right, #dcc20b, #01906c)"
					:customStyle="{width:'150rpx',height:'60rpx'}" @click="submit"></u-button>

			</view>
		</view>
		<form @submit="submit" @reset="">
			<!-- 标题 -->
			<view class="cu-form-group margin-top">
				<view class="title">标题</view>
				<input v-model="form.title" class="uni-input" maxlength="20" placeholder="起一个引人注目的标题吧"></input>
			</view>
			<!-- end -->

			<!-- 内容 -->
			<view class="cu-form-group margin-top">
				<textarea v-model="form.content" maxlength='-1' height="100" placeholder="告诉大家你是怎么制作的吧..."
					confirmType="done"></textarea>
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
					<u-upload ref="upload" :fileList="imgList" @afterRead="handUpload" @delete="deletePic" name="1"
						multiple :maxCount="9" previewFullImage>
					</u-upload>

				</view>
			</view>
			<!-- end -->

			<!-- 选择分类  -->
			<view class="cu-form-group" @click="showClassify">
				<view class="title">分类:</view>
				<!-- <u-picker :show="showPicker" ref="uPicker" :columns="columns" keyName="class_name"
					@confirm="confirmPicker" @change="changePicker">
				</u-picker>
				<view class="title">
					{{classify}}
				</view>
				<text class="title cuIcon-right"></text> -->
				<class-picker ref="classPicker" @onConfirm="confirmClassify"></class-picker>
			</view>
			<!-- end -->

			<!-- 添加标签  -->
			<view class="cu-form-group">
				<view class="title">标签</view>
				<view class="tag_container">
					<zyTag ref="zyAddTag" type="info" v-for="(item,index) in tagList" :text="'# '+item +' x'" closable
						@delete="deleteTag(item)" />
					<view class="zy_tag_add">
						<input :focus="focus" placeholder="+ New Tag" class="zy_tag_add_input" v-model="addValue"
							@confirm="confirmTag" />
					</view>
				</view>

			</view>
			<!-- end -->


			<!-- 确定发布 -->
			<view class="padding flex flex-direction">
				<!-- <button class="cu-btn bg-green margin-tb-sm lg" form-type="submit">确定发布</button> -->
			</view>
			<!-- end -->
		</form>


		<!-- 中间弹出公告栏 -->
		<u-popup :show="popupShow" round="20" mode="center" :customStyle="{width:'80%'}">
			<view class="flex flex-col justify-center items-center m-20">
				<view class="flex justify-center items-center">
					<image class="notice-img" src="/static/img/demo/summer.svg" mode="widthFix"></image>
				</view>
				<view class="flex flex-col my-20">
					<view>严禁发表以下信息：</view>
					<view>1、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的信息</view>
					<view>2、侮辱或者诽谤他人，侵害他人合法权益的信息</view>
					<view>3、煽动民族仇恨、民族歧视，破坏民族团结的信息</view>
				</view>
				<u-button :customStyle="btnStyle" :ripple="true" shape="circle" @click="closePopup">朕知道了</u-button>
			</view>
		</u-popup>
		<!-- 底部弹出操作菜单 -->
		<u-action-sheet :description="actionDesc" round="20" :actions="actionList" :show="actionShow"
			:safeAreaInsetBottom="true" cancelText="取消" @select="selectAction" @close="actionShow = false">
		</u-action-sheet>
	</view>
</template>

<script>
	import {
		uploadPic
	} from "@/utils/api/picture.js"
	import {
		getClassify
	} from "@/utils/api/news.js"
	import {
		addArticle
	} from "@/utils/api/article.js"
	import {
		pathToBase64
	} from 'image-tools'
	import zyTag from '@/uni_modules/zy-tag/components/zy-tag/zy-tag.vue'
	export default {
		components: {
			zyTag
		},
		data() {
			return {
				// 操作菜单
				actionCurrent: '所有人可见',
				actionDesc: '请设置您本条信息的访问权限',
				actionList: [{
						name: '所有人可见'
					},
					{
						name: '仅好友可见'
					},
					{
						name: '仅自己可见'
					},
				],
				actionShow: false,
				tagList: [],
				focus: false,
				addValue: '', //tag添加
				// 图片列表
				imgList: [],
				images: [],
				// 弹窗公告
				popupShow: false,
				// 按钮配置
				btnStyle: {
					width: "450rpx",
					height: "75rpx",
					background: "linear-gradient(-45deg,#01906c,#34D399)",
					color: "#FFFFFF",
					fontSize: "30rpx"
				},
				// 草稿箱提示
				draftShow: true,
				form: {
					title: 'Ceshi ',
					content: 'scascascasc',
					images: null,
					cover_pic: null,
					class_id: -1,
					tags: null
				},
				showPicker: false,
				columns: [],
				classify: '',
				// region: {
				// 	label: "",
				// 	value: [0, 0, 0]
				// }
				// columnData: [
				// ],
			}
		},
		// 监听返回按钮
		onBackPress() {
			// 如果有内容
			if ((this.textContent || this.imgList.length) && this.draftShow) {
				this.tipDraft()
				return true // 不执行默认返回
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'releaseDraft',
				success: (res) => {
					const data = JSON.parse(res.data)
					this.textContent = data.textContent
					this.imgList = data.imgList
				}
			})
			this.getClassify()
		},
		methods: {
			async getClassify() {
				const {
					data: res
				} = await getClassify()
				this.columns.push(res)
				this.columns.push(res[0].children)
				// console.log(res)
			},
			//添加标签input框回车事件
			confirmTag() {
				this.tagList.push(this.addValue)
				this.addValue = ''
			},
			showCity() {
				this.showCity = true
				this.$refs.cityPicker.show()
			},
			// 修改城市
			confirmCity(e) {
				this.region = e;
				// this.cityPickerValue = e.value;
				console.log('e', e)
				this.showCity = false
				// this.$refs.cityPicker
				// this.form.address = e.label
			},
			// onBackPress() {
			// 	if (this.$refs.cityPicker.showPicker) {
			// 		this.$refs.cityPicker.pickerCancel();
			// 		return true;
			// 	}
			// },
			// // 选择器改变时
			// changePicker(e) {
			// 	console.log(e)
			// 	const {
			// 		columnIndex,
			// 		// value,
			// 		// values, // values为当前变化列的数组内容
			// 		index,
			// 		// 微信小程序无法将picker实例传出来，只能通过ref操作
			// 		picker = this.$refs.uPicker
			// 	} = e
			// 	// 当第一列值发生变化时，变化第二列(后一列)对应的选项
			// 	if (columnIndex === 0) {
			// 		// picker为选择器this实例，变化第二列对应的选项
			// 		console.log(e)
			// 		console.log(this.columns)
			// 		picker.setColumnValues(1, this.columns[0][index].children)
			// 	}
			// },
			// // 回调参数为包含columnIndex、value、values
			// confirmPicker(e) {
			// 	console.log('confirm', e)
			// 	this.form.class_id = e.value[1].class_id
			// 	this.classify = e.value[0].class_name + '   ' + e.value[1].class_name
			// 	this.showPicker = false
			// },
			confirmClassify(e) {
				this.form.class_id = e
			},
			showClassify() {
				this.$refs.classPicker.show(true)
			},
			//删除标签
			deleteTag(item) {
				// 2种删除方式
				this.tagList.splice(this.tagList.indexOf(item), 1);
				// this.tagDeleteList = this.tagDeleteList.filter((o) => {
				// 	return o !== item
				// })
			},
			// 提示保存为草稿
			tipDraft() {
				uni.showModal({
					content: "是否要保存为草稿",
					cancelText: "不保存",
					confirmText: "保存",
					success: res => {
						// 确定
						if (res.confirm) this.saveDraft()
						// 取消
						else uni.removeStorage({
							key: 'releaseDraft'
						})
						this.draftShow = false
						uni.navigateBack()
					}
				})
			},
			// 保存草稿
			saveDraft() {
				uni.setStorage({
					key: 'releaseDraft',
					data: JSON.stringify({
						textContent: this.textContent,
						imgList: this.imgList
					})
				})
			},
			// 提交
			submit() {
				if (this.images != '') {
					this.form.images = this.images.join(',')
					this.form.cover_pic = this.images[0]
				}
				if (this.tagList != null) {
					this.form.tags = this.tagList.join('|')
				}
				if (this.form.title == '') {
					// this.
					uni.showToast({
						title: '标题是大家知道你文章的重点噢，请输入标题',
						icon: 'none'
					})
					return
				} else if (this.form.content == '' && this.form.images == '') {
					uni.showToast({
						title: '正文和图片请至少一个有内容噢',
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
				this.draftShow = false
				console.log(this.form)
				// 提交到后台
				if (this.addArticle()) {
					uni.showToast({
						title: '发布成功！',
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1,
							// animationType: 'pop-out',
							animationDuration: 200
						});
					}, 1000)
				} else {
					uni.showToast({
						title: '发布失败！',
						icon: 'none'
					})
				}


			},
			// 上传文章信息
			async addArticle() {
				const {
					data: res
				} = await addArticle(this.form)
				console.log(res)
				if (res.affectedRows == 1)
					return true
				else return false
			},
			// 选择访问
			changeAction() {
				this.actionShow = true
			},
			// 选中操作菜单
			selectAction(e) {
				this.actionCurrent = e.name
				this.actionShow = false
			},
			// 关闭公告
			closePopup() {
				this.popupShow = false
			},
			// 删除图片
			deletePic(event) {
				this.images.splice(event.index, 1)
				this.imgList.splice(event.index, 1)
			},
			// 自动上传
			/* async autoUpload(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let chooseList = [].concat(event.file) // 当前选中列表
				let fileListLen = this.imgList.length // 原始文件列表
				// 将选中的文件添加到文件列表
				chooseList.map((item) => {
					this.imgList.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				// 遍历选中的文件依次上传
				for (let i = 0; i < chooseList.length; i++) {
					// 上传成功后返回数据
					const url = await this.uploadFilePromise(chooseList[i].url)
					// 获取当前文件信息：原始文件列表长度，就是当前新增开始的索引
					let item = this.imgList[fileListLen]
					// 改变最后一个文件信息：状态、url
					this.imgList.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url
					}))
					// 文件索引后移一位
					fileListLen++
				}
			}, */
			// 手动上传
			async handUpload(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				// let chooseList = [].concat(event.file) // 当前选中列表
				console.log('event', event)
				// console.log('chooseList', chooseList)
				// let fileListLen = this.imgList.length // 原始文件列表长度
				// // 将选中的文件添加到文件列表
				// chooseList.map((item, index) => {
				// 	// this.imgList.push({
				// 	// 	...item,
				// 	// 	status: '',
				// 	// 	message: ''
				// 	// })
				// 	this.imgList.push(item.url)
				// 	console.log(this.imgList)
				// 	this.handUploadSubmit(this.imgList.length - 1)
				// })
				let lists = [].concat(event.file)
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
			// 手动上传提交
			/* async handUploadSubmit(index) {
				if (!this.imgList.length) return uni.showToast({
					title: '请选择文件',
					icon: 'none'
				})
				console.log(this.imgList)
				// let imgList = []
				let url = this.imgList[index]
				console.log(index)
				console.log(url) */
			async handUploadSubmit(url) {
				console.log(url)
				// 上传本地文件
				if (url.startsWith('blob')) {
					pathToBase64(url) //图像转base64工具
						.then(async base64 => {
							//将文件转化为base64
							url = await this.uploadFilePromise(base64); //同时将头像上传至数据库进行存储
							console.log('url', url)
							this.images.push(url)
							console.log('this.images', this.images)
						})
						.catch(error => {
							console.error(error)
						})

					// url = await this.uploadFilePromise(url)
				}

			},
			// 上传图片
			async uploadFilePromise(url) {
				const {
					data: res
				} = await uploadPic({
					pic: url
				})
				console.log(res)
				return res
			},
			// 底部操作
			handleBottom(type) {
				switch (type) {
					case 'upload':
						this.$refs.upload.chooseFile()
						break
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.release {
		.notice-img {
			height: 300rpx;
			width: 300rpx;
		}

		.bottom-handle {
			border-top: 1px solid $uni-border-color1;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			height: 85rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
		}
	}

	/* 白色 */
	$zy-classic-white: #ffffff;

	/* 灰色 */
	$zy-classic-grey: #e9e9e9;
	$zy-dark-grey: #999999;

	.container {
		width: 100%;
		height: 100vh;
		background-color: $zy-classic-white;
	}

	.text {
		padding: 20rpx 0 0 20rpx;
		font-size: 26rpx;
		color: $zy-dark-grey;
	}

	.tag_container {
		display: flex;
		align-items: center;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.zy_tag_add {
		// width: 150rpx;
		height: 50rpx; //medium：45rpx；small：40rpx；mini：35rpx
		padding: 5rpx 15rpx;
		margin: 5rpx 8rpx;
		border: 1rpx solid $zy-classic-grey;
		border-radius: 10rpx;
		text-align: center;
	}

	.zy_tag_add_input {
		margin: auto;
		width: 200rpx;
		height: 50rpx; //medium：45rpx；small：40rpx；mini：35rpx
		font-size: 28rpx; //medium：26rpx；small：24rpx；mini：22rpx
	}
</style>
