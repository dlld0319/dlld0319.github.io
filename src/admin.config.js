export default {
	login: {
		url: '/uni_modules/uni-id-pages/pages/login/login-withpwd' // 登录页面路径
	},
	index: {
		url: '/pages/index/index' // 登录后跳转的第一个页面
	},
	error: {
		url: '/pages/error/404' // 404 Not Found 错误页面路径
	},
	navBar: { // 顶部导航
		logo: '/static/logo.png', // 左侧 Logo
		langs: [{
			text: '中文简体',
			lang: 'zh-Hans'
		}, {
			text: '中文繁體',
			lang: 'zh-Hant'
		}, {
			text: 'English',
			lang: 'en'
		}],
		themes: [{
			text: '默认',
			value: 'default'
		}, {
			text: '绿柔',
			value: 'green'
		}],
		debug: {
			enable: process.env.NODE_ENV !== 'production', //是否显示错误信息
			engine: [{ // 搜索引擎配置（每条错误信息后，会自动生成搜索链接，点击后跳转至搜索引擎）
				name: '百度',
				url: 'https://www.baidu.com/baidu?wd=ERR_MSG'
			}, {
				name: '谷歌',
				url: 'https://www.google.com/search?q=ERR_MSG'
			}]
		}
	},
	sideBar: { // 左侧菜单
		// 配置静态菜单列表（放置在用户被授权的菜单列表下边）
		staticMenu: [{
			menu_id: "demo",
			text: '页面',
			icon: 'admin-icons-kaifashili',
			url: "",
			children: [{
					menu_id: "icons",
					text: '文章',
					icon: 'admin-icons-icon',
					value: '/pages/index/index',
				}, {
					menu_id: "table",
					text: '分类',
					icon: 'admin-icons-table',
					value: '/pages/categorys/categorys'
				},
				{
					menu_id: "icons",
					text: '说说',
					icon: 'admin-icons-icon',
					value: '/pages/saysomthing/saysomthing',
				}
			]
		}, {
			menu_id: "admim-doc-pulgin",
			text: '管理员',
			icon: 'admin-icons-eco',
			url: "",
			children: [{
				menu_id: "admin-doc",
				icon: 'admin-icons-doc',
				text: '文章',
				value: '/pages/admin/articles/articles'
			}, {
				menu_id: "stat-doc",
				icon: 'admin-icons-help',
				text: '分类',
				value: '/pages/admin/categorys/categorys'
			}, {
				menu_id: "admin-pulgin",
				icon: 'admin-icons-pulgin',
				text: '说说',
				value: '/pages/admin/daily/daily'
			}]
		}],
		staticMenu2: [{
			menu_id: "demo",
			text: '功能',
			icon: 'admin-icons-kaifashili',
			url: "",
			children: [{
					menu_id: "icons",
					text: '文章',
					icon: 'admin-icons-icon',
					value: '/pages/index/index',
				}, {
					menu_id: "table",
					text: '分类',
					icon: 'admin-icons-table',
					value: '/pages/categorys/categorys'
				},
				{
					menu_id: "icons",
					text: '说说',
					icon: 'admin-icons-icon',
					value: '/pages/saysomthing/saysomthing',
				}
			]
		}]
	},
	uniStat: {

	}
}
