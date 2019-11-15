<template>
	<div id="app">
		<router-view :tk_this="tk_this"></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tk_this: this,
			}
		},
		methods: {
			startHacking() {
				this.$notify({
					title: 'It works!',
					type: 'success',
					message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
					duration: 5000
				})
			}
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
		font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	}
	html {min-width: 900px;color: #333;}
	ul {list-style: none}
	a {text-decoration: none;}
	img {vertical-align: top;border: none}
	
	/* 通用分页器样式 */
	.newsPage {
		text-align: center;
		margin: 40px 0;
	}

	.el-pagination.is-background .el-pager li:not(.disabled).active {
		background-color: #00CE7C;
	}

	.el-pagination.is-background .el-pager li:not(.disabled):hover {
		color: #00CE7C;
	}

	.el-pagination.is-background .el-pager li:not(.disabled).active:hover {
		color: #fff;
	}

	/* 搜索 分类图片类型 选择 */
	.el-checkbox__input.is-checked+.el-checkbox__label {
		color: #00CE7C;
	}

	.content .el-checkbox__input.is-checked .el-checkbox__inner,
	.content .el-checkbox__input.is-indeterminate .el-checkbox__inner {
		background-color: #00CE7C;
		border-color: #00CE7C;
	}

	.el-checkbox__input:hover,
	.el-checkbox__input.is-focus .el-checkbox__inner {
		border-color: #00CE7C;
	}

	/* 登录 共用样式 */
	.el-tabs__item {
		font-size: 16px;
	}
	.el-tabs__item.is-active,
	.el-tabs__item:active,
	.el-tabs__item:hover {
		color: #00CE7C;
	}
	.el-tabs__active-bar{
		background: #00CE7C;
	}
	.zc-code .el-input__inner {
		padding-right: 150px;
	}
	/* 购物车 供稿 收藏 选项 */
	.el-radio-button__inner:hover,
	.el-radio-button__orig-radio:checked+.el-radio-button__inner {
		color: #00CE7C;
		background-color: #fff;
		border-color: #00CE7C;
		box-shadow: -1px 0 0 0 #00CE7C;border-radius: 4px;
	}
	.el-radio-button__inner:hover {
		color: #00CE7C;
	}
	.el-radio-button {margin-bottom: 20px;margin-right: 20px;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;noneuser-select:none;}

	/* 按钮 */
	.el-button--success:active,
	.el-button--success:hover,
	.el-button--success {
		background-color: #00CE7C!important;
		border-color: #00CE7C;
	}
	.el-button {
		/* border-color: #00CE7C; */
		/* color: #00CE7C; */
	}
	/* 上传 */
	.el-upload,
	.el-upload-dragger {width: 100%;height: 300px;background: #eee;}
	.upload-right .el-upload,
	.source-upload .el-upload {height: auto;}
	
	/* 上传进度条 */
	.el-step__title {font-size: 20px; font-weight: 500!important;}
	.el-upload-dragger:hover {border-color: #00CE7C;}
	.el-step__title.is-success {margin: 30px 0 0 -30px; color: #00CE7C;}
	.el-step__title.is-process {margin: 30px 0 0 -20px;}
	.el-step__title.is-wait {margin: 30px 0 0 -20px;}
	.el-step__head.is-success {color: #00CE7C;border-color:#00CE7C}

	.el-textarea__inner:focus,
	.el-select .el-input__inner:focus,
	.el-input__inner:focus {
		border: 1px solid #00CE7C;
	}
	.el-select .el-input.is-focus .el-input__inner{border-color: #00CE7C;}
	
	/* 单选框样式 */
	.el-radio__input.is-checked+.el-radio__label{
		color: #00CE7C;
	}
	.el-radio__input.is-checked .el-radio__inner{
		background: #00CE7C;
		border-color: #00CE7C;
	}
	.el-select-dropdown__item.selected {color: #00CE7C;}
	
	.el-loading-mask {position: fixed;}
	.el-loading-spinner .el-loading-text {color: #333; font-size: 20px;}
	.el-loading-spinner i {color: #333; font-size: 60px;}
	
	.el-upload-list{display: none;}
	
	.el-cascader .el-input .el-input__inner:focus, .el-cascader .el-input.is-focus .el-input__inner{border-color: #00CE7C;}
	.el-cascader-node.in-active-path, .el-cascader-node.is-active, .el-cascader-node.is-selectable.in-checked-path{color: #00CE7C;}
	/* 遮罩层 */
	.tk-top-back {
		position: fixed;
		/* z-index: 9999999999999; */
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0,0,0,0.4);
	}
	.tk-back-info {
		position: absolute;
		width: 300px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #fff;
		border-radius: 4px;
		padding: 10px 30px;
	}
	.add-coll .el-input {flex: 1;margin-right: 30px;}
	.add-coll .el-input__inner {
		border: transparent;
		border-bottom: 1px solid #DCDFE6;
	}
	
	/* 瀑布流样式 */

	.vue-waterfall {
		width: 80% !important;
		min-width: 800px;
		margin: 0 auto;
		height: auto !important;
		overflow: hidden;
		overflow-y: hidden!important;
	}

	.waterfall-footer {
		line-height: 100px;
		text-align: center;
		font-size: 20px;
		color: #666;
	}
	.vue-waterfall-column {
		padding-top: 10px;
	}

	.cell-item {
		position: relative;
		min-height: 60px;
		width: 90%;
		margin: 0 auto 18px;
		background: #ffffff;
		border: 6px solid #fff;
		border-radius: 4px;
		overflow: hidden;
		box-sizing: border-box;
		cursor: pointer;
		box-shadow: 0px 0px 10px #ABC;
	}
	.cell-item-shop {
		border-color: #fefefe;
		box-shadow: 0px 0px 10px #BCD;
	}

	.cell-item img {
		width: 100%;
		box-sizing: border-box;
		height: auto !important;
		border-radius: 2px;
		border: 2px solid #eee;
		display: block;
		opacity: 1;
	}
	.item-body {
		/* display: none; */
		position: absolute;
		width: 100%;
		background: rgba(0,0,0,0.3);
		padding: 0 10px;
		box-sizing: border-box;
		line-height: 30px;
	}
	.item-body_a {
		display: none;
		top: 0;
	}
	.item-body_b {
		display: none;
		bottom: 0;
		color: #fff;
		justify-content: space-between;
		align-items: center;
	}
	.item-desc {
		flex: 1;
		margin-right: 80px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.item-footer {
		border: 1px solid #fff;
		padding: 0 4px;
		border-radius: 2px;
		height: 20px;
		line-height: 20px;
	}
	.active {
		display: flex;
	}
	.no-works-appear {
		text-align: center;
		color: #999;
		line-height: 200px;
	}
	.works-appear {
		display: none;
	}
	
	/* 加载等待框 */
	
	.vue-loading {
		background: url(./assets/img/loading.gif) no-repeat center;
		background-size: 50px 50px;
	}
	img{
		cursor: pointer;
	}

</style>
