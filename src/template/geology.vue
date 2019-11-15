<template>
	<div class="content">
		<!-- 顶部搜索栏 -->
		<div class="geology-top">
			<img class="geology-img" src="../assets/img/pic_37.png"/>
			<div class="geology-title" @click="mySearch()">
				<input type="" value="" placeholder="地貌 / 宝石 / 矿石 / 晶体 ......" readOnly='readOnly' />
				<span class="geology-icon"></span>
			</div>
		</div>
		<!-- 分类栏 -->
		<ul class="tasktab">
			<li v-for="(itemT, indexT) in twoList" :key="indexT"
				@click="cppic(itemT.Id, 1, indexT, indexT+1)" :class="{listActive: listActive==indexT}">
				{{itemT.TypeName}}
			</li>
		</ul>
		
		
		<!-- 图片主体 -->
		
		
		<div style="min-height: 400px; padding-bottom: 50px;">
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
	export default {
		data() {
			return {
				imgUrl: helper.imgUrl,
				typeList: '',
				twoList: '',
				baseinfo: [],
				listActive: 0,
				page: 1,
				col: 4,
				isActive: null,
				scroll: true,
				data: []
			}
		},
		methods:{
			// 请求分类接口
			cplist(type) {
				type = type || 0;
				var _this = this;
				helper.getAjax("tuku/pictype", res => {
					if (res.code == 200) {
						if (type == 0) {
							_this.typeList = res.data.Typelist
						} else {
							_this.twoList = res.data.Typelist
						}
					}
					if (res.code == 410) {
						localStorage.removeItem('$tk_userinfo')
					}
				}, {
					ParentId: type
				}, "post")
			},
			// 图片列表
			cppic(typeId, pages, ind, pid) {		
				if(pid) {
					this.$router.push({query: {typeId: typeId,pid: pid}})
				}
				if (pages == 1) {
					this.page = 1
				}
				pages = pages || 1;
				var _this = this;
				_this.listActive  = this.$route.query.pid-1 || ind || 0;
				helper.getAjax("tuku/seachpicbytype", function(res) {
					if (res.code == 200) {
						if (pages == 1) {
							_this.baseinfo = res.data.baseinfo;
						} else {
							_this.baseinfo = _this.baseinfo.concat(res.data.baseinfo)
							console.log(res.data.baseinfo)
						}
					} else {
						_this.$message({
							showClose: true,
							message: res.info
						});
					}
				}, {
					ParentId: this.$route.query.typeId || typeId,
					page: pages,
					rows: 5
				}, "post")
			},
			loadmore(num) {
				this.page ++;
				setTimeout(() => {
					this.cppic(this.twoList[this.listActive].Id, this.page, this.listActive)
					this.scroll = true;
				}, 1000)
			},
			// 組件
			footerMsg() {
				setTimeout(()=> {
					this.cplist(this.typeList[1].Id)
					setTimeout(()=> {
						this.cppic(this.twoList[0].Id, 1)
					}, 500);
				}, 500)
			},
			// 跳转详情页面
			ImgDetails(nId){
				this.app_this.$router.push({name: "details", query: {picId: nId}})
			},
			ImgShow(index){
				 this.isActive = index;
			},
			ImgHide(){
				 this.isActive = null
			},
			// 跳转到搜索
			mySearch(){
			 this.$router.push("search")
			}
		},
		created() {
			var self = this;
			this.footerMsg();
			this.cplist()
			window.onscroll = function() {
				//变量scrollTop是滚动条滚动时，距离顶部的距离
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				//变量windowHeight是可视区的高度
				var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
				//变量scrollHeight是滚动条的总高度
				var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
				if (scrollHeight == (scrollTop + windowHeight)) {
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
	.listActive {
		color: #00CE7C;
		font-weight: 600;
	}
	.geology-top {
		position: relative;
		height: 500px;
		width: 100%;
		min-width: 800px;
		overflow: hidden;
	}
	.geology-img {
		height: 100%;
		min-width: 100%;
	}
	.geology-title {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgb(255,255,255, 0.8);
		padding: 10px 30px;
		display: flex;
		align-items: center;
	}
	.geology-title input {
		background: transparent;
		width: 500px;
		font-size: 18px;
		border: 0;
		outline: none;
	}
	.geology-icon {
		display: inline-block;
		width: 40px;
		height: 40px;
		background: url(../assets/img/i_4.png) no-repeat center center;
		background-size: 80% 80%;
	}
	.main,
	.tasktab {
		margin: 0 auto;
		width: 80%;
		min-width: 800px;
	}
	.tasktab li {
		display: inline-block;
		min-width: 80px;
		margin-right: 20px;
		text-align: center;
		line-height: 80px;
		cursor: pointer;
	}
	.main {
		
	}
</style>
