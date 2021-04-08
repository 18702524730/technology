<template>
  <div class="patentDetail">
    <h3>{{detailData.name}}</h3>
    <a class="back_home" @click="toIndex">首页</a>
    <div class="info" v-if="type == 0">
      <p><label>著作权类别：</label><span>{{detailData.category}}</span></p>
      <p><label>软件全称：</label><span>{{detailData.name}}</span></p>
      <p><label>软件简称：</label><span>{{detailData.shortName || '--'}}</span></p>
      <p><label>软件著作人：</label><span>{{detailData.owner}}</span></p>
      <p><label>登记号：</label><span>{{detailData.registerNo}}</span></p>
      <p><label>版本号：</label><span>{{detailData.versionNo}}</span></p>
      <p><label>首次发布日期：</label><span>{{detailData.publishDate}}</span></p>
      <p><label>创作完成日期：</label><span>{{detailData.registerAperDate}}</span></p>
    </div>
    <div class="info" v-if="type == 1">
      <p><label>著作权类别：</label><span>{{detailData.category}}</span></p>
      <p><label>作品名称：</label><span>{{detailData.name}}</span></p>
      <p><label>软件著作人：</label><span>{{detailData.owner}}</span></p>
      <p><label>登记号：</label><span>{{detailData.registerNo}}</span></p>
      <p><label>登记日期:</label><span>{{detailData.registerDate}}</span></p>
      <p><label>首次发表日期：</label><span>{{ detailData.publishDate }}</span></p>
      <p><label>创作完成日期：</label><span>{{detailData.finishDate}}</span></p>
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
        similarPatentsData: [],
        type: 0,  //0.软件  1.作品
      }
    },
    mounted() {
      this.type = this.$route.query.type;
      this.init();
    },
    methods: {
      init () {
        this.detailData = this.$storage.get('detailData');
      },
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
        label{height: 40px;line-height: 40px;flex-basis: 196px;color: #999;}
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
