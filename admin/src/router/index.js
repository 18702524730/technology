
// 登录
const Login = () => import(/* webpackChunkName: "group-main" */ '../pages/login/login')
// 首页
const Index = () => import(/* webpackChunkName: "group-main" */ '../pages/index/index')
// 知识产权
const IPGeneral = () => import(/* webpackChunkName: "group-main" */ '../pages/IPGeneral/IPGeneral')

import home from './home.js'  //培育库
import reserve from './reserve.js'  //储备库

let routes = [
  {
		path: '/',
		redirect: '/login',
		hidden: true,
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		hidden: true,
	},
	{
		path: '/index',
		name: 'index',
		component: Index,
		meta:{
			name: '首页',
			permission: [0, 1],  //1是超级管理员,0街道
		},
	},
	home,
	reserve,
	{
		path: '/talentGeneral',
		name: 'talentGeneral',
		redirect: '/home/talentGeneral',
		meta:{
			name: '创业人才库',
			permission: [1],  //1是超级管理员,0街道
		},
	},
	{
		path: '/IPGeneral',
		name: 'IPGeneral',
		component: IPGeneral,
		meta:{
			name: '知识产权',
			permission: [0, 1],  //1是超级管理员,0街道
		},
	},
]

export {
	routes
}
