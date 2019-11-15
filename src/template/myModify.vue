<template>
	<div class="content">
		<div class="sz-top">修改密码</div>
		<p class="sz-title">旧密码</p>
		<el-input type="password" class="sz-input" placeholder="旧密码" v-model="odlModify" clearable></el-input>
		<p class="sz-title">新密码</p>
		<el-input type="password" class="sz-input" placeholder="新密码" v-model="Modify_aa" clearable></el-input>
		<p class="sz-title">再次输入新密码</p>
		<el-input type="password" class="sz-input" placeholder="再次输入新密码" v-model="Modify_bb" clearable></el-input>
		</br><el-button type="success" class="sz-pre" @click="subModify()">完 成</el-button>
	</div>
</template>

<script>
	import axios from 'axios';
	import helper from '../assets/js/helper.js';
	export default {
		data() {
			return {
				odlModify: '',
				Modify_aa: '',
				Modify_bb: ''
			}
		},
		methods:{
			subModify(){
				var _this = this;
				if(!_this.odlModify){
					_this.$message.warning('请输入旧密码！');
					return
				}
				if(!_this.Modify_aa){
					_this.$message.warning('请输入新密码！');
					return
				}
				if(!helper.checkPassword(_this.Modify_aa)) {
					_this.$message.warning('密码至少包含 数字和英文，长度6-20');
					return
				}
				if(!_this.Modify_bb){
					_this.$message.warning('请再次输入新密码！');
					return
				}
				if(_this.Modify_aa != _this.Modify_bb){
					_this.$message.warning('两次输入的密码不一致！');
					return
				}
				
				helper.getAjax("user/updmodifypw", function(res) {
					if (res.code == 200) {
							_this.$message({
								showClose: true,
								message: "密码修改成功"
							});
						
					} else {
						_this.$message({
							showClose: true,
							message: res.info
						});
					}
				}, {
					oldpassword: _this.odlModify,
					newpassword: _this.Modify_aa
				}, "post")
			}
		}
	}
</script>

<style scoped>
	.sz-top {line-height: 60px;border-bottom: 1px solid #eee; font-weight: 600;}
	.sz-title {line-height: 50px;}
	.sz-input {width: 500px;}
	.sz-pre {margin: 30px 0;}
	
</style>
