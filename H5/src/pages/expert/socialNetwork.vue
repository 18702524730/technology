<template>
  <div class="export_socialNetwork">
    <!--echarts云词-->
    <div class="center-table">
      <div class="center-cell">
        <div id="loading">
          <div data-loader="circle" class="loading-animate"></div>
          <div class="loading-tip">正在加载</div>
        </div>

        <div id="socialNetwork">
          <div class="socialNetwork font-14">
            <ul class="filter-container">
              <li class="filter-item">
                <div class="check-all">
                  <input class="hidden" checked="checked" type="checkbox" id="check-allInput">
                  <label for="check-allInput"></label>
                </div>
                <span>全选</span>
              </li>
              <li class="filter-item">
                <div class="filter-item-checkbox type1 checked" data-type='1'></div>
                <span>项目</span>
              </li>
              <li class="filter-item">
                <div class="filter-item-checkbox type2 checked" data-type='2'></div>
                <span>论文</span>
              </li>
              <li class="filter-item">
                <div class="filter-item-checkbox type3 checked" data-type='3'></div>
                <span>专利</span>
              </li>
            </ul>

            <div class="operation-section" style="display: block;">
              <div class="operation-container">
                <div id="out" title="放大" class="operation-scale-up operation-tool"></div>
                <div class="operation-seperator"></div>
                <div id="in" title="缩小" class="operation-scale-down operation-tool"></div>
              </div>
              <div style="margin-top: 17px;" class="operation-container">
                <div id="ccw" title="逆时针旋转" class="operation-rotate-left operation-tool"></div>
                <div class="operation-seperator"></div>
                <div id="cw" title="顺时针旋转" class="operation-rotate-right operation-tool"></div>
              </div>
            </div>
            <br>
            <svg width="100%" height="700">

            </svg>
          </div>
        </div>

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
  import socialnetworkJs from 'assets/js/socialnetwork.js' 

  export default {
    data() {
      return {

      }
    },
    mounted(){
      let id = this.$route.query.id || 'e5fe286c-c04f-424d-bd70-0499db8cd00f';
      socialnetworkJs.initFn(id)
    },
    methods: {

    },
    filters: {

    }
  }
</script>
<style lang="scss"  >
  @import  "~assets/css/socialnetwork.css";
  .export_socialNetwork {

  }                                                     
</style>
