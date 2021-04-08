<template>
  <div class="login_page">
    <div v-if="show" class="authorize_wrap">
      <div class="logo_box column-center">
        <img src="~assets/img/icon/logo.png" alt="">
        <p class="name">欢迎来到链科</p>
        <p class="info">为了更好的体验，请先完成以下授权！</p>
      </div>
      <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" class="btn_auth">小程序授权</button>
    </div>
    <div v-if="!show" class="login_wrap">
      <div class="titale_box column-center">
        <img src="~assets/img/icon/login_bg.png" alt="">
        <p class="white">参与“江干区高新技术企业培育三年行动计划”</p>
        <p class="white"><span class="yellow">预申报的企业手机号</span>请与<span class="yellow">联系人手机号保持一致</span></p>
      </div>
      <div class="login_form">
        <p class='line row-between'>
          <input type="number" placeholder-class="input-placeholder" class="input" v-model="phone" maxlength="11" placeholder="请输入手机号">
          <!-- <button class="link" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button> -->
        </p>
        <p class='line row-between'>
          <input type="number" placeholder-class="input-placeholder" class="input"  maxlength="6" v-model="token" placeholder="请输入验证码">
          <span class="link" :class="{'disabled': !preventCode, 'isOver': isOver}"  @click.stop="getCode">{{ codeText }}</span>
        </p>
        <button class="submit_btn" @click="goLogin">登录</button>
        <p class="tips">温馨提示：未注册链科账号的手机号，登录时将自动注册，且代 表您已同意<span class="link" @click="agreementShow = true">《链科用户注册协议》</span></p>
      </div>
    </div>

    <div class="back_index row-center" @click="backIndexFn">
      <img src="~assets/img/icon/back_index.png" alt="">
      <span class="text">回到首页</span>
    </div>

    <!-- 注册协议 -->
    <reg-agreement :agreementShow="agreementShow" @hide="hideAgreeFn"></reg-agreement>

    <u-message/>

    <mptoast/>

  </div>
</template>

<script>
import mixin from 'mixins/'
import filter from 'utils/filters'
import regAgreement from 'components/agreement/regAgreement'
export default {
  mixins: [mixin],
  components: {regAgreement},
  data () {
    return {
      show: false,  //展示获取授权按钮
      postData: {},
      phone: '',
      token: '',
      codeText: '获取验证码',
      isOver: false,
      preventCode: true,
      agreementShow: false,
    }
  },
  mounted () {
    this.initFn();
  },
  methods: {
    // 授权页面初始化
    initFn () {
      this.show = this.$route.query.showAuthorize==='true' ? true : false;
      if(this.show){
        wx.setNavigationBarTitle({
          title: ''
        });
      }
      else{
        wx.setNavigationBarTitle({
          title: '登录'
        });
      }
      // // isAuth表示是否授权 true:已授权 false:已授权
      // let isAuth = await this.checkLoginAndMark();
      // this.show = isAuth === false ? true : false;
    },
    // 回到首页
    backIndexFn () {
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
    hideAgreeFn () {
      this.agreementShow = false;
    },
    async getPhoneNumber(e) {
      console.log(e);
      let phone = await this.API.interfaces.getPhoneNumber(e);
      this.phone = phone;
    },
    // 获取验证码  判断是否有可用的手机号
    getCode () {
      let phone = this.phone;
      if (!phone.trim()) {
        this.tips('请输入手机号')
        this.checkPostData = true;
        return false;
      } else if(!/^1\d{10}$/.test(phone)){
        this.tips('请输入正确的手机号')
        this.checkPostData = true;
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
        await this.API.interfaces.sms(this.phone, {
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
    //校验 手机号 密码 验证码
    checkValid() {
      var phone = this.phone;
      var token = this.token;
      if (!phone.trim()) {
        this.tips('请输入手机号')
        return false;
      } else if(!/^1\d{10}$/.test(phone)){
        this.tips('请输入正确的手机号')
        return false;
      }
      if (!token.trim()) {
        this.tips('请输入验证码')
        return false;
      }else if(token.length !== 6){
        this.tips('校验码为6位数')
        return false;
      }
      return true;
    },
    // 登录
    async goLogin() {
      if (!this.checkValid()) {
        return;
      }
      try {
        let interfaces = this.API.interfaces;
        let query = this.$root.$mp.query;
        let loginRes = {};
        loginRes = await interfaces.login(this.phone, this.token);
        console.log('loginRes', loginRes)
        if(loginRes.code == 0) {
          interfaces.syncStore(loginRes);
          this.loginSuccessHandle();
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
        console.log('login error')
        // this.loaded();
      }
    },
    loginSuccessHandle(){
      let query = Object.assign({}, this.$root.$mp.query);
      let from = query.path;
      let userData = this.$storage.get('auth');
      let path = '';
      if (from) {
        path = from
      } else if (userData.isHaveStore == 1) {
        path = indexPath;
        wx.switchTab({ url: indexPath})
        return
      }else{
        path = '/pages/my/my'
      }
      wx.switchTab({
        url: path
      })
      // this.$router.replace({
      //   path,
      //   query
      // });
    },
    // 获取加密的用户信息
    async getUserInfo(e) {
      let self = this;
      let userInfo = e.target.userInfo;
      console.log(e)
      if (userInfo) {
        await self.API.interfaces.getUserInfoByUser(e.target);
        // 因授权后可实现跨小程序免登录，这儿简单处理, 再次发起登录验证
        let isLogin = await self.checkLoginAndMark();
        let auth = this.$storage.get('auth');
        if (isLogin && auth) {
          wx.switchTab({url: `/pages/index/index`});
          return;
        }
        self.show = false;
        wx.setNavigationBarTitle({
          title: '登录'
        });
      }else{
        // 拒绝授权的情况
        wx.showModal({
          title: '提示',
          content: '拒绝授权,小程序将不可用',
          success:function(res){
            self.backIndexFn();
          }
        })
      }
    },
  }
}
</script>

<style lang="scss">
  .login_page {
    position: absolute; width: 100%; height: 100%; background: #fff;
    .authorize_wrap {
      .logo_box {
        margin-top: 240px; width: 100%;
        img {width: 130px; height: 130px; border-radius: 16px;}
        .name {font-size: 36px; color: #333; font-weight: 500; line-height: 50px; margin-top: 24px;}
        .info {color: #999; font-size: 26px; line-height: 37px; margin-top: 10px;}
      }
      .btn_auth {width: 686px; height: 94px; line-height: 94px; padding: 0; border-radius: 47px; background: #3576FF; color: #fff; font-size: 32px; text-align: center; margin: 70px 32px 0 32px; }
    }
    .login_wrap {
      .logo_box {
        margin-top: 100px; width: 100%;
        img {width: 130px; height: 130px; border-radius: 16px;}
        .name {font-size: 36px; color: #333; font-weight: 600; line-height: 50px; margin-top: 24px;}
      }
      .titale_box {
        width: 100%; height: 370px; background:rgba(53,89,250,1); position: relative;
        img {width: 100%; height: 300px; position: absolute; left: 0; bottom: 0;}
        .white {
          font-size: 32px; color: #fff; position: relative; z-index: 1; margin-bottom: 10px;
          .yellow {color: #F9DA58;}
        }
      }
      .login_form {
        padding: 0 32px; margin-top: 60px;
        .line {
          width: 100%; border-bottom: 1px solid #eee; padding: 28px 0;
          .input {height: 48px; line-height: 48px; font-size: 34px;}
          .link {color: #333; font-size: 28px; height: 48px;line-height: 48px;padding: 0; border: 0;}
          .disabled {color: #999}
          .isOver{color: #2F80F6;}
        }
        .submit_btn {width: 100%; height:94px; line-height: 94px; padding: 0; border-radius: 4px; background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%); color: #fff; font-size: 36px; text-align: center; margin-top: 40px;}
        .tips {
          width: 100%; font-size: 24px; color: #aaa; margin-top: 30px; line-height: 33px;
          .link {color: #3576FF;}
        }
      }
      .tips_line {width: 522px; font-size: 20px; color: #999; line-height: 28px; margin: 210px auto 0 auto; text-align: center;}
    }
    .back_index {
      position: fixed; background: #F8F8F8; border-radius:100px; width: 198px; height: 64px; line-height: 64px; left: 276px; bottom: 55px;
      img {width: 42px; height: 32px;}
      .text {font-size: #aaa; font-size: 24px; margin-left: 10px;}
    }
  }
</style>
