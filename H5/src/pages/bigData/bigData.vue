<template>
  <div class="big_data">
    <!--主要内容-->
    <div id="content_detail">   
      <div class="top_header">
        <div class="top_header_in">
          <h2>科技大数据</h2>
          <p>国内领先的技术与专家大数据搜索引擎</p>
          <div class="serach_box" @click="focusFn">
            <img src="~assets/img/icon/search.png">
            <input type="text" name="keyword" v-model="keyword"  placeholder="科技关键词、人名、单位等关键词" @focus="focusFn">
            <span>搜索</span>
          </div>
          <div class="row-between keywords_box">
            <div class="keywords_list"><span v-for="(item, index) in keywordsArr" :key="index" @click="toSearch(item)">{{item}}</span></div>
            <div class="change row-center"><img :class="{'animate_r': isChanging}" src="~assets/img/icon/fresh.png"><span @click="changeHotWord">换一批</span></div>
          </div>
          <div class="row-center entrance_list">
            <div class="entrance" v-for="(item, index) in tabList" :key="index" :class="{'active': index == selectTab}">
              <img :src="item.imgUrl" @click="checkTab(item, index)" v-if="index != selectTab">
              <img :src="item.imgUrl2" @click="checkTab(item, index)" v-if="index == selectTab">
              <p>{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 相关学者 -->
      <comsSholar v-if="selectTab==0"></comsSholar>
      <!-- 相关机构 -->
      <comInstitution v-if="selectTab==1"></comInstitution>
      <!-- 研究趋势 -->
      <comTrend v-if="selectTab==2"></comTrend>
      <!-- 人才位置发布 -->
      <comPosition v-if="selectTab==3"></comPosition>


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
  </div>
</template>
<script>
  import Vue from 'vue'
  import qs from 'qs'

  import scholar from 'src/assets/img/bigData/gray_1.png';
  import scholar_check from 'src/assets/img/bigData/blue_1.png';
  import institution from 'src/assets/img/bigData/gray_2.png';
  import institution_check from 'src/assets/img/bigData/blue_2.png';
  import trend from 'src/assets/img/bigData/gray_3.png';
  import trend_check from 'src/assets/img/bigData/blue_3.png';
  import position from 'src/assets/img/bigData/gray_4.png';
  import position_check from 'src/assets/img/bigData/blue_4.png';
  import comsSholar from './components/scholar.vue';  //相关学者
  import comInstitution from './components/institution.vue';  //相关机构
  import comTrend from './components/trend.vue';  //研究趋势
  import comPosition from './components/position.vue';  //人才位置发布

  const keywordsArrData = ['人工智能', '石墨烯', '基因治疗', '物联网', '集成电路', '大数据', '新能源材料', '超导材料', '免疫疗法', '智能制造', '数据挖掘', '核燃料'];

  export default {
    components: {
      comsSholar, comInstitution, comTrend, comPosition
    },
    data() {
      return {
        tabList: [
          {imgUrl: scholar, imgUrl2: scholar_check, title: '相关学者', path: '/bigData/scholar'},
          {imgUrl: institution, imgUrl2: institution_check, title: '相关机构', path: '/bigData/institution'},
          {imgUrl: trend, imgUrl2: trend_check, title: '研究趋势', path: '/bigData/trend'},
          {imgUrl: position, imgUrl2: position_check, title: '人才位置分布', path: '/bigData/position'},
        ],
        selectTab: 0, //选择的类型
        keywordsArr: [],
        isChanging: false,
        keyword: '',
        oldArr: []
      }
    },
    mounted(){
      this.keyword = this.$route.query.keyword || '';
      this.initKeywordsArr();
    },
    methods: {
      checkTab (item, index) {
        this.selectTab = index;
      },
      initKeywordsArr() {
        function getRandom(min,max){
          let random = Math.random()*(max-min)+min;
          random = Math.floor(random);
          return random;
        }
        let arr = [];
        let l = keywordsArrData.length;
        for (var i = 0; i < 100 && arr.length < 4; i++) {
          let index = getRandom(0, l);
          if (arr.includes(index) || this.oldArr.includes(index)) {
            continue;
          }else{
            arr.push(index)
          }
        }
        console.log(arr)
        this.oldArr = arr;
        this.keywordsArr = keywordsArrData.filter((it, index) => {
          return arr.includes(index);
        })
      },
      focusFn() {
        this.$router.push({path: '/techSearch'})
      },
      changeHotWord() {
        this.isChanging = true;
        setTimeout(() => {
          this.isChanging = false;
        }, 500);
        this.initKeywordsArr();
      },
      toSearch (item) {
        this.keyword = item;
        this.$router.replace({path: '/bigData?keyword=' + item})
      },
      matchFn (v) {  //高亮
        this.tabList.forEach( item => {
          item.active = false;
          if (item.path == v.path){
            item.active = true;
          }
        })
      }
    }
  }
</script>
<style lang="scss"  >
  @import  "~assets/css/index_3.css";
  .big_data {
    font-size: 24px; position: absolute; height: 100%; width: 100%; 
    .top_header{
      background:linear-gradient(180deg,rgba(53,89,250,1) 0%,rgba(53,118,255,1) 100%);
      .top_header_in{
        padding-top: 40px;background: transparent url(~assets/img/bigData/top_bg.png) 0 bottom no-repeat;background-size: 100% 184px;
        h2{height:59px;line-height: 59px;font-size:44px;font-weight:bold;color: #fff;text-align: center;}
        >p{margin-top: 20px;height:40px;line-height:40px;color: #fff;text-align: center;}
        .serach_box{
          height: 70px;border-radius: 45px;margin: 30px 30px 0;background:rgba(255,255,255,0.15);padding: 15px 30px;
          img{float: left;width: 32px;height: 32px;margin-top: 4px;}
          input {
            float: left;margin-left: 10px;height:53px;line-height: 53px;width: 420px; color: #fff;border:0;margin-top: -6px; background: none; 
          }
          input::-webkit-input-placeholder {
            color: #fff !important;
          }
          span{float: right;color: #fff;height:40px;line-height: 40px;}
          .placeholder{color: #fff;}
        }
        .keywords_box{
          margin: 20px 30px 0; 
          .keywords_list{
            height: 48px; max-width: 560px; overflow: hidden;
            span{font-size:24px;color: #C8D9FF;display: inline-block;height:48px;line-height: 48px;border-radius: 45px;background:rgba(255,255,255,0.1);text-align: center;margin-right: 10px;padding: 0 15px;}
            span:last-child{margin-right:0;}
          }
          .change{
            background:rgba(255,255,255,0.1);text-align: center;height:48px;line-height: 28px;border-radius: 45px;padding: 10px 15px; width: 140px;
            img{display: inline-block;width: 28px;height: 28px;}
            span{padding-left: 5px;font-size:20px;color: #C8D9FF;display: inline-block;height: 28px;line-height: 28px;vertical-align: top;}
            .animate_r{transform:rotate(360deg);transition: transform 0.3s ease-in;}
          }
        }
        .entrance_list{
          margin: 40px 0 0 0;height: 190px;background-color: #fff;box-shadow:0px 4px 16px 0px rgba(54,93,176,0.11);border-radius:24px 24px 0px 0px; padding-top: 35px;align-items: flex-start; border-bottom: 1PX solid #f5f5f5;
          .entrance{
            width: 230px;text-align: center;
            img{width: 82px; height: 82px;display: block;margin: 0 auto;}
            p{margin-top: 15px;font-size:24px;height: 33px;line-height: 33px; color: #333;}
          }
          .active {
            p {color: #3576FF;}
          }
        }
      }
    }
  }                                                     
</style>
