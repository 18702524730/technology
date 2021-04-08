const technologyH5 = () => import(/* webpackChunkName: "group-ipSurvey" */ '../pages/home/technologyH5.vue')
const ipSurvey = () => import(/* webpackChunkName: "group-ipSurvey" */ '../pages/ipSurvey/ipSurvey.vue')
const helpStation = () => import(/* webpackChunkName: "group-helpStation" */ '../pages/helpStation/helpStation.vue')
const contactUs = () => import(/* webpackChunkName: "group-contactUs" */ '../pages/contactUs/contactUs.vue')
const techGroup = () => import(/* webpackChunkName: "group-contactUs" */ '../pages/techGroup/techGroup.vue')
const groupOne = [
  {
    path: '/technologyH5',
    name: 'technologyH5',
    meta: {
      title: '江干区企业项目申报培育库',
      source: '短信'
    },
    component: technologyH5
  },
  {
    path: '/ipSurvey',
    name: 'ipSurvey',
    meta: {
      title: 'IPO知产尽调'
    },
    component: ipSurvey
  },
  {
    path: '/helpStation',
    name: 'helpStation',
    meta: {
      title: '求助站'
    },
    component: helpStation
  },
  {
    path: '/contactUs',
    name: 'contactUs',
    meta: {
      title: '联系我们'
    },
    component: contactUs
  },
  {
    path: '/techGroup',
    name: 'techGroup',
    meta: {
      title: '江干区科技群'
    },
    component: techGroup
  },
]

// 完善企业数据
const makeAllPerfect = () => import(/* webpackChunkName: "group-my" */ '../pages/my/makeAllPerfect.vue')
const makeProjectPerfect = () => import(/* webpackChunkName: "group-my" */ '../pages/my/makeProjectPerfect.vue')
// 数据完善预览
const makeAllPerfectPreview = () => import(/* webpackChunkName: "group-my" */ '../pages/my/makeAllPerfectPreview.vue')
const edit = () => import(/* webpackChunkName: "group-my" */ '../pages/my/edit.vue')
// const stepOne = () => import(/* webpackChunkName: "group-my" */ '../pages/my/stepOne.vue')
const stepTwo = () => import(/* webpackChunkName: "group-my" */ '../pages/my/stepTwo.vue')
const stepThree = () => import(/* webpackChunkName: "group-my" */ '../pages/my/stepThree.vue')
// const assessResult = () => import(/* webpackChunkName: "group-my" */ '../pages/my/assessResult.vue')
const groupTwo = [
  {
    path: '/makeAllPerfect',
    name: 'makeAllPerfect',
    meta: {
      title: '完善企业数据'
    },
    component: makeAllPerfect
  },
  {
    path: '/makeProjectPerfect',
    name: 'makeProjectPerfect',
    meta: {
      title: '项目数据完善'
    },
    component: makeProjectPerfect
  },
  {
    path: '/makeAllPerfectPreview',
    name: 'makeAllPerfectPreview',
    meta: {
      title: '企业信息'
    },
    component: makeAllPerfectPreview
  },
  {
    path: '/edit',
    name: 'companyInfoEdit',
    meta: {
      title: '科技项目政策智能匹配'
    },
    component: edit
  },
  {
    path: '/stepTwo',
    name: 'stepTwo',
    meta: {
      title: '科技项目政策智能匹配'
    },
    component: stepTwo
  },
  {
    path: '/stepThree',
    name: 'stepThree',
    meta: {
      title: '科技项目政策智能匹配'
    },
    component: stepThree
  },
]

let routes = [
  // ...groupZero,
  ...groupOne,
  ...groupTwo,
];

//export default routes;
export { routes };
