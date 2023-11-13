<template>
	<view  style="overflow: auto;">
		<view class="top">
			<view class="usermenu">
				<text>{{userName}}</text>
				<image class="head" src="../../static/logo.png" mode="" @tap="gotouser()"></image>
			</view>
		</view>
		<view class="containt">
			<view class="menus">
				<view v-for="(items,indexs) in menus" :key="indexs">
					<view class="first-menu" @tap="goUrl(items.url)">
						{{items.name}}
					</view>
					<view class="second-menu" v-for="(item,index) in items.children" :key="index">
						<view :class="item.url==url?'active':''"  @tap="goUrl(item.url)">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<view class="pages">
				<slot></slot>
			</view>
		</view>
		<view class="footer">
			Copyright © {{now()}} liangdong
		</view>
	</view>
</template>

<script>
	export default {
		name: "admin-layout",
		data() {
			return {
				userName:'',
				url:'',
				menus:[
					{
						name:'主页',
						url:'',
						children:[
							{
								name:'文章',
								url:'/pages/admin/articles/articles'
							},
							{
								name:'分类',
								url:'/pages/admin/categorys/categorys'
							},
							// {
							// 	name:'标签',
							// 	url:'/pages/admin/tags/tags'
							// },
							{
								name:'说说',
								url:'/pages/admin/daily/daily'
							},
							{
								name:'评论',
								url:'/pages/admin/comments/comments'
							}
						]
					},
					{
						name:'用户编辑',
						url:''
					}
				]
			};
		},
		created() {
			const userInfo=uni.getStorageSync('userinfo');
			if(!userInfo){
				uni.redirectTo({
					url:'/pages/admin/login/login'
				})
			}
		},
		methods:{
			now(){
				const defaultYear='2023'
				return `${defaultYear}-${(new Date().getFullYear())}`
			},
			goUrl(url){
				uni.navigateTo({
					url:url
				});
				this.url=url;
				console.log(this.url)
			},
			gotouser(){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		font-size: 32px;
		line-height: 80px;
		font-weight: 500;
		height: 50px;
		background-color: #F7F7F7;
		.usermenu{
			float: right;
			line-height: 50px;
			margin-right: 10rpx;
			margin-top: 5rpx;
			image{
				width: 30px;
				height: 30px;
				border-radius: 50rpx;
				margin-left: 20rpx;
				cursor: pointer;
			}
		}
	}
	.containt{
		height: calc(100vh - 160rpx);
		display: flex;
		padding-top: 20rpx;
		.menus{
			flex: 1;
			min-width: 100px;
			.first-menu{
				font-size: 24px;
				font-weight: 500;
				margin-top: 40rpx;
				padding-left: 20rpx;
			}
			.second-menu{
				font-size: 22px;
				margin-top: 20rpx;
				padding-left: 40rpx;
				color: darkgrey;
			}
			.active{
				color:black
			}
		}
		.pages{
			flex: 5;
		}
	}
	.footer{
		position: fixed;
		bottom: 0;
		width: 100%;
		text-align: center;
		height: 40rpx;
	}
</style>
