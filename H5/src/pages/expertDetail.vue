<template>
  <div class="export_detail">
    <!--主要内容-->
    <div id="content_detail">
      <div class="header">
        <div class="expert-info">
          <div class="expert-info__avatar">
          </div>
          <div class="expert-info__mien" @click="exportDetail.showExpertDetail()">专家风采<span class="icon">&gt;</span></div>
          <div class="expert-info__baseInfo">
            <div class="item1">
              <span class="name">姓名</span>
            </div>
            <div class="item2">
              <img class="unit-icon" src="~assets/img/picture/unit.png">
              <span class="unit-name">单位</span>
            </div>
            <div class="item3">
              <div class="item patent"><img class="icon" src="~assets/img/picture/patent.png"><span class="count">
                        <span class="all">...</span></span>
              </div>
              <div class="item paper"><img class="icon" src="~assets/img/picture/paper.png"><span class="count">
                        <span class="all">...</span></span>
              </div>
              <div class="item project"><img class="icon" src="~assets/img/picture/project.png"><span class="count">
                        <span class="all">...</span></span>
              </div>
            </div>
          </div>
        </div>
        <div class="expert-atlas flex-box flex-flow--row">
          <div class="item" onclick="goSocialNetwork()">
            <div class="figure">
              <img class="I" src="~assets/img/picture/social_network.png">
            </div>
            <div class="caption">
              自我网络
            </div>
          </div>
          <div class="item" onclick="goRadar()">
            <div class="figure">
              <img class="I" src="~assets/img/picture/radar.png">
            </div>
            <div class="caption">
              综合表征
            </div>
          </div>
          <div class="item" onclick="goNetWord()">
            <div class="figure">
              <img class="I" src="~assets/img/picture/net_word.png">
            </div>
            <div class="caption">
              领域云图
            </div>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="resultList-wp">
          <div class="search-filter">
            <div class="flex-box search-filter__level1 flex-flow--row justify-content--spaceAround align-items--center">
              <div class="item patent selected" onclick="changeFilterType('patent')">专利</div>
              <div class="item paper" onclick="changeFilterType('paper')">论文</div>
              <div class="item project" onclick="changeFilterType('project')">项目</div>
            </div>
          </div>
          <div id="result_list">
          </div>
        </div>

        <!--提示信息-->
        <div id="prompt_msg" style="height: 300px">
          <div class="center-table">
            <div class="center-cell">
              <!--加载动画-->
              <div id="loading">
                <div data-loader="circle" class="loading-animate"></div>
                <div class="loading-tip">正在加载</div>
              </div>
              <!--错误提示-->
              <div id="error_msg"></div>
            </div>
          </div>
        </div>
      </div>

      <!--模态框 start-->
      <div role="dialog" class="fade modal-backdrop" style="z-index: 1040;"></div>
      <div tabindex="-1" role="dialog" class="modal fade" style="z-index: 1050;">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <span class="window-close">×</span>
            <div class="expertDetail-wp">
              <div class="userInfo" id="expert_detail">
                <div class="item">
                  <div class="title">
                    <span class="expertName">姓名</span>
                    <span class="expertTitle tag">头衔</span>
                    <span class="expertEducation tag">学历</span>
                  </div>
                  <div class="content">
                    <span class="expertUnit">学校</span><b>·</b><span class="college">学院</span>
                    <p class="ability"></p>
                  </div>
                </div>
                <div class="item">
                  <div class="title">
                    个人简介
                  </div>
                  <div class="content">
                    <p class="introduction"></p>
                  </div>
                </div>
                <div class="item">
                  <div class="title">
                    科技成果
                  </div>
                  <div class="content">
                    <p class="achievementIntroduction"></p>
                  </div>
                </div>
                <div class="item">
                  <div class="title">
                    所获荣誉
                  </div>
                  <div class="content">
                    <p class="honor">
                      徐小良：男，1976年4月生，浙江东阳人，博士，教授，硕士生导师，杭州电子科技大学软件所副所长，移动互联应用实验室主任，浙江省“151人才”，浙江省人工智能学会理事，中国计算机学会会员，杭州市移动互联网技术学会理事，浙江省科技厅评审专家、浙江省政法委和商务厅信息化专家委员会成员。主要研究领域为大数据与知识图谱、人工智能、类脑计算、自然语言处理、搜索引擎、移动互联网等，曾主持和参与了多项国家自然科学基金项目、国防预演项目、浙江省重大科技专项、产学研项目等，在国内外期刊及国际学术会议上发表论文40余篇，授权发明专利6项，获浙江省科技进步奖三等奖一项。与华为技术有限公司、浙江省科技信息研究院、杭州三汇数字信息有限公司、杭州迈可行通信股份有限公司等建立了良好的合作关系。目前，实验室主要承担国家自然科学基金项目“面向大数据近似查询应用的在线聚集融合机制与优化研究”、“基于神经拟态模型的并发数据流无监督在线异常检测技术”、浙江省重点研发项目“促进成果转化的科技大数据服务平台开发及应用”等。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--模态框 end-->
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import qs from 'qs'
  import exportDetail from 'assets/js/exportDetail.js'
  import $ from 'jquery' 

  export default {
    data() {
      return {
        exportDetail: exportDetail
      }
    },
    mounted(){
      let keyword = this.$route.query.expertId;
      if (keyword) {
        exportDetail.search(keyword)
      }
      var bodyEl = document.body;
      var top = 0;
      function stopBodyScroll (isFixed) {
          if (isFixed) {
              top = window.scrollY;

              bodyEl.style.position = 'fixed';
              bodyEl.style.top = -top + 'px';
          } else {
              bodyEl.style.position = '';
              bodyEl.style.top = '';

              window.scrollTo(0, top) // 回到原先的top
          }
      }
      function hideModal(event) {
          $('[role="dialog"]').removeClass('in');
          stopBodyScroll(false);
      }
      $('.window-close').on('click', hideModal);
    },
    methods: {

    },
    filters: {

    }
  }
</script>
<style lang="scss"  >
  @import  "~assets/css/index_5.css";
  .index_list {

  }                                                     
</style>
