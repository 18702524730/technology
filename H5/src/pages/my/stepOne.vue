<template>
  <!-- 企业项目培育库 第1步 -->
	<div class="stepOne">
    <div class="top_tip" :class="{'hide': hidePop}">
      <p>*参与“江干区高新技术企业培育三年行动计划”</p>
      <p class="last">预申报的企业，手机号请与联系人手机号保持一致</p>
      <i class="el-icon-close" @click="hidePop=true"></i>
    </div>
    <div class="header">
      <h1>企业项目培育库</h1>
      <p class="subtil">根据您填报的信息，匹配可申报项目</p>
      <div class="item">1.获取政策扶持</div>
      <div class="item">2.申领资金补贴</div>
      <div class="tip">主办单位:杭州市江干区科技局长三角(杭州·江干)科技大市场</div>
    </div>
		<div class="platform">
      <form class="form_box" id="form_box">
        <div class="form_item" id="companyName">
          <div class="form_item_content fle2">
            <p><i>*</i>企业名称</p>
            <input type="text" v-model="dform.companyName" @focus="custormAnchor('companyName')" :maxlength="30" placeholder="请输入企业名称" />
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_content fle2">
            <p><i>*</i>联系人</p>
            <input type="text" v-model="dform.contacts" :maxlength="20" placeholder="请输入联系人姓名" />
          </div>
        </div>
        <div class="form_item" v-if="!isLogin">
          <div class="form_item_content fle2">
            <p><i>*</i>联系人手机号</p>
            <input type="text" v-model="dform.phone" :maxlength="11" placeholder="请输入联系人手机号" />
          </div>
        </div>
        <div class="form_item" v-if="!isLogin">
          <div class="form_item_content fle2 fle3">
            <p><i>*</i>验证码</p>
            <input type="text" v-model="dform.code" :maxlength="6" placeholder="请输入短信验证码" />
            <span :class="!preventCode ? 'code_btn' : 'code_btn disabled' "  @click.stop="getCode">{{codeText}}</span>
          </div>
        </div>
        <div class="til" v-if="needSafeVerify">
          <img src="~assets/img/icon/safe.png">
          <span>安全验证</span>
        </div>
        <div class="form_item" v-if="needSafeVerify">
          <div class="form_item_content fle2">
            <p><i>*</i>法人</p>
            <input type="text" v-model="dform.frname" :maxlength="20" disabled />
          </div>
        </div>
        <div class="form_item" id="frPhone" v-if="needSafeVerify">
          <div class="form_item_content fle2">
            <p><i>*</i>法人手机号</p>
            <input type="text" v-model="dform.frPhone" @focus="custormAnchor('frPhone')" :maxlength="11" placeholder="请输入法人手机号进行安全验证" />
          </div>
        </div>
        <div class="footer_btn">
          <div class="button" @click.prevent="submit">下一步</div>
          <p>温馨提示：未注册链科账号的手机号，登录时将自动注册，且代表您已同意<span @click="agreementShow = true">《链科用户注册协议》</span></p>
        </div>
      </form>
		</div>
    <!-- 注册协议 -->
    <reg-agreement :agreementShow="agreementShow" @hide="hideAgreeFn"></reg-agreement>
    <toast v-model="showToast" type="warn">{{tip}}</toast>
    <loading :show="loading" text="请稍后"></loading>
	</div>
</template>
<script>
	import Vue from 'vue'
  import qs from 'qs'
  import regAgreement from 'components/agreement/regAgreement'
  import { AlertModule, TransferDom, XButton} from 'vux'

  const indexUrl = CONFIG.indexUrl;
  const importCompanyApi = indexUrl + '/importCompanyName';
  const setPageViewUrl = indexUrl + '/setPageView';
  const sendCodeApi = indexUrl + '/sendCode';
  const getFrApi = indexUrl + '/getCorporation';
  const getCompanyNameListApi = indexUrl + '/getCorporation';

	export default {
    directives: {
      TransferDom
    },
		data() {
		  return {
        agreementShow: false,
        isLogin: false,
        tip: '', // 提示文案
        showToast: false,
        hidePop: false, // 是否关闭顶部提示
        dform: {
          companyName: '',
          contacts: '',
          phone: '',
          code: '',
          frname: '',
          frPhone: ''
        },
        submited: false, // 防止表单多次提交
        loading: false,
        codeText: '获取验证码',
        preventCode: false, // 防止多次发送验证码
        needSafeVerify: false, // 默认不需要法人安全验证
        companyNameList: [], // 公司名称列表
		  }
    },
    components: {
      XButton, regAgreement,
    },
		mounted(){
      let query = this.$route.query;
      // 存在token就表示已登录
      this.isLogin = !!query.key;
      this.$http.post(setPageViewUrl)
      /*setTimeout(() => {
        this.hidePop = true;
      }, 3000)*/
		},
		methods: {
      hideAgreeFn () {
        this.agreementShow = false;
      },
      // 获取验证码  判断是否有可用的手机号
      getCode () {
        var phone = this.dform.phone;
        if (!phone.trim()) {
          this.showToast = true;
          this.tip = '请输入联系人手机号';
          return false;
        } else if(!/^(1[3-9])\d{9}$/.test(phone)){
          this.tip = '请输入正确的联系人手机号';
          this.showToast = true;
          return false;
        };
        if (!this.preventCode) {
          this.preventCode = true;
          this.getCapcha();
        }
      },
      //向手机号发送 验证码
      getCapcha () {
        this.$http.post(sendCodeApi, {phone: this.dform.phone})
        .then((resp) => {
          this.timeout();
          this.tip = '验证码已发送';
          this.showToast = true;
        }).catch((error) => {
          this.preventCode = false;
          var data = error.response.data;
          this.tip = data.msg || '系统繁忙，请稍后再试';
          this.showToast = true;
        });
      },
      //定时器 发送验证码的定时器
      timeout () {
        var second = 59, timer;
        timer = setInterval(() => {
          if(second<=0){
            clearInterval(timer);
            second = 59;
            this.codeText = "重发验证码";
            this.preventCode = false;
          }else{
            this.codeText = second + "s后可重发";
            this.preventCode = true;
            second--;
          }
        }, 1000);
      },
      checkValid(){
        console.log('subdform', this.dform)
        //return true;
        if (!this.dform.companyName) {
          this.showToast = true;
          this.tip = '请输入企业名称'
          return;
        }
        if (!this.dform.contacts){
          this.showToast = true;
          this.tip = '请输入联系人姓名';
          return;
        }
        if (!this.isLogin && !this.dform.phone){
          this.showToast = true;
          this.tip = '请输入联系人手机号';
          return;
        }
        if (!this.isLogin && !/^(1[3-9])\d{9}$/.test(this.dform.phone)) {
          this.showToast = true;
          this.tip = '请输入正确的联系人手机号'
          return;
        }
        if (!this.isLogin && !this.dform.code){
          this.showToast = true;
          this.tip = '请输入验证码';
          return;
        }
        if (!this.isLogin && !/^\d{6}$/.test(this.dform.code)){
          this.showToast = true;
          this.tip = '请输入正确的验证码';
          return;
        }
        if (this.needSafeVerify && !/^(1[3-9])\d{9}$/.test(this.dform.frPhone)) {
          this.showToast = true;
          this.tip = '请输入正确的法人手机号'
          return;
        }
        return true
      },
      submit(){
        if (this.checkValid()) {
          if (this.submited) {
            return;
          }
          this.submited = true;
          this.loading = true;
          var data = Object.assign({}, this.dform);
          this.$http.post(importCompanyApi, data)
          .then((resp) => {
            this.submited = false;
            this.loading = false;
            console.log('resp', resp)
            this.$router.push({
              path: '/stepTwo',
              query: {
        				companyName: this.dform.companyName
        			}
            })
          })
          .catch((err) => {
            console.log(err.response)
            this.submited = false;
            this.loading = false;
            if (err.response && err.response.data && err.response.data.status == "10006") {
              this.needSafeVerify = true;
              this.getFrInfo();
              this.showToast = true;
              this.tip = '企业名已存在且联系人不一致';
            } else if (err.response && err.response.data && err.response.data.status == "10007") {
              this.needSafeVerify = true;
              this.showToast = true;
              this.tip = '法人校验失败';
            } else {
              this.showToast = true;
              this.tip = '系统繁忙，请稍后再试';
            }
          });
        }
      },
      // 获取法人姓名
      getFrInfo() {
        this.$http.get(getFrApi, {
          params: {
            name: this.dform.companyName
          }
        })
        .then((resp) => {
          this.dform.frname = resp.result.frname;
        })
        .catch((err) => {
          this.showToast = true;
          this.tip = '系统繁忙，请稍后再试';
        });
      },
      // 获取公司名称列表
      getCompanyNameList(v) {
        this.$http.get(getCompanyNameListApi, {
          params: {
            companyName: v
          }
        })
        .then((resp) => {
          this.companyNameList = resp.data;
        })
        .catch((err) => {
          this.showToast = true;
          this.tip = '系统繁忙，请稍后再试';
        });
      },
      custormAnchor(anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) { anchorElement.scrollIntoView({
          behavior: 'smooth',
          block:'start'
        }); }
      },
    },
    watch:{
      'dform.companyName': function(v) {
        if (v && v.length >=4) {
          this.getCompanyNameList();
        }
      }
    },
	}
</script>
<style lang="scss">
	.stepOne{
    width:100%;min-height: 100%; background-color: #fff;
    .top_tip{
      position: relative;padding: 15px 0;background-color: #F5F5F5;height: 104px;overflow:hidden;transition: all 0.3s;
      p{
        line-height: 37px;font-size:26px;text-align: center;
      }
      .last{color: #F64744;}
      i{font-size: 40px; height: 40px; position: absolute; top: 32px; right: 30px;color:#B2B2B2;}
      &.hide{height: 0;padding:0;}
    }
    .header{
      height: 460px;background:url('~assets/img/company/bg.png') no-repeat;background-size: 100% auto;text-align: center;
      >h1{font-size: 42px;color: #fff;line-height: 59px;padding: 40px 0 0;font-weight: 700;}
      .subtil{font-size: 24px;line-height: 33px;color: #C2DAFF;margin-top: 3px;padding-bottom: 13px;}
      .item{height:53px;font-size:38px;line-height:53px;margin-top: 27px;color: #fff;font-weight:500;}
      .tip{height:33px;font-size:24px;line-height:33px;margin-top: 57px;color: #C2DAFF;}
    }
		.platform{
      margin-top: -40px;
      .form_box{
        background: #FFFFFF;border-radius:24px 24px 0px 0px;padding-top: 30px;
        >h2{font-size: 34px;color: #114293;text-align: center;line-height: 128px;background: #deebff;border-radius: 10px 10px 0 0;}
        h4{font-weight: 600;line-height: 48px;font-size: 34px;color: #333333;text-align: center;padding: 60px 0 48px;}
        .form_item{
          padding: 0 30px 0;
          >label{
            font-size: 30px;color: #666;line-height: 42px;display: block;
            i{font-size: 32px;color: #F64744;font-style: normal;}
            &.hight{color: #333;}
          }
          .form_item_content{
            position: relative;border-bottom: 1px solid #E5E5E5;padding:38px 0 20px;box-shadow: 0 1px 1px #fff;
            &.fle2{display: flex;
              p{
                max-width: 240px;min-width: 160px;font-size: 34px;color: #333;line-height: 48px;
                i{color: #F64744;font-size: 34px;line-height: 48px;vertical-align: middle;margin-right: 2px;font-style: normal;}
              }
              input{margin-left: 20px;flex-grow: 1;border:0;background-color: transparent;height: 48px;line-height: 48px;font-size: 34px;color: #333333;}
              input::-webkit-input-placeholder{
                font-size: 34px;
                color: #bbb;
              }
            }
            &.fle3{
              justify-content: space-between;
              input{width: 280px;flex-grow: 0;margin-left: 0;}
              .code_btn{flex-basis: 150px;line-height: 48px;height: 48px;font-size: 28px;}
              .disabled{color: #ccc;}
            }
          }
        }
        .til{
          display: flex;justify-content: center;padding-top: 40px;
          img{width: 33px;height: 39px;}
          span{height:45px;line-height:45px;font-size:32px;margin-left: 10px;}
        }
        .footer_btn{
          text-align: center;padding: 40px 40px 0;font-size: 28px;color: #999;padding-bottom: 60px;
          .button{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:10px;width: 630px;height: 90px;margin: 0 auto; line-height: 90px;text-align: center;font-size: 32px;color: #FFFFFF;}
          p{
            font-size:26px;line-height: 37px;margin-top: 20px;color: #999;padding: 0 20px;
            span{color: #355CFB;}
          }
        }
      }
		}
	}
</style>
