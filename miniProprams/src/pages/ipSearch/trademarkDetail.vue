<template>
  <div class="trademark_detail_page">
    <div class="head_wrap row-start">
      <div class="head_left" >
        <img :src="trademarkInfo.tmImg" alt="">
        <div class="status">{{trademarkInfo.currentStatus || '--'}}</div>
      </div>
      <div class="head_right weui-flex__item">
        <text class="enterprise_name inline">{{trademarkInfo.tmName}}</text>
        <div class="enterprise_info mt10">申请时间：{{trademarkInfo.appDate}}</div>
        <div v-if=" !stateType " class="enterprise_info mt10">商标类别：{{trademarkInfo.intCls ? trademarkInfo.intCls + '-' + dataInfo[trademarkInfo.intCls-1].goodsname : '--'}}</div>
        <div v-if="stateType" class="enterprise_info apren mt10">申请人：{{trademarkInfo.applicantCn}}</div>
        <div class="enterprise_info mt10">注册号：{{trademarkInfo.regNo}}</div>
        <div class="hosting row-center" @click="backHomeFn">回到首页</div>
      </div>
    </div>
    <div class="company_wrap">
      <div class="apply_name row-between">
        <div class="key row-start" @click="backFn()">
          <img src="~assets/img/icon/volume.png" alt="">
          <span class="text">申请人</span>
          <span class="name">{{ trademarkInfo.applicantCn }}</span>
        </div>
        <div class="value row-center">
          <img src="~assets/img/icon/more.png" class="img" alt="" >
        </div>
      </div>
      <div class="info_wrap">
        <div class="info_item">
          <p class="tit">商标基础信息</p>
          <p class="info">• 商标名：{{ trademarkInfo.tmName }}</p>
          <p class="info">• 国际分类：{{trademarkInfo.intCls ? trademarkInfo.intCls + '-' + dataInfo[trademarkInfo.intCls-1].goodsname : '--'}}</p>
          <p class="info">• 注册号：{{trademarkInfo.regNo}}</p>
          <p class="info">• 申请日期：{{trademarkInfo.appDate}}</p>
          <p class="info">• 注册日期：{{trademarkInfo.regDate}}</p>
          <p class="info">• 有效期限：{{trademarkInfo.privateDate}}</p>
        </div>
        <div class="info_item">
          <p class="tit">商品服务列表</p>
          <p class="info" v-for="(info, idx) in trademarkInfo.goodsList" :key="idx" v-if="trademarkInfo.goodsList">• {{ info.goodsName }}</p>
          <p class="info" v-if="!trademarkInfo.goodsList">暂无数据</p>
        </div>
        <div class="info_item">
          <p class="tit">注册流程</p>
          <p class="flow row-start" v-for="(item, index) in trademarkInfo.flowList" :key="index" v-if="trademarkInfo.flowList">
            <i class="li"></i>
            <span class="text">{{ item.flowDate }} &nbsp; {{ item.flowName }}</span>
            <i class="line"></i>
          </p>
          <p class="info" v-if="!trademarkInfo.flowList">暂无数据</p>
        </div>
        <div class="info_item">
          <p class="tit">相关官文</p>
          <p class="info" v-for="(item, index) in officialFile" :key="index">• {{item.ann_date}} 第{{item.ann_num}}期 <span class="link" @click="previewBook(item)">{{ item.ann_type }}</span></p>
          <p class="info" v-if="!officialFile.length">暂无数据</p>
        </div>
      </div>
      <p class="tips">数据来源全国企业信用信息公示系统</p>
    </div>
  </div>
</template>

<script>
import mixin from 'mixins/'
import tmTypeData from 'utils/tmTypeData'
export default {
  mixins: [mixin],
  data () {
    return {
      trademarkInfo: {},
      dataInfo: tmTypeData.cateIdData,
      officialFile:[],//官文
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    backHomeFn() {
      wx.switchTab({
        url: '/pages/index/index'
      });
    },
    backFn () {
      this.$router.back();
    },
    async queryList(regno){
      let data = {
        regno: regno
      }
      try{
        let officialFile = await this.API.ipSearch.findNoticeByRegno(data);
        console.log(officialFile);
        this.officialFile = officialFile.data;
      }
        catch(error){}
    },
    previewBook(info){//预览证书
      if(!info.image || info.image==0){
      // if(info.image){
        this.InfoidBycode(info);//调取商标局接口
      }else{
        wx.previewImage({
          current: info.image, // 当前显示图片的http链接
          urls: [info.image] // 需要预览的图片http链接列表
        })
      }
    },
    async InfoidBycode(info){
      let BycodeOne = {
        annNum:info.ann_num,
        annTypecode:info.ann_type_code
      }
      this.noticeId = info.notice_id;
      let self = this;
      try{//商标局第一步
        let InfoidBycodeOne = await this.API.ipSearch.InfoidBycodeOne(BycodeOne);
        console.log(InfoidBycodeOne);
        let BycodeTwo = {
          id:InfoidBycodeOne,
          pageNum:info.page_no,
          flag:1
        }
        console.log(BycodeTwo);
        let InfoidBycodeTwo = await this.API.ipSearch.imageView(BycodeTwo);
        let img = '';
        if(info.page_no > 3){
          img = InfoidBycodeTwo.imaglist[3];
        }else if(info.page_no < 4&&info.page_no>0){
          img = InfoidBycodeTwo.imaglist[info.page_no-1];
        }
        self.imgUrl = img;
        wx.previewImage({
          current: img, // 当前显示图片的http链接
          urls: InfoidBycodeTwo.imaglist // 需要预览的图片http链接列表
        });
      }
      catch(error){}
    },
    async init () {
      let query = this.$route.query;
      let data = {
        regNo: query.regNo,
        intCls: query.intCls
      }
      try {
        let resp = await this.API.ipSearch.tmDetail(data);
        this.trademarkInfo = resp;
        this.queryList(resp.regNo);
      }
      catch (e){}
      // this.trademarkInfo = this.$storage.get('detailData');
    }
  }
}
</script>

<style lang="scss">
  @import "../../assets/css/variable";
  .trademark_detail_page {
    .head_wrap {
      padding: 40px 30px 40px 30px; height: 260px; background:linear-gradient(180deg,rgba(66,114,255,1) 0%,rgba(35,141,255,1) 100%); position: relative;
      .head_left {
        width: 180px; height: 180px; border-radius: 50%; overflow: hidden; position: relative; background: #fff;
        img {width:180px; height:180px; position: absolute; top:0;left:0;}
        .status {background:rgba(0,0,0,0.5);position: absolute;width:180px; height:54px; bottom:0; color:#fff; font-size:22px; border-radius:250%;text-align:center; padding-top: 9px; box-sizing:border-box; line-height:30px;}
      }
      .head_right{
        font-size:0;position: relative; margin-left:30px; box-sizing:border-box;
        .enterprise_name{color:#fff;font-size: 30px; line-height:42px;width:400px;height:42px;display:block;}
        .enterprise_info{font-size: 26px;color: #fff;line-height:37px;}
        .apren{width:500px;text-overflow:ellipsis;word-break:keep-all;white-space:nowrap;overflow:hidden;}
        .hosting{width:143px;height:54px;background-image: linear-gradient(-90deg, #FFBE4C 20%, #FF9C52 99%); border-radius: 100px 0 0 100px;color:#fff;position: absolute;right:-30px; top:20px; padding-left: 22px; font-size: 24px;}
      }
    }
    .company_wrap {
      .apply_name {
        padding: 0 30px; height: 100px; line-height: 100px; background: #fff;
        .key {
          img {width: 34px; height: 34px;}
          .text {color: #666; font-size: 28px; margin-left: 16px;}
          .name {color: #999; font-size: 28px; margin-left: 53px; max-width: 480px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
        }
        .value {
          .img {width: 40px; height: 40px;}
        }
      }
      .info_wrap {
        padding: 30px; background: #fff; margin-top: 20px;
        .info_item {
          margin-bottom: 30px;
          .tit {font-size: 28px; color: #666; margin-bottom: 20px;}
          .info {
            font-size: 26px; color: #999; line-height: 46px; width: 100%;
            .link {color: #4272FF;}
          }
          .flow {
            position: relative; margin-bottom: 26px;
            .li {width: 18px; height: 18px; border-radius: 50%; background: #ddd; }
            .text {font-size: 26px; color: #999; margin-left: 20px;}
            .line {width: 1px; background: #ddd; height: 48px; position: absolute; left: 9px; top: 30px;}
            &:last-child {
              margin-bottom: 0;
              .line {display: none;}
            }
          }
        }
      }
      .tips {color: #999; font-size: 24px; padding: 20px; text-align: center;}
    }
  }
</style>
