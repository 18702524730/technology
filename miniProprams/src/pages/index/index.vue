<template>
  <div class="index_home" :class="{'fixed': showGuide}" @click="blurFn">
    <swiper class="swiper_class" :indicator-dots="indicatorDots"
      :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" indicator-dots="true" indicator-color="rgba(255,255,255,.4)" indicator-active-color="rgba(255,255,255,.8)" previous-margin="40rpx" next-margin="40rpx"  @change="bannerChangeFn">
      <block v-for="(item, index) in bannerList" :key="index" >
        <swiper-item class="item">
          <div class="img_box">
            <image :src="item.coverUrl" class="slide-image" width="355" height="150"/>
          </div>
        </swiper-item>
      </block>
    </swiper>

    <!-- <div class="swiper_text_box row-between">
      <p class="tit" v-for="(item, idx) in bannerList" :key="idx" v-if="idx == slot_index">{{ item.title }}</p>
      <p class="dot_list row-end">
        <span class="slot" v-for="(item, index_) in bannerList" :key="index_" :class="{'active': index_ == slot_index}"></span>
      </p>
    </div> -->

    <div class="nav_box row-start">
      <div class="item" @click="goDetailPageFn(1)">
        <img src="~assets/img/homepage/nav_1.png" class="icon" alt="">
        <p class="name">科技项目申报</p>
        <img src="~assets/img/homepage/hot.png" class="hot" alt="">
      </div>
      <div class="item" @click="goDetailPageFn(6)">
        <img src="~assets/img/homepage/nav_5.png" class="icon" alt="">
        <p class="name">知查查</p>
      </div>
      <!-- <div class="item" @click="goIpFn(1)">
        <img src="~assets/img/homepage/nav_7.png" class="icon" alt="">
        <p class="name">专利管家</p>
      </div> -->
      <div class="item" @click="goDetailPageFn(8)">
        <img src="~assets/img/homepage/nav_8.png" class="icon" alt="">
        <p class="name">专利价值评估</p>
      </div>
      <div class="item" @click="goDetailPageFn(2)">
        <img src="~assets/img/homepage/nav_2.png" class="icon" alt="">
        <p class="name">IPO知产尽调</p>
      </div>
      <div class="item mt30" @click="goDetailPageFn(7)">
        <img src="~assets/img/homepage/nav_6.png" class="icon" alt="">
        <p class="name">社群圈</p>
      </div>
      <div class="item mt30" @click="goDetailPageFn(4)">
        <img src="~assets/img/homepage/nav_4.png" class="icon" alt="">
        <p class="name">求助站</p>
      </div>
    </div>

    <div class="tab_box row-between">
      <!-- 导航条 -->
      <tab-bar :tabs="tabs" :activeIndex="tabIndex" width="480" marginLeft="4" @selectTab="selectTabFn"></tab-bar>
      <!-- :class="{'focus_box': searchFocus}" -->
      <div class="search_box row-start">
        <input type="text" class="input" :placeholder="placeholder" @click.stop="focusFn">
        <!-- <div class="suggest_box" v-if="searchFocus">
          <div class="li" v-for="(item, index) in suggestList" :key="index" v-if="index <= 9" @click.stop="goDetailFn(item.id)">{{ item.title }}</div>
        </div> -->
      </div>
    </div>

    <div class="list_wrap" v-if="msgList.length">
      <div class="l_item row-between" v-for="(item, index) in msgList" :key="index" @click="goDetailFn(item.id)">
        <div class="i_text" :class="{'i_text_w': !item.cover}">
          <p class="tit">{{ item.title }}</p>
          <p class="date">{{ item.author || '江干区科技局' }} · {{ item.pubDate }}</p>
        </div>
        <div class="i_img" v-if="item.cover">
          <img :src="item.coverUrl" alt="">
        </div>
      </div>
    </div>
    <div class="list_wrap" v-else>
      <div class="l_item row-between">
        <div class="i_text">
          <p class="tit" style="color: #999">暂无内容</p>
        </div>
      </div>
    </div>

    <div class="bottom_info" v-if="!loading && noMore">
      <img src="~assets/img/homepage/logo.png" alt="">
      <p class="copy_right">长三角(杭州·江干)科技大市场版权所有</p>
      <p class="tech">指导单位：杭州江干科技局</p>
      <p class="tech">技术支持单位：杭州拾贝知识产权服务有限公司</p>
    </div>

    <!-- 联系我们 -->
    <img src="~assets/img/homepage/about.png" alt="" class="about_fixed" :class="{'bottom_fixed': bottomFixed}" @click="goDetailPageFn(5)">
    <popUp :show.sync="showPop"/>

    <!-- 引导页 -->
    <div class="guid_box" v-if="showGuide">
      <div class="step" v-if="!nextStep" @click="nextStep=true">
        <img src="~assets/img/homepage/guid_1.png" alt="" class="project_img">
        <img src="~assets/img/homepage/guid_2.png" alt="" class="text_img">
      </div>
      <div class="step" v-if="nextStep" @click="guideEndFn()">
        <img src="~assets/img/homepage/guid_3.png" alt="" class="search_img">
        <img src="~assets/img/homepage/guid_4.png" alt="" class="search_text">
      </div>
    </div>

    <div class="search_panel" v-if="searchFocus">
      <div class="search_wrap">
        <input type="text" class="input" placeholder="请输入想搜索的内容" :focus="searchBoxFocus" v-model="title" @input="searchFn" >
        <span @click.stop="leaveFn">取消</span>
      </div>
      <div class="result" v-if="loaded">
        <div class="title">搜索结果</div>
        <p v-if="!suggestList.length">暂无相关内容</p>
        <template v-else>
          <p v-for="(item, index) in suggestList" :key="index" v-if="index <= 9" @click.stop="goDetailFn(item.id)">{{ item.title }}</p>
        </template>
      </div>
    </div>

  </div>
</template>

<script>
import mixin from 'mixins/'
import filter from 'utils/filters'
import popUp from './components/pop.vue'
import tabBar from '@/components/ui/tabBar';
const ID = 34; // 资讯类别id
export default {
  components: {
    popUp, tabBar
  },
  mixins: [mixin],
  data () {
    return {
      showPop: false,
      Filters: filter.filters,
      tabs: ['要闻', '政策', '活动', '需求'],
      tabIndex: 0,
      imgUrls: [
        {url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', tit: '创新者在线-专注于企业科技价值'},
        {url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', tit: '222创新者在线-专注于企业科技价值'},
        {url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', tit: '324创新者在线'}
      ],
      slot_index: 0,
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 500,
      circular: true,

      searchFocus: false,  //搜索框获取焦点
      searchBoxFocus: false, //获取焦点
      placeholder: '搜索',
      msgList: [],
      suggestList: [],  //模糊搜索建议
      title: '',
      pageIndex: 1,
      count: 5,
      totalPage: 1,
      noMore: false,
      loading: false,
      bannerList: [],
      auth: {},
      isLogin: false,
      showGuide: true, //引导页
      nextStep: false, //下一步
      bottomFixed: false, //滚到底部联系我们不显示在最底部
      loaded: false,
    }
  },
  // 上啦加载，与methods方法同级
  async onReachBottom () {
    this.bottomFixed = true;
    if (this.pageIndex < this.totalPage) {
      this.pageIndex ++;
      this.getListFn();
      this.noMore = false;
    }
    else{
      this.noMore = true;
    }
  },
  mounted() {
    this.checkLoginAndMark();
    this.getContentListFn();  //轮播图资讯
    this.initFn();  //初始化查询
  },
  async onShow () {
    this.title = '';
    this.searchFocus = false; //初始化
    this.suggestList = [];
    let showGuide = this.$storage.get('showGuide');
    if(showGuide === ''){  //新用户
      this.showGuide = true;
    }
    else if (showGuide === false){  //老用户
      this.showGuide = false;
      this.showPop = false;
    }
    // this.redirect();  //默认去指定的页面
  },
  // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    let memberId = this.$storage.get('auth').member_id;
    obj = {
      title: '链科，链接每一个企业的科技价值！',
      path: "/pages/index/index?memberId="+ memberId,
      //imageUrl: 'https://www.ipsebe.com/cms/webfile/upload/2018/12-14/18-06-0608961222801360.jpg'
    }
    return obj;
  },
  methods: {
    // 引导页结束
    guideEndFn () {
      this.showGuide = false;
      this.showPop = true;
      this.$storage.set('showGuide', false);
    },
    // ip 大脑小程序
    goIpFn (type) {
      let path = '';
      switch(type) {
        case 1: path='pages/home/home'; break;  //首页
        case 2: path='pages/evaluation/evaluation-search/evaluation-search'; break;  //专利价值评估
      }
      wx.navigateToMiniProgram({
        appId: 'wxe0112bc6d0b9da8e',
        path,
        envVersion: 'trial'
      });
    },
    // 查询高亮tab
    async initFn () {
      try {
        let [resp1, resp2] = await Promise.all([this.API.home.contentList({categoryIds: ID, count:1}), this.API.home.contentList({categoryIds: 32, count:1})])
        if((!resp1.page.list || !resp1.page.list.length) && resp2.page.list.length){
          this.tabIndex = 1;
          this.getListFn();
          return
        }
        if((!resp2.page.list || !resp2.page.list.length) && resp1.page.list.length){
          this.tabIndex = 0;
          this.getListFn();
          return
        }
        if (resp1.page.list[0].publishDate > resp2.page.list[0].publishDate) {
          this.tabIndex = 0;
          this.getListFn();
        }
        else{
          this.tabIndex = 1;
          this.getListFn();
        }
      }
      catch (e){}
    },
    // 去内部页面
    goDetailPageFn (type) {
      let page = '';
      switch (type) {
        case 1:
          page = '/pages/index/highTech'; break;  //三年双倍增
        case 2:
          page = '/pages/index/ipSurvey'; break;  //IP尽职调查
        case 3:
          page = '/pages/find/index'; break;  //找技术、找专家
        case 4:
          page = '/pages/index/helpStation'; break;  //求助站
        case 5:
          page = '/pages/index/contactUs'; break;  //联系我们
        case 6:
          page = '/pages/ipSearch/searchIndex'; break;  //知查查
        case 7:
          page = '/pages/associationCircle/join'; break;  //社群圈
        case 8:
          page = '/pages/index/ipEvaluation'; break;  //专利价值评估
      }
      this.$router.push(page);
    },
    // 消息详情
    goDetailFn (id) {
      this.leaveFn();
      this.$router.push(`/pages/index/msgDetail?id=${id}`)
    },
    searchFn () {
      this.searchFocus = true;
      this.loaded = false;
      this.getListFn(true);
    },
    confirmSearchFn () {
      this.searchFocus = false;
      this.suggestList = [];
      this.getListFn();
    },
    // 触发搜索框
    focusFn () {
      this.searchFocus = true;
      this.loaded = false;
      setTimeout(() => {
        this.searchBoxFocus = true;
      }, 200)
    },
    // 离开搜索面板
    leaveFn () {
      this.searchFocus = false;
      this.searchBoxFocus = false;
      //this.title = '';
      this.loaded = false;
    },
    selectTabFn (index) {
      this.tabIndex = index;
      this.title = '';
      this.pageIndex = 1;
      this.msgList = [];
      this.getListFn();
    },
    bannerChangeFn (e) {
      this.slot_index = e.mp.detail.current;
    },
    // 查询资讯列表
    async getListFn (isByTitle) {
      let id = ID;
      switch (this.tabIndex) {
        case 0: id = 34; break;
        case 1: id = 32; break;
        case 2: id = 31; break;
        case 3: id = 35; break;
      }
      this.loading = true;
      try {
        let data = {
          pageIndex: this.pageIndex,
          count: this.count,
          title: this.title
        }
        if (!isByTitle) {
          data.categoryIds = id;
        }
        if (this.searchFocus) {
          data.pageIndex = 1;
        }
        let resp = await this.API.home.contentList(data);
        this.loaded = true;
        let list_ = resp.page.list || [];
        if (this.searchFocus) {
          if (this.title) {
            this.suggestList = list_;
          }
          else{
            this.suggestList = [];
          }
          return
        }
        if (this.pageIndex == 1) {
          this.msgList = list_;
        }
        else{
          this.msgList = [...this.msgList, ...list_];
        }
        this.totalPage = resp.page.totalPage;
        this.msgList.forEach( item => {
          item.pubDate = this.Filters.pubDateFn(item.publishDate, 7, 'date');
          item.coverUrl = CONFIG.webfileUrl + item.cover;
        })
        if (this.pageIndex < this.totalPage) {
          this.noMore = false;
        }
        else{
          this.noMore = true;
        }
        this.loading = false;
      }
      catch (e){}
    },
    // 查询轮播列表
    async getContentListFn () {
      let data = {
        categoryId: 33,
        pageIndex: 1,
        count:10
      }
      try {
        let resp = await this.API.home.contentList(data);
        this.bannerList = resp.page.list;
        this.bannerList.forEach( item => {
          item.coverUrl = CONFIG.webfileUrl + item.cover;
        })
      }
      catch (e){}
    }
  }
}
</script>

<style lang="scss">
  @keyframes floatUp {
    0% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(-4px);
    }
    50% {
      transform: translateY(0);
    }
    75% {
      transform: translateY(4px);
    }
    100% {
      transform: translateY(0);
    }
  }
  .index_home {
    .swiper_class {
      width: 100%; height: 390px; padding: 20px 0;
      .item {
        padding: 0 10px;
        .img_box {
          position: relative; width: 100%; height: 100%;
          image {width: 100%; height: 100%; border-radius: 10px;}
        }
      }
    }
    .swiper_text_box {
      position: absolute; top: 370px; left: 0; width: 100%; height: 80px; line-height: 80px; background: rgba(0,0,0,.5);
      .tit {color: #fff; font-size: 28px; padding-left: 30px; font-weight: 600;}
      .dot_list {
        width: 120px; height: 16px; margin-right: 30px;
        .slot {width: 16px; height: 16px; border-radius: 50%; background: #fff; opacity: 0.4; margin-left: 16px; display: inline-block;}
        .active {opacity: 0.8;}
      }
    }
    .nav_box {
      padding: 40px 30px; background: #fff; flex-wrap: wrap;
      .item {
        width: 25%; text-align: center; position: relative;
        .icon {width: 82px; height: 82px; margin-bottom: 10px;}
        .name {width: 100%; font-size: 24px; color: #333; text-align: center;}
        .hot {width: 40px; height: 50px; position: absolute; right: 23%; top: -10px; animation: floatUp 1.2s linear infinite;}
      }
      .mt30 {margin-top: 30px;}
    }
    .tab_box {
      padding-left: 15px; padding-right: 30px; height: 102px; background: #fff; margin-top: 20px;
      .search_box {
        width: 150px; height: 60px; padding: 0 20px; line-height: 60px; border-radius: 30px; border: 1PX solid #eee; transition: all 0.5s; background:#fff;
        img {width: 32px; height: 32px; margin-right: 10px; display: inline-block; }
        .input {font-size: 28px; width: 96px; display: inline-block; transition: all 0.5s; background: url(~assets/img/homepage/search.png) no-repeat left center; background-size: 32px 32px; padding-left: 40px; }
      }
      .focus_box {
        width: 390px; position: relative; z-index: 10;
        input {width: 300px;}
        .suggest_box {
          width: 390px; height: auto; position: absolute; left: 0; top: 70px; z-index: 10; background: #fff; box-shadow:0px 4px 16px 0px rgba(54,93,176,0.11);
          .li {
            margin: 0 20px; height: 74px; line-height: 74px; border-bottom: 1px solid #eee; color: #333; font-size: 26px; overflow: hidden;white-space: nowrap; text-overflow:ellipsis;
            &:last-child {border-bottom: none;}
          }
        }
      }
    }
    .list_wrap {
      width: 100%; height: auto; background: #fff;
      .l_item {
        margin-left: 30px; padding: 30px 30px 30px 0; border-bottom: 1px solid #eee;
        &:last-child {border-bottom: none;}
        .i_text {
          width: 470px; height: 180px; display: flex; justify-content: space-between; flex-direction: column; align-items: flex-start;
          .tit {font-size: 32px; color: #333; line-height: 42px;}
          .date {font-size: 26px; color: #999; text-align: left;}
        }
        .i_text_w{width: 630px;}
        .i_img {
          width: 180px; height: 180px; border-radius: 10px; overflow: hidden; background: #eee;
          img {width: 100%; height: 100%;}
        }
      }
    }
    .empty_box {
      width: 100%; height: 100%; margin: 0 auto; text-align: center; padding: 50px 0 0 0; background: #f8f8f8;
      img {width: 300px; height: 300px; margin-bottom: 20px; }
      .text {color: #bbb; font-size: 26px; width: 420px; margin: 0 auto;}
    }
    .bottom_info {
      padding: 30px 0 20px 0;
      img {display: block; width: 108px; height: 80px; margin: 0 auto 14px auto; }
      .copy_right {width: 100%; text-align: center; color: #333; font-size: 24px; margin-bottom: 6px;}
      .tech {font-size: 24px; color: #999; width: 100%; text-align: center; margin-bottom: 6px;}
    }
    .about_fixed {width: 193px; height: 144px; position: fixed; right: 20px; bottom: 40px;}
    .bottom_fixed {bottom: 120px;}
    .guid_box {
      position: fixed; left:0; top:0; width: 100%; height: 100%; background: rgba(0,0,0,.7); z-index: 1003;;
      .project_img {width: 212px; height: 194px; position: absolute; top: 390px; left: 8px; z-index:10;}
      .text_img {width: 674px; height: 509px; position: absolute; top: 410px; left: 38px;}
      .search_img {width: 164px; height: 166px; position: absolute; top: 402px; left: 214px;}
      .search_text {width: 490px; height: 397px; position: absolute; top: 462px; left: 130px;}
    }
    .search_panel{
      position: fixed; top: 0; left: 0;height: 100%;width: 100%;background-color: #fff;z-index: 1003;
      .search_wrap{
        position: relative;height: 64px;margin: 20px 20px 50px;background-color: #F8F8F8;border-radius: 32px;border: 1px solid #F8F8F8;
        .input {font-size: 28px;width: 600px; height: 62px; display: inline-block; background: #F8F8F8 url(~assets/img/homepage/search.png) no-repeat 20px center; background-size: 32px 32px; padding-left: 72px;border-radius: 32px;}
        span{position: absolute; right: 30px; top: 12px;height:40px; line-height: 40px;font-size:28px;color: #333;z-index: 1005;}
      }
      .result{
        padding: 0 30px;
        .title{font-size:28px;height: 40px;line-height: 40px;color: #999999;margin-bottom: 10px;}
        p{padding: 27px 0;font-size:28px;height: 94px;line-height: 40px;color: #333;border-bottom: 1px solid #EEEEEE;text-overflow:ellipsis;overflow:hidden;white-space:nowrap; }
      }
    }
  }
  .fixed {
    position: relative; width: 100%; height: 100%; overflow: hidden;
  }
</style>
