<template>
	<div class="content">
		<p class="xq-title xq">{{baseinfo.PicTitle}}&emsp;</p>
		<div class="xq-nav xq">
			<span><i class="el-icon-time"></i> 上传时间：{{baseinfo.UploadTime}}</span>
			<span><i class="el-icon-view"></i> {{baseinfo.Brower}} 浏览</span>
			<span><i class="el-icon-star-off"></i> {{baseinfo.Collection}} 收藏</span>
		</div>
		
		<!-- 主体 -->
		<el-container class='main xq'>
		  <el-main class="xq-main">
				<div class="xq-img">
					<viewer :images="[imgUrl + baseinfo.Thumbnail]" > 
						<img v-if="baseinfo.Thumbnail" :src="imgUrl + baseinfo.Thumbnail"/>
					</viewer>
				</div>
				<div class="xq-text">
					版权信息：{{baseinfo.Copyright}}
				</div>
			</el-main>
		  <el-aside width="300px">
				<div class="xq-sc">
					<el-button type="success" round @click="myCollection(baseinfo.Id)">收 藏</el-button>
					<el-button type="success" round @click="myCar(baseinfo.Id)">加入购物车</el-button>
				</div>
				<div class="xq-gm">
					<el-button type="success" round @click="purchase()">立即购买</el-button>
				</div>
				<p class="xq-right-title">图片信息</p>
				<div class="xq-list">
					<span>图片编号</span>
					<span>{{baseinfo.Number}}</span>
				</div>
				<div class="xq-list">
					<span>分类</span>
					<span>{{baseinfo.TypeName}}</span>
				</div>
				<div class="xq-list">
					<span>大小</span>
					<span>{{baseinfo.Size}}kb</span>
				</div>
				<div class="xq-list">
					<span>格式</span>
					<span>{{baseinfo.Format}}</span>
				</div>
				<div class="xq-list">
					<span>下载所需积分</span>
					<span style="font-size: 20px; color: #00CE7C;">{{baseinfo.Integral}}</span>
				</div>
				<p class="xq-right-title">图片标签</p>
				<div class="xq-content">
					{{baseinfo.Keyword}}
				</div>
			</el-aside>
		</el-container>
		
		<!-- 相似图片 -->
		<div class="similar">
			<div class="xq">
				<p style="line-height: 100px;">相似图片</p>
				<p class="no-works-appear" v-if="!imgList.length">暂无相似作品</p>
				<el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="6" v-for="(item, index) in imgList" :key="index" >
					<div class="similar-img" @mouseenter="ImgShow(index)" @mouseleave="ImgHide(index)" @click="godetails(item.Id)">
						<img v-if="item.Thumbnail" :src="imgUrl + item.Thumbnail" />
						<div class="item-body item-body_b" :class="{active:index==isActive}">
							<div class="item-desc">{{item.PicTitle}}</div>
							<div class="item-footer" v-show="item.Selected">精选</div>
						</div>
					</div>
				</el-col>
			</div>
		</div>
		

		<!-- 收藏夹弹窗 -->
		<div class="tk-top-back" v-if="shopCar">
			<div class="coll tk-back-info">
				<p class="coll-title">加入收藏夹 <i class="el-icon-close" @click="closeColl"></i></p>
				<el-select v-model="value" :placeholder="collNum" class="coll-content" @change="currentSel">
					<el-option
						v-for="item in options"
						:key="item.Id"
						:label="item.CollectionName"
						:value="item.Id">
					</el-option>
				</el-select>
				<div class="add-coll">
					<el-input placeholder="新建收藏夹" v-model="addInput" clearable></el-input><span @click="addColl()">保存</span>
				</div>
				<div class="coll-sub" @click="Preservation()">加入收藏夹</div>
			</div>
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
				collNum: '我的收藏夹(0)',
				collId: '',
				shopCar: false,
				addInput: '',
				options: [],
				value: '',
				picId: '',
				UserId: '',
				listId: '',
				baseinfo: {},
				imgList: []
			}
		},
		methods:{
			// 跳转到详情页
			godetails(id){
				let routeData = this.$router.resolve({
				   name: "details",
				   query: {picId: id}
				});
				window.open(routeData.href, '_blank');
			},
			// 立即购买
			purchase(){
				this.myCar(this.picId)
				this.app_this.$router.push("shop")
			},
			// 加入购物车
			myCar(picId){
				var self = this;
				// 判断是否登陆
				if (self.myLogin()) return;
				helper.getAjax("tuku/addcar", function(res) {
					if (res.code == 200) {
						self.$emit('shopNum',true)
						self.$message({
							type: "success",
							showClose: true,
							message: "成功加入购物车！"
						});
					} else {
						self.$message({
							showClose: true,
							message: res.info
						});
					}
					if (res.code == 410) {
						localStorage.removeItem('$tk_userinfo')
					}
				}, {
					PicId: picId,
					UserId: self.UserId
				}, "post")
			},
			// 收藏	
			myCollection(picId){
				if (this.myLogin()) return;
				this.shopCar = true;
			},
			// 关闭收藏弹窗
			closeColl(){
				this.shopCar = false;
			},
			// 获取收藏夹的选中值
			currentSel(selVal){
				this.collId = selVal
			},
			// 保存图片到收藏夹
			Preservation(){
				var _this = this;
				if (!_this.value) {
					_this.$message({
						showClose: true,
						message: "请选择收藏夹"
					});
					return
				}
				helper.getAjax("collect/addmycollect", function(res) {
					if (res.code == 200) {
						_this.$message({
							type: "success",
							showClose: true,
							message: "添加成功！"
						});
						_this.shopCar = false;
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
					PicId: _this.picId,
					CId: _this.collId
				}, "post")
			},
			// 添加收藏夹
			addColl(){
				var _this = this;
				if (!_this.addInput) {
					_this.$message({
						showClose: true,
						message: "请填写收藏夹名"
					});
					return
				}
				helper.getAjax("collect/addcollect", function(res) {
					if (res.code == 200) {
						_this.$message({
							type: 'success',
							showClose: true,
							message: "收藏夹添加成功！"
						});
						_this.addInput = ''
						_this.obtainList();
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
					CollectionName: _this.addInput,
					UserId: _this.UserId
				}, "post")
				
				
			},
			// 获取收藏夹列表
			obtainList(){
				var _this = this;
				helper.getAjax("collect/collectlist", function(res) {
					if (res.code == 200) {
						_this.options = res.data.baseinfo;
						_this.collNum =  '我的收藏夹(' + _this.options.length + ")"
						
						
					} else {
						// _this.$message({
						// 	showClose: true,
						// 	message: res.info
						// });
					}
					if (res.code == 410) {
						localStorage.removeItem('$tk_userinfo')
					}
				}, {
					userid: _this.UserId,
					page: 1,
					num: 100
				}, "post")
			},
			// 获取图片详情
			myDetails(picId){
				var _this = this;
				helper.getAjax("tuku/picinfo", function(res) {
					if (res.code == 200) {
						_this.baseinfo = res.data.baseinfo;
						_this.cplist_img(_this.baseinfo.PicTypeId)
					} 
					if (res.code == 410) {
						localStorage.removeItem('$tk_userinfo')
					}
				}, {
					PicId: picId
				}, "post")
			},
			// 判断是否登陆 
			myLogin(){
				if(JSON.stringify(helper.getuserinfo()) == '{}'){
					this.$confirm('请先登录！', '提示', {
						confirmButtonText: '请先登录',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.tk_this.$router.push("myLogin")
					}).catch(() => {})
					return true;
				} 
			},
			// 获取相似列表
			cplist_img(type) {
				helper.getAjax("tuku/seachpicbytype", res => {
					if (res.code == 200) {
						this.imgList = res.data.baseinfo
					}
					if (res.code == 410) {
						localStorage.removeItem('$tk_userinfo')
					}
				}, {
					ParentId: type,
					page: 1,
					rows: 6
				}, "post")
			},
			ImgShow(index){
				 this.isActive = index;
			},
			ImgHide(){
				 this.isActive = null;
			},
		},
		created(e) {
			this.UserId = helper.getuserinfo().userId;
			this.picId = this.$route.query.picId
			this.myDetails(this.picId);
			this.obtainList()
			document.documentElement.scrollTop = 0
		},
		props: {
			app_this: {default: 'detailsApp', required: true},
			tk_this: {default: 'tk_this', required: true} 
		}
	}
</script>

<style scoped>
	.xq {width: 70%;min-width: 800px; margin: 0 auto;}
	.content {min-width: 800px; border-top: 1px solid #eee; min-height: 700px;}
	.xq-title {
		font-weight: 600;
		margin-top: 50px;
		line-height: 30px;
	}
	.xq-nav {
		margin-top: 10px;
		font-size: 14px;
		color: #999;
	}
	.xq-nav span {margin-right: 30px;}
	.main {margin: 30px auto 50px;}
	.xq-main {padding: 0 50px 0 0;}
	.xq-img {
		width: 100%;
		height: 500px;
		overflow: hidden;
		border: 8px solid #cde;
		border-radius: 2px;
		box-sizing: border-box;
	}
	.xq-img div {display: flex;align-items: center;width:100%;height: 100%;background: #000000;border-radius: 4px;}
	.xq-img img {width: 100%;}
	.xq-text {margin-top: 20px;line-height: 24px;}
	.xq-sc button {width: 140px;}
	.xq-sc button:nth-child(2) {border: 1px solid #00CE7C; background: #fff!important; color: #00CE7C;}
	.xq-gm {margin-top: 16px;}
	.xq-gm button {width: 290px;}
	.xq-right-title {font-weight: 600;margin:20px 0 10px;}
	.xq-list {display: flex;align-items: center;padding: 5px 0;}
	.xq-list span {display: inline-block;width: 100px;line-height: 24px;font-size: 14px;}
	.xq-list span:nth-child(2){flex: 1;}
	.xq-content {font-size: 15px;line-height: 24px;}
	.coll-title {
		border-bottom: 1px solid #eee;
		line-height: 40px;
	}
	.coll-content {
		padding: 20px 0;
		width: 100%;
	}
	.add-coll {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.add-coll span {
		background: #00CE7C;
		color: #fff;
		padding: 0 10px;
		line-height: 24px;
		border-radius: 12px;
		cursor: pointer;
	}
	.coll-title i {
		float: right;
		padding: 10px;
		font-size: 20px;
	}
	.coll-sub {
		display: inline-block;
		background: #00CE7C;
		color: #fff;
		float: right;
		line-height: 24px;
		margin: 20px 0 10px;
		padding: 0 10px;
		border-radius: 5px;
		cursor: pointer;
	}
	.similar {
		width: 100%;
		overflow: hidden;
		margin-bottom: 50px;
	}
	.similar-img {
		position: relative;
		width: 90%;
		height: 200px;
		margin-bottom: 50px;
		overflow: hidden;
		box-shadow: 0px 0px 10px #ABC;
		border: 6px solid #fff;
		box-sizing: border-box;
		border-radius: 4px;
	}
	.similar img {
		min-width: 100%;
		height: 200px;
	}
</style>
