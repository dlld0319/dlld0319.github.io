<template>
	<view>
		<admin-layout>
			<view class="containt">
				<view class="create" @tap="create()">
					+添加说说
				</view>
				<view class="sent">
					<view>
						<view class="uni-container">
							<uni-table ref="table" :loading="loading" border stripe emptyText="暂无更多数据">
								<uni-tr>
									<uni-th width="150" align="center">时间戳</uni-th>
									<uni-th width="150" align="center">内容</uni-th>
									<uni-th width="204" align="center">操作</uni-th>
								</uni-tr>
								<uni-tr v-for="(item, index) in tableData" :key="index">
									<uni-td><uni-dateformat :date="item.createdtime" format="yyyy-MM-dd hh:mm"></uni-dateformat></uni-td>
									<uni-td>
										<view class="name">{{ item.content }}</view>
									</uni-td>
									<uni-td>
										<view class="uni-group">
											<button class="uni-button" size="mini" type="primary"
												@tap="updatePop(item._id, item.content)">修改</button>
											<button class="uni-button" size="mini" type="warn"
												@tap="deleteData(item._id)">删除</button>
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
		<uni-popup ref="popup" background-color="#fff">
			<view class="edit-pannel">
				<view class="tags">
					<label for="">内容：</label>
					<uni-easyinput type="textarea" placeholder="请输入内容" v-model="categoryName" />
				</view>
				<view class="buttons">
					<view class="save" @tap="save()">
						保存
					</view>
					<view class="cancel" @tap="cancel()">
						取消
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
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
				loading: false,
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				value: '',
				updateId: 0,
				categoryName: '',
			};
		},
		onLoad() {
			this.getList();
		},
		methods: {
			create() {
				this.categoryName='';
				this.createPop();
			},
			change(e) {
				this.$refs.table.clearSelection();
				this.pageCurrent = e.current;
				this.getList()
			},
			async getList() {
				this.loading = true;
				const allList = (await _.alldailies(this.pageCurrent, this.pageSize));
				this.total = allList.count;
				this.tableData = allList.data;
				this.loading = false;
			},
			createPop() {
				this.$refs.popup.open('center');
			},
			updatePop(id,content) {
				this.updateId = id;
				this.categoryName=content;
				this.$refs.popup.open('center');
			},
			cancel() {
				this.updateId = 0;
				this.$refs.popup.close();
			},
			async save() {
				if (this.updateId) {
					await _.updateDaily(this.updateId, this.categoryName)
				} else {
					await _.createDaily(this.categoryName);
				}
				this.categoryName='';
				this.$refs.popup.close();
				await this.getList();
			},
			async deleteData(id) {
				await _.deleteDaily(id);
				await this.getList();
			}
		}
	}
</script>

<style lang="scss" scoped>
.containt {

		.create {
			padding: 10rpx 20rpx;
			display: inline-block;
			background-color: #F7F7F7;
			cursor: pointer;
		}

		.sent {
			margin-top: 20rpx;

			.uni-pagination-box {
				margin-top: 20rpx;
			}
		}
	}

	.edit-pannel {
		height: 150px;
		width: 300px;
		padding: 30rpx;
		border-radius: 20px;

		.tags {
			display: flex;

			label {
				line-height: 35px;
			}
		}
	}

	.buttons {
		display: flex;
		justify-content: space-around;
		margin-top: 20px;
		.cancel,
		.save {
			padding: 10rpx 40rpx;
			background-color: #F7F7F7;
			color: grey;
		}

		.save {
			color: goldenrod;
		}
	}
	.uni-button{
		margin-right: 10px;
	}
</style>
