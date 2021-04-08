<template>
  <div class="full_home_page">
		<pub-header @changeMenu="getSecondMenuFn" ></pub-header>
		<div class="content_center_wrap">
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
				this.offTop = index * 46 + 8 - scrollTop + 'px';
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
				this.$router.push({path: item.access});
			},
		},
		// watch: {
		// 	$route(to, from) {
		// 		store.commit('SET_PERCENT', 0)
		// 	}
		// }
	}
</script>


<style lang="scss">
  .full_home_page {
  	position: absolute; width: 100%; height: 100%; overflow: hidden; background: #f8f8f8;
		.content_center_wrap {
			position: absolute; top: 50px; bottom: 0; width: 100%;
			.content_rig {
				float: left; height: 100%; position: absolute; left: 0; right: 0;
				.content_wrap {
					overflow: auto; position: absolute;top: 0; bottom: 0; left: 0; right: 0;
					.copy_roght {color: #bbb; font-size: 12px; padding: 15px 0 20px 20px;text-align: center}
				}
			}
		}
  }
</style>
