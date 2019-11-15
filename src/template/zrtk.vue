<template>
	<div id="app">
		<!-- 导航栏 -->
		<div class="nav" :class="navActive?'navAct':''">
			<router-link to="/" tag="div" @click.native="navClass(true)" class="logo-icon" :class="{'nav-logo-icon': navActive}">
				<!-- <img :src="navActive?logoImg[0]:logoImg[1]" /> -->
			</router-link>
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
				<span @click="myshop()">购物车 <div class="shop-num" v-if="num != '0'">{{num}}</div></span>
				<span @click="myPersonal()">{{name}}</span>
				<span @click="cancellation()">注销</span>
			</div>
		</div>
		<!-- 主体组件 -->
		<router-view :app_this="app_this" :tk_this="tk_this" @func="funcMsg" @shopNum="shopNums"></router-view>
		<!-- 底部组件 -->
		<home-footer />

		<div class="page-component-up" @click="topScroll">
			<i class="el-icon-caret-top"></i>
		</div>

	</div>
</template>

<script>
	import footer from "./footer";
	import axios from 'axios';
	import helper from '../assets/js/helper.js';

	export default {
		data() {
			return {
				footer: true,
				app_this: this,
				logoImg: ['../assets/img/logo_01.png', '../assets/img/logo_02.png'],
				navActive: true,
				personal: true,
				name: '用户',
				num: '0'
			}
		},
		methods: {
			shopNums(e){
				if (e) {
					this.shopNum()
				}
			},
			topScroll() {
				document.documentElement.scrollTop = 0
			},
			// 获取购物车数量
			shopNum() {
				helper.getAjax("tuku/carcount", (res) => {
					if (res.code == 200) {
						this.num = res.info;
					}
					if (res.code == 410) {
						localStorage.removeItem('$tk_userinfo')
					}
				}, {
					UserId: helper.getuserinfo().userId
				}, "post")
			},
			// 隱藏footer組件
			funcMsg(data) {
				this.footer = data
			},
			// 导航切换
			navClass(e) {
				this.navActive = e ? e : false;
			},
			// 跳转登录
			mylogin() {
				this.tk_this.$router.push("myLogin")
			},
			// 跳转购物车
			myshop(vals) {
				this.$router.push("shop")
				this.navClass();
			},
			// 跳转用户页面
			myPersonal() {
				this.$router.push("my")
				this.navClass();
			},
			// 退出登录
			cancellation() {
				this.$confirm('退出登录, 是否继续？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					localStorage.removeItem('$tk_userinfo')
					this.$router.replace("home")
					this.personal = true;
					this.$message({
						type: 'success',
						message: '成功退出!'
					})
				}).catch(() => {})
			},
		},
		created() {
			if (this.$route.path == "/home") {
				this.navActive = true
			} else {
				this.navActive = false
			}
			this.personal = JSON.stringify(helper.getuserinfo()) == "{}" ? true : false;
			this.name = helper.getuserinfo().nickName
			this.shopNum();
		},
		beforeUpdate(){
			if (this.$route.path == "/home") {
				this.navActive = true
			} else {
				this.navActive = false
			}
		},
		components: {
			"home-footer": footer,
		},
		props: {
			tk_this: {
				default: 'detailsApp',
				required: true
			}
		}
	}
</script>

<style scoped>
	.nav {
		position: relative;
		height: 80px;
		display: flex;
		line-height: 80px;
		/* background: #fff; */
	}

	.logo-icon,
	.nav img {
		height: 26px;
		margin: 27px 12px 0 30px;
	}

	.logo-icon {
		background: url(../assets/img/logo_02.png) no-repeat;
		background-size: auto 100%;
		width: 160px;
	}

	.nav-logo-icon {
		background: url(../assets/img/logo_01.png) no-repeat;
		background-size: auto 100%;
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
		position: relative;
	}

	.shop-num {
		position: absolute;
		left: 55px;
		top: -4px;
		background: #f40;
		color: #fff;
		padding: 0px 2px;
		display: inline-block;
		line-height: 14px;
		min-width: 14px;
		text-align: center;
		border-radius: 8px;
		font-size: 10px;
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
		background: transparent;
	}

	.navAct .navRe {
		border: 0.0625rem solid #fff;
	}

	.page-component-up {
		background-color: #fff;
		position: fixed;
		right: 100px;
		bottom: 150px;
		width: 40px;
		height: 40px;
		border-radius: 20px;
		cursor: pointer;
		transition: .3s;
		box-shadow: 0 0 6px rgba(0, 0, 0, .12);
		z-index: 5;
	}

	.page-component-up i {
		color: #00CE7C;
		display: block;
		line-height: 40px;
		text-align: center;
		font-size: 18px;
	}
</style>
