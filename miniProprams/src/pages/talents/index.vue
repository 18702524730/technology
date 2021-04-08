<template>
  <div class="talents_index">
    <!-- 搜索框 -->
    <search-box :content="keyword" :placeholder="placeholder" @search="searchFn" @suggest="suggestFn" />

    <!-- 导航条 -->
    <u-navbar :tabs="tabs" :activeIndex="activeIndex" @selectTab="selectTabFn" v-if="showTab" />
    <!-- 筛选条件 -->
    <selector :list="selectorList" :isShow.sync="showSelector" @change="selectorChange" v-if="showFil"  />

    <!-- 模糊搜索关键词 -->
    <div class="sugeest_list" v-if="keywordList.length && !showTab">
      <p class="item" v-for="(item, index) in keywordList" :key="index" @click="searchByKeyFn(item)">{{ item }}</p>
    </div>

    <!-- 搜索人结果列表 -->
    <talent-list :list="talentList" :loading="loading" :moModre="moModre" :total="totalSize" @select="goDetailFn" v-if="showTab && talentList.length && activeIndex != 2"  />

    <!-- 单位找人列表 -->
    <div class="talents_list organization_list" v-if="showTab && unitList.length && activeIndex == 2">
      <p class="tip">已经找到<span>{{ totalSize }}家</span>科研机构</p>
      <div class="t_item" v-for="(item, index) in unitList" :key="index" @click="goUnitDetailFn(item)">
        <div class="info_box row-start">
          <div class="head_img">
            <img src="~assets/img/icon/unit_1.png" alt="" v-if="item.typeCode == '01'">
            <img src="~assets/img/icon/unit_2.png" alt="" v-if="item.typeCode == '02'">
            <img src="~assets/img/icon/unit_3.png" alt="" v-if="item.typeCode == '03'">
          </div>
          <div class="text_box">
            <p class="person">
              <span class="name">{{ item.unit }}</span>
            </p>
            <p class="school">{{ item.typeName }}</p>
          </div>
          <img src="~assets/img/icon/more.png" class="more" alt="">
        </div>
      </div>
    </div>

    <div class="bg_box" v-if="!showFil">
      <img src="~assets/img/talents/null.png" alt="" class="icon">
      <p class="text">汇聚1000万+的科技人才及其科技数据</p>
    </div>

    <div class="empty_box row-center" v-if="showFil && !talentList.length && !unitList.length">
      <div class="content">
        <img src="~assets/img/icon/empty.png" alt="" class="icon">
        <p class="text">哎呀，你来到了信息荒漠，别着急</p>
        <p class="text">试试更换关键词~</p>
      </div>
    </div>

    <div class="techSearchMask" @click="showSelector=false" v-if="showSelector"></div>



  </div>
</template>

<script>
import mixin from 'mixins/'
import searchBox from '@/components/searchBox'
import talentList from './components/list'
import selector from '@/components/searchFilter/selector'

/**地区筛选**/
const provinces = {
    330000: '浙江省',
    440000: '广东省',
    310000: '上海市',
    110000: '北京市',
    120000: '天津市',
    130000: '河北省',
    140000: '山西省',
    210000: '辽宁省',
    220000: '吉林省',
    320000: '江苏省',
    340000: '安徽省',
    350000: '福建省',
    360000: '江西省',
    370000: '山东省',
    410000: '河南省',
    420000: '湖北省',
    430000: '湖南省',
    460000: '海南省',
    500000: '重庆市',
    510000: '四川省',
    520000: '贵州省',
    530000: '云南省',
    610000: '陕西省',
    620000: '甘肃省',
    630000: '青海省',
    230000: '黑龙江省',
    540000: '西藏自治区',
    150000: '内蒙古自治区',
    450000: '广西壮族自治区',
    640000: '宁夏回族自治区',
    650000: '新疆维吾尔自治区',
    710000: '台湾省',
    810000: '香港特别行政区',
    820000: '澳门特别行政区'
};
function getAreaList () {
  let arr = [
    {
      id: '',
      name: '所有地区'
    }
  ];
  for (let key in provinces){
    arr.push({
      id: key,
      name: provinces[key]
    })
  }
  return arr
}
let areaOptions = getAreaList();

let selectList = [
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
  },
  {
    key: 'areaCode',
    selected: {
      name: '所有地区',
      id: ''
    },
    options: areaOptions
  },
  {
    key: 'sortType',
    selected: {
      name: '默认排序',
      id: '0'
    },
    options: [
      {
        name: '默认排序',
        id: '0'
      },
      {
        name: '按专利',
        id: '1'
      },
      {
        name: '按论文',
        id: '2'
      },
      {
        name: '按项目',
        id: '3'
      }
    ]
  },
];

export default {
  mixins: [mixin],
  components: {
    searchBox, talentList, selector
  },
  data () {
    return {
      tabs: ['领域找人', '姓名找人', '单位找人'],
      activeIndex: 0,
      keyword: '',
      placeholder: '请输入科技关键词，如"知识产权"',
      keywordList: [],  //模糊搜索关键词
      showTab: true,  //显示tab栏
      talentList: [],  //人才列表
      showSelector: false,  //显示筛选条件
      selectorList: selectList,
      showFil: false,  //显示筛选栏
      unitList: [],  //院校列表
      pageStart: 0,  //开始的条数
      pageSize: 10,  //每页条数
      totalSize: 0,  //总条数
      moModre: false,  //没有更多了
      loading: false,

      unitType: null,
    }
  },
  async onShow () {
  },
  mounted() {
    let query = this.$root.$mp.query;
    if (query.keyword) {
      this.activeIndex = query.activeIndex || 0;
      this.searchFn(query.keyword);
    }
  },
  onUnload() {
    this.activeIndex = 0;
    this.keyword = '';
    this.talentList = [];
    this.showFil = false;
  },
  // 上啦加载，与methods方法同级
  async onReachBottom () {
    console.log(this.pageStart + this.pageSize);
    console.log(this.totalSize);
    if (this.pageStart + this.pageSize < this.totalSize) {
      this.pageStart = this.pageStart + this.pageSize;
      console.log(this.pageStart);
      this.searchByKeyFn(this.keyword);
    }
    else{
      this.moModre = true;
    }
  },
  methods: {
    // 去人才详情
    goDetailFn (data) {
      console.log(data);
      this.$router.push({path: '/pages/talents/talentDetail?id=' + data.expertId })
    },
    // 去单位详情
    goUnitDetailFn (item) {
      this.$router.push({path: '/pages/talents/unitDetail?name=' + item.unit })
    },
    // 选择筛选条件
    selectorChange (key, item, index) {
      this[key] = item.id;
      this.pageStart = 0;
      this.searchByKeyFn(this.keyword);
    },
    selectTabFn (data) {
      this.activeIndex = data;
      if (data == 0) {
        this.selectorList = selectList;
        this.placeholder = '请输入科技关键词，如"知识产权"';
      }
      else if (data == 1) {
        this.selectorList = selectList.slice(0, 2);
        this.placeholder = '请输入人才姓名，如“袁隆平”';
      }
      else if (data == 2) {
        this.selectorList = selectList.slice(0, 1);
        this.placeholder = '请输入科研机构名称，如“北京大学”';
      }
      this.talentList = [];
      this.unitList = [];
      this.searchByKeyFn(this.keyword); //搜索
    },
    // 搜索
    searchFn (data) {
      this.keyword = data;
      this.searchByKeyFn(this.keyword); //搜索
    },
    // 模糊搜索
    async suggestFn (data) {
      this.keyword = data;
      // 点取消;
      if (data == '') {
        this.keywordList = [];
        this.showFil = false;
        this.showTab = true;
        this.searchByKeyFn('');
        return
      }
      try {
        let resp;
        if (this.activeIndex == 0) {
          resp = await this.API.talents.suggestField(data);
          this.keywordList = resp.data.keyword;
        }
        else if (this.activeIndex == 1) {
          resp = await this.API.talents.suggestExpertName(data);
          this.keywordList = resp.data;
        }
        else if (this.activeIndex == 2) {
          resp = await this.API.talents.suggestUnit(data);
          this.keywordList = [];
          resp.data.forEach( item => {
            this.keywordList.push(item.unitName)
          })
        }
        if (this.keywordList.length) {
          this.showTab = false;
          this.showFil = false;
        }
        else{
          this.showTab = true;
          this.showFil = true;
        }
      }
      catch (e) {}
    },
    // 根据模糊搜索的关键词搜索
    searchByKeyFn (data) {
      this.keyword = data;
      if (this.activeIndex == 0 || this.activeIndex == 1) {
        this.searchByFieldFn(this.activeIndex);
      }
      else if (this.activeIndex == 2) {
        this.searchUnitFn();
      }
    },
    // 领域找人  || 姓名找人
    async searchByFieldFn (type) {
      let data = {
        unitType: this.unitType,
        areaCode: this.areaCode,
        sortType: this.sortType,
        fieldType: '',
        keyword: this.keyword,
        start: this.pageStart,
        pageSize: this.pageSize,
        unitName: '',
      }
      this.loading = true;
      try {
        let resp;
        if (type == 0) {
          resp = await this.API.talents.searchByField(data);  //领域找人
        }
        else if(type == 1) {
          resp = await this.API.talents.searchExpertByName(data);  //姓名找人
        }
        let list_ = resp.data ? resp.data.list : [];
        if (this.pageStart == 0) {
          this.talentList = list_;
        }
        else{
          this.talentList = [...this.talentList, ...list_];
        }
        this.totalSize = resp.data.numFound || 0;
        this.talentList.forEach(item => {
          item.headText = item.name.slice(0, 1);
        })
        if (this.talentList.length) {
          this.showFil = true;
        }
        this.showTab = true;
        this.loading = false;
      }
      catch (e) {}
    },
    // 单位找人
    async searchUnitFn () {
      if (!this.keyword) {
        return
      }
      let data = {
        index: this.pageStart,
        pageSize: this.pageSize,
        typeCode: (this.unitType && this.unitType!=0) ? '0' + this.unitType : null,
        unit: this.keyword
      }
      try {
        let resp = await this.API.talents.searchUnit(data);
        let list_ = resp.data ? resp.data.unitMapList : [];
        if (this.pageStart == 0) {
          this.unitList = list_;
        }
        else{
          this.unitList = [...this.unitList, ...list_]
        }
        this.totalSize = resp.data.count || 0;
        this.unitList.forEach(item => {
          item.headText = item.unit.slice(0, 1);
          switch (item.typeCode) {
            case '01': item.typeName = '大专院校'; break;
            case '02': item.typeName = '科研院所'; break;
            case '03': item.typeName = '企业'; break;
          }
        })
        if (this.unitList.length) {
          this.showFil = true;
        }
        this.showTab = true;
      }
      catch (e) {}
    }
  }
}
</script>

<style lang="scss">
  .talents_index {
    position: absolute; height: 100%;
    .search_input {z-index: 3; position: relative;}
    .pub_navbar {z-index: 3; border-bottom: 1px solid #eee;}
    .bg_box {
      width: 100%; height: 100%; margin: 0 auto; text-align: center; padding: 400px 0 0 0; background: #fff; position: absolute; bottom: 0;
      img {width: 392px; height: 392px; margin-bottom: 20px; }
      .text {color: #666; font-size: 26px;}
    }
    .organization_list {
      .more {width: 40px; height: 40px;}
    }
    .sugeest_list {
      width: 100%; min-height: 70%; background: #fff; position: relative; z-index: 1;
      .item {
        margin: 0 30px; height: 94px; line-height: 94px; font-size: 28px; color: #333; border-bottom: 1px solid #eee;
        &:last-child {border-bottom: none;}
      }
    }
    .techSearchMask{position: absolute;left: 0;top: 258px;right: 0;bottom: 0;background-color: rgba(0, 0, 0, 0.5); z-index: 1;}
  }
</style>
