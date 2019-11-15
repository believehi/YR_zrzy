import Vue from 'vue'
import VueRouter from 'vue-router'
import helper from './assets/js/helper.js';

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)
let v = new Vue();

import zrtk from "./template/zrtk"
import home from "./template/home"
import mylogin from "./template/mylogin"
import geopark from "./template/geopark"
import geology from "./template/geology"
import environment from "./template/environment"
import cameraman from "./template/cameraman"
import footer from "./template/footer"
import search from "./template/search"
import my from "./template/my"
import shop from "./template/shop"
import shopDraft from "./template/shopDraft"
import shopCollection from "./template/shopCollection"
import shopExamine from "./template/shopExamine"
import shopCar from "./template/shopCar"
import mySet from "./template/mySet"
import myModify from "./template/myModify"
import details from "./template/details"
import myUpload from "./template/myUpload"
import myUploadNext from "./template/myUploadNext"
import especially from "./template/especially"


const router = new VueRouter({
	routes: [{
			path: '/',
			redirect: '/zrtk'
		},
		{
			path: '/zrtk',
			component: zrtk,
			children: [{
					path: '/home',
					component: home
				},
				{
					path: '/geopark',
					component: geopark
				},
				{
					path: '/geology',
					component: geology
				},
				{
					path: '/environment',
					component: environment
				},
				{
					path: '/cameraman',
					component: cameraman,
					requireAuth: true,
					beforeEnter: (to, from, next) => {
						beforeEnter(to, from, next)
					}
				},
				{
					path: '/search',
					component: search
				},
				{
					path: '/my',
					component: my,
					children: [{
							path: '/mySet',
							component: mySet
						},
						{
							path: '/myModify',
							component: myModify
						}
					],
					redirect: '/mySet',
					requireAuth: true,
					beforeEnter: (to, from, next) => {
						beforeEnter(to, from, next)
					}
				},
				{
					path: '/shop',
					component: shop,
					children: [{
							path: '/shopDraft',
							component: shopDraft,
							requireAuth: true,
							beforeEnter: (to, from, next) => {
								beforeEnter(to, from, next)
							}
						},
						{
							path: '/shopCollection',
							component: shopCollection,
							requireAuth: true,
							beforeEnter: (to, from, next) => {
								beforeEnter(to, from, next)
							}
						},
						{
							path: '/shopExamine',
							component: shopExamine,
							requireAuth: true,
							beforeEnter: (to, from, next) => {
								beforeEnter(to, from, next)
							}
						},
						{
							path: '/shopCar',
							component: shopCar,
							requireAuth: true,
							beforeEnter: (to, from, next) => {
								beforeEnter(to, from, next)
							}
						}
					],
					redirect: '/shopCar',
					requireAuth: true,
					beforeEnter: (to, from, next) => {
						beforeEnter(to, from, next)
					}
				},
				{
					path: '/details',
					name: 'details',
					component: details
				},
				{
					path: '/myUpload',
					component: myUpload,
					requireAuth: true,
					beforeEnter: (to, from, next) => {
						beforeEnter(to, from, next)
					}
				},
				{
					path: '/myUploadNext',
					name: "myUploadNext",
					component: myUploadNext,
					requireAuth: true,
					beforeEnter: (to, from, next) => {
						beforeEnter(to, from, next)
					}
				},
				{
					path: '/especially',
					name: "especially",
					component: especially
				}
			],
			redirect: '/home'
		},
		{
			path: '/mylogin',
			component: mylogin
		},
	],
	linkActiveClass: 'nav-active',
	linkExactActiveClass: 'exact-active',
})

// 局部路由监听
const beforeEnter = (to, from, next) => {
	if (JSON.stringify(helper.getuserinfo()) == "{}") {
		v.$confirm('请先登录！', '提示', {
			confirmButtonText: '前往登陆',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			next({
				path: "/mylogin"
			})
		}).catch(() => {})
	} else {
		next()
	}
}

export default router
