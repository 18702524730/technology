<template>
  <div class="big_position">

    <!--提示信息-->
    <div class="center-table" id="prompt_msg" style="display: none;">
      <div class="center-cell">
        <!--加载动画-->
        <div id="loading" style="display: none;">
          <div data-loader="circle" class="loading-animate"></div>
          <div class="loading-tip">正在加载</div>
        </div>
        <!--错误提示-->
        <div id="error_msg" style="display: none;"></div>
      </div>
    </div>

    <!--主要内容-->
    <div id="content_detail" style="display: block;">
      <div class="bigData-wp" style="background: #fff">
        <!--石墨烯 expert map-->
        <div id="G_e_map" class="bd-chart" _echarts_instance_="ec_1539340556095" style="-webkit-tap-highlight-color: transparent; user-select: none;"><div style="position: relative; overflow: hidden; width: 355px; height: 400px; padding: 0px; margin: 0px; border-width: 0px;"><canvas data-zr-dom-id="zr_0" width="710" height="800" style="position: absolute; left: 0px; top: 0px; width: 355px; height: 400px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas><canvas data-zr-dom-id="zr_1" width="710" height="800" style="position: absolute; left: 0px; top: 0px; width: 355px; height: 400px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div></div>
      </div>
    </div>

    <audio controls="controls" style="display: none;"></audio>


  </div>
</template>
<script>
  import Vue from 'vue'
  import qs from 'qs' 

  import positionJs from 'assets/js/position.js';
  import China from 'assets/js/china.js'
  import  "assets/css/position.css";

  export default {
    data() {
      return {
        keyword: ''
      }
    },
    mounted(){
      this.keyword = this.$route.query.keyword || '';
      this.searchFn();
    },
    methods: {
      searchFn () {
        positionJs.initFn(this.keyword);
      }
    },
    watch: {
      $route (n, o) {
        this.keyword = this.$route.query.keyword || '';
        this.searchFn();
      }
    }
  }
</script>
<style lang="scss"  >
  .big_position {
    position:absolute; width:100%; height: 100%; overflow: hidden; font-size: 24px;
    .bd-chart {padding: 20px;}
  }                                                     
</style>
