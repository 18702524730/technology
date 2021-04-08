<template>
  <div class="single_result_page" v-if="!loading">
    <div class="result_wrap">
      <h3>{{project.name}}</h3>
      <h2 v-if="project.id == 9"><span>申请杭州市专利示范企业前提条件</span></h2>
      <h2 v-if="project.id == 10"><span>申请浙江省专利示范企业前提条件</span></h2>
      <h2 v-if="project.id !=9 && project.id != 10"><span class="money">{{project.subsidyNum}}万元</span><span>补助</span></h2>
      <img v-if="result.result === 0" src="~assets/img/my/result_01.png" alt="">
      <img v-if="result.result === 2" src="~assets/img/my/result_02.png" alt="">
      <img v-if="result.result === 1" src="~assets/img/my/result_03.png" alt="">
      <p class="des" v-html="result.resultDes"></p>
    </div>
    <div class="project_info_wrap" v-if="result.result === 2">
      <h2>需要努力的项目</h2>
      <!-- <p>2017年度支出额低于200万</p> -->
      <div class="info_wrap" v-for="(it, ind) in result.tips" :key="ind">
        <div class="des" v-html="it.text"></div>
        <div class="content" v-if="it.show" @click="showHelpPop = true">寻求帮助</div>
      </div>
    </div>
    <div class="other_info_wrap" v-if="result.result === 1 && result.tips.length > 0">
      <h2>需补充信息</h2>
      <p v-for="(it, ind) in result.tips" :key="ind">{{it}}</p>
      <!-- <p>2016年度支出额</p>
      <p>2016年度支出额</p>
      <p>2016年度支出额</p> -->
    </div>
    <button type="button" v-if="result.result == 2 || result.result == 1" class="submit_btn" @click="completeSome">重新评估该项目</button>
    <button type="button" v-else class="submit_btn" @click="showHelpPop = true">立即获取辅导</button>
    <div :class="['footer_wrap', isIphoneX ? 'phoneX_footer_wrap' : '']">
      <div class="footer_left" @click="evaluate">再次评估企业</div>
      <div class="footer_left" @click="backMy">返回我的</div>
    </div>
    <!-- 获取帮助弹窗 -->
    <helpPop :show.sync="showHelpPop"/>
  </div>
</template>

<script>
import mixins from 'mixins/';
import projectLists from 'utils/projectLists.js';
import helpPop from './components/helpPop.vue';
export default {
  mixins: [mixins],
  data () {
    return {
      isIphoneX: false,
      showHelpPop: false,
      result: {result: 1, tips: [], resultDes: ''},
      project: {},
      loading: false
    }
  },
  components: {
    helpPop
  },
  async onLoad () {
    this.isIphoneX = this.judgeIsPhoneX();
    let query = this.$route.query;
    projectLists.forEach(item => {
      if (item.id == query.projectId) {
        this.project = item;
      }
    })
    try {
      this.loading = true;
      let data = await this.API.my.evaluateDetail({projectId: query.projectId, companyId: query.companyId});

      this.loading = false;
      if (data.result === 0) {
        data.resultDes = '恭喜您，符合申报要求！'
      } else if (data.result === 1) {
        data.resultDes = `<b style="color: #2F80F6;">${data.check_count}项已满足，</b>继续完善获取申报建议！`
      } else if (data.result === 2) {
        data.tips = data.tips.map(item => {
          let obj = {show: false, text: item};
          if (item.indexOf('专利') != -1 || item.indexOf('软著') != -1) {
            obj.show = true;
          }
          return obj;
        })
        data.resultDes = '再努力一点，就能申报了！'
      }
      this.result = data;
    } catch(err){
      this.loading = false;
    }

  },
  methods: {
    backMy () {
      wx.switchTab({
        url: '/pages/my/my'
      })
    },
    // 在此评估企业
    evaluate () {
      this.$router.push({ // name=杭州鼎立铜业有限公司&contacts=商鞅&key=technology_member_fromwx_139-bbd94fd968c2448895e5bc67da821dd259a4b824a2c84208aa609c00017f77c2
        path: '/pages/my/makeAllPerfect',
      })
    },
    completeSome(id) {
      this.$router.push({
        path: '/pages/my/makeProjectPerfect',
        query: {
          projectType: this.$route.query.projectId
        }
      })
    },
  }
}
</script>

<style lang="scss">
page{background: #f8f8f8;}
.single_result_page{
  margin: 20px 20px 0;text-align: center;padding-bottom: 98px;
  .result_wrap{background: #fff;padding: 40px;font-size: 0;
    h3{font-size: 30px;line-height: 42px;font-weight: 600;}
    h2{font-weight: 600;margin: 10px 0 30px;
      span{font-size: 28px;color: #999;}
      .money{font-size: 36px;color: #E81A14;}
    }
    img{width: 230px;height: 240px;padding-bottom: 10px;}
    .des{font-size: 32px;line-height: 45px;font-weight: 600;
      b{color: #2F80F6;}
    }
  }
  .project_info_wrap, .other_info_wrap{background: #fff;padding: 30px;margin-top: 20px;text-align: left;
    h2{font-size: 30px;line-height: 42px;font-weight: 600;}
    p{font-size: 26px;line-height: 37px;margin-top: 20px;}
    .info_wrap{display: flex;font-size: 26px;line-height: 37px;margin-top: 20px;
      .des{flex: 1;max-width: 540px;}
      .content{color: #2f80f6;}
    }
  }
  .other_info_wrap{}
  .submit_btn{line-height: 90px;width: 100%;border-radius: 6px;background: #2f80f6;font-size: 30px;color: #fff;border: none;padding: 0;margin: 30px 0 0;}
  .footer_wrap{display: flex;position: fixed;bottom: 0;left: 0;width: 100%;background: #fff;
    >div{font-size: 28px;text-align: center;line-height: 98px;flex: 1;}
    .footer_left{border-left: 1px solid #eee;}
  }
  .phoneX_footer_wrap{padding-bottom: 68px;}
}
 
</style>
