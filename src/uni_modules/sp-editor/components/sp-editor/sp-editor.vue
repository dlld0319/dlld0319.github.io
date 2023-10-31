<template>
	<view class="wrapper">
		<PickerColor
			ref="colorPicker"
			:color="{ r: 0, g: 0, b: 0, a: 1 }"
			@confirm="confirmColor"
		></PickerColor>

		<view class="toolbar" @tap="format">
			<view
				:class="formats.bold ? 'ql-active' : ''"
				class="iconfont icon-zitijiacu"
				data-name="bold"
			></view>
			<view
				:class="formats.italic ? 'ql-active' : ''"
				class="iconfont icon-zitixieti"
				data-name="italic"
			></view>
			<view
				:class="formats.underline ? 'ql-active' : ''"
				class="iconfont icon-zitixiahuaxian"
				data-name="underline"
			></view>
			<view
				:class="formats.strike ? 'ql-active' : ''"
				class="iconfont icon-zitishanchuxian"
				data-name="strike"
			></view>
			<!-- #ifndef MP-BAIDU -->
			<view
				:class="formats.align === 'left' ? 'ql-active' : ''"
				class="iconfont icon-zuoduiqi"
				data-name="align"
				data-value="left"
			></view>
			<!-- #endif -->
			<view
				:class="formats.align === 'center' ? 'ql-active' : ''"
				class="iconfont icon-juzhongduiqi"
				data-name="align"
				data-value="center"
			></view>
			<view
				:class="formats.align === 'right' ? 'ql-active' : ''"
				class="iconfont icon-youduiqi"
				data-name="align"
				data-value="right"
			></view>
			<view
				:class="formats.align === 'justify' ? 'ql-active' : ''"
				class="iconfont icon-zuoyouduiqi"
				data-name="align"
				data-value="justify"
			></view>
			<!-- #ifndef MP-BAIDU -->
			<view
				:class="formats.lineHeight ? 'ql-active' : ''"
				class="iconfont icon-line-height"
				data-name="lineHeight"
				data-value="2"
			></view>
			<view
				:class="formats.letterSpacing ? 'ql-active' : ''"
				class="iconfont icon-Character-Spacing"
				data-name="letterSpacing"
				data-value="2em"
			></view>
			<view
				:class="formats.marginTop ? 'ql-active' : ''"
				class="iconfont icon-722bianjiqi_duanqianju"
				data-name="marginTop"
				data-value="20px"
			></view>
			<view
				:class="formats.marginBottom ? 'ql-active' : ''"
				class="iconfont icon-723bianjiqi_duanhouju"
				data-name="marginBottom"
				data-value="20px"
			></view>
			<!-- #endif -->

			<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>

			<!-- #ifndef MP-BAIDU -->
			<view
				:class="formats.fontFamily ? 'ql-active' : ''"
				class="iconfont icon-font"
				data-name="fontFamily"
				data-value="Pacifico"
			></view>
			<view
				:class="formats.fontSize === '24px' ? 'ql-active' : ''"
				class="iconfont icon-fontsize"
				data-name="fontSize"
				data-value="24px"
			></view>
			<!-- #endif -->
			<view
				:style="{ color: textColor }"
				class="iconfont icon-text_color"
				data-name="color"
				:data-value="textColor"
			></view>
			<view
				:style="{ color: backgroundColor }"
				class="iconfont icon-fontbgcolor"
				data-name="background-color"
				:data-value="backgroundColor"
			></view>
			<view class="iconfont icon-date" @tap="insertDate"></view>
			<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
			<view
				:class="formats.list === 'ordered' ? 'ql-active' : ''"
				class="iconfont icon-youxupailie"
				data-name="list"
				data-value="ordered"
			></view>
			<view
				:class="formats.list === 'bullet' ? 'ql-active' : ''"
				class="iconfont icon-wuxupailie"
				data-name="list"
				data-value="bullet"
			></view>

			<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
			<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
			<view class="iconfont icon-fengexian" @tap="insertDivider"></view>

			<view
				:class="formats.header === 1 ? 'ql-active' : ''"
				class="iconfont icon-format-header-1"
				data-name="header"
				:data-value="1"
			></view>
			<view
				:class="formats.script === 'sub' ? 'ql-active' : ''"
				class="iconfont icon-zitixiabiao"
				data-name="script"
				data-value="sub"
			></view>
			<view
				:class="formats.script === 'super' ? 'ql-active' : ''"
				class="iconfont icon-zitishangbiao"
				data-name="script"
				data-value="super"
			></view>

			<view
				:class="formats.direction === 'rtl' ? 'ql-active' : ''"
				class="iconfont icon-direction-rtl"
				data-name="direction"
				data-value="rtl"
			></view>

			<!-- <view class="iconfont icon-yinyong" @tap="insertTemplate"></view> -->

			<view class="iconfont icon-charutupian" @tap="insertImage"></view>
			<view class="iconfont icon-undo" @tap="undo"></view>
			<view class="iconfont icon-redo" @tap="redo"></view>
			<view class="iconfont icon-shanchu" @tap="clear"></view>
		</view>

		<view class="editor-wrapper">
			<editor
				id="editor"
				class="ql-container"
				show-img-size
				show-img-toolbar
				show-img-resize
				:placeholder="placeholder"
				:read-only="readOnly"
				@statuschange="onStatusChange"
				@ready="onEditorReady"
				@input="onEditorInput"
			></editor>
		</view>
	</view>
</template>

<script>
import PickerColor from './color-picker.vue'
export default {
	components: {
		PickerColor
	},
	props: {
		placeholder: {
			type: String,
			default: '写点什么吧 ~'
		},
		// 是否只读
		readOnly: {
			type: Boolean,
			default: false
		},
		// 最大字数限制，-1不限
		maxlength: {
			type: Number,
			default: -1
		},
		// 初始模板
		templates: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			formats: {},
			textColor: '',
			backgroundColor: '',
			curColor: 'text'
		}
	},
	onLoad() {
		// #ifndef MP-BAIDU
		uni.loadFontFace({
			family: 'Pacifico',
			source: 'url("https://sungd.github.io/Pacifico.ttf")'
		})
		// #endif
	},
	methods: {
		onEditorReady() {
			// #ifdef MP-BAIDU
			this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editor')
			// #endif

			// #ifdef APP-PLUS || MP-WEIXIN || H5
			uni
				.createSelectorQuery()
				.in(this)
				.select('#editor')
				.context((res) => {
					this.editorCtx = res.context
					// 启用preRender方法时会预先渲染templates内容，但是在小程序中会导致页面自动聚焦至富文本的区域
					if(this.templates) {
						this.preRender()
					}
				})
				.exec((result) => {})
			// #endif
		},
		preRender() {
			// 初始化富文本时自带的文字模板
			this.editorCtx.setContents({
				html: this.templates
			})
		},
		undo() {
			this.editorCtx.undo()
		},
		redo() {
			this.editorCtx.redo()
		},
		format(e) {
			let { name, value } = e.target.dataset
			if (!name) return
			console.log('==== name :', name)
			switch (name) {
				case 'color':
				case 'background-color':
					this.curColor = name
					this.showPicker()
					break
				default:
					this.editorCtx.format(name, value)
					break
			}
		},
		showPicker() {
			this.$refs.colorPicker.open()
		},
		confirmColor(e) {
			switch (this.curColor) {
				case 'color':
					this.textColor = e.hex
					this.editorCtx.format('color', e.hex)
					break
				case 'background-color':
					this.backgroundColor = e.hex
					this.editorCtx.format('background-color', e.hex)
					break
			}
		},
		onStatusChange(e) {
			this.formats = e.detail
			// console.log('==== e :', e, this.textColor)
		},
		insertDivider() {
			this.editorCtx.insertDivider({
				success: function () {
					// console.log('insert divider success')
				}
			})
		},
		clear() {
			uni.showModal({
				title: '清空编辑器',
				content: '确定清空编辑器吗？',
				success: (res) => {
					if (res.confirm) {
						this.editorCtx.clear({
							success: function (res) {
								console.log('clear success')
							}
						})
					}
				}
			})
		},
		removeFormat() {
			this.editorCtx.removeFormat()
		},
		insertDate() {
			const date = new Date()
			const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
			this.editorCtx.insertText({
				text: formatDate
			})
		},
		insertImage() {
			// #ifdef APP-PLUS || H5
			uni.chooseImage({
				// count: 1, // 默认9
				success: (res) => {
					const { tempFiles } = res
					/**
					 * 使用uniCloud.uploadFile进行云存储时，需要开启$emit('upinImage')事件，
					 * 再注释掉insertImage，否则在富文本中插入的图片都是本地路径。
					 * 一般可能需要在传给父组件的upinImage事件中，先遍历tempFiles，
					 * 再用uploadFile拿到云存储的图片路径，
					 * 最后将该路径insertImage到src属性中。
					 * 这一过程等于是将下方注释掉的this.editorCtx.insertImage方法移到父组件中，
					 * 由使用者在父组件中使用子传父的upinImage方法中的editorCtx参数，手动调用editorCtx.insertImage操作
					 */
					this.$emit('upinImage', tempFiles, this.editorCtx)
					/* this.editorCtx.insertImage({
						src: tempFiles[0].path,
						width: '80%',
						success: function () {}
					}) */
				},
				fail() {
					uni.showToast({
						title: '未授权访问相册权限，请授权后使用',
						icon: 'none'
					})
				}
			})
			// #endif

			// #ifdef MP-WEIXIN
			// 微信小程序从基础库 2.21.0 开始， wx.chooseImage 停止维护，请使用 uni.chooseMedia 代替。
			uni.chooseMedia({
				// count: 1, // 默认9
				success: (res) => {
					// 同上chooseImage处理
					const { tempFiles } = res
					this.$emit('upinImage', tempFiles, this.editorCtx)
				},
				fail() {
					uni.showToast({
						title: '未授权访问相册权限，请授权后使用',
						icon: 'none'
					})
				}
			})
			// #endif
		},
		onEditorInput(e) {
			let maxlength = parseInt(this.maxlength)

			this.editorCtx.getContents({
				success: (res) => {
					let { html, text } = res
					let textStr = text.replace(/\s/g, '')

					if (textStr.length > maxlength && maxlength != -1) {
						uni.showModal({
							content: `超过${maxlength}字数啦~`,
							confirmText: '确定',
							showCancel: false,
							success: ({ confirm, cancel }) => {}
						})
					} else {
						this.$emit('input', { html, text })
					}
				}
			})
		},
		/**
		 * 内嵌模板-弃用
		 */
		insertTemplate() {
			let temp = '<div>内嵌模板</div>'
			this.editorCtx.setContents({
				html: temp
			})
		}
	}
}
</script>

<style scoped>
@import './editor-icon.css';

.wrapper {
	height: 100%;
}

.iconfont {
	display: inline-block;
	padding: 16rpx 16rpx;
	width: 46rpx;
	height: 46rpx;
	cursor: pointer;
	font-size: 20px;
}

.toolbar {
	height: 326rpx;
	box-sizing: border-box;
	padding-bottom: 12rpx;
	border-bottom: 1px solid #e4e4e4;
	font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}

.editor-wrapper {
	height: calc(100% - 326rpx);
}

.ql-container {
	padding: 8rpx 16rpx;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	font-size: 16px;
	line-height: 1.5;
}

/deep/ .ql-editor.ql-blank::before {
	font-style: normal;
	color: #cccccc;
}

.ql-active {
	color: #66ccff;
}
</style>
