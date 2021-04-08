<template>
  <div class="export_randr">
    <!--echarts云词-->
    <div class="center-table">
      <div class="center-cell">
        <div id="loading">
          <div data-loader="circle" class="loading-animate"></div>
          <div class="loading-tip">正在加载</div>
        </div>

        <div id="radar"></div>

        <div id="tips">该人才暂无相关数据！</div>

        <div id="error_msg"></div>

        <!--vip限制-->
        <div id="vipLimit">
          <img src="~assets/img/picture/vip.png" style="width: 70%;margin-left: 5%">
          <img src="~assets/img/picture/anniu.png" onclick="goMobilePage()" style="width: 40%;margin-top: 10%">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import qs from 'qs'
  import $ from 'jquery' 
  import radarJs from 'assets/js/radar.js'

  const itechUrl = CONFIG.itechUrl;
  let reqUrl = itechUrl + '/api/h5/radarInfo';

  export default {
    data() {
      return {

      }
    },
    mounted(){
      this.getDataFn();
    },
    methods: {
      drawRadarFn (data) {
        var valueArray = [];
        var item = [];
        for (var i = 0; i < data.length; i++) {
          var value = Math.floor((data[i].value - 10) * 1.7);
          if (value > 100) {
            value = 100;
          }

          valueArray.push(value);
          item.push({name: data[i].item, max: 100}
          );
        }
        console.log(555);
        console.log(valueArray);
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('radar'))
        let radarRadius = '68%';
        // 绘制图表
        let option = {
          // title: {
          //   text: '人才能力画像'
          // },
          tooltip: {},
          // legend: {
          //   data: ['人才能力画像']
          // },
          radar: {
            // shape: 'circle',
            indicator: item,
            radius: radarRadius,
            center: ['50%', '50%']
          },
          series: [{
            // name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
              {
                value: valueArray,
                name: '人才能力画像',
                itemStyle: {
                  normal: {
                    color: 'rgba(5, 128, 242, 0.8)'
                  }
                },
                areaStyle: {
                  normal: {
                    color: '#0580f2'
                  }
                }
              }
            ]
          }]
        };
        myChart.setOption(option);
      },
      getDataFn () {
        let query = this.$route.query;
        let self = this;
        let id = query.id || 'e5fe286c-c04f-424d-bd70-0499db8cd00f';
        self.$http.get(reqUrl + '?id=' + id)
        .then((res) => {
          $('#loading').hide();
          if(!res.meta.success){
            var errorNode = $('#error_msg');
            errorNode.text(res.meta.message);
            errorNode.show();
            return false;
          }
          if (res.meta.result === 300) {
            $('#vipLimit').show();
          }else {
            if(res.data.length > 0) {
              console.log(222);
              $('#radar').show();
              var timer = setInterval(function () {    //开启定时器当G2已经载入再开始绘图
                clearInterval(timer);
                self.drawRadarFn(res.data);
              }, 100);
            }else{
              $('#tips').show();
            }
          }
        })
        .catch((err) => {

        });
      }
    },
    filters: {

    }
  }
</script>
<style lang="scss"  >
  @import  "~assets/css/radar.css";
  .export_randr {
    width: 100%; height: 100%; position: absolute;
    .center-cell {position: absolute; height: 100%; width: 100%;}
    #radar {height: 100%;}
  }                                                     
</style>
