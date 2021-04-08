<template>
  <!-- 企业信息核对 第2步-->
	<div class="stepTwo" :class="{'iphoneX': isIphoneX}">
		<div class="platform">
      <p class="boxes_til" v-if="companyData.companyName">仅需<span>2</span>步快速完成！</p>
      <div class="boxes" v-if="companyData.companyName">
        <div class="steps">
          <div class="step one">
            <span>1</span>基础数据智能获取
          </div>
          <div class="divsion"></div>
          <div class="step c50 two">
            <span>2</span>核心数据自助完善
          </div>
        </div>
        <h2>{{companyData.companyName}}</h2>
        <p class="top_tip">默认自动获取权威企业数据，如有出入可手动调整。</p>
        <div class="con_wrap">
          <div class="items">
            <div class="item_title">工商注册信息：</div>
            <div class="item" v-if="companyData.regDate">
              <label>注册时间：</label>
              <span>{{companyData.regDate|dateFormat}}</span>
            </div>
            <div class="item" v-if="companyData.regAddress">
              <label>注册地址：</label>
              <span>{{companyData.regAddress}}</span>
            </div>
            <div class="item" v-if="companyData.frname">
              <label>法人姓名：</label>
              <span>{{companyData.frname}}</span>
            </div>
            <div class="item" v-if="companyData.regCapital">
              <label>注册资金：</label>
              <span>{{companyData.regCapital}}万元</span>
            </div>
            <div class="item" v-if="companyData.industry">
              <label>所属行业：</label>
              <span>{{companyData.industry}}</span>
            </div>
            <!-- 
            <div class="item" v-if="companyData.street">
              <label>企业注册所在市区街道：</label>
              <span>{{companyData.street|street}}</span>
            </div>
             -->
          </div>

          <div class="items" v-if="companyData.inventionAuthPatentNum || companyData.inventionAuthPatentNum === 0 || companyData.utilityModelPatentNum || companyData.utilityModelPatentNum === 0 || companyData.industrialDesignPatentNum || companyData.industrialDesignPatentNum === 0 || companyData.softCopyrightNum || companyData.softCopyrightNum === 0 || companyData.workCopyrightNum || companyData.workCopyrightNum === 0 || companyData.effectiveTmNum || companyData.effectiveTmNum === 0">
            <div class="item_title">知识产权数量：</div>
            <div class="item" v-if="companyData.inventionAuthPatentNum || companyData.inventionAuthPatentNum === 0">
              <label>发明授权专利：</label>
              <span>{{companyData.inventionAuthPatentNum}}</span>
            </div>
            <div class="item" v-if="companyData.utilityModelPatentNum || companyData.utilityModelPatentNum === 0">
              <label>实用新型专利：</label>
              <span>{{companyData.utilityModelPatentNum}}</span>
            </div>
            <div class="item" v-if="companyData.industrialDesignPatentNum || companyData.industrialDesignPatentNum === 0">
              <label>外观设计专利：</label>
              <span>{{companyData.industrialDesignPatentNum}}</span>
            </div>
            <div class="item" v-if="companyData.softCopyrightNum || companyData.softCopyrightNum === 0">
              <label>软件著作权：</label>
              <span>{{companyData.softCopyrightNum}}</span>
            </div>
            <div class="item" v-if="companyData.workCopyrightNum || companyData.workCopyrightNum === 0">
              <label>作品著作权：</label>
              <span>{{companyData.workCopyrightNum}}</span>
            </div>
            <!-- <div class="item" v-if="companyData.icDesignNum || companyData.icDesignNum === 0">
              <label>集成电路布图设计专有权：</label>
              <span>{{companyData.icDesignNum}}</span>
            </div> -->
            <div class="item" v-if="companyData.effectiveTmNum || companyData.effectiveTmNum === 0">
              <label>有效商标：</label>
              <span>{{companyData.effectiveTmNum}}</span>
            </div>
            <!-- <div class="item" v-if="companyData.intellectualPropertyIso">
              <label>知识产权贯标：</label>
              <span>{{(companyData.intellectualPropertyIso == 2 || companyData.intellectualPropertyIso == 3 || companyData.intellectualPropertyIso == 4) ? '有' : '没有'}}</span>
            </div> -->
          </div>

          <div class="items">
            <div class="item_title">联系信息：</div>
            <div class="item" v-if="companyData.contact">
              <label>联系人：</label>
              <span>{{companyData.contact}}</span>
            </div>
            <div class="item" v-if="companyData.contactNumber">
              <label>联系人手机号：</label>
              <span>{{companyData.contactNumber}}</span>
            </div>
          </div>
          
          <div class="items" v-if="companyData.companyRoundNum || companyData.middleRoundNum || companyData.researchRoundNum || companyData.doctorSeniorNum">
            <div class="item_title">企业人员情况：</div>
            <div class="item" v-if="companyData.companyRoundNum || companyData.companyRoundNum === 0">
              <label>企业人员总数：</label>
              <span>{{companyData.companyRoundNum}}</span>
            </div>
            <div class="item" v-if="companyData.researchRoundNum || companyData.researchRoundNum === 0">
              <label>研发人员总数：</label>
              <span>{{companyData.researchRoundNum}}</span>
            </div>
            <div class="item" v-if="companyData.middleRoundNum || companyData.middleRoundNum === 0">
              <label>本科或中级职称及以上：</label>
              <span>{{companyData.middleRoundNum}}</span>
            </div>
            <div class="item" v-if="companyData.doctorSeniorNum || companyData.doctorSeniorNum === 0">
              <label>其中博士人数：</label>
              <span>{{companyData.doctorSeniorNum}}</span>
            </div>
          </div>

          <div class="items" v-if="companyData.research2016Cost || companyData.research2017Cost || companyData.research2018Cost">
            <div class="item_title">研发投入情况：</div>
            <div class="item" v-if="companyData.research2016Cost || companyData.research2016Cost === 0">
              <label>2016年研发投入费用(万元)：</label>
              <span>{{companyData.research2016Cost}}</span>
            </div>
            <div class="item" v-if="companyData.research2017Cost || companyData.research2017Cost === 0">
              <label>2017年研发投入费用(万元)：</label>
              <span>{{companyData.research2017Cost}}</span>
            </div>
            <div class="item" v-if="companyData.research2018Cost || companyData.research2018Cost === 0">
              <label>2018年研发投入费用(万元)：</label>
              <span>{{companyData.research2018Cost}}</span>
            </div>
          </div>

          <div class="items" v-if="companyData.sale2016 || companyData.sale2017 || companyData.sale2018">
            <div class="item_title">销售投入情况：</div>
            <div class="item" v-if="companyData.sale2016 || companyData.sale2016 === 0">
              <label>2016年销售收入(万元)：</label>
              <span>{{companyData.sale2016}}</span>
            </div>
            <div class="item" v-if="companyData.sale2017 || companyData.sale2017 === 0">
              <label>2017年销售收入(万元)：</label>
              <span>{{companyData.sale2017}}</span>
            </div>
            <div class="item" v-if="companyData.sale2018 || companyData.sale2018 === 0">
              <label>2018年销售收入(万元)：</label>
              <span>{{companyData.sale2018}}</span>
            </div>
          </div>
          
          <div class="items" v-if="companyData.productField || companyData.qualification || companyData.wantQualification || companyData.wantPledge || companyData.wantTechButt || companyData.cooperationUniversities">
            <div class="item_title">补充信息：</div>
            <div class="item" v-if="companyData.productField">
              <label>技术领域：</label>
              <span>{{companyData.productField}}</span>
            </div>
            <div class="item" v-if="companyData.qualification">
              <label>已经认定的项目/资质：</label>
              <span>{{companyData.qualification}}</span>
            </div>
            <div class="item" v-if="companyData.wantQualification">
              <label>希望申报的项目/资质：</label>
              <span>{{companyData.wantQualification}}</span>
            </div>
            <div class="item" v-if="companyData.wantPledge">
              <label>是否有知识产权质押融资需求：</label>
              <span>{{companyData.wantPledge == 1 ? '有' : '否'}}</span>
            </div>
            <div class="item" v-if="companyData.wantTechButt">
              <label>是否有技术对接需求(规划、购买、转化等)：</label>
              <span>{{companyData.wantTechButt == 1 ? '有' : '否'}}</span>
            </div>
            <div class="item" v-if="companyData.cooperationUniversities">
              <label>是否与高校有合作：</label>
              <span>{{companyData.cooperationUniversities == 1 ? '有' : '否'}}</span>
            </div>
          </div>
          
        </div>
      </div>
		</div>
    <div class="footer_btn" v-if="companyData.companyName">
      <div class="footer_btn_in">
        <div class="edit_btn" @click.prevent="edit"><img src="~assets/img/highTech/edit.png" alt="">修改</div>
        <div class="button" v-if="isAllin" @click.prevent="submit">提交</div>
        <div class="button" v-else @click.prevent="next">下一步</div>
      </div>
    </div>
    <toast v-model="showToast" type="warn">{{tip}}</toast>
    <loading :show="loading" text="企业信息匹配中，请稍后"></loading>
	</div>
</template>
<script>
	import Vue from 'vue'
  import qs from 'qs'
  import Filters from 'src/utils/filters.js';
  import { AlertModule, TransferDom, XButton} from 'vux'

  const indexUrl = CONFIG.indexUrl;
  const getCompanyInfoApi = indexUrl + '/getCompany';
  //表单字段
  const availableLableKeys = [
    'contact',, //联系人
    'contactNumber', //联系电话

    'regDate', //注册日期
    'regCapital', //注册资金
    'regAddress', //企业注册所在地
    'industry', //所在行业
    'frname', //法人

    'productField', //产品领域
    'qualification', //资质
    'wantQualification', //希望获得资质
    'wantPledge', //是否有知识产权质押融资需求
    'wantTechButt', //是否有技术对接需求
    'cooperationUniversities', //是否与高校有合作

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
    'effectiveTmNum', //有效商标数量

    'companyRoundNum', //企业人员概数
    'middleRoundNum', //本科及中级以上概数
    'researchRoundNum', //研发人员概数
    'doctorSeniorNum', //博士
  ]

	export default {
    directives: {
      TransferDom
    },
		data() {
		  return {
        isAllin: false, // 所有表单项在第二步了，默认false
        loading: false,
        tip: '',
        showToast: false,
        companyName: '',
        companyData: {},
        isIphoneX: false,
		  }
    },
    components: {
      XButton,
    },
		mounted(){
      let query = this.$route.query;
      console.log(query)
      this.isIphoneX = query.isIphoneX === 'true';
      this.companyName = query.companyName || query.name || '杭州拾贝知识产权服务有限公司';
      this.getCompanyInfoApi();
		},
		methods: {
      getEditKeyList(){
        let arr = [];
        for (let key in this.companyData) {
          if (this.companyData.hasOwnProperty(key) && availableLableKeys.includes(key) && (this.companyData[key] || this.companyData[key] === 0)) {
            arr.push(key)
          }
        }
        console.log(arr)
        return arr;
      },
      getOtherKeyList(){
        let arr = [];
        for (let key in this.companyData) {
          if (this.companyData.hasOwnProperty(key) && availableLableKeys.includes(key) && (this.companyData[key] === null || this.companyData[key] === '')) {
            arr.push(key)
          }
        }
        console.log(arr)
        return arr;
      },
      getCompanyInfoApi() {
        let query = this.$route.query;
        if (!this.companyName) {return;}
        this.loading = true;
        this.$http.get(getCompanyInfoApi, {
          params: {
            name: this.companyName
          }
        })
        .then((resp) => {
          this.loading = false;
          console.log(resp)
          let info = resp.info;
          info.regDate = info.regDate ? Filters.formatDate.format(info.regDate) : ''
          if (info.regDate) {
            if (info.regDate.indexOf('2017') !== -1) {
              info.research2016Cost = null;
              info.sale2016 = null;
            } else if(info.regDate.indexOf('2018') !== -1){
              info.research2016Cost = null;
              info.sale2016 = null;
              info.research2017Cost = null;
              info.sale2017 = null;
            } else {
            }
          }
          info.contact = info.contact || query.contacts;
          info.contactNumber = info.contactNumber || query.phone;
          this.companyData = info;
          let otherKeyList = this.getOtherKeyList();
          console.log('otherKeyList:', otherKeyList)
          if (!otherKeyList.length) {
            this.isAllin = true;
          }
          /*if (info.regAddress && info.regAddress.indexOf('江干区') === -1 && otherKeyList.length === 1 && otherKeyList[0] === 'street') {
            this.isAllin = true;
          }*/
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
      edit() {
        this.$router.push({
          name: 'companyInfoEdit',
          params: {
            data: this.companyData,
            editKeyList: this.getEditKeyList()
          },
          query: {...this.$route.query}
        })
      },
      next(){
        this.$router.push({
          name: 'stepThree',
          params: {
            data: this.companyData,
            whiteKeyNameList: this.getOtherKeyList()
          },
          query: {...this.$route.query}
        })
      },
      submit() {
        let query = this.$route.query;
        wx.miniProgram.navigateTo({
          url: `/pages/my/result?companyName=${query.name}&contacts=${query.contacts}&phone=${query.phone}`
        });
        /*this.$router.push({
          path: '/assessResult',
          query: {...this.$route.query}
        });*/
      },
    },
    watch:{

    },
    filters: {
      dateFormat: Filters.formatDate.format,
      street: Filters.street,
      apply2019Status: Filters.apply2019Status,
    }
	}
</script>
<style lang="scss">
  @import  "~assets/css/cssshake.css";
	.stepTwo{
    background: #F8F8F8;padding-bottom: 130px;min-height: 100%;
		.platform{
      min-height: 100%;
      .boxes_til{
        height: 170px;text-align: center;padding: 40px 0 0;background: #fff url(~assets/img/highTech/bk2.jpg) 0 0 no-repeat;       background-size: 100% 170px;font-size: 38px;color: #fff;font-weight: 700;
        span{
          font-size: 50px;padding: 0 5px;
        }
      }
      .boxes{
        background: #FFFFFF; border-radius:12px 12px 0px 0px;margin-top: -20px;padding-top: 25px;padding-bottom: 30px;
        .steps{
          display: flex;align-items: center;justify-content: center;
          .step{
            font-size:28px;font-weight:700;line-height: 40px;
            span{width:40px;height:40px;border-radius: 40px;background-color: #2F80F6;color: #fff;text-align: center;font-size:26px;line-height: 40px;margin-right: 10px;display: inline-block;}
            &.c50{opacity: 0.5}
          }
          .divsion{width: 60px;height: 1PX;border-bottom: 1PX dashed #999;margin: 0 20px;opacity: 0.5}
        }
        >h2{font-size: 30px;line-height: 42px;margin-top: 54px;padding: 0 40px;}
        >.top_tip{font-size:24px;line-height: 33px;margin-top: 10px;color: #999;padding:0 40px;}
        .con_wrap{
          border-top: 1px solid #eee;margin-top: 30px;padding:20px 40px 0;
          .item_title{line-height: 40px;font-size:28px;font-weight: 700;margin-bottom: 20px;}
          .item{
            line-height: 40px;font-size:28px;display: flex;margin-bottom: 20px;
            label{color: #666;line-height: 40px;}
            span{color: #666;line-height: 40px;max-width: 500px;word-break: break-all;}
            a{color: #3576FF;margin-left: 10px;}
          }
          .items{
            padding-top: 20px;
          }
        }
      }
		}
    .footer_btn{
      position: fixed; left: 0; bottom: 0; width:100%;padding: 20px 40px;background-color: #fff;/* box-shadow:0px 2px 10px 0px rgba(0,0,0,0.1); */
      .footer_btn_in{
        height: 90px;width:100%;text-align: center;position: relative;
        .edit_btn{
          position: absolute;left:0; top:0;width: 174px;height: 90px;line-height: 90px;text-align: center;font-size: 28px;color: #fff;background-color: #10AEFF;border-radius: 90px;
          img{width: 35px;height: 32px;vertical-align: middle;margin-right: 8px;position: relative;top: -2px;}
        }
        .button{width: 100%;height: 90px;line-height: 90px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:45px;text-align: center;font-size: 30px;color: #FFFFFF;}
      }
    }
    &.iphoneX{
      padding-bottom: 198px;
      .footer_btn{padding-bottom: 88px;}
    }
	}
</style>
