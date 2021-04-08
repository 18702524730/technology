<template>
  <div class="common-panel gx-panel-one">
  	<div class="card-wrap">
	    <div class="card" @click="pathTo('/home/nationalTech/list')">
	    	<p>参与企业项目培育库调研的企业总数（家）</p>
	    	<span>{{tData.researchCount}}</span>
	    	<a-icon type="bars" />
	    	<div class="tip" :class="{'hide': !showTip}">点击查看企业列表<i></i></div>
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
export default {
  data () {
  	let self = this;
    return {
    	showTip: true,
    	isSuper: false, // 默认不是管理员
    	showChart: false,
    	show: false,
    	tData: {},
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
							format: '<b style="display:block;font-weight: bold;padding-bottom:20px;color:{point.color}">{point.name}</b><br/>参与企业总数：{point.y}家',
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
										//self.options.series[0].data = [Math.floor(102+50*Math.random()), Math.floor(30+50*Math.random()), Math.floor(80+50*Math.random())]
										let d = self.tData.list[this.colorIndex];
										self.options.series[0].data = [d.cultivation2018Num, d.cultivation2019Num, d.cultivation2020Num];
										self.options.colors[0] = this.color;
										self.options.title.text = '<i class="light light'+ this.colorIndex +'">' + d.streetName + '' +'"国家高新技术企业"可培育数量：' + (d.cultivationNum || 0) + '家</i>'
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
					innerSize: '75%',
					name: '参与企业占比',
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
					categories: ['2018年已认定', '2019年可培育', '2020年可培育'],
					title: {
						text: null,
					},
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
  	console.log(this.isSuper)
  	this.getData();
  	setTimeout(() => {
  		this.showTip = false;
  	}, 3000)
  },
  methods: {
  	pathTo(path, query = {}) {
  		this.$router.push({path, query});
  	},
    callback (key) {
      console.log(key)
    },
    async getData() {
    	if (this.isSuper) {
	    	let data = await this.API.tech.ggResearchStatistics();
				this.tData = data;
				let list = data.list;
				list.forEach((item) => {
					item.name = item.streetName;
					item.y = item.totalResearch;
				});
				list[0].selected = true;// 默认选中第一个
				list[0].sliced = true;
				this.showChart = true;
				this.chartOptions.series[0].data = list;
				console.log(this.chartOptions)
				setTimeout(() => {
					this.show = true;
					let d = this.tData.list[0];
					this.options.series[0].data = [d.cultivation2018Num, d.cultivation2019Num, d.cultivation2020Num];
					this.options.colors[0] = this.chartOptions.colors[0];
					this.options.title.text = '<i class="light light'+ 0 +'">' + d.streetName + '' +'"国家高新技术企业"可培育数量：' + (d.cultivationNum || 0) + '家</i>'
				}, 1000)
			} else {
				let d = await this.API.tech.stggResearchStatistics();
				let streetName = this.$storage.get('streetName');
	    	this.options.series[0].data = [d.cultivation2018Num, d.cultivation2019Num, d.cultivation2020Num];
				this.options.title.text = '<i class="light">' + streetName + '' +'"国家高新技术企业"可培育数量：' + (d.cultivationNum || 0) + '家</i>'
				this.tData = d;
				this.show = true;
				console.log(this.chartOptions)
			}
    }
  },
}
</script>

<style lang="scss">
	.common-panel{
		font-size: 13px;
		.card-wrap{
			padding: 0 20px;
			.card{
				position: relative;display: inline-block; width: 350px;background-color: #F8F8F8;padding: 10px 20px;margin-right: 10px;cursor: pointer;margin-bottom: 10px;
				p{color: #666;padding-bottom: 10px;margin-bottom: 0;}
				span{display: block; height: 27px;line-height: 27px;font-size:24px;}
				.anticon{position: absolute; right: 12px; bottom: 10px;}
				.tip{
					position: absolute;right: -102px;bottom: 12px;font-size:12px;color: #fff;background-color: #999;display: inline-block;padding: 0 5px;height: 24px;line-height: 24px;border-radius:2px;
					i{position: absolute;left: -3px; top: 7px;display: inline-block;border-right: 8px solid #999;border-top: 10px solid transparent;border-bottom: 8px solid transparent;width: 10px;height: 10px;transform: rotate(225deg)}
				}
				.hide{transition: opacity 0.5s;opacity:0;}
			}
			.card_active {border: 1px solid #1890ff;}
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
