<template>
  <div class="gg-card-container">
  	<div class="top_title clearfix">
			<span>国家高新技术企业</span>
			<div>截止时间：{{now}} <a-icon type="sync" @click="refresh" /></div>
		</div>
  	<div class="card-wrap mt20">
  		<div class="card" :class="{'active': selectType==1}" @click="selectTypeFn(1)">
	    	<p>“国家高新技术企业”预计企业总数(家）</p>
	    	<span>{{allData[1] && allData[1].num}}</span>
	    	<a-icon type="bars" @click="pathTo('/home/nationalTech/list')" />
	    </div>
  		<div class="card" :class="{'active': selectType==2}" @click="selectTypeFn(2)">
	    	<p>新认定且符合“国家高新技术企业”申报条件的企业总数(家)</p>
	    	<span>{{allData[2] && allData[2].num}}</span>
	    	<a-icon type="bars" @click="pathTo('/home/nationalTech/list')" />
	    </div>

	    <div class="card" :class="{'active': selectType==3}" @click="selectTypeFn(3)">
	    	<p>已获评“国家高新技术企业”称号的企业总数(家)</p>
	    	<span>{{allData[3] && allData[3].num}}</span>
	    	<a-icon type="bars" @click="pathTo('/home/nationalTech/list')" />
	    </div>
	    <div class="card" :class="{'active': selectType==4}" @click="selectTypeFn(4)">
	    	<p>2018年已复评企业总数(家)</p>
	    	<span>{{allData[4] && allData[4].num}}</span>
	    	<a-icon type="bars" @click="pathTo('/home/nationalTech/list')" />
	    </div>
	    <div class="card" :class="{'active': selectType==5}" @click="selectTypeFn(5)">
	    	<p>2019年需复评企业总数(家)</p>
	    	<span>{{allData[5] && allData[5].num}}</span>
	    	<a-icon type="bars" @click="pathTo('/home/nationalTech/list')" />
	    </div>
	    <div class="card" :class="{'active': selectType==6}" @click="selectTypeFn(6)">
	    	<p>2020年需复评企业总数(家)</p>
	    	<span>{{allData[6] && allData[6].num}}</span>
	    	<a-icon type="bars" @click="pathTo('/home/nationalTech/list')" />
	    </div>

	    <div class="card" :class="{'active': selectType==7}" @click="selectTypeFn(7)">
	    	<p>2019年国高预估数量(家)</p>
	    	<span>{{allData[7] && allData[7].low}}~{{allData[7] && allData[7].high}}</span>
	    	<a-icon type="bars" @click="pathTo('/home/nationalTech/list')" />
	    </div>
	    <div class="card" :class="{'active': selectType==8}" @click="selectTypeFn(8)">
	    	<p>2020年国高预估数量(家)</p>
	    	<span>{{allData[8] && allData[8].low}}~{{allData[8] && allData[8].high}}</span>
	    	<a-icon type="bars" @click="pathTo('/home/nationalTech/list')" />
	    </div>
    </div>
    <div class="chart clearfix ml20" id="chart" v-if="isSuper">
    	<highcharts :options="chartOptions" class="lt-chart" v-if="showChart" key="1"></highcharts>
    	<div class="rt-chart-wrap" v-if="showChart">
    		<highcharts :options="options" v-if="show" class="rt-chart" key="2"></highcharts>
    	</div>
    	<highcharts :options="lineOptions" v-if="showLine" class="chart_line" key="3"></highcharts>
    </div>
    <div class="chart clearfix ml20" id="chart" v-if="!isSuper">
    	<div class="rt-chart-wrap rt-chart-wrap-s">
    		<highcharts :options="options" v-if="show" class="rt-chart" style="margin-left: 0; margin-top: -10px;"></highcharts>
    	</div>
    </div>
  </div>
</template>

<script>
import HighCharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more.js';
import {Chart} from 'highcharts-vue'
import Filters from 'utils/filters'
const { pubFilters, statusFilters } = Filters
export default {
  data () {
  	let self = this;
    return {
    	selectType: 1,
    	isSuper: false, // 默认不是管理员
    	showChart: false,
    	show: false,
    	showLine: false,
    	allData: {},
    	tData: {},
    	now:'',
    	chartOptions: {
				chart: {
					spacing : [40, 0 , 40, 0]
				},
				colors: ['#FFDA72', '#54CC7F', '#58A0F3', '#586BF3', '#6758F3', '#AF58F3', '#E364BC', '#EB6565'],
				title: {
					floating:true,
					text: ''
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						slicedOffset: 20,
						className: 'test',
						dataLabels: {
							/*backgroundColor: '#f8f8f8',
							borderColor:'#f8f8f8',
							borderRadius: 2,
							borderWidth: 1,*/
							padding: 0,
							className: 'dataLabels',
							enabled: true,
							distance: 30,
							format: '<b style="display:block;font-weight: bold;padding-bottom:20px;color:{point.color}">{point.name}</b><br/>需复评企业数：{point.y}家',
							style: {
								color: '#333',
								"fontSize": "12px",
								"fontWeight": "normal",
							}
						},
						point: {
							events: {
								mouseOver: function(e) {  // 鼠标滑过时动态更新标题
									// 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
									/*chart.setTitle({
										text: e.target.name+ '\t'+ e.target.y + ' %'
									});*/
								},
								click(e) { // 同样的可以在点击事件里处理
									console.log(this)
									console.log(self)
									self.show = false;
									setTimeout(() => {
										self.show = true;
										let d = self.tData.street[this.colorIndex];
										self.options.series[0].data = [d.num];
										self.options.colors[0] = this.color;
										self.options.title.text = '<i class="light light'+ this.colorIndex +'">' + d.streetName + self.tData.chartTitle +'：' + (d.num || 0) + '家</i>'
									}, 200)
							    /*chart.setTitle({
							        text: e.point.name+ '\t'+ e.point.y + ' %'
							    });*/
								}
							}
						},
					}
				},
				series: [{
					type: 'pie',
					innerSize: '70%',
					name: '需复评企业数占比',
					data: [{
						type: 'pie',
						innerSize: '70%',
						name: '企业总数',
						data: [
							{name:'闸弄口街道',   y: 10.0, url : 'http://bbs.hcharts.cn'},
							['闸弄口街道',       15.8],
							{
								name: '闸弄口街道',
								y: 12.8,
								url: 'http://www.hcharts.cn'
							},
							['闸弄口街道',    8.5],
							['闸弄口街道',     6.2],
							['闸弄口街道',   2],
							['闸弄口街道',    8.5],
							['闸弄口街道',     6.2],
						]
					}]
				}]
			},
			options: {
				chart: {
					type: 'column',
					height: 320,
					width: 460,
					marginBottom: 60,
				},
				colors: ['#3576FF'],
				title: {
					text: '我是标题',
					floating: false,
					verticalAlign: 'bottom',
					style: {
						fontSize:'12px',
					},
					margin: 30,
					useHTML: true,
				},
				xAxis: {
					categories: ['2018年已复评'],
					title: {
						text: null
					}
				},
				yAxis: {
					min: 0,
					title: {
						text: '参与企业数(家)',
						align: 'high'
					},
					labels: {
						overflow: 'justify'
					}
				},
				tooltip: {
					valueSuffix: '家'
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
					name: '企业数',
					showInLegend: false,
					data: [107, 31, 635],
					maxPointWidth: 30
				}]
			},
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

    }
  },
  components: {
    highcharts: Chart
  },
  mounted() {
  	HighchartsMore(HighCharts);
  	this.isSuper = this.$storage.get('isSuper') == 1;
  	this.getData();
  	this.now = pubFilters.filters.dateFormat(new Date().getTime());
  },
  methods: {
  	selectTypeFn (type) {
  		this.selectType = type;
			if (type == 7 || type == 8) {
  			this.initChartLine(type); //线图
			}else{
				this.initData(type);  //初始化数据
			}
  	},
  	initData(type) {
  		this.showLine = false;
  		let tData = this.allData[type];
  		this.tData = { ...tData, ...this.getSomeData(type) }
  		console.log(this.tData)
  		let list = this.tData.street;
			list.forEach((item) => {
				item.name = item.streetName;
				item.y = item.num || 0;
			});
			list[0].selected = true;// 默认选中第一个
			list[0].sliced = true;
			this.showChart = true;
			this.chartOptions.plotOptions.pie.dataLabels.format = '<b style="display:block;font-weight: bold;padding-bottom:20px;color:{point.color}">{point.name}</b><br/>'+this.tData.name+'：{point.y}家';
			this.chartOptions.series[0].name = this.tData.name + '占比';
			this.chartOptions.series[0].data[0].name = this.tData.name
			this.chartOptions.series[0].data = list;
			setTimeout(() => {
				this.show = true;
				let d = this.tData.street[0];
				this.options.xAxis.categories = [d.streetName]
				this.options.yAxis.title.text = this.tData.name
				this.options.series[0].data = [d.num];
				this.options.colors[0] = this.chartOptions.colors[0];
				this.options.title.text = '<i class="light light'+ 0 +'">' + d.streetName + this.tData.chartTitle +'：' + (d.num || 0) + '家</i>'
			}, 1000)
  	},
  	initChartLine (type) {
  		this.show = false;
  		this.showChart = false;
  		this.showLine = true;
  		let tData = this.allData[type];
  		this.tData = { ...tData, ...this.getSomeData(type) }
  		console.log(this.tData)
  		let list = this.tData.street;
    	let option_ = this.lineOptions;
    	let categories = [];
    	let data = [];
    	list.forEach( item => {
    		categories.push(item.streetName);
    		data.push([item.low, item.high])
    	})
    	console.log(list)
    	option_.xAxis.categories = categories;
    	option_.series[0].data = data;
    },
  	getSomeData(type) {
  		let ret = {};
  		if (type == 1) {
  			ret.name = '企业总数';
  			ret.chartTitle = '“国家高新技术企业”预计企业总数'
  		} else if (type == 2) {
  			ret.name = '企业总数';
  			ret.chartTitle = '新认定且符合“国家高新技术企业”申报条件的企业总数'
  		} else if (type == 3) {
  			ret.name = '企业总数';
  			ret.chartTitle = '已获评“国家高新技术企业”称号的企业总数'
  		} else if (type == 4) {
  			ret.name = '企业总数';
  			ret.chartTitle = '2018年已复评企业总数'
  		} else if (type == 5) {
  			ret.name = '企业总数';
  			ret.chartTitle = '2019年需复评企业总数'
  		} else if (type == 6) {
  			ret.name = '企业总数';
  			ret.chartTitle = '2020年需复评企业总数'
  		} else if (type == 7) {
  			ret.name = '预估数量';
  			ret.chartTitle = '2019年国高预估数量'
  		} else if (type == 8) {
  			ret.name = '预估数量';
  			ret.chartTitle = '2020年国高预估数量'
  		}
  		return ret;
  	},
  	refresh() {
			this.now = pubFilters.filters.dateFormat(new Date().getTime());
			this.getData();
		},
  	pathTo(path, query = {}) {
  		this.$router.push({path, query});
  	},
    callback (key) {
      console.log(key)
    },
    async getData() {
    	if (this.isSuper) {
	    	let data = await this.API.tech.cp(11);
				this.allData = data;
				this.initData(1);
			} else {
				let data = await this.API.tech.jp(11);
				this.allData = data;
				let d = data[1];
  			this.tData = { ...d, ...this.getSomeData(1) }
				let streetName = this.$storage.get('streetName');
				this.options.xAxis.categories = [streetName]
				this.options.yAxis.title.text = this.tData.name
				this.options.series[0].data = [d.num];
				this.options.title.text = '<i class="light">' + streetName + this.tData.chartTitle +'：' + (d.num || 0) + '家</i>'
				this.show = true;
			}
    }
  },
}
</script>

<style lang="scss">
	.gg-card-container{
		.top_title{
    	width:100%;padding: 15px 20px;border-bottom: 1px solid #F1F1F1;
    	span{float: left;height:20px; line-height:20px; font-weight:700; font-size:14px;}
    	div{
    		float: left;margin-left: 10px;font-size:12px;line-height: 20px;vertical-align: middle;color: #3576FF;
    		i{font-size: 14px;color: #3576FF;vertical-align: middle;padding: 0 10px;cursor: pointer;font-weight: bold;}
    	}
    }
		.card-wrap{
			padding: 0 20px;
			.card{
				position: relative;display: inline-block; width: 350px;background-color: #F8F8F8;padding: 15px 20px;margin-right: 10px;cursor: pointer;margin-bottom: 10px;border: 1px solid #F8F8F8;
				p{color: #666;line-height: 17px;height: 17px;overflow:hidden;font-size:12px;margin-bottom: 8px;}
				span{font-family:Arial;display: block; height: 22px;line-height: 22px;font-size:20px;color: #333;}
				.anticon{position: absolute; right: 15px; bottom: 14px;}
				.tip{
					position: absolute;right: -102px;bottom: 12px;font-size:12px;color: #fff;background-color: #999;display: inline-block;padding: 0 5px;height: 24px;line-height: 24px;border-radius:2px;
					i{position: absolute;left: -3px; top: 7px;display: inline-block;border-right: 8px solid #999;border-top: 10px solid transparent;border-bottom: 8px solid transparent;width: 10px;height: 10px;transform: rotate(225deg)}
				}
				.hide{transition: opacity 0.5s;opacity:0;}
			}
			.active {border: 1px solid #1890ff;}
		}
		.chart{
			position: relative;margin-top: 30px;width: 100%;padding-bottom: 90px;
			.lt-chart{float: left; width: 700px;height: 500px;}
			.rt-chart-wrap{
				float: left; width: 520px; height:380px;background-color: #fff;margin-left: 80px;margin-top: 70px;
				.rt-chart{
					width: 520px; height:380px;background-color: #fff;border:1px solid #f8f8f8;padding:30px 30px; box-shadow:0px 5px 15px 0px rgba(82,90,101,0.09);
					.highcharts-title{
						.light{
							font-style: normal;font-size: 12px;line-height: 18px;
							&:before{
								content: '●';
								color: #3576FF;
								padding-right: 5px;
								font-size: 18px;
								line-height: 18px;
							};
						}
						.light0{
							&:before{color:#FFDA72;}
						}
						.light1{
							&:before{color:#54CC7F;}
						}
						.light2{
							&:before{color:#58A0F3;}
						}
						.light3{
							&:before{color:#586BF3;}
						}
						.light4{
							&:before{color:#6758F3;}
						}
						.light5{
							&:before{color:#AF58F3;}
						}
						.light6{
							&:before{color:#E364BC;}
						}
						.light7{
							&:before{color:#EB6565;}
						}
					}
				}
			}
			.chart_line{max-width: 1000px;}
			.rt-chart-wrap-s{
				margin-left: 0;margin-top: 0;
				.rt-chart{border:1px solid #f1f1f1; box-shadow: none;}
			}
		}
	}
</style>
