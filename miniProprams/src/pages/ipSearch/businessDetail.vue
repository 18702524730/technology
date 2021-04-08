<template>
  <div class="patentDetail">
    <h3>{{detailData.name}}</h3>
    <a class="back_home" @click="toIndex">首页</a>
    <div class="info">
      <p><label>法定代表人：</label><span>{{detailData.frname}}</span></p>
      <p><label>成立日期：</label><span>{{detailData.esdate}}</span></p>
      <p><label>登记状态：</label><span>{{detailData.entstatus}}</span></p>
      <p><label>注册资本：</label><span>{{detailData.regcap}}</span></p>
      <p><label>实缴资本：</label><span>{{detailData.reccap || '--'}}</span></p>
      <p><label>企业类型：</label><span>{{detailData.enttype}}</span></p>
      <p><label>参保人数：</label><span>{{detailData.empnum}}</span></p>
    </div>
    <div class="info_half mt_20">
      <p class="line">统一社会信用代码:</p>
      <p class="value">{{ detailData.creditcode }}</p>
      <div class="line_half row-start">
        <div class="item column-center">
          <p class="key">工商注册号：</p>
          <p class="value">{{ detailData.regno }}</p>
        </div>
        <!-- <div class="item ml_20 column-center">
          <p class="key">组织机构代码：</p>
          <p class="value">{{ detailData.regno }}</p>
        </div> -->
      </div>
    </div>
    <div class="info mt_20">
      <p><label>英文名：</label><span>{{detailData.entnameeng || '--'}}</span></p>
      <!-- <p><label>曾用名：</label><span>{{detailData.applicationNo || '--'}}</span></p> -->
      <p><label>所属行业：</label><span>{{detailData.industryphyname}}</span></p>
    </div>
    <div class="info_box mt_20">
      <p class="key">经营范围:</p>
      <p class="value">{{ detailData.opscope }}</p>
      <!-- <p class="key">经营方式:</p>
      <p class="value">-</p> -->
      <p class="key">公司地址:</p>
      <p class="location row-start">
        <img src="~assets/img/icon/location.png" alt="">
        <span class="text">{{ detailData.dom }}</span>
      </p>
    </div>
    <div class="info mt_20 mb_30">
      <!-- <p><label>营业期限：</label><span>{{detailData.changedate || '--'}}</span></p> -->
      <p><label>核准日期：</label><span>{{detailData.changedate || '--'}}</span></p>
      <p><label>登记机关：</label><span>{{detailData.regorg}}</span></p>
    </div>
  </div>
</template>

<script>
  import Filters from 'utils/filters.js'
  export default {
    data () {
      return {
        legalStatusShow: false,
        legalStatusData: [],
        detailData: {},
        similarPatentsData: []
      }
    },
    mounted() {
      this.detailData = this.$storage.get('companyObj');
    },
    methods: {
      toIndex() {
        //this.$router.push('/pages/index/index')
        wx.switchTab({
          url: '/pages/index/index'
        });
      }
    },
    watch: {
    }
  }
</script>

<style lang="scss">
  .patentDetail {
    position: relative;
    h3{padding-left: 30px;padding-top: 40px;padding-right: 166px;line-height: 45px;font-size:32px;font-weight:600;background-color: #fff;}
    .back_home{position: absolute;top: 40px;right: 0;width: 136px;height: 56px;line-height: 56px;padding-left: 53px;font-size: 26px;color: #fff;background: #3576FF url(~assets/img/icon/home.png) 20px center no-repeat;background-size:27px 25px;border-bottom-left-radius: 28px;border-top-left-radius: 28px;font-weight:600;text-decoration: none;}
    .info{
      padding: 30px;background-color: #fff;
      p{
        display: flex;flex-direction: row;font-size:28px;margin-bottom: 20px;
        label{height: 40px;line-height: 40px;flex-basis: 170px;color: #999;}
        span{line-height: 40px;max-width: 530px;word-break: break-all;}
        a{color: #3576FF;text-decoration: none;}
        &:last-child{margin-bottom: 0;}
      }
      >div{
        display: flex;flex-direction: row;font-size:28px;margin-bottom: 20px;
        label{height: 40px;line-height: 40px;flex-basis: 160px;color: #999;}
        .name{
          line-height: 40px;max-width: 530px;
          span{margin-right: 30px;}
          .hight{color:#3576FF;}
        }
      }
    }
    .mt_20 {margin-top: 20px;}
    .ml_20 {margin-left: 20px;}
    .mb_30 {margin-bottom: 30px;}
    .summary{
      font-size: 28px;line-height: 56px;padding: 30px;margin-top: 20px;background-color: #fff;
      h4{font-size: 28px;font-weight: bold;}
      p{margin-bottom: 20px;}
      p:last-child{margin-bottom: 0;}
    }
    .info_half {
      padding: 30px;background-color: #fff;
      .line {width: 100%; font-size: 28px; color: #999;}
      .value {width: 100%; font-size: 28px; color: #333; margin-top: 14px;}
      .line_half {
        width: 100%; margin-top: 30px;
        .item {
          width: 50%;
          .key {font-size: 28px; color: #999; text-align: left; width: 100%;}
          .value {font-size: 28px; color: #333; margin-top: 14px; text-align: left; width: 100%;}
        }
      }
    }
    .info_box {
      padding: 30px;background-color: #fff;
      .key {font-size: 28px; color: #999;}
      .value {font-size: 28px; color: #333; margin-top: 14px;}
      .location {
        width: 100%; margin-top: 14px;
        img {width: 26px; height: 33px;}
        .text {font-size: 28px; color: #333; margin-left: 20px;}
      }
    }
    .relative{
      padding: 30px 30px 40px 30px;background-color: #fff;margin-top: 20px;
      h4{font-size: 28px;font-weight: bold;}
      div{
        span{float: left;padding: 0 20px;line-height:64px;height: 64px;margin-top: 20px;margin-right: 20px;background-color: #f5f5f5;border-radius:5px;max-width: 690px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
      }
    }
  }
</style>
