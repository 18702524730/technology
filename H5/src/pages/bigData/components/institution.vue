<template>
  <div class="big_institution" :class="{'autoHeight': selectBox}">
    
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
      <div class="bigData-wp" >
        <!--石墨烯 structure bar-->
        <div style="position: relative;height: 100%">
          <div id="G_s_bar" class="bd-chart" _echarts_instance_="ec_1539336610797" style="-webkit-tap-highlight-color: transparent; user-select: none; position: relative;"><div style="position: relative; overflow: hidden; width: 355px; height: 647px; padding: 0px; margin: 0px; border-width: 0px;"><canvas data-zr-dom-id="zr_0" width="710" height="1294" style="position: absolute; left: 0px; top: 0px; width: 355px; height: 647px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div><div></div></div>
          <div class="bd-filter row-center">
            <group>
              <popup-radio title="单位类型" :options="options1" v-model="unitCode" placeholder="全部" @on-show="boxTagFn(true)" @on-hide="boxTagFn(false)"></popup-radio>
            </group>
            <group>
              <popup-radio title="地区" :options="options2" v-model="provinceCode" placeholder="全部" @on-show="boxTagFn(true)" @on-hide="boxTagFn(false)"></popup-radio>
            </group>
            <!-- <label class="control-label">单位类型</label>
            <select id="unit_selector" class="bd-filter__select" style="margin-right: 5px;">
              <option value="" selected="">全部</option>
              <option value="01">大专院校</option>
              <option value="02">科研院所</option>
              <option value="03">企业</option>
            </select>
            <label class="control-label">地区</label>
            <select id="area_selector" class="bd-filter__select">
            <option value="">全部</option><option value="11">北京市</option><option value="33">浙江省</option><option value="12">天津市</option><option value="13">河北省</option><option value="14">山西省</option><option value="15">内蒙古自治区</option><option value="21">辽宁省</option><option value="22">吉林省</option><option value="23">黑龙江省</option><option value="31">上海市</option><option value="32">江苏省</option><option value="34">安徽省</option><option value="35">福建省</option><option value="36">江西省</option><option value="37">山东省</option><option value="41">河南省</option><option value="42">湖北省</option><option value="43">湖南省</option><option value="44">广东省</option><option value="45">广西壮族自治区</option><option value="46">海南省</option><option value="50">重庆市</option><option value="51">四川省</option><option value="52">贵州省</option><option value="53">云南省</option><option value="54">西藏自治区</option><option value="61">陕西省</option><option value="62">甘肃省</option><option value="63">青海省</option><option value="64">宁夏回族自治区</option><option value="65">新疆维吾尔自治区</option><option value="71">台湾省</option><option value="81">香港特别行政区</option><option value="82">澳门特别行政区</option></select> -->
          </div>
        </div>
      </div>
    </div>

    <audio controls="controls" style="display: none;"></audio>


  </div>
</template>
<script>
  import Vue from 'vue'
  import qs from 'qs' 
  import { Group, PopupRadio } from 'vux'

  import institutionJs from 'assets/js/institution.js';
  import  "assets/css/scholar.css";

  const areaList = [{
      key: '',
      value: '全部'
    },{
      key: '11',
      value: '北京市'
    }, {
      key: '33',
      value: '浙江省'
    },{
      key: '12',
      value: '天津市'
    },{
      key: '13',
      value: '河北省'
    },{
      key: '14',
      value: '山西省'
    },{
      key: '15',
      value: '内蒙古自治区'
    },{
      key: '21',
      value: '辽宁省'
    },{
      key: '22',
      value: '吉林省'
    },{
      key: '23',
      value: '黑龙江省'
    },{
      key: '31',
      value: '上海市'
    },{
      key: '32',
      value: '江苏省'
    },{
      key: '34',
      value: '安徽省'
    },{
      key: '35',
      value: '福建省'
    },{
      key: '36',
      value: '江西省'
    },{
      key: '37',
      value: '山东省'
    },{
      key: '41',
      value: '河南省'
    },{
      key: '42',
      value: '湖北省'
    },{
      key: '43',
      value: '湖南省'
    },{
      key: '44',
      value: '广东省'
    },{
      key: '45',
      value: '广西壮族自治区'
    },{
      key: '46',
      value: '海南省'
    },{
      key: '50',
      value: '重庆市'
    },{
      key: '51',
      value: '四川省'
    },{
      key: '52',
      value: '贵州省'
    },{
      key: '53',
      value: '云南省'
    },{
      key: '54',
      value: '西藏自治区'
    },{
      key: '61',
      value: '陕西省'
    },{
      key: '62',
      value: '甘肃省'
    },{
      key: '63',
      value: '青海省'
    },{
      key: '64',
      value: '宁夏回族自治区'
    },{
      key: '65',
      value: '新疆维吾尔自治区'
    },{
      key: '71',
      value: '台湾省'
    },{
      key: '81',
      value: '香港特别行政区'
    },{
      key: '82',
      value: '澳门特别行政区'
  }]

  export default {
    data() {
      return {
        options1: [{
          key: '',
          value: '全部'
        },{
          key: '01',
          value: '大专院校'
        }, {
          key: '02',
          value: '科研院所'
        },{
          key: '03',
          value: '企业'
        }],
        options2: areaList,
        keyword: '',
        unitCode: '',
        provinceCode: '',
        selectBox: false,  //显示条件
      }
    },
    components: {
      Group,
      PopupRadio
    },
    mounted(){
      this.keyword = this.$route.query.keyword || '';
      this.searchFn();
    },
    methods: {
      boxTagFn (boolean) {
        this.selectBox = boolean;
      },
      checkTab (index) {
        this.selectTab = index;
      },
      searchFn () {
        institutionJs.initFn(this.keyword, this.unitCode, this.provinceCode);
      }
    },
    watch: {
      unitCode (n, o) {
        if (n != o) {
          this.searchFn();
        }
      },
      provinceCode (n, o) {
        if (n != o) {
          this.searchFn();
        }
      },
      $route (n, o) {
        this.keyword = this.$route.query.keyword || '';
        this.searchFn();
      }
    }
  }
</script>
<style lang="scss"  >
  .big_institution {
    position:absolute; width:100%; height: 100%; overflow: hidden; font-size: 24px;
    .bd-chart {padding: 60px 20px 20px 20px;}
    .bd-filter {
      width: 600px; right: 50%; margin-right: -300px; top: 30px; 
      >div {margin: 0 10px; display: inline-block;}
      .weui-cell {padding: 0 10px;}
      .weui-cells {
        width: 150px; height: 32px; line-height: 32px; box-sizing:border-box; padding-left: 10px; background: #F2F6FF; float: left; margin: 0; border-radius:5px; padding: 0; float: left; 
        .vux-label {font-size: 12px; color: #666;}
        .vux-cell-value {font-size: 12px; color: #333; max-width: 110px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
        .vux-cell-primary {height: 32px; min-width: 50px;}
        .vux-cell-placeholder {font-size: 12px; color: #333;}
      }
      .weui-cells:before {border: none;}
      .weui-cells:after {border: none;}
      .unit {
        width: 254px; height: 64px; line-height: 64px; box-sizing:border-box; padding-left: 20px; background: #F2F6FF; float: left; margin-right: 20px; border-radius:10px;
        label {float: left; display: inline-block; font-size: 24px; line-height: 64px; vertical-align: middle;}
        .bd-filter__select {float: left; width: 100px; border: none !important; background-color: transparent !important; height: 64px; vertical-align: middle; margin-left: 20px; font-size: 24px;}
      }
    }
  }
  .weui-cell_access {
    .weui-cell__ft {max-width: 100px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
  }       
  .vux-popup-dialog {max-height: 300px;}
  .weui-cells_radio {max-height: 300px; overflow: auto;}
  .autoHeight {height: 500px; bottom: 0; top: 560px;}                                                   
</style>
