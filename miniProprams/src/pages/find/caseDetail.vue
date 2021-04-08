<template>
  <div class="caseDetail">
    <h3>{{detailData.title}}</h3>
    <div class="info">
      <p><label>发布时间：</label><span>{{detailData.releaseDateTime}}</span></p>
      <p><label>浏览量：</label><span>{{detailData.views}}</span></p>
    </div>
    <div class="summary">
      <!-- <p class="abstract">{{detailData.txt}}</p> -->
      <rich-text :nodes="detailData.txt"></rich-text>
    </div>
    <div class="relative" v-if="similarData.length">
      <h4>相关栏目：</h4>
      <div class="clearfix">
        <span v-for="(item, index) in similarData" v-if="item" :key="index" @click="getAllInfo(item.contentId, item.channelId)">{{item.title}}</span>
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
      let { contentId, channelId } = query;
      this.getAllInfo(contentId, channelId);
    },
    methods: {
      getAllInfo(contentId, channelId) {
        wx.pageScrollTo({
          scrollTop: 0
        });
        this.getInfo(contentId);
        this.getSimilar(channelId);
      },
      async getInfo(id) {
        let data = await this.API.find.getContentDetail(id);
        data.releaseDateTime = Filters.filters.dateFormat(data.releaseDate, 'date');
        data.txt = data.txt.replace(/width: 900px/g, 'width:100%').replace(/width: 500px/g, 'width:100%').replace(/\<img(.*)(style=\".*;\")/gi, '<img style="width:100%;height:auto"$1');
        this.detailData = data;
        console.log(this.detailData)
      },
      async getSimilar(channelId) {
        let data = await this.API.find.getHotContentList(channelId);
        this.similarData = data || [];
        console.log(this.similarData)
      },
    },
    watch: {
    }
  }
</script>

<style lang="scss">
  .caseDetail {
    position: relative;
    h3{padding:40px 30px 0;line-height: 45px;font-size:32px;font-weight:600;background-color: #fff;}
    .info{
      padding: 30px;background-color: #fff;
      p{
        display: flex;flex-direction: row;font-size:28px;margin-bottom: 20px;
        label{height: 40px;line-height: 40px;flex-basis: 170px;color: #999;}
        span{line-height: 40px;max-width: 530px;}
        a{color: #3576FF;}
        &:last-child{margin-bottom: 0;}
      }
    }
    .summary{
      font-size: 28px;line-height: 56px;padding: 0 30px 30px;background-color: #fff;
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
