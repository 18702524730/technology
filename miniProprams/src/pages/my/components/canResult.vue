<template>
  <!-- 评估结果 -->
	<div class="canresult_box">
    <div class="title can_title">
      <h2>纳入的拟培育项目（共{{resultData.pass.length}}项）</h2>
      <img @click="hide" src="../../../assets/img/icon/close1.png" />
    </div>
    <scroll-view scroll-y="true" class="boxes can" :style="containerH ? 'height:' + containerH +'px': ''" v-if="resultData.pass && resultData.pass.length">
      <div class="box_in">
        <div class="all">
          <div class="subsidy" v-if="resultData.reduction">
            <p>所得税按<span>{{resultData.reduction}}</span>%征收</p>
            <p></p>
          </div>
          <div class="subsidy">
            <p>补助<span>{{resultData.subsidy}}</span>万元</p>
            <p>资金补助(最高)</p>
          </div>
        </div>
        <div class="item" v-for="(item, index) in projectLists" :key="index" v-if="item.pass">
          <p>{{item.name}}<img v-if="item.got" src="../../../assets/img/company/got.png"></p>
          <p class="tip" v-if="item.subsidy">（{{item.subsidy}}）</p>
        </div>
        <div class="button" @click="showHelpPop=true"><img src="../../../assets/img/icon/phone2.png">获取申报辅导</div>
      </div>
    </scroll-view>
    <helpPop :show.sync="showHelpPop"/>
	</div>
</template>
<script>
	import Vue from 'vue'
  import qs from 'qs'
  import projectLists from 'utils/projectLists.js'
  import helpPop from './helpPop.vue';
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
        showHelpPop: false,
        projectLists,
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
      helpPop,
    },
		mounted(){
      this.initData();
		},
		methods: {
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
          query.select('.canresult_box').boundingClientRect(function (rect) {
            self.boxH = rect.height;
          }).exec();
          query.select('.can_title').boundingClientRect(function (rect) {
            self.titleH = rect.height;
          }).exec();
        }, 300)
      },
      hide() {
        this.$emit('hide')
      },
    },
    watch:{
      /*resultData(){
        this.initData();
      }*/
    },
	}
</script>
<style lang="scss">
	.canresult_box{
    position: relative;width: 100%;
    >.title{
      width: 100%;display: flex;justify-content: space-between;padding: 40px 30px;
      h2{font-size: 32px;text-align: center;line-height: 45px;height: 45px;font-weight: normal;}
      img{width: 34px; height: 34px;}
    }
    .can{
      width: 100%;height: calc(100% - 115px);padding: 0px 30px 44px;background: #FFFFFF;border-radius: 10px;overflow: auto;
      .box_in{
        .all{
          width:100%;display: flex;flex-direction: column;justify-content: center;border-radius:5px;padding: 0 0 15px;background-color: #f6f6f6;
          .subsidy{
            padding-left: 130px;display: flex;align-items: baseline;
            p{
              font-size:32px;height:67px;color: #F64744;text-align: center;
              span{font-size:48px;padding: 0 8px;font-weight: bold;}
            }
            p:last-child{font-size:28px;line-height: 67px;height: 67px;color: #AAAAAA;padding-left: 20px;}
          }
        }
        .item{
          border-radius:5px;margin:30px 0 0; background-color: #f6f6f6;padding: 15px 0;
          p{
            color: #666;font-size:26px;line-height: 35px;text-align: center;padding: 0 20px;position: relative;
            img{width: 78px; height: 52px;position: absolute;right: 9px; top:-28px;}
          }
          .tip{color: #333;}
        }
        .button{
          width:100%;height:90px;margin-top: 50px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:5px;font-size:28px;line-height: 90px;text-align: center;color: #fff;
          img{width: 22px;height: 28px;margin-right: 10px;vertical-align: middle;}
        }
      }
    }
	}
</style>
