<template>
	<div class="content">
		<div class="sc-title sc">
			<span>上传图片</span>
			<el-button type="success">完善信息</el-button>
		</div>

		<!-- 上传进程 -->
		<div class="sc-process sc">
			<div class="sc-process-title">
				<span class="sc-num">2</span>设置预览图（<span class="sc-bz">2 </span>/ 3）
			</div>
			<el-steps :active="activePro" finish-status="success" class="sc-list">
				<el-step title="设置预览图"></el-step>
				<el-step title="完善信息"></el-step>
				<el-step title="完成上传"></el-step>
			</el-steps>

			<div class="ct-title ct">
				<span>素材分类：</span>&emsp;
				<el-cascader :options="options" v-model="selectedOptions" @change="handleChange">
				</el-cascader>
				&emsp;<span @click="onReset()">
					<el-radio-button>重置</el-radio-button>
				</span>
			</div>
			<el-container class="ct">
				<el-main class="ct-main">
					<div class="ct-sucai">
						<span class="ct-fl">用户类型：</span>
						<el-radio v-model="radio" label="1">VIP</el-radio>
						<el-radio v-model="radio" label="2">普通用户</el-radio>
					</div>
					<div class="ct-details-title">
						<span class="ct-fl">标题：</span>
						<el-input class="ct-format" placeholder="标题" v-model="name" clearable></el-input>
					</div>
					<div class="ct-details-title">
						<span class="ct-fl">关键字：</span>
						<div class="ct-format">
							<el-input type="textarea" :rows="10" placeholder="请输入关键字" v-model="textarea" :change="checkedFunc()"></el-input>
							<div class="ct-delete">
								<strong @click="textReset()"><el-radio-button>重置</el-radio-button></strong>
								<span>{{textNum}}/70</span>
							</div>
						</div>
					</div>
					<!-- <div class="ct-details-title">
						<span class="ct-fl">图片格式：</span>
						<div class="ct-format">
							<el-checkbox v-model="checked" disabled>{{gsImg}}</el-checkbox>
							<el-input class="ct-inp" placeholder="windows 图片查看器" clearable disabled></el-input>
						</div>
					</div> -->
					<div class="ct-details-title">
						<span class="ct-fl">源文件格式<p>（可选）&emsp;</p></span>
						<div class="ct-format">
							  <el-radio-group v-model="source" class="source">
							    <el-radio :label="1">JPG</el-radio>
							    <el-radio :label="2">PNG</el-radio>
							    <el-radio :label="3">EPS</el-radio>
							    <el-radio :label="4">PSD</el-radio>
							    <el-radio :label="5">AI&emsp;</el-radio>
							    <el-radio :label="6">CDR</el-radio>
							  </el-radio-group>
								<el-upload class="source-upload" :action="uploadUrl" :data="dataPost"
									:on-success="handleAvatarSuccess" 
									:before-upload="beforeAvatarUpload" >
									<el-button type="success">{{sourceText}}</el-button>
								</el-upload>
						</div>
					</div>
					<div class="ct-details-title">
						<span class="ct-fl">分辨率：</span>
						<div class="ct-format">
							<el-radio v-model="radio2" label="1">72 dpi</el-radio>
							<el-radio v-model="radio2" label="2">300 dpi</el-radio>
							<el-radio v-model="radio2" label="3">
								<el-input class="ct-px" placeholder="像素" v-model="xsSize" clearable></el-input> dpi
							</el-radio>
						</div>
					</div>
					<div class="ct-details-title">
						<span class="ct-fl">尺寸：</span>
						<div class="ct-format">
							<el-input class="ct-px" placeholder="宽" v-model="widthXs" clearable></el-input> dpi&emsp;
							<el-input class="ct-px" placeholder="高" v-model="heightXs" clearable></el-input> dpi
						</div>
					</div>
					<div class="ct-details-title">
						<span class="ct-fl">版权信息：</span>
						<div class="ct-format">
							<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" placeholder="请输入版权信息" v-model="textarea11"></el-input>
						</div>
					</div>
				</el-main>
				<el-aside width="300px">
					<viewer :images="[imgUrl + uploadImg[0]]">
						<img :src="imgUrl + uploadImg[0]" class="ct-asde" />
					</viewer>
				</el-aside>
			</el-container>
			<div class="ct ct-next">
				<el-radio-button style="position: relative;"><viewer :images="[imgUrl + uploadImg[0]]">预览图<img :src="imgUrl + uploadImg[0]" class="xlImg" /></viewer></el-radio-button>
				<el-button type="success" @click="sub()">提交</el-button>
			</div>

		</div>

		<!-- 上传 -->
		<!-- <div class="sc-main sc">
			<el-upload
				class="upload-demo sc-upload"
				drag
				action="https://jsonplaceholder.typicode.com/posts/"
				multiple>
				<el-button type="success" class="sc-img">点击上传</el-button>
				<div class="el-upload__text">
					将文件拖到此处，或<em>点击上传</em>
					<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
				</div>
			</el-upload>
			<div class="sc-sub">
				温馨提示：<el-checkbox v-model="checked">阅读并同意</el-checkbox>
				<span>《上传声明》</span><span>《版权声明》</span>
			</div>
		</div> -->

	</div>
</template>

<script>
	import axios from 'axios';
	import helper from '../assets/js/helper.js';
	export default {
		data() {
			return {
				imgUrl: helper.imgUrl,
				textarea: '',
				textNum: 0,
				textarea11: '',
				activePro: 2,
				radio: '2',
				radio2: '1',
				checked: true,
				name: '',
				xsSize: '',
				widthXs: '',
				heightXs: '',
				gsImg: 'PNG',
				options: [], 
				selectedOptions: [],
				flId: '',
				// 上传图片的数组
				uploadImg: ['', ''],
				uploadPicSize: 0,
				UserId: '',
				// 上传源文件
				uploadUrl: helper.webUrl + "annexes/picupload",
				dataPost: helper.PostData({}),
				source: 1,
				sourceText: "上传源文件",
				FilePath: ''
			}
		},
		methods: {
			handleAvatarSuccess(res, file, fileList){
				if (res.code == 200) {
					this.FilePath = res.data.Pathinfo;
					this.sourceText = "上传成功"
					this.$message({
						type: 'success',
						message: '上传成功!'
					})
				} else {
					this.sourceText = "重新上传"
					this.$message({
						message: '上传失败，重新上传!'
					})
				}
			},
			beforeAvatarUpload(file){
				this.uploadPicSize = file.lastModified
				return true
			},
			// 提交
			sub(){
				if (this.flId == '') {
					this.$message({
						showClose: true,
						message: "选择图片的分类！"
					});
					return;
				}
				if (this.name == '') {
					this.$message({
						showClose: true,
						message: "请输入标题"
					});
					return;
				}
				if (this.textarea == '') {
					this.$message({
						showClose: true,
						message: "请输入关键字"
					});
					return;
				}
				var fblImg = 70;
				if (this.radio2 == 1) {
					fblImg = 70;
				}
				if (this.radio2 == 2) {
					fblImg = 300;
				}
				if (this.radio2 == 3) {
					fblImg = this.xsSize
				}
				if (this.widthXs == '') {
					this.$message({
						showClose: true,
						message: "请输入图片宽"
					});
					return;
				}
				if (this.heightXs == '') {
					this.$message({
						showClose: true,
						message: "请输入图片高"
					});
					return;
				}
				if (!helper.checkNumber(this.widthXs) || !helper.checkNumber(this.heightXs)) {
					this.$message({
						showClose: true,
						message: "宽高必须为数字！"
					});
					return;
				}
				if (this.textarea11 == '') {
					this.$message({
						showClose: true,
						message: "请输入版权信息"
					});
					return;
				}
				switch(this.source) {
					case 1:
						this.gsImg = "JPG"
						break;
					case 2:
						this.gsImg = "PNG"
						break;
					case 3:
						this.gsImg = "EPS"
						break;
					case 4:
						this.gsImg = "PSD"
						break;
					case 5:
						this.gsImg = "AI"
						break;
					case 6:
						this.gsImg = "CDR"
				}
				helper.getAjax("tuku/addpic", (res) => {
					if (res.code == 200) {
							this.$message({
								type: "success",
								showClose: true,
								message: "图片上传成功！"
							});
							this.app_this.$router.push("shop")
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
					UserId: this.UserId,
					FilePath: this.FilePath || this.uploadImg[1],
					Picture: this.uploadImg[1],
					Thumbnail: this.uploadImg[0],
					ThumbnailType: this.radio,
					PicTitle: this.name,
					Keyword: this.textarea,
					Format: this.gsImg,
					ResolvingPower: fblImg,
					SizeHight: this.heightXs,
					SizeWide: this.widthXs,
					Size: this.uploadPicSize,
					Copyright: this.textarea11,
					PicTypeId: this.flId
				}, "post")
			},
			handleChange(value) {
				this.flId = value[1]
			},
			// 获取图片分类
			picBranch() {
				helper.getAjax("tuku/typepic", (res) => {
					if (res.code == 200) {
						this.options = res.data.list
					}
					if (res.code == 410) {
						localStorage.removeItem('$tk_userinfo')
					}
				}, {}, "post")
			},
			// 分类重置
			onReset() {
				this.selectedOptions = []
			},
			textReset(){
				this.textarea = ''
			},
			checkedFunc(){
				var len = this.textarea.length;
				this.textNum = len;
				if (len > 70) {
					this.$message({
						showClose: true,
						message: "已超出字数的限制！"
					});
				}
			}

		},
		created() {
			var uploadImg = this.$route.params.uploadImg;
			var uploadPicSize = this.$route.params.uploadPicSize || 0;
			this.UserId = helper.getuserinfo().userId;
			this.picBranch()
			if (!!uploadImg) {
				localStorage.setItem('uploadImg', JSON.stringify({
					uploadImg: uploadImg
				}));
			}
			this.uploadImg = uploadImg || JSON.parse(localStorage.getItem('uploadImg')).uploadImg || ['', ''];
			var str = this.uploadImg[1].split(".")
			this.gsImg = str[str.length-1].toUpperCase() || "JPG"
		},
		props: {
			app_this: {
				default: 'detailsApp',
				required: true
			}
		}
	}
</script>

<style scoped>
	.sc {
		width: 70%;
		min-width: 800px;
		margin: 0 auto;
	}

	.content {
		background: #eee;
		min-height: 500px;
		padding-bottom: 100px;
	}

	.sc-title {
		padding: 20px 0;
		text-align: right;
		height: 40px;
	}

	.sc-title span {
		float: left;
		line-height: 40px;
	}

	.sc-main {
		background: #fff;
		padding: 10px;
		box-sizing: border-box;
		border-radius: 5px;
	}

	.sc-sub {
		padding: 20px 0 10px;
		font-size: 14px;
	}

	.sc-sub span {
		color: #6C79B4;
	}

	.sc-img {
		margin: 80px 0 20px;
	}

	.sc-process {
		background: #fff;
		margin-bottom: 20px;
		border-radius: 5px;
		overflow: hidden;
	}

	.sc-process-title {
		line-height: 40px;
	}

	.sc-bz {
		color: #00CE7C;
		font-size: 20px;
	}

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

	.ct {
		margin: 30px auto;
		width: 90%;
	}

	.ct-title {
		padding: 20px 30px;
		box-sizing: border-box;
		box-shadow: 2px 2px 10px #ddd;
		border-radius: 4px;
	}

	.main-input {
		width: 300px;
	}

	.ct-asde {
		width: 100%;
	}

	.ct-next {
		text-align: right;
		padding: 20px 0;
	}

	.ct-main {
		padding: 0 50px 0 20px;
	}

	.ct-details-title {
		display: flex;
		align-items: center;
		margin-top: 20px;
	}

	.ct-fl {
		display: inline-block;
		width: 100px;
		text-align: right;
		margin-right: 20px;
	}

	.ct-format {
		flex: 1;
		display: flex;
		align-items: center;
		position: relative;
	}

	.ct-delete {
		position: absolute;
		bottom: 10px;
		right: 20px;
		color: #999;
	}

	.ct-inp {
		margin-left: 40px;
	}

	.ct-px {
		width: 80px;
		margin-right: 20px;
	}
	.xlImg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.source {
		margin-right: 20px;
	}
	.source label {
		padding: 10px 0;
	}
</style>
