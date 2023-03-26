<template>
	<view>
		<view class="content">
			<view class="row">
				<view class="nominal">
					收件人
				</view>
				<view class="input">
					<input placeholder="请输入收件人姓名" type="text" v-model="name" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					电话号码
				</view>
				<view class="input">
					<input placeholder="请输入收件人电话号码" type="text" v-model="tel" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					所在地区
				</view>
				<view class="input" @tap="showCity">
					{{region.label}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					详细地址
				</view>
				<view class="input">
					<textarea v-model="address" auto-height="true" placeholder="输入详细地址"></textarea>
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					设置默认地址
				</view>
				<view class="input switch">
					<switch color="#f06c7a" :checked="is_default" @change='isDefaultChange' />
				</view>
			</view>
			<view class="row" v-if="editType=='edit'" @tap="del">
				<view class="del">
					删除收货地址
				</view>
			</view>
		</view>
		<view class="save" @tap="save">
			<view class="btn">
				保存地址
			</view>
		</view>
		<!-- 		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue"
			@onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker> -->
		<city-picker themeColor="#007AFF" ref="cityPicker" :pickerValueDefault="region.value" @onConfirm="confirmCity">
		</city-picker>
	</view>
</template>

<script>
	import {
		editConsignee,
		delConsignee
	} from '@/utils/api/order.js'
	export default {
		data() {
			return {
				editType: 'edit',
				cgn_id: '',
				name: '',
				tel: '',
				address: '',
				is_default: false,
				// cityDefault: [0, 0, 0],
				themeColor: '#007AFF',
				region: {
					label: "请点击选择地址",
					value: [0, 0, 0]
				}
			};
		},
		methods: {
			onCancel(e) {
				console.log(e)
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
			isDefaultChange(e) {
				this.is_default = e.detail.value;
			},
			del() {
				uni.showModal({
					title: '删除提示',
					content: '你将删除这个收货地址',
					success: async (res) => {
						if (res.confirm) {
							let mes = await delConsignee(this.cgn_id)
							console.log(mes.msg)
							uni.navigateBack();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			save() {
				let data = {
					"name": this.name,
					"head": this.name.substr(0, 1),
					"tel": this.tel,
					"address": this.address,
					"region": this.region,
					"is_default": this.is_default
				}
				console.log(data)
				if (this.editType == 'edit') {
					data.cgn_id = this.cgn_id
				}
				if (!data.name) {
					uni.showToast({
						title: '请输入收件人姓名',
						icon: 'none'
					});
					return;
				}
				if (!data.tel) {
					uni.showToast({
						title: '请输入收件人电话号码',
						icon: 'none'
					});
					return;
				}
				if (!data.address) {
					uni.showToast({
						title: '请输入收件人详细地址',
						icon: 'none'
					});
					return;
				}
				if (!data.region.value.length) {
					uni.showToast({
						title: '请选择收件地区',
						icon: 'none'
					});
					return;
				}
				uni.showLoading({
					title: '正在提交'
				})
				data.region = data.region.label + ',' + data.region.value
				console.log(data)
				setTimeout(async () => {
					const res = await editConsignee(data)
					console.log(res)
					uni.hideLoading();
					uni.navigateBack();
				}, 1000)
			}
		},
		onLoad(e) {
			//获取传递过来的参数
			this.editType = e.type;
			if (e.type == 'edit') {
				console.log(e)
				uni.getStorage({
					key: 'address',
					success: (e) => {
						this.cgn_id = e.data.cgn_id;
						this.name = e.data.name;
						this.tel = e.data.tel;
						this.address = e.data.address;
						this.is_default = e.data.is_default;
						// this.cityDefault = e.data.region.value;
						this.region.label = e.data.region.label;
						this.region.value = e.data.region.value;
					}
				})
			}
		},
		onBackPress() {
			if (this.$refs.cityPicker.showPicker) {
				this.$refs.cityPicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.cityPicker.showPicker) {
				this.$refs.cityPicker.pickerCancel()
			}
		}
	};
</script>
<style lang="scss">
	.save {
		view {
			display: flex;
		}

		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;

		.btn {
			box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background-color: #f06c7a;
			color: #fff;
			justify-content: center;
			align-items: center;

			.icon {
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}

			font-size: 30upx;
		}
	}

	.content {
		display: flex;
		flex-wrap: wrap;

		view {
			display: flex;
		}

		.row {
			width: 94%;

			margin: 0 3%;
			border-top: solid 1upx #eee;

			.nominal {
				width: 30%;
				height: 120upx;
				font-weight: 200;
				font-size: 30upx;
				align-items: center;
			}

			.input {
				width: 70%;
				padding: 20upx 0;
				align-items: center;
				font-size: 30upx;

				&.switch {
					justify-content: flex-end;
				}

				.textarea {
					margin: 20upx 0;
					min-height: 120upx;
				}
			}

			.del {
				width: 100%;
				height: 100upx;
				justify-content: center;
				align-items: center;
				font-size: 36upx;
				color: #f06c7a;
				background-color: rgba(255, 0, 0, 0.05);
				border-bottom: solid 1upx #eee;
			}
		}
	}
</style>
