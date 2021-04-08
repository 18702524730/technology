<template>
  <!-- 我的 -->
	<div class="assessResult">
    <div class="header">
      <div class="result3" v-if="resultData.result==3">
        <img class="good" src="~assets/img/company/again.png" alt="">
        <p class="subtip">再接再厉</p>
      </div>
      <div class="result result2" v-if="resultData.result==2">
        <div class="main">
          <h3>培育</h3>
          <img class="star3" src="~assets/img/company/star3.png">
          <!-- <p class="subtip">恭喜纳入企业项目申报培育库</p> -->
          <p class="subtip2">你的企业将获得如下补助</p>
        </div>
        <img class="good" src="~assets/img/company/peiyu.png" alt="">
      </div>
      <div class="result result1" v-if="resultData.result==1">
        <div class="main">
          <h3>重点培育</h3>
          <img class="star5" src="~assets/img/company/star5.png">
          <!-- <p class="subtip">恭喜纳入企业项目申报培育库</p> -->
          <p class="subtip2">你的企业将获得如下补助</p>
        </div>
        <img class="good" src="~assets/img/company/zhongd.png" alt="">
      </div>
      <div class="all_wrap" v-if="resultData.result==1 || resultData.result==2">
        <img class="money" src="~assets/img/company/money.png" alt="">
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
      </div>
    </div>
		<result :resultData="resultData" :companyName="companyName" :showFooter="true" @showEnterPop="showEnterPop=true"/>
    <transition-up :show="showEnterPop" @hide="hideFn">
      <enterPop :companyName="companyName" @hide="hideFn" @showTip="showTip" />
    </transition-up>
    <u-message/>
	</div>
</template>
<script>
	 import Vue from 'vue'
  import qs from 'qs'
  import mixin from 'mixins/'
  import result from './components/result.vue';
  import enterPop from './components/enterPop.vue';

  export default {
    mixins: [mixin],
    data() {
      return {
        isLogin: false,
        resultData: {},
        auth: {},
        once: true, //只执行一次
        companyName: '',
        showEnterPop: false, //显示提交入库
      }
    },
    components: {
      result, enterPop,
    },
    onShow () {
      this.init()
    },
    mounted(){

    },
    methods: {
      async init() {
        this.isLogin = await this.checkLoginAndMark();
        let auth = this.$storage.get('auth');
        let query = this.$route.query;
        if (query.popUp == 1) {
          this.showEnterPop = true;
        }
        this.companyName = query.name;
        this.$storage.set('curCompanyName', query.name);
        this.auth = auth;
        if(!this.isLogin || !auth) {
          wx.navigateTo({url: '/pages/login/login'})
        }else{
          this.isLogin = true;
          this.getResult(this.companyName);
        }
      },
      async getResult(name){
        let resp = await this.API.my.getResult(name);
        this.resultData = resp;
        console.log(this.resultData)
      },
      join() {
        this.$router.push('/pages/index/highTech')
      },
      showPopFn(){
        this.showEnterPop = true;
      },
      // 弹框隐藏
      hideFn(){
        this.showEnterPop = false;
      },
      showTip(str) {
        this.tips(str);
      },
    },
    watch:{

    },
  }
</script>
<style lang="scss">
	.assessResult{
    background: #1D7EFF;padding-bottom: 40px;padding-top: 20px;
    .header{
      margin: 0 auto 20px;width:710px;background:#FFE573;border-radius:20px;border:10px solid #FFF3CB;padding-bottom: 40px;min-height: 376px;
      .result3{
        display: flex; justify-content: flex-start;flex-direction: column;align-items: center;
        .good{width: 239px; height: 209px; display: block;margin-top: 40px;margin-left: 50px;}
        .subtip{text-align: center;font-size: 38px;color: #8F7106;height:53px;line-height: 53px;margin-top: 17px;font-weight:600;}
      }
      .result{
        display: flex;flex-direction: row;justify-content: space-between;padding-top: 28px;
        .main{
          padding-left: 30px;
          h3{font-size:62px;height: 85px;line-height: 85px;color: #FA4B4B;font-weight: bold;}
          .star3{height: 22px;width: 89px;display: block;}
          .star5{height: 22px;width: 155px;display: block;}
          .subtip{font-size: 28px;color: #8F7106;height:40px;line-height: 40px;margin-top: 20px;font-weight:500;}
          .subtip2{font-size: 28px;color: #333;height:40px;line-height: 40px;margin-top: 20px;font-weight:500;}
        }
        .good{width: 221px; height: 203px; display: block;margin-right: 46px;margin-top: -8px;}
      }
      .all_wrap{
        display: flex;flex-direction: row;align-items: center;justify-content: space-between;width:650px;height: 200px;margin:25px auto 0;border-radius:10px; background-color: #fff;
        .money{width: 114px;height: 114px;margin-left: 22px;}
        .all{
          width:510px;display: flex;flex-direction: column;justify-content: center;border-radius:5px;padding: 13px 0 28px;
          .subsidy{
            padding-left: 45px; display: flex;align-items: baseline;
            p{
              font-size:32px;height:67px;color: #F64744;text-align: center;
              span{font-size:48px;padding: 0 8px;font-weight: bold;}
            }
            p:last-child{font-size:28px;line-height: 67px;height: 67px;color: #AAAAAA;padding-left: 20px;}
          }
        }
      }
    }
	}
</style>
