## zy-tag 标签

## zy-tag 标签参数属性
|序号	|参数		|说明				|类型	|可选值								|默认值		|是否必须	|
|---	| ---		| ---				| ---	| ---								| ---		| ---		|
|1		|img		|添加标签前缀图片	|String	| ---								| ---		| ×			|
|2		|icon		|添加标签前缀图标	|String	| ---								| ---		| ×			|
|3		|text		|添加标签名称		|String	| ---								| ---		| √		|
|4		|type		|标签类型			|String	|primary/success/info/danger/warning| primary	| √		|
|5		|size		|标签尺寸			|String	|mini/small/medium/default			| default	| √		|
|6		|theme		|标签主题			|String	|dark/plain/light					| light		| √		|
|7		|circle		|是否为圆形标签		|Boolean|true/false							| false		| ×			|
|8		|closable	|是否为可移除标签	|Boolean|true/false							| false		| ×			|

## zy-tag 事件
|序号	|参数	|说明						|类型		|可选值		|默认值	|是否必须	|
|---	| ---	| ---						| ---		| ---		| ---	| ---		|
|1		|click	|标签点击事件				|Function	|(event)=>{}|否		|×			|
|2		|delete	|开启closable时的删除事件	|Function	|(event)=>{}|否		|×			|

## zy-tag 使用方式
```
<template>
	<view class="container">
		<!-- 基础标签 -->
		<view class="text">基础功能（primary/success/info/danger/warning）</view>
		<view class="tag_container">
			<zyTag text="标签" />
			<zyTag text="标签" type="success" />
			<zyTag text="标签" type="info" />
			<zyTag text="标签" type="danger" />
			<zyTag text="标签" type="warning" />
		</view>

		<!-- 圆形标签 -->
		<view class="text">圆形标签</view>
		<view class="tag_container">
			<zyTag text="标签一" circle />
			<zyTag text="标签二" type="success" circle />
			<zyTag text="标签三" type="info" circle />
			<zyTag text="标签四" type="danger" circle />
			<zyTag text="标签五" type="warning" circle />
		</view>

		<!-- 可移动标签 -->
		<view class="text">可移动标签</view>
		<view class="tag_container">
			<zyTag v-for="item in tagDeleteList" :text="item" closable @delete="deleteTag(item)" />
		</view>

		<!-- 添加标签 -->
		<view class="text">添加标签</view>
		<view class="tag_container">
			<zyTag ref="zyAddTag" v-for="(item,index) in tagAddList" :text="item" addible />
			<view class="zy_tag_add">
				<input :focus="focus" placeholder="+ New Tag" class="zy_tag_add_input" v-model="addValue"
					@confirm="confirm" />
			</view>
		</view>

		<!-- 不同尺寸标签 -->
		<view class="text">不同尺寸（mini/small/medium/default）</view>
		<view class="tag_container">
			<zyTag v-for="(item,index) in tagSizeList" :text="item.text" :size="item.size" />
		</view>

		<!-- 不同主题标签 -->
		<view class="text">不同主题（light/dark/plain）</view>
		<view class="tag_container">
			<zyTag v-for="(item,index) in tagThemeList" :text="item.text" :type="item.type" theme="dark" />
		</view>
		<view class="tag_container">
			<zyTag v-for="(item,index) in tagThemeList" :text="item.text" :type="item.type" theme="plain" />
		</view>

		<!-- 添加图片/图标 -->
		<view class="text">添加图片/图标</view>
		<view class="tag_container">
			<zyTag text="标签一" :img="img" theme="plain" />
			<zyTag text="标签一" icon="iconfont icon-biaoqian" theme="plain" />
		</view>

		<!-- 单选标签 -->
		<view class="text">单选标签</view>
		<view class="tag_container">
			<zyTag v-for="(item,index) in tagSingleList" :text="item.text" :theme="item.checked?'dark':'plain'"
				@click="singleHandle(item,index)" />
		</view>

		<!-- 多选标签 -->
		<view class="text">多选标签</view>
		<view class="tag_container">
			<zyTag v-for="(item,index) in tagMultiList" :text="item.text"
				v-bind:theme="item.checked===true?'dark':'plain'" @click="multiHandle(item,index)" />
		</view>
	</view>
</template>
<script>
	import zyTag from '@/uni_modules/zy-tag/components/zy-tag/zy-tag.vue'
	export default {
		components: {
			zyTag
		},
		data() {
			return {
				//可移动标签数据
				tagDeleteList: ["标签一", "标签二", "标签三"],
				//添加标签数据
				tagAddList: ["标签1", "标签2", "标签3"],
				focus: false,
				addValue: '',
				tagScss: {
					fontSize: "",
					height: "",
				},
				//尺寸标签数据
				tagSizeList: [{
					text: "mini标签",
					size: "mini"
				}, {
					text: "小型标签",
					size: "small"
				}, {
					text: "中等标签",
					size: "medium"
				}, {
					text: "默认标签",
					// size: "default"
				}],
				//主题标签数据
				tagThemeList: [{
					text: "标签一",
					// type:"primary"
				}, {
					text: "标签二",
					type: "success"
				}, {
					text: "标签三",
					type: "info"
				}, {
					text: "标签四",
					type: 'danger'
				}, {
					text: "标签五",
					type: 'warning'
				}],
				//添加图片
				img: require('@/static/tag/tag.png'),
				//单选标签
				tagSingleList: [{
					text: "标签一",
					checked: true
				}, {
					text: "标签二",
					checked: false
				}, {
					text: "标签三",
					checked: false
				}],
				//多选标签
				tagMultiList: [{
					text: "标签一",
					checked: false
				}, {
					text: "标签二",
					checked: false
				}, {
					text: "标签三",
					checked: false
				}],
			}
		},
		methods: {
			//删除标签
			deleteTag(item) {
				// 2种删除方式
				// this.tagDeleteList.splice(this.tagDeleteList.indexOf(item), 1);
				this.tagDeleteList = this.tagDeleteList.filter((o) => {
					return o !== item
				})
			},
			//添加标签input框回车事件
			confirm() {
				this.tagAddList.push(this.addValue)
				this.addValue = ''
			},
			//单选标签事件
			singleHandle(item, index) {
				this.tagSingleList.map((m, n) => {
					m.checked = m.text === item.text ? true : false
				})
			},
			//多选标签事件
			multiHandle(item, index) {
				this.tagMultiList[index].checked = !this.tagMultiList[index].checked
			},
		}
	}
</script>

<style lang="scss" scoped>
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
		width: 150rpx;
		height: 50rpx; //medium：45rpx；small：40rpx；mini：35rpx
		padding: 5rpx 15rpx;
		margin: 5rpx 8rpx;
		border: 1rpx solid $zy-classic-grey;
		border-radius: 10rpx;
		text-align: center;
	}

	.zy_tag_add_input {
		margin: auto;
		width: 150rpx;
		height: 50rpx; //medium：45rpx；small：40rpx；mini：35rpx
		font-size: 28rpx; //medium：26rpx；small：24rpx；mini：22rpx
	}
</style>

```

#### 如使用过程中有任何问题，或者您有一些好的建议，欢迎联系QQ：2360273432 
