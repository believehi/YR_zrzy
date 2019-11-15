<template>
	<div class="content gr-content">
		<div class="gr-top gr" @click="grRe()"><i class="el-icon-arrow-left"></i> <span>返回个人主页</span></div>
		<!-- 主体 -->
		<el-container class="main gr">
		  <el-aside width="200px" class="gr-aside">
				<ul class="gr-left">
					<router-link to="mySet" tag="li">账户设置</router-link>
					<router-link to="myModify" tag="li">修改密码</router-link>
				</ul>
			</el-aside>
		  <el-main class="gr-main">
				<div class="gr-right">
					<router-view></router-view>
				</div>
			</el-main>
		</el-container>
		
	</div>
</template>

<script>
	import axios from 'axios';
	import helper from '../assets/js/helper.js';
	export default {
		data() {
			return {
				
			}
		},
		created() {
			this.footerMsg()
			},
		methods:{
			// 隱藏底部組件
			footerMsg() {
				this.$emit('func', true)
			},
		grRe(){
				 this.$router.replace("shop");
			}
		}
	}
</script>

<style scoped>
	.gr-content {min-height: 600px;background: #eee;}
	.gr {width: 60%; min-width: 800px;margin: 0 auto;}
	.gr-top {
		color: #00CE7C; 
		line-height: 60px;
		cursor: pointer;
	}
	.main {padding-bottom: 100px;}
	.gr-left {
		background: #fff;
		width: 180px;
		overflow: hidden;
	}
	.gr-left li {
		margin: 25px 0;
		padding: 2px 0 2px 30px;
		border-left: 3px solid transparent;
		cursor: pointer;
	}
	.gr-left .exact-active {border-left: 3px solid #00CE7C;}
	.gr-main{background: #fff;}
</style>
