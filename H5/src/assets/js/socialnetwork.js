import $ from 'jquery'
// import * as d3 from 'd3'
let d3 = require('d3')

function initFn (id_) {
var server = CONFIG.itechUrl;
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
   * 社会网络图
   */
  function socialNetwork(data) {
    var timer = setInterval(function () {
      function draw(data) {
        function addNodeType(children, depth, parentType) {
          children.forEach(function (d, i) {
            try {
              d.type = depth == 1 ? d.type : parentType;
            } catch (e) {
              console.error(children);
            }

            d.children && d.children.length > 0 && addNodeType(d.children, 1 + depth, d.type);
          });
        }

        if (data.children && data.children.length > 0) {
          data.children.sort(function (a, b) {
            return +a.type - +b.type
          });
          addNodeType(data.children, 1);
        }

        var nodes = tree.nodes(data), links = tree.links(nodes);

        var node = nodeG.selectAll(".node").data(nodes, function (d) {
          return d.id;
        });

        var enter_node = node.enter().append("g")
          .attr("class", "node")
          .attr("transform", function (d, i) {
            return (i == 0 ? "rotate(0)" : "rotate(" + (d.x - 90) + ")" ) + " translate(" + d.y + ")";
          })
          .on('mouseover', function (d, i) {
            i == 0 && d3.select(this).select('circle').style('stroke-opacity', 1);
            //d3.select(this).select('text').classed('bold', true);
          })
          .on('mouseout', function (d, i) {
            i == 0 && d3.select(this).select('circle').style('stroke-opacity', 0);
            //d3.select(this).select('text').classed('bold', false);
          });

        enter_node.append("circle")
          .on('click', clickNode)
          .attr("r", function (d) {
            return (d.size || 2) * 3
          })
          .style('fill', function (d) {
            return color[d.type];
          });

        //.style('stroke',function(d){ return 'black';});//有孩子的节点添加黑圈

        enter_node.append("text")
          .on('click', clickNode)
          .attr("class", "plus")
          .attr("dy", ".31em")
          .text(function (d) {
            if (d.id == 0 || d.id == 1 || d.id == 2 || d.id == 3)
              return;
            // if(d.children && d.children.length > 0)
            // 	return "-";
            if (d._children && d._children.length > 0)
              return "+";
          });


        var texts = enter_node.append("text")
          .on('click', clickNodeText)
          .attr("dx", function (d, i) {
            return i == 0 ? '0em' : "0em";
          })
          .attr("dy", function (d, i) {
            return i == 0 ? '-1em' : ".31em";
          })
          .attr("text-anchor", function (d, i) {
            return i == 0 ? 'middle' : d.x < 180 ? "start" : "end";
          })
          .attr("transform", function (d, i) {
            return i == 0 ? "rotate(0)" : d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)";
          })
          .text(function (d) {
            return d.name;
          });

        var nodeUpdate = node.transition()
          .duration(duration)
          .attr("transform", function (d, i) {
            return (i == 0 ? "rotate(0)" : "rotate(" + (d.x - 90) + ")" ) + " translate(" + d.y + ")";
          })
          .select('circle').style('stroke-width', function (d) {
            return d._children && d._children.length > 0 ? 1 : 0;
          })

        node.select('.plus')
          .text(function (d) {
            if (d.id == 0 || d.id == 1 || d.id == 2 || d.id == 3)
              return;
            if (d.children && d.children.length > 0)
              return "-";
            if (d._children && d._children.length > 0)
              return "+";
          });

        node.exit().remove();

        var link = linkG.selectAll(".link")
          .data(links);

        link.enter().append("path")
          .attr("class", "link")
          .attr("d", diagonal)
          .style('stroke', function (d) {
            return color[d.target.type];
          })
          .style('stroke-width', function (d) {
            return d.target.thickness || 2;
          });

        link.style('stroke', function (d) {
          return color[d.target.type];
        }).transition()
          .duration(duration)
          .attr("d", diagonal);

        link.exit().remove();

        var transform = d3.transform(root.attr('transform'));
        var rootNode = nodeG.select('.node');
        var rootNodeTran = d3.transform(rootNode.attr('transform'));
        rootNodeTran.rotate = -transform.rotate;
        rootNode.attr('transform', rootNodeTran.toString());
      }

      function init(treeData) {
        if (!treeData.children && treeData.children.length == 0)
          return treeData;
        for (var j = treeData.children.length - 1; j >= 0; j--) {
          var second = treeData.children[j];
          treeData.children[j] = init(second);
          if (second.children && second.children.length > 0) {
            second._children = second.children;
            second.children = null;
          }
        }
        return treeData;
      }

      function clickNodeText(d) {
        if (d.link) location.href = d.link;
      }

      function clickNode(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        draw(rootData);
      }

      function findData(arr, attr) {
        var index = -1;
        for (var i = arr.length - 1; i >= 0; i--) {
          if (arr[i].type == attr) {
            index = i;
            break;
          }
        }
        if (index > -1)
          return arr.splice(index, 1)[0];
        return null;
      }

      //开启定时器当G2已经载入再开始绘图
      if (typeof d3 !== 'undefined') {
        clearInterval(timer);
        var svg = d3.select("svg");
        var color = ['rgb(255, 102, 0)', 'rgb(0, 151, 218)', 'rgb(1, 179, 202)', 'rgb(95, 188, 41)', 'rgb(250, 196, 80)', 'rgb(228, 36, 155)', 'rgb(88, 45, 170)'];
        var diameter = 960, duration = 750;
        var client = svg.node().getBoundingClientRect();
        var center = [client.width / 2, client.height / 2];
        var tree = d3.layout.tree().size([340, 120]);

        var diagonal = d3.svg.diagonal.radial()
          .projection(function (d) {
            return [d.y, d.x / 180 * Math.PI];
          });

        var root = svg.append("g").attr("transform", "translate(" + center.join() + ")");
        var linkG = root.append('g').classed('linkG', true);
        var nodeG = root.append('g').classed('nodeG', true);

        var rootData = {}, tempData = [];

        if (data && data.children) {
          for (var i = data.children.length - 1; i >= 0; i--) {
            var first = data.children[i];
            data.children[i] = init(first);//new
            for (var j = first.children.length - 1; j >= 0; j--) {
              var second = first.children[j];
              if (second.children && second.children.length > 0) {
                second._children = second.children;
                second.children = null;
              }
            }
          }
        }
        rootData = data.data;
        draw(rootData);

        var zoom = d3.behavior.zoom()
          .scaleExtent([.5, 3])
          .translate(center)
          .center(center)
          .on("zoom", function () {
            var transform = d3.transform(root.attr('transform'));
            transform.translate = d3.event.translate;
            transform.scale = d3.event.scale;
            root.attr("transform", transform.toString());
          });
        svg.call(zoom);

        d3.selectAll('.filter-item').on('click', function (d) {
          var _this = d3.select(this).select('.filter-item-checkbox');
          var isAll = !d3.select(this).select('.check-all').empty();
          if (isAll) {
            d3.select('#check-allInput').property('checked', !d3.select('#check-allInput').property('checked'));
            var checked = d3.select('#check-allInput').property('checked');
            if (checked) {
              if (!rootData.children) rootData.children = [];
              d3.selectAll('.filter-item-checkbox').classed('checked', true).classed('unchecked', false);
              for (var i = tempData.length - 1; i >= 0; i--)
                rootData.children.push(tempData[i]);
              tempData = [];
            } else {
              d3.selectAll('.filter-item-checkbox').classed('checked', false).classed('unchecked', true);
              if (!rootData.children) return;
              for (var i = rootData.children.length - 1; i >= 0; i--)
                tempData.push(rootData.children[i]);
              rootData.children = [];
            }
          } else {
            _this.classed('unchecked', !_this.classed('unchecked'));
            _this.classed('checked', !_this.classed('checked'));

            var all = true;
            d3.selectAll('.filter-item-checkbox').each(function (d) {
              if (!d3.select(this).classed('checked')) all = false;
            });
            d3.select('#check-allInput').property('checked', all);

            var type = +_this.attr('data-type');
            if (_this.classed('unchecked')) {
              var index = -1;
              for (var i = rootData.children.length - 1; i >= 0; i--) {
                if (rootData.children[i].type == type) {
                  index = i;
                  break;
                }
              }
              var _data = findData(rootData.children, type);
              if (_data != null)
                tempData.push(_data);
            } else {
              var _data = findData(tempData, type);
              if (!rootData.children) rootData.children = [];
              if (_data != null && _data != undefined) rootData.children.push(_data);
            }
          }

          draw(rootData);
        });

        d3.select("#in").on('click', function () {
          var transform = d3.transform(root.attr('transform'));
          transform.scale[0] /= 1.1;
          transform.scale[1] /= 1.1;
          root.attr('transform', transform.toString());
        });

        d3.select("#out").on('click', function () {
          var transform = d3.transform(root.attr('transform'));
          transform.scale[0] *= 1.1;
          transform.scale[1] *= 1.1;
          root.attr('transform', transform.toString());
        });

        d3.select("#cw").on('click', function () {
          var transform = d3.transform(root.attr('transform'));
          transform.rotate += 20;
          root.attr('transform', transform.toString());

          var rootNode = nodeG.select('.node');
          var rootNodeTran = d3.transform(rootNode.attr('transform'));
          rootNodeTran.rotate = -transform.rotate;
          rootNode.attr('transform', rootNodeTran.toString());

        });

        d3.select("#ccw").on('click', function () {
          var transform = d3.transform(root.attr('transform'));
          transform.rotate -= 20;
          root.attr('transform', transform.toString());

          var rootNode = nodeG.select('.node');
          var rootNodeTran = d3.transform(rootNode.attr('transform'));
          rootNodeTran.rotate = -transform.rotate;
          rootNode.attr('transform', rootNodeTran.toString());
        });
      }
    }, 100);
  }

  /**
   * 获取云词数据
   */
  $('#loading').show();
    var reqUrl,reqData;
    if(getUrlParam('token')){
        reqUrl = server + '/api/expert/mobile/socialNetwork';
        reqData = {id: getUrlParam('id'), token: getUrlParam('token')};
    }else{
        reqUrl = server+'/api/h5/socialNetwork';
        reqData = {id: id_};
    }
  $.ajax({
    type: 'GET',
    url: reqUrl,
    data: reqData,
    dataType: 'json'
  })
    .done(function (res) {
      $('#loading').hide();
      if (!res.meta.success) {
        var errorNode = $('#error_msg');
        errorNode.text(res.meta.message);
        errorNode.show();
        return false;
      }
      if (res.meta.result === 300) {
        $('#vipLimit').show();
      } else {
        $('#socialNetwork').show();
        socialNetwork(res);
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
