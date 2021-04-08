<template>
<div class="residual" >
	<div :class="[resultState ? 'goodBg' : 'badBg'  ,'bgContnet']">
		<div id="myChart" :style="{width: '100%'}"></div>
		<div class="resultContent">
			<h2 class="resultTit">{{resultState ? '恭喜，重点培育' : '培育'}}</h2>
			<h4 class="des">{{resultState ? '您的企业达到了重点培育标准' : tips}}</h4>
			<p class="res" v-show="!resultState">评估结果不准确？您还可以咨询专家或填写更详细的销售收入、研发费用、知识产权数量再次评估</p>
			<img class="badImg" v-if="!resultState" src="~assets/img/detail/bad.png" alt="">
			<img class="goodImg" v-else src="~assets/img/detail/good.png" alt="">
			<p class="link">专家会在48小时内联系到您，请您保持电话畅通</p>
			<div class="tel">专家热线：
				<a href="tel://0571-28253793">0571-28253793</a>
				或<a href="tel://0571-28253778">0571-28253778</a>
				</div>
		</div>
	</div>              
	<div class="ewmContnet">
		<img class="ewm" v-if="$route.query.wxPic" :src="$route.query.wxPic" alt="">
		<p class="connect">江干区科技企业交流群</p>
		<p class="news">最新的科技资讯、政策文件、通知公告</p>
		<img class="ewm" v-if="$route.query.streetWx" :src="$route.query.streetWx" alt="">
		<p class="connect">{{`${$route.query.street}企业交流群`}}</p>
	</div>
	<div class="detailBottom">
		<img src="~assets/img/detail/botLogo.jpg" alt="">
		<div>
			<p>长三角(杭州·江干)科技大市场版权所有</p>
			<p>技术支持单位：杭州拾贝知识产权服务有限公司</p>
		</div>
	</div>
</div>
</template>
<script>
export default {
  name: 'detail',
  data () {
    return {
			resultState: true,
			chartData: [],
			tips: '希望您的企业在知识产权、研发费用方面加强布局'
    }
	},
  mounted () {
		let query = this.$route.query;
		console.log('query', this.$route.query)
		// [70, 90, 90]
		query.saleResult == 0 ? this.chartData[0] = 70 : this.chartData[0] = 90;
		this.chartData[1] = query.researchCostResult == 0 ? 70 : 90;
		this.chartData[2] = query.intellectualPropertyResult == 1 ? 90 : 70;
		let goodArr = this.chartData.filter(item => {
			return item > 70;
		})
		setTimeout(() => {
			this.drawLine(this.chartData);
		}, 1000)
		if (goodArr.length > 2) {
			this.resultState = true
		} else {
			this.resultState = false
			if (goodArr.length === 0) {
				this.tips = '希望您的企业在销售、知识产权、研发费用方面加强布局'
				return;
			}
			if(query.saleResult == 0 && query.researchCostResult == 0){
				this.tips = '希望您的企业在销售、研发费用方面加强布局'
				return
			}
			if(query.saleResult == 0 && query.intellectualPropertyResult == 0){
				this.tips = '希望您的企业在销售、知识产权方面加强布局'
				return
			}
			if(query.intellectualPropertyResult == 0 && query.researchCostResult == 0){
				this.tips = '希望您的企业在研发费用、知识产权方面加强布局'
				return
			}
			if (query.saleResult == 0) {
				this.tips = '希望您的企业在销售方面加强布局'
				return
			}
			if (query.researchCostResult == 0) {
				this.tips = '希望您的企业在研发方面加强布局'
				return
			}
			if (query.intellectualPropertyResult == 0) {
				this.tips = '希望您的企业在知识产权方面加强布局'
				return
			}
		}
		console.log(this.chartData, this.resultState, goodArr)

  },
  methods: {
    drawLine(data){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {
              text: ''
          },
          radar: [
              {
                  indicator: [
                      { text: '销售收入增长率', max: 100 },
                      { text: '研发费\n用比例', max: 100 },
                      { text: '知识产权', max: 100 }
                  ],
                  center: ['50%', '55%'],
                  radius: 120,
                  startAngle: 90,
                  splitNumber: 4,
                  shape: 'circle',
                  name: {
											fontSize: '13px',
											width: '40px',
                      formatter:'{value}',
                      textStyle: {
                          color:'#00D2FF'
											}
                  },
                  splitArea: {
                      areaStyle: {
                          color: ['rgba(0, 210, 255, .35)',
                          'rgba(0, 210, 255, .25)', 'rgba(0,210,255,0.15)',
                          'rgba(0,210,255,0.05)'],
                          shadowColor: 'rgba(0, 0, 0, 0.3)',
                          shadowBlur: 1
                      }
                  },
                  axisLine: {
                      lineStyle: {
                        color: 'rgba(0,210,255,0.5)',
                        type: 'dashed'
                      }
                  },
                  splitLine: {
                      lineStyle: {
                          color: 'rgba(0,210,255,0.5)',
                          type: 'dashed'
                      }
                  }
              }
          ],
          series: [
              {
                  name: '雷达图',
                  type: 'radar',
                  itemStyle: {
                      emphasis: {
													// color: 各异,
													width: 1,
                          lineStyle: {
                              width:1,
                              color: '#00D2FF'
                          }
                      }
                  },
                  data: [

                      {
                          value: data,
													symbol: 'circle',
													symbolSize: 5,
													symbolColor: '#00D2FF',
													color: "#00D2FF",
                          lineStyle: {
														normal: {
															type: 'solid',
															width: 1,
															color: '#00D2FF'
														}
													},
													itemStyle: {
														normal: {
															color: "#00D2FF"
														}
													},
                          areaStyle: {
                              normal: {
                                  color: 'rgba(0,210,255,0.4)'
                              }
                          }
                      }
                  ]
              }
          ]
        });
    }
  }
}

</script>

<style lang="scss">
@import  "~assets/css/adaptation.scss";
@import  "~assets/css/cssshake.css";
// html, body{min-height: 100%;}
.residual{
  // min-height: 100%;
  // background:linear-gradient(135deg,rgba(7,76,190,1) 0%,rgba(14,50,111,1) 100%);
	.bgContnet{
		&.goodBg{background: url('~assets/img/detail/goodRes.jpg') no-repeat;background-size: 100% 101%;}
		&.badBg{background: url('~assets/img/detail/badRes.jpg') no-repeat;background-size: 100% 101%;}
	}
	.resultContent{
		text-align: center;
		.resultTit{font-size: px(46);line-height: px(65);color: #fff;}
		.des{font-size: px(26);color:rgba(163,197,255,1);line-height: px(37);padding: px(5) 0 px(10) 0;font-weight: 400;}
		.res{line-height: px(33);font-size: px(24);color:rgba(163,197,255,0.6);padding: 0 px(75);}
		.badImg{width: px(312);margin: px(40) 0 px(60);}
		.goodImg{width: px(170);margin: px(30) 0 px(50);}
		.link, .tel{font-size: px(24);color:rgba(125,157,210,1);line-height: px(33); padding-bottom: px(6);
			a{color: rgba(125,157,210,1);
				&:visited{text-decoration: none;}
			}
		}
	}
	.ewmContnet{
		text-align: center;background:#0a3270;margin-top: -2px;padding-bottom: px(90);
		box-shadow:  0 -10px 40px #0a3270;
		.ewm{width: px(295);margin: px(55) 0 px(20);border-radius: px(10);}
		.connect{font-size: px(26);line-height: px(37);font-weight: 600;color:rgba(125,157,210,1);}
		.news{font-size: px(24);line-height: px(33);padding: px(5) 0 px(0);color:rgba(125,157,210,1);}
	}
	.detailBottom{display: flex;background: #fff;
		img{width: px(200);height:px(150);padding: px(10) px(30) px(10) px(40);}
		>div{flex-grow: 1;padding: px(40) 0 px(35);
			>p{font-size: px(24);color: #999;line-height: px(33);padding-bottom: px(5);}
		}
	}
}
#myChart{height: px(654);}

</style>
