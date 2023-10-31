<template>
	<view class="layout">
		<view class="top">
			<view class="menus" v-for="(items,indexs) in menus[0].children" :key="indexs">
				<view class="menu" @tap="go(items.url)">
					{{items.name}}
				</view>
			</view>
		</view>
		<view class="content">
			<uni-row class="demo-uni-row">
				<uni-col :span="4">
					<view class="demo-uni-col dark"></view>
				</uni-col>
				<uni-col :span="16">
					<view class="demo-uni-col dark">
						<slot></slot>
					</view>
				</uni-col>
				<uni-col :span="4">
					<view class="demo-uni-col dark"></view>
				</uni-col>
			</uni-row>
		</view>
		<view class="bottom">
			<uni-row class="demo-uni-row">
				<uni-col :span="12" :push="6">
					<view class="demo-uni-col dark">Copyright © {{now()}} liangdong</view>
				</uni-col>
			</uni-row>
		</view>
	</view>
</template>

<script>
	import * as _ from '../../pages/admin/admin-sql.js'
	export default {
		name: "pages-layout",
		data() {
			return {
				categorys:[],
				menus:[
					{
						name:'主页',
						url:'',
						children:[
							{
								name:'文章',
								url:'/pages/index/index'
							},
							{
								name:'分类',
								url:'/pages/categorys/categorys'
							},
							{
								name:'说说',
								url:'/pages/daily/daily'
							}
						]
					}],
			}
		},
		created() {
			this.initCategory();
		},
		methods: {
			now() {
				const defaultYear = '2023'
				return `${defaultYear}-${(new Date().getFullYear())}`
			},
			async initCategory(){
				const result=await _.allCategories();
				this.categorys=result.data.map(o=>o.name)
				console.log(this.categorys)
			},
			go(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.layout{
		background-color: #F4F5F7;
		height: 100vh;
	}
	.top {
		height: 150px;
		text-align: center;
		.menus{
			padding-top: 40px;
			display: inline-block;
			margin: 0 20px;
			.menu{
				font-size: 20px;
				line-height: 30px;
			}
		}
	}

	.content {}

	.bottom {
		position: absolute;
		bottom: 0;
		height: 50px;
		line-height: 50px;
		text-align: center;
		width: 100%;
	}

	.demo-uni-row {
		margin-bottom: 10px;
		/* QQ、抖音小程序文档写有 :host，但实测不生效 */
		/* 百度小程序没有 :host，需要设置block */
		/* #ifdef MP-TOUTIAO || MP-QQ || MP-BAIDU */
		display: block;
		/* #endif */
	}

	/* 支付宝小程序没有 demo-uni-row 层级 */
	/* 微信小程序使用了虚拟化节点，没有 demo-uni-row 层级 */
	/* #ifdef MP-ALIPAY || MP-WEIXIN */
	/deep/ .uni-row {
		margin-bottom: 10px;
	}

	/* #endif */

	.demo-uni-col {
		height: 36px;
		border-radius: 4px;
	}

	.dark_deep {
		// background-color: #99a9bf;
	}

	.dark {
		// background-color: #d3dce6;
	}

	.light {
		// background-color: #e5e9f2;
	}
</style>
