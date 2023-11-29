<template>
	<pages-layout>
		<view class="page-detail" v-if="articleInfo">
			<view class="title">
				标题<br>
				<text style="text-decoration: underline;">{{articleInfo.title}}</text>
			</view>
			<view class="html" v-html="articleInfo.content.html">

			</view>
			<web-view class="bottom-send" :src="'../../static/utter.html?title='+articleInfo.title"></web-view>
		</view>
	</pages-layout>
</template>

<script>
	import * as _ from '../admin/admin-sql.js'
	export default {
		data() {
			return {
				articleInfo: null,
			};
		},
		onLoad(options) {
			this.initArticle(options.id)
		},
		methods: {
			async initArticle(id) {
				const result = await _.getOneArticle(id);
				this.articleInfo = result.data[0];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-detail {
		min-height: 75vh;
		background: white;
		padding-top: 20px;
		padding-left: 20px;
		padding-right: 20px;
		background: #f5f5dc70;
		margin: 5px 10px;

		.title {
			font-size: 30px;
			font-weight: 500;
			text-align: center;
		}

		.html {
			margin-top: 40px;
			background-color: antiquewhite;
			padding: 20px;
			user-select: text;
			-webkit-user-select: text;
			margin-bottom: 400px;
		}
	}
</style>
