<template>
	<div class="content">
		<div class="top-buttom">
			<el-radio-group v-model="msg">
				<span @click="changestate('0', 1)">
					<el-radio-button label="1">全部供稿（{{allnum}}）</el-radio-button>
				</span>
				<span v-for="(item,index) in picstypelist" :key="index" @click="changestate(item.PicTypeId, 1)">
					<el-radio-button :label="index+2"> {{item.TypeName}}（{{item.Num}}）</el-radio-button>
				</span>
			</el-radio-group>
		</div>

		<div style="min-height: 400px; padding-bottom: 50px;">
			<p class="no-works-appear" v-if="!picslist.length">暂无作品哦！</p>
			<waterfall :col='col' :data="picslist" v-else>
				<template>
					<div class="cell-item cell-item-shop" v-for="(item,index) in picslist" :key="index" @mouseenter="ImgShow(index)"
					 @mouseleave="ImgHide(index)">
						<img v-if="item.Thumbnail" :lazyDistance="10" :src="imgUrl + item.Thumbnail" alt=""
						 :title="item.PicTitle"  @click="ImgDetails(item.Id)"/>
						<div class="item-body item-body_a" :class="{active:index==isActive}" @click="clearshop(item.Id, index)">
							<i class="el-icon-delete"></i>
						</div>
						<div class="item-body item-body_b" :class="{active:index==isActive}">
							<div class="item-desc">{{item.PicTitle}}</div>
							<div class="item-footer" v-show="item.Selected">精选</div>
						</div>
					</div>
				</template>
			</waterfall>
		</div>




	</div>
</template>

<script>
	import axios from 'axios';
	import helper from '../assets/js/helper.js';
	export default {
		data() {
			return {
				imgUrl: helper.imgUrl,
				isActive: null,
				col: 4,
				msg: 1,
				userid: "",
				page: 1,
				allnum: 0,
				picstypelist: [],
				picslist: [],
				scroll: true,
				loadingId: 0
			}
		},
		methods: {
			clearshop(Id, index){
				this.$confirm('是否删除选中的作品？', '提示', {
					confirmButtonText: '确定删除',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					helper.getAjax("tuku/delpic", res => {
						if (res.code == 200) {
							this.$delete(this.picslist, index)
							this.ContriCount()
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
						Id: Id
					}, "post")
				}).catch(() => {})
			},
			//获取用户供稿列表的图数量
			ContriCount() {
				var _this = this;
				helper.getAjax("tuku/ContriCount", function(res) {
					if (res.code == 200) {
						_this.allnum = 0;
						_this.allnum = res.data.All;
						_this.picstypelist = res.data.List;
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
					userId: _this.userid
				}, "post")
			},
			//获取对应的图片列表
			changestate(typeid, page) {
				var _this = this;
				_this.loadingId = typeid;
				if (page == 1) {
					this.page = 1
				}
				helper.getAjax("tuku/seachpicbytype", (res)=> {
					if (res.code == 200) {
						if (page == 1) {
							this.picslist = []
						}
						_this.picslist = _this.picslist.concat(res.data.baseinfo);
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
					ParentId: typeid,
					page: page,
					rows: 5,
					userId: _this.userid
				}, "post")

			},
			// 触底加载数据
			loadmore(num) {
				this.page ++;
				setTimeout(() => {
					this.changestate(this.loadingId, this.page)
					this.scroll = true;
				}, 1000)
			},
			ImgShow(index) {
				this.isActive = index;
			},
			ImgHide() {
				this.isActive = null
			},
			// 跳转详情页面
			ImgDetails(nId) {
				this.app_this.$router.push({
					name: "details",
					query: {
						picId: nId
					}
				})
			},
		},
		created() {
			var self = this;
			this.userid = helper.getuserinfo().userId;
			this.ContriCount();
			this.changestate(0, 1);
			window.onscroll = function() {
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
				var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
				if (scrollHeight == scrollTop + windowHeight) {
					if (self.scroll) {
						self.scroll = false;
						self.loadmore()
					}
				}
			}
		},
		props: {
			app_this: {
				default: 'detailsApp',
				required: true
			}
		}
	}
</script>

<style scoped>
	.top-buttom {
		margin: 20px auto 0;
		width: 80%;
		min-width: 800px;
	}

	.main {
		margin: 0 auto;
		width: 90%;
		min-width: 800px;
	}
	.item-body_a {
		width: auto;
		border-radius: 4px;
		right: 6px;
		top: 6px;
		color: #fff;
	}
	.item-body_a i{
		padding: 5px;
	}
</style>
