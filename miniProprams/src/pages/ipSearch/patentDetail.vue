<template>
  <div class="patentDetail">
    <h3>{{detailData.title}}</h3>
    <a class="back_home" @click="toIndex">首页</a>
    <div class="info">
      <p ><label>发明人：</label><span>{{detailData.inventroName}}</span></p>
      <p ><label>申请人：</label><span>{{detailData.applicantName}}</span></p>
      <!-- <p><label>申请号：</label><span>{{detailData.applicationNo}}</span></p> -->
      <p><label>申请日期：</label><span>{{detailData.appDate}}</span></p>
      <p><label>公开号：</label><span>{{detailData.pubNumber}}</span></p>
      <p><label>公开日期：</label><span>{{detailData.pubDate}}</span></p>
      <!-- <p><label>主类型号：</label><span>{{detailData.mainClassificationNo}}</span></p> -->
      <p><label>专利类型：</label><span>{{detailData.patTypeName}}</span></p>
      <p><label>地址：</label><span>{{detailData.address}}</span></p>
      <p><label>法律状态：</label><span>{{ detailData.lprs }}</span></p>
    </div>
    <div class="summary">
      <h4>摘要：</h4>
      <p class="abstract">{{detailData.abs || '暂无内容'}}</p>
      <h4>主权项：</h4>
      <p class="abstract">{{detailData.cl || '暂无内容'}}</p>
    </div>
    <legalStatus :show.sync="legalStatusShow" :data="legalStatusData"/>
  </div>
</template>

<script>
  import Filters from 'utils/filters.js'
  import legalStatus from './components/legalStatus.vue'
  export default {
    components: {
      legalStatus
    },
    data () {
      return {
        legalStatusShow: false,
        legalStatusData: [],
        detailData: {},
        similarPatentsData: []
      }
    },
    mounted() {
      let query = this.$root.$mp.query;
      this.init();
      this.legalStatusShow = false;
    },
    methods: {
      init() {
        this.detailData = this.$storage.get('detailData');
        this.detailData.patTypeName = this.filters.patentTypeTag(this.detailData.patType)
      },
      toIndex() {
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
        label{height: 40px;line-height: 40px;flex-basis: 160px;color: #999;}
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
    .summary{
      font-size: 28px;line-height: 56px;padding: 30px;margin-top: 20px;background-color: #fff;
      h4{font-size: 28px;font-weight: bold;}
      p{margin-bottom: 20px;}
      p:last-child{margin-bottom: 0;}
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
