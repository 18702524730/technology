<template>
  <div class="common-panel gx-panel-two">
  	<div class="card-wrap">
	    <div class="card" @click="pathTo('/home/nationalTech/list')">
	    	<p>已获评“国家高新技术企业”称号的企业总数（家）</p>
	    	<span>{{tData.existGgNum}}</span>
	    	<a-icon type="bars" />
	    </div>
	    <div class="card" @click="pathTo('/home/nationalTech/list')" v-if="isSuper">
	    	<p>2018年已复评企业总数（家）</p>
	    	<span>{{tData.gg2018ReviewNum}}</span>
	    	<a-icon type="bars" />
	    </div>
	    <div class="card" @click="pathTo('/home/nationalTech/list')" v-if="isSuper">
	    	<p>2019年需复评企业总数（家）</p>
	    	<span>{{tData.gg2019ReviewNum}}</span>
	    	<a-icon type="bars" />
	    </div>
	    <div class="card" @click="pathTo('/home/nationalTech/list')" v-if="isSuper">
	    	<p>2020年需复评企业总数（家）</p>
	    	<span>{{tData.gg2020ReviewNum}}</span>
	    	<a-icon type="bars" />
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
										let d = self.tData.list[this.colorIndex];
										self.options.series[0].data = [d.review2018Num, d.review2019Num, d.review2020Num];
										self.options.colors[0] = this.color;
										self.options.title.text = '<i class="light light'+ this.colorIndex +'">' + d.streetName + '需要复评的' +'"国家高新技术企业"的企业总数：' + (d.totalNeedReview || 0) + '家</i>'
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
  	this.getData();
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
	    	let data = await this.API.tech.ggReviewStatistics();
				this.tData = data;
				let list = data.list;
				list.forEach((item) => {
					item.name = item.streetName;
					item.y = item.totalNeedReview || 2;
				});
				list[0].selected = true;// 默认选中第一个
				list[0].sliced = true;
				this.showChart = true;
				this.chartOptions.series[0].data = list;
				console.log(this.chartOptions)
				setTimeout(() => {
					this.show = true;
					let d = this.tData.list[0];
					this.options.series[0].data = [d.review2018Num, d.review2019Num, d.review2020Num];
					this.options.colors[0] = this.chartOptions.colors[0];
					this.options.title.text = '<i class="light light'+ 0 +'">' + d.streetName + '需要复评的' +'"国家高新技术企业"的企业总数：' + (d.totalNeedReview || 0) + '家</i>'
				}, 1000)
			} else {
				let d = await this.API.tech.stggReviewStatistics();
				let streetName = this.$storage.get('streetName');
				this.options.series[0].data = [d.review2018Num, d.review2019Num, d.review2020Num];
				this.options.title.text = '<i class="light">' + streetName + '需要复评的' +'"国家高新技术企业"的企业总数：' + (d.totalReviewNum || 0) + '家</i>'
				this.tData = d;
				this.show = true;
			}
    }
  },
}
</script>

<style lang="scss">
	// common-panel公用部分见panelOne.vue
	.gx-panel-two {

	}
</style>
