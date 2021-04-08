<template>
  <div class="words">
		<div id="myChart" class="myChart"></div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import qs from 'qs'
  import homeJs from 'assets/js/home.js'
  import 'echarts-wordcloud';
  const itechUrl = CONFIG.itechUrl;
  const wordUrl = itechUrl + '/api/h5/getExpertFocusArea';
  export default {
    data() {
      return {
      	wordCloud:[]
      }
    },
    mounted(){
    	this.search();
      // this.drawLine();
    },
    methods: {
    	search(){
    		let id = this.$route.query.id || '';
    		this.$http.get(wordUrl+'?expertId=' + id)
    		.then((resp)=>{
    			this.wordCloud = resp.data;
    			this.drawLine();
    			console.log(resp)
    		})
    	},
    	drawLine(){
	        // 基于准备好的dom，初始化echarts实例
	        let myChart = this.$echarts.init(document.getElementById('myChart'))
	        let wordCloud = this.wordCloud;
	        let data = [];
			    for (var i = 0; i < wordCloud.length; i++) {
			      data.push({
			        name: wordCloud[i],
			        value: Math.floor(Math.random() * 10 + 10)
			      });
			    }
			    let option = {
			      series: [{
			        name: '热点分析',
			        type: 'wordCloud',
			        sizeRange: [13,25],
			        rotationRange: [0, 0],
			        textPadding: 0,
			        autoSize: {
			          enable: true,
			          minSize: 0
			        },
			        textStyle: {
			          normal: {
			            color: function () {
			              return 'rgb(' + [
		                  Math.round(Math.random() * 160),
		                  Math.round(Math.random() * 160),
		                  Math.round(Math.random() * 160)
		                ].join(',') + ')';
			            }
			          },
			          emphasis: {
			            shadowBlur: 10,
			            shadowColor: '#333'
			          }
			        },
			        data: data
			      }]
			    };
	        // 绘制图表
	        myChart.setOption(option);
	    }

    },
    filters: {
    }
  }
</script>
<style lang="scss"  >
  @import  "~assets/css/index.css";
  .words{
  	position: absolute; width: 100%; height: 100%;
		.myChart {width: 100%; height: 100%;}
  }                                                     
</style>
