<template>
	<div class="content">
		<!-- 顶部 -->
		<div class="Le-top">
			<img class="back" src="../assets/img/home_01.jpg"/>
			<div class="Le-title">
				<p>我们对湖南的环境，从不将就</p>
				<a>因为热爱，所以更专业</a>
			</div>
		</div>
		<!-- 标题介绍 -->
		<div class="title">
			<div>
				自然资源图库致力于打造湖南省专业的地质人力源图片库，建立大美湖南形象。
				自然资源图库致力于打造湖南省专业的地质人力源图片库，建立大美湖南形象。
				自然资源图库致力于打造湖南省专业的地质人力源图片库，建立大美湖南形象。
				自然资源图库致力于打造湖南省专业的地质人力源图片库，建立大美湖南形象。
				自然资源图库致力于打造湖南省专业的地质人力源图片库，建立大美湖南形象。
			</div>
		</div>
		<!-- 信息 -->
		<div class="infor">
			<p class="infor-title">全新XX授权模式，杜绝盗版</p>
			<ul class="infor-content">
				<li>
					<img src="../assets/img/i_1.png">
					<p>4000万+</p>
					<span>湖南最美照片</span>
				</li>
				<li>
					<img src="../assets/img/i_3.png">
					<p>4000万+</p>
					<span>湖南最美照片</span>
				</li>
				<li>
					<img src="../assets/img/i_2.png">
					<p>4000万+</p>
					<span>湖南最美照片</span>
				</li>
				<li>
					<img src="../assets/img/i_3.png">
					<p>4000万+</p>
					<span>湖南最美照片</span>
				</li>
			</ul>
		</div>
		<!-- 分类 -->
		<div class="sort">
			<img class="sort-title" src="../assets/img/hn_05.jpg">
			<div class="sort-content">
				<div class="sort-left">地质类</div>
				<div class="sort-right">
					<p>环境类</p>
					<p>山水</p>
					<p>人文</p>
				</div>
			</div>
		</div>
		<!-- 详情 -->
		<div class="details">
			<div class="details-left">
				<div class="left-a">
					<img src="../assets/img/pic_01.jpg"/>
				</div>
				<div class="left-b">
					<img src="../assets/img/pic_02.jpg"/>
				</div>
				<div class="left-c">
					<img src="../assets/img/pic_03.jpg"/>
				</div>
				<div class="left-d">
					<img src="../assets/img/pic_04.jpg"/>
				</div>
			</div>
			<div class="details-right">
				自然资源图库致力于打造湖南省专业的地质人力源图片库，建立大美湖南形象。
				自然资源图库致力于打造湖南省专业的地质人力源图片库，建立大美湖南形象。
				自然资源图库致力于打造湖南省专业的地质人力源图片库，建立大美湖南形象。
				自然资源图库致力于打造湖南省专业的地质人力源图片库，建立大美湖南形象。
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
				msg: ''
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
			
		}
	}
</script>

<style scoped>
	.Le-top {
		/* position: relative; */
		width: 100%;
		overflow: hidden;
		margin-top: -80px;
		height: 500px;
	}
	.back {
		height: 100%;
		min-width: 100%;
	}
	.Le-title {
		position: absolute;
		width: 100%;
		min-width: 900px;
		height: 80px;
		top: 420px;
		color: #fff;
		background: rgba(0,0,0,.6);
		text-align: center;
	}
	.Le-title p {
		margin: 10px 0;
	}
	.Le-title a {
		font-size: 12px;
		border: 1px solid #fff;
		padding: 2px 16px;
		border-radius: 10px;
	}
	.title {
		padding: 60px 0;
	}
	.title div {
		width: 60%;
		min-width: 800px;
		min-height: 100px;
		margin: 0 auto;
		text-align: center;
		line-height: 28px;
	}
	.infor {
		background: #eee;
		text-align: center;
		padding: 80px 0;
	}
	.infor-title {
		font-weight: 900;
	}
	.infor-content {
		width: 60%;
		min-width: 800px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}
	.infor-content li {
	}
	.infor-content li img {
		height: 40px;
		padding: 60px 0 20px;
	}
	.infor-content p {
		font-weight: 900;
	}
	.infor-content span {
		font-size: 14px;
	}
	.sort {
		position: relative;
		width: 100%;
		min-width: 900px;
		height: 600px;
		overflow: hidden;
	}
	.sort-title {
		height: 100%;
		min-width: 100%;
	}
	.sort-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		/* height: 300px; */
		display: flex;
		color: #fff;
		text-align: center;
		font-weight: 600;
	}
	.sort-left {
		line-height: 240px;
		width: 400px;
		border-right: 1px solid #fff;
	}
	.sort-right {
		width: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.sort-right p {
		line-height: 28px;
		font-size: 14px;
	}
	.sort-right p:nth-child(1) {
		margin-bottom: 20px;
		font-size: 16px;
	}
	.details {
		width: 80%;
		min-width: 800px;
		min-height: 300px;
		margin: 0 auto;
		display: flex; 
		justify-content: space-around;
		padding: 100px 0;
	}
	.details-left {
		width: 50%;
		min-width: 600px;
		position: relative;
		padding-right: 20px;
	}
	
	.details-left div {
		position: absolute;
		width: 150px;
		min-height: 200px;
		box-shadow: 2px 1px 10px 2px rgba(0,0,0,0.2);
		background: #fff;
	}
	.left-a {
		top: 20px;
		left: 0;
	}
	.left-b {
		top: 0;
		left: 140px;
	}
	.left-c {
		top: 20px;
		left: 280px;
	}
	.left-d {
		top: 40px;
		left: 420px;
	}
	.details-left div img {
		width: 100%;
	}
	.details-right {
		width: 50%;
		min-width: 240px;
		max-width: 700px;
		line-height: 28px;
		/* padding: 0 100px; */
	}
</style>
