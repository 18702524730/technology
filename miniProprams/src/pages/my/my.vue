<template>
  <!-- 我的 -->
	<div class="my_page" :class="{'my_page_bg': isLogin, 'allFixed': allFixed}">
    <!-- 已绑定公司页面 -->
    <div v-if="isLogin && isBind === 1" class="header">
      <swiper class="swiper_class" :current="current" :circular="true" @change="companyChangeFn">
        <block v-for="(item, index) in companyList" :key="index" >
          <swiper-item class="item">
            <div class="item_box">
              <div class="title">
                <h1>{{item.companyName}}</h1><span v-if="item.inlib === 0">已入库</span>
              </div>
              <div class="complete">
                <div @click="completeAll(item)"><label>完善企业信息，申领资金补贴</label><i class="icon iconfont icon-jiantou"></i></div>
                <p v-if="updateTime">最近一次更新时间：{{updateTime}} {{resultData.contact_name}}</p>
              </div>
              <div class="change" @click="changeCompany">切换企业</div>
              <!-- <image :src="item.coverUrl" class="slide-image" width="355" height="150"/> -->
            </div>
          </swiper-item>
        </block>
      </swiper>
      <div class="fundsBox">
        <div class="item">
          <div>
            <span>{{resultData.yi_ren_ding}}项</span>
          </div>
          <p>已认定项目</p>
        </div>
        <div class="item">
          <div>
            <span>{{resultData.bu_tie}}万</span>
          </div>
          <p>可获政策补助额</p>
        </div>
        <div class="item hight">
          <div>
            <span v-if="resultData.tax_rate>0">{{resultData.tax_rate}}%征收</span>
            <span v-else>无</span>
          </div>
          <p>可获政策税收优惠</p>
        </div>
      </div>
    </div>
    <!-- 评估结果 -->
    <div v-if="isLogin && isBind === 1" class="my_result_box">
      <div class="boxes can">
        <h2>建议申报<i @click="showTipPop=true">i</i></h2>
        <scroll-view :scroll-x="true" class="all_wrap" v-if="canArr && canArr.length">
          <div class="all" :class="{'only': canArr.length === 1, 'two': canArr.length === 2}">
            <div class="subsidy" v-for="(item, index) in canArr" :key="index" @click="showHelpPop=true">
              <h3>{{item.name}}</h3>
              <p>
                <span>{{item.subsidy}}万元</span>补助
                <template v-if="item.tax_rate"><span>{{item.tax_rate}}%</span>所得税</template>
              </p>
              <div class="button">符合·马上申报</div>
            </div>
          </div>
        </scroll-view>
        <div class="empty" v-else>暂无内容</div>
      </div>
      <div class="boxes long_term">
        <h2>长期培育</h2>
        <scroll-view :scroll-x="true" class="all_wrap" v-if="canNotArr && canNotArr.length">
          <div class="all" :class="{'only': canNotArr.length === 1, 'two': canNotArr.length === 2}">
            <div class="subsidy" v-for="(item, index) in canNotArr" :key="index" @click="viewResult(item.project_id)">
              <h3>{{item.name}}</h3>
              <p>
                <span>{{item.subsidy}}万元</span>补助
                <template v-if="item.tax_rate"><span>{{item.tax_rate}}%</span>所得税</template>
              </p>
              <div v-if="item.result == 1" class="button">尝试完善后申报</div>
              <div v-if="item.result == 2" class="button">查看需改善项</div>
            </div>
          </div>
        </scroll-view>
        <div class="empty" v-else>暂无内容</div>
      </div>
      <div class="boxes approved">
        <h2>已认定</h2>
        <scroll-view :scroll-x="true" class="all_wrap" v-if="approvedArr && approvedArr.length">
          <div class="all" :class="{'only': approvedArr.length === 1, 'two': approvedArr.length === 2}">
            <div class="subsidy" v-for="(item, index) in approvedArr" :key="index">
              <h3>{{item.name}}</h3>
              <p>
                <span>{{item.subsidy}}万元</span>补助
                <template v-if="item.tax_rate"><span>{{item.tax_rate}}%</span>所得税</template>
              </p>
              <div class="button">已认定</div>
            </div>
          </div>
        </scroll-view>
        <div class="empty" v-else>暂无内容</div>
      </div>
    </div>
		<!-- <result v-if="isLogin && isBind" :resultData="resultData" :isMy="true"/> -->

    <!-- 未绑定公司页面 -->
    <div v-if="isLogin && isBind ===2" class="noCompany">
      <div class="hasShadow">
        <div class="main">
          <div>
            <AnimatedNumber
              :value="(resultData.totalBonus || 0)+''"
              :precision="0"/>
            <span>万元</span>
          </div>
          <p>拟培育企业补贴资金池</p>
        </div>
        <div class="sub">
          <div class="item">
            <div>
              <AnimatedNumber
              :value="(resultData.cultivationNum || 0)+''"
              :precision="0"/>
              <span>家</span>
            </div>
            <p>拟培育企业</p>
          </div>
          <div class="item">
            <div>
              <AnimatedNumber
              :value="(resultData.bonus60 || 0)+''"
              :precision="0"/>
              <span>家</span>
              <img src="~assets/img/company/f60.png">
            </div>
            <p>获60万<sup>+</sup>补贴企业</p>
          </div>
        </div>
      </div>
      <h3>「科技项目申报」</h3>
      <p>根据您企业填报的信息，我们会为您择优推荐</p>
      <div class="benefitBox">
        <div class="benefit">
          <img src="~assets/img/icon/xm.png">
          <span>申报科技项目</span>
        </div>
        <div class="benefit">
          <img src="~assets/img/icon/zz.png">
          <span>享受资金补贴</span>
        </div>
        <div class="benefit">
          <img src="~assets/img/icon/zc.png">
          <span>获得政策扶持</span>
        </div>
        <div class="benefit">
          <img src="~assets/img/icon/qy.png">
          <span>展示企业形象</span>
        </div>
      </div>
      <div class="footer_btn">
        <div class="button" @click="join">参与调研</div>
      </div>
    </div>
    
    <!-- 提示弹窗 -->
    <tipPop :show.sync="showTipPop"/>

    <!-- 获取帮助弹窗 -->
    <helpPop :show.sync="showHelpPop"/>

    <!-- 入库弹窗 -->
    <enterTipPop :show.sync="showPop" @complete="hideComplete" @toEnter="toEnter"/>

    <!-- 入库悬浮按钮 -->
    <img class="enter" :class="{'showHalf': showHalf, 'showWhole': showWhole}" @click="enterClick" src="~assets/img/company/enter_img.png">

    <!-- 引导页 -->
    <div class="guid_box" v-if="isLogin && isBind === 1 && showGuide">
      <div class="step" v-if="!nextStep" @click="nextStep=true">
        <img src="~assets/img/company/guide01.png" alt="" class="change_img">
      </div>
      <div class="step" v-if="nextStep" @click="guideEndFn()">
        <img src="~assets/img/company/hand.png" alt="" class="hand_img">
        <img src="~assets/img/company/guide02.png" alt="" class="main_img">
      </div>
    </div>

    <transition-up :show="showCan" @hide="hideFn">
      <canResult :resultData="resultData" @hide="hideFn" />
    </transition-up>

    <transition-up :show="showCannot" @hide="hideFn">
      <cannotResult :resultData="resultData" @hide="hideFn" />
    </transition-up>

    <transition-up :show="showEnterPop" @hide="hideFn">
      <enterPop :companyName="companyName" @hide="hideFn" @showTip="showTip" />
    </transition-up>

    <mptoast />
    <u-message/>
	</div>
</template>
<script>
	import Vue from 'vue'
  import qs from 'qs'
  import mixin from 'mixins/'
  import filter from 'utils/filters'
  import enterTipPop from './components/enterTipPop.vue';
  import enterPop from './components/enterPop.vue';
  import tipPop from './components/tipPop.vue';
  import helpPop from './components/helpPop.vue';
  import result from './components/result.vue';
  import canResult from './components/canResult.vue';
  import cannotResult from './components/cannotResult.vue';
  import AnimatedNumber from '@gaomd/mpvue-animated-number';
  import projectLists from 'utils/projectLists.js'

	export default {
    mixins: [mixin],
		data() {
		  return {
        companyList: [
          /*{
            "id":1,
            "companyName": "杭州艾氪斯机器人科技有限公司",    //公司名
            "inlib":0       //入库标识   是否入库,0:入库,1:未入库
          },
          {
            "id":2,
            "companyName": "杭州拾贝知识产权服务有限公司",    //公司名
            "inlib":0       //入库标识   是否入库,0:入库,1:未入库
          }*/
        ],
        current: 0,
        companyName: '',
        showEnterPop: false, //显示提交入库
        showCan: false, //显示符合的项目弹框
        showCannot: false, //显示不符合的项目弹框
        showGuide: false, //新手引导
        nextStep: false,  //新手引导第二步
        showWhole: false, //显示提交入库整个
        showHalf: false, //显示提交入库半个
        showPop: false, //入库弹框
        isLogin: false, //是否登录
        isBind: 0, //是否已绑定公司
        resultData: {
          totalBonus: 0,
          cultivationNum: 0,
          bonus60: 0,
        },
        projectLists,
        allSubsidyNum: 0, //最高补助
        allReduction: 0, //最高税减百分比
        auth: {},
        once: true, //只执行一次
        allFixed: false,
        showTipPop: false,
        showHelpPop: false,
        companyId: '',
        canArr: [],
        canNotArr: [],
        approvedArr: [],
		  }
    },
    computed: {
      updateTime() {
        return filter.filters.dateFormat(this.resultData.update_time)
      }
    },
    components: {
      result, AnimatedNumber, enterTipPop, canResult, cannotResult, enterPop, tipPop, helpPop,
    },
    onShow() {
      this.init()
    },
    onHide() {
      this.showHalf = false;
      this.showWhole = false;
      this.showPop = false;
      // 每次从0开始
      this.resultData = {
        ...this.resultData,
        ...{
          totalBonus: 0,
          cultivationNum: 0,
          bonus60: 0,
        },
        inlib: 0,
      };
    },
		mounted(){
		},
		methods: {
      async init() {
        let ret = this.$storage.get('resultData');
        // 先重置为0
        if (ret) {
          ret.inlib = 0;
        }
        this.resultData = ret || this.resultData;
        this.isLogin = await this.checkLoginAndMark();
        let auth = this.$storage.get('auth');
        this.auth = auth;
        let showAuthorize = !this.isLogin;
        if(!this.isLogin || !auth) {
          wx.reLaunch({url: `/pages/login/login?showAuthorize=${showAuthorize}`})
        }else{
          this.isLogin = true;
          await this.getCompanyList();
          // 用户信息中有公司名称表示已绑定
          let companyName = this.$storage.get('curCompanyName');
          if (!companyName) {
            companyName = this.companyList[0] && this.companyList[0]['companyName'];
            this.current = 0;
          }else{
            this.companyList.some((item, index) => {
              if (item.companyName == companyName) {
                this.current = index;
                return true;
              }
            });
          }
          if (companyName) {
            let hideMyGuide = this.$storage.get('hideMyGuide');
            if(!hideMyGuide){  //新用户
              this.showGuide = true;
            }
            this.companyName = companyName;
            this.isBind = 1;
            this.$storage.set('curCompanyName', companyName);
            this.getResult(companyName);
          } else {
            this.isBind = 2;
            //this.getResult('');
          }
        }
      },
      // 先查看结果 再去完善project数据
      viewResult(id) {
        this.$router.push({
          path: '/pages/my/singleResult',
          query: {
            projectId: id,
            companyId: this.companyId
          }
        })
      },
      showTip(str) {
        this.tips(str);
      },
      // 获取公司列表
      async getCompanyList() {
        let resp = await this.API.my.getCompanyList();
        this.$storage.set('companyList', resp || '');
        this.companyList = resp;
      },
      // 滑动切换公司回调
      companyChangeFn(e) {
        console.log(e.target.current);
        this.current = e.target.current;
        let companyName = this.companyList[e.target.current]['companyName'];
        this.companyName = companyName;
        this.getResult(companyName);
        this.$storage.set('curCompanyName', companyName);
      },
      // 点击立即入库按钮
      toEnter() {
        this.showWhole = true;
        this.enterClick();
      },
      // 点击提交入库按钮
      enterClick() {
        if (this.showWhole) {
          this.showEnterPopFn()
        } else {
          this.hideComplete();
        }
      },
      // 入库弹框提示隐藏动画完成
      hideComplete() {
        this.showWhole = true;
        this.showHalf = false;
        setTimeout(() => {
          // 切换企业时，有置this.showWhole = false;
          if (this.showWhole) {
            this.showHalf = true;
            this.showWhole = false;
          }
        }, 3000);
      },
      // 获取该公司评估结果
      async getResult(name){
        let resp = await this.API.my.getResult(name);
        this.resultData = resp;
        this.companyId = resp.id;
        let projectResults = resp.project_results;
        let canArr = [];
        let canNotArr = [];
        let approvedArr = [];
        projectResults.forEach((item, index) => {
          if (item.result === 0) {
            canArr.push(item);
          } else if(item.result === 1 || item.result === 2){
            canNotArr.push(item);
          } else if(item.result === 3){
            approvedArr.push(item);
          }
        });
        this.canArr = canArr;
        this.canNotArr = canNotArr;
        this.approvedArr = approvedArr;
        this.$storage.set('resultData', resp);
        this.calSubsidy();
        console.log(this.resultData)
      },
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
      // 完善all数据
      completeAll(item) {
        console.log(item);
        this.$router.push({
          path: '/pages/my/makeAllPerfectPreview',
          query: {
            companyName: item.companyName,
            inlib: item.inlib
          }
        })
      },
      // 点击切换企业跳转
      changeCompany(curCompanyName) {
        this.$router.push({
          path: '/pages/my/companyManage',
          query: {
            companyName: curCompanyName
          }
        })
      },
      // 显示符合的项目
      showCanProject() {
        this.allFixed = true;
        this.showCan = true;
      },
      // 显示不符合的项目
      showCannotProject() {
        this.allFixed = true;
        this.showCannot = true;
      },
      // 显示入库表单
      showEnterPopFn() {
        this.allFixed = true;
        this.showEnterPop = true;
      },
      // 弹框隐藏
      hideFn(){
        let temp = false;
        if (this.showCannot) {temp = true;}
        this.allFixed = false;
        this.showCan = false;
        this.showCannot = false;
        this.showEnterPop = false;
        setTimeout(() => {
          temp && wx.pageScrollTo({
            scrollTop: 500
          })
        }, 200);
      },
      // 参与调研
      join() {
        this.$router.push('/pages/index/highTech')
      },
      // 引导页结束
      guideEndFn () {
        this.showGuide = false;
        this.$storage.set('hideMyGuide', true);
      },
      inlibChange() {
        let inlib = this.resultData.inlib;
        if (inlib === 1) {
          // 不存在引导页时才弹框
          if (!this.showGuide) {
            let hideEnterPop = this.$storage.get('hideEnterPop');
            if(!hideEnterPop){  //第一次
              this.showPop = true;
              this.$storage.set('hideEnterPop', true);
            } else {
              this.hideComplete();
            }
          }
        } else {
          this.showHalf = false;
          this.showWhole = false;
        }
      }
    },
    watch:{
      'resultData.inlib': function(){
        this.inlibChange();
      },
      showGuide() {
        if (!this.showGuide) {
          this.inlibChange();
        }
      }
    },
    // 监听用户点击页面内转发按钮
    onShareAppMessage() {
      let obj = {};
      let memberId = this.$storage.get('auth').member_id;
      obj = {
        title: '链科，链接每一个企业的科技价值！',
        path: "/pages/index/index?memberId="+ memberId,
        //imageUrl: 'https://www.ipsebe.com/cms/webfile/upload/2018/12-14/18-06-0608961222801360.jpg'
      }
      return obj;
    },
	}
</script>
<style lang="scss">
	.my_page{
    background: #fff;padding-bottom: 40px;
    .header{
      .swiper_class {
        position: relative; z-index: 1; width: 100%; height: 300px;
        .item {
          .item_box {
            position: relative; width: 100%; height: 100%;padding-left: 30px;background: #1D7EFF;
            .title{
              display: flex;align-items: center;padding-top: 19px;
              h1{max-width: 578px;height:48px;line-height:48px;font-size:34px;font-weight:600;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;color: #fff;display: inline-block;}
              span{display: inline-block;margin-left: 10px;width:102px;height: 45px;line-height: 45px;color:#AFD1FF ;font-size:24px;text-align: center;background-color: #1069E4;border-radius:23px;vertical-align: middle;}
            }
            .complete{
              margin-top: 20px;color: #fff;
              div{
                height:37px;line-height: 37px;width: 450px;
                label{height:37px;line-height: 37px;font-size:26px;font-weight:400;color: #fff;}
                i{color: #fff;height:37px;line-height: 37px;font-size:21px;margin-left: 47px;font-weight:600;}
              }
              p{margin-top: 10px;height:33px;line-height: 33px;font-size:24px;color: #fff;opacity: 0.6;}
            }
            .change{position: absolute; right: 30px;top: 110px;height: 37px;line-height: 37px;color:#FFD48C;}
            // image {width: 100%; height: 100%; border-radius: 10px;}
          }
        }
      }
      .fundsBox{
        position: relative; z-index: 2; display: flex;justify-content: space-between;align-items: baseline;width: 690px;height: 171px;margin:-102px auto 25px;border-radius:6px;background-color: #fff;padding-top: 40px;box-shadow:2px 2px 20px 0px rgba(11,34,67,0.1);
        .item{
          position: relative;height: 130px;width: 33%;
          div{
            text-align: center;height:48px;line-height: 48px;position: relative;
            span{font-size:34px;color: #1D7EFF;font-weight: 600;}
            img{position: absolute;width: 84px;height: 39px;top: -36px;right: 4px;}
          }
          p{
            text-align: center;height:33px;line-height: 33px;color: #999;font-size:24px;margin-top: 10px;
          }
        }
        .hight{
          div{
            span{color: #D2A65B;}
          }
        }
      }
    }
    .hasShadow{
      width: 710px;height: 277px;margin:0 auto 20px;border-radius:10px;background-color: #fff;display: flex;flex-direction: row;justify-content: space-between;padding-top: 25px;box-shadow:0px 1px 15px 0px rgba(219,219,219,0.5);
      .main{
        width: 354px;height: 228px;border-right: 1px solid #F2F2F2;display: flex;justify-content: center;flex-direction: column;align-items: center;
        div{
          text-align: center;height:90px;line-height: 90px;
          span{font-size: 32px;color: #D1A252;}
          span:first-child{font-size:64px;color: #D1A252;font-weight: 600;}
        }
        p{
          text-align: center;height:40px;line-height: 40px;color: #aaa;font-size:28px;
        }
      }
      .sub{
        width: 353px;display: flex;justify-content: center;flex-direction: column;align-items: center;
        .item{
          width: 100%;margin-bottom: 30px;position: relative;
          div{
            text-align: center;height:53px;line-height: 53px;position: relative;
            span{font-size: 28px;color: #1D7EFF;}
            span:first-child{font-size:38px;color: #1D7EFF;font-weight: 600;}
            img{position: absolute;width: 84px;height: 39px;top: -16px;right: 17px;}
          }
          p{
            text-align: center;height:40px;line-height: 40px;color: #aaa;font-size:28px;
            sup{color: #aaa;display: inline-block;position: relative; top: -8px;}
          }
        }
      }
    }
    .my_result_box{
      .boxes{
        margin-bottom: 10px;
        >h2{
          padding-left: 30px;font-size: 28px;line-height: 40px;font-weight: 600;vertical-align: top;
          i{display: inline-block;width: 30px;height: 30px;background-color: #FF9433;color: #fff;text-align: center;line-height: 30px;border-radius: 30px;vertical-align: top;margin-top: 5px;margin-left: 10px;font-family: arial;font-weight: 400;font-size: 22px;}
        }
        .all_wrap{
          position: relative;height: 301px;
          .all{
            position: absolute;left: 0;top: 0;display: flex;padding-top: 15px;
            .subsidy{
              width: 320px;height: 271px;margin-right: 20px;display: flex;justify-content: flex-start;flex-direction: column;align-items: center;padding-top: 30px;background-color: #fff;box-shadow:2px 2px 20px 0px rgba(11,34,67,0.1);border-radius:6px;
              &:first-child{margin-left: 30px;}
              &:last-child{margin-right: 30px;}
              h3{font-size:26px;line-height: 37px;height: 74px; width: 250px;text-align: center;}
              p{
                margin-top: 20px;font-size:26px;height:37px;line-height: 37px;color: #999;text-align: center;
                span{font-size:26px;color: #F64744;line-height: 37px;}
              }
              p:last-child{font-size:28px;line-height: 67px;height: 67px;color: #AAAAAA;padding-left: 20px;}
              .button{margin-top: 20px;width:240px;height:60px;border-radius:30px;font-size:24px;line-height: 58px;text-align: center;color: #fff;background-color: #2F80F6;border:1PX solid #2F80F6;}
            }
          }
          .only{
            .subsidy{
              width: 690px;height: 271px;margin: 0 auto;display: flex;justify-content: flex-start;flex-direction: column;align-items: center;padding-top: 30px;background-color: #fff;box-shadow:2px 2px 20px 0px rgba(11,34,67,0.1);border-radius:6px;
              h3{width: 100%;}
            }
          }
          .two{
            .subsidy{
              width: 335px;
            }
          }
        }
        /*隐藏滚动条*/
        ::-webkit-scrollbar {
          width: 0;
          height: 0;
          color: transparent;
        }
        .empty{height:271px;width:690px;box-shadow:2px 2px 20px 0px rgba(11,34,67,0.1);border-radius:6px;font-size:28px;color: #999;line-height: 271px;text-align: center;background-color: #fff;margin: 15px auto 0;}
      }
      .long_term{
        .button{color: #2F80F6!important;background-color: #fff!important;}
      }
      .approved{
        padding-bottom: 60px;margin-bottom: 0;
        .button{color: #999!important;background-color: #eee!important;border:1PX solid #eee!important;}
      }
    }
    .noCompany{
      position: absolute;left: 0;top:0;right: 0;bottom: 0;background-color: #fff;display: flex;flex-direction: column;align-items: center;padding-top: 60px;
      .top_img{width: 618px;height: 345px;margin-top: 50px;}
      h3{height:50px;line-height: 50px;font-size:37px;margin-top: 50px;font-weight:600;}
      >p{height:40px;font-size:28px;color: #999;margin-top: 14px;}
      .benefitBox{
        margin-top: 12px;
        .benefit{
          margin-top: 40px;line-height: 50px;font-size:36px;color:#C9A61C;display: flex;justify-content: center;align-items: center;
          img{margin-right: 30px;width: 44px;height: 44px;}
          span{font-size:36px;color:#C9A61C;}
        }
      }
      .footer_btn{
        margin-top: 62px;display: flex;justify-content: space-between;text-align: center;padding: 0 40px 0;font-size: 28px;color: #999;padding-bottom: 60px;
        .button{width:686px;height:94px;line-height: 94px;background:#3576FF;border-radius:4px;text-align: center;font-size: 36px;color: #FFFFFF;}
      }
    }
    .enter{
      position: fixed; right: 34px; bottom: 200px; width: 149px; height: 135px;opacity: 0;transition: all 0.3s;transform: translateX(183px);
      &.showHalf{opacity: 1;transform: translateX(108px);}
      &.showWhole{opacity: 1;transform: translateX(0);}
    }
    .guid_box {
      position: fixed; left:0; top:0; width: 100%; height: 100%; background: rgba(0,0,0,.7); z-index: 1003;
      .change_img {width: 596px; height: 567px; position: absolute; right: 10px; top: 100px;}
      .hand_img {width: 103px; height: 156px; position: absolute; top: 255px; left: 313px; animation: shake 1.5s 0.5s linear infinite;transform-origin: bottom;}
      .main_img {width: 750px; height: 738px; position: absolute; top: 0px; left: 0px;}
    }
	}
  .my_page_bg{background: #fff;padding-bottom: 0;}
  .allFixed{position:fixed;left: 0;top:0;width:100%;height:100%;overflow:hidden;}
  .weui-toast_forbidden{width: auto!important;padding:0 20px;max-width: 600px!important;}
  @keyframes shake{
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    33% {
      -webkit-transform: rotate(-10deg);
      transform: rotate(-10deg);
    }
    66% {
      -webkit-transform: rotate(10deg);
      transform: rotate(10deg);
    }
    100% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  }
</style>
