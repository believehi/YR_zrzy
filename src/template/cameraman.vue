<template>
	<div class="content" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.3)">
		<div class="top-nav">
			<img src="../assets/img/logo_01.png" />
		</div>
		<div class="main">
			<h3>自然资源图库摄影师入住资料完善</h3>
			<p class="main-title">真实姓名</p>
			<el-input class="main-input" placeholder="真实姓名" v-model="baseinfo.TrueName" clearable></el-input>
			<p class="main-title">手机号码</p>
			<el-input class="main-input" placeholder="手机号码" v-model="baseinfo.Phone" clearable :disabled="true"></el-input>
			<p class="main-title">电子邮箱</p>
			<el-input class="main-input" placeholder="电子邮箱" v-model="baseinfo.Email" clearable></el-input>
			<p class="main-title">所在地</p>
			<div class="city">
				<el-select v-model="sheng" @change="choseProvince" placeholder="省级地区">
					<el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id"></el-option>
				</el-select>
				<el-select v-model="shi" @change="choseCity" placeholder="市级地区">
					<el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id"></el-option>
				</el-select>
				<el-select v-model="qu" @change="choseBlock" placeholder="区/县级地区">
					<el-option v-for="item in qu1" :key="item.id" :label="item.value" :value="item.id"></el-option>
				</el-select>
			</div>
			<p class="main-title">详细地址</p>
			<el-input class="main-input" placeholder="详细地址" v-model="baseinfo.Address" clearable></el-input>
			<p class="main-title">公司和职业</p>
			<el-input class="main-input" placeholder="公司和职业" v-model="baseinfo.Company" clearable></el-input>
			<p class="main-title">身份证号</p>
			<el-input class="main-input" placeholder="身份证号" v-model="baseinfo.IdCard" clearable></el-input>
			<p class="main-title">上传身份证号照片</p>
			<div class="card">
				<div class="pers-img">
					<el-upload :action="avatarUrl"
						:on-success="cardAvatarSuccess"
						:before-upload="beforeAvatarUpload" :data="avatarData">
						<img v-if="baseinfo.IdFront" :src="imgUrl + baseinfo.IdFront" class="avatar">
						<div v-else class="id_img">
							<i class="el-icon-plus"></i>
							<p>上传身份证正面</p>
						</div>
					</el-upload>
				</div>
				<div class="pers-img">
					<el-upload :action="avatarUrl"
						:on-success="odlcardAvatarSuccess"
						:before-upload="beforeAvatarUpload" :data="avatarData">
						<img v-if="baseinfo.IdReverse" :src="imgUrl + baseinfo.IdReverse" class="avatar">
						<div v-else class="id_img">
							<i class="el-icon-plus"></i>
							<p>上传身份证反面</p>
						</div>
					</el-upload>
				</div>
			</div>
			<p class="main-title">上传5条作品</p>
			<div class="works">
				<div class="pers-img">
					<el-upload :action="oldavatarUrl"
						:on-success="cpAvatar" :data="oldavatarData" :show-file-list="false">
						<img v-if="zpList[0].PicId" :src="imgUrl + zpList[0].PicId" class="avatar">
						<div v-else class="id_img">
							<i class="el-icon-plus"></i>
						</div>
					</el-upload>
				</div>
				<div class="pers-img">
					<el-upload :action="oldavatarUrl"
						:on-success="cpAvatar_a" :data="oldavatarData" :show-file-list="false">
						<img v-if="zpList[1].PicId" :src="imgUrl + zpList[1].PicId" class="avatar">
						<div v-else class="id_img">
							<i class="el-icon-plus"></i>
						</div>
					</el-upload>
				</div>
				<div class="pers-img">
					<el-upload :action="oldavatarUrl"
						:on-success="cpAvatar_b" :data="oldavatarData" :show-file-list="false">
						<img v-if="zpList[2].PicId" :src="imgUrl + zpList[2].PicId" class="avatar">
						<div v-else class="id_img">
							<i class="el-icon-plus"></i>
						</div>
					</el-upload>
				</div>
				<div class="pers-img">
					<el-upload :action="oldavatarUrl"
						:on-success="cpAvatar_c" :data="oldavatarData" :show-file-list="false">
						<img v-if="zpList[3].PicId" :src="imgUrl + zpList[3].PicId" class="avatar">
						<div v-else class="id_img">
							<i class="el-icon-plus"></i>
						</div>
					</el-upload>
				</div>
				<div class="pers-img">
					<el-upload :action="oldavatarUrl"
						:on-success="cpAvatar_d" :data="oldavatarData" :show-file-list="false">
						<img v-if="zpList[4].PicId" :src="imgUrl + zpList[4].PicId" class="avatar">
						<div class="id_img">
							<i class="el-icon-plus"></i>
						</div>
					</el-upload>
				</div>
				
			</div>
			<div class="agree">
				<el-checkbox v-model="checked">阅读并同意</el-checkbox>
				<span>《版权素材委托代理协议》</span>
			</div>
			<el-button type="success" @click="BcSubmit()">保 存</el-button>
		</div>

	</div>
</template>

<script>
	import axios from 'axios';
	import helper from '../assets/js/helper.js';
	import map from '../assets/js/map.json';
	export default {
		data() {
			return {
				imgUrl: helper.imgUrl,
				avatarData: helper.PostData({IdCardType: "UserImg"}),
				oldavatarData: helper.PostData({IdCardType: "Pics"}),
				avatarUrl: helper.webUrl + 'annexes/idupload', //card 上传地址
				oldavatarUrl: helper.webUrl + 'annexes/uploadsuo', // 作品 上传地址
				zpList: [{
					UserId: '',
					PicId: ''
				},{
					UserId: '',
					PicId: ''
				},{
					UserId: '',
					PicId: ''
				},{
					UserId: '',
					PicId: ''
				},{
					UserId: '',
					PicId: ''
				}],
				// 个人信息
				baseinfo: '',
				// 省市区
				dataAddr: '',
				checked: false,
				province: '',
				sheng: '',
				shi: '',
				shi1: [],
				qu: '',
				qu1: [],
				city: '',
				block: '',
				loading: true
			}
		},
		methods:{
			// 保存个人信息
			BcSubmit(){
				var _this = this;
				if (!_this.baseinfo.TrueName) {
					_this.$message.warning('姓名不能为空！');
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
				if(!_this.sheng) {
					_this.$message.warning('请选择省/市/区！');
					return
				}
				// 根据编号获取 11000 省市区
				_this.sheng = _this.dataAddr[_this.sheng] || _this.sheng;
				_this.shi = _this.dataAddr[_this.shi] || _this.shi;
				_this.qu = _this.dataAddr[_this.qu] || _this.qu;
				
				if (!_this.baseinfo.Address) {
					_this.$message.warning('详细地址不能为空！');
					return
				}
				if (!_this.baseinfo.Company) {
					_this.$message.warning('请输入公司名称和职业！');
					return
				}
				if (!_this.baseinfo.IdCard) {
					_this.$message.warning('请输入身份证号！');
					return
				}
				if (!helper.checkCard(_this.baseinfo.IdCard)) {
					_this.$message.warning('请输入正确的身份证号！');
					return
				}
				if (!_this.checked) {
					_this.$message.warning('请勾选《版权素材委托代理协议》！');
					return
				}

				helper.getAjax("user/edituser", function(res) {
					if (res.code == 200) {
						_this.$router.go(-1)
						_this.$message({
							type: "success",
							showClose: true,
							message: "保存成功！"
						});
					} else {
						_this.$message({
							showClose: true,
							message: res.info
						});
					}
				}, {
					UserId: helper.getuserinfo().userId,
					TrueName: _this.baseinfo.TrueName,
					Phone: _this.baseinfo.Phone,
					Email: _this.baseinfo.Email,
					Address: _this.baseinfo.Address,
					Company: _this.baseinfo.Company,
					IdCard: _this.baseinfo.IdCard,
					IdFront: _this.baseinfo.IdFront,
					IdReverse: _this.baseinfo.IdReverse,
					WorkShopList: _this.zpList
				}, "post")
			},
			cardAvatarSuccess(res, file, fileList){
				if(res.code == 200) {
					this.baseinfo.IdFront = res.data.Pathinfo
				}
			},
			odlcardAvatarSuccess(res, file, fileList){
				if(res.code == 200) {
					this.baseinfo.IdReverse = res.data.Pathinfo
				}
			},
			cpAvatar(res, file, fileList){
				this.cpAvatarSuccess(0, res)
			},
			cpAvatar_a(res, file, fileList){
				this.cpAvatarSuccess(1, res)
			},
			cpAvatar_b(res, file, fileList){
				this.cpAvatarSuccess(2, res)
			},
			cpAvatar_c(res, file, fileList){
				this.cpAvatarSuccess(3, res)
			},
			cpAvatar_d(res, file, fileList){
				this.cpAvatarSuccess(4, res)
			},
			cpAvatarSuccess(n, res){
				this.zpList[n].PicId = res.data.xiaoImage
				this.zpList[n].UserId = helper.getuserinfo().userId
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
			// 获取用户个人信息
			grxx(){
				var _this = this;
				helper.getAjax("user/getinfo", function(res) {
					console.log(res)
					if (res.code == 200) {
						_this.loading = false;
						_this.baseinfo = res.data.baseinfo
						_this.sheng = _this.baseinfo.Province
						_this.shi = _this.baseinfo.City
						_this.qu = _this.baseinfo.Area
						_this.zpList = res.data.WorkShopList || _this.zpList;
					} else {
						_this.loading = false;
						_this.$message({
							showClose: true,
							message: res.info
						});
					}
					if (res.code == 410) {
						localStorage.removeItem('$tk_userinfo')
					}
				}, {
					phone: helper.getuserinfo().mobile 
				}, "post")
			},
			// 加载china地点数据，三级
			getCityData: function() {
				var that = this
				var data = map || []
				that.dataAddr = data;
				that.province = []
				that.city = []
				that.block = []
				// 省市区数据分类
				for (var item in data) {
					if (item.match(/0000$/)) { //省
						that.province.push({
							id: item,
							value: data[item],
							children: []
						})
					} else if (item.match(/00$/)) { //市
						that.city.push({
							id: item,
							value: data[item],
							children: []
						})
					} else { //区
						that.block.push({
							id: item,
							value: data[item]
						})
					}
				}
				// 分类市级
				for (var index in that.province) {
					for (var index1 in that.city) {
						if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
							that.province[index].children.push(that.city[index1])
						}
					}
				}
				// 分类区级
				for (var item1 in that.city) {
					for (var item2 in that.block) {
						if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
							that.city[item1].children.push(that.block[item2])
						}
					}
				}

			},
			// 选省
			choseProvince: function(e) {
				for (var index2 in this.province) {
					if (e === this.province[index2].id) {
						this.shi1 = this.province[index2].children
						this.shi = this.province[index2].children[0].value
						this.qu1 = this.province[index2].children[0].children
						this.qu = this.province[index2].children[0].children[0].value
						this.E = this.qu1[0].id
					}
				}
			},
			// 选市
			choseCity: function(e) {
				for (var index3 in this.city) {
					if (e === this.city[index3].id) {
						this.qu1 = this.city[index3].children
						this.qu = this.city[index3].children[0].value
						this.E = this.qu1[0].id
					}
				}
			},
			// 选区
			choseBlock: function(e) {
				this.E = e;
			},
		},
		created() {
			this.getCityData();
			this.grxx();
		}
	}
</script>

<style scoped>
	.content {
		margin-top: -80px;
		background: #ddd;
		position: relative;
		padding-bottom: 80px;
	}

	.top-nav {
		width: 100%;
		height: 60px;
		background: #000;
	}

	.top-nav img {
		height: 30px;
		margin: 15px 0 0 20px;
	}

	.main {
		margin: 40px auto 0;
		padding: 50px 40px;
		box-sizing: border-box;
		width: 60%;
		min-width: 800px;
		/* height: 900px; */
		background: #fff;
	}

	.main-title {
		line-height: 40px;
		margin-top: 10px;
	}

	.main-input {
		width: 400px;
	}

	.city div {
		width: 150px;
	}

	.pers-img {
		position: relative;
		display: inline-block;
		width: 100px;
		height: 100px;
		margin-right: 10px;
		background: #eee;
		overflow: hidden;
	}
	.id_img {
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		width: 100px;
		height: 100px;
	}
	.el-icon-plus {font-size: 40px;color: #999;}
	.id_img p {
		line-height: 36px;
		font-size: 12px;
		color: #999;
	}
	.pers-img img {
		position: absolute;
		top: 0;
		left: 0;
		min-width: 100px;
		height: 100px;
	}

	.agree {
		margin: 40px 0;
	}

	.agree span {
		font-size: 14px;
		color: #6C79B4;
	}

	.mary {
		width: 80px;
	}
</style>
