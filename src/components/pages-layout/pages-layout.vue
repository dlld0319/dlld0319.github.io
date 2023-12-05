<template>
	<view class="layout" style="overflow: auto;">
		<view v-if="show1" class="show-liuyan" style="text-align: center;">
			<view class="clossse" @tap="show1=false;show2=false">
				关闭
			</view>
			<pl v-if="show2" title='留言'></pl></text>
		</view>
		<view class="top">
			<view class="menus" v-for="(items,indexs) in menus[0].children" :key="indexs">
				<view :class="active.includes(items.url)?'active menu':'menu'" @tap="go(items.url)">
					{{items.name}}
				</view>
			</view>
			<view class="menus" @tap="openSearch()">
				<view class="menu ">
					<uni-icons type="search" size="28"></uni-icons>
				</view>
			</view>
		</view>
		<view class="content">
			<uni-row class="demo-uni-row">
				<uni-col :span="1" :xs="0">
				</uni-col>
				<uni-col :span="16" :xs="24">
					<view class="demo-uni-col dark">
						<slot></slot>
					</view>
				</uni-col>
				<uni-col :span="7" :xs="0">
					<view class="demo-uni-col dark">
						<view class="myInfo">
							<view class="info-title">
								我的信息
							</view>
							<view class="info-detail">
								{{infoDetail}}<br>
								<text style="font-weight: 600;cursor: pointer;    text-decoration: underline;"
									@tap="setClipboard()">欢迎使用邮箱联系,点击复制</text>
							</view>
						</view>
						
						<view class="myInfo" style="margin-top: 50px;">
							<view class="info-title">
								个人简历
							</view>
							<view class="info-detail" style="padding: 20px 0;text-align: center;">
								<text style="font-weight: 600;cursor: pointer;    text-decoration: underline;"
									@tap="gotomyself()">点击去查看</text>
							</view>
						</view>
						<view class="myInfo" style="margin-top: 50px;">
							<view class="info-title" @tap="show1=true;show2=true">
								点击留言&查看留言
							</view>
							<view class="info-detail" style="padding: 20px 0;text-align: center;font-size: 13px;">
								本功能是基于github issue网络不好无法使用~~
							</view>
						</view>
					</view>
				</uni-col>
			</uni-row>
		</view>
		<view class="bottom">
			<uni-row class="demo-uni-row">
				<uni-col :span="12" :push="6" :xs="18">
					<view class="demo-uni-col dark">Copyright © {{now()}} liangdong</view>
				</uni-col>
			</uni-row>
		</view>
		<uni-popup ref="popup" background-color="#fff">
			<view class="pop-search">
				<view class="searchinput">
					<uni-easyinput prefixIcon="search" v-model="searchValue" placeholder="请输入搜索内容"
						@iconClick="iconClick">
					</uni-easyinput>
				</view>
				<view class="searchbtn" @tap="search()">
					搜索
				</view>
			</view>
		</uni-popup>
	</view>

</template>

<script>
	import * as _ from '../../pages/admin/admin-sql.js'
	export default {
		name: "pages-layout",
		data() {
			return {
				categorys: [],
				menus: [{
					name: '主页',
					url: '',
					// children: [{
					// 		name: '文章',
					// 		url: '/pages/index/index'
					// 	},
					// 	{
					// 		name: '分类',
					// 		url: '/pages/categorys/categorys'
					// 	},
					// 	{
					// 		name: '说说',
					// 		url: '/pages/saysomthing/saysomthing'
					// 	}
					// ]
				}],
				infoDetail: '本人擅长并乐意从事各种软件开发相关工作，现掌握nodejs相关、前端页面技术、postgre与sqlserver',
				searchValue: '',
				active: '',
				show2:false,
				show1:false,
			}
		},
		created() {
			this.initCategory();
			var pages = getCurrentPages();
			var currentPage = pages[pages.length - 1] //获取当前页面的对象
			this.active = currentPage.route //当前页面url
		},
		methods: {
			now() {
				const defaultYear = '2023'
				return `${defaultYear}-${(new Date().getFullYear())}`
			},
			async initCategory() {
				const result = await _.allCategories();
				this.categorys = result.data.map(o => o.name)
			},
			go(url) {
				uni.reLaunch({
					url: url
				})
			},
			setClipboard() {
				uni.setClipboardData({
					data: 'ld122481669@126.com',
					success() {
						uni.showToast({
							title: '复制成功',
							duration: 1500
						})
					}
				})
			},
			openSearch() {
				this.$refs.popup.open('center')
			},
			iconClick() {
				this.search();
			},
			gotoadmain() {
				uni.navigateTo({
					url: '/pages/admin/index/index'
				})
			},
			search() {
				uni.$emit('keyword', {
					keyword: this.searchValue
				})
				uni.reLaunch({
					url: '/pages/index/index?keyword=' + this.searchValue,
					success() {}
				})
			},
			gotomyself(){
				uni.navigateTo({
					url: '/pages/article-detail/article-detail?id=' + '655204caa7c4329ea56c7838'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.gotoadmin {
		position: absolute;
		right: 20px;
		top: 10px;
		cursor: pointer;
	}

	.layout {
		// background: url(https://mp-fb19cbbf-7877-4ed9-b04c-6ee15f347da4.cdn.bspapp.com/images/background.png) no-repeat;
		background-size: 100% 100%;
		height: 100vh;
	}

	.top {
		height: 60px;
		text-align: center;

		.menus {
			padding-top: 40px;
			display: inline-block;
			margin: 0 20px;

			.menu {
				font-size: 20px;
				line-height: 30px;
				cursor: pointer;
			}

			.active {
				position: relative;
			}

			.active::before {
				position: absolute;
				bottom: -10px;
				left: 50%;
				transform: translate(-50%);
				width: 30px;
				height: 2px;
				content: ' ';
				background-color: #ff8182;
			}
		}
	}

	.content {}

	.bottom {
		position: fixed;
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

	.myInfo {
		display: block;
		min-width: 120px;
		padding-left: 8px;

		.info-title {
			display: block;
			font-weight: 600;
			font-size: 18px;
			margin-bottom: 10px;
		}

		.info-detail {
			display: block;
			font-size: 15px;
			font-weight: 500;
			padding: 5px;
			color: #878787;
			background: white;
			border-radius: 5px;
			line-height: 28px;
		}
	}

	.pop-search {
		display: block;
		padding: 50px 100px;
		width: 300px;
		background-color: #0a1e571c;
		border-radius: 20px;

		.searchinput {
			display: inline-block;

		}

		.searchbtn {
			background-color: #ff81829e;
			color: #F4F5F7;
			display: inline-block;
			padding: 5px;
			margin-left: 16px;
			padding-top: 3px;
			padding-bottom: 2px;
			border-radius: 3px;
			cursor: pointer;
			vertical-align: text-bottom;
		}
	}
	
	.show-liuyan{
	position: fixed;
	height: 100%;
	width: 100%;
	background-color: rgba(0,0,0,0.2);
	}
	
	.clossse{
		display: inline-block;
		width: 80px;
		margin-top: -30px;
		background-color: beige;
	}
</style>