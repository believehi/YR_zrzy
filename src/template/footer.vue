<template>
	<div class="footer">
		<div class="left">
			<div>
				<span>网站导航</span>
				<span>地质公园</span>
				<span>地质类</span>
				<span>环境类</span>
			</div>
			<div>
				<span>关于我们</span>
				<span>关于大美湖南</span>
				<span>关于大美湖南</span>
				<span>关于大美湖南</span>
			</div>
			<div>
				<span>联系我们</span>
				<span>客服QQ：155555489</span>
				<span>联系电话：13888888888</span>
				<span>关于大美湖南</span>
			</div>
			<p>Copyright 2018-2019 @地球云版权所有 备案号：湘ICP备66131353135号-1</p>
		</div>
		<div class="right">
			<img src="../assets/img/ewm.jpg"/>
			<img src="../assets/img/logo_01.png"/>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import helper from '../assets/js/helper.js';
	export default {
		data() {
			return {
				msg: 123
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.footer {
		background: #242424;
		color: #ccc;
		display: flex;
		justify-content: space-between;
		padding: 30px 100px;
		height: 200px;
		font-size: 14px;
	}
	.left {
		position: relative;
		flex: 1;
		margin-right: 30px;
		display: flex;
	}
	.left div {
		width: 200px
	}
	.left div span {
		display: block;
		white-space: nowrap;
		line-height: 30px;
	}
	.left div span:nth-child(1) {
		margin-bottom: 10px;
		color: #aaa;
	}
	.left p {
		position: absolute;
		bottom: 20px;
	}
	.right img{
		display: block;
		margin: auto;
	}
	.right img:nth-child(1) {
		width: 120px;
	}
	.right img:nth-child(2) {
		width: 160px;
		margin-top: 30px;
	}
</style>
