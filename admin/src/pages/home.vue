<template>
  <div class="home_page">
		<pub-header @changeMenu="getSecondMenuFn" ></pub-header>
		<div class="content_center_wrap">
			<div class="nav_lef">
				<div class="nav_list" ref="elememt">
					<div class="item_wrap" v-for="(item, index) in cMenusData" :key="index">
						<div class="item_til" v-if="item.access==='/home/general'">高新项目</div>
						<div class="item_til" v-if="isSuper && item.access==='/home/talentGeneral'">人才项目</div>
						<div class="item" v-if="isSuper || item.name!=='江干百人计划'" :class="{'active': item.active}" @click="changeMenuFn(item)" @mouseover="itemHoverFn(item, index)" @mouseout="mouseoutFn" >
							<i class="icon iconfont" :class="item.icon"></i>
							<span class="nav_name">{{ item.name }}</span>
						</div>
					</div>
				</div>
				<div class="des_info" v-show="showHover && selectItem.standard" @mouseout="mouseoutFn" :style="'top:'+offTop">
					<p class="title">{{ selectItem.name }}判定标准：</p>
					<div v-html="selectItem.standard"></div>
				</div>
				<!-- <div class="info_box">
					<div class="phone"><img src="~assets/img/icon/phone.png" alt=""></div>
					<p class="email title">技术支持联系:</p>
					<p class="email">linjing@cnsebe.com</p>
					<p class="tell">17816082754</p>
					<p class="tell">0571-28253778</p>
				</div> -->
			</div>
			<div class="content_rig">
				<div class="content_wrap" id="content_wrap">
					<!-- 用于长列表时翻页滚动到顶部定位 -->
					<div id="anchor" style="height: 0;margin: 0;"></div>
					<router-view></router-view>
					<p class="copy_roght">
						<!-- © 2018-现在 长三角(杭州·江干)科技大市场版权所有 &nbsp; 指导单位：杭州江干科技局 -->
						© 2018-现在 浙江伍一技术股份有限公司
					</p>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import pubHeader from 'components/public/header.vue'
	import store from '@/store'
	export default {
		components: {
			pubHeader
		},
		data() {
			return {
				menusData: [],  //一级路由
				cMenusData: [],
				activePath: '',
				theRoute: {},
				isSuper: 1,  //默认管理员
				activeIndex: 0, //以及路由高亮的下标
				selectItem: {},  //选择的栏目信息
				showHover: false, //展示hover判定标准
				offTop: '8px', //判断标准盒子距顶部的高度
			}
		},
		mounted () {
			this.isSuper = this.$storage.get('isSuper');
		},
		methods: {
			itemHoverFn (item, index) {
				let scrollTop = this.$refs.elememt.scrollTop;
				this.offTop = index * 46 + 8 + 36 - scrollTop + 'px';
				this.showHover = true;
				this.selectItem = item;
			},
			mouseoutFn () {
				this.showHover = false;
			},
			// 得到二级路由
			getSecondMenuFn (data) {
				this.cMenusData = data;
			},
			// 跳转路由
			changeMenuFn (item) {
				let query = this.getQueryData(item.access) || {}
				this.$router.push({path: item.access, query});
			},
			getQueryData (access) {
				let ret = {}
				if (!access) {return}
				let arr = access.split('/');
				let pathName = arr[arr.length-1];
				// type 字段对应列表页面项目id
				if (pathName == 'nationalTech') {
					ret.type = "44";
				} else if(pathName == 'cityTech'){
					ret.type = "45";
				} else if(pathName == 'provincialTech'){
					ret.type = "46";
				} else if(pathName == 'hzTryCenter'){
					ret.type = "47";
				} else if(pathName == 'hzTrySfCenter'){
					ret.type = "48";
				} else if(pathName == 'provincialTechProCenter'){
					ret.type = "49";
				} else if(pathName == 'cityTechProCenter'){
					ret.type = "50";
				} else if(pathName == 'provincialTechCenter'){
					ret.type = "51";
				} else if(pathName == 'cityTechCenter'){
					ret.type = "52";
				} else if(pathName == 'provincialBigProject'){
					ret.type = "53";
				} else if(pathName == 'cityBigProject'){
					ret.type = "54";
				} else if(pathName == 'cityTechCultivate'){
					ret.type = "55";
				} else if(pathName == 'areaHundred'){
					ret.type = "127";
				}
				return ret;
			}
		},
		// watch: {
		// 	$route(to, from) {
		// 		store.commit('SET_PERCENT', 0)
		// 	}
		// }
	}
</script>


<style lang="scss">
  .home_page {
  	width: 100%; height: 100%; overflow: hidden; background: #f8f8f8;
		.content_center_wrap {min-width: 1280px;
			position: absolute; top: 50px; bottom: 0; width: 100%;
			.nav_lef {
				width: 200px; float: left; height: 100%; background: #2D2D2D; position:relative;
				.nav_list {
					width: 100%; min-height: 660px; overflow-y: auto;background:#2D2D2D;
					.item_til{height:36px;line-height: 36px;background-color: #333;color: #696969;padding-left: 20px;}
					.item {
						padding-left: 20px; height: 46px; line-height: 46px; cursor: pointer; position: relative; z-index: 100;
						img {width: 16px; height: 16px; opacity: 0.5;}
						.icon {font-size: 20px; color: #fff; float: left; opacity: 0.5;}
						.nav_name { font-size: 13px; color: #fff; margin-left: 10px; float: left; opacity: 0.5; vertical-align: middle; display: inline-block; max-width:130px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
						&:hover {
							background: rgba(255,255,255,.05); z-index: 101;
							.icon {opacity: 1;}
							.nav_name {opacity: 1;}
						}
					}
					.active {
						background:linear-gradient(270deg,rgba(66,114,255,1) 0%,rgba(35,124,255,1) 100%);
						.icon {opacity: 1;}
						.nav_name { opacity: 1;}
					}
					&:hover {
						&::-webkit-scrollbar {
							display:block;
						}
					}
					&::-webkit-scrollbar {
						width: 4px; display: none;
					}
					&::-webkit-scrollbar-track {
						background-color: #222;
					} /* 滚动条的滑轨背景颜色 */
					&::-webkit-scrollbar-thumb {
						background-color: #555;
					} /* 滑块颜色 */
					&::-webkit-scrollbar-button {
						background-color: #222;
					} /* 滑轨两头的监听按钮颜色 */
					&::-webkit-scrollbar-corner {
						background-color: black;
					} /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
				}
				.des_info {
					position: absolute; z-index: 100; display: block; left:180px; top: 8px; width: 360px; padding: 15px; background: #fff; box-shadow:0px 2px 8px 0px rgba(0,0,0,0.15);
					.title {font-size: 13px; color: rgba(0,0,0,.65); line-height: 22px; margin-bottom: 4px; font-weight: 600;}
					.line {
						font-size: 12px; color: rgba(0,0,0,.65); line-height: 22px;
						.blue {color: #3576FF; }
					}
					.line_i {text-indent: 1.5em;}
					.line_in {text-indent: 3.5em; color: #3576FF;}
					&:before {content: ''; width: 0; height: 0; border: 6px solid transparent; border-right-color: #fff; position: absolute; left: -12px; top: 10px;}
				}
				.info_box {
					width: 160px; height: 140px; position: absolute; bottom: 20px; left: 20px; background: #2B2B2F; border-radius: 4px;
					.phone {
						position: absolute; left: 50%; margin-left: -30px; top: -20px; width: 60px; height: 60px; line-height: 60px; text-align: center; border-radius: 50%; background: #222;
						img {width: 24px; height: 24px;}
					}
					.title {margin-top: 46px;}
					.email {width: 100%; color: #fff; font-size: 12px; text-align: center; margin-bottom: 4px;}
					.tell {width:100%; text-align: center; font-size: 12px; color: #9EA0A5; margin-bottom: 4px}
				}
			}
			.content_rig {
				float: left; height: 100%; position: absolute; left: 200px; right: 0;
				.content_wrap {
					overflow: auto; position: absolute;top: 0; bottom: 0; left: 0; right: 0;
					.copy_roght {color: #bbb; font-size: 12px; padding: 15px 0 20px 20px;text-align: center}
				}
			}
		}
  }
  .ant-popover-content {
		.ant-btn {line-height: 28px;}
	}
</style>
