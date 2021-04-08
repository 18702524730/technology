<template>
  <!-- 科技项目申报 第1步 -->
  <div class="stepOne" :class="{'hidden': showPopform, 'iphoneX': isIphoneX}" @click="showSuggest=false">
    <div class="stepOneIn">
      <img class="title" src="~assets/img/highTech/title.png" alt="">
      <div class="box fir">
        <span class="num">1</span>
        <h3>税收减免&财政补贴</h3>
        <p class="tip">高企所得税减免、研发费用加计扣除，不同项目可获得政府直接无偿补助</p>
        <div class="project mt30">国家高新技术企业（补助<span>60万元</span>，所得税按<span>15%</span>征收)</div>
        <div class="project">市级高新技术企业（补助<span>20万元</span>)</div>
        <div class="project">省级科技型中小企业（补助<span>1万元</span>)</div>
        <div class="project">省级高新技术企业研究开发中心（补助<span>30万元</span>)</div>
        <div class="project">市级高新技术企业研究开发中心（补助<span>20万元</span>)</div>
        <div class="project">省级企业技术中心（补助<span>30万元</span>)</div>
        <div class="project">市级企业技术中心（补助<span>20万元</span>)</div>
        <div class="project">省重大科技计划项目（最高补助<span>300万元</span>)</div>
        <div class="project">市重大科技计划项目（最高补助<span>300万元</span>)</div>
        <div class="project">市科技型初创企业培育工程（最高补助<span>20万元</span>)</div>
        <div class="project">杭州市专利试点企业</div>
        <div class="project">杭州市专利示范企业</div>
      </div>
      <div class="box sec">
        <span class="num">2</span>
        <h3>品牌提升</h3>
        <p class="tip">具有公信力的政府单位背书，大大提升<br>企业品牌知名度</p>
        <img src="https://sebe360test.oss-cn-beijing.aliyuncs.com/9C8839DDEE24D556BABD6387E93BEC47.jpg" alt="">
      </div>
      <div class="box thi">
        <span class="num">3</span>
        <h3>政策倾斜</h3>
        <p class="tip">土地、电力、排污、节能、科研资金等<br>各项配套政策扶持</p>
        <img src="https://sebe360test.oss-cn-beijing.aliyuncs.com/BE1CB16471C90B09686E9B9089CA4252.jpg" alt="">
      </div>
      <div class="box fou">
        <span class="num">4</span>
        <h3>上市优先</h3>
        <p class="tip">吸引政策和资金扶持、推动企业产业化扩张<br>促进企业融资上市</p>
        <img src="https://sebe360test.oss-cn-beijing.aliyuncs.com/9F5F71141D785B965C5C7861355E8751.jpg" alt="">
      </div>
      <div class="evaluation">
        <div class="button" @click="showPopform=true">立即测评</div>
      </div>
      <img class="help" :class="{'showAll': showAll}" @click="helpClick" src="~assets/img/icon/help.png">
    </div>

    <!-- 弹窗 -->
    <div class="popform" v-if="showPopform">
      <div class="form_mask"></div>
      <form class="form_box" id="form_box" :class="{'styleTop': isLogin}">
        <div class="form_box_in">
          <div class="form_tip"><span>1分钟</span>帮您完成省市区<span>12</span>大政策智能评估</div>
          <div class="form_item" id="companyName">
            <div class="form_item_content fle0">
              <input type="text" v-model="dform.companyName" cursor-spacing="90" :maxlength="30" placeholder="请输入企业名称" />
            </div>
          </div>
          
          <div class="form_item">
            <div class="form_item_content fle0">
              <input type="text" v-model="dform.contacts" cursor-spacing="90" :maxlength="20" placeholder="请输入联系人姓名" class="tl" />
            </div>
          </div>
          <div class="form_item" v-if="!isLogin">
            <div class="form_item_content fle0">
              <input type="number" cursor-spacing="90" v-model="dform.phone" :maxlength="11" placeholder="请输入联系人手机号" class="tl" />
            </div>
          </div>
          <div class="form_item" v-if="!isLogin">
            <div class="form_item_content fle0 fle3">
              <input type="number" cursor-spacing="90" v-model="dform.code" :maxlength="6" placeholder="请输入短信验证码" class="tl"/>
              <span :class="preventCode ? 'code_btn' : 'code_btn disabled' "  @click.stop="getCode">{{codeText}}</span>
            </div>
          </div>
          <div class="footer_btn">
            <p v-if="!isLogin">登录注册时将代表您已同意<span @click="agreementShow = true">《链科用户注册协议》</span></p>
            <div class="button" @click.prevent="submit">提交</div>
          </div>
          <div class="suggestWrap" :class="{'suggestShow': showSuggest}">
            <img src="~assets/img/icon/arrow.png">
            <scroll-view scroll-y="true" class="suggest">
              <div class="suggest_in">
                <div class="item" v-for="(item, index) in companyNameList" :key="index" v-html="item.htmlName" @click.stop="fill(item.name)"></div>
              </div>
            </scroll-view>
          </div>
          <img class="close" src="~assets/img/icon/close2.png" alt="关闭" @click="showPopform = false">
        </div>
      </form>
      
    </div>
    <!-- 注册协议 -->
    <reg-agreement :agreementShow="agreementShow" @hide="hideAgreeFn"></reg-agreement>
    <u-message/>
    <mptoast/>
  </div>
</template>
<script>
  import Vue from 'vue'
  import qs from 'qs'
  import mixin from 'mixins/'
  import { _throttle } from 'utils/public';
  import regAgreement from 'components/agreement/regAgreement'

  const indexUrl = CONFIG.indexUrl;

  export default {
    mixins: [mixin],
    data() {
      return {
        nameChange: true,
        showSuggest: false,
        showPopform: false,
        showAll: false,
        agreementShow: false,
        isLogin: false,
        tip: '', // 提示文案
        showToast: false,
        hidePop: true, // 是否关闭顶部提示
        showPop: false, // 由于小程序渲染问题，这儿分开控制
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
        preventCode: true, // 防止多次发送验证码
        needSafeVerify: false, // 默认不需要法人安全验证
        companyNameList: [], // 公司名称列表
        isIphoneX: false,
      }
    },
    components: {
      regAgreement,
    },
    onUnload() {
      console.log('highTech page unload')
      this.needSafeVerify = false;
      this.dform.frname = '';
      this.dform.frPhone = '';
      this.hidePop = true;
      this.showPop = false;
    },
    async onShow() {
      console.log('this.isIphoneX:',this.isIphoneX);
      // 由于小程序渲染问题，这儿分开控制
      this.hidePop = false;
      setTimeout(() => {
        this.showPop = true;
      }, 500)
      let isLogin = await this.checkLoginAndMark();
      let auth = this.$storage.get('auth');
      if(isLogin && auth) {
        console.log('islogin:', true)
        this.isLogin = true;
      }
    },
    mounted(){
      this.isIphoneX = this.judgeIsPhoneX();
      this.API.my.setPageView();
      /*this.companyNameList = ["海通能源集团有限公司","杭州三基传媒有限公司","杭州万恒置业有限公司","杭州吉如股份经济合作社","嘉视年华影视制作有限公司","杭州盛鹏环境科技有限公司","爱思德（杭州）珠宝有限公司","杭州华业高科技产业园有限公司","杭州仁和先进制造业投资有限公司","杭州市临安区韦丰小额贷款股份有限公司"].map((item) => {
        return {
          name: item,
          htmlName: item.replace(this.dform.companyName, `<span style="color:#2C82F7;">${this.dform.companyName}</span>`)
        }
      });*/
    },
    methods: {
      makePhoneCall(phoneStr) {
        wx.makePhoneCall({
          phoneNumber: phoneStr //仅为示例，并非真实的电话号码
        })
      },
      hideAgreeFn () {
        this.agreementShow = false;
      },
      // 获取验证码  判断是否有可用的手机号
      getCode () {
        let phone = this.dform.phone;
        if (!phone.trim()) {
          this.tips('请输入手机号')
          return false;
        } else if(!/^1\d{10}$/.test(phone)){
          this.tips('请输入正确的手机号')
          return false;
        };
        if (this.preventCode) {
          this.preventCode = false;
          this.getCapcha();
        }
      },
      //向手机号发送 验证码
      async getCapcha () {
        try {
          await this.API.interfaces.sms(this.dform.phone, {
            errorAction: true
          });
          this.timeout();
          this.$mptoast('验证码发送成功');
          this.isOver = false;
        } catch(e) {
          this.preventCode = true;
          this.tips(e.response && e.response.data.msg);
        }
      },
      //定时器 发送验证码的定时器
      timeout () {
        var self = this;
        var second = 59, timer;
        timer = setInterval(function(){
          if(second<=0){
            clearInterval(timer);
            second = 59;
            self.codeText = "重发验证码";
            self.preventCode = true;
          }else{
            self.codeText = second + "s后可重发";
            self.preventCode = false;
            second--;
          }
        }, 1000);
      },
      checkValid(){
        console.log('subdform', this.dform)
        if (!this.dform.companyName) {
          this.tips('请输入企业名称')
          return;
        }
        if (!this.dform.contacts){
          this.tips('请输入联系人姓名')
          return;
        }
        if (!this.isLogin && !this.dform.phone){
          this.tips('请输入联系人手机号')
          return;
        }
        if (!this.isLogin && !/^(1[3-9])\d{9}$/.test(this.dform.phone)) {
          this.tips('请输入正确的联系人手机号')
          return;
        }
        if (!this.isLogin && !this.dform.code){
          this.tips('请输入验证码')
          return;
        }
        if (!this.isLogin && !/^\d{6}$/.test(this.dform.code)){
          this.tips('请输入正确的验证码')
          return;
        }
        return true
      },
      // 登录
      async submit(){
        if (this.checkValid()) {
          if (this.isLogin) {
            this.showPopform = false;
            let key = this.$storage.get('key');
            this.$router.push({
              path: '/pages/index/highTechIn',
              query: {
                name: this.dform.companyName,
                contacts: this.dform.contacts,
                key,
              }
            });
            return;
          }
          if (this.submited) {
            return;
          }
          this.submited = true;
          try {
            let interfaces = this.API.interfaces;
            let loginRes = {};
            let data = Object.assign({}, this.dform);
            loginRes = await interfaces.login(data.phone, data.code);
            this.submited = false;
            console.log('loginRes', loginRes)
            if(loginRes.code == 0) {
              interfaces.syncStore(loginRes);
              this.showPopform = false;
              this.$router.push({
                path: '/pages/index/highTechIn',
                query: {
                  name: this.dform.companyName,
                  contacts: this.dform.contacts,
                  key: loginRes.memberDto.key,
                }
              });
            } else if(loginRes.code == 10013) {
              this.tips('您的账号存在异常，请先联系4000-315-426解除异常');
              return;
            } else if(loginRes.code == 10023) {
              this.tips('手机验证码错误');
              return;
            } else if(loginRes.code == 10009) {
              this.tips('验证码发送过于频繁');
              return;
            } else if(loginRes.code == 10010 || loginRes.code == 10012 || loginRes.code == 500 || loginRes.code == 400 || loginRes.code == 100004 || loginRes.code == 100003 || loginRes.code == 10002) {
              this.init = false;
              this.isErr = true;
              this.tips(loginRes.msg || '系统升级中');
              return;
            } else if(loginRes.code == 300017){
              wx.showModal({
                title: '',
                showCancel:false,
                confirmColor:"#10AEFF",
                content: '手机号已与另一个微信账号关联，请换一个手机号再试'
              })
            } else if(loginRes.code == 300016){
              wx.showModal({
                title: '',
                showCancel:false,
                confirmColor:"#10AEFF",
                content: '微信账号已与另一个手机号关联，请换一个微信账号再试'
              })
            }else{
              console.log('sss')
              this.init = false;
              this.isErr = true;
              this.tips(loginRes.msg || '系统升级中');
            }
            console.log('loginRes:',loginRes)
          }
          catch(err){
            this.submited = false;
            console.log('login error')
            // this.loaded();
          }
        }
      },
      // 获取法人姓名
      async getFrInfo() {
        let resp = await this.API.my.getCorporation(this.dform.companyName);
        this.dform.frname = resp.frname;
      },
      // 获取公司名称列表
      getCompanyNameList: _throttle(async function () {
        if (!this.dform.companyName) {return}
        let resp = await this.API.ipSearch.companyFilter({ keyword: this.dform.companyName });
        if (resp && resp.length) {
          resp = resp.map((item) => {
            return {
              name: item,
              htmlName: item.replace(this.dform.companyName, `<span style="color:#2C82F7;">${this.dform.companyName}</span>`)
            }
          });
          this.companyNameList = resp;
          this.showSuggest = true;
        } else {
          this.companyNameList = []
          this.showSuggest = false;
        }
      }, 800),
      helpClick() {
        if (this.showAll) {
          this.makePhoneCall('17816082754')
        } else {
          this.showAll = true;
          setTimeout(() => {
            this.showAll = false;
          }, 3000)
        }
      },
      fill(name) {
        this.dform.companyName = name;
        this.showSuggest = false;
        this.nameChange = false;
        setTimeout(() => {
          this.nameChange = true;
        }, 1000)
      }
    },
    watch:{
      'dform.companyName': function(v) {
        if (v) {
          this.needSafeVerify = false;
        }
        if (v && v.length >=2 && this.nameChange) {
          this.getCompanyNameList();
        } else {
          this.showSuggest = false;
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
  .stepOne{
    width:100%;min-height: 100%; background-color: #fff;
    .stepOneIn{
      background: #6253CF url(https://sebe360test.oss-cn-beijing.aliyuncs.com/1AEF7B3B67B5CF0522AF84E225BB774D.jpg) 0 0 no-repeat;background-size: 750px 1790px;padding-top: 90px;padding-bottom: 150px;
      >.title{width: 487px;height: 210px;margin: 0 auto 0;display: block;}
      >.box{
        border-radius:6px;background-color: #fff;margin: 20px 20px 0;text-align: center;padding-top: 40px;background: #fff url(https://sebe360test.oss-cn-beijing.aliyuncs.com/5101BB45F6D480586A6CB5BD8ED9125D.jpg) center 0 no-repeat;background-size: 690px 160px;
        .num{width:90px;height: 90px;border-radius:90px;background-color: #2F80F6;color: #fff;font-size:40px;line-height: 90px;text-align: center;display: inline-block;}
        h3{font-size:36px;line-height: 50px;font-weight:600;margin-top: 20px;}
        .tip{font-size:26px;line-height:37px;width: 590px;display: inline-block;margin-top: 10px;}
      }
      .fir{
        margin-top: 55px;padding-bottom: 40px;
        .project{
          width:670px;height:80px;line-height: 80px;font-size:24px;background-color: #F5F9FF;border-radius:45px;display: inline-block;margin-bottom: 10px;
          span{color: #F64744;}
        }
      }
      .sec{
        padding-bottom: 30px;
        img{width: 460px;height: 446px;margin: 10px auto 0;display: block;}
      }
      .thi{
        padding-bottom: 30px;
        img{width: 460px;height: 320px;margin: 10px auto 0;display: block;}
      }
      .fou{
        padding-bottom: 30px;
        img{width: 460px;height: 320px;margin: 10px auto 0;display: block;}
      }
      .evaluation{
        position: fixed;left:0; bottom:0;width:100%;padding: 20px 40px;background-color: #fff;
        .button{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:45px;width: 100%;height: 90px;line-height: 90px;text-align: center;font-size: 30px;color: #FFFFFF;}
      }
    }
    
    
    .popform{
      position: fixed;left:0; top:0;width:100%;height:100%;
      // border-radius:10px 10px 0px 0px;background-color: #fff;padding-top: 30px;box-shadow:0px 2px 10px 0px rgba(0,0,0,0.1);
      .form_mask{position: absolute;left: 0;top: 0;right: 0;bottom: 0;background-color: rgba(0, 0, 0, 0.5);}
      .form_box{
        position: fixed;left:50%; top:10%;border-radius:8px;width: 670px;margin-left: -335px;background-color: #fff;
        &.styleTop{top:20%;}
        .form_box_in{
          position: relative;padding-top: 50px;
          .form_tip{
            font-size:26px;text-align: center;line-height:37px;
            span{color:#F64744;}
            span.b{color: #2F80F6;}
          }
          .suggestWrap{
            position: absolute; top: 217px; left: 40px;width:590px;height: 280px;opacity:0;box-shadow:0px 2px 10px 0px rgba(0,0,0,0.1);border-radius:8px;background-color: #fff;transition: all 0.3s;overflow: auto;z-index: -1;
            img{position: absolute; top: -12px; left: 50%; width: 23px; height: 12px;z-index: 3;margin-left: -11px;transform: rotate(180deg);}
            .suggest{
              max-height:280px;
              .suggest_in{
                padding: 20px 0px;
                .item{
                  line-height: 40px;height:60px;padding: 10px 40px;font-size: 28px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;display: block;
                  span{color: #2C82F7;}
                }
              }
            }
            &.suggestShow{opacity:1;overflow: visible;z-index: 2;}
          }
          .form_item{
            padding: 0 40px 0;
            >label{
              font-size: 30px;color: #666;line-height: 42px;display: block;
              i{font-size: 32px;color: #F64744;font-style: normal;}
              &.hight{color: #333;}
            }
            .form_item_content{
              position: relative;border-bottom: 1px solid #E5E5E5;padding:38px 0 20px;box-shadow: 0 1px 1px #fff;
              &.fle0{
                border: 1px solid #EEEEEE;border-radius:45px;height:90px;padding: 0;box-shadow: none;margin-top: 20px;
                input{text-align: left;line-height: 88px;height: 88px;font-size: 30px;color: #333333;border:0;background-color: transparent;padding-left: 40px;}
                input::-webkit-input-placeholder{
                  font-size: 30px;
                  color: #999!important;
                }
              }
              &.fle3{
                display: flex; justify-content: space-between;
                input{width: 350px;flex-grow: 0;margin-left: 0;}
                .code_btn{line-height: 88px;height: 88px;font-size: 30px;color: #2F80F6;text-align: right;margin-right: 40px;}
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
            text-align: center;padding: 30px 40px 50px;font-size: 28px;color: #999;
            .button{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:45px;width: 100%;height: 90px;line-height: 90px;text-align: center;font-size: 30px;color: #FFFFFF;}
            p{
              font-size:24px;line-height: 33px;color: #999;padding-bottom: 20px;
              span{color: #2F80F6;}
            }
          }
          .close{width: 90px;height: 90px;display: block;position: absolute;left: 50%;bottom: -140px;margin-left: -45px;}
        }
      }

    }
    .help{
      position: fixed; right: 12px; bottom: 170px; width: 112px; height: 155px;transition: transform 0.3s;transform: translateX(68px);
      &.showAll{transform: translateX(0)}
    }
  }
  .hidden{overflow: hidden;height: 100%;}
  .iphoneX{
    .stepOneIn{
      padding-bottom: 218px;
      .evaluation{
        padding-bottom: 88px;
      }
    }
    .help{
      bottom: 238px;
    }
  }
</style>
