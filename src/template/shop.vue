<template>
	<div class="content">
		<!-- 顶部图片 -->
		<div class="top-nav">
			<img src="../assets/img/n_01.jpg"/>
		</div>
		<!-- 个人资料 -->
		<div class="top-head">
			<div class="portrait">
				<img v-if="baseinfo.UserImg" :src="imgUrl + baseinfo.UserImg"/>
			</div>
			<p>{{baseinfo.NickName}}</p>
			<span class="fl-top">{{baseinfo.Des}}</span>
			<div class="fl">
				<span @click="mySet()">账户设置</span>
				<span @click="myPhoto()">上传照片</span>
			</div>
		</div>
		<!-- 导航组件 -->
		<ul class="list">
				<router-link to="shopDraft" tag="li">供稿</router-link>
				<router-link to="shopCollection" tag="li">收藏</router-link>
				<router-link to="shopExamine" tag="li">审核</router-link>
				<router-link to="shopCar" tag="li">购物车</router-link>
		</ul>
		<!-- 主体 -->
		<div class="main">
			<router-view :app_this="app_this" @shopNum="shopNum"></router-view>
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
				userid:'',
				baseinfo:''
			}
		},
		created() {
			this.footerMsg(),
			this.userid = helper.getuserinfo().userId;
			this.getuserinfo();
		},
		methods:{
			shopNum(e){
				this.$emit('shopNum',e)
			},
			// 隱藏底部組件
			footerMsg() {
				this.$emit('func', true)
			},
			myPhoto(){
				this.app_this.$router.push("myUpload")
			},
			mySet(){
				this.app_this.$router.push("my")
			},
			getuserinfo(){
				var _this = this;
				helper.getAjax("tuku/getuserinfo", function(res) {
					if (res.code == 200) {
						_this.baseinfo = res.data.baseinfo;
						if(_this.baseinfo.Des == null||_this.baseinfo.Des ==''){
							_this.baseinfo.Des = '说句话描述自己吧！';
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
					userId: _this.userid,
				}, "post")
				
			}
		},
		props: {
			app_this: {default: 'detailsApp', required: true} 
		}
	}
</script>

<style scoped>
	.top-nav {
		width: 100%;
		min-width: 800px;
		height: 280px;
		overflow: hidden;
	}
	.top-nav img {
		height: 100%;
		min-width: 100%;
	}
	.top-head {
		text-align: center;
	}
	.portrait {
		width: 100px;
		height: 100px;
		overflow: hidden;
		margin: -50px auto 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.portrait img {
		width: 100px;
		min-height: 100px;
		border-radius: 50%;
		border: 1px solid #fff;
		box-sizing: border-box;
	}
	.top-head p {
		line-height: 50px;
		font-size: 20px;
		font-weight: 600;
	} 
	.fl-top{color: #999;}
	.fl span{
		border: 1px solid #00CE7C;
		border-radius: 4px;
		padding: 5px 16px;
		margin-top: 20px;
		display: inline-block;
		cursor: pointer;
	}
	.fl span:nth-child(1) {
		margin-right: 16px;
		color: #00CE7C;
	}
	.fl span:nth-child(2) {
		background: #00CE7C;
		color: #fff;
	}
	.list {
		text-align: center;
		margin-top: 20px;
	}
	.list li {
		display: inline-block;
		line-height: 30px;
		padding: 0 10px;
		margin: 0 30px;
		cursor: pointer;
	}
	.exact-active {
		border-bottom: 2px solid #00CE7C;
	}
	.main {
		background: #eee;
		border-top: 1px solid #ccc;
		min-height: 500px;
		padding-bottom: 50px;
	}
</style>
