<template>
	<view>
		注册
		<view class="login-pannel">
			<view class="info">
				<view class="title">
					注册
				</view>
				<view class="name">
					<label for="">用户名：</label>
					<uni-easyinput  v-model="filter.username" placeholder="请输入用户名" />
				</view>
				<view class="pwd">
					<label for="">密码：</label>
					<uni-easyinput type="password" v-model="filter.pwd"  placeholder="请输入密码" />
				</view>
				<view class="currectpwd">
					<label for="">确认密码：</label>
					<uni-easyinput type="password" v-model="filter.currectpwd"  placeholder="请再次输入密码" />
				</view>
				<view class="buttons">
					<view class="register" @tap="register()">
						提交注册
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import * as _ from '../admin-sql.js'
	export default {
		data() {
			return {
				filter:{
				username:null,
				pwd:null,
				currectpwd:null}
			};
		},
		methods:{
			async register(){
				if(!(this.filter.pwd&&this.filter.currectpwd&&this.filter.username)){
					return;
				}else if(this.filter.pwd!=this.filter.currectpwd){
					return;
				}
				const isFirst= (await _.isFirstUser()).data;
				const result= (await _.createUser(this.filter.username,this.filter.pwd,isFirst?.length==0)).data;
				if(result?.length){
					uni.redirectTo({
						url:'/pages/admin/login/login'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.login-pannel {
		.info {
			margin: auto;
			height: 600rpx;
			width: 400rpx;
			margin-top: 220rpx;
			padding-top: 100rpx;
			background-color: #F7F7F7;
			.title{
				text-align: center;
			}
			.name,
			.pwd,
			.currectpwd{
				padding-left: 30rpx;
				display: flex;
				margin-bottom: 15rpx;
				label{
					width: 100rpx;
				}
				input{
					border: 1rpx solid gray;
				}
			}
		}

		.buttons {
			display: flex;
			justify-content: space-around;
			.login{
				text-align: center;
				width: 100rpx;
				line-height: 50rpx;
				cursor: pointer;
			}
			.register{
				text-align: center;
				width: 100rpx;
				line-height: 50rpx;
				cursor: pointer;
			}
		}
	}
</style>
