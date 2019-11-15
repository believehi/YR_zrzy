<template>
	<el-container class="content" v-loading="loading"
    element-loading-text="正在登陆中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.2)">
		<el-aside width="400px">
			<div class="left-aa left" v-show="lose">
				<el-tabs>
					<el-tab-pane>
						<span slot="label">登录</span>
						<div class="logo">
							<el-input placeholder="手机号" v-model="phone" clearable class="logo-input"></el-input>
							<el-input type="password" placeholder="密码" v-model="password" clearable class="logo-input"></el-input>
						</div>
						<p class="mess" @click="forget()">忘记密码？</p>
						<el-button class="button-info" type="primary" @click="mylogin()">登 录</el-button>
						<p class="return-logo return-home" @click="returnHome()">回到首页</p>
					</el-tab-pane>
					<el-tab-pane label="注册">
						<div class="register">
							<el-input placeholder="姓名" v-model="userName" clearable class="logo-input"></el-input>
							<el-input placeholder="手机号" v-model="userPhone" clearable class="logo-input"></el-input>
							<div class="zc-code">
								<el-input placeholder="验证码" v-model="userNum" class="logo-input"></el-input>
								<span @click="myVerifi">{{verifi}}</span>
							</div>
							<el-input type="password" placeholder="密码" v-model="userPassword" clearable class="logo-input"></el-input>
						</div>
						<el-button class="button-info" type="primary" @click="register">注 册</el-button>
						<p class="return-logo return-home" @click="returnHome()">回到首页</p>
					</el-tab-pane>
				</el-tabs>
			</div>
			<div class="left-bb left" v-show="!lose && reset">
				<p class="lose-mess">找回密码</p>
				<el-input placeholder="请输入账号手机号" v-model="myPhone" clearable class="logo-input"></el-input>
				<!-- <el-input placeholder="短信验证码" v-model="myNum" clearable class="logo-input"></el-input> -->
				<div class="zc-code">
					<el-input placeholder="验证码" v-model="myNum" class="logo-input"></el-input>
					<span @click="forgetVerifi">{{forVerifi}}</span>
				</div>
				<el-button class="button-info" type="primary" @click="retrieve()">下一步</el-button>
				<p class="return-logo" @click="returnLogo()">返回登录</p>
			</div>
			<div class="left-cc left" v-show="!lose && !reset">
				<p class="lose-mess">找回密码</p>
				<el-input type="password" placeholder="设置新密码" v-model="again" clearable class="logo-input"></el-input>
				<el-input type="password" placeholder="再次输入新密码" v-model="againName" clearable class="logo-input"></el-input>
				<el-button class="button-info" type="primary" @click="mimaSuc()">确 定</el-button>
				<p class="return-logo" @click="returnLogo()">返回登录</p>
			</div>
		</el-aside>
		<el-main>
			<img class="logo-back" src="../assets/img/back_01.jpg" />
		</el-main>
	</el-container>
</template>

<script>
	// import { Message } from 'element-ui';
	import axios from 'axios';
	import helper from '../assets/js/helper.js';
	export default {
		data() {
			return {
				// 注册
				verifi: "获取短信验证码",
				userName: '',
				userPhone: '',
				userNum: '',
				userPassword: '',
				user_info: true,
				user_data: 60,
				// 登录
				phone: '18774311135',
				password: 'a123456',
				// 找回账号
				forVerifi: '获取短信验证码',
				myPhone: '18774311135',
				myNum: '',
				// 重置账号密码
				again: '',
				againName: '',
				// 切换 登录 注册 找回密码 切换 
				lose: true,
				reset: true,
				loading: false
			};
		},
		methods: {
			// 登录
			mylogin: function() {
				var _this = this
				// 手机号验证
				if(!helper.checkPhone(_this.phone)) {
					_this.$message({
						showClose: true,
						message: '输入正确的手机号码！'
					});
					return
				}
				_this.loading = true;
				helper.getAjax("user/login", res => {
					if (res.code == 200) {
						helper.setuserinfo(res.data.baseinfo)
						_this.$message({
							showClose: true,
							message: '登陆成功！',
							type: 'success',
							duration: 3000
						});
						_this.loading = false;
						setTimeout(function() {
							_this.returnHome()
						}, 300);
					} else {
						_this.$message({
							showClose: true,
							message: res.info
						});
						_this.loading = false;
					}
					if (res.code == 410) {
						localStorage.removeItem('$tk_userinfo')
					}
				}, {
					phone: _this.phone,
					password: _this.password
				}, "post")
			},
			// 注册获取验证码
			myVerifi: function(){
				// 手机号验证
				if(!helper.checkPhone(this.userPhone)) {
					this.$message({
						showClose: true,
						message: '输入正确的手机号！'
					});
					return
				}
				if(this.user_info){
					this.user_info = false
					helper.getAjax("send", res => {
						if (res.code == 200) {
							this.getTime(1);
							
							
						} else {
							this.$message({
								showClose: true,
								message: res.info
							});
						}
					}, {
						phone: this.userPhone
					}, "post")
				}
			},
			// 找回密码的验证码
			forgetVerifi: function(){
				// 手机号验证
				if(!helper.checkPhone(this.myPhone)) {
					this.$message({
						showClose: true,
						message: '输入正确的手机号！'
					});
					return
				}
				if(this.user_info){
					this.user_info = false
					helper.getAjax("send", res => {
						if (res.code == 200) {
							this.getTime(2);

						} else {
							this.$message({
								showClose: true,
								message: res.info
							});
						}
					}, {
						phone: this.myPhone
					}, "post")
				}
			},
			// 验证码倒计时
			getTime: function(val){
				var that = this
				var timer = setInterval(function() {
					that.user_data --;
					if (that.user_data <= 0) {
						that.user_info = true;
						if (val == 1) {
							that.verifi = "重新获取验证码";
						}
						if (val == 2) {
							that.forVerifi = "重新获取验证码";
						}
						that.user_data = 60;
						clearInterval(timer);
					} else {
						if (val == 1) {
							that.verifi = "重新发送" + that.user_data + "秒";
						}
						if (val == 2) {
							that.forVerifi = "重新发送" + that.user_data + "秒";
						}
					}
				}, 1000)
			},
			// 注册
			register: function(){
				if (this.nickname == '') {
					this.$message({
						showClose: true,
						message: "输入注册的姓名"
					});
					return
				}
				if(!helper.checkPhone(this.userPhone)) {
					this.$message({
						showClose: true,
						message: '输入正确的手机号码！',
					});
					return
				}
				if (this.userNum == '') {
					this.$message({
						showClose: true,
						message: "输入验证码"
					});
					return
				}
				if(!helper.checkPassword(this.userPassword)) {
					this.$message({
						showClose: true,
						message: '至少输入6个以上的数字或字母！',
					});
					return
				}
				
				helper.getAjax("user/regist", res => {
					if (res.code == 200) {
						this.$message({
							showClose: true,
							message: '注册成功！',
							type: 'success',
							duration: 3000
						});
						
					} else {
						this.$message({
							showClose: true,
							message: res.info
						});
					}
				}, {
					nickname: this.userName,
					phone: this.userPhone,
					code: this.userNum,
					password: this.userPassword
				}, "post")
			},
			// 忘记密码
			forget() {
				this.lose = false;
			},
			// 忘记密码下一步
			retrieve() {
				if (!helper.checkPhone(this.myPhone)) {
					this.$message({
						showClose: true,
						message: '输入正确的手机号！'
					});
					return
				}
				if (this.myNum == '') {
					this.$message({
						showClose: true,
						message: '输入验证码！'
					});
					return
				}
				helper.getAjax("user/forgetnext", res => {
					if (res.code == 200) {
						this.reset = false;
					} else {
						this.$message({
							showClose: true,
							message: res.info
						});
					}
				}, {
					phone: this.myPhone,
					code: this.myNum
				}, "post")
				
				
			},
			// 设置密码
			mimaSuc() {
				if (this.again == '') {
					this.$message({
						showClose: true,
						message: "请输入密码！"
					});
					return
				}
				if (!helper.checkPassword(this.again)) {
					this.$message({
						showClose: true,
						message: "至少输入6个以上的数字或字母！！"
					});
					return
				}
				if (this.againName == '') {
					this.$message({
						showClose: true,
						message: "请再次输入密码！"
					});
					return
				}
				if (this.againName != this.again) {
					this.$message({
						showClose: true,
						message: "两次输入的密码不一致！"
					});
					return
				}
				helper.getAjax("user/forgetpwd", res => {
					if (res.code == 200) {
						this.lose = true;
						this.reset = true;
						this.againName = ''
						this.$message({
							"type": "success",
							showClose: true,
							message: "密码修改成功请重新登录！"
						});
						
					} else {
						this.$message({
							showClose: true,
							message: res.info
						});
					}
				}, {
					phone: this.myPhone,
					password: this.againName
				}, "post")
				
			},
			// 返回登录
			returnLogo() {
				this.lose = true;
				this.reset = true;
			},
			// 返回首页
			returnHome() {
				// this.$router.replace('/zrtk')
				this.$router.go(-1)
			}
		},
		props: {
			app_this: {
				default: ''
			}
		}
	}
</script>

<style scoped>
	.content {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #fff;
	}

	.logo-back {
		height: 100%;
		min-width: 100%;
	}

	.el-main {
		padding: 0;
		overflow: hidden;
	}

	.left {
		width: 80%;
		margin: 200px auto 0;
	}

	.logo-input {
		margin-top: 20px;
	}

	.zc-code {
		position: relative;
	}

	.zc-code span {
		position: absolute;
		right: 0;
		top: 20px;
		padding-right: 20px;
		line-height: 40px;
		cursor: pointer;
		color: #00CE7C;
		user-select:none;
		font-size: 14px;
	}

	.mess {
		text-align: right;
		margin: 20px 10px 0 0;
		cursor: pointer;
	}

	.lose-mess {
		text-align: center;
		line-height: 50px;
		font-size: 20px;
	}

	.button-info {
		width: 100%;
		margin-top: 30px;
	}

	.return-logo {
		text-align: center;
		/* color: #00CE7C; */
		color: #666;
		font-weight: 600;
		text-decoration: underline;
		margin-top: 20px;
		cursor: pointer;
		font-size: 14px;
	}

	.return-home {
		color: #666;
	}
</style>
