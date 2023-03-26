<template>
	<view class="zy_tag_container">
		<view class="zy_tag"
			:style="{'border-radius':borderRadius,'font-size': tagScss.fontSize,'min-height': tagScss.height,'line-height':tagScss.height ,'color':tagScss.color,'background-color':tagScss.background,'border-color':tagScss.borderColor}">
			<view class="zy_tag_item" @click="click">
				<image :src="img" class="zy_tag_item_img" v-if="img">
					<i :class="icon" :style="{'color':tagScss.color}" v-if="icon"></i>
					<view>{{text}}</view>
			<!-- 可移动属性的删除图标 -->
			<view v-if="closable">
				<i class="iconfont icon-qingchu" @click="deleteTag" style="padding-left: 10rpx;"
					:style="{'font-size': tagScss.iconSize,'color': tagScss.color, }"></i>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		emits: ['click','delete'],
		props: {
			// 标签图片
			img: {
				type: String
			},
			// 标签图标
			icon: {
				type: String
			},
			// 标签文本
			text: {
				type: String
			},
			//标签类型，primary，success，info，danger，warning
			type: {
				type: String,
				default: 'primary'
			},
			//标签尺寸，mini，small，medium，default
			size: {
				type: String,
				default: 'default'
			},
			//标签主题，dark，plain，light
			theme: {
				type: String | Boolean,
				default: 'light'
			},
			//圆形标签
			circle: {
				type: Boolean,
				default: false
			},
			//可移除标签
			closable: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				tagListData: [], //标签数组
				addibleTag: '', //可添加标签
				borderRadius: '10rpx', //默认标签圆弧
				//动态标签样式
				tagScss: {
					iconSize: '',
					fontSize: '',
					height: '',
					color: '',
					borderColor: '',
					background: '',
				},
			}
		},
		watch: {
			//监听是否开启circle圆形标签功能
			circle: {
				handler(newVal, oldVal) {
					if (newVal == true) {
						this.borderRadius = '80rpx'
					}
				},
				deep: true, // 深度监听
				immediate: true, // 初次监听即执行  
			},
			//监听尺寸size属性
			size: {
				handler(newVal, oldVal) {
					if (newVal == 'mini') {
						this.tagScss.iconSize = '20rpx'
						this.tagScss.fontSize = '22rpx'
						this.tagScss.height = '35rpx'
					} else if (newVal == 'small') {
						this.tagScss.iconSize = '22rpx'
						this.tagScss.fontSize = '24rpx'
						this.tagScss.height = '40rpx'
					} else if (newVal == 'medium') {
						this.tagScss.iconSize = '24rpx'
						this.tagScss.fontSize = '26rpx'
						this.tagScss.height = '45rpx'
					} else if (newVal == 'default' || newVal == '') {
						this.tagScss.iconSize = '26rpx'
						this.tagScss.fontSize = '28rpx'
						this.tagScss.height = '50rpx'
					}
				},
				deep: true, // 深度监听
				immediate: true, // 初次监听即执行  
			},
			//监听类型type属性
			type: {
				handler(newVal, oldVal) {
					if (this.type == '' || newVal == 'primary') {
						this.tagScss.background = "#ECF5FF"
						this.tagScss.color = "#409efe"
						this.tagScss.borderColor = "#d9ecff"
					} else if (newVal == 'success') {
						this.tagScss.background = "#F0F9EB"
						this.tagScss.color = "#67C23A"
						this.tagScss.borderColor = "#e1f3d8"
					} else if (newVal == 'info') {
						this.tagScss.background = "#f5f5f5"
						this.tagScss.color = "#999999"
						this.tagScss.borderColor = "#e9e9e9"
					} else if (newVal == 'danger') {
						this.tagScss.background = "#FEF0F0"
						this.tagScss.color = "#ff0000"
						this.tagScss.borderColor = "#fde2e2"
					} else if (newVal == 'warning') {
						this.tagScss.background = "#FDF6EC"
						this.tagScss.color = "#E6A23C"
						this.tagScss.borderColor = "#faecd8"
					}
				},
				deep: true, // 深度监听
				immediate: true, // 初次监听即执行  
			},
			// 监听主题theme属性
			theme: {
				handler(newVal, oldVal) {
					if (newVal == 'dark') {
						if (this.type == '' || this.type == 'primary') {
							this.tagScss.background = "#409efe"
							this.tagScss.color = "#ffffff"
							this.tagScss.borderColor = "#409efe"
						} else if (this.type == 'success') {
							this.tagScss.background = "#67C23A"
							this.tagScss.color = "#ffffff"
							this.tagScss.borderColor = "#67C23A"
						} else if (this.type == 'info') {
							this.tagScss.background = "#999999"
							this.tagScss.color = "#ffffff"
							this.tagScss.borderColor = "#999999"
						} else if (this.type == 'danger') {
							this.tagScss.background = "#ff0000"
							this.tagScss.color = "#ffffff"
							this.tagScss.borderColor = "#ff0000"
						} else if (this.type == 'warning') {
							this.tagScss.background = "#E6A23C"
							this.tagScss.color = "#ffffff"
							this.tagScss.borderColor = "#E6A23C"
						}
					} else if (newVal == 'plain') {
						if (this.type == '' || this.type == 'primary') {
							this.tagScss.background = "#ffffff"
							this.tagScss.color = "#409efe"
							this.tagScss.borderColor = "#409efe"
						} else if (this.type == 'success') {
							this.tagScss.background = "#ffffff"
							this.tagScss.color = "#67C23A"
							this.tagScss.borderColor = "#67C23A"
						} else if (this.type == 'info') {
							this.tagScss.background = "#ffffff"
							this.tagScss.color = "#999999"
							this.tagScss.borderColor = "#999999"
						} else if (this.type == 'danger') {
							this.tagScss.background = "#ffffff"
							this.tagScss.color = "#ff0000"
							this.tagScss.borderColor = "#ff0000"
						} else if (this.type == 'warning') {
							this.tagScss.background = "#ffffff"
							this.tagScss.color = "#E6A23C"
							this.tagScss.borderColor = "#E6A23C"
						}
					}
				},
				deep: true, // 深度监听
				immediate: true, // 初次监听即执行  
			},
			//监听是否开启addible可添加功能
			addible: {
				handler(newVal, oldVal) {
					if (newVal == true) {
						this.addibleTag = newVal

					}
				},
				deep: true, // 深度监听
				immediate: true, // 初次监听即执行  
			},
		},
		methods: {
			click() {
				this.$emit('click')
			},
			//可移动标签事件
			deleteTag() {
				this.$emit('delete')
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>
