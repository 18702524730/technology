// home
const Home = () => import(/* webpackChunkName: "group-main" */ '../pages/home')
// 概况
const General = () => import(/* webpackChunkName: "group-main" */ '../pages/general/general')
const TalentGeneralNew = () => import(/* webpackChunkName: "group-main" */ '../pages/general/talentGeneralNew')
const Content = () => import(/* webpackChunkName: "group-nationalTech" */ '../pages/content')
// 列表
const techList = () => import(/* webpackChunkName: "group-nationalTech" */ '../pages/home/list')
// 江干区百人计划列表
const areaHundredList = () => import(/* webpackChunkName: "group-nationalTech" */ '../pages/home/areaHundredList')
// 通用详情
const nationalTechDetail = () => import(/* webpackChunkName: "group-nationalTech" */ '../pages/home/detail')
// 江干区百人计划详情
const areaHundredDetail = () => import(/* webpackChunkName: "group-nationalTech" */ '../pages/home/areaHundredDetail')
// 国高
const nationalTech = () => import(/* webpackChunkName: "group-nationalTech" */ '../pages/home/nationalTech')
// 其它项目
const otherTech = () => import(/* webpackChunkName: "group-nationalTech" */ '../pages/home/otherTech')
import projectLists from 'utils/projectLists'
const sortList = [11, 2, 1, 9, 10, 6, 4, 5, 3, 8, 7, 12]; // id对应项目可参看接口文档
const otherProjectArr = sortList.map((item) => {
	let it = projectLists[item-1];
	let path = it.path;
	return {
    path,
    meta:{
      name: it.name,
      icon: it.icon || 'icon-tongjijuicon_guogao',
      permission: it.permission || [0, 1],
      standard: it.standard
    },
    component: Content,
    redirect: `/home/${path}/list`,
    children: [
      //{path, name: path, component: item === 11 ? nationalTech : otherTech, meta:{id: item}},
      {path: 'list', name: path + 'List', component: techList}, // 同国家高新
      {path: 'detail', name: path + 'Detail', component: nationalTechDetail}, // 同国家高新
    ]
  }
})

export default {
  path: '/home',
  component: Home,
  redirect: '/home/general',
  meta:{
    name: '科技企业库',
    permission: [0, 1],  //1是超级管理员,0街道
  },
  children: [
    {
      path: 'general',
      component: General,
      meta:{
        name: '统计概况',
        icon: 'icon-tongjijuicon_gaikuang',
        permission: [0, 1],  //1是超级管理员,0街道
      }
    },
    {
      path: 'list',
      hidden: true,
      meta:{
        name: '培育库通用列表页',
        icon: 'icon-tongjijuicon_gaikuang',
        permission: [0, 1],  //1是超级管理员,0街道
      },
      component: Content,
      redirect: '/home/list/list',
      children: [
        {path: 'list', name: 'generalHList', component: techList},
        {path: 'detail', name: 'generalHDetail', component: nationalTechDetail},
      ]
    },
    ...otherProjectArr,
    {
      path: 'talentGeneral',
      meta:{
        name: '统计概况',
        icon: 'icon-tongjijuicon_gaikuang',
        permission: [1],  //1是超级管理员,0街道
      },
      component: TalentGeneralNew,
      // redirect: '/home/talentGeneral/general',
      // children: [
      //   {path: 'general', name: 'talentGeneral', component: TalentGeneral},
      // ]
    },
    {
      path: 'areaHundred',
      meta:{
        name: '江干百人计划',
        icon: 'icon-bairen',
        permission: [1],  //1是超级管理员,0街道
      },
      component: Content,
      redirect: '/home/areaHundred/list',
      children: [
        {path: 'list', name: 'areaHundred', component: areaHundredList},
        {path: 'detail', name: 'areaHundred', component: areaHundredDetail},
      ]
    },
  ]
}
