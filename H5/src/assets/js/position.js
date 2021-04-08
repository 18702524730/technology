  
 function initFn (keywords_) { 
  var server = CONFIG.itechUrl;  //接口前面的地址
  // var server = 'http://118.178.118.95';  //接口前面的地址

  var keyword = keywords_;

  /**
   * 获取url传递参数值
   */
  function getUrlParam(param) {
    var reg, arr;
    reg = new RegExp("(\\?|&)" + param + "=([^&]*)(&|$)");
    arr = window.location.search.match(reg);
    if (arr)
      return decodeURIComponent(arr[2]);
    else
      return null;
  }

  // 利用 CSS3 旋转 对根容器逆时针旋转 90 度
  var detectOrient = function () {
    var width = document.documentElement.clientWidth,
      height = document.documentElement.clientHeight,
      $wrapper = document.body,
      style = "";
    if (true) { // 不横屏
                // if( width >= height ){ // 横屏
      style += "width:" + width + "px;";  // 注意旋转后的宽高切换
      style += "height:" + height + "px;";
      style += "-webkit-transform: rotate(0); transform: rotate(0);";
      style += "-webkit-transform-origin: 0 0;";
      style += "transform-origin: 0 0;";
    }
    else { // 竖屏
      style += "width:" + height + "px;";
      style += "height:" + width + "px;";
      style += "-webkit-transform: rotate(90deg); transform: rotate(90deg);";
      // 注意旋转中点的处理
      style += "-webkit-transform-origin: " + width / 2 + "px " + width / 2 + "px;";
      style += "transform-origin: " + width / 2 + "px " + width / 2 + "px;";
    }
    $wrapper.style.cssText = style;
  };
  // window.onresize = detectOrient;

  var expertAreaInfoListByKeyword = {};

  /**
   * 获取详情
   */
  function getInfoDetail(keyword) {
    $('#content_detail').hide();
    $('#error_msg').hide();
    $('#prompt_msg').show(); //显示提示
    $('#loading').show();   //显示加载

    //获取主要内容
    $.ajax({
      type: 'GET',
      url: server + '/api/search/mobile/searchUnitAndAreaByKeyword?keyword=' + keyword

    })
      .done(function (res) {
        $('#loading').hide();

        /**处理出错提示**/
        if (!res.meta.success) {
          /**没有数据会报错用，填充空数据**/
          expertAreaInfoListByKeyword=[
            {name:"",value:""},
            {name:"",value:""},
            {name:"",value:""},
            {name:"",value:""},
            {name:"",value:""}
          ]
        }else{
          expertAreaInfoListByKeyword = res.data.areaInfoList;
        }

        /**返回正确时**/
        $('#prompt_msg').hide();
        $('#content_detail').show();

        //todo: 内容填充

        detectOrient();
        build_G_e_map(keyword);
      })
      .fail(function () {
        $('#loading').hide();
        var errorNode = $('#error_msg');
        errorNode.text('服务器正在维护，请稍后重试');
        errorNode.show();
        return false;
      });
  }

  function quickSort(obj) {
    //如果数组<=1,则直接返回
    if (obj.length <= 1) {
      return obj;
    }

    var pivotIndex = Math.floor(obj.length / 2);
    //找基准，并把基准从原数组删除
    var pivot = obj.splice(pivotIndex, 1)[0];
    //定义左右数组
    var left = [];
    var right = [];

    //比基准大的放在left，比基准小的放在right
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].num > pivot.num) {
        left.push(obj[i]);
      }
      else {
        right.push(obj[i]);
      }
    }
    //递归
    return quickSort(left).concat([pivot], quickSort(right));
  }

  /**
   *  石墨烯 expert map
   */
  function build_G_e_map(keyword) {
    var data = [];
    // $('#G_e_map').height($('#G_e_map').width() * 0.7);

    expertAreaInfoListByKeyword = quickSort(expertAreaInfoListByKeyword);
    expertAreaInfoListByKeyword = beautifyMapData(expertAreaInfoListByKeyword);
    expertAreaInfoListByKeyword.forEach(function (item) {
      data.push({name: item.name, value: item.num})
    });


    var geoCoordMap = {
      '甘肃': [103.73, 36.03],
      '青海': [101.74, 36.56],
      '四川': [104.06, 30.67],
      '河北': [114.48, 38.03],
      '云南': [102.73, 25.04],
      '贵州': [106.71, 26.57],
      '湖北': [114.31, 30.52],
      '河南': [113.65, 34.76],
      '山东': [117, 36.65],
      '江苏': [118.78, 32.04],
      '安徽': [117.27, 31.86],
      '浙江': [120.19, 30.26],
      '江西': [115.89, 28.68],
      '福建': [119.3, 26.08],
      '广东': [113.23, 23.16],
      '湖南': [113, 28.21],
      '海南': [110.35, 20.02],
      '辽宁': [123.38, 41.8],
      '吉林': [125.35, 43.88],
      '黑龙江': [126.63, 45.75],
      '山西': [112.53, 37.87],
      '陕西': [108.95, 34.27],
      '台湾': [121.30, 25.03],
      '北京': [116.46, 39.92],
      '上海': [121.48, 31.22],
      '重庆': [106.54, 29.59],
      '天津': [117.2, 39.13],
      '内蒙古': [111.65, 40.82],
      '广西': [108.33, 22.84],
      '西藏': [91.11, 29.97],
      '宁夏': [106.27, 38.47],
      '新疆': [87.68, 43.77],
      '香港': [114.17, 22.28],
      '澳门': [113.54, 22.19]
    };
    var myChart = echarts.init(document.getElementById('G_e_map'));

    var convertData = function (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    };

    var option = {

      backgroundColor: '#fff',
      geo: {
        map: 'china',
        // regions: [{name: '南海诸岛', value: 0, itemStyle: {normal: {opacity: 0, label: {show: false}}}}],

        label: {
          emphasis: {
            show: false
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            borderColor: '#EBF3FC',
            color:"#B8D5F7"
          },
          emphasis: {
            areaColor: '#699ce6',
            borderWidth: 0
          }
        }
      },
      series: [
        {
          type: 'scatter',

          coordinateSystem: 'geo',
          data: convertData(data),
          symbolSize: function (val) {
            return val[2] / 3;
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false,
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#ddb926'
            }
          }
        },
        {
          name: 'Top 5',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(data.sort(function (a, b) {
            return b.value - a.value;
          }).slice(0, 10)),
          symbolSize: function (val) {
            return val[2] / 3;
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true,
              color:"#333"
            }
          },
          itemStyle: {
            normal: {
              color: '#f4e925',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          zlevel: 1
        }
      ]
    };
    // myChart.on('brushselected', renderBrushed);

    setTimeout(function () {
      myChart.dispatchAction({
        type: 'brush',
        areas: [
          {
            geoIndex: 0,
            brushType: 'polygon',
            coordRange: [[119.72, 34.85], [119.68, 34.85], [119.5, 34.84], [119.19, 34.77], [118.76, 34.63], [118.6, 34.6], [118.46, 34.6], [118.33, 34.57], [118.05, 34.56], [117.6, 34.56], [117.41, 34.56], [117.25, 34.56], [117.11, 34.56], [117.02, 34.56], [117, 34.56], [116.94, 34.56], [116.94, 34.55], [116.9, 34.5], [116.88, 34.44], [116.88, 34.37], [116.88, 34.33], [116.88, 34.24], [116.92, 34.15], [116.98, 34.09], [117.05, 34.06], [117.19, 33.96], [117.29, 33.9], [117.43, 33.8], [117.49, 33.75], [117.54, 33.68], [117.6, 33.65], [117.62, 33.61], [117.64, 33.59], [117.68, 33.58], [117.7, 33.52], [117.74, 33.5], [117.74, 33.46], [117.8, 33.44], [117.82, 33.41], [117.86, 33.37], [117.9, 33.3], [117.9, 33.28], [117.9, 33.27], [118.09, 32.97], [118.21, 32.7], [118.29, 32.56], [118.31, 32.5], [118.35, 32.46], [118.35, 32.42], [118.35, 32.36], [118.35, 32.34], [118.37, 32.24], [118.37, 32.14], [118.37, 32.09], [118.44, 32.05], [118.46, 32.01], [118.54, 31.98], [118.6, 31.93], [118.68, 31.86], [118.72, 31.8], [118.74, 31.78], [118.76, 31.74], [118.78, 31.7], [118.82, 31.64], [118.82, 31.62], [118.86, 31.58], [118.86, 31.55], [118.88, 31.54], [118.88, 31.52], [118.9, 31.51], [118.91, 31.48], [118.93, 31.43], [118.95, 31.4], [118.97, 31.39], [118.97, 31.37], [118.97, 31.34], [118.97, 31.27], [118.97, 31.21], [118.97, 31.17], [118.97, 31.12], [118.97, 31.02], [118.97, 30.93], [118.97, 30.87], [118.97, 30.85], [118.95, 30.8], [118.95, 30.77], [118.95, 30.76], [118.93, 30.7], [118.91, 30.63], [118.91, 30.61], [118.91, 30.6], [118.9, 30.6], [118.88, 30.54], [118.88, 30.51], [118.86, 30.51], [118.86, 30.46], [118.72, 30.18], [118.68, 30.1], [118.66, 30.07], [118.62, 29.91], [118.56, 29.73], [118.52, 29.63], [118.48, 29.51], [118.44, 29.42], [118.44, 29.32], [118.43, 29.19], [118.43, 29.14], [118.43, 29.08], [118.44, 29.05], [118.46, 29.05], [118.6, 28.95], [118.64, 28.94], [119.07, 28.51], [119.25, 28.41], [119.36, 28.28], [119.46, 28.19], [119.54, 28.13], [119.66, 28.03], [119.78, 28], [119.87, 27.94], [120.03, 27.86], [120.17, 27.79], [120.23, 27.76], [120.3, 27.72], [120.42, 27.66], [120.52, 27.64], [120.58, 27.63], [120.64, 27.63], [120.77, 27.63], [120.89, 27.61], [120.97, 27.6], [121.07, 27.59], [121.15, 27.59], [121.28, 27.59], [121.38, 27.61], [121.56, 27.73], [121.73, 27.89], [122.03, 28.2], [122.3, 28.5], [122.46, 28.72], [122.5, 28.77], [122.54, 28.82], [122.56, 28.82], [122.58, 28.85], [122.6, 28.86], [122.61, 28.91], [122.71, 29.02], [122.73, 29.08], [122.93, 29.44], [122.99, 29.54], [123.03, 29.66], [123.05, 29.73], [123.16, 29.92], [123.24, 30.02], [123.28, 30.13], [123.32, 30.29], [123.36, 30.36], [123.36, 30.55], [123.36, 30.74], [123.36, 31.05], [123.36, 31.14], [123.36, 31.26], [123.38, 31.42], [123.46, 31.74], [123.48, 31.83], [123.48, 31.95], [123.46, 32.09], [123.34, 32.25], [123.22, 32.39], [123.12, 32.46], [123.07, 32.48], [123.05, 32.49], [122.97, 32.53], [122.91, 32.59], [122.83, 32.81], [122.77, 32.87], [122.71, 32.9], [122.56, 32.97], [122.38, 33.05], [122.3, 33.12], [122.26, 33.15], [122.22, 33.21], [122.22, 33.3], [122.22, 33.39], [122.18, 33.44], [122.07, 33.56], [121.99, 33.69], [121.89, 33.78], [121.69, 34.02], [121.66, 34.05], [121.64, 34.08]]
          }
        ]
      });
    }, 0);


    function renderBrushed(params) {
      var mainSeries = params.batch[0].selected[0];

      var selectedItems = [];
      var categoryData = [];
      var barData = [];
      var maxBar = 30;
      var sum = 0;
      var count = 0;

      for (var i = 0; i < mainSeries.dataIndex.length; i++) {
        var rawIndex = mainSeries.dataIndex[i];
        var dataItem = convertedData[0][rawIndex];
        var pmValue = dataItem.value[2];

        sum += pmValue;
        count++;

        selectedItems.push(dataItem);
      }

      selectedItems.sort(function (a, b) {
        return a.value[2] - b.value[2];
      });

      for (var i = 0; i < Math.min(selectedItems.length, maxBar); i++) {
        categoryData.push(selectedItems[i].name);
        barData.push(selectedItems[i].value[2]);
      }

      this.setOption({
        yAxis: {
          data: categoryData
        },
        xAxis: {
          axisLabel: {show: !!count}
        },
        title: {
          id: 'statistic',
          text: count ? '平均: ' + (sum / count).toFixed(4) : ''
        },
        series: {
          id: 'bar',
          data: barData
        }
      });
    }


    myChart.setOption(option);
  }

  /**
   * 美化地图数据
   * @param obj
   * @returns {*}
   */
  function beautifyMapData(item) {
    //不能大于120不然圆会过大
    //获取最大值
    var maxValue = item[0].num;
    var scale = 120 / item[0].num;
    var value;

    item.forEach(function (item) {
      value = item.num * scale;

      // if(value==0){
      //   如果要保证每个地区都有点
      //   value=10;
      // }


      item.num = value;

    });
    //把其他地区的数量在适当提高点
    if (item[1].num < 115) {
      item[1].num = 115
    }
    if (item[2].num < 110) {
      item[2].num = 110
    }
    if (item[3].num < 100) {
      item[3].num = 100
    }
    if (item[4].num < 90) {
      item[4].num = 90
    }


    return item;
  }


  getInfoDetail(keyword);

}


export default {
  initFn
}
