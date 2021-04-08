<template>
  <div class="result_page" v-if="!loading" :class="['result_page', isIphoneX ? 'phoneX_result_page' : '']">
    <!-- 头部 -->
    <div :class="['result_header', detail.cultivation_result == 3 ? 'result_header2' : '']">
      <div class="r1"></div>
      <div class="r2"></div>
      <div class="r3"></div>
      <div class="r4"></div>
      <div class="r5"></div>
      <div class="header_content">
        <h2>{{detail.resultDes}}</h2>
        <img v-for="item in detail.num" :key="item" src="~assets/img/my/start.png" alt="">
        <p>{{detail.company_name}}</p>
      </div>
    </div>
    <div class="result_content">
      <!-- 当前结果 -->
      <div class="current_result_wrap" v-if="!sharePage&&detail.cultivation_result != 3">
        <p>可获得：</p>
        <h2 v-if="gHighTech">所得税按<i>15%</i>征收</h2>
        <h2>补助<i>{{detail.bu_tie}}万</i>元资金补助</h2>
        <div class="data_btn" @click="evaluate">完善数据获得更多评估结果</div>
      </div>
      <div class="content_wrap">
        <div class="content_module" v-for="(mod, i) in projectLists" :key="i">
          <h2>{{mod.name}} </h2>
          <div class="item_wrap">
            <div class="company_item" v-for="(item, index) in mod.list" :key="index">
              <div class="item_left">
                <h3>{{item.name}}</h3>
                <p v-if="item.id !=9 && item.id !=10">可获得<i>{{item.subsidyNum}}万元</i>补助</p>
                <p v-if="item.id == 9">申请杭州市专利示范企业前提条件</p>
                <p v-if="item.id == 10">申请浙江省专利示范企业前提条件</p>
              </div>
              <button type="button" v-if="item.result === 0" class="item_btn" @click="apply">建议申请</button>
              <button type="button" v-if="item.result === 3" class="item_btn has_ident" @click="ident">已认定</button>
              <button type="button" v-if="item.result === 1" @click="completeSome(item.id)" class="item_btn fill_data">需完善数据</button>
              <button type="button" v-if="item.result === 2" @click="inconformity(item.id)" class="item_btn inconformity">暂不符合</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 脚部 -->
      <div class="footer_inner">
        <p class="tip">专家会在48小时内联系到您，请您保持电话畅通。</p>
        <p class="tip mt10">专家热线</p>
        <div class="row-center mt10">
          <a class="phone" @click.stop="makePhoneCall('0571-28253793')">0571-28253793</a>
          <span>或</span>
          <a class="phone" @click.stop="makePhoneCall('0571-28253778')">0571-28253778</a>
        </div>
        <h5>其他扶持政策<br>请关注链科服务号</h5>
        <img src="../../assets/img/company/erCode.png" alt="">
      </div>
    </div>
    <div :class="['get_guide', isIphoneX ? 'phoneX' : '']" @click="showHelpPop = true">获取申<br>报辅导</div>
    <div :class="['footer_wrap', isIphoneX ? 'footerPhoneXWrap' : '']">
      <div class="back" @click="back">{{sharePage ? '返回首页' : '返回'}}</div>
      <button open-type='share' v-if="!sharePage" class="share">分享</button>
      <!-- <div class="share">分享</div> -->
      <div class="enter" @click="enter">{{sharePage ? '添加企业' : '入库'}}</div>
    </div>
    <!-- 获取帮助弹窗 -->
    <helpPop :show.sync="showHelpPop"/>
    <!-- 分享提示弹框 -->
    <sharePagePop :show.sync="sharePagePop" />
    <transition-up :show="showEnterPop" @hide="hideFn">
      <enterPop :companyName="$route.query.companyName" @hide="hideFn" @showTip="showTip" />
    </transition-up>
    <u-message/>
  </div>
</template>

<script>
import mixins from 'mixins/';
import projectLists from 'utils/projectLists.js';
import helpPop from './components/helpPop.vue';
import sharePagePop from './components/sharePagePop.vue';
import enterPop from './components/enterPop.vue';
export default {
  mixins: [mixins],
  data () {
    return {
      isIphoneX: false,
      showHelpPop: false,
      projectLists: [
        {name: '初创期项目（近一年期）', list: projectLists.slice(0, 3)},
        {name: '增长期项目（未来2-3年）', list: projectLists.slice(3, 6)},
        {name: '成熟期项目（较为长期规划）', list: projectLists.slice(6)}
      ],
      sharePage: false, // 通过卡片分享进入的页面
      sharePagePop: false,
      companyId: '',
      detail: {},
      loading: false,
      gHighTech: false, // 是否是国高企业
      showEnterPop: false,
    }
  },
  components: {
    helpPop, sharePagePop, enterPop
  },
  onShow () {

  },
  onLoad () {
    this.init();
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: `【评估结果】${this.detail.company_name}`,
      path: `/pages/my/result?companyId=${this.companyId}`
    }
  },
  methods: {
    makePhoneCall(phoneStr) {
      wx.makePhoneCall({
        phoneNumber: phoneStr
      })
    },
    // 弹框隐藏
    hideFn(){
      this.showEnterPop = false;
    },
    showTip(str) {
      this.tips(str);
    },
    async init () {
      let pageDetail = wx.getLaunchOptionsSync();
      // 判断是否是分享页面
      if (this.$route.query.companyId && !this.$route.query.companyName) {
        this.sharePage = true;
      }
      // 场景值
      // if (pageDetail.scene == '1007' || pageDetail.scene == '1008') {
      //   this.sharePage = true;
      // }
      this.isIphoneX = this.judgeIsPhoneX();
      try {
        let data;
        this.loading = true;
        if (this.$route.query.companyId) {
          this.companyId = this.$route.query.companyId;
          data = await this.API.my.statistics(this.companyId);
        } else {
          data = await this.API.my.getResult(this.$route.query.companyName);
          this.companyId = data.id;
        }
        this.loading = false;
        this.$storage.set('curCompanyName', data.company_name);
        if (data.cultivation_result == 1) {
          data.resultDes = '重点培育';
          data.num = 5;
          wx.setNavigationBarColor({
              frontColor: '#ffffff',
              backgroundColor: '#FF8A18'
          })
        } else if (data.cultivation_result == 2) {
          data.resultDes = '培育';
          data.num = 3;
          wx.setNavigationBarColor({
              frontColor: '#ffffff',
              backgroundColor: '#FF8A18'
          })
        } else if (data.cultivation_result == 3) {
          wx.setNavigationBarColor({
              frontColor: '#ffffff',
              backgroundColor: '#2F80F6'
          })
          data.resultDes = '再接再厉';
          data.num = 1;
        }
        data.project_results.forEach((element, index) => {
          if (element.project_id == 11 && element.result === 0) {
            this.gHighTech = true
          }
          projectLists[element.project_id-1].result = element.result;
        });
        this.projectLists = [
          {name: '初创期项目（近一年期）', list: projectLists.slice(0, 3)},
          {name: '增长期项目（未来2-3年）', list: projectLists.slice(3, 6)},
          {name: '成熟期项目（较为长期规划）', list: projectLists.slice(6)}
        ],
        console.log('projectLists', projectLists)
        this.detail = data;
      } catch (err) {
        this.loading = false;
      }

    },
    // 不符合
    inconformity (projectId) {
      if (this.sharePage) {
        this.sharePagePop = true;
        return;
      }
      this.$router.push({path: '/pages/my/singleResult', query: {companyId: this.companyId, projectId}})
    },
    // 已认定按钮
    ident () {
      this.sharePage ? this.sharePagePop = true : '';
    },
    // 建议申请
    apply () {
      if (this.sharePage) {
        this.sharePagePop = true;
      } else {
        this.showHelpPop = true
      }
    },
    // 完善企业数据
    evaluate () {
      this.$router.push({ // name=杭州鼎立铜业有限公司&contacts=商鞅&
        path: '/pages/my/makeAllPerfect',
      })
    },
    // 完善project数据
    completeSome(id) {
      if (this.sharePage) {
        this.sharePagePop = true;
        return;
      }
      this.$router.push({
        path: '/pages/my/makeProjectPerfect',
        query: {
          projectType: id
        }
      })
    },
    // 完善数据數據獲取更多評估結果
    fillData () {
      let companyName = this.$route.query.companyName;
      this.$router.push(`/pages/my/makeAllPerfectPreview?companyName=${companyName}`);
    },
    // 入库、添加企业
    enter () {
      this.sharePage ? this.$router.push(`/pages/index/highTech`) : this.showEnterPop = true;

    },
    // 返回
    back() {
      let url = this.sharePage ? '/pages/index/index' : '/pages/my/my'
      wx.switchTab({
        url
      })
    },
  }
}
</script>

<style lang="scss">
.result_page{padding-bottom: 158px;
  &.phoneX_result_page{padding-bottom: 226px;}
  .result_header{height: 420px;background:rgba(255,138,24,1);position: relative;overflow: hidden;
    .r1, .r2, .r3, .r4, .r5, .r6{position: absolute;left: 50%;transform: translateX(-50%);}
    .r1{width: 236px;height: 236px;border-radius: 50%;background: rgba(255, 242, 206, 0.09);top: 208px;}
    .r2{width: 344px;height: 344px;border-radius: 50%;background: rgba(255, 242, 206, 0.09);top: 154px;}
    .r3{width: 434px;height: 434px;border-radius: 50%;background: rgba(255, 242, 206, 0.09);top: 109px;}
    .r4{width: 548px;height: 548px;border-radius: 50%;background: rgba(255, 242, 206, 0.09);top: 52px;}
    .r5{width: 652px;height: 652px;border-radius: 50%;background: rgba(255, 242, 206, 0.09);top: 0;}
    .header_content{height: 300px;background:linear-gradient(360deg,rgba(255,138,24,0) 0%,rgba(255,138,24,1) 100%);position: relative;z-index: 10;
      padding-top: 50px;text-align: center;font-size: 0;
      h2{font-size: 40px;line-height: 56px;font-weight: 600;color: #fff;padding-bottom: 15px;}
      >img{height: 40px;width: 40px;margin: 0 10px;}
      p{line-height: 40px;font-size: 28px;color: #fff;margin-top: 20px;}
    }
  }
  .result_header2{background:linear-gradient(360deg,rgba(114,172,255,1) 0%,rgba(47,128,246,1) 100%);
    .header_content{background:linear-gradient(360deg,rgba(24,136,255,0) 0%,rgba(47,128,246,1) 100%);}
  }
  .result_content{margin: -170px 20px 0;position: relative;z-index: 10;
    .current_result_wrap{background: #fff;border-radius: 6px;text-align: center;padding: 30px 40px 40px;
      >p{font-size: 28px;color:#999;padding-bottom: 10px;line-height: 40px;}
      h2{color: #333;font-size: 28px;line-height: 58px;
        i{font-size: 34px;color: #ff9433;}
      }
      .data_btn{line-height: 78px;border: 1px solid #ff8a18;border-radius: 45px;font-size: 28px;color: #ff8a18;margin-top: 23px;}
    }
    .content_wrap{padding: 30px 20px 0 40px;border-radius: 6px;background: #fff;margin-top: 20px;
      .content_module{
        h2{font-size: 28px;font-weight: 600;line-height: 40px;position: relative;
          &:before{position: absolute;left: -14px;height: 100%;top: 0;content: '';width: 1px;border-left: 1px dotted #ddd;}
          &:after{position: absolute;width: 10px;height: 10px;background: #2f80f6;border-radius: 5px;left: -18px;top:15px;content: '';z-index: 16px;}
        }
        .item_wrap{padding: 20px 0 30px;position: relative;
          .company_item{border-radius: 6px;background: #f8f8f8;padding: 30px;display: flex;margin-top: 20px;
            &:nth-child(1){margin-top: 0;}
            .item_left{flex: 1;
              h3{font-size: 26px;line-height: 37px;color: #333;margin-bottom: 10px;}
              p{font-size: 26px;line-height: 37px;color: #999;
                i{color: #e81a14;}
              }
            }
            button{width: 156px;padding: 0;text-align: center;border-radius: 30px;background: #2f80f6;line-height: 60px;font-size: 24px;
            border: none;color: #fff;height: 60px;align-self: center;}
            .has_ident{color: #999;background: #eee;}
            .fill_data{border: 1px solid #2F80F6;color: #2F80F6;background: none;line-height: 58px;}
            .inconformity{border: 1px solid #E81A14;color: #E81A14;background: none;line-height: 58px;}
          }
          // &:last-child{padding-bottom: 0;}
          &:after{position: absolute;height: 100%;width: 1px;border-left: 1px dotted #ddd;top: 0;left: -14px;z-index: 15px;content: '';}
        }
        &:last-child{
          .item_wrap{padding-bottom: 0 !important;}
        }
        &:first-child{
          h2{
            &:before{height: 50%;top: 50%;}
          }
        }
      }
    }
  }
  // 底部按钮
  .footer_wrap{display: flex;text-align: center;background: #fff;position: fixed;left: 0;bottom: 0;width: 100%;z-index: 11;
    >div, .share{flex: 1;line-height: 98px;font-size: 28px;color: #333;border-right: 1px solid #eee;
      &:last-child{border-right: none;}
    }
    .share{flex: 1;border: none;padding: 0;border-right: 1px solid #eee;border-radius: 0;}
  }
  .footerPhoneXWrap{padding-bottom: 68px;}
  .get_guide{position: fixed; z-index: 11;right: 20px;bottom: 158px;width: 120px;height: 120px;border-radius: 60px;background:linear-gradient(135deg,rgba(255,210,111,1) 0%,rgba(255,136,18,1) 100%);box-shadow:0px 2px 20px 0px rgba(213,125,8,0.22);font-size: 24px;color: #fff;
  line-height: 33px;text-align: center;padding-top: 27px;
    &.phoneX{bottom: 226px;}
  }
}
.footer_inner{
  text-align: center;padding: 60px 40px 80px;font-size: 28px;color: #999;background: #fff;
  .tip{font-size: 26px;color: #999;line-height: 37px;}
  .phone{font-size: 26px;color: #2A79FF;line-height: 37px;}
  h5{font-size: 30px;color: #333;text-align: center;line-height: 45px;font-weight: normal;padding:28px 0 20px;}
  >img{width: 266px;height: 266px;margin: 0 auto 0;font-size: 0;display: block;}
  .tec{font-size: 24px;color: #999;line-height: 33px;}
}
</style>
