<template>
	<view class="layout">
		<view class="top">

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
	export default {
		name: "pages-layout",
		data() {
			return {

			};
		},
		methods: {
			now() {
				const defaultYear = '2023'
				return `${defaultYear}-${(new Date().getFullYear())}`
			},
		}
	}
</script>

<style lang="scss" scoped>
	.layout{
		background-color: #F4F5F7;
		height: 100vh;
	}
	.top {
		height: 100px;
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
