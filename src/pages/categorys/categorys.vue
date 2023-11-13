<template>
	<pages-layout>
		<view class="categories" v-if="categorids.length">
			<view class="uni-container">
				<view class="boxinside" v-for="(item,index) in categorids" :key="index">
					<view @tap="gotoList(item._id)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
	</pages-layout>
</template>

<script>
	import * as _ from '../admin/admin-sql.js';
	export default {
		data() {
			return {
				categorids: [],
			};
		},
		onLoad() {
			this.getList();
		},
		methods: {
			async getList() {
				const allList = (await _.allCategories());
				this.categorids=allList.data;
			},
			gotoList(id){
				uni.reLaunch({
					url:'/pages/index/index?category='+id,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-container{
		padding:20px 100px;
		.boxinside{
			border-bottom: 1px solid black;
			display: inline-block;
			cursor: pointer;
			min-width: 30px;
			margin: 20px 30px;
			text-align: center;
		}
	}
</style>