<template> <pages-layout>
		<view>
			<view class="uni-container">
				<view class="content">
					<view class="text-area">
						<view v-for="item in tableData" :key="item._id">
							<view class="box" @tap="viewDetail(item._id)">
								<view class="box-text">
									{{item.content}}
								</view>
								<view class="box-time">
									<uni-dateformat :date="item.createdtime" format="yyyy-MM-dd hh:mm"></uni-dateformat>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-pagination-box">
						<uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total"
							@change="change" />
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
				tableData: [],
				// 每页数据量
				pageSize: 10,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				loading: false,
			};
		},
		onLoad() {
			this.getList();
		},
		methods: {
			async getList() {
				this.loading = true;
				const allList = (await _.alldailies(this.pageCurrent, this.pageSize));
				console.log(allList);
				this.total = allList.count;
				this.tableData = allList.data;
				this.loading = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		// background: #f5f5dc70;
		min-height: 20vh;
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