<template>
	<view style="z-index: 100000;position: relative;width:100%;height: 100%;background-color: #fff;">
		<view class="" style=" padding-top: 110px;font-size: 30px;">
			已经在加载，如果未打开可能是网络问题
		</view>
		<web-view   class="wb" :src="'../../static/utter.html?title='+title"></web-view>
	</view>
</template>

<script>
	export default {
		name:"pl",
		data() {
			return {
				
			};
		},
		props: {
			title: {
				type: String,
				default: ''
			},
		},
	}
</script>

<style lang="scss">
	.wb{
		width: 100vw;
		height: 100vh;
	}
</style>