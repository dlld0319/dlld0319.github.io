<template>
	<admin-layout>
		<view class="containt">
			<view class="create" @tap="create()">
				+新建文章
			</view>
			<view class="sent">
				<view>
					<view class="uni-container">
						<uni-table ref="table" :loading="loading" border stripe emptyText="暂无更多数据">
							<uni-tr>
								<uni-th width="150" align="center">日期</uni-th>
								<uni-th width="150" align="center">名称</uni-th>
								<uni-th width="204" align="center">设置</uni-th>
							</uni-tr>
							<uni-tr v-for="(item, index) in tableData" :key="index">
								<uni-td>{{ item.createdtime }}</uni-td>
								<uni-td>
									<view class="name">{{ item.title }}</view>
								</uni-td>
								<uni-td>
									<view class="uni-group">
										<button class="uni-button" size="mini" type="primary" @tap="edit(item._id)">修改</button>
										<button class="uni-button" size="mini" type="warn">删除</button>
									</view>
								</uni-td>
							</uni-tr>
						</uni-table>
						<view class="uni-pagination-box">
							<uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total"
								@change="change" />
						</view>
					</view>
				</view>
			</view>
		</view>
	</admin-layout>
</template>

<script>
	import * as _ from '../admin-sql.js'
	export default {
		data() {
			return {
				searchVal: '',
				tableData: [],
				// 每页数据量
				pageSize: 10,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				loading: false
			};
		},
		onLoad() {
			this.getList();
		},
		methods: {
			create(){
				uni.redirectTo({
					url:'/pages/admin/editor/editor'
				})
			},
			change(e) {
				this.$refs.table.clearSelection()
				this.selectedIndexs.length = 0
				this.getData(e.current)
			},
			async getList() {
				this.loading = true;
				const allList = (await _.allArticles(this.pageCurrent, this.pageSize,));
				console.log(allList);
				this.total = allList.count;
				this.tableData = allList.data;
				this.loading = false;
			},
			edit(id){
				uni.redirectTo({
					url:'/pages/admin/editor/editor?id='+id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.containt {
		padding-top: 100rpx;

		.create {
			padding: 10rpx 20rpx;
			display: inline-block;
			background-color: #F7F7F7;
			cursor: pointer;
		}
		
		.sent{
			margin-top: 20rpx;
			.uni-pagination-box{
				margin-top: 20rpx;
			}
		}
	}
</style>
