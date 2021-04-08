<template>
  <div class="sk-card-container">
  	<div class="top_title clearfix">
			<span>{{curProject.name}}</span>
			<div>截止时间：{{now}} <a-icon type="sync" @click="refresh" /></div>
		</div>
  	<div class="card-wrap mt20">
  		<div class="card" :class="{'active': showName=='totalNum'}" @click="selectTypeFn('totalNum')">
	    	<p>“{{curProject.name}}”预计企业总数(家)</p>
	    	<span>{{tData.headStatisticsData && tData.headStatisticsData.totalNum}}</span>
	    	<a-icon type="bars" @click="pathTo(1)" />
	    </div>
  		<div class="card" :class="{'active': showName=='storeNum'}" @click="selectTypeFn('storeNum')">
	    	<p>“{{curProject.name}}”科技型企业总数(家)</p>
	    	<span>{{tData.headStatisticsData && tData.headStatisticsData.storeNum}}</span>
	    	<a-icon type="bars" @click="pathTo(2)" />
	    </div>
	    <div class="card" :class="{'active': showName=='assessedNum'}" @click="selectTypeFn('assessedNum')">
	    	<p>已获评“{{curProject.name}}”称号的企业总数(家)</p>
	    	<span>{{tData.headStatisticsData && tData.headStatisticsData.assessedNum}}</span>
	    	<a-icon type="bars" @click="pathTo(3)" />
	    </div>
    </div>
    <div class="chart clearfix ml20" id="chart" v-if="isSuper">
    	<highcharts :options="chartOptions" class="lt-chart" v-if="showChart"></highcharts>
    	<div class="rt-chart-wrap">
    		<highcharts :options="options" v-if="show" class="rt-chart"></highcharts>
    	</div>
    </div>
    <div class="chart clearfix ml20" id="chart" v-if="!isSuper">
    	<div class="rt-chart-wrap rt-chart-wrap-s">
    		<highcharts :options="options" v-if="show" class="rt-chart" style="margin-left: 0; margin-top: -10px;"></highcharts>
    	</div>
    </div>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
import Filters from 'utils/filters'
const { pubFilters, statusFilters } = Filters
import projectLists from 'utils/projectLists'

export default {
  data () {
  	let self = this;
    return {
    	showName: 'totalNum',
    	curId: 0,
    	curProject: {},
    	projectLists,
    	isSuper: false, // 默认不是管理员
    	showChart: false,
    	show: false,
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
										let d = self.tData.streetOverview[this.colorIndex];
										self.options.xAxis.categories = [d.streetName];
										self.options.yAxis.title.text = self.tData.name;
										self.options.series[0].data = [d[self.showName]];
										self.options.colors[0] = this.color;
										self.options.title.text = '<i class="light light'+ this.colorIndex +'">' + d.streetName + self.tData.chartTitle +'：' + (d[self.showName] || 0) + '家</i>'
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
					categories: ['2018年已复评', '2019年需复评', '2020年需复评'],
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
			}

    }
  },
  components: {
    highcharts: Chart
  },
  mounted() {
  	this.isSuper = this.$storage.get('isSuper') == 1;
  	this.now = pubFilters.filters.dateFormat(new Date().getTime());
  	this.curId = this.$route.meta.id;
  	this.curProject = projectLists[this.curId-1];
  	this.getData();
  },
  methods: {
  	selectTypeFn (showName = 'totalNum') {
  		this.showName = showName;
			this.getData(showName);  //初始化数据
  	},
  	refresh() {
			this.now = pubFilters.filters.dateFormat(new Date().getTime());
			this.getData();
		},
  	pathTo(typeIndex, query = {}, path) {
  		let arr = this.$route.fullPath.split('/');
  		let pathName = arr[arr.length - 1];
  		path = path || `/reserve/${pathName}/list`
  		let type = this.getType(pathName, typeIndex);
  		query = {...query, type}
  		this.$router.push({path, query});
  	},
  	getType(pathName, typeIndex) {
  		if (pathName == 'nationalTech') {
  			return {
  				'1': '1',
  				'2': '2',
  				'3': '3'
  			}[typeIndex]
  		} else if (pathName == 'cityTech') {
  			return {
  				'1': '4',
  				'2': '5',
  				'3': '6'
  			}[typeIndex]
  		} else if (pathName == 'provincialTech') {
  			return {
  				'1': '7',
  				'2': '8',
  				'3': '9'
  			}[typeIndex]
  		} else if (pathName == 'competitionProject') {
  			return {
  				'1': '10',
  				'2': '11',
  				'3': '12'
  			}[typeIndex]
  		}
  	},
    callback (key) {
      console.log(key)
    },
    async getData(showName = 'totalNum') {
    	let apiName = this.getApiName();
    	if (this.isSuper) {
	    	let data = await this.API.reserve[apiName](0);
  			this.tData = { ...data, ...this.getSomeData(showName) }
				let list = data.streetOverview;
				list.forEach((item) => {
					item.name = item.streetName;
					item.y = item[showName] || 0;
				});
				list[0].selected = true;// 默认选中第一个
				list[0].sliced = true;
				this.showChart = true;
				this.chartOptions.plotOptions.pie.dataLabels.format = '<b style="display:block;font-weight: bold;padding-bottom:20px;color:{point.color}">{point.name}</b><br/>'+this.tData.name+'：{point.y}家';
				this.chartOptions.series[0].name = this.tData.name + '占比';
				this.chartOptions.series[0].data[0].name = this.tData.name
				this.chartOptions.series[0].data = list;
				console.log(this.chartOptions)
				setTimeout(() => {
					this.show = true;
					let d = this.tData.streetOverview[0];
					this.options.xAxis.categories = [d.streetName]
					this.options.yAxis.title.text = this.tData.name
					this.options.series[0].data = [d[showName]];
					this.options.colors[0] = this.chartOptions.colors[0];
					this.options.title.text = '<i class="light light'+ 0 +'">' + d.streetName + this.tData.chartTitle +'：' + (d[showName] || 0) + '家</i>'
				}, 1000)
			} else {
				let streetId = this.$storage.get('streetId');
				let data = await this.API.reserve[apiName](streetId);
				this.tData = { ...data, ...this.getSomeData(showName) }
				let d = data.headStatisticsData;
				let streetName = this.$storage.get('streetName');
				this.options.xAxis.categories = [streetName]
				this.options.yAxis.title.text = this.tData.name
				this.options.series[0].data = [d[showName]];
				this.options.title.text = '<i class="light">' + streetName + this.tData.chartTitle +'：' + (d[showName] || 0) + '家</i>'
				this.show = true;
			}
    },
    getApiName() {
    	let apiName = '';
    	if (this.curId === 11) {
    		apiName = 'ccGgCount'
    	}else if(this.curId === 2) {
    		apiName = 'ccSgCount'
    	}else if(this.curId === 1) {
    		apiName = 'ccSkCount'
    	}else if(this.curId === 13) {
    		apiName = 'ccJzCount'
    	}
    	return apiName;
    },
    getSomeData(showName) {
  		let ret = {};
  		if (showName == 'totalNum') {
  			ret.name = '企业总数';
  			ret.chartTitle = '“'+this.curProject.name+'”预计企业总数'
  		} else if (showName == 'storeNum') {
  			ret.name = '企业总数';
  			ret.chartTitle = '“'+this.curProject.name+'”科技型企业总数'
  		} else if (showName == 'assessedNum') {
  			ret.name = '企业总数';
  			ret.chartTitle = '已获评“'+this.curProject.name+'”称号的企业总数'
  		}
  		return ret;
  	},
  },
  watch:{
  	$route(){
  		this.now = pubFilters.filters.dateFormat(new Date().getTime());
	  	this.curId = this.$route.meta.id;
	  	this.curProject = projectLists[this.curId-1];
	  	this.showName = 'totalNum'
	  	this.getData();
  	}
  }
}
</script>

<style lang="scss">
	.sk-card-container{
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
				&:hover{border: 1px solid #1890ff;}
			}
			.active {border: 1px solid #1890ff;background-color: #fff;}
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
			.rt-chart-wrap-s{
				margin-left: 0;margin-top: 0;
				.rt-chart{border:1px solid #f1f1f1; box-shadow: none;}
			}
		}
	}
</style>
