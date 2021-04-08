<template>
  <div class="techSearch">
    <!-- 搜索框 -->
    <search-box :content.sync="keyword" placeholder="请输入科技关键词、人名、单位等关键词" :focus.sync="isFocus" @search="searchFn" @suggest="suggestFn" />
    <div class="suggestBox" v-if="keywordList.length">
      <p v-for="(item, index) in keywordList" :key="index" @click="searchFn(item)">{{item}}</p>
    </div>
    <u-navbar :tabs="tabs" :activeIndex="activeIndex" @selectTab="selectTabFn" v-if="showResult"/>
    <div class="tab_panel" v-if="showResult">
      <div class="tab_content" v-if="activeIndex == 0">
        <!-- 专利 -->
        <patentList :keyword="keyword" :searchSign="searchSign" :expertPostData="expertPostData" :searchPostData="searchPostData" />
      </div>
      <div class="tab_content" v-if="activeIndex == 1">
        <!-- 论文 -->
        <paperList :keyword="keyword" :searchSign="searchSign" :expertPostData="expertPostData" :searchPostData="searchPostData" />
      </div>
      <div class="tab_content" v-if="activeIndex == 2">
        <!-- 项目 -->
        <projectList :keyword="keyword" :searchSign="searchSign" :expertPostData="expertPostData" :searchPostData="searchPostData" />
      </div>
    </div>
    <div class="hotwords" v-if="!showResult">
      <h3>热搜词</h3>
      <p>
        <span v-for="(item, index) in keywordsArr" :key="index" @click="searchFn(item)">{{item}}</span>
      </p>
    </div>
  </div>
</template>

<script>
  import Filters from '../../utils/filters.js'
  import selector from 'components/searchFilter/selector.vue'
  import searchBox from 'components/searchBox.vue'
  import patentList from './components/patentList.vue'
  import paperList from './components/paperList.vue'
  import projectList from './components/projectList.vue'
  const keywordsArrData = ['人工智能', '石墨烯', '基因治疗', '物联网', '集成电路', '大数据', '新能源材料', '超导材料', '免疫疗法', '智能制造', '数据挖掘', '核燃料'];
  export default {
    components: {
      selector, searchBox, patentList, paperList, projectList
    },
    data () {
      return {
        searchSign: 0,
        isFocus: false, // 空页面时自动聚焦
        keywordsArr: keywordsArrData,
        keyword: '',
        keywordList: [],
        showResult: false,
        expertPostData: {
          areaCode: null,
          fieldType: null,
          keyword: '陈勋',
          pageSize: 1,
          searchType: 1,
          sortType: null,
          start: 0,
          unitName: null,
          unitType: 0,
        },
        searchPostData: {
          area: 0,
          author: '',
          containOneKeyword: '',
          field: '',
          from: '',
          isAdvanceSearch: 'false',
          journalName: '',
          journalQuality: '0',
          justTitle: 'false',
          keyword: '陈勋',
          notContainKeyword:'',
          pageSize:'10',
          patentType: '0',
          projectType: '0',
          start: '0',
          time: '-1',
          to: '',
          type: 'patent',
          unit: '',
          unitType: '0',
          yeardesc: 'false'
        },
        tabs: ["专利", "论文", "项目"],
        activeIndex: 0,
      }
    },
    async onShow () {
      //this.initKeywordsArr();
    },
    mounted() {
      let query = this.$root.$mp.query;
      console.log('techSearch_query:', query)
      if (query.keyword) {
        this.searchFn(query.keyword);
      }else{
        // 空页面时自动聚焦
        this.isFocus = true;
      }
    },
    onUnload() {
      this.keyword = '';
      this.showResult = false;
      this.keywordList = [];
    },
    methods: {
      // 搜索
      searchFn (data) {
        this.isFocus = false;
        this.searchSign = new Date().getTime();
        this.showResult = true;
        this.keywordList = [];
        this.keyword = data;
        // wx.hideKeyboard();
        console.log(data);
      },
      // 模糊搜索
      async suggestFn (data) {
        if (this.keyword == data) {
          return;
        }
        this.keyword = data;
        if (!data) {return}
        try {
          let resp = await this.API.find.searchKeyword(data);
          this.keywordList = resp;
        }
        catch (e) {}
      },
      selectorChange(key, item, index){
        this.searchPostData[key] = item.id;
      },
      // 选择导航
      selectTabFn (data) {
        if (this.activeIndex == data) { return; }
        this.activeIndex = data;
        if (this.activeIndex == 0) {
          this.searchPostData.type = 'patent';
        } else if(this.activeIndex == 1){
          this.searchPostData.type = 'paper';
        } else {
          this.searchPostData.type = 'project';
        }
        this.searchPostData.unitType = '0';
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
          if (arr.includes(index)) {
            continue;
          }else{
            arr.push(index)
          }
        }
        console.log(arr)
        this.keywordsArr = keywordsArrData.filter((it, index) => {
          return arr.includes(index);
        })
      },
      changeHotWord() {
        this.initKeywordsArr();
      }
    },
    watch: {
    }
  }
</script>

<style lang="scss">
  .techSearch {
    font-size: 28px;position: absolute;top: 0;;left: 0;right: 0;bottom: 0;overflow: hidden;
    .search_input{position: relative;z-index: 3;padding-top: 20px;}
    .pub_navbar{position: relative;z-index: 3;border-bottom: 1px solid #eee;}
    .tab_panel{}
    .patent_data{
      position: absolute;top: 258px;left: 0;right: 0;bottom: 0;
      .title{
        font-size: 24px;color: #666;height: 33px;line-height: 33px;margin-top: 20px;padding-left: 35px;
        span{color: #3576FF;}
      }
      .person_card{margin: 20px 30px 0;height: 135px;border-radius:10px;padding: 20px 10px 20px 20px;background-color: #fff;position: relative;overflow: hidden;display: flex;flex-direction: row;
        >div{
          align-items: flex-start;
          img{width: 95px;height: 95px;border-radius: 95px;}
          span{padding-left: 20px; font-size:30px;height:95px;line-height:95px;}
        }
        p{
          flex-direction: row;height:37px;line-height:37px;font-size:26px;color: #666;
          img{width: 40px;height: 40px;}
        }
      }
      .card_lists{
        margin: 15px 30px 0;
        .card{
          width: 100%;border-radius:10px;padding: 30px;background-color: #fff;position: relative;overflow: hidden;margin-bottom: 20px;
          h3{width: 100%;height: 42px;line-height: 42px;font-size: 30px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
          .name{
            line-height: 37px;font-size: 26px;margin-top: 15px;color: #999;
            span{margin-right: 30px;}
          }
          .type_time{
            height: 44px;line-height: 44px;font-size: 26px;margin-top: 20px;
            .type{height:44px;line-height: 42px;border-radius:5px;border:1px solid #3576FF;padding: 0 20px;color: #3576FF;text-align: center;font-size: 24px;}
            .time{color: #999;}
          }
          >p{
            position:relative;margin-top: 20px;padding-top: 20px;border-top: 1px solid #eee;color: #666;line-height:37px;height:94px;overflow:hidden;
          }
          /* >p::after {
            content:"...";
            font-weight:bold;
            position:absolute;
            bottom:0;
            right:0;
            padding:0 20px 2px 0;
            margin-left: 2px;
            background-color: #fff;
            //background:transparent url('http://newimg88.b0.upaiyun.com/newimg88/2014/09/ellipsis_bg.png') -30px 0 repeat-y;
          } */
        }
      }
    }
    .hotwords{
      position: absolute;top: 84px;left: 0;right: 0;bottom: 0;padding: 30px 30px 0;z-index: 3;background-color: #fff;
      h3{height:37px;line-height: 37px;font-size:26px;padding-left: 5px;}
      p{
        padding-top: 20px;
        span{font-size:24px;color: #333;display: inline-block;height:50px;line-height: 50px;border-radius: 45px;background:#F2F2F2;text-align: center;margin-right: 15px;margin-bottom: 15px;padding: 0 15px;}
      }
    }
    .suggestBox{
      position: absolute;top: 84px;left: 0;right: 0;bottom: 0;padding: 10px 30px 0;z-index: 4;background-color: #fff;
      p{height:94px;line-height: 94px;font-size:28px;border-bottom: 1px solid #eee;}
    }
    .techSearchMask{position: absolute;left: 0;top: 258px;right: 0;bottom: 0;background-color: rgba(0, 0, 0, 0.5);}
  }
</style>
