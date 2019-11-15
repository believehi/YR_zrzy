<template>
	<div class="content" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0)">
		<div class="sz-top">账户设置<span style="float: right;padding-right: 20px;color: #00CE7C;">我的积分 : {{baseinfo.Integral}}</span></div>
		<p class="sz-title">上传头像</p>
		<div class="sz-img">
			<el-upload class="avatar-uploader" :action="avatarUrl"
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload" :data="avatarData">
				<img v-if="baseinfo.UserImg" :src="imgUrl + baseinfo.UserImg" class="avatar">
			</el-upload>
		</div>
		<p class="sz-title">昵称</p>
		<el-input class="sz-input" placeholder="昵称" v-model="baseinfo.NickName" clearable></el-input>
		<p class="sz-title">手机号</p>
		<el-input class="sz-input" placeholder="手机号" v-model="baseinfo.Phone" clearable :disabled="true"></el-input>
		<p class="sz-title">邮箱</p>
		<el-input class="sz-input" placeholder="邮箱" v-model="baseinfo.Email" clearable></el-input>
		<p class="sz-title">账户类型</p>
		<el-select v-model="baseinfo.AccountType" placeholder="请选择">
			<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
		</el-select>
		<p class="sz-title">真实姓名<span class="sz-ye">（必填）</span></p>
		<el-input class="sz-input" placeholder="真实姓名" v-model="baseinfo.TrueName" clearable></el-input>
		<p class="sz-title">公司名称<span class="sz-ye">（必填）</span></p>
		<el-input class="sz-input" placeholder="公司名称" v-model="baseinfo.Company" clearable></el-input>
		<p class="sz-title">个人描述</p>
		<el-input class="sz-input" type="textarea"
		  :autosize="{ minRows: 2, maxRows: 100}"
		  placeholder="请输入个人描述"
		  v-model="baseinfo.Des">
		</el-input></br>
		 <el-button type="success" class="sz-pre" @click="submit()">完 成</el-button>
	</div>
</template>

<script>
	import axios from 'axios';
	import helper from '../assets/js/helper.js';
	export default {
		data() {
			return {
				imgUrl: helper.imgUrl,
				avatarData: helper.PostData({IdCardType: "UserImg"}),
				avatarUrl: helper.webUrl + 'annexes/picupload',
				userId: '',
				// HeadImg: '',
				baseinfo: '',
				options: [{value: '1',label: '个人账户'},{value: '2',label: '公司账户'}],
				loading: true
			}
		},
		created() {
			// 获取用户id
			this.userId = helper.getuserinfo().userId;
			this.grxx()
			
		},
		methods: {
			// 上传头像图片
			handleAvatarSuccess(res, file, fileList) {
				var _this = this;
				if (res.code == 200) {
					_this.baseinfo.UserImg = res.data.Pathinfo
					_this.$message({
						type: "success",
						showClose: true,
						message: "头像上传成功！",
						duration: 5000
					});
				}
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			// 保存
			submit(){
				var _this = this;
				if (!_this.baseinfo.NickName) {
					_this.$message.warning('名称不能为空！');
					return
				}
				if (!_this.baseinfo.Email) {
					_this.$message.warning('请输入邮箱！');
					return
				}
				if(!helper.checkEmail(_this.baseinfo.Email)) {
					_this.$message.warning('请输入正确的邮箱！');
					return
				}
				if (!_this.baseinfo.TrueName) {
					_this.$message.warning('请输入真实姓名！');
					return
				}
				if (!_this.baseinfo.Company) {
					_this.$message.warning('请输入公司名称！');
					return
				}
				helper.getAjax("user/edituser", function(res) {
					if (res.code == 200) {
							_this.$message({
								type: "success",
								showClose: true,
								message: "个人信息修改成功！",
								duration: 5000
							});
							// _this.$router.go(-1)
					} else {
						_this.$message({
							showClose: true,
							message: res.info
						});
					}
				}, {
					UserId: this.userId,
					UserImg: this.baseinfo.UserImg,
					TrueName: this.baseinfo.TrueName,
					Company: this.baseinfo.Company,
					Email: this.baseinfo.Email,
					Des: this.baseinfo.Des
				}, "post")
			},
			// 获取用户个人信息
			grxx(){
				var _this = this;
				helper.getAjax("user/getinfo", function(res) {
					if (res.code == 200) {
						_this.baseinfo = res.data.baseinfo
						_this.baseinfo.AccountType = _this.baseinfo.AccountType == 1 ? '个人账户' : '公司账户'
						_this.loading = false;
					} else {
						_this.$message({
							showClose: true,
							message: res.info
						});
						_this.loading = false;
					}
				}, {
					phone: helper.getuserinfo().mobile 
				}, "post")
			}
		}
	}
</script>

<style scoped>
	.sz-top {line-height: 60px;border-bottom: 1px solid #eee; font-weight: 600;}
	.sz-img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;
	}
	.avatar {
		height: 100px;
		min-width: 100px;
	}
	.sz-title {line-height: 50px;}
	.sz-input {width: 500px;}
	.sz-ye {color: red;}
	.sz-pre {margin: 30px 0;}
</style>
