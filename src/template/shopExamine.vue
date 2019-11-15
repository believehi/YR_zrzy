<template>
	<div class="content">
		<div class="top-head" >
			<span :class="navActive == 0 ? 'exActive': ''"  @click="changestate(0, 1)">待审核（{{statelist.auditCount1}}）</span>
			<span :class="navActive == 1 ? 'exActive': ''"  @click="changestate(1, 1)">已通过（{{statelist.auditCount2}}）</span>
			<span :class="navActive == 2 ? 'exActive': ''"  @click="changestate(2, 1)">未通过（{{statelist.auditCount3}}）</span>
		</div>
		<ul class="main">
			<li v-for="(item,index) in picslist" :key="index">
				<div class="img" @click="goDetails(item.Id)">
					<img v-if="item.Thumbnail" :src="imgUrl + item.Thumbnail" alt="" :title="item.PicTitle"/>
				</div>
				<div class="right">
					<p class="right-title">{{item.PicTitle}}</p>
					<p class="right-max">大小：{{item.Size}}KB</p>
					<p class="time">上传时间：{{item.UploadTime}}</p>
					<span class="o-st">{{statename}}</span>
				</div>
			</li> 
			<p class="no-works-appear" v-if="!picslist.length">暂无作品哦！</p>

		</ul>
	</div>
</template>

<script>
	import axios from 'axios';
	import helper from '../assets/js/helper.js';
	export default {
		data() {
			return {
				imgUrl: helper.imgUrl,
				navActive: 0,
				userid:"",
				statename:"待审核",
				picslist:[],
				statelist: {},
				page: 1,
				scroll: true
			}
		},
		methods:{
			// 跳转图片详情
			goDetails(id){
				this.app_this.$router.push({name: "details", query: {picId: id}})
			},
			// 审核图片数量
			auditcount(){
				var _this = this;
				helper.getAjax("tuku/auditcount", function(res) {
					if (res.code == 200) {
						_this.statelist = res.data;
						_this.changestate(0, 1);
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
					userId: this.userid
				}, "post")
			},
			//审核图片列表
			changestate(value, page){
				var _this = this;
				_this.page = page
				_this.navActive = value;
				switch(value) {
				  case 0:
						_this.statename ="待审核";
				    break;
				  case 1:
						_this.statename ="已通过";
				    break;
				  case 2:
						_this.statename = "未通过";
				}
				helper.getAjax("tuku/picsaudit", function(res) {
					if (res.code == 200) {
						if (page == 1) {
							_this.picslist = [];
						}
						_this.picslist = _this.picslist.concat(res.data.Piclist);
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
					userId: this.userid,
					page: page,
					rows: 3,
					state: value+1
				}, "post")
			},
			// 触底加载数据
			loadmore() {
				this.page ++;
				setTimeout(() => {
					this.changestate(this.navActive, this.page)
					this.scroll = true;
				}, 1000)
			}
		},
		created(){
			var self = this;
			this.userid = helper.getuserinfo().userId;
			this.auditcount();
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
		props:{
			app_this: {default: 'detailsApp', required: true} 
		}
	}
</script>

<style scoped>
	.content {
		width: 800px;
		margin: 30px auto 0;
		background: #fff;
		padding: 0 40px;
		box-sizing: border-box;
	}
	.top-head span {line-height: 50px;font-size: 14px; margin-right: 30px; cursor: pointer;}
	.exActive {color: #00CE7C;}
	.main {min-height: 400px;}
	.main li {
		border-top: 1px solid #eee;
		padding: 20px 0;
		height: 80px;
	}
	.img {
		float: left;
		width: 120px;
		height: 80px;
		overflow: hidden;
	}
	.img img {
		height: 100%;
		min-width: 100%;
	}
	.right {
		margin-left: 140px;
		height: 80px;
		position: relative;
	}
	.right-title {font-weight: 600;}
	.right-max {font-size: 12px;margin-top: 5px;}
	.time {font-size: 12px;margin-top: 16px; color: #999;}
	.o-st {
		position: absolute;
		top: 30px;
		right: 10px;
		border: 1px solid #00CE7C;
		color: #00CE7C;
		border-radius: 2px;
		font-size: 12px;
		padding: 5px 20px;
	}
</style>
