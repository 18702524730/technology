<template>
  <!-- 评估结果 -->
	<div class="cannot_result_box">
    <div class="title cannot_title">
      <h2>稍作努力可申报的项目（共{{projectLists.length - resultData.pass.length}}项）</h2>
      <img @click="hide" src="../../../assets/img/icon/close1.png" />
    </div>
    <scroll-view scroll-y="true" class="boxes cannot" :style="containerH ? 'height:' + containerH +'px': ''">
      <div class="box_in">
        <div class="all">
          <div class="subsidy" v-if="allReduction-resultData.reduction">
            <p>所得税按<span>{{allReduction-(resultData.reduction || 0)}}</span>%征收</p>
            <p></p>
          </div>
          <div class="subsidy">
            <p>补助<span>{{allSubsidyNum-(resultData.subsidy || 0)}}</span>万元</p>
            <p>资金补助(最高)</p>
          </div>
        </div>
        <div class="item" v-for="(item, index) in projectLists" :key="index" v-if="!item.pass">
          <p class="tip" :class="{'small': item.id == 11 || item.id == 12}" v-if="item.subsidy">{{item.subsidy}}</p>
          <p class="til">{{item.name}}</p>
          <div class="button" @click="completeSome(item.id)">完善数据及项目评估</div>
        </div>
      </div>
    </scroll-view>
	</div>
</template>
<script>
  import qs from 'qs'
  import projectLists from 'utils/projectLists.js'
  const SystemData = WXP.getSystemInfoSync()
  const windowHeight = SystemData.windowHeight;
	export default {
    props: {
      // 评估结果
      resultData: {
        type: Object,
        default() {
          return {}
        }
      },
    },
		data() {
		  return {
        projectLists,
        allSubsidyNum: 0, //最高补助
        allReduction: 0, //最高税减百分比
        boxH: 0,
        titleH: 0,
		  }
    },
    computed: {
      containerH() {
        return this.boxH < windowHeight*0.9 ? 0 : this.boxH - this.titleH
      }
    },
    components: {
    },
		mounted(){
      this.calSubsidy();
      this.initData();
		},
		methods: {
      // 计算最高补助和最高税减百分比
      calSubsidy() {
        let allSubsidyNum = 0;
        let allReduction = 0;
        projectLists.forEach((item) => {
          allSubsidyNum += item.subsidyNum;
          allReduction += item.reduction;
        });
        //最高补助
        this.allSubsidyNum = allSubsidyNum;
        //最高税减百分比
        this.allReduction = allReduction >= 100 ? 100 : allReduction
      },
      // 完善project数据
      completeSome(id) {
        this.$router.push({
          path: '/pages/my/makeProjectPerfect',
          query: {
            projectType: id
          }
        })
      },
      initData(){
        let passedProjectList = this.resultData.pass || [];
        let gotProjectList = this.resultData.obtain || [];
        projectLists.forEach((item) => {
          item.pass = passedProjectList.includes(item.id);
          item.got = gotProjectList.includes(item.id);
        });
        // 针对ios10 iphone6 plus
        setTimeout(() => {
          let query = wx.createSelectorQuery();
          let self = this;
          query.select('.cannot_result_box').boundingClientRect(function (rect) {
            self.boxH = rect.height;
          }).exec();
          query.select('.cannot_title').boundingClientRect(function (rect) {
            self.titleH = rect.height;
          }).exec();
        }, 300)
      },
      hide() {
        this.$emit('hide')
      },
    },
    watch:{
      resultData(){
        this.calSubsidy();
        this.initData();
      }
    },
	}
</script>
<style lang="scss">
	.cannot_result_box{
    position: relative;width: 100%;
    .title{
      width: 100%;display: flex;justify-content: space-between;padding: 40px 30px;
      h2{font-size: 32px;text-align: center;line-height: 45px;height: 45px;font-weight: normal;}
      img{width: 34px; height: 34px;}
    }
    .cannot{
      width: 100%;height: calc(100% - 115px);padding: 0px 30px 30px;background: #FFFFFF;border-radius: 10px;overflow: auto;
      .box_in{
        >h2{font-size: 34px;text-align: center;line-height: 48px;font-weight: normal;}
        .all{
          width:100%;display: flex;flex-direction: column;justify-content: center;border-radius:8px;padding: 0 0 15px;background-color: #f6f6f6;
          .subsidy{
            padding-left: 150px;display: flex;align-items: baseline;
            p{
              font-size:32px;height:67px;color: #F64744;text-align: center;
              span{font-size:48px;padding: 0 8px;font-weight: bold;}
            }
            p:last-child{font-size:28px;line-height: 67px;height: 67px;color: #AAAAAA;padding-left: 20px;}
          }
        }
        .item{
          margin:0 40px 0;text-align: center;padding: 50px 0;border-bottom: 1px solid #e5e5e5;
          .tip{height:59px;line-height:59px;font-size:42px;color: #2186F8;font-weight:500;}
          .small{height:48px;line-height:48px;font-size:34px;}
          .til{height:48px;font-size:34px;line-height:48px;color: #666;margin-top: 5px;}
          .button{width:292px;height:58px;margin: 0 auto;line-height: 58px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:5px;font-size:28px;color: #fff;margin-top: 40px;}
          &:last-child{border-bottom:0;}
        }
      }
    }
	}
</style>
