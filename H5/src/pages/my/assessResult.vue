<template>
  <!-- 我的 -->
	<div class="assessResult">
    <div class="header">
      <img class="good" src="~assets/img/company/good.png" alt="">
      <p class="subtip">加入企业项目申报培育库</p>
      <h3 v-if="resultData.result==1">恭喜，被列为<span>重点培育</span>对象</h3>
      <h3 v-else>恭喜，被列为<span>培育</span>对象</h3>
    </div>
		<result class="result" :resultData="resultData" :showFooter="true"/>
    <loading :show="loading" text="请稍后"></loading>
	</div>
</template>
<script>
	import Vue from 'vue'
  import qs from 'qs'
  import Filters from 'src/utils/filters.js';
  import { AlertModule, TransferDom, XButton} from 'vux'
  import result from './components/result.vue';
  import innerFooter from './components/footer.vue';

  const indexUrl = CONFIG.indexUrl;
  const getResultApi = indexUrl + '/getResult';

	export default {
    directives: {
      TransferDom
    },
		data() {
		  return {
        loading: false,
        resultData: {},
		  }
    },
    components: {
      XButton, result, innerFooter
    },
		mounted(){
      let params = this.$route.params;
      this.getResult();
      document.getElementsByClassName('.vux-popup-mask').touchstart = function (e) {e.preventDefault();}
		},
		methods: {
      getResult(){
        this.$http.get(getResultApi)
        .then((resp) => {
          this.resultData = resp.data;
        })
        .catch((err) => {
          this.showToast = true;
          this.tip = '系统繁忙，请稍后再试';
        });
      },
    },
	}
</script>
<style lang="scss">
  @import  "~assets/css/cssshake.css";
	.assessResult{
    background: #1D7EFF;padding-bottom: 40px;
    .header{
      height: 400px;background:url('~assets/img/company/assess_top.png') no-repeat;background-size: 100% auto;text-align: center;padding-top: 48px;
      .good{width: 172px; height: 172px; display: block;margin: 0 auto;}
      >h3{
        font-size: 46px;color: #fff;height:65px; line-height: 65px;font-weight: 700;color:#fff; margin-top: 9px;
        span{color: #F9DA58}
      }
      .subtip{font-size: 28px;line-height: 28px;color: #fff;height:40px;line-height: 40px;margin-top: 16px;}
    }
    .result{margin-top: -20px;}
	}
</style>
