<template>
  <!-- 评估结果 -->
	<div class="result_box">
    <div class="boxes can" v-if="resultData.pass && resultData.pass.length">
      <h2>纳入的拟培育项目（共{{resultData.pass.length}}项）</h2>
      <div class="all" v-if="isMy">
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
      <div class="button" @click="showHelpPop=true">获取申报辅导</div>
    </div>
    <div class="boxes less">
      <img src="../../../assets/img/company/more.png">
      <div class="less_in">
        <!-- <p class="money">{{resultData.totalBonus || 0}}<span>万元</span></p>
        <p class="tip">补贴资金池拟达</p> -->
        <p class="tip2">完善企业信息，可纳入更多项<br>目扶持规划</p>
        <div class="button" @click="completeAll">完善数据及项目评估</div>
      </div>
    </div>
    <div class="boxes cannot" v-if="resultData.pass && resultData.pass.length !== 12">
      <img src="../../../assets/img/company/nlyx.png">
      <div class="all">
        <p>稍作努力就可以申报以下项目，获得更多扶持</p>
        <div class="all_in">
          <div class="subsidy" v-if="allReduction-resultData.reduction">
            <p>所得税按<span>{{allReduction-(resultData.reduction || 0)}}</span>%征收</p>
            <p></p>
          </div>
          <div class="subsidy">
            <p>补助<span>{{allSubsidyNum-(resultData.subsidy || 0)}}</span>万元</p>
            <p>资金补助(最高)</p>
          </div>
        </div>
      </div>
      <div class="item" v-for="(item, index) in projectLists" :key="index" v-if="!item.pass">
        <p class="tip" :class="{'small': item.id == 11 || item.id == 12}" v-if="item.subsidy">{{item.subsidy}}</p>
        <p class="til">{{item.name}}</p>
        <div class="button" @click="completeSome(item.id)">完善数据及项目评估</div>
      </div>
      <div class="footer_inner" v-if="showFooter">
        <p class="tip mt30">专家会在48小时内联系到您，请您保持电话畅通。</p>
        <p class="tip mt10">专家热线</p>
        <div class="row-center mt10">
          <a class="phone" @click.stop="makePhoneCall('0571-28253793')">0571-28253793</a>
          <span>或</span>
          <a class="phone" @click.stop="makePhoneCall('0571-28253778')">0571-28253778</a>
        </div>
        <h5>其他扶持政策<br>请关注链科服务号</h5>
        <img src="../../../assets/img/company/erCode.png" alt="">
        <!-- <p class="tec">技术支持单位：杭州拾贝知识产权服务有限公司</p> -->
      </div>
    </div>
    <div class="back_button">
      <span @click="back">回到首页</span>
      <span @click="again">再评估一次</span>
      <span @click="commit" v-if="resultData.inlib !== 0">提交入库</span>
    </div>
    <helpPop :show.sync="showHelpPop"/>
	</div>
</template>
<script>
	import Vue from 'vue'
  import qs from 'qs'
  import projectLists from 'utils/projectLists.js'
  import helpPop from './helpPop.vue';
	export default {
    props: {
      // 评估结果
      resultData: {
        type: Object,
        default() {
          return {}
        }
      },
      // 是否显示footer
      showFooter: {
        type: Boolean,
        default: false
      },
      // 是否是我的页面
      isMy: {
        type: Boolean,
        default: false
      },
      companyName: {
        type: String,
        default: ''
      },
    },
		data() {
		  return {
        showHelpPop: false,
        loading: false,
        projectLists,
        allSubsidyNum: 0, //最高补助
        allReduction: 0, //最高税减百分比
		  }
    },
    components: {
      helpPop,
    },
		mounted(){
      this.calSubsidy();
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
      // 完善all数据
      completeAll() {
        this.$router.push('/pages/my/makeAllPerfect')
      },
      makePhoneCall(num) {
        wx.makePhoneCall({
          phoneNumber: num
        });
      },
      back() {
        wx.switchTab({
          url: '/pages/index/index'
        })
      },
      again() {
        let query = this.$route.query;
        let key = this.$storage.get('key');
        this.$router.push({
          path: '/pages/index/highTechIn',
          query: {
            key,
            ...query
          }
        });
      },
      commit() {
        this.$emit('showEnterPop')
      }
    },
    watch:{
      resultData(){
        let passedProjectList = this.resultData.pass || [];
        let gotProjectList = this.resultData.obtain || [];
        projectLists.forEach((item) => {
          item.pass = passedProjectList.includes(item.id);
          item.got = gotProjectList.includes(item.id);
        })
      }
    },
	}
</script>
<style lang="scss">
	.result_box{
    padding: 0px 20px 0;
    .boxes{
      background: #FFFFFF;border-radius: 10px;
      >h2{font-size: 34px;text-align: center;line-height: 48px;font-weight: normal;}
    }
    .can{
      padding-top: 46px;padding-bottom: 88px;background: #fff url(../../../assets/img/company/dw.png) 0 bottom no-repeat;background-size: 100% auto;
      h2{margin-bottom: 50px;}
      .all{
        width:650px;height: 153px;margin:0 auto;display: flex;flex-direction: column;justify-content: center;border-radius:5px;padding: 0 0 15px;background-color: #f6f6f6;
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
        border-radius:5px;margin:30px 30px 0; background-color: #f6f6f6;padding: 15px 0;
        p{
          color: #666;font-size:26px;line-height: 35px;text-align: center;padding: 0 20px;position: relative;
          img{width: 78px; height: 52px;position: absolute;right: -13px; top:-28px;}
        }
        .tip{color: #333;}
      }
      .button{margin: 57px auto 0;width:580px;height:86px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:10px;font-size:30px;line-height: 86px;text-align: center;color: #fff;}
    }
    .less{
      margin-top: 20px;position: relative;padding: 40px 90px;height: 440px;background: #fff url(../../../assets/img/company/d_bg.png) 0 bottom no-repeat;background-size: 100% auto;
      img{width: 166px; height: 145px;position: absolute;top: 0;left: 0;}
      .less_in{
        display: flex;
        align-items: center;
        flex-direction: column;
        .money{
          height:90px;line-height: 90px;font-size:64px;color:#D1A252;font-weight: 600;
          span{font-size: 32px;color:#D1A252;font-weight: normal;}
        }
        .tip{line-height: 40px;font-size:28px;color: #AAAAAA;}
        .tip2{text-align: center;font-size:32px;line-height: 45px;color: #333;margin-top: 74px;}
        .button{margin-top: 60px;width:580px;height:86px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:10px;font-size:30px;line-height: 86px;text-align: center;color: #fff;}
      }
      p{line-height: 45px;font-size: 32px;
        span{color: #2785F8;}
      }
    }
    .cannot{
      padding-top: 65px;padding-bottom: 30px;margin-top: 20px;
      >img{width: 392px; height: 182px;margin: 0 auto;display: block;}
      .all{
        border-radius:10px;margin:0 30px 10px; background-color: #f6f6f6;padding: 40px 20px 50px;
        p{
          font-size:30px;line-height: 42px;text-align: center;
          span{font-size:42px;line-height: 59px;padding: 0 10px;color: #F64744;}
        }
        .all_in{
          display: flex;flex-direction: column;justify-content: center;padding: 30px 0 0;
          .subsidy{
            padding-left: 100px;display: flex;align-items: baseline;
            p{
              font-size:32px;height:67px;color: #F64744;text-align: center;
              span{font-size:48px;padding: 0 8px;font-weight: bold;}
            }
            p:last-child{font-size:28px;line-height: 67px;height: 67px;color: #AAAAAA;padding-left: 20px;}
          }
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
      .footer_inner{
        text-align: center;padding: 30px 40px 70px;font-size: 28px;color: #999;
        .tip{font-size: 26px;color: #999;line-height: 37px;}
        .phone{font-size: 26px;color: #2A79FF;line-height: 37px;}
        h5{font-size: 32px;color: #333;text-align: center;line-height: 45px;font-weight: normal;padding:75px 0 40px;}
        >img{width: 266px;height: 266px;margin: 0 auto 0;font-size: 0;display: block;}
        .tec{font-size: 24px;color: #999;line-height: 33px;}
      }
    }
    .back_button{
      position: fixed;bottom: 0;left: 0;width:100%;height:99px;box-shadow:-2px -2px 10px 0px rgba(244,244,244,1);background-color: #fff;display: flex;flex-direction: row;align-items: center;justify-content: space-around;
      span{
        width:100%;height: 70px;line-height: 70px;text-align: center;font-size:30px;
        &:first-child{border-right: 1px solid #DCDCDC;}
        &:nth-child(3){height: 99px;line-height: 99px;background-color: #FFE573;color: #8F7106;}
      }
    }
	}
</style>
