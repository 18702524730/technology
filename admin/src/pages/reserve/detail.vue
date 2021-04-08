<template>
	<div class="re-detail-list-wrap">
		<div class="back">
			<i class="anticon anticon-left-circle" @click="back"></i><span @click="back">返回列表</span>
		</div>
		<div class="list-card">
			<h4>{{detailData.companyName}}（知识产权概况）</h4>
			<div class="chart">
				<highcharts :options="options" class="chart-in" v-if="showChart"></highcharts>
			</div>
		</div>
		<div class="list-card multi-colums">
			<h4>基本信息</h4>
			<div class="items-wrap">
				<div class="items clearfix">
					<div class="item">
						<label>企业名称：</label><span>{{detailData.companyName}}</span>
					</div>
					<div class="item">
						<label>街道：</label><span>{{detailData.street|street}}</span>
					</div>
					<div class="item">
						<label>企业注册所在市、区、街道：</label><span>{{detailData.regAddress}}</span>
					</div>
				</div>
				<div class="items clearfix">
					<div class="item">
						<label>企业注册时间：</label><span>{{detailData.regDate|dateFormat("date")}}</span>
					</div>
					<div class="item">
						<label>所属行业：</label><span>{{detailData.industry}}</span>
					</div>
					<!-- <div class="item">
						<label>技术领域：</label><span>{{detailData.productField}}</span>
					</div> -->
					<div class="item">
						<label>企业规模：</label><span>{{detailData.companySize|companySize}}</span>
					</div>
				</div>
				<div class="items clearfix">
					<div class="item">
						<label>法人姓名：</label><span>{{detailData.frName}}</span>
					</div>
					<div class="item">
						<label>联系电话：</label><span>{{detailData.frTel}}</span>
					</div>
				</div>
			</div>
		</div>

		<div class="list-card multi-colums">
			<h4>知识产权</h4>
			<div class="items-wrap">
				<div class="items clearfix">
					<div class="item">
						<label>发明专利：</label><span>{{detailData.inventionPatentNum}}</span>
					</div>
					<div class="item">
						<label>实用新型专利：</label><span>{{detailData.utilityModelPatentNum}}</span>
					</div>
					<div class="item">
						<label>外观设计专利：</label><span>{{detailData.industrialDesignPatentNum}}</span>
					</div>
				</div>
				<div class="items clearfix">
					<div class="item">
						<label>软件著作权：</label><span>{{detailData.softCopyrightNum}}</span>
					</div>
					<div class="item">
						<label>作品著作权：</label><span>{{detailData.workCopyrightNum}}</span>
					</div>
					<div class="item">
						<label>商标数量：</label><span>{{detailData.tmNum}}</span>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
	import Filters from 'utils/filters'
	import abilityMap from 'components/detail/abilityMap'
	const { pubFilters, statusFilters } = Filters
	export default {
		components: {
			abilityMap
		},
		data() {
	    return {
	    	showChart: false,
	    	showAbilityMap: false,
	    	saleResult:0,
	    	researchCostResult:0,
	    	intellectualPropertyResult: 1,
	      detailData: {},
	      options: {
					chart: {
						type: 'column',
						height: 320,
						width: 460,
						marginBottom: 60,
					},
					colors: ['#3576FF'],
					title: {
						text: ' ',
						floating: false,
						verticalAlign: 'bottom',
						style: {
							fontSize:'12px',
						},
						margin: 30,
						useHTML: true,
					},
					xAxis: {
						categories: ['商标', '外观专利', '实用新型专利', '发明授权专利', '软件著作权', '作品著作权'],
						title: {
							text: null
						}
					},
					yAxis: {
						min: 0,
						title: {
							text: '数量(件)',
							align: 'high'
						},
						labels: {
							overflow: 'justify'
						}
					},
					tooltip: {
						valueSuffix: '件'
					},
					plotOptions: {
						bar: {
							dataLabels: {
								enabled: true,
								allowOverlap: true // 允许数据标签重叠
							}
						}
					},
					legend: {
						verticalAlign: 'middle',
						borderWidth: 1,
						backgroundColor: '#FFFFFF',
						shadow: true
					},
					series: [{
						name: '数量',
						showInLegend: false,
						data: [107, 31, 635],
						maxPointWidth: 30
					}]
				}
	    }
	  },
	  mounted() {
	  	let id = this.$route.query.id;
	  	this.queryCompanyDetail(id);
	  },
		methods: {
			back() {
				this.$router.go(-1);
			},
			toDetail(id) {
				this.$router.push({
					path: '/home/nationalTech/detail',
					query: {
						id
					}
				});
			},
			viewAbilityMap(item) {
				this.showAbilityMap = true;
				this.saleResult = item.saleResult;
				this.researchCostResult = item.researchCostResult;
				this.intellectualPropertyResult = item.intellectualPropertyResult;
			},
			async queryCompanyDetail(id) {
				let data = await this.API.reserve.storeDetail(id);
				this.detailData = data || {};
				this.options.series[0].data = [
					data.tmNum || 0,
					data.industrialDesignPatentNum || 0,
					data.utilityModelPatentNum || 0,
					data.inventionPatentNum || 0,
					data.softCopyrightNum || 0,
					data.workCopyrightNum || 0,
				]
				this.showChart = true;
			},
			handleChange() {},
			onChange(date, dateString) {
	      console.log(date, dateString);
	    }
		},
		filters: { ...pubFilters.filters, ...statusFilters.filters }
	}
</script>


<style lang="scss">
  .re-detail-list-wrap {
		padding: 20px;background-color: #fff;color: #333;margin: 20px 20px 0;
    .back{
    	vertical-align: middle;margin-bottom: 20px;
    	i{font-size: 24px;color:#bbb;vertical-align: middle;cursor: pointer;}
    	span{padding-left: 5px;font-size:14px;vertical-align: middle;cursor: pointer;}
    }
    .mt10{margin-top: 10px;}
    .mr10{margin-right: 10px;}
    .ml10{margin-left: 10px;}

    // 单行单列
    .list-card{
    	font-size: 13px;border: 1px solid #F1F1F1;margin-bottom: 10px;
    	h4{height:38px;line-height: 38px;padding-left: 20px;background-color: #F1F1F1;font-size: 13px;color: #333;margin-bottom: 0;}
    	.items-wrap{
    		padding:20px 20px;
	    	.items{
	    		.item{
	    			line-height: 17px;vertical-align: middle;padding-right: 20px;margin-bottom: 10px;
	    			label{color: #999;vertical-align: middle;}
	    			span{vertical-align: middle;}
	    			a{color: #3576FF;margin-left: 10px;}
	    		}
	    	}
	    	.items:last-child{margin-bottom: 0;}
	    	.singTitle{
	    		.title{color: #999;}
	    	}
    	}
    	.chart{
    		padding: 20px;width: 1000px;
    		.chart-in{width: 600px;}
    	}
    }
    .list-card:last-child{margin-bottom: 0;}

		// 单行多列
    .multi-colums{
    	.items-wrap{
	    	.items{
		    	margin-bottom: 10px;
	    		.item{float: left;width: 33%;margin-bottom: 0;}
	    	}
    	}
    }
  }
</style>
