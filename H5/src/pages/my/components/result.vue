<template>
  <!-- 评估结果 -->
	<div class="result_box">
    <div class="boxes can">
      <h2>您的企业可申报以下项目（共3项）</h2>
      <div class="all">
        <div class="subsidy">
          <p>补助<span>{{resultData.subsidy}}</span>万</p>
          <p>资金补助(最高)</p>
        </div>
        <div class="subsidy" v-if="resultData.reduction">
          <p>税减免<span>{{resultData.reduction}}</span>%</p>
          <p>所得税减免(最高)</p>
        </div>
      </div>
      <div class="item" v-for="(item, index) in projectLists" :key="index" v-if="passedProjectList.includes(item.id)">
        <p>{{item.name}}</p>
        <p class="tip" v-if="item.subsidy">（{{item.subsidy}}）</p>
      </div>
      <div class="button" @click="showHelpPop=true">获取申报辅导</div>
    </div>
    <div class="boxes less" @click="completeAll">
      <img src="~assets/img/company/fl.png">
      <p>符合申报的政策福利太少了？<br>您还可以<span>继续完善</span></p>
    </div>
    <div class="boxes cannot">
      <img src="~assets/img/company/nlyx.png">
      <div class="all">
        <p>稍作努力就可以申报以下项目获得更多扶持</p>
        <div class="all_in">
          <div class="subsidy">
            <p>补助<span>{{allSubsidyNum-resultData.subsidy}}</span>万</p>
            <p>资金补助(最高)</p>
          </div>
          <div class="subsidy" v-if="allReduction-resultData.reduction">
            <p>税减免<span>{{allReduction-resultData.reduction}}</span>%</p>
            <p>所得税减免(最高)</p>
          </div>
        </div>
      </div>
      <div class="item" v-for="(item, index) in projectLists" :key="index" v-if="!passedProjectList.includes(item.id)">
        <p class="tip" :class="{'small': item.id == 11 || item.id == 12}" v-if="item.subsidy">{{item.subsidy}}</p>
        <p class="til">{{item.name}}</p>
        <div class="button" @click="completeSome(item.id)">立即完善数据</div>
      </div>
      <div class="footer_inner" v-if="showFooter">
        <p class="tip mt30">专家会在48小时内联系到您，请您保持电话畅通。</p>
        <p class="tip mt10">专家热线</p>
        <a class="phone mt10" href="tel:0571-28253793 ">0571-28253793 </a> 或 <a class="phone" href="tel:0571-28253778">0571-28253778</a>
        <h5>其他扶持政策<br>请关注链科服务号</h5>
        <img src="~assets/img/index/logoBot.jpg" alt="">
        <!-- <p class="tec">技术支持单位：杭州拾贝知识产权服务有限公司</p> -->
      </div>
    </div>
    <helpPop :show.sync="showHelpPop"/>
	</div>
</template>
<script>
	import Vue from 'vue'
  import qs from 'qs'
  import projectLists from 'src/utils/projectLists.js'
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
    },
		data() {
		  return {
        showHelpPop: false,
        loading: false,
        projectLists,
        passedProjectList: [], // 通过的项目名单
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
          path: '/makeProjectPerfect',
          query: {
            projectType: id
          }
        })
      },
      // 完善all数据
      completeAll() {
        this.$router.push('/makeAllPerfect')
      }
    },
    watch:{
      resultData(){
        this.passedProjectList = this.resultData.pass;
      }
    },
	}
</script>
<style lang="scss">
	.result_box{
    padding: 0px 20px 0;
    margin-top: -42px;
    .boxes{
      background: #FFFFFF;border-radius: 10px;
      >h2{font-size: 34px;text-align: center;line-height: 48px;font-weight: normal;}
    }
    .can{
      padding-top: 46px;padding-bottom: 88px;background: #fff url(~assets/img/company/dw.png) 0 bottom no-repeat;background-size: 100% auto;
      .all{
        display: flex;justify-content: center;border-radius:5px;margin:46px 30px 0; background-color: #f6f6f6;padding: 13px 0 28px;
        .subsidy{
          padding: 0 22px;
          p{
            font-size:32px;height:67px;color: #FF9639;text-align: center;
            span{font-size:48px;padding: 0 8px;font-weight: bold;}
          }
          p:last-child{font-size:28px;line-height: 40px;height: 40px;color: #999;margin-top: 5px;}
        }
      }
      .item{
        border-radius:5px;margin:30px 30px 0; background-color: #f6f6f6;padding: 15px 0;
        p{color: #666;font-size:26px;line-height: 35px;text-align: center;padding: 0 20px;}
        .tip{color: #333;}
      }
      .button{margin: 57px auto 0;width:580px;height:86px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:10px;font-size:30px;line-height: 86px;text-align: center;color: #fff;}
    }
    .less{
      margin-top: 20px;position: relative;padding: 46px 30px;height: 182px;
      img{width: 121px; height: 122px;position: absolute;top: 31px;right: 72px;}
      p{line-height: 45px;font-size: 32px;
        span{color: #2785F8;}
      }
    }
    .cannot{
      padding-top: 65px;padding-bottom: 30px;margin-top: 20px;
      >img{width: 392px; height: 182px;margin: 0 auto;display: block;}
      .all{
        border-radius:10px;margin:0 40px 10px; background-color: #f6f6f6;padding: 40px 30px 50px;
        p{
          font-size:30px;line-height: 42px;text-align: center;
          span{font-size:42px;line-height: 59px;padding: 0 10px;color: #2983F7;}
        }
        .all_in{
          display: flex;justify-content: center;padding: 40px 0 0;
          .subsidy{
            padding: 0 22px;
            p{
              font-size:32px;height:67px;color: #FF9639;text-align: center;
              span{font-size:48px;padding: 0 8px;font-weight: bold;}
            }
            p:last-child{font-size:28px;line-height: 40px;height: 40px;color: #999;margin-top: 5px;}
          }
        }
      }
      .item{
        margin:0 40px 0;text-align: center;padding: 50px 0;border-bottom: 1px solid #e5e5e5;
        .tip{height:59px;line-height:59px;font-size:42px;color: #2186F8;font-weight:500;}
        .small{height:48px;line-height:48px;font-size:34px;}
        .til{height:48px;font-size:34px;line-height:48px;color: #666;margin-top: 5px;}
        .button{width:240px;height:58px;margin: 0 auto;line-height: 58px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:5px;font-size:28px;color: #fff;margin-top: 40px;}
        &:last-child{border-bottom:0;}
      }
      .footer_inner{
        text-align: center;padding: 30px 40px 35px;font-size: 28px;color: #999;
        .tip{font-size: 26px;color: #999;line-height: 37px;}
        .phone{font-size: 26px;color: #2A79FF;line-height: 37px;}
        h5{font-size: 32px;color: #333;text-align: center;line-height: 45px;font-weight: normal;padding:75px 0 40px;}
        >img{width: 266px;height: 266px;margin: 0 auto 0;font-size: 0;display: block;}
        .tec{font-size: 24px;color: #999;line-height: 33px;}
      }
    }
	}
</style>
