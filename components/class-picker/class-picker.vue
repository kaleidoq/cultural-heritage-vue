<template>
	<view class="flex">
		<u-picker :show="showPicker" ref="uPicker" :columns="columns" keyName="class_name" @confirm="confirmPicker"
			closeOnClickOverlay @cancel="closePicker" @change="changePicker">
		</u-picker>
		<view class="title">
			{{classify}}
		</view>
		<text class="title cuIcon-right"></text>
	</view>
</template>

<script>
	import {
		getClassify
	} from "@/utils/api/news.js"
	export default {
		name: "class-picker",
		// props: {
		// 	show: Boolean
		// },
		data() {
			return {
				showPicker: false,
				columns: [],
				classify: '', //分类选择默认
			};
		},
		created() {
			this.getClassify()
		},
		methods: {
			async getClassify() {
				const {
					data: res
				} = await getClassify()
				this.columns.push(res)
				// this.columns.push(res[0].children)
				console.log(this.columns)
			},
			// 回调参数为包含columnIndex、value、values
			confirmPicker(e) {
				console.log('confirm', e)
				let class_id = ''
				let classify = ''
				// class_id = e.value[1].class_id
				// this.classify = e.value[0].class_name + '   ' + e.value[1].class_name
				class_id = e.value[0].class_id
				this.classify = e.value[0].class_name
				this.showPicker = false
				this.$emit('onConfirm', class_id);
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
					// picker.setColumnValues(1, this.columns[0][index].children)
				}
			},
			closePicker() {
				this.showPicker = false
			},
			show() {
				this.showPicker = true
			}
		}
	}
</script>

<style>

</style>
