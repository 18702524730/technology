<template>
  <!-- 企业已有数据编辑 -->
	<div class="edit" :class="{'fixedPadding': !isIOS}">
		<div class="platform">
      <div class="boxes" id="boxes" v-if="whiteKeyNameList && whiteKeyNameList.length">
        <companyFormNew btnName="保存修改" :showAll="false" :isRequired="true" :fixedBtn="!isIOS" :formData="formData" :whiteKeyNameList="whiteKeyNameList" @submit="submit"/>
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

  const indexUrl = CONFIG.indexUrl;
  const commitCompanyApi = indexUrl + '/commitCompany';
  const setPageViewUrl = indexUrl + '/setPageView';

	export default {
    directives: {
      TransferDom
    },
		data() {
		  return {
        formData: {},
        whiteKeyNameList: [], // 需要显示的表单项 keyName
        showAll: false, // 显示所有表单项
        loading: false,
        showToast: false,
        tip: '',
        isIOS: false,
		  }
    },
    components: {
      XButton, companyFormNew,
    },
		mounted(){
      let params = this.$route.params;
      let formData = params.data;
      console.log(this.$route)
      // 有表单数据传过来就是编辑页面
      if (formData) {
        this.whiteKeyNameList = params.editKeyList;
        this.formData = {
          ...formData,
          isEdit: true,
        };
      }
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
        data.inventionAuthPatentNum = parseInt(data.inventionAuthPatentNum)
        data.utilityModelPatentNum = parseInt(data.utilityModelPatentNum)
        data.industrialDesignPatentNum = parseInt(data.industrialDesignPatentNum)
        data.softCopyrightNum = parseInt(data.softCopyrightNum)
        data.sendCode = 1; //表示不发短信
        this.loading = true;
        this.$http.post(commitCompanyApi, data)
        .then((resp) => {
          this.loading = false;
          this.$router.go(-1);
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
	.edit{
    background: #fff;min-height: 100%;
		.platform{
      .boxes_til{
        background-color: #fff;padding: 40px 40px 0;font-size:30px;font-weight:600;
      }
      .boxes{
        background: #FFFFFF;border-radius: 10px;padding-bottom: 20px;
        >h2{font-size: 34px;color: #114293;text-align: center;line-height: 128px;background: #deebff;border-radius: 10px 10px 0 0;}
        h4{font-weight: 600;line-height: 48px;font-size: 34px;color: #333333;text-align: center;padding: 60px 0 48px;}
        .company_form .form_box .footer_btn{padding-top: 40px; padding-bottom: 40px;}
      }
		}
	}
  .fixedPadding{
    padding-bottom: 140px;
    .platform{
      .boxes{
        .company_form .form_box .footer_btn{padding: 0;}
      }
    }
  }
  .weui-toast_forbidden{width: auto!important;padding:0 20px;max-width: 600px!important;}
</style>
