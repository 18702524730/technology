<template>
  <div class="projectList">
    <selector :list="selectorList" :isShow.sync="showSelector" @change="selectorChange" />
    <scroll-view scroll-y="true" class="patent_data" :lower-threshold="500" enable-back-to-top="true" :scroll-into-view="scrollTopId" @scrolltolower="scrolltolower">
      <!-- scrollView 空的元素 用于scroll-into-view -->
      <div id="scrollView"></div>
      <p class="title" v-if="expertData.list && expertData.list.length">已找到<span>{{expertData.numFound}}个</span>同名人才</p>
      <div class="row-between person_card" v-if="expertData.list && expertData.list.length" @click="toTalent(expertData.list[0] && expertData.list[0].name)">
        <div class="row">
          <img :src="expertData.list[0] && expertData.list[0].avatar">
          <span>{{expertData.list[0] && expertData.list[0].name}}</span>
        </div>
        <p class="row"><span>点击查看同名人才</span><img src="../../../assets/img/find/arrow_right.png"></p>
      </div>
      <p class="title" v-if="searchList.docs && searchList.docs.length">已找到<span>{{searchList.numFound}}项</span>项目</p>
      <div class="card_lists" v-if="searchList.docs && searchList.docs.length">
        <div class="card" v-for="(item, index) in searchList.docs" :key="index" @click="toDetail(item.id)">
          <h3>{{item.name}}</h3>
          <div class="name">
            <span>{{item.member}}</span><span class="grade" v-if="item.unit">| {{item.unit}}</span>
          </div>
          <div class="row-between type_time">
            <span class="type">{{item.project_type}}</span><span class="time" v-if="item.year">{{item.year}}年</span>
          </div>
          <p v-if="item.abstract">{{item.abstract}}</p>
        </div>
        <div class="list_tips">{{isOver? '已经到底了' : loading ? '加载中...' : '上拉加载更多'}}</div>
      </div>
      <div class="column-center empty" v-if="isLoaded && (!searchList.docs || !searchList.docs.length)">
        <img src="../../../assets/img/icon/empty.png">
        <div>
          <p>哎呀，你来到了信息荒漠，别着急</p>
          <p>试试更换关键词~</p>
        </div>
      </div>
    </scroll-view>
    <div class="techSearchMask" @click="showSelector=false" v-if="showSelector"></div>
  </div>
</template>

<script>
  import Filters from 'utils/filters.js'
  import { substrByByte } from 'utils/utils.js'
  import selector from 'components/searchFilter/selector.vue'
  import searchBox from 'components/searchBox.vue'
  const keywordsArrData = ['人工智能', '石墨烯', '基因治疗', '物联网', '集成电路', '大数据', '新能源材料', '超导材料', '免疫疗法', '智能制造', '数据挖掘', '核燃料'];
  export default {
    components: {
      selector, searchBox
    },
    props: {
      keyword: {
        type: String,
        default: ''
      },
      expertPostData: {
        type: Object,
        default: {}
      },
      searchPostData: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        /*expertPostData: {
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
        },*/
        scrollTopId: '',
        selectorList: [
          {
            key: 'projectType',
            selected: {
              name: '所有项目',
              id: '0'
            },
            options: [
              {
                name: '所有项目',
                id: '0'
              },
              {
                name: '国家自然科学基金',
                id: '1'
              },
              {
                name: '国家科技计划项目',
                id: '2'
              },
              {
                name: '省部级项目',
                id: '3'
              },
              {
                name: '横向项目',
                id: '4'
              },
            ]
          },
          {
            key: 'unitType',
            selected: {
              name: '所有单位',
              id: '0'
            },
            options: [
              {
                name: '所有单位',
                id: '0'
              },
              {
                name: '大专院校',
                id: '1'
              },
              {
                name: '科研院所',
                id: '2'
              },
              {
                name: '企业',
                id: '3'
              },
            ]
          }
        ],
        showSelector: false,
        tabs: ["专利", "论文", "项目"],
        activeIndex: 0,
        expertData: {},
        searchList: {},
        keywordsArr: [],
        loading: false,
        isLoaded: false,
        isOver: false,
      }
    },
    mounted() {
      this.searchExpertByName();
      this.search();
    },
    methods: {
      toTalent(name) {
        this.$router.push(`/pages/talents/index?keyword=${name}&activeIndex=1`)
      },
      selectorChange(key, item, index){
        this.searchPostData[key] = item.id;
      },
      async searchExpertByName() {
        // if (!this.keyword) {return}
        this.expertPostData.keyword = this.keyword;
        let data = await this.API.find.searchExpertByName(this.expertPostData);
        this.expertData = data;
        console.log(this.expertData)
      },
      async search(isloadMore) {
        // if (!this.keyword) {return}
        this.searchPostData.keyword = this.keyword;
        this.loading = true;
        if (!isloadMore) {
          this.searchPostData.start = '0';
          this.scrollTopId = 'scrollView';
        }else{
          this.scrollTopId = '';
        }
        let data = await this.API.find.search(this.searchPostData);
        data.docs.forEach((item) => {
          item.project_type = Filters.filters.projectType(item.project_type);
          item.abstract = substrByByte(item.abstract, 94);
        });
        if (data.docs.length < this.searchPostData.pageSize) {
          this.isOver = true;
        }else{
          this.isOver = false;
        }
        if (isloadMore) {
          data.docs = [].concat(this.searchList.docs, data.docs)
        }
        this.loading = false;
        this.isLoaded = true;
        this.searchList = data;
        console.log(this.searchList)
      },
      scrolltolower() {
        if (this.isOver) { return }
        console.log('1111')
        this.searchPostData.start = (this.searchPostData.start-0)+(this.searchPostData.pageSize-0) + '';
      },
      toDetail(id) {
        this.$router.push('/pages/find/projectDetail?id=' + id);
      },
    },
    watch: {
      'searchPostData.projectType': function() {
        this.search();
      },
      'searchPostData.unitType': function() {
        this.search();
      },
      'searchPostData.start': function() {
        if (this.searchPostData.start === '0') {return;}
        this.search(true);
      },
      keyword() {
        this.searchExpertByName();
        this.search();
      }
    }
  }
</script>

<style lang="scss">
  .projectList {
    .patent_data{
      position: absolute;top: 258px;left: 0;right: 0;bottom: 0;
      #scrollView{height: 1px;}
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
            position:relative;margin-top: 20px;padding-top: 20px;border-top: 1px solid #eee;color: #666;line-height:37px;height:94px;overflow:hidden;font-size: 26px;
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
        .list_tips{text-align: center; color: #999;font-size: 28px; height: 60px;line-height: 40px;padding-bottom: 20px;}
      }
      .empty{
        padding-top: 160px;
        img{width: 300px;height: 300px;}
        div{
          width: 420px;padding-top: 20px;line-height: 37px;color:#bbb;font-size: 26px;text-align: center;
          p{color:#bbb;font-size: 26px;text-align: center;}
        }
      }
    }
  }
</style>
