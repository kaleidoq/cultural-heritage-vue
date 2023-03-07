<template>
	<view>
		<custom-waterfalls-flow :value="lists">
			<!-- #ifdef MP-WEIXIN -->
			<view class="item" v-for="(item,index) in lists" :key="index" slot="slot{{index}}">
				<water-list :item="item"></water-list>
			</view>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<template v-slot:default="item">
				<view class="item">
					<water-list :item="item"></water-list>
				</view>
			</template>
			<!-- #endif -->
		</custom-waterfalls-flow>
	</view>
</template>

<script>
	import WaterList from '@/pages/news/cpns/water-list.vue'
	export default {
		components: {
			WaterList
		},
		data() {
			return {
				lists: [],
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {},
		}
	}
</script>

<style>

</style>
