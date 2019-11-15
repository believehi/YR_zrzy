import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import waterfall from 'vue-waterfall2'

// 图片放大预览
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});

// const routerPush = router.prototype.push
// router.prototype.push = function push(location) {
// 	return routerPush.call(this, location).catch(error=> error)
// }

Vue.prototype.$http = axios
Vue.use(waterfall)
Vue.use(ElementUI)

Vue.directive('focus', {
    inserted: function (el) {
      el.focus()
    }
})

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
