<template>
  <div class="search_detail_page">
    <div class="com_info">
      <div class="com_wrap">
        <div class="company row-start">
          <div class="img_box"><img src="~assets/img/icon/compant_logo.png" alt=""></div>
          <div class="info_box column-start">
            <p class="name row-start"><span class="text">{{ companyName }}</span><span class="lab">{{ companyObj.entstatus }}</span></p>
            <p class="labs" :class="{'oneline': showOneLine}" v-if="companyObj.qualification">
              <span class="item" v-for="(item, index) in companyObj.qualificationList" :key="index">{{ item }}</span>
              <span class="more row-center" @click="showOneLine = false" v-if="showOneLine && companyObj.qualificationList.length>2"><span>展开</span><img src="~assets/img/icon/i_down.png" alt=""></span>
              <span class="more row-center" @click="showOneLine = true" v-if="!showOneLine"><span>收起</span><img src="~assets/img/icon/i_up.png" alt=""></span>
            </p>
            <p class="view row-start">
              <img src="~assets/img/icon/eye.png" alt="">
              <span class="num">浏览：{{ companyObj.pageview || 0 }}</span>
            </p>
          </div>
        </div>
        <div class="info_li row-center">
          <div class="info column_center">
            <p class="key">法定代表人</p>
            <p class="value blue">{{ companyObj.frname }}</p>
          </div>
          <div class="info column_center">
            <p class="key">注册资本</p>
            <p class="value">{{ companyObj.regcap }}</p>
          </div>
          <div class="info column_center">
            <p class="key">成立时间</p>
            <p class="value">{{ companyObj.esdate }}</p>
          </div>
        </div>
      </div>
      <div class="phone_box row-between" @click="goBusinessDetailFn()">
        <p class="text row-center" >
          <img src="~assets/img/icon/business.png" alt="">
          <span class="des">工商信息</span>
          <!-- <span class="des">{{ companyObj.tel }}</span> -->
        </p>
        <p class="more row-center" >
          <!-- <span class="text">更多工商信息</span> -->
          <img src="~assets/img/icon/more.png" alt="">
        </p>
      </div>
    </div>

    <!-- <div class="risk_wrap row-start">
      <div class="img_box column-center">
        <img src="~assets/img/icon/warning.png" alt="" class="warning">
        <img src="~assets/img/icon/risk.png" alt="" class="risk">
      </div>
      <div class="tag_box row-start">
        <div class="tag row-start">
          <span class="text">商标风险</span>
          <span class="num">36条</span>
        </div>
        <div class="tag row-start">
          <span class="text">专利风险</span>
          <span class="num">36条</span>
        </div>
        <div class="tag row-start">
          <span class="text">状态变更</span>
          <span class="num">36条</span>
        </div>
      </div>   
    </div> -->

    <u-navbar :tabs="tabs" :activeIndex="activeIndex" :marginLeft="3" @selectTab="selectTabFn"  />

    <!-- 专利列表 -->
    <ip-list v-if="activeIndex==0 " :total="totalEle" :list="getList"></ip-list>
    <!-- 商标 -->
    <tm-list v-if="activeIndex==1 " :total="totalEle" :list="getList" ></tm-list>
    <!-- 著作权 -->
    <copyright-list v-if="activeIndex==2" :list1="softwareList" :list2="copyrightList" :menuList="menuList" :copyType="copyType" @typeChange="typeChangeFn"></copyright-list>
    <!-- 论文 -->
    <paper-list v-if="activeIndex==3 " :total="totalEle" :list="getList"></paper-list>
    <!-- 项目 -->
    <project-list v-if="activeIndex==4 " :total="totalEle" :list="getList" ></project-list>
    <!-- 加载中 -->
    <div class="noMore" v-if="loading">
      <span class="text">加载中...</span>
    </div>
    <!-- 底线 -->
    <div class="noMore" v-if="!loading && noMore && ((activeIndex!=2 && getList.length) || (activeIndex==2 && copyType==0 && softwareList.length) ||(activeIndex==2 && copyType==1 && copyrightList.length))">
      <span class="text">——我是底线——</span>
    </div>
    <!-- 空数据 -->
    <div class="empty_box row-center" v-if="!loading && isNull">
      <div class="content">
        <img src="~assets/img/icon/null.png" alt="" class="icon">
        <p class="text">暂无收录哦</p>
        <p class="text">我们可以看一下其他信息~</p>
      </div>
    </div>

  </div>
</template>

<script>
import filter from 'utils/filters'
import ipList from './components/ip_list'
import tmList from './components/tm_list'
import copyrightList from './components/copyright_list'
import paperList from './components/paper_list'
import projectList from './components/project_list'


export default {
  components: {
    ipList, tmList, copyrightList, paperList, projectList
  },
  data () {
    return {
      content: '', //搜索关键词
      tabs: ['专利', '商标', '著作权','论文','项目'],
      menuList: ['软件著作权:', '作品著作权:'],
      activeIndex: 0,
      detailData: {tagList: ['国家高新技术企业', '省高新技术企业', '省重大科技创新','国家高新技术企业', '省高新技术企业', '省重大科技创新']},  //详情数据
      showOneLine: true, //展开显示所有
      getListObj: {},  //各种列表
      getList: [],  //各种列表
      copyrightList: [],  //作品著作权
      softwareList: [], //软件著作权
      emptyText: '暂无收录哦 <br>我们可以看一下其他信息~',
      loading: false,
      noMore: false,
      companyName: '',
      faren: '',
      companyObj: {},  //企业详情,
      pgIndex: 1,
      pgCount: 20,
      totalEle: 0, //总条数
      pageAll: 0,  //总页数
      copyType: 0,  //著作权类型
      isNull: false,  //列表为空
    }
  },
  // 上拉加载
  onReachBottom () {
    if(this.pgIndex >= this.pageAll) {
      this.noMore = true;
      return
    }
    else{
      this.noMore = false;
      this.pgIndex ++;
      this.getListFn();  //查询列表
    }
  },
  mounted () {
    this.activeIndex = 0;
    this.getList = [];
    this.companyName = this.$route.query.name;
    this.faren = this.$route.query.faren || '';
    this.initFn();
    this.getListFn();  //查询列表
  },
  methods: {
    typeChangeFn (data) {
      this.copyType = data;
      this.pgIndex = 1;
      this.getListFn();  //查询列表
    },
    selectTabFn (data) {
      this.activeIndex = data;
      this.getList = [];
      this.pgIndex = 1;
      this.noMore = true;
      this.getListFn();  //查询列表
    },
    // 更多工商信息
    goBusinessDetailFn () {
      this.$storage.set('companyObj', this.companyObj)
      this.$router.push({path: '/pages/ipSearch/businessDetail'});
    },
    async initFn () {
      let data = {
        content: this.companyName
      }
      try {
        let resp = await this.API.ipSearch.companyDetail(data);
        this.companyObj = resp;
        this.companyObj.qualificationList = this.companyObj.qualification.split(',') || [];
      }
      catch (e){}
    },
    // 拼接著作权数量
    async getMunuListFn () {
      let data = {
        companyName: this.companyName,
        pgIndex: this.pgIndex,
        pgCount: this.pgCount
      }
      try {
        let obj1 = await this.API.ipSearch.softwareList(data);   //软件
        let obj2 = await this.API.ipSearch.copyrightList(data);  //作品
        let totalEle1 = obj1.totalElements || 0;
        let totalEle2 = obj2.totalElements || 0;
        this.menuList[0] = '软件著作权：' + totalEle1;
        this.menuList[1] = '作品著作权：' + totalEle2;
      }
      catch (e){}
    },
    // 查询专利列表
    async getListFn () {
      let data = {
        companyName: this.companyName,
        pgIndex: this.pgIndex,
        pgCount: this.pgCount
      }
      this.loading = true;
      try{
        let resp;
        switch (this.activeIndex){
          case 0: resp = await this.API.ipSearch.patentList(data); break  //专利列表
          case 1: resp = await this.API.ipSearch.tmList(data); break  //商标列表
          case 3: resp = await this.API.ipSearch.paperList(data); break  //论文
          case 4: resp = await this.API.ipSearch.projectList(data); break  //项目
        }
        if(this.activeIndex == 2) {   //著作权
          if (this.pgIndex == 1) {
            await this.getMunuListFn();
          }
          if(this.copyType == 0) {  //软件著作权
            let obj1 = await this.API.ipSearch.softwareList(data);   //软件
            let totalEle1 = obj1.totalElements || '';
            this.pageAll = Math.ceil(totalEle1/this.pgCount);
            this.loading = false;
            if(this.pageAll == 0){
              this.softwareList = [];
              this.isNull = true;
              this.noMore = true;
              return
            }
            if(this.pageAll == 1) {
              this.softwareList = this.dateFn(obj1.elements);
              console.log(this.softwareList);
              this.isNummFn(this.softwareList);
              this.noMore = true;
              return
            }
            let list_ = this.softwareList = [...this.softwareList, ...obj1.elements];
            this.softwareList = this.dateFn(list_);
            this.isNummFn(this.softwareList);
          }
          else if(this.copyType == 1) {  //作品著作权
            let obj2 = await this.API.ipSearch.copyrightList(data);  //作品
            let totalEle2 = obj2.totalElements || '';
            this.pageAll = Math.ceil(totalEle2/this.pgCount);
            this.loading = false;
            if(this.pageAll == 0){
              this.copyrightList = [];
              this.isNull = true;
              this.noMore = true;
              return
            }
            if(this.pageAll == 1) {
              this.copyrightList = this.dateFn(obj2.elements);
              this.isNummFn(this.copyrightList);
              this.noMore = true;
              return
            }
            let list_   = [...this.copyrightList, ...obj2.elements];
            this.copyrightList = this.dateFn(list_);
            this.isNummFn(this.copyrightList);
          }
        }
        else{
          this.pageAll = Math.ceil(resp.totalElements/this.pgCount);
          this.totalEle = resp.totalElements;
          this.loading = false;
          if(this.pageAll == 0){
            this.getList = [];
            this.isNull = true;
            this.noMore = true;
            return
          }
          if(this.pageAll == 1) {
            this.getList = resp.elements;
            this.isNummFn(this.getList);
            this.noMore = true;
            return
          }
          this.getList = [...this.getList, ...resp.elements];
          this.isNummFn(this.getList);
        }
      }
      catch (e){}
    },
    dateFn (list) {
      list.forEach(item => {
        item.registerAperDate = (item.registerAperDate && item.registerAperDate.split(' ').length) ? item.registerAperDate.split(' ')[0] : item.registerAperDate;
        item.publishDate = (item.publishDate && item.publishDate.split(' ').length) ? item.publishDate.split(' ')[0] : item.publishDate;
        item.registerDate = (item.registerDate && item.registerDate.split(' ').length) ? item.registerDate.split(' ')[0] : item.registerDate;
        item.finishDate = (item.finishDate && item.finishDate.split(' ').length) ? item.finishDate.split(' ')[0] : item.finishDate;
      })
      return list
    },
    // 根据总页数计算列表
    getListByAllPageFn (totalEle, pgCount, oldList, newList) {
      let self = this;
      self.pageAll = Math.ceil(totalEle / pgCount);
      if(self.pageAll == 1) {
        newList = oldList;
        self.noMore = true;
        self.loading = false;
        return
      }
      newList = [...newList, ...oldList];
    },
    isNummFn (list) {
      console.log(list)
      if(!list || (list && !list.length) ) {
        this.isNull = true;
      }
      else{
        this.isNull = false;
      }
      console.log(this.isNull)
    },
    callFn (tel) {
      wx.makePhoneCall({
        phoneNumber: `${tel}` //仅为示例，并非真实的电话号码
      })
    }
  }

}
</script>

<style lang="scss">
  .search_detail_page {
    position: absolute; width: 100%; height: 100%; display: flex; flex-direction: column; 
    .com_info {
      width: 100%;
      .com_wrap {
        background: #fff; padding: 16px 20px 20px 32px;
        .company {
          align-items: start;
          .img_box {
            width: 120px; height: 120px; border-radius: 5px; border: 1px solid #eee;
            img {width: 100%; height: 100%;}
          }
          .info_box {
            margin-left: 20px; width: 560px;
            .name {
              align-items: flex-start;
              .text { font-size: 32px; color: #333; line-height: 45px; max-width: 450px; }
              .lab {background: #E0F3E8; color: #019945;font-size: 20px; padding: 0 22px; margin-top: 6px; height: 30px; line-height: 30px; border-radius: 20px; margin-left: 8px; display: inline-block; }
            }
            .labs {
              margin-top: 10px; position: relative; padding-right: 65px; display: flex; justify-content: flex-start; align-items:center; flex-wrap: wrap;
              &.oneline {
                height: 30px; line-height: 30px; overflow: hidden;
                .item {margin-bottom: 0;}
              } 
              .item {background:rgba(53,118,255,0.1); height: 30px; line-height: 30px; padding: 0 8px; color: #3576FF; font-size: 20px; margin-right:8px; margin-bottom: 15px; display: inline-block;}
              .more {
                position: absolute; right: 5px; bottom: 0;
                span {color: #666; font-size: 20px;}
                img {width: 15px; height: 9px; margin-left: 10px;}
              }
            }
            .view {
              margin-top: 16px;
              img {width: 23px; height: 14px;}
              .num {font-size: 22px; color: #aaa; margin-left: 10px; line-height: 30px;}
            }
          }
        }
        .info_li {
          width: 100%; margin-top: 36px;
          .info {
            flex: 1; 
            .key {font-size: 24px; color: #999; line-height: 33px; text-align: center;}
            .value {color: #333; font-size: 28px; line-height: 40px; margin-top: 14px; text-align: center;}
            .blue {color: #3576FF;}
          }
        }
      }
      .phone_box {
        padding: 0 32px; height: 104px; border-top: 1px solid #eee; background: #fff;
        .text {
          img {width: 40px; height: 42px;}
          .des {color: #333; font-size: 28px; margin-left: 30px;}
        }
        .more {
          img {width: 40px; height: 40px; }
          .text {font-size: 24px; color: #aaa; margin-right: 15px;}
        }
      }
    }
    .risk_wrap {
      width: 100%; background: #fff; margin-top: 20px; padding: 24px 30px; height: 142px;
      .img_box {
        width: 110px; height: 110px; margin-right: 40px;
        .warning {width: 38px; height: 38px;}
        .risk {width: 110px; height: 27px; margin-top: 16px;}
      }
      .tag_box {
        flex-wrap: wrap;
        .tag {
          margin-right: 30px; margin-bottom: 20px; 
          &:last-child {margin-bottom: 0;}
          .text {color: #aaa; font-size: 26px;}
          .num {height: 30px; line-height: 28px; background: #FFE1E1; border:1px solid #FF6564; color: #FF6868; font-size: 24px; padding: 0 10px; display: inline-block; margin-left: 14px; border-radius: 5px;}
        }
      }
    }
    .pub_navbar {
      margin-top: 20px; height: 104px;
      .weui-navbar__item {
        height: 104px; line-height:104px; padding:0;
        .weui-navbar__title {font-size: 28px; line-height:104px; color: #999;}
      }
      .weui-bar__item_on {
        .weui-navbar__title {color: #333; font-size: 34px; font-weight: 500;}
      }
    }
    .noMore {
      width: 100%; text-align: center; padding: 40px 0 50px 0;
      .text{color: #ddd; font-size: 28px;}  
    }
    .empty_box {position: static; flex-grow: 1;}
  }
</style>
