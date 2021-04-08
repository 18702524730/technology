<template>
  <div class="talents_unit" :class="{'page_overflow': showDetail}">
    <div class="talents_list unit_card" >
      <div class="t_item" >
        <img src="~assets/img/talents/detail_bg.png" class="unit_bg" alt="">
        <p class="back_home" @click="goHomeFn">
          <span class="text">首页</span>
          <img src="~assets/img/icon/tag_bg.png" alt="">
        </p>
        <div class="info_box row-start">
          <div class="head_img">
            <img :src="detailObj.expertAvatar" alt="" v-if="detailObj.expertAvatar">
            <span v-if="!detailObj.expertAvatar" class="text">{{ detailObj.headText }}</span>
          </div>
          <div class="text_box">
            <p class="person row-start">
              <span class="name">{{ detailObj.expertName }}</span>
              <span class="lab" @click="showDetailFn" v-if="detailObj.introduction || detailObj.achievementIntroduction || detailObj.honor">人才简介</span>
            </p>
            <p class="tag">{{ detailObj.expertUnit }}</p>
          </div>
        </div>
        <div class="achievement_box row-between">
          <p class="content">
            <span class="li">单位文献:  &nbsp;&nbsp; 专利{{ detailObj.patentNum}}</span>
            <span class="li">论文{{ detailObj.paperNum }}</span>
            <span class="li">项目{{ detailObj.projectNum }}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="tab_icon row-center">
      <div class="tab_item" @click="goTableFn(1)">
        <img src="~assets/img/talents/type_1.png" class="img1" alt="">
        <p class="name">自我网络</p>
      </div>
      <div class="tab_item" @click="goTableFn(2)">
        <img src="~assets/img/talents/type_2.png" class="img2" alt="">
        <p class="name">综合表征</p>
      </div>
      <div class="tab_item" @click="goTableFn(3)">
        <img src="~assets/img/talents/type_3.png" class="img3" alt="">
        <p class="name">领域云图</p>
      </div>
    </div>    

    <!-- 导航条 -->
    <u-navbar :tabs="tabs" :activeIndex="activeIndex" @selectTab="selectTabFn"  />

    <!-- 人才详情列表 -->
    <div class="detail_list">
      <div class="item" v-for="(item, index) in detailList" :key="index" @click="goDetailFn(item)">
        <p class="title">{{ item.name }}</p>
        <p class="auth">
          <span class="name" v-if="activeIndex == 0">{{ item.inventors }}</span>
          <span class="name" v-if="activeIndex == 1">{{ item.authors }}</span>
          <span class="name" v-if="activeIndex == 2">{{ item.member }}</span>
          <span class="unit" >
            <span class="line"></span>
            <span v-if="activeIndex == 0">{{ item.applicant }}</span>
            <span v-if="activeIndex == 1 || activeIndex == 2">{{ item.unit }}</span>
          </span>
        </p>
        <p class="lab_box row-between">
          <span class="lab" v-if="activeIndex == 0 && item.patentTypeName">{{ item.patentTypeName }}</span>
          <span class="lab" v-if="activeIndex == 1 && item.journalName">{{ item.journalName }}</span>
          <span class="lab" v-if="activeIndex == 2 && item.projType">{{ item.projType }}</span>
          <span class="date" v-if="activeIndex == 0">{{ item.publicationDate }}</span>
          <span class="date" v-if="activeIndex == 1">{{ item.journalNo }}</span>
          <span class="date" v-if="activeIndex == 2">{{ item.year }}</span>
        </p>
        <p class="abstracts" v-if="item.patentAbstract">{{ item.patentAbstract }}</p>
        <p class="abstracts" v-if="item.paperAbstract">{{ item.paperAbstract }}</p>
      </div>
    </div>

    <!-- 空页面 -->
    <div class="empty_box row-center" v-if="!detailList.length">
      <div class="content">
        <img src="~assets/img/icon/null.png" alt="" class="icon">
        <p class="text">暂无收录哦 </p>
        <p class="text">我们可以看一下其他信息~</p>
      </div>
    </div>

    <!-- 人才简介 -->
    <div class="detail_box_wrap" v-show="showDetail">
      <div class="detailMask" @click="hideFn"></div>
      <div class="talent_detail">
        <div class="close" @click="hideFn">×</div>
        <div class="info_wrap">
          <div class="info_box row-start">
            <div class="head_img">
              <img :src="detailObj.expertAvatar" alt="" v-if="detailObj.expertAvatar">
              <span v-if="!detailObj.expertAvatar">{{ detailObj.headText }}</span>
            </div>
            <div class="text_box">
              <p class="person">
                <span class="name">{{ detailObj.expertName }}</span>
                <span class="lab" v-if="detailObj.expertTitle">
                  <span class="line"></span>
                  {{ detailObj.expertTitle }}
                </span>
              </p>
              <p class="school">{{ detailObj.expertUnit }}</p>
            </div>
          </div>
          <div class="tag_box" >
            <span class="tag" v-for="(it, idx) in detailObj.abilityArr" :key="idx">{{ it }}</span>
          </div>
        </div>
        
        <div class="item_box" v-if="detailObj.introduction">
          <p class="title">个人简介</p>
          <div class="content">{{ detailObj.introduction }}</div>
        </div>
        <div class="item_box" v-if="detailObj.achievementIntroduction">
          <p class="title">科技成果</p>
          <div class="content">{{ detailObj.achievementIntroduction }}</div> 
        </div>
        <div class="item_box" v-if=detailObj.honor>
          <p class="title">所获荣誉</p>
          <div class="content">{{ detailObj.honor }}</div> 
        </div>
      </div>
    </div>
    
    


  </div>
</template>

<script>
import mixin from 'mixins/'
import talentList from './components/list'
import Filter from 'utils/filters'

export default {
  mixins: [mixin],
  components: {
    talentList
  },
  data () {
    return {
      tabs: ['专利', '论文', '项目'],
      activeIndex: 0,
      detailObj: {},  //人才信息
      detailList: [],  //人才详情列表
      pageStart: 0,  //开始的条数
      pageSize: 10,  //每页条数
      totalSize: 0,  //总条数
      sortType: 0,
      fieldType: null,
      moModre: false,
      loading: false, 
      showDetail: false, //人才详情弹窗
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
    showDetailFn () {
      this.showDetail = true;
    },
    hideFn (){
      this.showDetail = false;
    },
    // 回首页
    goHomeFn () {
      this.$router.replace({path: '/pages/index/index'});
    },
    // 详情页
    goDetailFn (item) {
      let url = '';
      switch (this.activeIndex) {
        case 0: 
          url = `/pages/find/patentDetail?id=${item.patentId}`; break;
        case 1: 
          url = `/pages/find/paperDetail?id=${item.paperId}`; break;
        case 2: 
          url = `/pages/find/projectDetail?id=${item.projectId}`; break;
      }
      this.$router.push(url);
    },
    goTableFn (type) {
      this.$router.push(`/pages/talents/graph?type=${type}&id=${this.detailObj.expertId}`)
    },
    selectTabFn (index) {
      this.activeIndex = index;
      console.log(index);
      switch (index) {
        case 0: 
          this.detailList = this.detailObj.patents; break;
        case 1: 
          this.detailList = this.detailObj.papers; break;
        case 2: 
          this.detailList = this.detailObj.projects; break;
      }
      console.log(22);
      this.detailList.forEach( item => {
        item.patentTypeName = Filter.filters.patentTypeTag(item.patentType);
        if (item.patentAbstract) {
          item.patentAbstract = Filter.filters.ellipsisContent(item.patentAbstract, 49);
        }
        if (item.paperAbstract) {
          item.paperAbstract = Filter.filters.ellipsisContent(item.paperAbstract, 49);
        }
      })
      console.log(this.detailList);
    },
    // 选择筛选条件
    selectorChange (key, item, index) {
      this[key] = item.id;
      this.pageStart = 0;
      this.searchByUnitFn();
    },
    // 查询单位详情
    async searchByUnitFn () {
      this.detailList = [];
      let data = {
        id: this.$route.query.id || 'e5fe286c-c04f-424d-bd70-0499db8cd00f'
      }
      this.loading = true;
      try {
        let resp = await this.API.talents.getExpertInfo(data);
        this.detailObj = resp.data;
        this.detailObj.headText = this.detailObj.expertName.slice(0, 1);
        this.detailObj.abilityArr = this.detailObj.ability ? this.detailObj.ability.split('、') : [];
        this.selectTabFn(0);
        this.loading = false;
      }
      catch (e) {}
    }
  }
}
</script>

<style lang="scss">
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .talents_unit {
    position: absolute; height: 100%; width: 100%;
    .unit_card {
      background: #fff; padding: 20px 0 0 0; position: relative; z-index: 3;
      .t_item {
        background:linear-gradient(135deg,rgba(61,139,255,1) 0%,rgba(21,102,223,1) 100%); margin: 0 auto;
        .unit_bg {width: 320px; height: 228px; position: absolute;  right: 0; bottom: 0;}
        .back_home {
          position: absolute; right: 0; top: 20px; width: 96px; height: 44px; line-height: 44px; 
          .text {width: 100%; height: 100%; color: #fff; font-size: 24px; text-align: center; position: absolute; z-index: 3;}
          img {width: 100%; height: 100%; position: absolute; left: 0; top: 0;}
        }
        .info_box {
          height: 120px; position: relative; z-index: 2;
          .head_img {
            width: 120px; height: 120px; border: 3px solid #73A9FB;
            .text { color: #7585A7; font-size: 38px; line-height: 114px;}
          }
        }
        .text_box {
          .person {
            margin-bottom: 14px;
            .name { color: #fff; font-weight: 600;}
            .lab {width: 118px ;height: 38px; line-height: 36px; background: #fff; border-radius: 22px; opacity: 0.9; color: #2272E9; font-size: 22px; text-align: center; display: inline-block; padding: 0; }
          }
          .tag {width: auto; display: inline-block; border-radius: 5px; height: 44px; line-height: 44px; color: rgba(255,255,255,.8); font-size: 24px; }
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
      width: 100%; height: 150px; background: #fff; border-bottom: 1px solid #eee; position: relative; z-index: 10;
      .tab_item {
        flex: 1; text-align: center;
        img {width: 50px; height: 50px;}
        .name {font-size: 24px; color: #333;}
      }
    }
    .detail_list {
      width: 100%; height: auto; padding: 20px;
      .item {
        margin-bottom: 20px; border-radius: 10px; background: #fff; padding: 30px;
        .title {font-size: 30px; color: #333; width: 630px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; margin-bottom: 10px;}
        .auth {
          width: 100%; margin-bottom: 20px;
          .name {font-size: 26px; color: #999; margin-right: 30px;}
          .unit {
            font-size: 26px; color: #999; position: relative; padding-left: 10px;
            .line {position: absolute; left: 0; top: 6px; width: 2px; height: 24px; background: #999;}
          }
        }
        .lab_box {
          .lab {padding: 0 20px; height: 44px; line-height: 42px; border: 1px solid #3576FF; color: #3576FF; font-size: 24px; text-align: center; border-radius: 5px;}
          .date {font-size: 26px; color: #999;}
        }
        .abstracts {width: 100%; max-height: 100px; border-top: 1px solid #eee; font-size: 26px; color: #666; padding-top: 20px; margin-top: 20px; overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;}
      }
    }
    .empty_box {
      top: 510px;
    }
    .detail_box_wrap {
      position: fixed;left: 0;top: 0; right: 0;bottom: 0; z-index: 501; transition: all 0.5s; animation: fadeIn linear 0.2s;
      .detailMask {width: 100%; height: 100%; position: absolute; background-color: rgba(0, 0, 0, 0.5);}
      .talent_detail {
        position: fixed; left: 30px; top:50%; width: 690px; max-height: 1100px; overflow: auto; background: #fff; z-index: 502; padding: 60px 30px; transform: translateY(-50%);
        .close {position:absolute; top:10px; right:24px; font-size:50px; color:#ddd; }
        .info_wrap {
          width: 100%; padding:  0 0 20px 0; border-bottom: 1px dashed #eee;
          .info_box {
            height: 96px; margin-bottom: 20px;
            .head_img {
              width: 96px; height: 96px; line-height: 96px; border-radius: 50%; background: #EAF1FF; text-align: center; color: #7585A7; font-size: 38px; overflow: hidden; margin-right: 20px;
              img {width: 100%; height: 100%;}
            }
            .text_box {
              height: 96px; width: 500px;
               .person {
                width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                .name {color: #333; font-size: 32px; margin-right: 20px;}
                .lab {
                  color: #666; font-size: 26px; padding-left: 10px; position: relative;
                  .line {position: absolute; left: 0; top: 6px; width: 2px; height: 24px; background: #666;}
                }
               }
               .school {width: 100%; font-size: 26px; color: #666; margin-top: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
            }
          }
          .tag_box {
            width: 100%;
            .tag {height: 44px; line-height: 44px; display: inline-block; background: #EAF1FF; border-radius: 24px; text-align: center; color: #3576FF; font-size: 24px; padding: 0 20px; margin-right: 10px; margin-bottom: 10px;}
          }
        }
        .item_box {
          width: 100%; padding: 20px 0; border-bottom: 1px dashed #eee;
          &:last-child {border-bottom: none;}
          .title {font-size: 24px; color: #333; font-weight: bold; margin-bottom: 10px;}
          .content {color: #666; font-size: 24px; line-height: 44px;}
        }
      }
    }
  
  }
  .page_overflow {overflow: hidden;}
</style>
