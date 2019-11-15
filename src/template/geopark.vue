<template>
	<div class="content">
		<!-- 导航背景 -->
		<div class="top">
			<img class="top-img" src="../assets/img/hn_01.jpg" />
			<ul class="top-list">
				<li v-for="(itemT, indexT) in twoList" :key="indexT" @click="scrollBy(indexT)">
					<div class="details-img">
						<img v-if="itemT.TypePic" :src="imgUrl + itemT.TypePic" />
					</div>
					<div class="top-border"></div>
					<p>{{itemT.TypeName}}</p>
				</li>
			</ul>
		</div>
		<!-- 主体 -->
		<!-- 1 -->
		<div class="main">
			<div class="left">
				<p>{{twoList[0].TypeName}}</p>
				<div>{{twoList[0].Des}}</div>
			</div>
			<div class="right">
				<div class="right-init">
					<img v-if="imgList_aa[0].Thumbnail" :src="imgUrl + imgList_aa[0].Thumbnail" @click="goDelete(imgList_aa[0].Id)"/>
				</div>
			</div>
		</div>
		<!-- 2 -->
		<div class="main">
			<div class="left">
				<p>{{twoList[1].TypeName}}</p>
				<div>{{twoList[1].Des}}</div>
			</div>
			<div class="right">
				<div class="right-aa">
					<img v-if="imgList_bb[0].Thumbnail" :src="imgUrl + imgList_bb[0].Thumbnail" @click="goDelete(imgList_bb[0].Id)" />
				</div>
				<div class="right-bb">
					<img v-if="imgList_bb[1].Thumbnail" :src="imgUrl + imgList_bb[1].Thumbnail" @click="goDelete(imgList_bb[1].Id)" />
				</div>
				<div class="right-cc">
					<img v-if="imgList_bb[2].Thumbnail" :src="imgUrl + imgList_bb[2].Thumbnail" @click="goDelete(imgList_bb[2].Id)" />
				</div>
				<div class="right-dd">
					<img v-if="imgList_bb[3].Thumbnail" :src="imgUrl + imgList_bb[3].Thumbnail" @click="goDelete(imgList_bb[3].Id)" />
				</div>
			</div>
		</div>
		<!-- 3 -->
		<div class="main">
			<div class="left">
				<p>{{twoList[2].TypeName}}</p>
				<div>{{twoList[2].Des}}</div>
			</div>
			<div class="right">
				<div class="right-init">
					<img v-if="imgList_cc[0].Thumbnail" :src="imgUrl + imgList_cc[0].Thumbnail" @click="goDelete(imgList_cc[0].Id)" />
				</div>
			</div>
		</div>
		<!-- 4 -->
		<div class="main">
			<div class="left">
				<p>{{twoList[3].TypeName}}</p>
				<div>{{twoList[3].Des}}</div>
			</div>
			<div class="right">
				<div class="right-aa">
					<img v-if="imgList_dd[0].Thumbnail" :src="imgUrl + imgList_dd[0].Thumbnail" @click="goDelete(imgList_dd[0].Id)" />
				</div>
				<div class="right-bb">
					<img v-if="imgList_dd[1].Thumbnail" :src="imgUrl + imgList_dd[1].Thumbnail" @click="goDelete(imgList_dd[1].Id)" />
				</div>
				<div class="right-ee">
					<img v-if="imgList_dd[2].Thumbnail" :src="imgUrl + imgList_dd[2].Thumbnail" @click="goDelete(imgList_dd[2].Id)" />
				</div>
				<div class="right-ee">
					<img v-if="imgList_dd[3].Thumbnail" :src="imgUrl + imgList_dd[3].Thumbnail" @click="goDelete(imgList_dd[3].Id)" />
				</div>
				<div class="right-ee">
					<img v-if="imgList_dd[4].Thumbnail" :src="imgUrl + imgList_dd[4].Thumbnail" @click="goDelete(imgList_dd[4].Id)" />
				</div>
			</div>
		</div>
		<!-- 5-->
		<div class="main">
			<div class="left">
				<p>{{twoList[4].TypeName}}</p>
				<div>{{twoList[4].Des}}</div>
			</div>
			<div class="right">
				<div class="right-init">
					<img v-if="imgList_ee[0].Thumbnail" :src="imgUrl + imgList_ee[0].Thumbnail" @click="goDelete(imgList_ee[0].Id)" />
				</div>
			</div>
		</div>
		<!-- 6 -->
		<!-- <div class="main">
			<div class="left">
				<p>雪峰湖地质公园</p>
				<div>
					雪峰湖地质公园雪峰湖地质公园雪峰湖地质公园
					雪峰湖地质公园雪峰湖地质公园雪峰湖地质公园
				</div>
			</div>
			<div class="right">
				<div class="right-aa">
					<img src="../assets/img/hn_14.jpg"/>
				</div>
				<div class="right-bb">
					<img src="../assets/img/hn_15.jpg"/>
				</div>
				<div class="right-ee">
					<img src="../assets/img/hn_16.jpg"/>
				</div>
				<div class="right-ee">
					<img src="../assets/img/hn_17.jpg"/>
				</div>
				<div class="right-ee">
					<img src="../assets/img/hn_18.jpg"/>
				</div>
			</div>
		</div> -->
		<!-- 7-->
		<!-- <div class="main">
			<div class="left">
				<p>雪峰湖地质公园</p>
				<div>
					雪峰湖地质公园雪峰湖地质公园雪峰湖地质公园
					雪峰湖地质公园雪峰湖地质公园雪峰湖地质公园
				</div>
			</div>
			<div class="right">
				<img src="../assets/img/hn_19.jpg"/>
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
				typeList: [],
				twoList: [{}, {}, {}, {}, {}],
				imgList_aa: [{}],
				imgList_bb: [{},{},{},{}],
				imgList_cc: [{}],
				imgList_dd: [{},{},{},{},{}],
				imgList_ee: [{}]
			}
		},
		methods: {
			// 地质公园分类页
			scrollBy(n){
				this.app_this.$router.push({name: "especially", query:{n: n}})
			},
			// 跳转到图片详情
			goDelete(id){
				this.app_this.$router.push({name: "details", query: {picId: id}})
			},
			// 请求分类接口
			cplist(type) {
				helper.getAjax("tuku/pictype", res => {
					// console.log(res)
					if (res.code == 200) {
						if (type == 0) {
							this.typeList = res.data.Typelist
							this.cplist(this.typeList[0].Id)
						} else {
							this.twoList = res.data.Typelist
							// console.log(this.typeList)
							// console.log(this.twoList)
							for (let i = 0, len = this.twoList.length; i < len; i++) {
								this.cplist_img(this.twoList[i].Id, i)
								
							}
						}
					}
					if (res.code == 410) {
						localStorage.removeItem('$tk_userinfo')
					}
				}, {
					ParentId: type
				}, "post")
			},
			cplist_img(type, index) {
				helper.getAjax("tuku/seachpicbytype", res => {
					// console.log(res)
					if (res.code == 200) {
						switch (index) {
							case 0:
								this.imgList_aa = res.data.baseinfo
								break;
							case 1:
								this.imgList_bb = res.data.baseinfo
								break;
							case 2:
								this.imgList_cc = res.data.baseinfo
								break;
							case 3:
								this.imgList_dd = res.data.baseinfo
								break;
							case 4:
								this.imgList_ee = res.data.baseinfo
						}

					}
					if (res.code == 410) {
						localStorage.removeItem('$tk_userinfo')
					}
				}, {
					ParentId: type,
					page: 1,
					rows: 5
				}, "post")
			}
		},
		created() {
			this.cplist(0)
		},
		props: {
			app_this: {default: 'detailsApp', required: true} 
		}
	}
</script>

<style scoped>
	.top {
		position: relative;
		overflow: hidden;
	}

	.top-img {
		height: 800px;
		min-width: 100%;
	}

	.top-list {
		position: absolute;
		top: 0;
		left: 0;
	}

	.top-list li {
		width: 200px;
		height: 130px;
		padding-top: 20px;
		background: rgba(0, 0, 0, 0.6);
		margin-bottom: 10px;
		color: #ccc;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}

	.details-img {
		width: 90px;
		height: 60px;
		overflow: hidden;
		margin: 0 auto;
	}

	.details-img img {
		height: 100%;
		min-width: 100%;
	}

	.top-border {
		border-top: 1px solid #666;
		width: 90px;
		margin: 16px auto 0;
	}

	.main {
		width: 100%;
		min-width: 800px;
		height: 600px;
		overflow: hidden;
		display: flex;
	}

	.left {
		width: 30%;
		min-width: 400px;
		background: rgba(0, 0, 0, 0.9);
		color: #ccc;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.left p {
		color: #eee;
		font-size: 20px;
		margin-bottom: 16px;
	}

	.left div {
		width: 280px;
		line-height: 24px;
	}

	.right {
		flex: 1;
		overflow: hidden;
	}
	.right-init {
		width: 100%;
		height: 100%;
	}
	.right div {
		background: url(../assets/img/loading.gif)no-repeat center;
		background-size: a 10%;
	}

	.right img {
		height: 100%;
		min-width: 100%;
	}

	.right div {
		float: left;
		overflow: hidden;
	}

	.right-aa {
		height: 350px;
		width: 45%;
	}

	.right-bb {
		width: 55%;
		height: 350px;
	}

	.right-cc {
		width: 60%;
		height: 250px;
	}

	.right-dd {
		width: 40%;
		height: 250px;
	}

	.right-ee {
		height: 250px;
		width: 33.333%;
	}
</style>
