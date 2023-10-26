<template>
	<admin-layout>
		<view class="container">
			<view class="title">
				<view class="save">
					保存
				</view>
				<view class="back" @tap="goBack()">
					返回列表
				</view>
			</view>
			<view class="">
				<uni-data-select v-model="category" :localdata="range" @change="change" :clear="false">
				</uni-data-select>
				<uni-easyinput v-model="title" placeholder="请输入用户名" />
			</view>
			<view class="" style="height: 80vh;overflow-y: auto;background-color:#ebebeb ;">
				<sp-editor @input="input" @upinImage="upinImage"></sp-editor>
			</view>
		</view>
	</admin-layout>
</template>

<script>
	import * as _ from '../admin-sql.js';
	export default {
		data() {
			return {
				title: '',
				range: [],
				category:'',
			};
		},
		async onLoad() {
			await this.getCategorys();
		},
		methods: {
			input(e) {
				console.log('==== input :', e)
				this.category = e;
			},
			upinImage(tempFiles, editorCtx) {
				// 使用 uniCloud.uploadFile 上传图片的示例方法（可适用多选上传）
				tempFiles.forEach(async (item) => {
					uni.showLoading({
						title: '上传中请稍后',
						mask: true
					})
					let upfile = await uniCloud.uploadFile({
						filePath: item.path,
						// 同名会导致报错 policy_does_not_allow_file_overwrite
						// cloudPath可由 想要存储的文件夹/文件名 拼接，若不拼文件夹名则默认存储在cloudstorage文件夹中
						cloudPath: `cloudstorage/${item.name}`,
						cloudPathAsRealPath: true
					})
					editorCtx.insertImage({
						src: upfile.fileID,
						width: '80%',
						success: function() {
							uni.hideLoading()
						}
					})
				})
			},
			goBack() {
				uni.redirectTo({
					url: '/pages/admin/articles/articles'
				})
			},
			change(e) {
				console.log("e:", e);
			},
			save() {

			},
			async getCategorys() {
				const self = this;
				const allcategories = await _.allCategories();
				console.log(allcategories.data);
				let array = [];
				allcategories.data.map(b => {
					array.push({
						value: b._id,
						text: b.name
					})
				})
				this.range = array;
				console.log(array)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 10px;

		.title {
			height: 100rpx;

			.save {
				cursor: pointer;
				margin-right: 40rpx;
				display: inline-block;
				padding: 10rpx 20rpx;
				color: black;
				background-color: #CCCCCC;
			}

			.back {
				cursor: pointer;
				margin-right: 20rpx;
				display: inline-block;
				padding: 10rpx 20rpx;
				color: black;
				background-color: #CCCCCC;
			}
		}
	}

	#editor {
		width: 100%;
		height: 300px;
		background-color: #CCCCCC;
	}

	button {
		margin-top: 10px;
	}
</style>
