<template>
	<scroll-view class="sidebar" scroll-y="true">
		<uni-data-menu ref="menu" :value="currentMenu" :staticMenu="userInf()?staticMenu2:staticMenu" collection="opendb-admin-menus"
			:page-size="500" :field="field" where="enable==true" orderby="sort asc" active-text-color="#409eff" @select="select">
		</uni-data-menu>
	</scroll-view>
</template>

<script>
	import config from '@/admin.config.js'
	export default {
		data() {
			return {
				...config.sideBar,
				field: 'url as value, name as text, menu_id, parent_id, sort, icon, permission',
				currentMenu: '/'
			}
		},
		computed: {
			userInfo () {
				const info= uni.getStorageSync('userinfo')
				console.log(info)
				return info||{username:'游客'}
			}
		},
		watch: {
			userInfo: {
				immediate: true,
				handler(newVal, oldVal) {
					if (newVal) {
						// 当用户信息发生变化后，重新加载左侧menu
					}
				}
			}
		},
		methods: {
			select(e) {
				let url = e.value
				if (!url) {
					url = this.active
				}
				this.clickMenuItem(url)
				// #ifdef H5
				// #ifdef VUE3
				uni.hideLeftWindow()
				// #endif
				// #endif
			},
			clickMenuItem(url) {
				uni.redirectTo({
					url: url,
					fail: () => {
						uni.showModal({
							title: '提示',
							content: '页面 ' + url + ' 跳转失败',
							showCancel: false
						})
					}
				})
			},
			splitFullPath(path) {
				if (!path) {
					path = '/'
				}
				return path.split('?')[0]
			},
			userInf(){
				return uni.getStorageSync('userinfo')?false:true;
			}
		}
	}
</script>

<style lang="scss">
	$top-window-bg-color:#fff;
	$top-window-text-color:grey;
	$menu-text-color-actived:blue;
	$left-window-bg-color:#fff;
	$left-window-bg-color:#fff;
	.sidebar {
		position: fixed;
		// top: var(--top-window-height); // useless
		width: 240px;
		height: calc(100vh - (var(--top-window-height)));
		box-sizing: border-box;
		border-right: 1px solid darken($left-window-bg-color, 8%);
		background-color: $left-window-bg-color;
		padding-bottom: 10px;
	}
	/* #ifdef H5 */
	.sidebar ::-webkit-scrollbar {
		display: none;
		// scrollbar-width: thin;
	}
	/* #endif */

	.title {
		margin-left: 5px;
	}
</style>
