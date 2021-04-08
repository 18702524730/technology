<template>
  <div class="talents_unit">
    <div class="talents_list unit_card" >
      <div class="t_item" >
        <img src="~assets/img/talents/unit_bg.png" class="unit_bg" alt="">
        <div class="info_box row-start">
          <div class="head_img">
            <img src="~assets/img/icon/unit_1.png" alt="" v-if="unitObj.typeCode == '01'">
            <img src="~assets/img/icon/unit_2.png" alt="" v-if="unitObj.typeCode == '02'">
            <img src="~assets/img/icon/unit_3.png" alt="" v-if="unitObj.typeCode == '03'">
          </div>
          <div class="text_box">
            <p class="person">
              <span class="name">{{ unitName }}</span>
            </p>
            <p class="tag">{{ unitObj.typeName }}</p>
          </div>
        </div>
        <div class="achievement_box row-between">
          <p class="content">
            <span class="li">单位文献: &nbsp;&nbsp; 专利{{ unitObj.unitPatentNum}}</span>
            <span class="li">论文{{ unitObj.unitPaperNum }}</span>
            <span class="li">项目{{ unitObj.unitProjectNum }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- 筛选条件 -->
    <selector :list="selectorList" :isShow.sync="showSelector" @change="selectorChange"  />

    <!-- 搜索人结果列表 -->
    <talent-list :list="talentList" :total="totalSize" :loading="loading" :moModre="moModre" @select="goDetailFn" v-if="talentList.length && activeIndex != 2"  />  

    <div class="techSearchMask" @click="showSelector=false" v-if="showSelector"></div>

    <!-- 空页面 -->
    <div class="empty_box row-center" v-if="!talentList.length">
      <div class="content">
        <img src="~assets/img/icon/null.png" alt="" class="icon">
        <p class="text">暂无收录哦 </p>
        <p class="text">我们可以看一下其他信息~</p>
      </div>
    </div>


  </div>
</template>

<script>
import mixin from 'mixins/'
import talentList from './components/list'
import selector from '@/components/searchFilter/selector'

let selectList = [
  {
    key: 'fieldType',
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
    talentList, selector
  },
  data () {
    return {
      showSelector: false,  //显示筛选条件
      selectorList: selectList,
      showFil: false,  //显示筛选栏
      unitObj: {},  //单位信息
      talentList: [],  //人才列表
      unitName: '',
      pageStart: 0,  //开始的条数
      pageSize: 10,  //每页条数
      totalSize: 0,  //总条数
      sortType: 0,
      fieldType: null,
      moModre: false,
      loading: false, 
    }
  },
  async onShow () {
    this.unitName = this.$route.query.name || '浙江中医药大学';
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
      this.$router.push(`/pages/talents/talentDetail?id=${item.expertId}`);
    },
    // 选择筛选条件
    selectorChange (key, item, index) {
      this[key] = item.id;
      this.pageStart = 0;
      this.searchByUnitFn();
    },
    // 查询单位详情
    async searchByUnitFn () {
      let data = {
        start: this.pageStart,
        pageSize: this.pageSize,
        sortType: this.sortType,
        fieldType: this.fieldType || null,
        unitName: this.unitName
      }
      this.loading = true;
      try {
        let resp = await this.API.talents.searchByUnit(data);
        this.unitObj = resp.data;
        let list_ = resp.data ? resp.data.list : [];
        this.totalSize = resp.data.numFound;
        if (this.pageStart == 0) {
          this.talentList = list_;
        }
        else{
          this.talentList = [...this.talentList, ...list_];
        }
        switch (this.unitObj.typeCode) {
          case '01': this.unitObj.typeName = '大专院校'; break;
          case '02': this.unitObj.typeName = '科研院所'; break;
          case '03': this.unitObj.typeName = '企业'; break;
        }
        this.loading = false;
      }
      catch (e) {}
    }
  }
}
</script>

<style lang="scss">
  .talents_unit {
    position: absolute; height: 100%; width: 100%;
    .unit_card {
      background: #fff; padding: 20px 0 0 0; position: relative; z-index: 3;
      .t_item {
        background:linear-gradient(135deg,rgba(61,139,255,1) 0%,rgba(21,102,223,1) 100%); margin: 0 auto;
        .unit_bg {width: 320px; height: 228px; position: absolute;  right: 0; bottom: 0;}
        .info_box {
          height: 120px;
          .head_img {width: 120px; height: 120px; border: 3px solid #73A9FB;}
        }
        .text_box {
          .person {
            margin-bottom: 14px;
            .name { color: #fff; font-weight: 600;}
          }
          .tag {width: auto; display: inline-block; border-radius: 5px; height: 44px; line-height: 44px; padding: 0 20px; background: rgba(255,255,255,.2); color: rgba(255,255,255,1); font-size: 24px; }
        }
        .achievement_box {
          position: relative; z-index: 2;
          .content {
            .li {color: #fff; font-size: 26px; margin-right: 40px;}
          }
        }
      }
    }
    .empty_box {
      top: 358px; 
    }
    .techSearchMask{position: absolute;left: 0;top: 258px;right: 0;bottom: 0;background-color: rgba(0, 0, 0, 0.5);}
  }
</style>
