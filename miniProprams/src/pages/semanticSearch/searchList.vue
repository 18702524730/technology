<template>
  <div class="semantic_search_list" :class="{'page_overflow': showSelector}"> 

    <!-- 导航条 -->
    <u-navbar :tabs="tabs" :activeIndex="activeIndex" @selectTab="selectTabFn"  />

    <!-- 筛选条件 -->
    <selector :list="selectorList" :isShow.sync="showSelector" @change="selectorChange"  />
    
    <p class="list_tip" v-if="detailObj.numFound">已找到<span class="num">{{ detailObj.numFound }}项</span>
      <span v-if="activeIndex==0">专利</span>
      <span v-if="activeIndex==1">论文</span>
      <span v-if="activeIndex==2">项目</span>
    </p>
    <!-- 人才详情列表 -->
    <div class="detail_list">
      <div class="item" v-for="(item, index) in detailList" :key="index" @click="goDetailFn(item)">
        <p class="title">{{ item.name }}</p>
        <p class="auth">
          <span class="name" >{{ item.member }}</span>
          <span class="unit" >
            <span class="line"></span>
            <span v-if="activeIndex == 0">{{ item.unit }}</span>
            <span v-if="activeIndex == 1 || activeIndex == 2">{{ item.unit }}</span>
          </span>
        </p>
        <p class="lab_box row-between">
          <span class="lab" v-if="activeIndex == 0 && item.patentTypeName">{{ item.patentTypeName }}</span>
          <span class="lab" v-if="activeIndex == 1 && item.journalName">{{ item.journalName }}</span>
          <span class="lab" v-if="activeIndex == 2 && item.projType">{{ item.projType }}</span>
          <span class="date" v-if="activeIndex == 0">{{ item.year }}</span>
          <span class="date" v-if="activeIndex == 1">{{ item.journalNo }}</span>
          <span class="date" v-if="activeIndex == 2">{{ item.year }}</span>
        </p>
        <p class="abstracts" v-if="item.abstracts">{{ item.abstracts }}</p>
      </div>
    </div>

    <div class="techSearchMask" @click="showSelector=false" v-if="showSelector"></div>

    <!-- 空页面 -->
    <div class="empty_box row-center" v-if="!loading && !detailList.length">
      <div class="content">
        <img src="~assets/img/icon/empty.png" alt="" class="icon">
        <p class="text">暂无此分类数据</p>
      </div>
    </div>


  </div>
</template>

<script>
import Filter from 'utils/filters'
import selector from '@/components/searchFilter/selector'

let selectList = [
  {
    key: 'literatureType',
    selected: {
      name: '所有专利',
      id: '-1'
    },
    options: [
      {
        name: '所有专利',
        id: '-1'
      },
      {
        name: '发明专利',
        id: '1'
      },
      {
        name: '实用新型',
        id: '2'
      },
      {
        name: '外观设计',
        id: '3'
      },
    ]
  },
  {
    key: 'unitType',
    selected: {
      name: '所有单位',
      id: '-1'
    },
    options: [
      {
        name: '所有单位',
        id: '-1'
      },
      {
        name: '大专院校',
        id: '01'
      },
      {
        name: '科研院所',
        id: '02'
      },
      {
        name: '企业',
        id: '03'
      },
    ]
  }
];

let list1_ = {
  key: 'literatureType',
  selected: {
    name: '所有专利',
    id: '-1'
  },
  options: [
    {
      name: '所有专利',
      id: '-1'
    },
    {
      name: '发明专利',
      id: '1'
    },
    {
      name: '实用新型',
      id: '2'
    },
    {
      name: '外观设计',
      id: '3'
    },
  ]
};
let list2_ = {
  key: 'literatureType',
  selected: {
    name: '所有论文',
    id: '-1'
  },
  options: [
    {
      name: '所有论文',
      id: '-1'
    },
    {
      name: 'EI/一级',
      id: '23'
    },
    {
      name: '核心期刊',
      id: '4'
    }
  ]
};
let list3_ = {
  key: 'literatureType',
  selected: {
    name: '所有项目',
    id: '-1'
  },
  options: [
    {
      name: '所有项目',
      id: '-1'
    },
    {
      name: '国家科技计划项目',
      id: '2'
    },
    {
      name: '国家自然科学基金',
      id: '1'
    },
    {
      name: '省部级项目',
      id: '3'
    },
    {
      name: '横向项目',
      id: '4'
    }
  ]
};

export default {
  components: {
    selector
  },
  data () {
    return {
      tabs: ['专利', '论文', '项目'],
      activeIndex: 0,
      detailObj: {},
      detailList: [],  //人才详情列表
      pageStart: 0,  //开始的条数
      pageSize: 10,  //每页条数
      totalSize: 0,  //总条数
      sortType: 0,
      fieldType: null,
      moModre: false,
      loading: false, 
      selectorList: selectList,
      showSelector: false,
      unitType: '-1',
      literatureType: '-1',
    }
  },
  mounted () {
    this.searchByUnitFn();
  },
  // 上啦加载，与methods方法同级
  async onReachBottom () {
    if (this.pageStart + this.pageSize < this.totalSize) {
      this.pageStart = this.pageStart + this.pageSize;
      this.searchByUnitFn();
    }
    else{
      this.moModre = true;
    }
  },
  methods: {
    // 详情页
    goDetailFn (item) {
      let url = '';
      switch (this.activeIndex) {
        case 0: 
          url = `/pages/find/patentDetail?id=${item.uuid}`; break;
        case 1: 
          url = `/pages/find/paperDetail?id=${item.uuid}`; break;
        case 2: 
          url = `/pages/find/projectDetail?id=${item.uuid}`; break;
      }
      this.$router.push(url);
    },
    goTableFn (type) {
      this.$router.push(`/pages/talents/graph?type=${type}&id=${this.detailObj.expertId}`)
    },
    selectTabFn (index) {
      this.activeIndex = index;
      switch (this.activeIndex) {
        case 0: 
          this.selectorList[0] = list1_; break;
        case 1: 
          this.selectorList[0] = list2_; break;
        case 2:  
          this.selectorList[0] = list3_; break;
      }
      this.searchByUnitFn();
    },
    // 选择筛选条件
    selectorChange (key, item, index) {
      this[key] = item.id;
      this.searchByUnitFn();
    },
    // 查询单位详情
    async searchByUnitFn () {
      let type_ = '';
      switch (this.activeIndex) {
        case 0:
          type_ = 'patent'; break;
        case 1:
          type_ = 'paper'; break;
        case 2:
          type_ = 'project'; break;
      }
      let data = {
        keyword: this.$route.query.keyword || '针对3D生物打印设备通常无法实现多喷头切换的问题，研发一种3D生物打印设备。希望该设备包括以下模块：喷头架、喷头体和抓取等必要装置，可以实现自动三维扫描矫正，通过三维打印工艺将矫形器数字三维模型打印成形。希望该3D生物打印设备能广泛应用于人体器官打印等前沿领域。',
        type: type_,
        unitType: this.unitType,
        literatureType: this.literatureType
      }
      this.loading = true;
      try {
        let resp = await this.API.talents.recommendSearch(data);
        this.detailObj = resp.data;
        this.detailList = resp.data.list;
        this.detailList.forEach( item => {
          item.patentTypeName = Filter.filters.patentTypeTag(item.patentType);
          item.abstracts = Filter.filters.ellipsisContent(item.abstracts, 49);
        })
        this.loading = false;
      }
      catch (e) {}
    }
  }
}
</script>

<style lang="scss">
  .semantic_search_list {
    position: absolute; height: 100%; width: 100%;
    .pub_navbar {border-bottom: 1px solid #eee; position: relative; z-index: 4;}
    .selector_boxs {margin-top: 1px; position: relative; z-index: 3;}
    .unit_card {
      background: #fff; padding: 20px 0 0 0; position: relative; z-index: 3;
      .t_item {
        background:linear-gradient(135deg,rgba(61,139,255,1) 0%,rgba(21,102,223,1) 100%); margin: 0 auto;
        .unit_bg {width: 320px; height: 228px; position: absolute;  right: 0; bottom: 0;}
        .info_box {
          height: 120px;
          .head_img {
            width: 120px; height: 120px; border: 3px solid #73A9FB;
            .text { color: #7585A7; font-size: 38px; line-height: 114px;}
          }
        }
        .text_box {
          .person {
            margin-bottom: 14px;
            .name { color: #fff; }
          }
          .tag {width: auto; display: inline-block; border-radius: 5px; height: 44px; line-height: 44px; padding: 0 20px; background: rgba(255,255,255,.2); color: rgba(255,255,255,.8); font-size: 24px; }
        }
        .achievement_box {
          position: relative; z-index: 2;
          .content {
            .li {color: #fff; font-size: 26px; margin-right: 40px;}
          }
        }
      }
    }
    .tab_icon {
      width: 100%; height: 150px; background: #fff; border-bottom: 1px solid #eee;
      .tab_item {
        flex: 1; text-align: center;
        img {width: 50px; height: 50px;}
        .name {font-size: 24px; color: #333;}
      }
    }
    .detail_list {
      width: 100%; height: auto; padding: 0 20px 20px 0;
      .item {
        margin-bottom: 20px; border-radius: 10px; background: #fff; padding: 30px;
        .title {font-size: 30px; color: #333; width: 630px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; margin-bottom: 10px;}
        .auth {
          width: 100%; 
          .name {font-size: 26px; color: #999; margin-right: 30px;}
          .unit {
            font-size: 26px; color: #999; position: relative; padding-left: 10px;
            .line {position: absolute; left: 0; top: 6px; width: 2px; height: 24px; background: #999;}
          }
        }
        .lab_box {
          .lab {padding: 0 20px; height: 44px; line-height: 42px; border: 1px solid #3576FF; color: #3576FF; font-size: 24px; text-align: center; border-radius: 5px; margin-top: 20px;}
          .date {font-size: 26px; color: #999;}
        }
        .abstracts {width: 100%; max-height: 100px; border-top: 1px solid #eee; font-size: 26px; color: #666; padding-top: 20px; margin-top: 20px; overflow: hidden; }
      }
    }
    .list_tip {
      font-size: 24px; color: #666; margin: 20px 0 15px 30px;
      .num {color: #3576FF;}
    }
    .empty_box {
      width: 100%; margin: 0 auto; text-align: center; background: #f8f8f8; position: absolute; top: 182px; bottom: 0; z-index: 1;
      .content {
        min-width: 300px; text-align: center;
        img {width: 300px; height: 300px; margin-bottom: 20px; }
        .text {color: #bbb; font-size: 26px; width: 420px; margin: 0 auto;}
      }
    }
    .techSearchMask{position: absolute;left: 0;top: 258px;right: 0;bottom: 0;background-color: rgba(0, 0, 0, 0.5); z-index: 2;}
  }
  .page_overflow {overflow: hidden;}
</style>
