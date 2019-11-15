<template>
	<div class="content">
		<div class="top-buttom">
			<el-radio-group v-model="msg" class="top-buttom-list">
				<span @click="changeId('0', 1, '', '')">
					<el-radio-button label="1" >全部收藏（{{allnum}}）</el-radio-button>
				</span>
				<span v-for="(item1,index1) in conlleclist" :key="index1" @click="changeId(item1.Id, 1, item1.CollectionName, index1)">
					<el-radio-button :label="index1+2">{{item1.CollectionName}}（{{item1.Count}}）</el-radio-button>
				</span>
			</el-radio-group>
			<div class="edit">
				<span @click="againList">重命名</span>
				<span @click="deleteList">删除</span>
			</div>
		</div>
		
		<div style="min-height: 400px; padding-bottom: 50px;">
			<p class="no-works-appear" v-if="!picslist.length">暂无作品哦！</p>
			<waterfall :col='col' :data="picslist" v-else>
				<template>
					<div class="cell-item cell-item-shop" v-for="(item,index) in picslist" :key="index"
						@mouseenter="ImgShow(index)" @mouseleave="ImgHide(index)">
						<img v-if="item.Thumbnail" :lazyDistance="10" :src="imgUrl + item.Thumbnail" alt=""
						 :title="item.PicTitle" @click="ImgDetails(item.PicId)"/>
						<div class="item-body item-body_a" :class="{active:index==isActive}">
							<div class="item-body-icon st-icon" v-if="item.Thumbnail" @click="addStop(item.PicId)">
								<i></i>
							</div>
							<div class="item-body-icon sc-icon" v-if="item.Thumbnail" @click="deleteStop(item.Id, index)">
								<i></i>
							</div>
						</div>
						<div class="item-body item-body_b" :class="{active:index==isActive}">
							<div class="item-desc">{{item.pictitle}}</div>
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
				userid:"",
				page: 1,
				allnum:0,
				conlleclist: [],
				picslist: [],
				loadingId: 0,
				scroll: true,
				name: '',
				index1: ''
			}
		},
		methods:{
			// 修改收藏夹名称
			againList(){
				if (this.loadingId == 0) {
					this.$message({
						showClose: true,
						message: "选择要修改名称的收藏夹!"
					});
					return;
				}
				 this.$prompt('请输入名称', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(({value}) => {
					if (!value) {
						this.$message({
							showClose: true,
							message: "修改失败，输入名称不能为空！"
						});
						return
					}
					if (value.length < 2 ) {
						this.$message({
							showClose: true,
							message: "创建的收藏夹名称长度至少2"
						});
						return
					}
					helper.getAjax("collect/updatecollect", res => {
						if (res.code == 200) {
							this.$delete(this.conlleclist, this.index1)
							this.getcollectlist()
							this.$message({
								showClose: true,
								message: "修改成功！"
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
						UserId: this.userid,
						Id: this.loadingId,
						CollectionName: value,
					}, "post")
				}).catch(() => {});
			},
			// 删除分类
			deleteList(){
				if (this.loadingId == 0) {
					this.$message({
						showClose: true,
						message: "选择要删除的收藏夹!"
					});
					return;
				}
				this.$confirm('删除 “' + this.name + '” 该收藏夹？', '提示', {
					confirmButtonText: '删除收藏夹',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					helper.getAjax("collect/deletcollect", res => {
						if (res.code == 200) {
							this.$delete(this.conlleclist, this.index1)
							this.getcollectlist()
							this.$message({
								showClose: true,
								message: "作品已移除"
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
						Id: this.loadingId
					}, "post")
				}).catch(() => {})
			},
			// 收藏夹作品移除收藏夹
			deleteStop(PicId, index){
				this.$confirm('是否将作品移除收藏夹？', '提示', {
					confirmButtonText: '移除',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					helper.getAjax("collect/cancel", res => {
						if (res.code == 200) {
							this.$delete(this.picslist, index)
							this.getcollectlist()
							this.$message({
								showClose: true,
								message: "作品已移除"
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
						Id: PicId
					}, "post")
				}).catch(() => {})
			},
			// 收藏夹作品加入购物车
			addStop(PicId){
				this.$confirm('是否添加到购物车？', '提示', {
					confirmButtonText: '加入购物车',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					helper.getAjax("tuku/addcar", res => {
						if (res.code == 200) {
							this.$emit('shopNum',true)
							this.$message({
								showClose: true,
								message: "作品已加入购物车"
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
						UserId: this.userid,
						PicId: PicId
					}, "post")
				}).catch(() => {})
			},
			// 获取分类各项的图片数量
			getcollectlist(){
				var _this = this;
				helper.getAjax("collect/collectlist", function(res) {
					if (res.code == 200) {
						_this.allnum = 0;
						_this.conlleclist = res.data.baseinfo;
						for (var i= 0;i < res.data.baseinfo.length;i++) {
							_this.allnum  += res.data.baseinfo[i].Count;
						}
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
					page: 1,
					num: 100,
					userid:_this.userid
				}, "post")
				
			},
			//获取图片列表
			changeId(picid, page, name, index1){
				this.index1 = index1
				this.name = name;
				this.loadingId = picid;
				this.page = page;
				helper.getAjax("collect/mycplist", (res)=> {
					if (res.code == 200) {
						if (page == 1) {
							this.picslist = []
						}
					 this.picslist = this.picslist.concat(res.data.baseinfo);
					 console.log(res.data.baseinfo)
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
					page: page,
					num: 5,
					CId: picid,
					userid: this.userid
				}, "post")
				
			},
			loadmore(num) {
				this.page ++;
				setTimeout(() => {
					this.changeId(this.loadingId, this.page)
					this.scroll = true;
				}, 1000)
			},
			ImgShow(index){
				 this.isActive = index;
			},
			ImgHide(){
				 this.isActive = null
			},
			// 跳转详情页面
			ImgDetails(nId){
				this.app_this.$router.push({name: "details", query: {picId: nId}})
			},
		},
		created(){
			var self = this;
			this.userid = helper.getuserinfo().userId;
			this.getcollectlist();
			this.changeId(0, 1);
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
			app_this: {default: 'detailsApp', required: true} 
		}
	}
</script>

<style scoped>
	.top-buttom {
		margin: 20px auto 0;
		width: 80%;
		min-width: 800px;
		display: flex;
	}
	.top-buttom-list {flex: 1;}
	.edit {
		padding-top: 10px;
	}
	.edit span {
		margin-left: 10px;
		cursor: pointer;
	}
	.main {
		margin: 0 auto;
		width: 90%;
		min-width: 800px;
	}
	.item-body_a {
		background: transparent;
		padding: 0;
		width: auto;
		right: 6px;
		top: 6px;
		color: #fff;
	}
	.item-body-icon{
		width: 48px;
		height: 28px;
		background: rgba(0,0,0,0.3);
		margin-left: 10px;
		border-radius: 4px;
		background-size: auto 60%;
	}
	.st-icon i{
		background: url(../assets/img/i_7.png)no-repeat center;
	}
	.sc-icon i{
		background: url(../assets/img/i_6.png)no-repeat center;
	}
	.item-body-icon i {
		display: inline-block;
		width: 100%;
		height: 100%;
		background-size: auto 16px; 
	}
</style>

