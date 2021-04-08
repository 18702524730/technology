<template>
  <div class="common-panel ggyg-panel-three clearfix">
  	<div class="line_box_wrap clearfix" :class="{'line_box_line': !isSuper}">
	  	<div class="line_box" :class="{'line_wrap': !isSuper}">
	  		<div class="card-wrap">
	  			<div class="card" @click="selectTypeFn(1)" :class="{'card_active': selectType==1}">
			    	<p>2019年国高预估数量（家）</p>
			    	<span>{{ dataObj.gg2019YuguLowNum }}~{{ dataObj.gg2019YuguHighNum }}</span>
			    	<a-icon type="bars" @click="pathTo('/home/nationalTech/list')" />
					</div>
			    <div class="card" @click="selectTypeFn(2)" :class="{'card_active': selectType==2}">
			    	<p>2020年国高预估数量（家）</p>
			    	<span>{{ dataObj.gg2020YuguLowNum }}~{{ dataObj.gg2020YuguHighNum }}</span>
			    	<a-icon type="bars" @click="pathTo('/home/nationalTech/list')" />
			    </div>
	  		</div>
		    <div class="chart" v-if="isSuper">
		    	<div id="chart_line" class="chart_line"></div>
		    </div>
	  	</div>
  	</div>
  	<div class="pie_box clearfix" :class="{'pie_wrap': !isSuper}">
  		<div class="card-wrap">
		    <div class="card" @click="pathTo('/home/nationalTech/list')">
		    	<p>辖区内企业总数（家）</p>
		    	<span>{{ dataObj.totalCompanyNum }}</span>
		    	<a-icon type="bars" />
		    </div>
		  </div>
	    <div class="chart" id="chart_pie">
				<highcharts :options="pieOptions" v-if="showPie"></highcharts>
	    </div>
  	</div>
  </div>
</template>

<script>
import HighCharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more.js';
import {Chart} from 'highcharts-vue'
export default {
  data () {
  	let self = this;
    return {
    	show: false,
    	lineOptions: {
    		chart: {
					type: 'columnrange', // columnrange 依赖 highcharts-more.js
					inverted: true
				},
				title: {
					text: ''
				},
				colors: ['#99BAFF'],
				xAxis: {
					categories: []
				},
				yAxis: {
					title: {
						text: ''
					}
				},
				tooltip: {
					valueSuffix: '家'
				},
				plotOptions: {
					columnrange: {
						dataLabels: {
							enabled: true,
							formatter: function () {
								return this.y + '';
							}
						}
					},
					series: {
						pointWidth: 10,  //柱子的宽度
					}
				},
				legend: {
					enabled: false
				},
				series: [{
					name: '国家预估数量',
					data: []
				}]
    	},
    	pieOptions: {
    		chart: {
					spacing : [40, 0 , 40, 0]
				},
				title: {
					floating:true,
					text: ''
				},
				colors: ['#FFDA72', '#58A0F3', '#54CC7F'],
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							format: '<b style="display:block;font-weight: bold;padding-bottom:20px;color:{point.color}">{point.name}：{point.y}家',
							style: {
								color: '#333',
								"fontSize": "12px",
								"fontWeight": "normal",
							}
						},
						// point: {
						// 	events: {
						// 		mouseOver: function(e) {  // 鼠标滑过时动态更新标题
						// 			console.log(e);
						// 			// 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
						// 			chart.setTitle({
						// 				text: e.target.name+ '\t'+ e.target.y + ' %'
						// 			});
						// 		}
						// 		, 
						// 		click: function(e) { // 同样的可以在点击事件里处理
						// 		    chart.setTitle({
						// 		        text: e.point.name+ '\t'+ e.point.y + ' %'
						// 		    });
						// 		}
						// 	}
						// },
					}
				},
				series: [{
					type: 'pie',
					innerSize: '70%',
					name: '企业数量占比',
					data: [
						['可培育企业总数', 26.8],
						['已获评“国家高新技术企业”称号的 企业总数', 8.5],
						['未参与调研的企业总数',  6.2],
					]
				}]
    	},
			dataObj: {},  //国高预估数据
			showPie: false,
			isSuper: 1,  //默认管理员
			selectType: 1,
    }
  },
  components: {
    highcharts: Chart
  },
  mounted() {
  	HighchartsMore(HighCharts);
  	this.isSuper = this.$storage.get('isSuper');
  	this.selectType = this.$route.query.selectType || 1;
  	this.initData();  //初始化数据
  },
  methods: {
  	selectTypeFn (type) {
  		this.selectType = type;
  		this.initData();  //初始化数据
  	},
  	pathTo(path, query = {}) {
  		this.$router.push({path, query});
  	},
    callback (key) {
      console.log(key)
    },
    async initData() {
    	try {
    		let resp = '';  
    		if (this.isSuper) {
    			resp = await this.API.tech.ggYuguStatisticsAdmin();  //陈局
    		}
    		else{
    			resp = await this.API.tech.stggYuguStatistics();  //街道
    		}
    		this.dataObj = resp;
    		if (this.isSuper) {
    			this.initChartLine('chart_line', this.lineOptions, resp.list); //线图
    		}
    		this.initChartPie('chart_pie', this.pieOptions, this.dataObj);
    	}
    	catch (e){}
    },
    initChartLine (id, option, list) {
    	let option_ = option;
    	let categories = [];
    	let data = [];
    	list.forEach( item => {
    		categories.push(item.streetName);
    		if (this.selectType == 1) {  //2019
    			data.push([item.lowNum, item.highNum])
    		}
    		else if (this.selectType == 2) {  //2020
    			data.push([item.lowNum2020, item.highNum2020])
    		}
    	})
    	option_.xAxis.categories = categories;
    	option_.series[0].data = data;
    	// this.lineOptions = option_;
    	HighCharts.chart(id, option_);
    },
    initChartPie (id, option, obj) {
    	console.log(obj);
    	let options_ = option;
    	options_.series[0].data.forEach( item =>{
    		if (this.isSuper) {
    			switch (item[0]){
	    			case '可培育企业总数': item[1] = obj.cultivateNum; break;
	    			case '已获评“国家高新技术企业”称号的 企业总数': item[1] = obj.existNum; break;
	    			case '未参与调研的企业总数': item[1] = obj.unResearchNum; break;
	    		}
    		}
    		else{
    			switch (item[0]){
	    			case '可培育企业总数': item[1] = obj.ggCultivateNum; break;
	    			case '已获评“国家高新技术企业”称号的 企业总数': item[1] = obj.existGgNum; break;
	    			case '未参与调研的企业总数': item[1] = obj.unResearchNum; break;
	    		}
    		}
    	})
    	console.log(options_);
    	this.pieOptions = options_;
    	this.showPie = true;
    },
  },
}
</script>

<style lang="scss">
	// common-panel公用部分见panelOne.vue
	.ggyg-panel-three {
		.common-panel {
			.chart {
				padding-bottom: 0
			}
		}
		.line_box_wrap {
			width: 840px; float: left; margin-top: -20px; 
		}
		.line_box {
			width: 840px; border: 1px solid #f1f1f1; border-left:none; border-bottom: 0; border-top: none; float: left; padding-bottom: 20px; padding-top: 20px; margin-bottom: 20px;
			.chart_line { padding: 0 30px 0 30px; margin-bottom: 20px; margin-right: 0;}
		}
		.pie_box {
			width: 840px; float: left; border-right: 1px solid #f1f1f1; border-right: 1px solid #f1f1f1;  margin-top: -20px; padding-top: 20px;
		}
		.line_wrap {width: 100%;}
		.pie_wrap {border-right: none; margin-top: 0;}
		.line_box_line {width: 100%; border-bottom: 1px solid #f1f1f1; margin-bottom: 20px;}
		@media screen and (max-width: 1919px) {
			.line_box_wrap {width: 100%; border-bottom: 1px solid #f1f1f1; margin-bottom: 20px;}
			.line_box {border-right: none;}
			.pie_box {border-right: none;}
		}
	}
</style>
