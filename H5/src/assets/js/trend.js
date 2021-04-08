
function initFn (keywords_) {
  var server = CONFIG.itechUrl;  //接口前面的地址
  // var server = 'http://118.178.118.95';

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
  var detectOrient = function() {
    var width = document.documentElement.clientWidth,
      height =  document.documentElement.clientHeight,
      $wrapper =  document.body,
      style = "";
    if( true ){ // 不横屏
    // if( width >= height ){ // 横屏
      style += "width:" + width + "px;";  // 注意旋转后的宽高切换
      style += "height:" + height + "px;";
      style += "-webkit-transform: rotate(0); transform: rotate(0);";
      style += "-webkit-transform-origin: 0 0;";
      style += "transform-origin: 0 0;";
    }
    else{ // 竖屏
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

  var trendByKeyword = {};
  /**
   * 获取详情
   */
  function getInfoDetail(keyword) {
    $('#content_detail').show();
    $('#error_msg').hide();
    $('#prompt_msg').show(); //显示提示
    $('#loading').show();   //显示加载

    //获取主要内容
    $.ajax({
      type: 'GET',
      url: server + '/api/search/mobile/searchTrendByKeyword?keyword='+keyword
    })
      .done(function (res) {
        $('#loading').hide();

        /**处理出错提示**/
        if (!res.meta.success) {
          var errorNode = $('#error_msg');
          errorNode.text(res.meta.message);
          errorNode.show();
          return false;
        }

        /**返回正确时**/
        $('#prompt_msg').hide();
        $('#content_detail').show();

        //todo: 内容填充
        trendByKeyword = res.data;
        detectOrient();
        build_G_s_trend(keyword);
      })
      .fail(function () {
        $('#loading').hide();
        var errorNode = $('#error_msg');
        errorNode.text('服务器正在维护，请稍后重试');
        errorNode.show();
        return false;
      });
  }

  /**
   * 研究趋势
   */
  function build_G_s_trend(keyword) {
    var trend_year = [];
    var trend_num = [];

    //控制div的宽高比 这里宽等于高
    // $('#G_s_trend').height($('#G_s_trend').width() * 0.7);
    trendByKeyword.forEach(function (item) {
      trend_year.push(item.year);
      trend_num.push(item.num);
    });

    var myChart = echarts.init(document.getElementById('G_s_trend'));

    var option = {
      // backgroundColor: '#fff',
      // title: {
      //   text: "#" + $scope.getSubjectName(subject) + "#研究趋势",
      //   top: "3%",
      //   left: "2%"
      // },
      tooltip: {
        trigger: 'axis', //触发类型。[ default: 'item' ] :数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用;'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
        axisPointer: {
          type: 'cross',
          lineStyle: {
            color: '#000'
          }
        }
      },
      grid: {
        left: '1%', //grid 组件离容器左侧的距离。
        right: '3%', //grid 组件离容器右侧的距离。
        bottom: '15%', //grid 组件离容器下侧的距离。
        top: '10%',
        containLabel: true //grid 区域是否包含坐标轴的刻度标签[ default: false ]
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
        axisLine: {
          lineStyle: {
            color: '#000' //坐标轴线线的颜色。
          }
        },
        data: trend_year
      }],
      yAxis: [
        {
          type: 'value', //坐标轴类型。'value' 数值轴，适用于连续数据;'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据;'time' 时间轴;'log' 对数轴.
          // name: '成果数', //坐标轴名称。
          // max: 10,
          min:10,
          axisTick: {
            show: false //是否显示坐标轴刻度
          },
          axisLine: {
            lineStyle: {
              color: '#000' //坐标轴线线的颜色
            }
          },
          axisLabel: {
            margin: 10, //刻度标签与轴线之间的距离
            textStyle: {
              fontSize: 14 //文字的字体大小
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              opacity: "0.5"
            }
          }
        }
      ],
      series: [{
        name: '相关文献', //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列
        type: 'line',
        smooth: true, //是否平滑曲线显示
        symbol: 'circle', //标记的图形。ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
        symbolSize: 5, //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10[ default: 4 ]
        showSymbol: false, //是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示
        lineStyle: { //线条样式
          normal: {
            width: 2 //线宽。[ default: 2 ]
          }
        },
        areaStyle: { //区域填充样式
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //填充的颜色。
              offset: 0, // 0% 处的颜色
              color: '#40a9ed'
            }, {
              offset: 0.8, // 80% 处的颜色
              color: '#edfbfb'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)', //阴影颜色。支持的格式同color
            shadowBlur: 10 //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
          }
        },
        itemStyle: { //折线拐点标志的样式
          normal: {
            color: '#40a9ed',
            borderColor: 'rgba(137,189,2,0.27)', //图形的描边颜色。支持的格式同 color
            borderWidth: 12 //描边线宽。为 0 时无描边。[ default: 0 ]

          }
        },
        data: trend_num
      }]
    };

    myChart.setOption(option);
  }

  getInfoDetail(keyword);
}



export default {
  initFn
}
