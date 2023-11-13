<template>
	<pages-layout>
		<view class="content">
			<view class="text-area">
				<view v-for="item in data" :key="item.id">
					<view class="box" @tap="viewDetail(item._id)">
						<view class="box-title">
							{{ item.title }}
						</view>
						<view class="box-text">
							{{item.content.text.substring(0,50)}}
						</view>
						<view class="box-time">
							<uni-dateformat :date="item.createdtime" format="yyyy-MM-dd hh:mm"></uni-dateformat>
						</view>
					</view>
				</view>
			</view>
			<uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" />
		</view>
	</pages-layout>
</template>

<script>
	import * as _ from '../admin/admin-sql.js'
	export default {
		data() {
			return {
				title: 'Hello',
				data: [],
				pageSize: 10,
				pageCurrent: 1,
				total: 0,
				loading: false,
				articleCategory:null,
			}
		},
		onLoad(options) {
			console.log(options)
			this.getList(options?.keyword||'',options?.category||'');
		},
		onShow(){
			// const self=this;
			// uni.$on('category',function(options){
			// 	self.getList('',options?.category||'');
			// })
			// uni.$on('keyword',function(options){ 
			// 	self.getList(options?.keyword||'','');
			// })
		},
		methods: {
			async getList(keyword,category) {
				this.loading = true;
				const allList = (await _.allArticles(this.pageCurrent, this.pageSize,keyword,category ));
				console.log(allList);
				this.total = allList.count;
				this.data = allList.data;
				this.loading = false;
			},
			lower() {
				this.pageCurrent++;
				this.getList();
			},
			change(e) {
				// this.selectedIndexs.length = 0
				this.getList(e.current)
			},
			viewDetail(id) {
				uni.navigateTo({
					url: '/pages/article-detail/article-detail?id=' + id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		    min-height: 30vh;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		// display: flex;
		// justify-content: center;
		width: 100%;
		height: 100%;
	}

	.scroll-Y {
		height: 100%;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.box {
		margin: 40px 20rpx;
		padding: 10rpx;
		background: rgba(255, 255, 255, 0.5);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
		border-radius: 15px;
		box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);

		.box-title {
			text-align: center;
			font-weight: 500;
			font-size: 25px;
		}

		.box-text {
			margin-top: 10px;
			font-size: 18px;
			font-weight: 400;
			color: #878787;
		}

		.box-time {
			font-size: 16px;
			text-align: right;
			color: darkgray;
		}
	}
</style>