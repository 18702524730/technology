<template>
  <div class="enterPop" :class="{'errEnterPop': errorMsg}">
    <div class="title">
      <h2>提交入库</h2>
      <img @click="hide" src="../../../assets/img/icon/close1.png" />
    </div>
    <p v-if="!errorMsg" class="tip">企业入库以后信息会同步推送给相关法人的手机号，法人可以同步查看</p>
    <form v-if="!errorMsg" class="form_box" id="form_box">
      <div class="form_item" id="companyName">
        <div class="form_item_content fle2">
          <p>企业名称</p>
          <input type="text" v-model="dform.companyName" :maxlength="30" disabled />
        </div>
      </div>
      <div class="form_item">
        <div class="form_item_content fle2">
          <p>法人</p>
          <input type="text" v-model="dform.frname" :maxlength="20" disabled />
        </div>
      </div>
      <div class="form_item" id="frPhone">
        <div class="form_item_content fle2">
          <p><i>*</i>法人手机号</p>
          <input type="number" cursor-spacing="30" v-model="dform.frPhone" :maxlength="11" placeholder="请输入法人手机号" />
        </div>
      </div>
      <div class="form_item">
        <div class="form_item_content fle2 fle3">
          <p><i>*</i>验证码</p>
          <input type="number" cursor-spacing="30" v-model="dform.code" :maxlength="6" placeholder="请输入短信验证码" />
          <span :class="preventCode ? 'code_btn' : 'code_btn disabled' "  @click.stop="getCode">{{codeText}}</span>
        </div>
      </div>
      <div class="footer_btn">
        <div class="button" @click.prevent="submit">提交</div>
        <p>法人信息有误？请联系客服校正：<span @click="makePhoneCall('17816082754')">17816082754</span></p>
      </div>
    </form>
    <div v-if="errorMsg" class="err_box">
      <img src="../../../assets/img/company/quest.png">
      <p>{{errorMsg}}<br>如有疑问请联系：<span @click="makePhoneCall('17816082754')">17816082754</span></p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      companyName: {
        type: String,
        default: '',
      }
    },
    data() {
      return {
        errorMsg: '',
        dform: {
          companyName: '',
          code: '',
          frname: '',
          frPhone: ''
        },
        submited: false, // 防止表单多次提交
        loading: false,
        codeText: '获取验证码',
        preventCode: true, // 防止多次发送验证码
        zoom: false,
        frname: '',
      }
    },
    mounted(){
      this.dform.companyName = this.companyName;
      this.getFrInfo();
    },
    methods: {
      tips(str){
        this.$emit('showTip', str);
      },
      hide() {
        this.$emit('hide')
      },
      makePhoneCall(phoneStr) {
        wx.makePhoneCall({
          phoneNumber: phoneStr
        })
      },
      // 获取验证码  判断是否有可用的手机号
      getCode () {
        let phone = this.dform.frPhone;
        if (!phone.trim()) {
          this.tips('请输入法人手机号')
          return false;
        } else if(!/^1\d{10}$/.test(phone)){
          this.tips('请输入正确的法人手机号')
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
          await this.API.my.sendFrCheckCode({
            phone: this.dform.frPhone,
            companyName: this.dform.companyName,
            frname: this.frname,
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
        if (!this.dform.frPhone){
          this.tips('请输入法人手机号')
          return;
        }
        if (!/^(1[3-9])\d{9}$/.test(this.dform.frPhone)) {
          this.tips('请输入正确的法人手机号')
          return;
        }
        if (!this.dform.code){
          this.tips('请输入验证码')
          return;
        }
        if (!/^\d{6}$/.test(this.dform.code)){
          this.tips('请输入正确的验证码')
          return;
        }
        return true
      },
      async submit(){
        if (this.checkValid()) {
          if (this.submited) {
            return;
          }
          this.submited = true;
          var data = Object.assign({}, this.dform);
          try {
            let resp = await this.API.my.inlib(this.dform.companyName, this.dform.code)
            /*if (resp.memberDto) {
              this.$storage.set('auth', resp.memberDto)
              this.$storage.set('key', resp.memberDto.key)
            }*/
            console.log('resp:', resp)
            this.submited = false;
            this.hide();
            this.$router.push({
              path: '/pages/my/enterComplete',
            })
          } catch(err) {
            console.log('err:', err)
            this.submited = false;
            if (err && err.response && err.response.data.msg) {
              if (err.response.data.status === '10010') {
                this.tips(err.response.data.msg)
              } else {
                this.errorMsg = err.response.data.msg;
              }
            }
          }
        }
      },
      // 获取法人姓名
      async getFrInfo() {
        let resp = await this.API.my.getCorporation(this.dform.companyName);
        let frname = resp.frname;
        this.frname = frname || '';
        this.dform.frname = frname ? frname.slice(0, 1) + new Array(frname.length).join('*') : '';
      },
    },
    watch: {
      companyName() {
        this.dform.companyName = this.companyName;
        this.errorMsg = '';
      }
    },
  }
</script>

<style lang="scss">
  .enterPop{
    position: relative;width: 100%;transition: height 0.3s;height: 872px;
    .title{
      width: 100%;display: flex;justify-content: space-between;padding: 40px 30px;
      h2{font-size: 32px;text-align: center;line-height: 45px;height: 45px;font-weight: 600;}
      img{width: 34px; height: 34px;}
    }
    .tip{font-size: 26px; color: #999;line-height: 37px;padding: 0 30px;margin-top: -30px;}
    .form_box{
      background: #FFFFFF;border-radius:24px 24px 0px 0px;padding-top: 40px;
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
              width: 205px;font-size: 34px;color: #333;line-height: 48px;
              i{color: #F64744;font-size: 34px;line-height: 48px;vertical-align: middle;margin-right: 2px;font-style: normal;}
            }
            input{margin-left: 20px;flex-grow: 1;border:0;background-color: transparent;height: 48px;line-height: 48px;font-size: 34px;color: #333333;}
            input::-webkit-input-placeholder{
              font-size: 34px;
              color: #ccc;
            }
          }
          &.fle3{
            justify-content: space-between;
            input{width: 270px;flex-grow: 0;margin-left: 0;}
            .code_btn{flex-basis: 180px;text-align:right;line-height: 56px;height: 48px;font-size: 28px;}
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
        text-align: center;padding: 40px 30px 0;font-size: 28px;color: #999;padding-bottom: 60px;
        .button{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:10px;width: 100%;height: 90px;line-height: 90px;text-align: center;font-size: 32px;color: #FFFFFF;}
        p{
          font-size:26px;line-height: 37px;margin-top: 30px;color: #999;padding: 0 20px;
          span{color: #355CFB;}
        }
      }
    }
    .u_message{width: 100%;}
    .err_box{
      height: 400px;display: flex;flex-direction:column; justify-content: center;align-items: center;
      img{width: 103px;height: 103px;}
      p{
        font-size:28px;line-height: 45px;margin-top: 39px;color: #333;text-align: center;
        span{color: #355CFB;}
      }
    }
  }
  .errEnterPop{height: 524px;}
</style>
