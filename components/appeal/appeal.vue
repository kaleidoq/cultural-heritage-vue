<template>
	<view>
		<u-popup :show="show" mode="bottom" :round="10" @close="close" @open="open">
			<view>
				<u-radio-group v-model="reportValue" placement="column" @change="groupChange">
					<u-radio :customStyle="{marginBottom: '8px'}" v-for="(item, index) in reportList" :key="index"
						:label="item.name" :name="item.name" @change="radioChange">
					</u-radio>
				</u-radio-group>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "appeal",
		data() {
			return {
				show: false,
				reportList: ['血腥暴力内容', '色情低俗内容', '违法内容', '存在欺诈行为', '存在侵权行为', '其他'],
				reportValue: ''
			};
		},
		methods: {
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			groupChange(n) {
				console.log('groupChange', n);
			},
			radioChange(n) {
				console.log('radioChange', n);
			}
		}

	}
</script>

<style lang="less">

</style>
