<template>
	<view class="login-pannel">
		<view class="info">
			<view class="title">
				请登录
			</view>
			<view class="name">
				<label for="">用户名：</label>
				<uni-easyinput type="text" placeholder="请输入用户名" v-model="username" />
			</view>
			<view class="pwd">
				<label for="">密码：</label>
				<uni-easyinput type="password" placeholder="请输入密码" v-model="pwd" />
			</view>
			<view class="buttons">
				<view class="login" @tap="login()">
					登录
				</view>
				<!-- <view class="register" @tap="goRegister()">
					注册
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import * as _ from '../admin-sql.js'
	export default {
		data() {
			return {
				username: '',
				pwd: '',
			};
		},
		async onLoad() {
			const isData = (await _.isFirstUser()).data;
			console.log(isData)
			if (isData?.length == 0) {
				uni.redirectTo({
					url: '/pages/admin/register/register'
				})
			}
			const userInfo = uni.getStorageSync('userinfo');
			if (userInfo) {
				uni.redirectTo({
					url: '/pages/admin/index/index'
				})
			}
		},
		methods: {
			async login() {
				const result = (await _.login(this.username, this.pwd)).data;
				console.log(result);
				if(result.length==0){
					uni.showToast({
						title:'错误的用户名或密码',
						icon:'error'
					})
					return false;
				}
				uni.setStorageSync('userinfo', result[0]);
				uni.redirectTo({
					url: '/pages/admin/index/index'
				})
			},
			goRegister(){
				uni.navigateTo({
					url:'/pages/admin/register/register'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-pannel {
		.info {
			margin: auto;
			height: 300px;
			width: 200px;
			margin-top: 220rpx;
			padding-top: 100rpx;
			background-color: #F7F7F7;

			.title {
				text-align: center;
			}

			.name,
			.pwd {
				padding-left: 30rpx;
				display: flex;
				margin-bottom: 15rpx;

				label {
					width: 80rpx;
				}

				input {
					border: 1rpx solid gray;
				}
			}
		}

		.buttons {
			display: flex;
			justify-content: space-around;

			.login {
				text-align: center;
				width: 100rpx;
				line-height: 50rpx;
				cursor: pointer;
			}

			.register {
				text-align: center;
				width: 100rpx;
				line-height: 50rpx;
				cursor: pointer;
			}
		}
	}
</style>
