<template>
	<div class="content">
		<p class="top-nav">购物车</p>
		<el-row :gutter="20" class="main">

			<el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="3" v-for="(item,index) in shopcar" :key="index">
				<div class="tk-purple">
					<label>
						<input class="tk-input" type="checkbox" v-model="checkList" :value="item.PicId + ',' + item.Id"/>
						<img class="tk-img" v-if="item.Thumbnail" :src="imgUrl + item.Thumbnail" alt="" :title="item.PicTitle" />
					</label>
				</div>
			</el-col>
			<p class="no-works-appear" v-if="!shopcar.length">暂无作品哦！</p>

		</el-row>
		<!-- 底部 -->
		<div class="tk-bottom">
			<label><input class="tk-but" type="checkbox" v-model='checked' @click='checkedAll' />全选</label>
			<div class="tk-delete" @click="clearshop">删除作品</div>
			<div class="tk-xz">
				<span class="tk-num">已选图片<span>{{checknum}}</span>张</span>
				<el-button type="success" @click="subDownload">批量下载</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import helper from '../assets/js/helper.js';
	import download from '../assets/js/download.js';
	export default {
		data() {
			return {
				imgUrl: helper.imgUrl,
				userid: "",
				shopcar: [],
				checked: false,
				checkList: [],
				checknum: 0,
				clearArr: [],
				downloadArr: []
			}
		},
		created() {
			this.userid = helper.getuserinfo().userId;
			this.getShopclist();
		},
		methods: {
			// 下载图片
			subDownload() {
				if (this.downloadArr.length <= 0) {
					this.$message({
						showClose: true,
						message: "请选择下载图片！"
					});
					return
				}
				this.$confirm('是否下载选中的作品？', '提示', {
					confirmButtonText: '确定下载',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					window.open(helper.webUrl + "annexes/downloadPics?data={\"userId\":\"" + this.userid +
						"\",\"list\":" + JSON.stringify(this.downloadArr) + "}");
				}).catch(() => {})
			},
			//全选按钮
			checkedAll() {
				var _this = this;
				if (_this.checked) { //实现反选
					_this.checkList = [];
				} else { //实现全选
					_this.checkList = [];
					this.shopcar.forEach(function(item, index) {
						_this.checkList.push(item.PicId + ',' + item.Id);
					});
				}
				_this.checknum = _this.checkList.length;
			},
			// 删除购物车作品
			clearshop(){
				if (this.clearArr.length <= 0) {
					this.$message({
						showClose: true,
						message: "请选择要删除的图片！"
					});
					return
				}
				var clearData = this.clearArr.reduce((init, item, index) => {
				 init.push({Id: item})
				  return init
				},[])
				this.$confirm('是否删除选中的作品？', '提示', {
					confirmButtonText: '确定删除',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
					helper.getAjax("tuku/deletecar", res => {
						if (res.code == 200) {
							this.getShopclist()
							this.checknum = 0
							this.checkList = []
							this.$emit('shopNum',true)
							this.$message({
								showClose: true,
								message: "所选的作品已经删除"
							});
						} else {
							this.$message({
								showClose: true,
								message: res.info
							});
						}
						if (res.code == 410) {
							localStorage.removeItem('$tk_userinfo')
						}
					}, {
						Ids: clearData
					}, "post")
					
					
					
				}).catch(() => {})
			},
			// 获取购物车列表
			getShopclist() {
				var _this = this;
				helper.getAjax("tuku/shopcar", function(res) {
					if (res.code == 200) {
						_this.shopcar = res.data.carlist;
					} else {
						_this.$message({
							showClose: true,
							message: res.info
						});
					}
					if (res.code == 410) {
						localStorage.removeItem('$tk_userinfo')
					}
				}, {
					page: 1,
					num: 1000,
					UserId: _this.userid
				}, "post")

			},

		},
		watch: {
			'checkList': {
				handler: function(val, oldVal) {
					if (val.length === this.shopcar.length) {
						this.checked = true;
					} else {
						this.checked = false;
					}
					this.checknum = this.checkList.length;
					var downloadArr = [], clearArr=[];
					for (let i = 0; i < val.length; i++) {
						var arr;
						arr = val[i].split(',')
						downloadArr.push(arr[0])
						clearArr.push(arr[1])
					}
					this.downloadArr = downloadArr
					this.clearArr = clearArr
				}
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 90%;
		margin: 30px auto 0;
		background: #fff;
		padding: 0 40px;
		box-sizing: border-box;
	}

	.top-nav {
		line-height: 80px;
		margin: 0;
		font-weight: 600;
	}
	
	.main {min-height: 300px;}
	.tk-purple {
		position: relative;
		margin: 0 auto 30px;
		height: 120px;
		overflow: hidden;
		box-shadow: 0px 0px 8px #BCD;
	}

	.tk-img {
		width: 100%;
		min-height: 100%;
		cursor: pointer;
	}

	.tk-but,
	.tk-input {
		position: absolute;
		top: 10px;
		left: 10px;
		width: 20px;
		height: 20px;
		outline: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background: url(../assets/img/xz_01.jpg);
		background-size: 100%;
		cursor: pointer;
	}

	.tk-but:checked,
	.tk-input:checked {
		background: url(../assets/img/xz_02.jpg);
		background-size: 100%;
	}

	.tk-bottom {
		position: relative;
		padding: 20px 0 30px;
		display: flex;
		align-items: center;
	}

	.tk-but {
		position: static;
		margin-right: 10px;
	}

	.tk-bottom label {
		display: flex;
		cursor: pointer;
	}

	.tk-delete {
		line-height: 16px;
		margin-left: 20px;
		border-left: 2px solid #aaa;
		padding-left: 20px;
		cursor: pointer;
	}

	.tk-xz {
		position: absolute;
		right: 0;
		top: 12px;
	}

	.tk-num {
		margin-right: 20px;
	}

	.tk-num span {
		font-size: 24px;
		font-weight: 600;
		margin: 0 5px;
		color: #00CE7C;
	}
</style>
