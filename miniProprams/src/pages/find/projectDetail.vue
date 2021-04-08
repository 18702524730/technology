<template>
  <div class="paperDetail">
    <h3>{{detailData.name}}</h3>
    <a class="back_home" @click="toIndex">首页</a>
    <div class="info">
      <div>
        <label>作者：</label>
        <div class="name">
          <span class="hight" @click="toExpertDetail(item.id)" v-for="(item, index) in detailData.enableNames" :key="index">{{item.name}}</span><span v-for="(item, index) in detailData.names" :key="index">{{item}}</span>
        </div>
      </div>
      <p><label>单位：</label><span>{{detailData.unit}}</span></p>
      <p><label>类型：</label><span>{{detailData.type}}</span></p>
      <p><label>关键词：</label><span>{{detailData.keywordsChMy || '暂无'}}</span></p>
    </div>
    <div class="summary">
      <h4>摘要：</h4>
      <p class="abstract">{{detailData.abstractCh || '暂无内容'}}</p>
    </div>
    <div class="relative" v-if="similarData.length">
      <h4>相关项目：</h4>
      <div class="clearfix">
        <span v-for="(item, index) in similarData" v-if="item" :key="index" @click="getAllInfo(item.projectId)">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Filters from 'utils/filters.js'
  export default {
    components: {
    },
    data () {
      return {
        detailData: {},
        similarData: []
      }
    },
    mounted() {
      let query = this.$root.$mp.query;
      let id = query.id || '8bd020b9-b1bc-11e6-8836-005056b3f30e';
      this.getAllInfo(id);
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
        this.getSimilar(id);
      },
      async getInfo(id) {
        let data = await this.API.find.projectDetail(id);
        data.enableNames = data.memberWithId.filter((item) => {return item.id});
        data.names = data.memberWithId.filter((item) => {return !item.id}).map((item) => {return item.name});
        data.keywordsChMy = data.keywordsCh.split(';').join('、');
        this.detailData = data;
        console.log(this.detailData)
      },
      async getSimilar(id) {
        let data = await this.API.find.getSimilarProjects(id);
        this.similarData = data || [];
        console.log(this.similarData)
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
  .paperDetail {
    position: relative;
    h3{padding-left: 30px;padding-top: 40px;padding-right: 166px;line-height: 45px;font-size:32px;font-weight:600;background-color: #fff;}
    .back_home{position: absolute;top: 40px;right: 0;width: 136px;height: 56px;line-height: 56px;padding-left: 53px;font-size: 26px;color: #fff;background: #3576FF url(~assets/img/icon/home.png) 20px center no-repeat;background-size:27px 25px;border-bottom-left-radius: 28px;border-top-left-radius: 28px;font-weight:600;text-decoration: none;}
    .info{
      padding: 30px;background-color: #fff;
      p{
        display: flex;flex-direction: row;font-size:28px;margin-bottom: 20px;
        label{height: 40px;line-height: 40px;flex-basis: 132px;color: #999;}
        span{line-height: 40px;max-width: 530px;}
        a{color: #3576FF;}
        &:last-child{margin-bottom: 0;}
      }
      >div{
        display: flex;flex-direction: row;font-size:28px;margin-bottom: 20px;
        label{height: 40px;line-height: 40px;flex-basis: 132px;color: #999;}
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
