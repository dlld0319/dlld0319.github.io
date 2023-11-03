<template>
	
	<view class="layout"  style="overflow: auto;">
		<view class="gotoadmin" @tap="gotoadmain()">
			去后台
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
				<uni-col :span="4" :xs="0">
					<view class="demo-uni-col dark">
						<view class="myInfo">
							<view class="info-title">
								我的信息
							</view>
							<view class="info-detail">
								{{infoDetail}}
								<text @tap="setClipboard()">欢迎使用邮箱联系,点击复制</text>
							</view>
						</view>
					</view>
				</uni-col>
				<uni-col :span="16" :xs="24">
					<view class="demo-uni-col dark">
						<slot></slot>
					</view>
				</uni-col>
				<uni-col :span="4" :xs="0">
					<view class="demo-uni-col dark"></view>
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
			<uni-easyinput prefixIcon="search" v-model="searchValue" placeholder="左侧图标" @iconClick="iconClick">
			</uni-easyinput>
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
					children: [{
							name: '文章',
							url: '/pages/index/index'
						},
						{
							name: '分类',
							url: '/pages/categorys/categorys'
						},
						{
							name: '说说',
							url: '/pages/daily/daily'
						}
					]
				}],
				infoDetail: '本人擅长并乐意从事各种软件开发相关工作，现掌握nodejs相关、前端页面技术、postgre与sqlserver',
				searchValue: '',
				active: '',
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
				console.log(this.categorys)
			},
			go(url) {
				uni.navigateTo({
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
				console.log(this.searchValue)
			},
			gotoadmain(){
				uni.navigateTo({
					url:'/pages/admin/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.gotoadmin{
		position: absolute;
		right: 20px;
		top: 10px;
	}
	.layout {
		background-color: #F4F5F7;
		height: 100vh;
	}

	.top {
		height: 150px;
		text-align: center;

		.menus {
			padding-top: 40px;
			display: inline-block;
			margin: 0 20px;

			.menu {
				font-size: 20px;
				line-height: 30px;
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
</style>
