import $ from 'jquery' 

function initFn () {
  var server = 'https://www.itech4u.cn';
  // var server = 'http://118.178.118.95';
  // var server = 'http://192.168.1.66:8080';
  (function () {
    // 获取url传递参数值
    function getUrlParam(param) {
      var reg, arr;
      reg = new RegExp("(\\?|&)" + param + "=([^&]*)(&|$)");
      arr = window.location.search.match(reg);
      if (arr)
        return decodeURIComponent(arr[2]);
      else
        return null;
    }

    /**
     * echarts 雷达图
     */
    function radarChart(id, data) {
      var radarWidth, radarRadius;
      // if (document.documentElement.clientWidth < 400) {
      radarWidth = document.documentElement.clientWidth - 40;
      radarRadius = '68%';
      // } else {
      //   radarRadius = 100;
      //   radarWidth = 400;
      // }
      $('#radarGraphic').width(radarWidth);
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

      var myChart = echarts.init(document.getElementById(id));
      var option = {
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

    }

    /**
     * 获取云词数据
     */
    $('#loading').show();
      var reqUrl,reqData;
      if(getUrlParam('token')){
          reqUrl = server + '/api/expert/mobile/radarInfo';
          reqData = {id: getUrlParam('id'), token: getUrlParam('token')};
      }else{
          reqUrl = server+'/api/h5/radarInfo';
          reqData = {id: getUrlParam('id')};
      }
    $.ajax({
      type: 'GET',
      url: reqUrl,
      data: reqData,
      dataType: 'json'
    })
      .done(function (res) {
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
            $('#radar').show();
            var timer = setInterval(function () {    //开启定时器当G2已经载入再开始绘图
              if (typeof echarts !== 'undefined') {
                clearInterval(timer);
                radarChart("radar", res.data);
              }
            }, 100);
          }else{
            $('#tips').show();
          }
        }
      })
      .fail(function () {
        $('#loading').hide();
        var errorNode = $('#error_msg');
        errorNode.text('服务器正在维护，请稍后重试');
        errorNode.show();
        return false;
      });

  }());

  function goMobilePage() {
    // iOS、android移动端调用本地接口
    var os = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(os)) {
      window.location.href = "buyVip";
    } else if (/android/.test(os)) {
      window.share.buyVip();
    }
  }

}


export default {
  initFn
}