<template>
	<pages-layout>
		<view v-if="showBk==true" class="clossse" @tap="showBk=false;show2=false">
			关闭评论
		</view>
		<view v-if="showBk" class="popup-content2">
			<pl v-if="show2" :title='articleInfo.title'></pl></text>
		</view>
		<view class="page-detail" v-if="articleInfo">
			<view class="title">
				标题<br>
				<text style="text-decoration: underline;">{{articleInfo.title}}</text>
			</view>
			<br>
			<!-- <text style="text-decoration: underline;cursor: pointer;" @tap="showBk=true;show2=true">评论&查看评论</text> -->
			<view class="html" v-html="articleInfo.content.html">

			</view>
		</view>
		<view class="pinglun-part">
			<view class="total" style="font-weight: 600;">
				共计{{pingluns.length}}条评论
			</view>
			<view class="box" v-for="(item,index) in pingluns" :key="index">
				<view class="detail" v-html="item.content">
				</view>
				<view class="box-info">
					<view class="from">
						昵称：{{item.nicheng}}
					</view>
					<uni-dateformat :date="item.createdtime" format="发表时间:yyyy-MM-dd hh:mm"></uni-dateformat>
				</view>
			</view>
		</view>
		<view class="add-pinglun">
			<uni-easyinput type="textarea" placeholder="请输入内容" v-model="form.content" />
			<uni-easyinput type="text" placeholder="请输入昵称" v-model="form.nicheng" />
			<button @tap="submit()">提交</button>
		</view>
	</pages-layout>
</template>

<script>
	import * as _ from '../admin/admin-sql.js'
	export default {
		data() {
			return {
				articleInfo: null,
				showBk: false,
				show2: false,
				pingluns: null,
				form: {
					articleId: null,
					nicheng: null,
					content: null
				}
			};
		},
		onLoad(options) {
			const that = this;
			this.form.articleId = options.id;
			this.initArticle(options.id);
			this.initPinglun(options.id);
		},
		methods: {
			async initArticle(id) {
				const result = await _.getOneArticle(id);
				this.articleInfo = result.data[0];
			},
			async initPinglun(id) {
				const result = await _.getPinglun(id);
				this.pingluns = result.data;
			},
			async submit() {
				if(!(this.form.nicheng?.trim()&& this.form.content?.trim())){
					uni.showToast({
						title:'请补全信息',
						icon:'none'
					});
					return;
				}
				uni.showLoading({title:'发表中'})
				await _.addPinglun(this.form.articleId, this.form.nicheng, this.form.content);
				uni.showToast({
					title:'发表成功'
				});
				this.initPinglun(this.form.articleId)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-content2 {
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.2);
	}

	.clossse {
		display: inline-block;
		width: 80px;
		margin-top: -30px;
		background-color: beige;

	}

	.click-if {
		position: absolute;
		top: 40%;
		height: 40vh;

		.bottom-send {
			height: 100%;
			width: 100%;
		}
	}

	.page-detail {
		position: relative;
		min-height: 75vh;
		background: white;
		padding-top: 20px;
		padding-left: 20px;
		padding-right: 20px;
		margin: 10px;
		border: 1px solid darkgray;

		.title {
			font-size: 30px;
			font-weight: 500;
			text-align: center;
		}

		.html {
			margin-top: 40px;
			padding: 20px;
			user-select: text;
			-webkit-user-select: text;
			color: dimgrey;
		}
	}

	.pinglun-part {
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		padding: 20px;
		background-color: #d3cfd65c;

		.box {
			margin-top: 20px;
			padding-bottom: 5px;
			.box-info {
				display: flex;
				justify-content: space-between;
				margin-top: 10px;
			}
			border-bottom: 1px solid grey;
		}
	}

	.add-pinglun {
		padding: 30px;
		padding-bottom: 100px;
		background-color: #d3cfd65c;

	}
</style>