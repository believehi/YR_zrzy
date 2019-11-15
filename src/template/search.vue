<template>
	<div class="content">
		<div class="search">
			<input type="" v-model="myinput" placeholder="地貌 / 宝石 / 矿石 / 晶体 ......" v-focus ref="userinput"/>
			<span @click="myquery()"></span>
		</div>
		<ul class="list">
			<span>分类：</span>
			<li :class="{'list-active': titleActive == -1}" @click="titleList(0, -1)" >全部</li>
			<li v-for="(item1, index1) in Typelist" :key="index1" :class="{'list-active': titleActive == index1}"
			 @click="titleList(item1.Id, index1)" >{{item1.TypeName}}</li>
		</ul>
		<div class="format">
			<el-checkbox :indeterminate="isMat" v-model="checkAll" @change="allChange">全选</el-checkbox>
			<el-checkbox-group v-model="checkedMat" @change="imgChange">
				<el-checkbox v-for="mat in format" :label="mat" :key="mat">{{mat}}</el-checkbox>
			</el-checkbox-group>
			<div class="tp-branch">
				<el-checkbox v-model="checked1" @change="tbChoice()">精选</el-checkbox>
				<el-checkbox v-model="checked2" @change="tbChoice()">备版权协议</el-checkbox>
				<el-checkbox v-model="checked3" @change="tbChoice()">有肖像权</el-checkbox>
			</div>
		</div>
		
		<div style="min-height: 600px; padding: 50px 0;">
			<p class="no-works-appear" v-if="!baseinfo.length">后台小姐姐正在加班上传作品哦！</p>
			<waterfall :col='col' :data="baseinfo" v-else>
				<template>
					<div class="cell-item" v-for="(item,index) in baseinfo" :key="index"
						@mouseenter="ImgShow(index)" @mouseleave="ImgHide(index)" @click="ImgDetails(item.Id)">
						<img v-if="item.Thumbnail" :lazyDistance="10" :src="imgUrl + item.Thumbnail" alt="" :title="item.PicTitle"/>
						<div class="item-body item-body_a">
							{{item.PicTitle}}
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
	
	const matList = ['JPG', 'PNG', 'EPS', 'PSD', "AI", "CDR"];
	let JPG = 1, PNG = 1, EPS = 1, PSD = 1, AI = 1, CDR = 1;
	export default {
		data() {
			return {
				imgUrl: helper.imgUrl,
				myinput: '',
				data: [],
				isActive: null,
				titleActive: -1,
				baseinfo: [],
				Typelist: [],
				// 分类选项
				checked1: false,
				checked2: false,
				checked3: false,
				checked: true,
				checkAll: true,
				checkedMat: [],
				format: matList,
				isMat: false,
				scroll: true,
				col: 4,
				page: 1
			}
		},
		methods: {
			// 搜索
			myquery(page){
				this.page = 1
				if (this.myinput == '') {
					this.$message({
						showClose: true,
						message: "请搜索关键词！"
					});
				}
				helper.getAjax("tuku/seachpics", (res)=> {
					if (res.code == 200) {
						this.baseinfo = res.data.baseinfo;
					}
				}, {
					page: page || 1,
					Rows: 30,
					Seachstr: this.myinput
				}, "post")
			},
			// title 列表
			titleList(titleId, titleIndex){
				this.page = 1
				this.baseinfo = []
				this.titleActive = titleIndex;
				this.tplist(titleId, this.page, titleIndex, JPG, PNG, EPS, PSD, AI, CDR, this.checked1, this.checked2, this.checked3)
			},
			// 图片获取
			tplist(ParentId, page, IsAll, IsJpg, IsPng, IsEps, IsPsd, IsAi, IsCdr, IsSelected, IsCopy, IsPort){
				var _this = this;
				if (page == 1) {
					this.page = 1
					this.baseinfo = []
				}
				IsSelected = IsSelected == true ? 2 : 1;
				IsCopy = IsCopy == true ? 2 : 1;
				IsPort = IsPort == true ? 2 : 1;
				console.log(ParentId, page, IsAll, IsJpg, IsPng, IsEps, IsPsd, IsAi, IsCdr, IsSelected, IsCopy, IsPort)
				helper.getAjax("tuku/seachpics", (res)=> {
					if (res.code == 200) {
						_this.baseinfo = _this.baseinfo.concat(res.data.baseinfo);
						console.log(res.data.baseinfo)
					}
					if (res.code == 410) {
						localStorage.removeItem('$tk_userinfo')
					}
				}, {
					page: page || 1,
					Rows: 5,
					ParentId: ParentId || 0,
					IsAll: IsAll || 2,
					IsJpg: IsJpg || 2,
					IsPng: IsPng || 2,
					IsEps: IsEps || 2,
					IsPsd: IsPsd || 2,
					IsAi: IsAi || 2,
					IsCdr: IsCdr || 2,
					IsSelected: IsSelected,
					IsCopy: IsCopy,
					IsPort: IsPort
				}, "post")
			},
			// 图片加载
			loadmore(num) {
				var picNewId = this.Typelist[this.titleActive]
				var picCid = '';
				var picAll = 2
				this.page ++;
				setTimeout(() => {
					if (picNewId) {
						picCid = picNewId.Id;
					} else {
						picCid = 0;
					}
					if (this.checkAll) {
						picAll = 2
					} else {
						picAll = 1						
					}
					this.tplist(picCid, this.page, picAll, JPG, PNG, EPS, PSD, AI, CDR, this.checked1, this.checked2, this.checked3)
					this.scroll = true;
				}, 1000)
			},
			// 跳转详情页面
			ImgDetails(nId){
				this.app_this.$router.push({path: "/details", query: {picId: nId}})
			},
			ImgShow(index){
				 this.isActive = index;
			},
			ImgHide(){
				 this.isActive = null
			},
			// 分类 选项
			allChange(val) {
				this.page = 1
				this.baseinfo = []
        this.checkedMat = val ? matList : [];
        this.isMat = false;
				if(val) {
					if (this.titleActive == -1) {
						this.tplist()
					} else{
						this.tplist(this.Typelist[this.titleActive].Id)
					}
					
				}
      },
      imgChange(value) {
				this.page = 1
        let imgCount = value.length;
        this.checkAll = imgCount === this.format.length;
        this.isMat = imgCount > 0 && imgCount < this.format.length;
				var len = value.length
				for(var b = 0; b < len; b ++ ) {
					if(value[b] == "JPG"){
						JPG = 2
						break;
					} else {
						JPG = 1
					}
				}
				for(var c = 0; c < len; c ++ ) {
					if(value[c] == "PNG"){
						PNG = 2
						break;
					} else {
						PNG = 1
					}
				}
				for(var d = 0; d < len; d ++ ) {
					if(value[d] == "EPS"){
						EPS = 2
						break;
					} else {
						EPS = 1
					}
				}
				for(var e = 0; e < len; e ++ ) {
					if(value[e] == "PSD"){
						PSD = 2
						break;
					} else {
						PSD = 1
					}
				}
				for(var f = 0; f < len; f ++ ) {
					if(value[f] == "AI"){
						AI = 2
						break;
					} else {
						AI = 1
					}
				}
				for(var g = 0; g < len; g ++ ) {
					if(value[g] == "CDR"){
						CDR = 2
						break;
					} else {
						CDR = 1
					}
				}
				
				this.tbChoice();
      },
			tbChoice(){
				if (this.titleActive == -1) {
					this.tplist(0, 1, '1', JPG, PNG, EPS, PSD, AI, CDR, this.checked1, this.checked2, this.checked3)
				} else{
					this.tplist(this.Typelist[this.titleActive].Id, 1, '1', JPG, PNG, EPS, PSD, AI, CDR, this.checked1, this.checked2, this.checked3)
				}
			},
			// 进入页面 聚焦 input
			changfouce(){
				this.$nextTick((x)=>{   
					 this.$refs.userinput.focus();
				})
			},
			// 获取图片分类
			tp(){
				var _this = this;
				helper.getAjax("tuku/pictype", function(res) {
					if (res.code == 200) {
						_this.Typelist = res.data.Typelist
					}
					if (res.code == 410) {
						localStorage.removeItem('$tk_userinfo')
					}
				}, {
					ParentId: 0
				}, "post")
			}
		},
		created() {
			var self = this;
			this.changfouce()
			this.tp()
			this.tplist()
			window.onscroll = function() {
				//变量scrollTop是滚动条滚动时，距离顶部的距离
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				//变量windowHeight是可视区的高度
				var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
				//变量scrollHeight是滚动条的总高度
				var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
				if (scrollHeight - (scrollTop + windowHeight) <= 50) {
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
	.content {
		border-top: 1px solid #ccc;
	}
	.search {
		margin: 30px 0 0 5%;
		width: 500px;
		border: 1px solid #00CE7C;
		border-radius: 2px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.search input {
		flex: 1;
		border: 0;
		outline: none;
		padding: 0 20px;
	}
	.search span {
		width: 100px;
		height: 35px;
		background-image: url(../assets/img/i_5.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 24px 24px;
		background-color: #00CE7C;
	}
	.list {
		margin: 30px auto 0;
		width: 90%;
		display: flex;
	}
	.list span {
		font-weight: 600;
	}
	.list li {
		line-height: 24px;
		margin-left: 20px;
		padding: 0 10px;
		border-radius: 2px;
		text-align: center;
		cursor: pointer;
	}
	.list .list-active {
		background: #00CE7C;
		color: #fff;
	}
	.format {
		margin: 30px auto 0;
		width: 90%;
		background: #eee;
		padding: 16px;
		box-sizing: border-box;
		display: flex;
	}
	.format div {
		margin-left: 30px;
	}
	.tp-branch {
		border-left: 2px solid #ccc;
		padding-left: 50px;
		margin-left: 50px!important;
	}
	.main {
		margin: 30px auto 0;
		width: 90%;
	}
</style>
