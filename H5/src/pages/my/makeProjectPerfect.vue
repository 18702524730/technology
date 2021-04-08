<template>
  <!-- 项目表单 -->
	<div class="makeProjectPerfect">
    <projectHeader :name="projectArr[currentIndex].name" :subsidy="projectArr[currentIndex].subsidy"/>
		<div class="platform">
      <div class="policyBox">
        <div class="item policy" v-if="projectArr[currentIndex].policyUrl" @click="viewPolicy">
          <img src="~assets/img/company/zc.png">
          <span>政策文件</span>
        </div>
        <div class="item condition" @click="view">
          <img src="~assets/img/icon/condi.png">
          <span>达标条件</span>
        </div>
      </div>
      <div class="boxes" id="boxes">
        <companyForm btnName="保存" :showAll="false" :formData="formData" :isRequired="true" :whiteKeyNameList="whiteKeyNameList" @submit="submit"/>
        <!-- <div class="help" @click="showHelpPop=true">获取申报辅导</div> -->
      </div>
		</div>
    <div :class="['get_guide', isIphoneX ? 'phoneX' : '']" @click="showHelpPop = true">获取申<br>报辅导</div>
    <pop :show.sync="showPop" :list="policyStringList"/>
    <helpPop :show.sync="showHelpPop"/>
    <loading :show="loading" text="请稍后"></loading>
    <toast v-model="showToast" type="warn">{{tip}}</toast>
	</div>
</template>
<script>
	import Vue from 'vue'
  import qs from 'qs'
  import Filters from 'src/utils/filters.js';
  import { AlertModule, TransferDom, XButton} from 'vux'
  import projectHeader from './components/projectHeader.vue';
  import companyForm from './components/companyForm.vue';
  import innerFooter from './components/footer.vue';
  import pop from './components/pop.vue';
  import helpPop from './components/helpPop.vue';
  import projectArr from 'src/utils/projectLists.js'


  const indexUrl = CONFIG.indexUrl;
  const getCompanyApi = indexUrl + '/getCompany';
  const commitCompanyApi = indexUrl + '/commitCompany';

	export default {
    directives: {
      TransferDom
    },
		data() {
		  return {
        formData: {},
        showPop: false,
        showHelpPop: false,
        policyStringList: [],
        whiteKeyNameList: ['street', 'productField', 'hasHonorState'], // 需要显示的表单项 keyName
        showAll: false, // 显示所有表单项
        loading: false,
        projectArr,
        currentIndex: 0,
        showToast: false,
        tip: '',
        isIphoneX: 0,
		  }
    },
    components: {
      XButton, projectHeader, companyForm, innerFooter, pop, helpPop
    },
		mounted(){
      let query = this.$route.query;
      this.currentIndex = query.projectType ? query.projectType - 1 : this.currentIndex;
      this.isIphoneX = query.isIphoneX == 1;
      let { projectArr, currentIndex } = this;
      this.whiteKeyNameList = projectArr[currentIndex].whiteKeyNameList;
      this.policyStringList = projectArr[currentIndex].condition.split(';');
      this.loading = true;
      this.$http.get(getCompanyApi, {
        params: {
          name: this.$route.query.companyName
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
      document.getElementsByClassName('.vux-popup-mask').touchstart = function (e) {e.preventDefault();}
		},
		methods: {
      viewPolicy() {
        wx.miniProgram.navigateTo({
          url: this.projectArr[this.currentIndex].policyUrl
        });
      },
      view() {
        this.showPop = true;
      },
      submit(data){
        console.log('form_post_data:', data)
        this.loading = true;
        this.$http.post(commitCompanyApi, data)
        .then((resp) => {
          this.loading = false;
          console.log(resp)
          let companyName = this.$route.query.companyName;
          wx.miniProgram.reLaunch({
            url: `/pages/my/singleResult?projectId=${this.$route.query.projectType}&companyId=${this.formData.id}`
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
	.makeProjectPerfect{
    background: #f8f8f8;padding-bottom: 20px;min-height: 100%;
		.platform{
      padding: 0px 20px 0;
      margin-top: -120px;
      .policyBox{
        display: flex;justify-content: center;align-items: center;height: 120px;background-color: #DEEBFF;border-radius:10px 10px 0px 0px;padding:20px 0;
        .item{
          display: flex;justify-content: center;align-items: center;width: 50%;height: 80px;
          span{color: #0063FC;}
        }
        .policy{
          border-right: 1px solid #B7C3D6;
          img{width: 57px;height: 60px;margin-right: 18px;}
        }
        .condition{
          img{width: 34px;height: 29px;margin-right: 9px;margin-top: 3px;}
        }
      }
      .boxes{
        background: #FFFFFF; border-radius: 10px;padding-bottom: 60px;
        >h2{font-size: 34px;color: #114293;text-align: center;line-height: 128px;background: #deebff;border-radius: 10px 10px 0 0;}
        h4{font-weight: 600;line-height: 48px;font-size: 34px;color: #333333;text-align: center;padding: 60px 0 48px;}
        .help{height:45px;line-height:45px;font-size:32px;color: #2981FF;text-align: center;margin-top: 30px;}
      }
		}
    .get_guide{position: fixed; z-index: 11;right: 20px;bottom: 200px;width: 120px;height: 120px;border-radius: 60px;background:linear-gradient(135deg,rgba(255,210,111,1) 0%,rgba(255,136,18,1) 100%);box-shadow:0px 2px 20px 0px rgba(213,125,8,0.22);font-size: 24px;color: #fff;line-height: 33px;text-align: center;padding-top: 27px;
      &.phoneX{bottom: 268px;}
    }
	}
</style>
