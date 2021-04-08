<template>
  <!-- 完善企业信息-预览-->
	<div class="makeAllPerfectPreview">
		<div class="platform">
      <p class="boxes_til " ><span class="text">基本信息</span></p>
      <div class="boxes" >
        <div class="item item_lef" >
          <label>国家高新技术企业认定计划</label>
          <span>{{ companyData.apply2019Status | apply2019Status }}</span>
        </div>
        <div class="item item_rig" style="padding-top:0;" >
          <label>技术领域：</label>
          <span>{{ companyData.productField || '--' }}</span>
        </div>
        <div class="item" >
          <label>经营地址：</label>
          <span>{{companyData.businessAddress || '--'}}</span>
        </div>
        <div class="item" >
          <label>街道：</label>
          <span>{{companyData.street|street}}</span>
        </div>
        <div class="item item_lef" >
          <label>法人代表：</label>
          <span>{{companyData.frname || '--'}}</span>
        </div>
        <div class="item item_rig" >
          <label>法人代表手机号：</label>
          <span>{{companyData.frphone || '--'}}</span>
        </div>
        <div class="item item_lef" >
          <label>联系人：</label>
          <span>{{companyData.contact || '--'}}</span>
        </div>
        <div class="item item_rig" >
          <label>联系人手机号：</label>
          <span>{{companyData.contactNumber || '--'}}</span>
        </div>
        <div class="item" >
          <label>企业负责人(法人／分管副总):：</label>
          <span>{{companyData.chargeName || '--'}}</span>
        </div>
        <div class="item item_lef" >
          <label>企业负责人手机号：</label>
          <span>{{companyData.chargeNumber || '--'}}</span>
        </div>
        <div class="item item_rig" >
          <label>企业负责人微信号：</label>
          <span>{{companyData.chargeWx || '--'}}</span>
        </div>
        <div class="item item_lef" >
          <label>财务人员:</label>
          <span>{{companyData.financeName || '--'}}</span>
        </div>
        <div class="item item_rig" >
          <label>财务人员手机号：</label>
          <span>{{companyData.financePhone || '--'}}</span>
        </div>
      </div>
      <p class="boxes_til mt20" ><span class="text">需求</span></p>
      <div class="boxes" >
        <div class="item">
          <label>是否有知识产权质押融资的需求:</label>
          <span>{{ companyData.wantPledge | wantPledgeFil }}</span>
        </div>
        <div class="item">
          <label>是否有技术对接需求(规划、购买、转化等):</label>
          <span>{{ companyData.wantTechButt | wantTechButtFil }}</span>
        </div>
        <div class="item" >
          <label>希望申请的资质荣誉:</label>
          <span>{{companyData.wantQualification || '--'}}</span>
        </div>
      </div>
      <p class="boxes_til mt20" ><span class="text">已获得的资质荣誉</span></p>
      <div class="boxes" >
        <div class="item">
          <span>{{ companyData.qualification || '--' }}</span>
        </div>
      </div>
      <p class="boxes_til mt20" ><span class="text">企业近三年销售收入概述 (万元)</span></p>
      <div class="boxes" >
        <div class="item line">
          <span class="line">2016年：{{ companyData.sale2016 || '--' }}</span>
          <span class="line">2017年：{{ companyData.sale2017 || '--' }}</span>
          <span class="line">2018年：{{ companyData.sale2018 || '--' }}</span>
        </div>
      </div>
      <p class="boxes_til mt20" v-if="companyData.companyName"><span class="text">企业近三年研发费用概述 (万元)</span></p>
      <div class="boxes" v-if="companyData.companyName">
        <div class="item line">
          <span class="line">2016年：{{ companyData.research2016Cost || '--' }}</span>
          <span class="line">2017年：{{ companyData.research2017Cost || '--' }}</span>
          <span class="line">2018年：{{ companyData.research2018Cost || '--' }}</span>
        </div>
      </div>
      <p class="boxes_til mt20" ><span class="text">知识产权</span></p>
      <div class="boxes" >
        <div class="item">
          <span class="line">发明授权专利：{{ companyData.inventionAuthPatentNum | isNumFil }}</span>
          <span class="line">实用新型专利：{{ companyData.utilityModelPatentNum | isNumFil }}</span>
          <span class="line">外观设计专利：{{ companyData.industrialDesignPatentNum | isNumFil }}</span>
          <span class="line">软件著作权：{{ companyData.softCopyrightNum | isNumFil }}</span>
          <span class="line">作品著作权：{{ companyData.workCopyrightNum | isNumFil }}</span>
          <span class="line">集成电路布图设计专有权：{{ companyData.icDesignNum | isNumFil }}</span>
          <span class="line">有效商标数量：{{ companyData.effectiveTmNum | isNumFil }}</span>
          <span class="line">知识产权贯标：{{ companyData.intellectualPropertyIso | intellectualPropertyIsoFil }}</span>
        </div>
      </div>
      <p class="boxes_til mt20" ><span class="text">企业人员情况</span></p>
      <div class="boxes" >
        <div class="item">
          <span class="line">企业人员总数：{{ companyData.companyRoundNum || '--' }}</span>
          <span class="line">研发人员总数：{{ companyData.researchRoundNum || '--' }}</span>
          <span class="line">本科及以上学历概数：{{ companyData.collegeAboveRoundNum || '--' }}</span>
          <span class="line">博士或高工人数：{{ companyData.doctorSeniorNum || '--' }}</span>
          <span class="line">中级职称人数：{{ companyData.middleTitleNum || '--' }}</span>
        </div>
      </div>
      <p class="boxes_til mt20" ><span class="text">科技成果转化数量</span></p>
      <div class="boxes" >
        <div class="item item_three" >
          <label >2016年</label>
          <span>{{ companyData.techTransformNum2016 || '--' }}</span>
        </div>
        <div class="item item_three" >
          <label >2017年</label>
          <span>{{ companyData.techTransformNum2017 || '--' }}</span>
        </div>
        <div class="item item_three" >
          <label >2018年</label>
          <span>{{ companyData.techTransformNum2018 || '--' }}</span>
        </div>
      </div>
      <p class="boxes_til mt20" ><span class="text">是否设有研发机构或平台</span></p>
      <div class="boxes" >
        <div class="item">
          <label>机构平台等级</label>
          <span>{{ companyData.researchOrgLevel | researchOrgLevelFil }}</span>
        </div>
      </div>
      <p class="boxes_til mt20" ><span class="text">与高校院所合作情况</span></p>
      <div class="boxes" >
        <div class="item">
          <label>合作情况</label>
          <span>{{ companyData.cooperationUniversities }}</span>
        </div>
      </div>
      <p class="boxes_til mt20" ><span class="text">软硬件设施</span></p>
      <div class="boxes" >
        <div class="item" >
          <label>科研用房面积(平方米)</label>
          <span>{{ companyData.researchArea || '--' }}</span>
        </div>
        <div class="item" >
          <label>企业技术开发仪器设备原值(万元)</label>
          <span>{{ companyData.equipment || '--' }}</span>
        </div>
        <div class="item " >
          <label>已通过的体系认证</label>
          <span>{{ companyData.passedSystem || '--' }}</span>
        </div>
        <div class="item " >
          <label>是否引入卓越绩效管理模式</label>
          <span>{{ companyData.isExcellenceManage | isExcellenceManageFil }}</span>
        </div>
        <div class="item " >
          <label>标准参与制定情况</label>
          <span>{{ companyData.standardSituation || '--' }}</span>
        </div>
      </div>
      <p class="boxes_til mt20" ><span class="text">加分项</span></p>
      <div class="boxes" >
        <div class="item" >
          <label>近三年企业信息化建设投入(万元)</label>
          <span>{{ companyData.infoInvestment || '--' }}</span>
        </div>
        <div class="item" >
          <label>中心从事研发工作的外部专家数</label>
          <span>{{ companyData.outerExpertNum || '--' }}</span>
        </div>
        <div class="item" >
          <label>近三年无重大环境污染事故、消防安全生产事故、偷税漏税和知识产权违法行为</label>
          <span>{{companyData.isAccident === 0 ? '是': companyData.isAccident === 1 ? '否' : '--' }}</span>
        </div>
        <div class="item ">
          <label>通过省、国家(国际组织)认证的实验室和检测机构情况</label>
          <span>{{ companyData.certifiedLab || '--' }}</span>
        </div>
        <div class="item " >
          <label>近三年获得市级及以上自然科学、技术发明、科技进步奖项目情况</label>
          <span>{{ companyData.awards || '--' }}</span>
        </div>
      </div>
      <p class="boxes_til mt20" ><span class="text">工商登记信息</span></p>
      <div class="boxes" >
        <div class="item">
          <p class="line"><span class="key">法定代表人：</span>{{ companyData.frname }}</p>
          <p class="line"><span class="key">成立日期：</span>{{ companyData.regDate }}</p>
          <p class="line"><span class="key">登记状态：</span>{{ companyData.regStatus }}</p>
          <p class="line"><span class="key">注册资本：</span>{{ companyData.regCapital }}</p>
          <p class="line"><span class="key">实缴资本：</span>{{ companyData.regCapital }}</p>
          <p class="line"><span class="key">企业类型：</span>{{ companyData.companyOrgType }}</p>
          <p class="line"><span class="key">参保人数：</span>{{ companyData.socialStaffNum }}</p>
        </div>
      </div>
      <div class="boxes mt20" >
        <div class="item mt20">
          <label>统一社会信用代码:</label>
          <span>{{ companyData.creditCode }}</span>
        </div>
        <div class="item item_half mt10">
          <label>工商注册号:</label>
          <span>{{ companyData.regNumber }}</span>
        </div>
        <div class="item item_half mt10">
          <label>组织机构代码:</label>
          <span>{{ companyData.orgNumber }}</span>
        </div>
      </div>
      <div class="boxes mt20" >
        <div class="item mt20">
          <p class="line"><span class="key">英文名:</span>{{ companyData.property3 || '--' }}</p>
          <p class="line"><span class="key">曾用名:</span>{{ companyData.historyNames || '--' }}</p>
          <p class="line"><span class="key">所属行业：</span>{{ companyData.industry }}</p>
        </div>
      </div>
      <div class="boxes mt20" >
        <div class="item mt20">
          <p class="line"><span class="key">经营范围:</span></p>
          <p class="line">{{ companyData.businessScope }}</p>
          <!-- <p class="line"><span class="key">经营方式:</span></p>
          <p class="line">--</p> -->
          <p class="line" ><span class="key">公司地址：</span></p>
          <p class="line" >
            <img src="~assets/img/icon/location.png" class="location" alt="">
            {{ companyData.regAddress }}
          </p>
        </div>
      </div>
      <div class="boxes mt20" >
        <div class="item mt20">
          <p class="line" ><span class="key">营业期限:</span>{{ companyData.fromTime | dateFormat }}至{{ companyData.toTime | dateFormat }}</p>
          <p class="line" ><span class="key">核准日期:</span>{{ companyData.approvedTime | dateFormat }}</p>
          <p class="line" ><span class="key">登记机关:</span>{{ companyData.regInstitute || '--' }}</p>
        </div>
      </div>

		</div>
    <div class="footer_btn" v-if="!inlib">
      <div class="edit_btn" @click.prevent="submitFn">提交入库</div>
      <div class="button" @click.prevent="next">立即完善</div>
    </div>
    <div class="footer_btn" v-if="inlib">
      <div class="button button_line" @click.prevent="next">修改</div>
    </div>
    <toast v-model="showToast" type="warn">{{tip}}</toast>
    <loading :show="loading" text="请稍后"></loading>
	</div>
</template>
<script>
	import Vue from 'vue'
  import qs from 'qs'
  import Filters from 'src/utils/filters.js';
  import { AlertModule, TransferDom, XButton} from 'vux'

  const indexUrl = CONFIG.indexUrl;
  const getCompanyInfoApi = indexUrl + '/getCompany';
  //表单字段
  const availableLableKeys = [
    'contact',, //联系人
    'contactNumber', //联系电话
    'companyName', //企业名称
    'regDate', //注册日期
    'regCapital', //注册资金
    'street', //街道
    // 'companySize', //企业规模
    'regAddress', //企业注册所在地
    'industry', //所在行业

    'productField', //产品领域
    'qualification', //资质
    'wantQualification', //希望获得资质
    'wantPledge', //是否有知识产权质押需求

    'wantTechButt', //是否有技术对接需求
    'chargeName', //负责人姓名
    'chargeNumber', //负责人联系方式
    'chargeWx', //负责人微信号

    'apply2019Status', //国家高新技术企业申请状态

    'research2016Cost', //企业近三年研发费用(万元)
    'research2017Cost', //企业近三年研发费用(万元)
    'research2018Cost', //企业近三年研发费用(万元)
    'sale2016', //企业近三年销售收入(万元)
    'sale2017', //企业近三年销售收入(万元)
    'sale2018', //企业近三年销售收入(万元)

    'inventionAuthPatentNum', //发明授权专利数量
    'utilityModelPatentNum', //实用新型专利
    'industrialDesignPatentNum', //外观设计专利
    'softCopyrightNum', //软件著作权数量
    'workCopyrightNum', //作品著作权
    'icDesignNum', //集成电路布图设计专有权数量
    'intellectualPropertyIso', //知识产权贯标状态
    'effectiveTmNum', //有效商标数量

    'companyRoundNum', //企业人员概数
    'middleRoundNum', //本科及中级以上概数
    'researchRoundNum', //研发人员概数
  ]

	export default {
    directives: {
      TransferDom
    },
		data() {
		  return {
        isAllin: false, // 所有表单项在第二步了，默认false
        loading: false,
        tip: '',
        showToast: false,
        companyName: '',
        companyData: {},
        inlib: false, //是否入库
		  }
    },
    components: {
      XButton,
    },
		mounted(){
      let query = this.$route.query;
      console.log(query)
      this.companyName = query.companyName || query.name || '杭州拾贝知识产权服务有限公司';
      document.title = this.companyName;
      this.inlib = query.inlib==0 ? true : false; //是否入库
      this.getCompanyInfoApi();
		},
		methods: {
      // 提交入库
      submitFn () {
        wx.miniProgram.redirectTo({
          url: `/pages/my/result?companyName=${this.companyName}&popUp=1`
        });
      },
      getEditKeyList(){
        let arr = [];
        for (let key in this.companyData) {
          if (this.companyData.hasOwnProperty(key) && availableLableKeys.includes(key) && this.companyData[key] !== null) {
            arr.push(key)
          }
        }
        console.log(arr)
        return arr;
      },
      getOtherKeyList(){
        let arr = [];
        for (let key in this.companyData) {
          if (this.companyData.hasOwnProperty(key) && availableLableKeys.includes(key) && this.companyData[key] === null) {
            arr.push(key)
          }
        }
        console.log(arr)
        return arr;
      },
      getCompanyInfoApi() {
        if (!this.companyName) {return;}
        this.loading = true;
        this.$http.get(getCompanyInfoApi, {
          params: {
            name: this.companyName
          }
        })
        .then((resp) => {
          this.loading = false;
          console.log(resp)
          let info = resp.info;
          info.regDate = info.regDate ? Filters.formatDate.format(info.regDate) : ''
          if (info.regDate) {
            if (info.regDate.indexOf('2017') !== -1) {
              info.research2016Cost = null;
              info.sale2016 = null;
            } else if(info.regDate.indexOf('2018') !== -1){
              info.research2016Cost = null;
              info.sale2016 = null;
              info.research2017Cost = null;
              info.sale2017 = null;
            } else {
            }
          }
          this.companyData = info;
          let otherKeyList = this.getOtherKeyList();
          console.log('otherKeyList:', otherKeyList)
          if (!otherKeyList.length) {
            this.isAllin = true;
          }

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
      edit() {
        this.$router.push({
          name: 'companyInfoEdit',
          params: {
            data: this.companyData,
            editKeyList: this.getEditKeyList()
          },
          query: {...this.$route.query}
        })
      },
      next(){
        this.$router.push({
          name: 'makeAllPerfect',
          query: {...this.$route.query}
        })
      },
      submit() {
        wx.miniProgram.navigateTo({
          url: '/pages/my/result'
        });
        /*this.$router.push({
          path: '/assessResult',
          query: {...this.$route.query}
        });*/
      },
    },
    watch:{

    },
    filters: {
      dateFormat: Filters.formatDate.format,
      street: Filters.street,
      apply2019Status: Filters.apply2019Status,
      wantPledgeFil: Filters.wantPledgeFil,
      wantTechButtFil: Filters.wantTechButtFil,
      intellectualPropertyIsoFil: Filters.intellectualPropertyIsoFil,
      researchOrgLevelFil: Filters.researchOrgLevelFil,
      isExcellenceManageFil: Filters.isExcellenceManageFil,
      isNumFil: Filters.isNumFil
    }
	}
</script>
<style lang="scss">
  @import  "~assets/css/cssshake.css";
	.makeAllPerfectPreview{
    background: #F8F8F8;padding-bottom: 98px; padding-top: 20px; min-height: 100%;
		.platform{
      min-height: 100%;
      .boxes_til{
        text-align: left; background-color: #fff;padding: 40px 30px 20px 30px;
        .text {color: #333; font-size: 34px; font-weight: 600;}
      }
      .boxes{
        background: #FFFFFF; border-radius: 10px;padding: 12px 30px 50px; display:flex; justify-content:flex-start; align-items: flex-start; flex-wrap: wrap;
        >h2{font-size: 34px;color: #114293;text-align: center;line-height: 128px;background: #deebff;border-radius: 10px 10px 0 0;}
        h4{font-weight: 600;line-height: 48px;font-size: 34px;color: #333333;text-align: center;padding: 60px 0 48px;}
        .item{
          width: 100%; line-height: 42px;font-size:30px;vertical-align: middle;padding-top: 28px;
          &:first-child {padding-top: 0;}
          label{color: #999;vertical-align: middle;line-height: 40px; font-size: 28px;}
          span{vertical-align: middle;display: block;line-height: 42px;margin-top: 12px;}
          .line {
            margin-top: 20px;
            .key {display: inline-block; color: #999; width: 220px; text-align: left; margin: 0;}
            .location {width: 28px; height: 34px; margin-right: 8px; vertical-align: middle;}
            &:first-child {margin-top: 0;}
          }
          a{color: #3576FF;margin-left: 10px;}
        }
        .item_lef {
          width: 380px;
        }
        .item_rig {
          width: 260px; margin-left: 50px;
        }
        .item_three {width: 33.33%; padding:0 ;}
        .item_half {width: 50%; padding: 20px 0 0 0;}
        .items{
          padding-top: 28px;
          >label{color: #999;vertical-align: middle;line-height: 40px;}
          .item{
            display: flex;margin-top: 12px;padding-top: 0;
            label{color: #333;}
            span{color: #333;margin-top: 0;}
          }
        }
      }
		}
    .footer_btn{
      position: fixed; left: 0; bottom: 0; width:100%; height: 100px; display: flex;justify-content: space-between;text-align: center;
      .edit_btn{width: 50%;height: 100px; color: #2E81F6; line-height: 98px;text-align: center;font-size: 32px; background-color: #fff; border-top: 1px solid #f1f1f1;}
      .button{width:50%; background:#2E81F6;height: 100px;line-height: 100px; text-align: center;font-size: 32px;color: #FFFFFF;}
      .button_line {width: 100%;}
    }
	}
</style>
