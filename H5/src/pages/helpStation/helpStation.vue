<template>
	<div class="helpStation">
    <div class="top_item top_01" :class="{toLeft: top_01_bol}">
      <div>需要最新的科技资讯、政策文件、通知公告</div>
      <p><img src="~assets/img/ipSurvey/4-min.png" alt=""></p>
    </div>
    <div class="top_item top_02" :class="{toLeft: top_02_bol}">
      <div>需要美国301救助、进出口保护、电商保护</div>
      <p><img src="~assets/img/ipSurvey/5-min.png" alt=""></p>
    </div>
    <div class="top_item top_03" :class="{toLeft: top_03_bol}">
      <div>需求投诉维权、处理知产疑难、法律援助</div>
      <p><img src="~assets/img/ipSurvey/6-min.png" alt=""></p>
    </div>
    <div class="top_item top_04" :class="{toRight: top_04_bol}">
      <div>有任何需求您都可以在这提交，我们为您提供24小时的专家服务</div>
    </div>
    <div class="from">
      <h3>填报需求</h3>
      <div class="ipt_wrap">
        <input type="text" name="" v-model="dform.companyName" maxlength="30" placeholder="请输入企业名称">
      </div>
      <div class="ipt_wrap">
        <input type="text" name="" v-model="dform.contact" maxlength="20" placeholder="请输入联系人姓名">
      </div>
      <div class="ipt_wrap">
        <input type="text" name="" v-model="dform.contactPhone" maxlength="13" placeholder="请输入联系人电话">
      </div>
      <div class="textarea_wrap">
        <textarea v-model="dform.content" maxlength="500" placeholder="请输入需要帮助的具体内容"></textarea>
        <span>{{(dform.content && dform.content.length) || 0}}/500</span>
      </div>
      <div class="button" @click="submit">提交</div>
      <p class="hotline">专家热线：<a href="tel:0571-28253793">0571-28253793</a>或<a href="tel:0571-28253778">0571-28253778</a></p>
    </div>
    <popUp :show.sync="showPop"/>
    <toast v-model="showToast" type="warn">{{tip}}</toast>
    <loading :show="loading" text="请稍后"></loading>
	</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
	//import Filters from '../../api/filters.js';
  import popUp from './components/pop.vue'

	const title = '求助站';
	const imgUrl = 'https://sebe360test.oss-cn-beijing.aliyuncs.com/B6D57E3A24A407100265911B94032EB0.jpg';

  const techUrl = CONFIG.techUrl;
  const addIpDutyAndHelpUrl = techUrl + '/addIpDutyAndHelp';
  const Dform = {
    companyName:'',
    contact:'',
    contactPhone :'',
    content:'',
  }

	export default {
    components: {
      popUp
    },
		data() {
		  return {
        showPop: false,
        top_01_bol: false,
        top_02_bol: false,
        top_03_bol: false,
        top_04_bol: false,
        loading: false,
        submited: false,
        showToast:false,
        tip: '',
        dform: {...Dform},
		  }
		},
		mounted(){
			var url = location.href;
      // this.wxShare(title, url, imgUrl, '求助站', url.split('#')[0]); //微信分享  在mian.js里Vue的原型里已定义
      setTimeout(() => {
        this.top_01_bol = true;
      }, 500);
      setTimeout(() => {
        this.top_02_bol = true;
      }, 1000);
      setTimeout(() => {
        this.top_03_bol = true;
      }, 1500);
      setTimeout(() => {
        this.top_04_bol = true;
      }, 2000);
		},
		methods: {
      custormAnchor(anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) { anchorElement.scrollIntoView(); }
      },
      checkValid(){
        if (!this.dform.companyName) {
          this.showToast = true;
          this.tip = '请输入企业名称'
          return;
        }
        if (!this.dform.contact) {
          this.showToast = true;
          this.tip = '请输入联系人姓名'
          return;
        }
        if (!this.dform.contactPhone) {
          this.showToast = true;
          this.tip = '请输入联系人电话'
          return;
        }
        if (!/(^1\d{10}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)/.test(this.dform.contactPhone)) {
          this.showToast = true;
          this.tip = '请输入正确的联系人电话'
          return;
        }
        if (!this.dform.content) {
          this.showToast = true;
          this.tip = '请输入需要帮助的具体内容'
          return;
        }
        return true
      },
      submit(){
        if (this.checkValid()) {
          var self = this;
          var data = {...this.dform};
          console.log(data);
          if (this.submited) {
            return;
          }
          this.submited = true;
          this.loading = true;
          data.type = 2;
          self.$http.post(addIpDutyAndHelpUrl, data)
          .then((resp) => {
            this.submited = false;
            this.loading = false;
            this.showPop = true;
            this.dform = {...Dform};
          })
          .catch((err) => {
            this.submited = false;
            this.loading = false;
            this.showToast = true;
            if (err.response && err.response.data) {
              this.tip = err.response.data.msg || '系统繁忙，请稍后再试';
            }else{
              this.tip = '系统繁忙，请稍后再试';
            }
          });
        }
      }
		},
    watch: {
    },
		filters: {
		}
	}
</script>
<style lang="scss">
	.helpStation{
    position: relative;padding-top: 860px;background: #fff url(~assets/img/ipSurvey/bg2-min.jpg) 0 0 no-repeat;background-size: 100% auto;
    .top_item{
      position: absolute;
      div{background-color: #fff;display: inline-block;line-height: 33px;font-size: 24px;border-radius:34px 34px 0px 34px;padding: 15px 20px;font-weight:600;color: #1970FF;}
      p{
        text-align: right;
        img{width: 80px;height: 80px;}
      }
    }
    .top_01{
      top:122px;right: -434px;
      div{margin-right: 106px;width: 328px;}
      p{margin-right: 18px;margin-top: -8px;}
    }
    .top_02{
      top:241px;right: -632px;
      div{margin-right: 236px;width: 396px;}
      p{margin-right: 166px;}
    }
    .top_03{
      top:383px;right: -694px;
      div{margin-right: 366px;width: 328px;}
      p{margin-right: 292px;}
    }
    .top_04{
      top:623px;left: -704px;
      div{margin-left: 288px;border-radius:34px 34px 34px 0;width: 416px;}
    }
    .toLeft{right:0;transition:right 0.5s;}
    .toRight{left:0;transition:left 0.5s;}
    .from{
      height:1049px;padding: 60px 30px;background: #fff;box-shadow:0px -12px 20px 0px rgba(54,93,176,0.22);border-radius:24px 24px 0px 0px;
      h3{height: 45px;line-height: 45px;margin-bottom: 42px;font-size:32px;font-weight:600;text-align: center;}
      .ipt_wrap{
        height: 90px;border-radius:10px;border: 1PX solid #eee;margin-bottom: 20px;border-radius: 10px 10px 10px 10px;
        input{font-size: 28px;height: 52px;margin-top: 19px;margin-left: 30px;border: 0;width: 620px;}
      }
      .textarea_wrap{
        position: relative;height: 320px;border-radius: 10px 10px 10px 10px;border: 1PX solid #eee;margin-bottom: 40px;border-radius:10px;padding: 25px 30px;font-size: 28px;
        textarea{width: 100%;height: 220px;border: 0;resize: none;}
        span{position: absolute;right: 30px;bottom: 25px;color: #999;}
      }
      .button{height:90px;line-height: 90px;background:linear-gradient(270deg,rgba(66,114,255,1) 0%,rgba(35,124,255,1) 100%);border-radius:10px;text-align: center;font-size:32px;color: #fff;}
      .hotline{
        margin-top: 25px;height: 37px;line-height: 37px;color: #999;font-size: 26px;text-align: center;
        a{color: #1970FF;}
      }
    }
	}
</style>
