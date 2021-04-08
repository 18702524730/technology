<template>
  <!-- 完整表单 -->
	<div class="makeAllPerfect" :class="{'fixedPadding': !isIOS}">
    <div class="header">
      <img class="logo" src="~assets/img/index/hj_logo.png" alt="">
      <h1>完善企业数据</h1>
      <p class="subtip">提交数据越完整、越真实，评测结果越准确</p>
      <!-- <a class="test_btn" @click.prevent="custormAnchor('boxes')">
        <span>企业项目评估报告</span>
        <img src="~assets/img/index/rightIcon.png" alt="">
      </a> -->
    </div>
		<div class="platform">
      <div class="boxes" id="boxes">
        <!-- <h2>完善企业数据</h2> -->
        <companyForm btnName="保存并更新" :showCompanyName="true" :whiteKeyNameList="whiteKeyNameList" :fixedBtn="!isIOS" :formData="formData" @submit="submit"/>
        <innerFooter />
      </div>
		</div>
    <loading :show="loading" text="请稍后"></loading>
    <toast v-model="showToast" type="warn">{{tip}}</toast>
	</div>
</template>
<script>
	import Vue from 'vue'
  import qs from 'qs'
  import Filters from 'src/utils/filters.js';
  import { AlertModule, TransferDom, XButton} from 'vux'
  import companyForm from './components/companyForm.vue';
  import innerFooter from './components/footer.vue';

  const indexUrl = CONFIG.indexUrl;
  const getCompanyApi = indexUrl + '/getCompany';
  const commitCompanyApi = indexUrl + '/commitCompany';
  //表单字段
  const formLableKeys = [
    'companyName', //企业名称
    'regDate', //注册日期
    'regCapital', //注册资金
    'street', //街道
    // 'companySize', //企业规模
    'regAddress', //企业注册所在地
    'industry', //所在行业
    'apply2019Status', //国家高新技术企业申请状态
    'productField', //产品领域

    'research2016Cost', //企业近三年研发费用(万元)
    'research2017Cost', //企业近三年研发费用(万元)
    'research2018Cost', //企业近三年研发费用(万元)
    'sale2016', //企业近三年销售收入(万元)
    'sale2017', //企业近三年销售收入(万元)
    'sale2018', //企业近三年销售收入(万元)

    'inventionAuthPatentNum', //发明授权专利数量
    'utilityModelPatentNum', //实用新型专利
    'industrialDesignPatentNum', //外观设计专利
    'softCopyrightNum', //软件著作权数量
    'workCopyrightNum', //作品著作权
    'icDesignNum', //集成电路布图设计专有权数量
    'intellectualPropertyIso', //知识产权贯标状态
    'effectiveTmNum', //有效商标数量
    'haveResearchOrg', //是否设有研发机构或平台
    'researchOrgLevel', //机构或平台级别

    'contact', //联系人
    'contactNumber', //联系人
    'chargeName', //负责人姓名
    'chargeNumber', //负责人联系方式
    'chargeWx', //负责人微信号
    'chargeIswx', //法人 手机号是否是微信号

    'qualification', //资质
    'wantQualification', //希望获得资质
    'wantPledge', //是否有知识产权质押需求
    'wantTechButt', //是否有技术对接需求


    'techTransformNum2016', //科技成果转化数量
    'techTransformNum2017', //科技成果转化数量
    'techTransformNum2018', //科技成果转化数量
    'techTransformNum2019', //科技成果转化数量

    'companyRoundNum', //企业人员概数
    'researchRoundNum', //研发人员概数
    //'companyNum', //企业人员总数
    //'researchNum', //研发人员总数
    'collegeAboveRoundNum', //本科及以上学历人数
    'doctorSeniorNum', //博士或高工人数
    'middleTitleNum', //中级职称人数
    /*'doctorNum', //博士数量
    'masterNum', //硕士数量
    'collegeNum', //本科生
    'juniorNum', //大专*/

    'researchArea', //科研用房面积(平方米)
    'equipment', //企业技术开发仪器设备原值(万元)
    'passedSystem', //已通过的体系认证
    'isExcellenceManage', //是否引入卓越绩效管理模式
    'standardSituation', //标准参与制定情况
    'certifiedLab', //通过省、国家（国际组织）认证的实验室和检测机构情况
    'awards', //近三年获得市级及以上自然科学、技术发明、科技进步奖项目情况
    'infoInvestment', //近三年企业信息化建设投入(万元)
    'outerExpertNum', //中心从事研发工作的外部专家数
    'isAccident', //近三年无重大环境污染事故
  ]
	export default {
    directives: {
      TransferDom
    },
		data() {
		  return {
        formData: {},
        whiteKeyNameList: formLableKeys, // 需要显示的表单项 keyName
        loading: false,
        showToast: false,
        tip: '',
        isIOS: false,
		  }
    },
    components: {
      XButton, companyForm, innerFooter
    },
		mounted(){
      let companyName = this.$route.query.companyName;
      if (companyName) {
        this.loading = true;
        this.$http.get(getCompanyApi, {
          params: {
            name: companyName
          }
        })
        .then((resp) => {
          this.loading = false;
          this.formData = resp.info;
        })
        .catch((err) => {
          this.loading = false;
          this.showToast = true;
          this.tip = '系统繁忙，请稍后再试';
          if (err.response && err.response.data && err.response.data.msg) {
            this.tip = err.response.data.msg || '系统繁忙，请稍后再试';
          }
        });
      }
      document.getElementsByClassName('.vux-popup-mask').touchstart = function (e) {e.preventDefault();}
      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      this.isIOS = isIOS;
		},
		methods: {
      submit(data){
        console.log('form_post_data:', data)
        var self = this;
        var data = Object.assign({}, data);
        //this.reorganize(data);
        delete data.applyYear;
        this.submited = true;
        this.loading = true;
        data.source = this.$route.meta.source || '';
        data.inventionAuthPatentNum = parseInt(data.inventionAuthPatentNum)
        data.utilityModelPatentNum = parseInt(data.utilityModelPatentNum)
        data.industrialDesignPatentNum = parseInt(data.industrialDesignPatentNum)
        data.softCopyrightNum = parseInt(data.softCopyrightNum)
        this.loading = true;
        self.$http.post(commitCompanyApi, data)
        .then((resp) => {
          console.log('resp:', resp)
          console.log('wx:', wx)
          this.loading = false;
          let companyName = this.$route.query.companyName;
          wx.miniProgram.redirectTo({
            url: `/pages/my/result?companyName=${companyName}`
          });
        })
        .catch((err) => {
          this.loading = false;
          this.showToast = true;
          this.tip = '系统繁忙，请稍后再试';
          if (err.response && err.response.data && err.response.data.msg) {
            this.tip = err.response.data.msg || '系统繁忙，请稍后再试';
          }
        });
      },
    },
    watch:{

    },
	}
</script>
<style lang="scss">
  @import  "~assets/css/cssshake.css";
	.makeAllPerfect{
    background: #1D125C;padding-bottom: 20px;min-height: 100%;
    .header{
      height: 415px;background:url('~assets/img/company/bitmap.png') no-repeat;background-size: 100% auto;text-align: center;
      .logo{width: 120px;margin-top: 78px;}
      >h1{font-size: 48px;color: #fff;line-height: 48px;padding: 27px 0 16px;font-weight: 700;}
      .subtip{font-size: 28px;line-height: 28px;color: #fff;}
    }
		.platform{
      padding: 0px 20px 0;
      margin-top: -42px;
      .boxes{
        background: #FFFFFF;border-radius: 10px;
        >h2{font-size: 34px;color: #114293;text-align: center;line-height: 128px;background: #deebff;border-radius: 10px 10px 0 0;}
        h4{font-weight: 600;line-height: 48px;font-size: 34px;color: #333333;text-align: center;padding: 60px 0 48px;}
      }
		}
	}
  .fixedPadding{
    padding-bottom: 120px;
    .platform{
      .boxes{
        padding-bottom: 0;
      }
    }
  }
</style>
