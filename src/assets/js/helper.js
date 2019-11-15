import axios from 'axios';

// const webUrl = "http://zrzy.02.t1m.cn/yiru/zrzy/"

const helper = {
	webUrl: "http://zrzy.02.t1m.cn/yiru/zrzy/",
	imgUrl: "http://zrzyfile.02.t1m.cn",
	// 请求
	getAjax: function(path, callback, dataitem, modth, mask) {
		// path地址 callback回调 dataitem（data参数） mask加载中 modth请求方式
		// console.log(helper.PostData(dataitem).data)
		axios({
			method: modth || 'get',
			baseURL: helper.webUrl,
			url: path,
			timeout: 10000,
			responseType: 'json',
			data: helper.PostData(dataitem)
		}).then(function(res) {
			if (res.status == 200) {

				return callback(res.data)
			}
		}).catch(function(err) {
			console.log(err)
		})
	},
	getAjaxPic: function(path, callback, dataitem, modth, mask) {
	  // path地址 callback回调 dataitem（data参数） mask加载中 modth请求方式
	  // console.log(helper.PostData(dataitem).data)
	  axios({
	   method: modth || 'get',
	   baseURL: helper.webUrl,
	   url: path,
	   timeout: 10000,
	   responseType: 'document',
	   data: helper.PostData(dataitem),
	   headers:{
	    'content-disposition':'attachment'
	   }
	  }).then(function(res) {
	   if(res.status == 200) {
	    
	    return callback(res.data)
	   }
	  }).catch(function(err) {
	   console.log(err)
	  })
	 },
	// 判断手机号码是否正确
	checkPhone: function(phone) {
		phone = phone || '';
		var reg = /^0?(13|15|18|16|14|17|19)[0-9]{9}$/;
		return (reg.test(phone));
	},
	//判断身份证号码是否正确
	checkCard: function(card) {
		card = card || '';
		var reg =
			/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		return (reg.test(card));
	},
	// 邮箱验证
	checkEmail: function(email) {
		email = email || '';
		var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
		return (reg.test(email));
	},
	// 密码验证
	checkPassword: function(val) {
		val = val || '';
		// var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
		var reg = /^[0-9A-Za-z]{6,}$/;
		return (reg.test(val));
	},
	// 密码验证
	checkNumber: function(val) {
		val = val || '';
		var reg = /^[0-9]+$/;
		return (reg.test(val));
	},
	// 获取登录信息
	getuserinfo: function() {
		var stateText = localStorage.getItem('$tk_userinfo') || "{}";
		return JSON.parse(stateText);
	},
	// 缓存登录信息
	setuserinfo: function(state) {
		state = state || {};
		localStorage.setItem('$tk_userinfo', JSON.stringify(state));
	},
	// 对象转化string
	PostData: function(oldData) {
		var post = {};
		post.token = helper.getuserinfo().token || '';
		post.loginMark = helper.getuserinfo().loginMark || helper.MathRand(8);
		if (helper.isJsonFormat(oldData)) {
			post.data = JSON.stringify(oldData || {});
		} else {
			post.data = oldData;
		}
		return post;
	},
	isJsonFormat: function(str) {
		var obj = str;
		var xy = Object.prototype.toString.call(obj);
		if (xy == "[object Object]" || xy == "[object Array]") {
			return true;
		} else {
			return false;
		}
	},
	MathRand: function(len) {
		var Num = "";
		for (var i = 0; i < len; i++) {
			Num += Math.floor(Math.random() * 10);
		}
		Num += " "
		for (var i = 0; i < len; i++) {
			Num += Math.floor(Math.random() * 10);
		}
		return Num;
	}
}


export default helper
