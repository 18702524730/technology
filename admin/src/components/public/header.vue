<template>
  <div class="pub_header">
    <a-progress class="progress_wrap" v-if="percent" :class="{'progress_hide': percent == 100}" :percent="percent" :strokeWidth="4" :width="100" :showInfo="false"  />
    <div class="nav_top_wrap">
			<div class="logo_box">
				<img src="~assets/img/icon/red_logo.png" class="logo" alt="">
				<span class="l_name">江干科创云管理平台</span>
				<!-- <span class="l_name" v-if="isSuper" v-else>{{ streetName }}企业库</span> -->
			</div>
			<div class="top_nav">
				<div class="nav_list">
					<span class="item" v-for="(route, idx) in menusData" :key="idx" :class="{'active': route.active}" @click="changeMenuFn(route, idx)">{{ route.name }}</span>
				</div>
				<div class="u_info">
					<div class="img_box">
						<img src="~assets/img/icon/user_logo.png" alt="">
					</div>
					<p class="u_name" >{{ streetName }}</p>
					<a-popconfirm title="你确定要退出该平台吗?" placement="bottomRight" @confirm="confirm" @cancel="cancel" okText="确定" cancelText="取消">
				    <a-icon type="logout" class="logout" />
				  </a-popconfirm>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import store from '@/store'
export default {
  props: {
    // streetName: String
  },
  data () {
    return {
      menusData: [],  //一级路由
      cMenusData: [],
      theRoute: {},
      streetName: '',  //街道名
      isSuper: 1,  //默认管理员
    }
  },
  computed: {
    percent: function(){
      return this.$store.state.progress.percent
    }
  },
  mounted () {
    this.animationFn();
    this.isSuper = this.$storage.get('isSuper');
    this.streetName = this.$storage.get('streetName');
    this.initRouters();  //初始化路由
    this.updateCurMenuFn();  //高亮当前路由
  },
  methods: {
    animationFn () {
      let self = this;
      let percent_ = self.percent;
      store.commit('SET_COMPLETE', false);
    	store.commit('SET_PERCENT', 2);
      function step() {
        if (percent_ < 90) {
        	if (self.$store.state.progress.isComplete) {
        		return;
        	}
          percent_ +=2;
          store.commit('SET_PERCENT', percent_)
          window.requestAnimationFrame(step);
        }
      }
      window.requestAnimationFrame(step);
    },
    changeMenuFn (data, idx) {
      // this.initSecondRouter(data.path);
      this.$router.push({path: data.access});
    },
    async confirm () {
      try {
        let resp = await this.API.login.logOut();
        this.$router.push({path: '/login'})
      }
      catch (e){}
    },
    cancel () {
      this.$message.error('取消退出登录')
    },
    // 初始化路由
    initRouters () {
      let routes = this.$router.options.routes;
      let arrOne = [];
      let type = this.$storage.get('isSuper'); //1.管理员 0.街道
      routes.forEach( item => {
        if (!item.hidden) {
          if(item.meta.permission && item.meta.permission.length && item.meta.permission.includes(type)){
            arrOne.push({
              name: item.meta.name,
              path: item.path,
              access: item.path,
              children: item.children,
              active: false
            })
          }
        }
      })
      this.menusData = arrOne;
      this.initSecondRouter();
    },
    // 初始化二级路由
    initSecondRouter (path) {
      let path_ = path || this.$route.matched[0].path;
      let arrTwo = [];
      let type = this.$storage.get('isSuper'); //1.管理员 0.街道
      this.menusData.forEach( item => {
        if (item.path === path_) {
          if (item.children && item.children.length) {
            item.children.forEach( (info) => {
              if (!info.hidden) {
                if(info.meta.permission && info.meta.permission.length && info.meta.permission.includes(type)){
                  arrTwo.push({
                    name: info.meta.name,
                    icon: info.meta.icon,
                    standard: info.meta.standard ? info.meta.standard : '', //判定标准
                    path: info.name,
                    access: item.path +'/' + info.path,
                    children: info.children,
                    active: false
                  })
                }
              }
            })
          }
        }
      })
      this.cMenusData = arrTwo;
      this.$emit('changeMenu', this.cMenusData);
    },
    updateCurMenuFn (route) {
      var route = route || this.$route;
      this.theRoute = route;
      this.matchRoute();  //匹配路由
    },
    // 匹配路由
    matchRoute () {
      // 一级路由
      this.menusData.forEach (item => {
        item.active =false;
        let arr = item.access.split('/');
        if (this.$route.fullPath === '/home/talentGeneral' || this.$route.fullPath.indexOf('/home/areaHundred') !== -1) {
          item.name === '创业人才库' ? item.active =true : '';
        } else if (this.theRoute.fullPath.split('/')[1] === arr[arr.length-1]) {
          item.active =true;
        }
      })
      // 二级路由
      this.cMenusData.forEach(info => {
        info.active =false;
        let arr = info.access.split('/');
        if (this.theRoute.path.split('/')[2] === arr[arr.length-1]) {
          info.active =true;
        }
      })
      this.$emit('changeMenu', this.cMenusData);
    },
  },
  watch: {
    $route(to, from) {
    	if (to.path !== from.path) {
	      this.animationFn();
	      this.updateCurMenuFn(to);
      }
    },
    percent (v) {
      if(v==100){
        setTimeout(function(){
        	store.commit('SET_COMPLETE', false);
          store.commit('SET_PERCENT', 0)
        },400)
      }
    }
  }
}
</script>

<style lang="scss">
  @keyframes fadeOut {
		from {
			opacity: 1;
			display: block;
		}
		to {
			opacity: 0;
			display: none;
		}
	}
  .pub_header {
    .progress_wrap {
			position: fixed; width: 100%; height: 2px; left: 0; top: -13px; z-index: 100;
		}
    .progress_hide {animation: fadeOut 0.4s linear; animation-fill-mode: forwards;}
    .nav_top_wrap {
      width: 100%; height: 50px; background: #222; position: relative;
      .logo_box {
        width: 200px; height: 50px; padding-top: 6px; border-bottom: 1px solid #303034; background: #222; position: absolute; left: 0;
        .logo {width: 28px; height: 36px; margin-left: 20px; vertical-align: middle;}
        .l_name {color: #fff; font-size: 14px; margin-left: 10px; vertical-align: middle;}
      }
      .top_nav {
        height: 50px; line-height: 50px; background: #222;  position: absolute; left: 200px; right: 0;
        .nav_list {
          height: 100%; float: left;
          .item {
            color: #fff; font-size: 14px; padding: 0 20px; line-height: 50px; opacity: 0.5; display: inline-block; cursor: pointer;
            &:hover {opacity: 1;}
          }
          .active {opacity: 1; border-bottom: 2px solid #3576FF; height: 50px;}
        }
        .u_info {
          float: right; margin-right: 25px;
          .img_box {
            width: 38px; height: 38px; line-height: 38px; border-radius: 50%; overflow: hidden; float: left; margin-top: 5px; background: #eee; text-align: center;
            img {width: 100%; height: 100%;}
          }
          .u_name {color: #fff; font-size: 14px; margin-left: 10px; float: left; margin: 0 10px 0 10px;}
          .logout {
            cursor: pointer; font-size: 15px; color:#fff;
            &:hover {color: #fff;}
          }
        }
      }
    }
  }
</style>
