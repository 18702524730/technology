<template>
  <div class="caseDetail" :class="[isIphoneX ? 'caseDetailPhoneXWrap' : '']">
    <h3>{{detailData.title}}</h3>
    <div class="info">
      <p><label v-if="detailData.author" style="color: #3576FF">{{detailData.author}}</label><span>{{detailData.publishDate}}</span></p>
      <!-- <p><label>浏览量：</label><span>{{detailData.views}}</span></p> -->
    </div>
    <div class="summary">
      <!-- <p class="abstract">{{detailData.txt}}</p> -->
      <rich-text :nodes="detailData.text"></rich-text>
    </div>
    <!-- 高新申报 -->
    <div class="back_index" @click="backIndex" :class="{'iphoneX_back_index': isIphoneX, 'show_back_index': backIndexStatus}">申报<br>高新</div>
    <div :class="['footer_wrap', isIphoneX ? 'phoneX_footer_wrap' : '']">
      <div class="footer_left" @click="shareDiaState = true">
        <img src="~assets/img/icon/share.png" alt="">
        转发分享</div>
      <button class="footer_left footer_right" v-if="detailData.files&&detailData.files.length&&!auth&&!phone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
        <img src="~assets/img/icon/attachment.png" alt=""> 收取附件</button>
      <div class="footer_left footer_right" v-if="detailData.files&&detailData.files.length&&(auth || phone)" @click="attachDiaState = true">
        <img src="~assets/img/icon/attachment.png" alt="">
        收取附件
      </div>
    </div>
    <!--  分享弹框  -->
    <div class="transition_up" v-if="shareDiaState" :class="{'show_animation': shareDiaState}">
      <div class="mask_bg"  @click="hideFn"></div>
      <div class="transition_wrap" >
        <div class="shareTransitionContent">
          <div class="shareTitle">转发分享</div>
          <div class="shareIcon">
            <button class="user" @click="shareDiaState = false" open-type="share">
              <img src="~assets/img/homepage/shareUser.png" alt="">
              <p>好友/群聊</p>
            </button>
            <div class="circle" @click="goShare">
              <img src="~assets/img/homepage/Moments.png" alt="">
              <p>朋友圈</p>
            </div>
          </div>
          <div class="btn" @click="shareDiaState = false">取消</div>
          <div v-if="isIphoneX" class="iphoneX_blank"></div>
          <span @click="shareDiaState = false">×</span>
        </div>
      </div>
    </div>
    <!-- 附件弹框 -->
    <div class="transition_up" v-if="attachDiaState" :class="{'show_animation': attachDiaState}">
      <div class="mask_bg"  @click="hideFn"></div>
      <div class="transition_wrap" >
        <div class="shareTransitionContent">
          <div class="shareTitle">收取附件</div>
          <div class="attach_wrap" v-if="detailData.files">
            <p v-for="(item, index) in detailData.files" :key="index">{{item.description}}</p>
            <!-- <p>杭州市江干区“百人计划”创业项目申请表杭州市江干区“百人计划”创业项目申请表.docx</p>
            <p>杭州市江干区“百人计划”创业项目申请表.docx</p> -->
          </div>
          <div class="input_wrap">
            <input type="text" confirm-type="done"  cursor-spacing="154" v-model="email" placeholder="请填写邮箱地址">
          </div>
          <div class="btn_wrap" :class="{'phoneX_btn_wrap': isIphoneX}">
            <div class="submit_btn btn" @click="sendMail">提交</div>
          </div>
          
          <!-- <div v-if="isIphoneX" class="iphoneX_blank"></div> -->
          <span @click="attachDiaState = false">×</span>
        </div>
      </div>
    </div>
    <u-message/>
  </div>
</template>

<script>
  import Filters from 'utils/filters.js'
  import mixins from 'mixins/';
  const { cmsUrl } = CONFIG;
  import { _debounce } from 'utils/public.js'
  export default {
    mixins: [mixins],
    components: {
    },
    data () {
      return {
        shareDiaState: false,
        attachDiaState: false,
        backIndexStatus: false,
        isIphoneX: false,
        phone: '',
        auth: '',
        detailData: {},
        email: '',
        similarData: [],
        id: '',
        fromShare: false,
        isIphoneX: false,
      }
    },
    async onShow () {
      // 解密手机号 sessionId要提前获取 https://blog.csdn.net/hl18730262380/article/details/89671346
      await this.API.interfaces.checkLogin();
    },
    onLoad () {
      this.isIphoneX = this.judgeIsPhoneX();
      let query = this.$route.query;
      this.id = query.id || query.scene;
      this.fromShare = !!query.fromShare;
      this.auth = this.$storage.get('auth') || '';
      this.phone = this.$storage.get('phone') || '';
      this.email = this.$storage.get('email') ? this.$storage.get('email') : '';
      this.getDetailInfoFn();
      this.isIphoneX = this.judgeIsPhoneX()
      console.log('isIphoneX', this.isIphoneX)
    },
    onPageScroll (e){
      this.backIndexStatus = false
    },
    // 监听用户点击页面内转发按钮
    onShareAppMessage() {
      let obj = {};
      obj = {
        title: this.detailData.title,
        path: `/pages/index/msgDetail?id=${this.id}&fromShare=1`,
      }
      return obj;
    },
    methods: {
      backIndex () {
        this.backIndexStatus ? wx.switchTab({url: '/pages/index/index'}) : this.backIndexStatus = true;
      },
      async getPhoneNumber(e) {
        if (!e.mp.detail.encryptedData) {
          wx.showToast({icon: 'none', title: '拒绝授权该功能将不可用'})
          return;
        }
        if (!this.$storage.get('sessionId')) {
          await this.API.interfaces.checkLogin()
        }
        let phone = await this.API.interfaces.getPhoneNumber(e);
        this.attachDiaState = true
        this.phone = phone;
        this.$storage.set('phone', this.phone)
      },
      // 发送邮件
      sendMail: _debounce(async function () {
        let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (!reg.test(this.email)) {
          this.$message({content: '邮箱格式不正确', type: 'error'});
          return;
        }
        this.$storage.set('email', this.email);
        let fileList = [], obj = {};
        if (this.detailData.files) {
          for (let i = 0; i < this.detailData.files.length; i++) {
            fileList.push({url: cmsUrl + '/publicCMS/webfile/' + this.detailData.files[i].filePath, title: this.detailData.files[i].description});
          }
        }
        console.log('fileList', fileList)
        let params = {email: this.email, body: fileList, title: this.detailData.title};
        if (!this.auth) {
          params.phone = this.phone
        }
        try {
          await this.API.home.sendMail(params);
          this.attachDiaState = false;
          // this.email = '';
          wx.showToast({
            title: '附件已发送请注意查收',
            icon: 'none',
            duration: 2000
          })
        } catch (error) {
        }
      }, 1500, true),
      goShare () {
        this.$router.push(`/pages/index/share?id=${this.id}`);
        this.shareDiaState = false;
      },
      async getDetailInfoFn () {
        let data = {
          id: this.id
        }
        try {
          let resp = await this.API.home.contentAttribute(data);
          // 匹配替换img中的style属性
          let t = resp.object.text;
          resp.object.text = t.replace(/<img[^>]*>/gi, function (match) {
            //先替换style为ori-style，再增加style="max-width:100%;height:auto"
            let ret = match.replace('style', 'ori-style').replace(/\<img.*?(?=src)/gi, '<img style="max-width:100%;height:auto" ');
            console.log(match)
            console.log(ret)
            return ret;
          });
          this.detailData = resp.object;
          this.detailData.publishDate = Filters.filters.dateFormat(this.detailData.publishDate, 'date');
        }
        catch (e) {}
      },
      toIndex() {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    },
    watch: {
    }
  }
</script>

<style lang="scss">
  .caseDetail {
    position: relative; min-height: 100%; background: #fff;padding-bottom: 98px;
    h3{padding:40px 30px 0;line-height: 45px;font-size:32px;font-weight:600;background-color: #fff;}
    .info{
      padding: 30px;background-color: #fff;
      p{
        display: flex;flex-direction: row;font-size:28px;margin-bottom: 20px;
        label{height: 40px;line-height: 40px;padding-right: 30px;color: #999;}
        span{line-height: 40px;max-width: 530px;}
        a{color: #3576FF;}
        &:last-child{margin-bottom: 0;}
      }
    }
    .summary{
      font-size: 28px;line-height: 56px;padding: 0 30px 30px;background-color: #fff;
      h4{font-size: 28px;font-weight: bold;}
      p{margin-bottom: 20px;}
      p:last-child{margin-bottom: 0;}
    }
    .relative{
      padding: 30px 30px 40px 30px;background-color: #fff;margin-top: 20px;
      h4{font-size: 28px;font-weight: bold;}
      div{
        span{float: left;padding: 0 20px;line-height:64px;height: 64px;margin-top: 20px;margin-right: 20px;background-color: #f5f5f5;border-radius:5px;max-width: 690px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
      }
    }
    .foot{
      position: fixed;left: 0;bottom: 0;width:100%;height: 92px;background-color: #fff;padding: 15px 0;
      button{width:180px;height:62px;border-radius:31px;border:1px solid #3576FF;line-height: 60px;text-align: center;color:#3576FF;font-size: 26px; padding: 0;}
      .share{background-color: #3576FF;border-color: #3576FF;color: #fff;margin-left: 20px;}
      .share_single{
        i{color: #3576FF;font-size: 30px;margin-right: 6px;display: inline;position: relative;top: -2px;}
      }
    }
    .back_index{transition: all 0.3s ease;;width: 120px;height: 120px;border-radius: 60px;background:linear-gradient(135deg,rgba(255,160,47,1) 0%,rgba(255,82,82,1) 100%);box-shadow:0px 2px 20px 0px rgba(255,111,83,0.5);text-align: center;padding-top: 32px;position: fixed;right: -60px;bottom: 158px;color: #fff;font-size: 25px;line-height: 28px;font-weight: 600;}
    .iphoneX_back_index{bottom: 226px;}
    .show_back_index{right: 30px;}
  }
  .caseDetailPhoneXWrap{
    padding-bottom: 166px;
    .foot{padding: 15px 0 83px;height: 160px;}
  }
  .footer_wrap{display: flex;position: fixed;bottom: 0;left: 0;width: 100%;background: #fff;border-top: 1px solid #eee;
    >div, .footer_right{font-size: 28px;text-align: center;line-height: 98px;flex: 1;
      img{width: 35px;height: 32px;transform: translateY(6px);}
    }
    .footer_right{display: block;border: none;padding: 0;border-left: 1px solid #eee;color: #333;}
  }
  .phoneX_footer_wrap{padding-bottom: 68px;}

  .transition_up {
    position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: 8999;
    .mask_bg {position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: 9000;}
    .transition_wrap {
      position:fixed; left:0; bottom: 0; z-index:9001; width: 100%; height: auto; background: #fff; box-shadow:0px -10px 30px 0px rgba(47,128,246,0.09); border-radius:10px 10px 0px 0px; overflow: hidden;
    }
  }
  .iphoneX_transition_up{padding-bottom: 68px;}
  .show_animation {
    .mask_bg {animation: fadeIn 0.3s ease-out; display:block;}
    .transition_wrap {animation: moveUp 0.3s ease-out; bottom: 0;}
  }
  .shareTransitionContent{position: relative;text-align: center;width: 100%;
    .shareTitle{color: #333;font-size: 32px;line-height: 45px;padding: 60px 0 40px;}
    .shareIcon{display: flex;padding-left: 110px;
      >div, >.user{font-size: 0;padding: 0 65px;border: none;
        img{height: 120px;width: 120px;}
        p{font-size: 30px;color:#333;line-height: 42px;padding: 20px 0 60px;}
      }
    }
    .attach_wrap{margin: -10px 30px 50px;background: #F5FBFF;padding: 30px 30px 15px;
      p{line-height: 37px;padding-bottom: 15px;color: #3576FF;font-size: 26px;text-align: left;max-width: 630px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    }
    .input_wrap{margin: 0 30px 59px;border-bottom: 1px solid #eee;padding-bottom: 25px;
      input{line-height: 42px;color: #333;font-size: 30px;}
    }
    >span{position: absolute;width: 90px;height: 90px;line-height: 90px;font-size: 60px;right: 0;z-index: 1002;top: 0;color: #ddd;}
    .btn{line-height: 98px;color: #333;font-size: 32px;border-top: 1px solid #eee;}
    .btn_wrap{padding-bottom: 20px;}
    .phoneX_btn_wrap{padding-bottom: 88px;}
    .submit_btn{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color:#FFFFFF;margin: 0 30px;border-radius: 45px;}
    .iphoneX_blank{height: 68px;}
  }
</style>
