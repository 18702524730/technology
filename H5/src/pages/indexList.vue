<template>
  <div class="index_list">
    <!--提示信息-->
    <div class="center-table" id="prompt_msg">
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

    <!--主要内容-->
    <div id="content_detail">
      <div class="header">
        <div class="header-bg">
          <img class="bg-image" src="~assets/img/picture/bg.png">
          <div class="search-bar">
            <div class="search-bar--wp">
              <img class="search-bar__icon" src="~assets/img/picture/sousuo_gray.png" onclick="goSearch()">
              <input id="search_input" class="search-bar__input" type="text" placeholder="请输入科技关键词、人名、单位等关键词"
                     onkeydown="enterEvent(event)" onfocus="showSuggest()">
              <div class="search-suggest">
                <ul></ul>
              </div>
            </div>
          </div>
        </div>
        <div class="app-nav flex-box flex-flow--row">
          <div class="item" onclick="goExpertSearch()">
            <div class="figure">
              <img class="I" src="~assets/img/picture/s_expert.png">
            </div>
            <div class="caption">人才搜索</div>
          </div>
          <div class="item" onclick="goSemanticSearch()">
            <div class="figure">
              <img class="I" src="~assets/img/picture/s_semantic.png">
            </div>
            <div class="caption">语义搜索</div>
          </div>
          <div class="item" onclick="goBigData()">
            <div class="figure">
              <img class="I" src="~assets/img/picture/s_data.png">
            </div>
            <div class="caption">科技大数据</div>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="expertMien">
          <div class="expertMien__title">
            <div class="logo">
              <img class="I" src="~assets/img/picture/expert_mien.png">
            </div>
            <div class="more" onclick="goExpertMien()"><span>更多</span><span class="icon">&gt;</span></div>
          </div>
          <div class="expertMien__list">
          </div>
        </div>
        <div class="successCase">
          <div class="successCase__title">
            <div class="logo">
              <img class="I" src="~assets/img/picture/success_case.png">
            </div>
          </div>
          <div class="successCase__list">
            <ul id="successCase_list">
            </ul>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="item1">
          <span class="B" style="margin-right: .1rem"><a onclick="goDesktopPage()">电脑版</a></span>|<span class="B"
                                                                                                        style="margin-left: .1rem"><a
          style="color:#3F92F9" onclick="goAppDownload()">APP下载</a></span>
        </div>
        <div class="item2">
          <div class="c-copyright">
            <p>Copyright © 2018 杭州佐创智能科技有限公司 版权所有.</p>
            <p><a href="http://www.miitbeian.gov.cn" target="_blank">浙ICP备17016397号</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import qs from 'qs'
  import homeJs from 'assets/js/home.js'

  export default {
    data() {
      return {

      }
    },
    mounted(){
      homeJs.getExpertMienList();
      homeJs.getSuccessCaseList();
    },
    methods: {

    },
    filters: {

    }
  }
</script>
<style lang="scss"  >
  @import  "~assets/css/adaptation.scss";
  @import  "~assets/css/index.css";
  .index_list {

  }                                                     
</style>
