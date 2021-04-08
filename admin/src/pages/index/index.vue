<template>
  <div class="index_page">
		<pub-header ></pub-header>
		<!-- 内容 -->
		<div class="content_wrap1">
			<Loading :loading="loading" />
			<div class="panel_wrap">
				<div class="panel_item_wrap">
					<h2>辖区企业总数</h2>
					<div class="panel_item">
						<div class="top_item can_click_item" @click="pathTo('/reserve/list/list?type=0')">
							<h3>{{ statistics.totalNum || 0}}</h3>
							<p>辖区企业总数</p>
						</div>
						<div class="item is_click_item" @click="pathTo('/reserve/list/list?type=0&isKeJiXing=0')">
							<p>科技型企业(家)</p>
							<h3>{{ statistics.isTechCount || 0}}</h3>
						</div>
						<div class="item is_click_item" @click="pathTo('/reserve/list/list?type=0&isKeJiXing=0&isRuKu=1')">
							<p>未入库科技型企业(家)</p>
							<h3>{{ statistics.isTechCountNotInLib || 0}}</h3>
						</div>
					</div>
				</div>
				<div class="panel_item_wrap company_item_wrap">
					<h2>科技企业调研入库</h2>
					<div class="panel_item">
						<div class="top_item can_click_item top_item_02" @click="pathTo('/reserve/list/list?type=0&isKeJiXing=0&isRuKu=0')">
							<h3>{{ statistics.inlibTechNum || 0 }}</h3>
							<p>调研入库企业</p>
						</div>
						<div class="item tech_item">
							<p>国家高新技术企业(家)</p>
							<div class="inner_wrap">
								<div class="inner_item click_inner_item" @click.prevent="pathTo('/home/nationalTech/list?evaResult=0&type=44')"><i class="des">建议申报:</i><i class="num">{{ statistics.guogao_jysb || 0 }}</i></div>
								<div class="inner_item click_inner_item" @click.prevent="pathTo('/home/nationalTech/list?evaResult=2&type=44')"><i class="des">长期培育:</i><i class="num">{{ statistics.guogao_cqpy || 0 }}</i></div>
								<div class="inner_item"><i class="des">重点培育:</i><i class="num">{{ statistics.guogao_zdpy || 0 }}</i></div>
							</div>
						</div>
						<div class="item tech_item">
							<p>市高新技术企业(家)</p>
							<div class="inner_wrap">
								<div class="inner_item click_inner_item" @click="pathTo('/home/cityTech/list?evaResult=0&type=45')"><i class="des">建议申报:</i><i class="num">{{ statistics.shigao_jysb || 0 }}</i></div>
								<div class="inner_item click_inner_item" @click="pathTo('/home/cityTech/list?evaResult=2&type=45')"><i class="des">长期培育:</i><i class="num">{{ statistics.shigao_cqpy || 0 }}</i></div>
							</div>
						</div>
						<div class="item tech_item">
							<p>省级科技型中小企业(家)</p>
							<div class="inner_wrap">
								<div class="inner_item click_inner_item" @click="pathTo('/home/provincialTech/list?evaResult=0&type=46')"><i class="des">建议申报:</i><i class="num">{{ statistics.sk_jysb || 0 }}</i></div>
								<div class="inner_item click_inner_item" @click="pathTo('/home/provincialTech/list?evaResult=2&type=46')"><i class="des">长期培育:</i><i class="num">{{ statistics.sk_cqpy || 0 }}</i></div>
							</div>
						</div>
						<div class="item tech_item">
							<p>竞争性项目(个)</p>
							<div class="inner_wrap">
								<div class="inner_item"><i class="des">建议申报:</i><i class="num">{{ statistics.jzx_jysb || 0 }}</i></div>
								<div class="inner_item"><i class="des">长期培育:</i><i class="num">{{ statistics.jzx_cqpy || 0 }}</i></div>
							</div>
						</div>
						<div class="item_bot" @click="pathTo('/home/general')">
							统计详情
						</div>
					</div>
				</div>
				<div class="panel_item_wrap tech_item_wrap">
					<h2>已认定科技资质</h2>
					<div class="panel_item">
						<div class="top_item top_item_03">
							<h3>{{ statistics.identifyGgNum + statistics.identifySgNum + statistics.identifyCcNum + statistics.identifySkNum + statistics.identifyNoInlibNum || 0}}</h3>
							<p>已认定企业</p>
						</div>
						<div class="item is_click_item" @click="pathTo('/home/list/list?type=108')">
							<p>已认定国家高新技术企业(家)</p>
							<h3>{{ statistics.identifyGgNum || 0 }}</h3>
						</div>
						<div class="item is_click_item" @click="pathTo('/home/list/list?type=109')">
							<p>已认定市高新技术企业(家)</p>
							<h3>{{ statistics.identifySgNum || 0 }}</h3>
						</div>
						<div class="item is_click_item" @click="pathTo('/home/list/list?type=110')">
							<p>已认定市初创科技型企业培育工程(家)</p>
							<h3>{{ statistics.identifyCcNum || 0 }}</h3>
						</div>
						<div class="item is_click_item" @click="pathTo('/home/list/list?type=111')">
							<p>已认定省科技型中小企业(家)</p>
							<h3>{{ statistics.identifySkNum || 0 }}</h3>
						</div>
						<div class="item is_click_item" @click="pathTo('/home/list/list?type=103')">
							<p>已认定未入库企业(家)</p>
							<h3>{{ statistics.identifyNoInlibNum || 0 }}</h3>
						</div>
					</div>
				</div>
				<div class="panel_item_wrap talent_item_wrap" v-if="isSuper">
					<h2>科技人才-百人计划</h2>
					<div class="panel_item">
						<div class="top_item can_click_item top_item_04" @click="pathTo('/home/areaHundred/list')">
							<h3>{{ statistics.lx || 0}}</h3>
							<p>百人计划立项总数</p>
						</div>
						<div class="item is_click_item" @click="pathTo('/home/areaHundred/list?from=启明星计划')">
							<p>启明星计划</p>
							<h3>{{ statistics.lx_qmx || 0}}</h3>
						</div>
						<div class="top_item can_click_item top_item_04" @click="pathTo('/home/areaHundred/list?achieve=已落地')">
							<h3>{{ statistics.ld || 0}}</h3>
							<p>百人计划落地总数</p>
						</div>
						<div class="item is_click_item" @click="pathTo('/home/areaHundred/list?from=启明星计划&achieve=已落地')">
							<p>启明星计划</p>
							<h3>{{ statistics.ld_qmx || 0}}</h3>
						</div>
						<div class="item_bot" @click="pathTo('/home/talentGeneral')">
							统计详情
						</div>
					</div>
				</div>
			</div>
			<div class="footer">
				<!-- © 2018-现在 长三角(杭州·江干)科技大市场版权所有 &nbsp; 指导单位：杭州江干科技局 -->
				© 2018-现在 浙江伍一技术股份有限公司
			</div>
		</div>
	</div>
</template>

<script>
	import Filters from 'utils/filters'
	import pubHeader from 'components/public/header.vue'
	import Loading from 'components/loading.vue'
	export default {
		data() {
			return {
				statistics: {},
				loading: false,
				isSuper: true
			}
		},
		components: {
			pubHeader, Loading
		},
		mounted () {
			this.initFn();
		},
		methods: {
			pathTo(path, query = {}) {
	  		this.$router.push({path, query});
	  	},
			async initFn () { // this.$storage.get('isSuper')
				this.isSuper = JSON.parse(localStorage.getItem('tech_admin_isSuper')) == '0' ? false : true;
				console.log('this.isSuper', this.isSuper, JSON.stringify(localStorage.getItem('tech_admin_isSuper')))
				try {
					this.loading = true;
					let resp = await this.API.homePage.home();
					this.statistics = resp.statistics; //统计
					this.loading = false;
				}
				catch (e) {this.loading = false;}
			}
		},
		filters: {
			dateFormat: Filters.pubFilters.filters.dateFormat,
			applyStatus: Filters.statusFilters.filters.applyStatus,
			result: Filters.statusFilters.filters.result,
		}
	}
</script>


<style lang="scss">
	body{background: #f8f8f8;}
	.index_page{
		h3{margin: 0;}
		width: 100%; min-height: 100%; background: #f8f8f8;
		.content_wrap1 {
			margin: 30px auto 0; position: relative; z-index: 100; top: 0;
			.panel_wrap{position: relative;
				.panel_item_wrap{float: left;margin-right: 30px;
					&:last-child{margin-right: 0;}
					>h2{padding: 30px 0 0 20px;font-size: 18px;font-weight: 600;line-height: 25px;margin-bottom: 20px;background: url('../../assets/img/icon/locationIcon.png') no-repeat 0 37px;}
					.panel_item{border-radius: 4px;overflow: hidden;width: 360px;
						.top_item{color: #fff;padding: 21px 20px;background:rgba(53,118,255,1) url('../../assets/img/icon/panel01.png') no-repeat 270px 10px;
							background-size: 90px 90px;
							>h3{line-height: 33px;font-size: 24px;font-weight: 600;color: #fff;}
							p{font-size: 14px;line-height: 20px;margin-top: 5px;}
						}
						.can_click_item{cursor: pointer;}
						.top_item_02{background:rgba(54,175,71,1) url('../../assets/img/icon/panel02.png') no-repeat 270px 10px;}
						.top_item_03{background:rgba(255,172,34,1) url('../../assets/img/icon/panel03.png') no-repeat 270px 10px;}
						.top_item_04{background:rgba(240,101,62,1) url('../../assets/img/icon/panel04.png') no-repeat 270px 10px;}
						.item{background: #fff;padding: 24px 0 24px 20px;border-bottom: 1px solid #F8F8F8;
							p{font-size: 14px;line-height: 20px;color: #666;}
							h3{font-size: 20px;line-height: 28px;margin-top: 4px;}
							.inner_wrap{overflow: hidden;
								.inner_item{float: left;width: 50%;margin-top: 2px;
									i{font-style: normal;line-height: 28px;display: inline-block;}
									.des{font-size: 14px;color: #999;line-height: 20px;margin-right: 5px;transform: translateY(-2px);}
									.num{font-size: 20px;color: #333;font-weight: 500;line-height: 28px;}
								}
								.click_inner_item{cursor: pointer;
									&:hover{
										.des{color: #3576FF;}
										.num{color: #3576FF;}
									}
								}
							}
						}
						.is_click_item{cursor: pointer;
							&:hover{
								p{color: #3576FF;}
								h3{color: #3576FF;}
							}

						}
						.tech_item{padding: 24px 0 22px 20px;
							p{padding-bottom: 3px;}
						}
						.item_bot{line-height: 40px;padding-left: 20px;color: #bbb;font-size: 12px;background:#fff url('../../assets/img/icon/toDetailIcon.png') no-repeat 78px 14px;cursor: pointer;}
						.item_bot:hover{color: #3576FF;background:#fff url('../../assets/img/icon/toDetailIconActive.png') no-repeat 78px 14px}
					}
				}
			}
		}


		.footer {color: #bbb; font-size: 12px; padding: 740px 0 20px; text-align: center;}
	}
	@media screen and (min-width: 1530px) {
		.content_wrap1{width: 1530px;}
	}
	@media screen and (max-width: 1530px) and (min-width: 1140px) {
		body{min-width: 1140px!important;}
		.content_wrap1 {width: 1140px;
			.talent_item_wrap{position: absolute;left: 0;top: 377px;}
			.tech_item_wrap{margin-right: 0px!important;}
			.footer {padding: 954px 0 20px;}
		}
		
	}
	@media screen and (max-width: 1140px) {
		body{min-width: 750px!important;}
		.content_wrap1 {width: 750px;
			.talent_item_wrap{position: absolute;left: 0;top: 377px;}
			.company_item_wrap{margin-right: 0px!important;}
			.tech_item_wrap{position: absolute;left: 390px;top: 645px;}
			.footer {padding: 1385px 0 20px;}
		}
	}
</style>
