<template>
  <div class="talents_index">
    <!-- 搜索框 -->
    <search-box :content="keyword" :placeholder="placeholder" @search="searchFn" @suggest="suggestFn" />

    <!-- 筛选条件 -->
    <selector :list="selectorList" :isShow.sync="showSelector" @change="selectorChange" v-if="showFil" />

    <!-- 模糊搜索关键词 -->
    <div class="sugeest_list" v-if="keywordList.length && !showFil">
      <p class="item" v-for="(item, index) in keywordList" :key="index" @click="searchFn(item)">{{ item }}</p>
    </div>

    <!-- 专家大数据 -->
    <div class="experts_big_data" v-if="showFil && expertsList.length">
      <p class="tip">已经找到<span>{{ totalSize }}个</span>结果</p>
      <div class="card_lists">
        <div class="card" v-for="(item, index) in expertsList" :key="index" @click="toExpertDetail(item.expertId)">
          <div class="info">
            <img :src="item.photo" v-if="item.photo">
            <p class="head_text" v-if="!item.photo">{{ item.headText }}</p>
            <div class="column-between">
              <div><span>{{item.name}}</span><span class="grade" v-if="item.title">| {{item.title}}</span></div>
              <p>{{item.school}}</p>
            </div>
          </div>
          <p><span v-for="(it, idx) in item.abilityArr" :key="idx">{{it}}</span><img src="~assets/img/find/arrow_right.png"></p>
          <img v-if="item.title == '教授'" class="grade_img" src="~assets/img/find/js.png">
          <img v-else class="grade_img" src="~assets/img/find/fjs.png">
        </div>
      </div>
    </div>

    <div class="empty_box row-center" v-if="!expertsList.length">
      <div class="content">
        <img src="~assets/img/icon/empty.png" alt="" class="icon">
        <p class="text">哎呀，你来到了信息荒漠，别着急</p>
        <p class="text"> 试试更换关键词~</p>
      </div> 
    </div>

    <div class="techSearchMask" @click="showSelector=false" v-if="showSelector"></div>



  </div>
</template>

<script>
import mixin from 'mixins/'
import searchBox from '@/components/searchBox'
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
    key: 'field',
    selected: {
      name: '所有领域',
      id: ''
    },
    options: [
      {
        name: '所有领域',
        id: ''
      },
      {
        name: '电子信息',
        id: 'A1'
      },
      {
        name: '新能源与节能',
        id: 'A2'
      },
      {
        name: '航空航天',
        id: 'A3'
      },
      {
        name: '新材料',
        id: 'A4'
      },
      {
        name: '化学化工',
        id: 'A5'
      },
      {
        name: '机械电子与制造',
        id: 'A9'
      },
      {
        name: '生物医药',
        id: 'C1'
      },
      {
        name: '资源与环境',
        id: 'C2'
      },
      {
        name: '农林牧渔',
        id: 'Z1'
      }
    ]
  },
  {
    key: 'areaCode',
    selected: {
      name: '所有地区',
      id: ''
    },
    options: areaOptions
  }
];

export default {
  mixins: [mixin],
  components: {
    searchBox, selector
  },
  data () {
    return {
      tabs: ['领域找人', '姓名找人', '单位找人'],
      activeIndex: 0,
      keyword: '',
      placeholder: '请输入需要搜索的专家、单位、科技关键词',
      keywordList: [],  //模糊搜索关键词
      expertsList: [],  //人才列表
      showSelector: false,  //显示筛选条件
      selectorList: selectList,
      showFil: true,  //显示筛选栏
      unitList: [],  //院校列表
      pageStart: 0,  //开始的条数
      pageSize: 10,  //每页条数
      totalSize: 0,  //总条数
      moModre: false,  //没有更多了
      loading: false,
      field: '',
      areaCode: '',
    }
  },
  async onShow () {
  },
  mounted() {
    this.searchFn();
  },
  onUnload() {
    this.activeIndex = 0;
    this.keyword = '';
    this.expertsList = [];
    this.showFil = true;
  },
  // 上啦加载，与methods方法同级
  async onReachBottom () {
    if (this.pageStart + this.pageSize < this.totalSize) {
      this.pageStart = this.pageStart + this.pageSize;
      this.searchByKeyFn();
    }
    else{
      this.moModre = true;
    }
  },
  methods: {
    toExpertDetail(expertId) {
      this.$router.push('/pages/talents/talentDetail?id=' + expertId)
    },
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
      this.searchByKeyFn();
    },
    // 搜索
    searchFn (data) {
      this.keyword = data || '';
      this.searchByKeyFn(); //搜索
    },
    // 模糊搜索
    async suggestFn (data) {
      this.keyword = data;
      // 点取消;
      if (data == '') {
        this.keywordList = [];
        this.showFil = true;
        this.keyword = '';
        this.searchByKeyFn();
        return
      }
      try {
        let resp = await this.API.find.suggestImportSchoolExpert(this.keyword);
        this.keywordList = resp;
        if (this.keywordList.length) {
          this.showFil = false;
        }
      }
      catch (e) {}
    },
    // 专家列表
    async searchByKeyFn () {
      let data = {
        areaCode: this.areaCode,
        field: this.field,
        keyword: this.keyword,
        start: this.pageStart,
        pageSize: this.pageSize,
      }
      this.loading = true;
      try {
        let resp = await this.API.find.getImportSchoolExpertList(data);
        let list_ = resp ? resp.list : [];
        if (this.pageStart == 0) {
          this.expertsList = list_;
        }
        else{
          this.expertsList = [...this.expertsList, ...list_];
        }
        this.totalSize = resp.count || 0;
        this.expertsList.forEach(item => {
          item.headText = item.name.slice(0, 1);
          item.abilityArr = item.ability.split(',');
        })
        if (this.expertsList.length) {
          this.showFil = true;
        }
        this.loading = false;
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
    .empty_box {
      width: 100%; margin: 0 auto; text-align: center; background: #f8f8f8; position: absolute; top: 164px; bottom: 0; z-index: 0;
      .content {
        width: 420px; text-align: center;
        img {width: 300px; height: 300px; margin-bottom: 20px; }
        .text {color: #bbb; font-size: 26px; width: 420px; margin: 0 auto;}
      }
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
    .experts_big_data{
      margin: 0 30px;
      .tip {
        font-size: 24px; color: #666; margin: 20px 0 15px 0;
        span {color: #3576FF;}
      }
      .card_lists{
        min-height: 438px;
        .card{
          width: 100%;height: 219px;border-radius:10px;padding: 30px 10px 30px 30px;background-color: #fff;position: relative;overflow: hidden;box-shadow:0px 4px 16px 0px rgba(54,93,176,0.11);margin-bottom: 20px;
          .info{
            display: flex;flex-direction: row;
            img{width: 95px;height: 95px;border-radius: 95px; background: #EAF1FF;}
            .head_text {width: 95px;height: 95px; line-height: 95px; text-align: center; font-size: 38px; color: #7585A7; border-radius: 95px; background: #EAF1FF; }
            >div{
              margin-left:20px;align-items: flex-start;
              span{font-size:32px;height:45px;line-height:45px;}
              span.grade{margin-left: 20px;height:24px;font-size:26px;line-height:24px;color: #666;}
              p{height:37px;line-height:37px;font-size:26px;color: #666;}
            }
          }
          >p{
            margin-top: 20px;position: relative;height:44px;overflow: hidden;
            span{font-size:24px;color: #3576FF;display: inline-block;height:44px;line-height: 44px;border-radius: 24px;background:#EAF1FF;text-align: center;margin-right: 10px;padding: 0 20px;}
            img{position: absolute;right: 0;top: 0;width: 40px;height: 40px;}
          }
          .grade_img{position: absolute;top: 0;right: 0;width: 73px;height: 73px;}
        }
      }
    }
    .techSearchMask{position: absolute;left: 0;top: 258px;right: 0;bottom: 0;background-color: rgba(0, 0, 0, 0.5); z-index: 1;}
  }
</style>
