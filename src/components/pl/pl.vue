<template>
	<view style="z-index: 100000;position: relative;width:100%;height: 100%;background-color: #fff;">
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