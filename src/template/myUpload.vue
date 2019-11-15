<template>
	<div class="content">
		<div class="sc-title sc">
			<span>上传图片</span>
			<el-button type="success">上传预览图</el-button>
		</div>
		
		<!-- 上传进程 -->
		<div class="sc-process sc">
			<div class="sc-process-title">
				<span class="sc-num">1</span>设置预览图（<span class="sc-bz">1 </span>/ 3）
			</div>
			<el-steps :active="activePro" finish-status="success" class="sc-list">
			  <el-step title="设置预览图"></el-step>
			  <el-step title="完善信息"></el-step>
			  <el-step title="完成上传"></el-step>
			</el-steps>
			<div class="sc-pic" v-if="uploadImg[0]">
				<div class="_img">
					<img :src="imgUrl + uploadImg[0]"/>
					<div>上传预览图</div>
				</div>
				<div class="sc-content">
					<div class="sc-left">
						<p>首页</p>
						<p>大小：{{ImgSize}}</p>
					</div>
					<div class="right upload-right">
						<span><i class="el-icon-check sc-icon"></i> 上传成功</span><br/>
						<el-upload :action="avatarUrl" 
							:on-success="AvatarSuccess" :data="avatarData">
							<el-button type="success">替换源文件</el-button>
						</el-upload>
					</div>
				</div>
			</div>
			<div class="sc-next">
				<el-radio-button style="position: relative;"><viewer :images="[imgUrl + uploadImg[0]]">预览图<img :src="imgUrl + uploadImg[0]" class="xlImg"/></viewer></el-radio-button>
				<el-button type="success" @click="scNext()">下一步</el-button>
			</div>
		</div>
		
		<!-- 上传 -->
		<div class="sc-main sc">
			<el-upload class="sc-upload" drag :action="avatarUrl"
				:on-success="AvatarSuccess" :before-upload="beforeAvatarUpload" :data="avatarData">
				<el-button type="success" class="sc-img">点击上传预览图</el-button>
				<div class="el-upload__text">
					将预览图拖到此处，或<em>点击上传</em>
					<div class="">只能上传jpg / png文件</div>
				</div>
			</el-upload>
			<div class="sc-sub">
				温馨提示：<el-checkbox v-model="checked">阅读并同意</el-checkbox>
				<span>《上传声明》</span><span>《版权声明》</span>
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
				imgUrl: helper.imgUrl,
				avatarData: helper.PostData({IdCardType: "Pics"}),
				avatarUrl: helper.webUrl + "annexes/uploadsuo",
				activePro: 1,
				checked: false,
				// 上传信息
				uploadImg: ["", ''],
				uploadPicSize: 0,
				ImgSize: "0kb"
			}
		},
		methods:{
			AvatarSuccess(res, file, fileList){
				if (res.code == 200) {
					this.$set(this.uploadImg, 0, res.data.xiaoImage);
					this.$set(this.uploadImg, 1, res.data.daImage);
					this.uploadPicSize = file.size;
					if (file.size < 1024 && file.size > 0) {
						this.ImgSize = file.size + "b"
					} else if (file.size > 1024) {
						this.ImgSize = (file.size/1024).toFixed(2) + "Kb"
						if (file.size > 1048576) {
							this.ImgSize = (file.size/1048576).toFixed(2) + "Mb"
						}
					}
				}
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
				if (!(isJPG || isPNG)) {
					this.$message.error('上传预览图只能是 JPG / PNG 格式!');
				}
				return isJPG || isPNG;
			},
			scNext(){
				if(this.uploadImg[0] == ''){
					this.$message({
						showClose: true,
						message: "请先上传图片！"
					});
					return;
				}
				if(!this.checked) {
					this.$message({
						showClose: true,
						message: "请勾选《上传声明》《版权声明》协议！"
					});
					return;
				}
				this.app_this.$router.push({name: "myUploadNext", params: {uploadImg: this.uploadImg, uploadPicSize: this.uploadPicSize}})
			}
		},
		props: {
			app_this: {default: 'detailsApp', required: true} 
		}
	}
</script>

<style scoped>
	.sc {width:70%;min-width:800px;margin:0 auto;}
	.content {background:#eee;min-height:500px;padding-bottom:100px;}
	.sc-title {padding:20px 0;text-align:right; height: 40px;}
	.sc-title span {float:left;line-height:40px;}
	.sc-main {background:#fff;padding:10px;box-sizing:border-box;border-radius:5px;}
	.sc-sub {padding:20px 0 10px;font-size:14px;}
	.sc-sub span {color:#6C79B4;}
	.sc-img {margin: 80px 0 10px;}
	.sc-process {
		background: #fff;
		margin-bottom: 20px;
		border-radius:5px;
		overflow: hidden;
	}
	.sc-process-title {line-height: 40px;}
	.sc-bz {color: #00CE7C;font-size: 20px;}
	.sc-num {
		margin-right: 20px;
		background: #ccc;
		color: #fff; 
		float: left;
		display: inline-block;
		width: 36px;
		line-height: 30px;
		text-align: center;
	}
	.sc-list {
		width: 450px;
		margin: 0 auto;
		padding: 30px 0;
	}
	.sc-pic {
		display: flex;
		width: 90%;
		box-sizing: border-box;
		margin: 0 auto;
		border: 1px solid #eee;
		padding: 8px;
		border-radius: 4px;
	}
	._img {
		width: 80px;
		height: 100px;
		overflow: hidden;
		position: relative;
	}
	._img img {
		height: 100%;
		min-width: 100%;
	}
	._img div {
		position: absolute;
		bottom: 0;
		width: 100%;
		background: #00CE7C;
		color: #fff;
		font-size: 10px;
		text-align: center;
		line-height: 20px;
	}
	.sc-content {
		margin-left: 20px;
		flex: 1;
		display: flex;
		justify-content: space-between;
	}
	.sc-left p:nth-child(1) {
		margin-top: 10px;
		line-height: 30px;
	}
	.right span {margin: 10px 0 10px 5px;display: inline-block;}
	.sc-icon {
		border: #00CE7C 2px solid;
		color: #00CE7C;
		font-weight: 600;
		border-radius: 50%;
		padding: 2px;
	}
	.sc-next {
		width: 90%;
		margin: 0 auto;
		text-align: right;
		padding: 20px 0;
	}
	.xlImg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
