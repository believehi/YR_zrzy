<template>
	<div id="app">
		<!-- 导航栏 -->
		<div class="nav" :class="navActive?'navAct':''">
			<router-link to="/" tag="div" @click.native="navClass(true)"><img :src="navActive?logoImg[0]:logoImg[1]" /></router-link>
			<ul class="nav-list">
				<router-link to="home" tag="li" @click.native="navClass(true)">首页</router-link>
				<router-link to="geopark" tag="li" @click.native="navClass()">地质公园</router-link>
				<router-link to="geology" tag="li" @click.native="navClass()">地质类</router-link>
				<router-link to="environment" tag="li" @click.native="navClass()">环境类</router-link>
				<router-link to="cameraman" tag="li" @click.native="navClass()">摄影师</router-link>
			</ul>
			<div class="nav-logo" v-if="personal">
				<span @click="mylogin()">登录</span>
				<span @click="mylogin()" class="navRe">注册</span>
			</div>
			<div class="nav-logo" v-else>
				<span @click="myshop()">购物车</span>
				<span @click="myPersonal()">13888888888</span>
			</div>
		</div>
		<!-- 主体组件 -->
		<router-view :app_this="app_this"></router-view>
		<!-- 底部组件 -->
		<home-footer />
		<!-- 登录注册 -->
		<my-logo v-show="onLogin" @transfer="dlMsg" :app_this="app_this" />
	</div>
</template>

<script>
	import axios from 'axios';
	import helper from '../assets/js/helper.js';
	// import footer from "./template/footer.vue";
	// import myLogo from "./template/myLogo.vue";
	export default {
		data() {
			return {
				app_this: '',
				logoImg: [require('./assets/img/logo_01.png'), require('./assets/img/logo_02.png')],
				navActive: true,
				onLogin: false,
				personal: true
			}
		},
		created() {
			this.app_this = this;
			this.navActive = JSON.parse(localStorage.getItem('navigationBar')).navActive
		},
		methods: {
			navClass(e) {
				this.navActive = e ? e : false;
				localStorage.setItem('navigationBar', JSON.stringify({navActive: this.navActive}));
			},
			mylogin() {
				this.onLogin = true;
			},
			myshop(vals) {
				this.$router.push("shop")
				this.navClass();
			},
			myPersonal(){
				this.$router.push("my")
				this.navClass();
			},
			startHacking() {
				this.$notify({
					title: 'It works!',
					type: 'success',
					message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
					duration: 5000
				})
			},
			dlMsg(val) {
				this.onLogin = false;
			}
		},
		watch: {},
		components: {
			"home-footer": footer,
			"my-logo": myLogo
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
		font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	}
	html {min-width: 900px;color: #333;}
	ul {list-style: none}
	a {text-decoration: none;}
	img {vertical-align: top;border: none}
	.nav {
		position: relative;
		height: 80px;
		display: flex;
		line-height: 80px;
	}
	.nav img {
		height: 26px;
		margin: 27px 12px 0 30px;
	}
	.nav-list {
		display: flex;
	}
	.nav-list li {
		width: 80px;
		text-align: center;
		cursor: pointer;
	}
	.nav-logo {
		position: absolute;
		top: 0;
		right: 50px;
	}
	.nav-logo span {
		padding: 2px 15px;
		cursor: pointer;
	}
	.navRe {
		margin-left: 10px;
		border: 0.0625rem solid #333;
		border-radius: 20px;
	}
	/* .content {min-height: 600px;} */
	.nav-active {
		color: #00CE7C;
	}
	.navAct {
		color: #fff;
	}
	.navAct .navRe {
		border: 0.0625rem solid #fff;
	}
	/* 通用分页器样式 */
	.newsPage {
		text-align: center;
		margin: 40px 0;
	}

	.el-pagination.is-background .el-pager li:not(.disabled).active {
		background-color: #00CE7C;
	}

	.el-pagination.is-background .el-pager li:not(.disabled):hover {
		color: #00CE7C;
	}

	.el-pagination.is-background .el-pager li:not(.disabled).active:hover {
		color: #fff;
	}

	/* 搜索 分类图片类型 选择 */
	.el-checkbox__input.is-checked+.el-checkbox__label {
		color: #00CE7C;
	}

	.content .el-checkbox__input.is-checked .el-checkbox__inner,
	.content .el-checkbox__input.is-indeterminate .el-checkbox__inner {
		background-color: #00CE7C;
		border-color: #00CE7C;
	}

	.el-checkbox__input:hover,
	.el-checkbox__input.is-focus .el-checkbox__inner {
		border-color: #00CE7C;
	}

	/* 登录 共用样式 */
	.el-tabs__item {
		font-size: 16px;
	}
	.el-tabs__item.is-active,
	.el-tabs__item:active,
	.el-tabs__item:hover {
		color: #00CE7C;
	}
	.el-tabs__active-bar{
		background: #00CE7C;
	}
	.zc-code .el-input__inner {
		padding-right: 150px;
	}
	/* 购物车 供稿 收藏 选项 */
	.el-radio-button__inner:hover,
	.el-radio-button__orig-radio:checked+.el-radio-button__inner {
		color: #00CE7C;
		background-color: #fff;
		border-color: #00CE7C;
		box-shadow: -1px 0 0 0 #00CE7C;border-radius: 4px;
	}
	.el-radio-button__inner:hover {
		color: #00CE7C;
	}
	.el-radio-button {margin-right: 20px;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;noneuser-select:none;}
	
	/* 按钮 */
	.el-button--success:active,
	.el-button--success:hover,
	.el-button--success {
		background-color: #00CE7C!important;
		border-color: #00CE7C;
	}
	.el-button {
		/* border-color: #00CE7C; */
		/* color: #00CE7C; */
	}
	/* 上传 */
	.el-upload,
	.el-upload-dragger {width: 100%;height: 300px;background: #eee;}
	
	/* 上传进度条 */
	.el-step__title {font-size: 20px; font-weight: 500!important;}
	.el-upload-dragger:hover {border-color: #00CE7C;}
	.el-step__title.is-success {margin: 30px 0 0 -30px; color: #00CE7C;}
	.el-step__title.is-process {margin: 30px 0 0 -20px;}
	.el-step__title.is-wait {margin: 30px 0 0 -20px;}
	.el-step__head.is-success {color: #00CE7C;border-color:#00CE7C}

	.el-textarea__inner:focus,
	.el-select .el-input__inner:focus,
	.el-input__inner:focus {
		border: 1px solid #00CE7C;
	}
	.el-select .el-input.is-focus .el-input__inner{border-color: #00CE7C;}
	
	/* 单选框样式 */
	.el-radio__input.is-checked+.el-radio__label{
		color: #00CE7C;
	}
	.el-radio__input.is-checked .el-radio__inner{
		background: #00CE7C;
		border-color: #00CE7C;
	}
</style>
