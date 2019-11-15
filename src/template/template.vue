<template>
	<div class="content">
		地质
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
			getAjax(){
				
				
				helper.getAjax("user/login", res => {
					// console.log(res)
					if (res.code == 200) {
						
						
						
						
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
					phone: this.phone,
					password: this.password
				}, "post")
				
				
				
				//  提示
				this.$confirm('是否删除选中的作品？', '提示', {
					confirmButtonText: '确定删除',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					

				}).catch(() => {})
				
				
				
				
			}
		}
	}
</script>

<style scoped>
	
</style>
