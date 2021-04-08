<template>
  <div class="patentDetail">
    <h3>{{detailData.name}}</h3>
    <a class="back_home" @click="toIndex">首页</a>
    <div class="info">
      <div>
        <label>发明人：</label>
        <div class="name">
          <span class="hight" @click="toExpertDetail(item.id)" v-for="(item, index) in detailData.enableNames" :key="index">{{item.name}}</span><span v-for="(item, index) in detailData.names" :key="index">{{item}}</span>
        </div>
      </div>
      <p v-if="detailData.applicant"><label>申请人：</label><span>{{detailData.applicant}}</span></p>
      <p><label>申请号：</label><span>{{detailData.applicationNo}}</span></p>
      <p><label>申请日期：</label><span>{{detailData.applicationDate}}</span></p>
      <p><label>公开号：</label><span>{{detailData.publicationNo}}</span></p>
      <p><label>公开日期：</label><span>{{detailData.publicationDate}}</span></p>
      <p><label>主分类号：</label><span>{{detailData.mainClassificationNo}}</span></p>
      <p><label>分类号：</label><span>{{detailData.classificationNo}}</span></p>
      <p><label>专利类型：</label><span>{{detailData._type}}</span></p>
      <p><label>地址：</label><span>{{detailData.applicantAddress}}</span></p>
      <p><label>法律状态：</label><a @click="showLegalStatus(detailData.applicationNo)">查看详情</a></p>
    </div>
    <div class="summary">
      <h4>摘要：</h4>
      <p class="abstract">{{detailData.patentAbstract || '暂无内容'}}</p>
      <h4>主权项：</h4>
      <p class="abstract">{{detailData.sovereignty || '暂无内容'}}</p>
    </div>
    <div class="relative" v-if="similarPatentsData.length">
      <h4>相关专利：</h4>
      <div class="clearfix">
        <span v-for="(item, index) in similarPatentsData" v-if="item" :key="index" @click="getAllInfo(item.patentId)">{{item.name}}</span>
      </div>
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
      let id = query.id || '71a9e2ce-b7a7-11e6-af90-005056b3f30e';
      this.getAllInfo(id);
      this.legalStatusShow = false;
    },
    methods: {
      toExpertDetail(expertId) {
        this.$router.push('/pages/talents/talentDetail?id=' + expertId)
      },
      getAllInfo(id) {
        wx.pageScrollTo({
          scrollTop: 0
        });
        this.getInfo(id);
        this.getSimilarPatents(id);
      },
      async getInfo(id) {
        let data = await this.API.find.patentDetail(id);
        data.enableNames = data.memberWithId.filter((item) => {return item.id});
        data.names = data.memberWithId.filter((item) => {return !item.id}).map((item) => {return item.name});
        let type = data.applicationNo.slice(6, 7);
        data._type = type == '1' ? '发明专利' : type == '2' ? '实用新型专利'  : type == '3' ? '外观设计专利' : '不知'
        this.detailData = data;
        console.log(this.detailData)
      },
      async getSimilarPatents(id) {
        let data = await this.API.find.getSimilarPatents(id);
        this.similarPatentsData = data || [];
        console.log(this.similarPatentsData)
      },
      async getPatentLegalStatus(applicationNo) {
        let data = await this.API.find.getPatentLegalStatus(applicationNo);
        this.legalStatusData = data || [];
        console.log(this.legalStatusData)
      },
      async showLegalStatus(applicationNo) {
        await this.getPatentLegalStatus(applicationNo);
        this.legalStatusShow = true;
      },
      toIndex() {
        //this.$router.push('/pages/index/index')
        wx.redirectTo({
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
