<template>
  <!-- 完善企业数据 第3步 -->
	<div class="stepThree" :class="{'fixedPadding1': !isIOS}">
		<div class="platform">
      <p class="boxes_til">仅需<span>2</span>步快速完成！</p>
      <div class="boxes" id="boxes">
        <div class="steps">
          <div class="step c50 one">
            <span>1</span>基础数据智能获取
          </div>
          <div class="divsion"></div>
          <div class="step two">
            <span>2</span>核心数据自助完善
          </div>
        </div>
        <h2>{{companyName}}</h2>
        <p class="top_tip">请完善以下必填数据，<span>数据越准确，评估结果越准确</span></p>
        <!-- <h2>完善企业数据</h2> -->
        <companyFormNew btnName="提交" :showAll="false" :formData="formData" :fixedBtn="false" :isWhite="true" :whiteKeyNameList="whiteKeyNameList" @submit="submit"/>
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
  import companyFormNew from './components/companyFormNew.vue';
  //import innerFooter from './components/footer.vue';

  const indexUrl = CONFIG.indexUrl;
  const commitCompanyApi = indexUrl + '/commitCompany';
  const setPageViewUrl = indexUrl + '/setPageView';

	export default {
    directives: {
      TransferDom
    },
		data() {
		  return {
        whiteKeyNameList: [], // 需要显示的表单项 keyName
        formData: {},
        showAll: false, // 显示所有表单项
        loading: false,
        showToast: false,
        tip: '',
        isIOS: false,
        companyName: '',
		  }
    },
    components: {
      XButton, companyFormNew, /*innerFooter*/
    },
		mounted(){
      let params = this.$route.params;
      let whiteKeyNameList = params.whiteKeyNameList;
      let formData = params.data;
      this.companyName = formData.companyName;
      console.log('formData:', formData)
      if (whiteKeyNameList) {
        this.whiteKeyNameList = whiteKeyNameList;
      }
      // 这儿仅传部分需要的值
      if (formData && (formData.regAddress || formData.regDate)) {
        this.formData = {
          regAddress: formData.regAddress,
          regDate: formData.regDate,
          identificationTime: formData.identificationTime,
          isThird: true,
        }
      }
      // .vux-popup-mask
      document.getElementsByClassName('.vux-popup-mask').touchstart = function (e) {e.preventDefault();}
      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      this.isIOS = isIOS;
		},
		methods: {
      submit(formData){
        var data = Object.assign({}, formData);
        // this.reorganize(data);
        delete data.applyYear;
        console.log('form_post_data:', data)
        data.source = this.$route.meta.source || '';
        data.inventionAuthPatentNum = data.inventionAuthPatentNum - 0;
        data.utilityModelPatentNum = data.utilityModelPatentNum - 0;
        data.industrialDesignPatentNum = data.industrialDesignPatentNum - 0;
        data.softCopyrightNum = data.softCopyrightNum - 0;
        let query = this.$route.query;
        data.contactNumber = data.contactNumber || query.phone;
        data.companyName = data.companyName || query.name;
        data.contact = data.contact || query.contacts;
        this.loading = true;
        this.$http.post(commitCompanyApi, data)
        .then((resp) => {
          this.loading = false;
          wx.miniProgram.navigateTo({
            url: `/pages/my/result?companyName=${query.name}&contacts=${data.contact}&phone=${data.contactNumber}`
          });
          /*this.$router.push({
            path: '/assessResult'
          });*/
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
	.stepThree{
    background: #fff;padding-bottom: 80px;min-height: 100%;
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
        >.top_tip{
          font-size:24px;line-height: 33px;margin-top: 10px;color: #999;padding:0 40px 30px;border-bottom: 1px solid #EEEEEE;
          span{color: #F64744;}
        }
  		}
    }
	}
  .fixedPadding1{padding-bottom: 88px;}
  .weui-toast_forbidden{width: auto!important;padding:0 20px;max-width: 600px!important;}
</style>
