<template>
	<div class="content">
		<div class="">
			<!-- 顶部搜索栏 -->
			<div class="geology-top">
				<img class="geology-img" src="../assets/img/pic_37.png" />
				<div class="geology-title" @click="mySearch()">
					<input type="" name="" placeholder="红石林地质公园 / 凤凰国家地质公园 ......" readOnly='readOnly' />
					<span class="geology-icon"></span>
				</div>
			</div>
			<!-- 分类栏 -->
			<ul class="tasktab">
				<li v-for="(itemT, indexT) in twoList" :key="indexT" 
					@click="cppic(itemT.Id, 1, indexT)" :class="{listActive: listActive==indexT}">
					{{itemT.TypeName}}
				</li>
			</ul>
		</div>
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
				isActive: null,
				listActive: 0,
				data: [],
				col: 4,
				typeList: [],
				twoList: [],
				baseinfo: [],
				typeId: 0,
				scroll: true,
				page: 1,
				n: 0
			}
		},
		methods: {
			// 跳转详情页面
			ImgDetails(nId){
				this.app_this.$router.push({
					name: "details", 
					query: {picId: nId}
				})
			},
			ImgShow(index){
				 this.isActive = index;
			},
			ImgHide(){
				 this.isActive = null
			},
			// 请求分类接口
			cplist(type) {
				type = type || 0;
				var _this = this;
				helper.getAjax("tuku/pictype", function(res) {
					if (res.code == 200) {
						if (type == 0) {
							_this.typeList = res.data.Typelist
							_this.cplist(_this.typeList[0].Id)
						} else {
							_this.twoList = res.data.Typelist
						}
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
					ParentId: type
				}, "post")
			},
			// 图片列表
			cppic(typeId, pages, ind) {
				this.$router.push({query: {n: ind}})
				if (pages == 1) {
					this.page = 1
				}
				typeId = typeId;
				pages = pages || 1;
				var _this = this;
				_this.listActive  = ind|| 0;
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
					ParentId: typeId,
					page: pages,
					rows: 5
				}, "post")
			},
			// 初次加载图片数据
			footerMsg() {
				setTimeout(()=> {
					this.cppic(this.twoList[this.n].Id, 1, this.n)
				}, 500)
			},
			// 跳轉搜索頁面 search
			mySearch() {
				this.$router.push("search")
			},
			loadmore(num) {
				this.page ++;
				setTimeout(() => {
					this.cppic(this.twoList[this.listActive].Id, this.page, this.listActive)
					this.scroll = true;
				}, 1000)
			},
		},
		created() {
			this.n = this.$route.query.n
			var self = this;
			this.footerMsg()
			this.cplist();
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
		background: rgb(255, 255, 255, 0.8);
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

	.tasktab {
		padding: 0 10%;
		min-width: 800px;
		border-top: 1px solid #eee;
	}

	.tasktab li {
		display: inline-block;
		min-width: 80px;
		margin-right: 20px;
		text-align: center;
		line-height: 80px;
		cursor: pointer;
	}

	/* 主体图片样式 */


</style>
