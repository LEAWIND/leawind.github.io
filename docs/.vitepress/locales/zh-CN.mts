import { buildSidebar } from "../builders.mts";

export default {
	label: '简体中文',
	lang: 'zh-CN',
	title: "Leawind的文档",
	titleTemplate: ":title | Leawind的文档",
	description: "用 vitepress 构建的静态网站",
	themeConfig: {
		nav: [
			{
				text: '🌐项目',
				items: [
					{ text: "Leawind的第三人称", link: 'https://leawind.github.io/Third-Person/zh-CN/' },
					{ text: 'MCAFS', link: '/zh-CN/mcafs/' },
				]
			},
			{ text: '笔记', link: '/zh-CN/Notes/' },
			{ text: '杂项', link: '/zh-CN/misc/' },
			{ text: '💰捐赠', link: '/zh-CN/donate' },
		],
		sidebar: {
			'/zh-CN/Notes': buildSidebar('/zh-CN/Notes', '笔记'),
			'/zh-CN/misc': buildSidebar('/zh-CN/misc', '杂项'),
		},
		footer: {
			message: '<a href=/zh-CN/donate>💰捐赠</a> <br> 本文档使用 <a href=https://vitepress.dev>vitepress</a> 构建',
			copyright: 'Copyright © 2024 Leawind',
		},
		editLink: {
			pattern: 'https://github.com/LEAWIND/leawind.github.io/edit/main/docs/:path',
			text: '在 Github 上编辑此页',
		},
		lastUpdated: { text: "上次更新", },
	},
};
