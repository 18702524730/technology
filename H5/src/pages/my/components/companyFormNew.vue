<template>
	<div class="company_form_new">
    <form class="form_box" :class="{'fixed': fixedBtn}" id="form_box">
      <label class="hight mt30" v-if="showAll || showKey('regDate')  || showKey('regAddress') || showKey('frname') || showKey('regCapital') || showKey('industry')"><i>*</i>工商注册信息(必填)：</label>
      <div class="form_item" id="regDate" v-if="showAll || showKey('regDate')">
        <label>注册时间：</label>
        <div class="form_item_content gm">
          <!-- <input type="text" v-model="dform.regDate" /> -->
          <datetime
            v-model="regDateSingle"
            title=" "
            placeholder="请选择注册时间"
            @on-change="dateChange"></datetime>
          <img src="~assets/img/index/right.png" alt="">
        </div>
      </div>
      <div class="form_item" id="regAddress" v-if="showAll || showKey('regAddress')">
        <label>注册地址：</label>
        <div class="form_item_content">
          <input type="text" v-model="dform.regAddress" placeholder="请输入企业注册所在地" />
        </div>
      </div>
      <div class="form_item" id="frname" v-if="showAll || showKey('frname')">
        <label>法人姓名：</label>
        <div class="form_item_content">
          <input type="text" v-model="dform.frname" maxlength="12" placeholder="请输入法人姓名" />
        </div>
      </div>
      <div class="form_item" id="regCapital" v-if="showAll || showKey('regCapital')">
        <label>注册资金(万元)：</label>
        <div class="form_item_content">
          <input type="number" v-model="dform.regCapital" maxlength="12" placeholder="请输入注册资金" />
        </div>
      </div>
      <div class="form_item" id="industry" v-if="showAll || showKey('industry')">
        <label>所属行业：</label>
        <div class="form_item_content">
          <input type="text" v-model="dform.industry" disabled />
        </div>
      </div>

      <div class="form_item mt10" v-if="showAll || showKey('inventionAuthPatentNum') || showKey('utilityModelPatentNum') || showKey('industrialDesignPatentNum') || showKey('softCopyrightNum') || showKey('workCopyrightNum') || showKey('effectiveTmNum')">
        <label class="hight"><i>*</i>知识产权数量(必填)：</label>
        <div class="form_item_content fle5" id="inventionAuthPatentNum" v-if="showAll || showKey('inventionAuthPatentNum')">
          <p>发明授权专利：</p>
          <input type="number" v-model="dform.inventionAuthPatentNum" :maxlength="6" placeholder="请输入发明授权专利数量" />
        </div>
        <div class="form_item_content fle5" id="utilityModelPatentNum" v-if="showAll || showKey('utilityModelPatentNum')">
          <p>实用新型专利：</p>
          <input type="number" v-model="dform.utilityModelPatentNum" :maxlength="6" placeholder="请输入实用新型专利数量" />
        </div>
        <div class="form_item_content fle5" id="industrialDesignPatentNum" v-if="showAll || showKey('industrialDesignPatentNum')">
          <p>外观设计专利：</p>
          <input type="number" v-model="dform.industrialDesignPatentNum" :maxlength="6" placeholder="请输入专利数量" />
        </div>
        <div class="form_item_content fle5" id="softCopyrightNum" v-if="showAll || showKey('softCopyrightNum')">
          <p>软件著作权：</p>
          <input type="number" v-model="dform.softCopyrightNum" :maxlength="6" placeholder="请输入软件著作权数量" />
        </div>
        <div class="form_item_content fle5" id="workCopyrightNum" v-if="showAll || showKey('workCopyrightNum')">
          <p>作品著作权：</p>
          <input type="number" v-model="dform.workCopyrightNum" :maxlength="6" placeholder="请输入作品著作权数量" />
        </div>
        <!-- <div class="form_item_content fle5" id="icDesignNum" v-if="showAll || showKey('icDesignNum')">
          <p>集成电路布图设计专有权</p>
          <input type="number" v-model="dform.icDesignNum" :maxlength="6" placeholder="请输入专有权数量" />
        </div> -->
        <div class="form_item_content fle5" id="effectiveTmNum" v-if="showAll || showKey('effectiveTmNum')">
          <p>有效商标：</p>
          <input type="number" v-model="dform.effectiveTmNum" :maxlength="6" placeholder="请输入有效商标数量" />
        </div>
      </div>

      <label class="mt40 hight" v-if="showAll || showKey('contact')  || showKey('contactNumber')"><i>*</i>联系信息(必填)：</label>
      <div class="form_item" id="contact" v-if="showAll || showKey('contact')">
        <label>联系人:</label>
        <div class="form_item_content">
          <input type="text" v-model="dform.contact" placeholder="请输入联系人" />
        </div>
      </div>
      <div class="form_item" id="contactNumber" v-if="showAll || showKey('contactNumber')">
        <label>联系人手机号:</label>
        <div class="form_item_content">
          <input type="text" v-model="dform.contactNumber" placeholder="请输入联系人手机号" disabled />
        </div>
      </div>

      <div class="form_item mt10" v-if="showAll || showKey('companyRoundNum')  || showKey('researchRoundNum') || showKey('middleRoundNum') || showKey('doctorSeniorNum')">
        <label class="hight"><i>*</i>企业人员情况(必填)：</label>
        <div class="form_item_content fle5" id="companyRoundNum" v-if="showAll || showKey('companyRoundNum')">
          <p>企业人员总数：</p>
          <input type="number" v-model="dform.companyRoundNum" :maxlength="9" placeholder="请输入企业人员总数" />
        </div>
        <div class="form_item_content fle5" id="researchRoundNum" v-if="showAll || showKey('researchRoundNum')">
          <p>研发人员总数：</p>
          <input type="number" v-model="dform.researchRoundNum" :maxlength="9" placeholder="请输入研发人员总数" />
        </div>
        <div class="form_item_content fle4" id="middleRoundNum" v-if="showKey('middleRoundNum')">
          <p>本科或中级职称及以上：</p>
          <input type="number" v-model="dform.middleRoundNum" :maxlength="9" placeholder="请输入数量" />
        </div>
        <div class="form_item_content fle5" id="doctorSeniorNum" v-if="showKey('doctorSeniorNum')">
          <p>其中博士人数：</p>
          <input type="number" v-model="dform.doctorSeniorNum" :maxlength="9" placeholder="请输入博士人数" />
        </div>
      </div>

      <div class="form_item mt10" v-if="showAll || showKey('sale2016') || showKey('sale2017') || showKey('sale2018')">
        <label class="hight"><i>*</i>销售收入情况(必填)：</label>
        <div class="form_item_content fle4" id="sale2016" v-if="showAll || showKey('sale2016')">
          <p :style="{'color': regYear == '2017' || regYear == '2018' ? '#bbb' : '#333'}">2016年销售收入(万元)：</p>
          <input type="number" :disabled="regYear == '2017' || regYear == '2018'" v-model="dform.sale2016" @keyup="dform.sale2016 = dform.sale2016.slice(0, 12)" :placeholder="regYear == '2017' || regYear == '2018' ? salePlaceHolder : '请输入2016年销售收入'" />
        </div>
        <div class="form_item_content fle4" id="sale2017" v-if="showAll || showKey('sale2017')">
          <p :style="{'color': regYear == '2018' ? '#bbb' : '#333'}">2017年销售收入(万元)：</p>
          <input type="number" @keyup="dform.sale2017 = dform.sale2017.slice(0, 12)" :disabled="regYear == '2018'" v-model="dform.sale2017" :placeholder=" regYear == '2018' ? salePlaceHolder : '请输入2017年销售收入'" />
        </div>
        <div class="form_item_content fle4" id="sale2018" v-if="showAll || showKey('sale2018')">
          <p>2018年销售收入(万元)：</p>
          <input type="number" v-model="dform.sale2018" maxlength="15" placeholder="请输入2018年销售收入" />
        </div>
      </div>

      <div class="form_item mt10" id="salePrice" v-if="showAll || showKey('research2016Cost') || showKey('research2017Cost') || showKey('research2018Cost')">
        <label class="hight"><i>*</i>研发投入情况(必填)：</label>
        <div class="form_item_content fle6" id="research2016Cost" v-if="showAll || showKey('research2016Cost')">
          <p :style="{'color': regYear == '2017' || regYear == '2018' ? '#bbb' : '#333'}">2016年研发投入费用(万元)：</p>
          <input
          type="number"
          :disabled="regYear == '2017' || regYear == '2018'"
          @keyup="dform.research2016Cost = dform.research2016Cost.slice(0, 12)"
          v-model="dform.research2016Cost"
          :placeholder="regYear == '2017' || regYear == '2018' ? searchPlaceHolder : '请输入研发费用'" />
        </div>
        <div class="form_item_content fle6" id="research2017Cost" v-if="showAll || showKey('research2017Cost')">
          <p :style="{'color': regYear == '2018' ? '#bbb' : '#333'}">2017年研发投入费用(万元)：</p>
          <input type="number" @keyup="dform.research2017Cost = dform.research2017Cost.slice(0, 12)" :disabled="regYear == '2018'" v-model="dform.research2017Cost" :placeholder="regYear == '2018' ? searchPlaceHolder : '请输入研发费用'" />
        </div>
        <div class="form_item_content fle6" id="research2018Cost" v-if="showAll || showKey('research2018Cost')">
          <p>2018年研发投入费用(万元)：</p>
          <input type="number" v-model="dform.research2018Cost" placeholder="请输入研发费用" />
        </div>
      </div>

      
      <template v-if="hasRequrieKey && !showMore && !formData.isEdit">
        <div class="more_items" @click="showMore=true">更多选填项</div>
      </template>
      <template v-else>
      <p class="boxes_in_til mt40" v-if="!isRequired">补充信息(选填)：</p>
      <div class="form_item" id="productField" v-if="showAll || showKey('productField')">
        <label>技术领域：</label>
        <div class="form_item_content gm">
          <popup-picker :title="''" :data="productFieldList" v-model="selectObj.productField" @on-change="onChange(selectObj.productField, 'productField')" placeholder="请选择技术领域"></popup-picker>
          <img src="~assets/img/index/right.png" alt="">
        </div>
      </div>
      <div class="form_item" id="qualification" v-if="showAll || showKey('qualification')">
        <label>已经认定的项目/资质：</label>
        <div class="form_item_content">
          <p :class="['text', qualification ? '' : 'pl']" @click="handleSelectPro('hasHonorState')">{{qualification ? qualification : '请选择已经认定的项目'}}</p>
          <!-- <input type="text" @focus="handleSelectPro('hasHonorState')" readonly="readonly" name="name" v-model="qualification" placeholder="请选择资质荣誉" /> -->
          <img src="~assets/img/index/right.png" @click="handleSelectPro('hasHonorState')" alt="">
          <div v-transfer-dom>
            <popup v-model="hasHonorState" position="bottom" max-height="50%">

              <check-list :options="honor" ref="proObject" v-model="qualificationItem" label-position="left"  @on-change="change(qualificationItem, 'qualification')"></check-list>
              <div class="blank"></div>
            </popup>
            <button v-show="hasHonorState" :class="['selectBtn' ,hasHonorState ? 'showBtn' : '']" @click="confirmPro" type="button"> 确定 </button>
          </div>
        </div>
      </div>
      <div class="form_item" id="wantQualification" v-if="showAll || showKey('wantQualification')">
        <label>希望申报的项目/资质：</label>
        <div class="form_item_content">
          <p :class="['text', wantQualification ? '' : 'pl']" @click="handleSelectPro('hopeHonorState')">{{wantQualification ? wantQualification : '请选择希望申报的项目'}}</p>
          <!-- <input type="text" @focus="handleSelectPro('hopeHonorState')" readonly="readonly" name="name" v-model="wantQualification" placeholder="希望申请的资质荣誉" /> -->
          <img src="~assets/img/index/right.png" alt="">
          <div v-transfer-dom class="dia">
            <popup v-model="hopeHonorState" position="bottom" max-height="50%">

              <check-list :options="wantHonor" ref="proObject" v-model="wantQualificationItem" label-position="left"  @on-change="change(wantQualificationItem, 'wantQualification')"></check-list>
              <div class="blank"></div>

            </popup>
            <button v-show="hopeHonorState" :class="['selectBtn' ,hopeHonorState ? 'showBtn' : '']" @click="confirmPro" type="button"> 确定 </button>
          </div>
        </div>
      </div>
      <div class="form_item" id="wantPledge" v-if="showAll || showKey('wantPledge')">
        <label>是否有知识产权质押融资需求：</label>
        <div class="form_item_content form_item_content_noborder">
          <label @click="dform.wantPledge=1" class="radio_label"><span :class="{'hight': dform.wantPledge==1}"></span>有</label>
          <label @click="dform.wantPledge=2" class="radio_label"><span :class="{'hight': dform.wantPledge==2}"></span>否</label>
        </div>
      </div>
      <div class="form_item" id="wantTechButt" v-if="showAll || showKey('wantTechButt')">
        <label>是否有技术对接需求(规划、购买、转化等)：</label>
        <div class="form_item_content form_item_content_noborder">
          <label @click="dform.wantTechButt=1" class="radio_label"><span :class="{'hight': dform.wantTechButt==1}"></span>有</label>
          <label @click="dform.wantTechButt=2" class="radio_label"><span :class="{'hight': dform.wantTechButt==2}"></span>否</label>
        </div>
      </div>
      <div class="form_item" id="cooperationUniversities" v-if="showAll || showKey('cooperationUniversities')">
        <label>是否与高校有合作：</label>
        <div class="form_item_content form_item_content_noborder">
          <label @click="dform.cooperationUniversities=1" class="radio_label"><span :class="{'hight': dform.cooperationUniversities==1}"></span>有</label>
          <label @click="dform.cooperationUniversities=2" class="radio_label"><span :class="{'hight': dform.cooperationUniversities==2}"></span>否</label>
        </div>
      </div>
      </template>

      <div class="footer_btn">
        <div class="button" @click.prevent="submit">{{btnName}}</div>
      </div>
    </form>
    <toast v-model="showToast" type="warn">{{tip}}</toast>
	</div>
</template>
<script>
	import Vue from 'vue'
  import qs from 'qs'
  import Filters from 'src/utils/filters.js';
  import { AlertModule, TransferDom, XButton, Datetime } from 'vux'

  const cartUrl = CONFIG.cartUrl;
  const indexUrl = CONFIG.indexUrl;
  const commitCompanyApi = indexUrl + '/commitCompany';
  const setPageViewUrl = indexUrl + '/setPageView';
  const honor = ['暂无','国家高新技术企业','市级高新技术企业','省级科技型中小企业','杭州市专利试点企业','杭州市专利示范企业','省级高新技术企业研究开发中心','市级高新技术企业研究开发中心','省级企业技术中心','市级企业技术中心','浙江省重大科技计划项目','杭州市重大科技计划项目', '市科技型初创企业培育工程', 'CNAS实验室'];
  const wantHonor = ['暂无', '国家高新技术企业', '市级高新技术企业', '省级科技型中小企业', '杭州市专利试点企业', '杭州市专利示范企业', '省级高新技术企业研究开发中心', '市级高新技术企业研究开发中心','省级企业技术中心','市级企业技术中心','浙江省重大科技计划项目','杭州市重大科技计划项目', '市科技型初创企业培育工程'];

  //表单字段
  const formLableKeys = [
    'companyName', //企业名称
    'regDate', //注册日期
    'frname', //法人
    'regCapital', //注册资金
    'street', //街道
    // 'companySize', //企业规模
    'regAddress', //企业注册所在地
    'industry', //所在行业
    'apply2019Status', //国家高新技术企业申请状态
    'productField', //产品领域

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
    'haveResearchOrg', //是否设有研发机构或平台
    'researchOrgLevel', //机构或平台级别

    'contact', //联系人
    'contactNumber', //联系人
    'chargeName', //负责人姓名
    'chargeNumber', //负责人联系方式
    'chargeWx', //负责人微信号
    'chargeIswx', //法人 手机号是否是微信号

    'qualification', //资质
    'wantQualification', //希望获得资质
    'wantPledge', //是否有知识产权质押需求
    'wantTechButt', //是否有技术对接需求


    'techTransformNum2016', //科技成果转化数量
    'techTransformNum2017', //科技成果转化数量
    'techTransformNum2018', //科技成果转化数量
    'techTransformNum2019', //科技成果转化数量

    'companyRoundNum', //企业人员概数
    'researchRoundNum', //研发人员概数
    //'companyNum', //企业人员总数
    //'researchNum', //研发人员总数
    'middleRoundNum', //本科及中级以上概数
    'collegeAboveRoundNum', //本科及以上学历人数
    'doctorSeniorNum', //博士或高工人数
    'middleTitleNum', //中级职称人数
    /*'doctorNum', //博士数量
    'masterNum', //硕士数量
    'collegeNum', //本科生
    'juniorNum', //大专*/

    'researchArea', //科研用房面积(平方米)
    'equipment', //企业技术开发仪器设备原值(万元)
    'passedSystem', //已通过的体系认证
    'isExcellenceManage', //是否引入卓越绩效管理模式
    'standardSituation', //标准参与制定情况
    'certifiedLab', //通过省、国家（国际组织）认证的实验室和检测机构情况
    'awards', //近三年获得市级及以上自然科学、技术发明、科技进步奖项目情况
    'infoInvestment', //近三年企业信息化建设投入(万元)
    'outerExpertNum', //中心从事研发工作的外部专家数
    'isAccident', //近三年无重大环境污染事故
  ]

  //必填字段
  const requrieKeys = [
    'contact',, //联系人
    'contactNumber', //联系电话

    'regDate', //注册日期
    'regCapital', //注册资金
    'regAddress', //企业注册所在地
    'industry', //所在行业
    'frname', //法人

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
    'effectiveTmNum', //有效商标数量

    'companyRoundNum', //企业人员概数
    'middleRoundNum', //本科及中级以上概数
    'researchRoundNum', //研发人员概数
    'doctorSeniorNum', //博士
  ]

	export default {
    props: {
      // 按钮文字
      btnName: {
        type: String,
        default: '保存'
      },
      // 是否显示所有表单项
      showAll: {
        type: Boolean,
        default: false
      },
      // 是否公司名称项
      showCompanyName: {
        type: Boolean,
        default: false
      },
      // 白名单 需要显示的表单项keyName, 和showAll互斥
      whiteKeyNameList: {
        type: Array,
        default() {
          return []
        }
      },
      // 表单数据
      formData: {
        type: Object,
        default() {
          return {}
        }
      },
      // 是否全部必填
      isRequired: {
        type: Boolean,
        default: false
      },
      // 是否固定底部按钮
      fixedBtn: {
        type: Boolean,
        default: false
      },
    },
    directives: {
      TransferDom
    },
		data() {
      // 生成表单的初始数据, 优先白名单
      let createFormData = () => {
        return this.createFormData();
      }
		  return {
        hasRequrieKey: false,
        requrieKeys: [...requrieKeys], //必填项名单
        regDateSingle: '',
        isEdit: false, // 是否是编辑页面
        phoneIsWxAccount: false,
        searchPlaceHolder: '请输入研发费用',
        salePlaceHolder: '请输入销售收入',
        transPlaceHolder: '请输入转化数量',
        regYear: '2000',
        labelActiveIndex: '',
        loading: false,
        submited: false,
        showToast:false,
        applyYearIndex: 0,
        tip: '',
        companyScale:[],
        proShowState: false,
        hasHonorState: false,
        hopeHonorState: false,
        hasPassedSystemState: false,
        companyStreet: [],
        yearSale:[],
        productField: '',
        qualification: '',
        wantQualification: '',
        passedSystem: '',
        qualificationItem: [],
        wantQualificationItem: [],
        passedSystemItem: [],
        companySizeList: [['50人以下', '50-100人', '100人以上']],
        applyYearList: ['2019', '2020', '2021'],
        list2: [['5000万以下', '5000万-2亿', '2亿以上']],
        streetList: [['闸弄口街道','凯旋街道','采荷街道','四季青街道','笕桥街道','彭埠街道','钱塘智慧城','丁兰街道']],
        researchOrgLevelList: [
          {name: '国家级', id: 4},
          {name: '省级', id: 3},
          {name: '市级', id: 2},
          {name: '企业内设', id: 6},
          {name: '未设有', id: 5}
        ],
        productFieldList: [[ '电子信息', '生物与新医药', '航空航天', '新材料', '高技术服务', '新能源与节能', '资源与环境', '先进制造及自动化' ]],
        industryList: [[ '电子信息', '生物与新医药', '航空航天', '新材料', '高技术服务', '新能源与节能', '资源与环境', '先进制造及自动化' ]],
        intellectualPropertyIsoList: [['未实施', '实施中', '取得证书']],
        standardSituationList: [[ '国际标准（负责起草，参与）', '国家标准（负责起草，参与）', '行业标准（负责起草，参与）', '地方标准（负责起草，参与）']],
        passedSystemList: [ 'ISO9001质量管理体系', 'ISO14001环境管理体系', 'OHSAS18001职业健康安全管理体系', '其它管理体系'],
        honor: [...honor],
        wantHonor: [...wantHonor],
        /*dform:{
          companyName:'',
          regDate: '',
          street: '',
          companySize: '',
          inventionAuthPatentNum: '',
          apply2019Status: 7,
          applyYear:'2019',
          productField: '',
          research2016Cost: '',
          wantPledge: 1,
          wantTechButt: 1,
          haveResearchOrg: 0,
          productItem: [], // 技术领域
          wantQualificationItem: [],
          researchOrgLevel: 5,
          qualificationItem: []
        },*/
        dform: createFormData(),
        selectObj: {
          apply2019Status: [],
          street: [],
          // companySize: [],
          productField: [],
          // researchOrgLevel: [],
          intellectualPropertyIso: [],
          standardSituation: [],
        },
        radio: '0',
        platformRadio: '0',
        checkList:[],
        hideRepeat: true, //默认隐藏复评
        apply2019StatusqEqual2: false,
        showMore: false,
		  }
    },
    components: {
      XButton, Datetime,
    },
		mounted(){
      // 编辑页面
      if (this.formData.isEdit) {
        //this.whiteKeyNameList = Object.keys(this.formData);
        this.dform = this.formData;
        this.init();
      }
      if (!this.isRequired) {
        this.requrieKeys = [...requrieKeys]
      } else {
        this.requrieKeys = [...formLableKeys]
      }
      
      console.log(this.dform.regDate)
      // .vux-popup-mask
      document.getElementsByClassName('.vux-popup-mask').touchstart = function (e) {e.preventDefault();}
      setTimeout(() => {
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var self = this;
        if (isIOS) {
          console.log('isIOS:', isIOS)
          let timer = 0;
          // https://developers.weixin.qq.com/community/develop/doc/0008c824c083a8d9b0b72f80151800
          $('input[type="text"], input[type="number"], textarea').blur(function(){
            console.log('blur......')
            var id = $(this).attr('id');
            if (!id) {
              id = $(this).parent().attr('id');
            }
            if (!id) {
              id = $(this).parent().parent().attr('id');
            }
            timer = setTimeout(() => {
              self.custormAnchor(id);
            }, 200)
          });
          $('input[type="text"], input[type="number"], textarea').focus(function(){
            timer && clearTimeout(timer);
          });
        }
      }, 1000)
		},
		methods: {
      // 初始化已有值的表单
      init() {
        let { dform, selectObj } = this;
        dform.regDate = dform.regDate ? Filters.formatDate.format(dform.regDate) : '';
        setTimeout(()=>{
          this.regDateSingle = dform.regDate;
        },200)
        this.initApply2019Status();
        // 下拉框赋值
        Object.keys(selectObj).forEach((key) => {
          if (dform[key]) {
            if (key === 'street') {
              let v = this[key+'List'][0][dform[key]-1]
              selectObj[key] = [v]
            } else {
              selectObj[key] = [dform[key]]
            }
          }
        });
        // 多选框赋值
        ['qualification', 'wantQualification', 'passedSystem'].forEach((key) => {
          let v = dform[key];
          if (v) {
            this[key+ 'Item'] = v.split(',')
          }
        });
        if (!dform.industry) {
          dform.industry = '暂无'
        }
        if (dform.researchOrgLevel) {
          this.researchOrgLevelList.some((item, index) => {
            if (item.id == dform.researchOrgLevel) {
              this.labelActiveIndex = index;
              return true;
            }
          });
        }

        this.whiteKeyNameList.some((item) => {
          if (this.requrieKeys.includes(item)) {
            this.hasRequrieKey = true;
            return true;
          }
        });
        console.log('whiteKeyNameList:', this.whiteKeyNameList)
      },
      initApply2019Status(){
        let { dform, applyYearList } = this;
        //dform.identificationTime = '2016';
        let hideRepeat = true; // 控制复评radio，默认隐藏
        this.hideRepeat = true;
        console.log('dform:', dform)
        console.log('dform.identificationTime:', dform.identificationTime)
        /*企业项目培育库录入企业名称与国高已获评企业名称相同时，“国家高新技术企业认定计划”默认选择对应的复评年份（复评年份=认定年份+3）备注：企业项目培育库录入企业名称不是国高已获评企业时，不显示复评选项*/
        if (dform.identificationTime) {
          if (dform.identificationTime == 2016 ) {
            dform.applyYearIndex = 0;
            this.applyYearIndex = 0;
            hideRepeat = false;
          } else if(dform.identificationTime == 2017) {
            dform.applyYearIndex = 1;
            this.applyYearIndex = 1;
            hideRepeat = false;
          } else if(dform.identificationTime == 2018) {
            dform.applyYearIndex = 2;
            this.applyYearIndex = 2;
            hideRepeat = false;
          }
          if (hideRepeat === false) {
            dform.apply2019Status = 2;
            this.hideRepeat = hideRepeat;
          }
        }
        if (!dform.apply2019Status || dform.apply2019Status == 7) {return}
        if (hideRepeat) {
          this.apply2019StatusqEqual2 = false;
          if (dform.apply2019Status == 1 || dform.apply2019Status == 2) {
            dform.apply2019Status = dform.apply2019Status == 1 ? 1 : 2;
            dform.applyYearIndex = 0;
            this.applyYearIndex = 0;
          } else if(dform.apply2019Status == 3 || dform.apply2019Status == 4) {
            dform.apply2019Status = dform.apply2019Status == 3 ? 1 : 2;
            dform.applyYearIndex = 1;
            this.applyYearIndex = 1;
          } else if(dform.apply2019Status == 5 || dform.apply2019Status == 6) {
            dform.apply2019Status = dform.apply2019Status == 5 ? 1 : 2;
            dform.applyYearIndex = 2;
            this.applyYearIndex = 2;
          }
          if (dform.apply2019Status == 2) {
            this.apply2019StatusqEqual2 = true;
          }
        }
        dform.applyYear = applyYearList[dform.applyYearIndex];
      },
      // 生成表单的初始数据, 优先白名单
      createFormData() {
        let ret = {};
        let arr = this.whiteKeyNameList.length ? this.whiteKeyNameList : formLableKeys
        console.log('arr111:', this.whiteKeyNameList)
        arr.forEach((name) => {
          ret[name] = '';
        })
        return ret;
      },
      // 有白名单存在时，只显示白名单内的表单项
      // 没有白名单存在时，显示所有未填的企业数据
      showKey(keyName) {
        let data = {
          'street': 1,
        };
        let ret = false;
        let arr = this.whiteKeyNameList;
        if (arr.length) {
          // 若有白名单，只显示在白名单内的表单项
          if (this.whiteKeyNameList.includes(keyName)) {
            ret = true;
          }
        }else{
          // 若该项数据无值时，显示
          if (!data[keyName]) {
            ret = true;
          }
        }
        return ret;
      },
      clickLabel (item, index) {
        this.labelActiveIndex = index;
        this.dform.researchOrgLevel = item.id;

        console.log(item, this.dform)
      },
      clickApplyYear (item, index) {
        this.applyYearIndex = index;
        this.dform.applyYear = item;
        console.log(this.dform)
      },
      number(){
        this.famount=this.famount.replace(/[^\.\d]/g,'');
        this.famount=this.famount.replace('.','');
  　　},
      handleSelectPro (filed) {
        this[filed] = true
      },
      confirmPro () {
        // console.log(this.$refs.proObject.getFullValue(), this.dform.productField)
        // this.productField = this.dform.productField.join('/')
        this.proShowState = false;
        this.hasHonorState = false;
        this.hopeHonorState = false;
        this.hasPassedSystemState = false;
      },
      custormAnchor(anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) { anchorElement.scrollIntoView({
          behavior: 'smooth',
          block:'start'
        }); }
      },
      dateChange(v) {
        this.dform.regDate = v;
        console.log('picker发送选择改变，携带值为', v)
      },
      change (val, filed) {
        console.log('change', val, filed)
        console.log('aaaaaaa', this[filed+'Item'])
        let non = val.findIndex(item => (item === '暂无'))
        console.log('index', non)
        // if (non != -1 && val.length > 1) {
        //   val = ['暂无']
        //   this[filed+'Item'] = ['暂无']
        //   console.log('aaaaaaa', this[filed+'Item'])
        // }
        if (val[0] == '暂无'&&val.length==1) {

        } else if(val[0] != '暂无' &&non != -1 && val.length > 1){
          val = ['暂无']
          this[filed+'Item'] = ['暂无']
          console.log('aaaaaaa', this[filed+'Item'])
        } else if (val[0] === '暂无'&&val.length > 1){
          this[filed+'Item'] = val.filter(item => (item != '暂无'))
        }
        console.log(this[filed])
        this.dform[filed] = val.join(',')
        this[filed] = val.join('/')
        if (filed == 'qualification') {
          if (val.length>1 || (val.length === 1 && val[0] !== '暂无')) {
            this.wantHonor = [...wantHonor]
            val.forEach((item, index) => {
              let i = this.wantHonor.indexOf(item);
              if (i !== -1 && item !== '暂无') {
                this.wantHonor.splice(i, 1);
              }
            });
          }else{
            this.wantHonor = [...wantHonor]
          }
        }
        console.log('dform', this.dform)
      },
      phoneChange (v) {
        if (!this.dform.chargeWx) {
          this.dform.chargeWx = v
        }
      },
      onHide (type) {
        console.log('on hide', type)
      },
      onChange (val, filed) {
        console.log('val change', val, filed ,this.companyStreet)
        console.log(this.selectObj)
        if (filed === 'productField' || filed === 'standardSituation') {
          this.dform[filed] = val[0]
        } else {
          this.dform[filed] = this[filed+'List'][0].findIndex(item => (item === val[0])) + 1
        }

        console.log(this.dform)
      },
      isNeedCheck(name) {
        let { whiteKeyNameList, requrieKeys } = this;
        return whiteKeyNameList.includes(name) && requrieKeys.includes(name)
      },
      checkValid(){
        console.log('subdform', this.dform)
        let { whiteKeyNameList, dform, isNeedCheck } = this;
        if (isNeedCheck('companyName') && !dform.companyName) {
          this.showToast = true;
          this.custormAnchor('company')
          this.tip = '请输入企业名称'
          return;
        }
        if (isNeedCheck('regDate') && !dform.regDate) {
          this.showToast = true;
          this.tip = '请选择注册时间'
          this.custormAnchor('regDate')
          return;
        }
        if (isNeedCheck('regAddress') && !dform.regAddress){
          this.showToast = true;
          this.custormAnchor('regAddress')
          this.tip = '请输入企业注册地址';
          return;
        }
        if (isNeedCheck('street') && dform.regAddress && dform.regAddress.indexOf('江干区') !== -1 && !dform.street){
          this.showToast = true;
          this.custormAnchor('street')
          this.tip = '请选择企业所在街道';
          return;
        }
        /*if (isNeedCheck('companySize') && !dform.companySize){
          this.showToast = true;
          this.custormAnchor('companySize')
          this.tip = '请选择企业规模';
          return;
        }*/
        if (isNeedCheck('frname') && !dform.frname) {
          this.showToast = true;
          this.tip = '请输入法人姓名'
          this.custormAnchor('frname')
          return;
        }
        if (isNeedCheck('regCapital') && !dform.regCapital) {
          this.showToast = true;
          this.tip = '请输入注册资金'
          this.custormAnchor('regCapital')
          return;
        }
        if (isNeedCheck('regCapital') && dform.regCapital && (parseFloat(dform.regCapital) < 0 || !/(^[1-9][0-9]{0,8}$)|(^[0-9]{1,9}\.\d{1,2}$)/.test(dform.regCapital))) {
          this.showToast = true;
          this.custormAnchor('regCapital')
          this.tip = '注册资金请输入正数(最多九位)，可精确到小数点后两位';
          return;
        }
        if (isNeedCheck('industry') && !dform.industry) {
          this.showToast = true;
          this.tip = '请输入所属行业'
          this.custormAnchor('industry')
          return;
        }

        if (isNeedCheck('contact') && !dform.contact) {
          this.showToast = true;
          this.tip = '请输入联系人姓名'
          this.custormAnchor('contact')
          return;
        }

        if(isNeedCheck('inventionAuthPatentNum') && !dform.inventionAuthPatentNum && dform.inventionAuthPatentNum !== 0){
          this.showToast = true;
          this.custormAnchor('inventionAuthPatentNum')
          this.tip = '请输入发明授权专利数量'
          return;
        }
        if (dform.inventionAuthPatentNum && (parseFloat(dform.inventionAuthPatentNum) < 0 || !/(^[1-9]\d{0,8}$)|(^0$)/.test(dform.inventionAuthPatentNum))){
          this.showToast = true;
          // invent
          this.custormAnchor('inventionAuthPatentNum')
          this.tip = '发明授权专利数量请输入九位以内非负整数';
          return;
        }
        if(isNeedCheck('utilityModelPatentNum') && !dform.utilityModelPatentNum && dform.utilityModelPatentNum !== 0){
          this.showToast = true;
          this.custormAnchor('utilityModelPatentNum')
          this.tip = '请输入实用新型专利数量'
          return;
        }
        if (dform.utilityModelPatentNum && (parseFloat(dform.utilityModelPatentNum) < 0 ||!/(^[1-9]\d{0,8}$)|(^0$)/.test(dform.utilityModelPatentNum))){
          this.showToast = true;
          this.custormAnchor('utilityModelPatentNum')
          this.tip = '实用新型专利数量请输入九位以内非负整数';
          return;
        }
        if(isNeedCheck('industrialDesignPatentNum') && !dform.industrialDesignPatentNum && dform.industrialDesignPatentNum !== 0){
          this.showToast = true;
          this.custormAnchor('industrialDesignPatentNum')
          this.tip = '请输入外观设计专利数量'
          return;
        }
        // /(^[1-9]{1,9}$)|(^[0-9]{1,9}\.\d{1,2}$)/
        if (dform.industrialDesignPatentNum && (parseFloat(dform.industrialDesignPatentNum) < 0 ||!/(^[1-9]\d{0,8}$)|(^0$)/.test(dform.industrialDesignPatentNum))){
          this.showToast = true;
          this.custormAnchor('industrialDesignPatentNum')
          this.tip = '外观设计专利数量请输入九位以内非负整数';
          return;
        }
        if(isNeedCheck('softCopyrightNum') && !dform.softCopyrightNum && dform.softCopyrightNum !== 0){
          this.showToast = true;
          this.custormAnchor('softCopyrightNum')
          this.tip = '请输入软件著作权数量'
          return;
        }
        if (dform.softCopyrightNum && (parseFloat(dform.softCopyrightNum) < 0 ||!/(^[1-9]\d{0,8}$)|(^0$)/.test(dform.softCopyrightNum))){
          this.showToast = true;
          this.custormAnchor('softCopyrightNum')
          this.tip = '软件著作权数量请输入九位以内非负整数';
          return;
        }
        if(isNeedCheck('workCopyrightNum') && !dform.workCopyrightNum && dform.workCopyrightNum !== 0){
          this.showToast = true;
          this.custormAnchor('workCopyrightNum')
          this.tip = '请输入作品著作权数量'
          return;
        }
        if (dform.workCopyrightNum && (parseFloat(dform.workCopyrightNum) < 0 ||!/(^[1-9]\d{0,8}$)|(^0$)/.test(dform.workCopyrightNum))){
          this.showToast = true;
          this.custormAnchor('workCopyrightNum')
          this.tip = '作品著作权数量请输入九位以内非负整数';
          return;
        }
        if(isNeedCheck('icDesignNum') && !dform.icDesignNum && dform.icDesignNum !== 0){
          this.showToast = true;
          this.custormAnchor('icDesignNum')
          this.tip = '请输入专有权数量'
          return;
        }
        if (dform.icDesignNum && (parseFloat(dform.icDesignNum) < 0 ||!/(^[1-9]\d{0,8}$)|(^0$)/.test(dform.icDesignNum))){
          this.showToast = true;
          this.custormAnchor('icDesignNum')
          this.tip = '专有权数量请输入九位以内非负整数';
          return;
        }
        if(isNeedCheck('effectiveTmNum') && !dform.effectiveTmNum && dform.effectiveTmNum !== 0){
          this.showToast = true;
          this.custormAnchor('effectiveTmNum')
          this.tip = '请输入有效商标数量'
          return;
        }
        if (dform.effectiveTmNum && (parseFloat(dform.effectiveTmNum) < 0 ||!/(^[1-9]\d{0,8}$)|(^0$)/.test(dform.effectiveTmNum))){
          this.showToast = true;
          this.custormAnchor('effectiveTmNum')
          this.tip = '有效商标数量请输入九位以内非负整数';
          return;
        }
        if(isNeedCheck('intellectualPropertyIso') && !dform.intellectualPropertyIso){
          this.showToast = true;
          this.custormAnchor('intellectualPropertyIso')
          this.tip = '请选择知识产权贯标状态'
          return;
        }
        
        
        // 企业人员校验
        if(isNeedCheck('companyRoundNum') && !dform.companyRoundNum && dform.companyRoundNum !== 0){
          this.showToast = true;
          this.custormAnchor('companyRoundNum')
          this.tip = '请输入企业人员总数'
          return;
        }
        if (dform.companyRoundNum && (parseFloat(dform.companyRoundNum) < 0 || !/(^[1-9]\d{0,8}$)|(^0$)/.test(dform.companyRoundNum))){
          this.showToast = true;
          this.custormAnchor('companyRoundNum')
          this.tip = '企业人员总数请输入九位以内非负整数';
          return;
        }
        if(isNeedCheck('researchRoundNum') && !dform.researchRoundNum && dform.researchRoundNum !== 0){
          this.showToast = true;
          this.custormAnchor('researchRoundNum')
          this.tip = '请输入研发人员总数'
          return;
        }
        if (dform.researchRoundNum && (parseFloat(dform.researchRoundNum) < 0 || !/(^[1-9]\d{0,8}$)|(^0$)/.test(dform.researchRoundNum))){
          this.showToast = true;
          this.custormAnchor('researchRoundNum')
          this.tip = '研发人员总数请输入九位以内非负整数';
          return;
        }
        if (dform.companyRoundNum && (dform.researchRoundNum-0 > dform.companyRoundNum)){
          console.log(dform.companyRoundNum, dform.researchRoundNum)
          this.showToast = true;
          this.custormAnchor('researchRoundNum')
          this.tip = '研发人员总数不能大于企业人员总数';
          return;
        }
        if(isNeedCheck('middleRoundNum') && !dform.middleRoundNum && dform.middleRoundNum !== 0){
          this.showToast = true;
          this.custormAnchor('middleRoundNum')
          this.tip = '请输入本科及中级职称以上人数'
          return;
        }
        if (dform.middleRoundNum && (parseFloat(dform.middleRoundNum) < 0 || !/(^[1-9]\d{0,8}$)|(^0$)/.test(dform.middleRoundNum))){
          this.showToast = true;
          this.custormAnchor('middleRoundNum')
          this.tip = '本科及中级职称以上人数请输入九位以内非负整数';
          return;
        }
        if (dform.companyRoundNum && (dform.middleRoundNum-0 > dform.companyRoundNum)){
          this.showToast = true;
          this.custormAnchor('middleRoundNum')
          this.tip = '本科及中级职称以上人数不能大于企业人员总数';
          return;
        }
        if(isNeedCheck('collegeAboveRoundNum') && !dform.collegeAboveRoundNum && dform.collegeAboveRoundNum !== 0){
          this.showToast = true;
          this.custormAnchor('collegeAboveRoundNum')
          this.tip = '请输入本科及以上学历人数'
          return;
        }
        if (dform.collegeAboveRoundNum && (parseFloat(dform.collegeAboveRoundNum) < 0 || !/(^[1-9]\d{0,8}$)|(^0$)/.test(dform.collegeAboveRoundNum))){
          this.showToast = true;
          this.custormAnchor('collegeAboveRoundNum')
          this.tip = '本科及以上学历人数请输入九位以内非负整数';
          return;
        }
        if (dform.companyRoundNum && (dform.collegeAboveRoundNum-0 > dform.companyRoundNum)){
          this.showToast = true;
          this.custormAnchor('collegeAboveRoundNum')
          this.tip = '本科及以上学历人数不能大于企业人员概数';
          return;
        }
        if(isNeedCheck('doctorSeniorNum') && !dform.doctorSeniorNum && dform.doctorSeniorNum !== 0){
          this.showToast = true;
          this.custormAnchor('doctorSeniorNum')
          this.tip = '请输入博士人数'
          return;
        }
        if (dform.doctorSeniorNum && (parseFloat(dform.doctorSeniorNum) < 0 || !/(^[1-9]\d{0,8}$)|(^0$)/.test(dform.doctorSeniorNum))){
          this.showToast = true;
          this.custormAnchor('doctorSeniorNum')
          this.tip = '博士人数请输入九位以内非负整数';
          return;
        }
        if (dform.companyRoundNum && (dform.doctorSeniorNum-0 > dform.companyRoundNum)){
          this.showToast = true;
          this.custormAnchor('doctorSeniorNum')
          this.tip = '博士人数不能大于企业人员总数';
          return;
        }
        if(isNeedCheck('middleTitleNum') && !dform.middleTitleNum && dform.middleTitleNum !== 0){
          this.showToast = true;
          this.custormAnchor('middleTitleNum')
          this.tip = '请输入中级职称人数'
          return;
        }
        if (dform.middleTitleNum && (parseFloat(dform.middleTitleNum) < 0 || !/(^[1-9]\d{0,8}$)|(^0$)/.test(dform.middleTitleNum))){
          this.showToast = true;
          this.custormAnchor('middleTitleNum')
          this.tip = '中级职称人数请输入九位以内非负整数';
          return;
        }
        if (dform.companyRoundNum && (dform.middleTitleNum-0 > dform.companyRoundNum)){
          this.showToast = true;
          this.custormAnchor('middleTitleNum')
          this.tip = '中级职称人数不能大于企业人员概数';
          return;
        }

        
        if (parseInt(this.regYear) < 2019) {
          if(isNeedCheck('sale2018') && !dform.sale2018 && dform.sale2018 !== 0){
            this.showToast = true;
            this.custormAnchor('sale2018')
            this.tip = '请输入企业2018年销售收入'
            return;
          }
          if(isNeedCheck('research2018Cost') && !dform.research2018Cost && dform.research2018Cost !== 0){
            this.showToast = true;
            this.custormAnchor('research2018Cost')
            this.tip = '请输入企业2018年研发费用'
            return;
          }

          if (parseInt(this.regYear) < 2018) {
            if(isNeedCheck('sale2017') && !dform.sale2017 && dform.sale2017 !== 0){
              this.showToast = true;
              this.custormAnchor('sale2017')
              this.tip = '请输入企业2017年销售收入'
              return;
            }
            if(isNeedCheck('research2017Cost') && !dform.research2017Cost && dform.research2017Cost !== 0){
              this.showToast = true;
              this.custormAnchor('research2017Cost')
              this.tip = '请输入企业2017年研发费用'
              return;
            }
          }
          if (parseInt(this.regYear) < 2017) {
            if(isNeedCheck('sale2016') && !dform.sale2016 && dform.sale2016 !== 0){
              this.showToast = true;
              this.custormAnchor('sale2016')
              this.tip = '请输入企业2016年销售收入'
              return;
            }
            if(isNeedCheck('research2016Cost') && !dform.research2016Cost && dform.research2016Cost !== 0){
              this.showToast = true;
              this.custormAnchor('research2016Cost')
              this.tip = '请输入企业2016年研发费用'
              return;
            }
          }
        }

        if (dform.sale2016 && (parseFloat(dform.sale2016) < 0 ||!/(^[1-9][0-9]{0,8}$)|(^[0-9]{1,9}\.\d{1,2}$)|(^0$)/.test(dform.sale2016))) {
          this.showToast = true;
          this.custormAnchor('sale2016')
          this.tip = '2016年销售收入请输入正数(最多九位)，可精确到小数点后两位';
          return;
        }
        if (dform.sale2017 &&(parseFloat(dform.sale2017) < 0 || !/(^[1-9][0-9]{0,8}$)|(^[0-9]{1,9}\.\d{1,2}$)|(^0$)/.test(dform.sale2017))) {
          this.showToast = true;
          this.custormAnchor('sale2017')
          this.tip = '2017年销售收入请输入正数(最多九位)，可精确到小数点后两位';
          return;
        }
        if (dform.sale2018 &&(parseFloat(dform.sale2018) < 0 || !/(^[1-9][0-9]{0,8}$)|(^[0-9]{1,9}\.\d{1,2}$)|(^0$)/.test(dform.sale2018))) {
          this.showToast = true;
          this.custormAnchor('sale2018')
          this.tip = '2018年销售收入请输入正数(最多九位)，可精确到小数点后两位';
          return;
        }

        if (dform.research2016Cost && (parseFloat(dform.research2016Cost) < 0 || !/(^[1-9][0-9]{0,8}$)|(^[0-9]{1,9}\.\d{1,2}$)|(^0$)/.test(dform.research2016Cost))) {
          this.showToast = true;
          this.custormAnchor('research2016Cost')
          this.tip = '2016年研发费用请输入正数(最多九位)，可精确到小数点后两位';
          return;
        }
        if (dform.research2017Cost && (parseFloat(dform.research2017Cost) < 0 || !/(^[1-9][0-9]{0,8}$)|(^[0-9]{1,9}\.\d{1,2}$)|(^0$)/.test(dform.research2017Cost))) {
          this.showToast = true;
          this.custormAnchor('research2017Cost')
          this.tip = '2017年研发费用请输入正数(最多九位)，可精确到小数点后两位';
          return;
        }
        if (dform.research2018Cost && (parseFloat(dform.research2018Cost) < 0 || !/(^[1-9][0-9]{0,8}$)|(^[0-9]{1,9}\.\d{1,2}$)|(^0$)/.test(dform.research2018Cost))) {
          this.showToast = true;
          this.custormAnchor('research2018Cost')
          this.tip = '2018年研发费用请输入正数(最多九位)，可精确到小数点后两位';
          return;
        }

        

        

        // /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
        // if (dform.chargeWx && !/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})$/.test(dform.chargeWx)) {
        //   this.showToast = true;
        //   this.tip = '微信号格式不正确'
        //   return;
        // }
        // if (!/(^0(\.\d{1,2})?$)|(^[1-9]\d*(\.\d{1,2})?$)/.test(dform.researchCost)) {
        //   this.showToast = true;
        //   this.tip = '研发费用请输入数字，可精确到小数点后两位'
        //   return;
        // }


        //以下为选填项
        if (isNeedCheck('productField') && !dform.productField){
          this.showToast = true;
          this.custormAnchor('productField')
          this.tip = '请选择技术领域';
          return;
        }
        if (isNeedCheck('qualification') && !dform.qualification){
          this.showToast = true;
          this.custormAnchor('qualification')
          this.tip = '请选择已经认定的项目/资质';
          return;
        }
        if (isNeedCheck('wantQualification') && !dform.wantQualification){
          this.showToast = true;
          this.custormAnchor('wantQualification')
          this.tip = '请选择希望申报的项目/资质';
          return;
        }
        if (isNeedCheck('wantPledge') && !dform.wantPledge){
          this.showToast = true;
          this.custormAnchor('wantPledge')
          this.tip = '请选择是否有知识产权质押需求';
          return;
        }
        if (isNeedCheck('wantTechButt') && !dform.wantTechButt){
          this.showToast = true;
          this.custormAnchor('wantTechButt')
          this.tip = '请选择是否有技术对接需求';
          return;
        }
        if (isNeedCheck('cooperationUniversities') && !dform.cooperationUniversities){
          this.showToast = true;
          this.custormAnchor('cooperationUniversities')
          this.tip = '请选择是否与高校有合作';
          return;
        }

        return true
      },
      reorganize(data) {
        let { dform } = this;
        if (dform.apply2019Status == 1) {
          // 默认data.apply2019Status = 1;
          if (dform.applyYear == '2020') {
            data.apply2019Status = 3;
          }else if(dform.applyYear == '2021'){
            data.apply2019Status = 5;
          }
        } else if(dform.apply2019Status == 2) {
          // 默认data.apply2019Status = 2;
          if (dform.applyYear == '2020') {
            data.apply2019Status = 4;
          }else if(dform.applyYear == '2021'){
            data.apply2019Status = 6;
          }
        }
      },
      submit(){
        // console.log(this.dform)
        if (this.checkValid()) {
          var self = this;
          let params = this.$route.params;
          let formData = params.data;
          console.log('this.dform:',this.dform)
          var data = Object.assign({}, formData, this.dform);
          this.reorganize(data);
          delete data.applyYear;
          this.submited = true;
          this.loading = true;
          data.source = this.$route.meta.source || '';
          data.inventionAuthPatentNum = data.inventionAuthPatentNum - 0;
          data.utilityModelPatentNum = data.utilityModelPatentNum - 0;
          data.industrialDesignPatentNum = data.industrialDesignPatentNum - 0;
          data.softCopyrightNum = data.softCopyrightNum - 0;
          console.log('data:',data)
          if (data.regAddress && data.regAddress.indexOf('江干区') === -1) {
            data.street = 0;
          }
          this.$emit('submit', data, this.isEdit);
        }
      },
      onlyNumber(value, filed){
        //先把非数字的都替换掉，除了数字和.
        this.dform[filed] = value.replace(/[^\d\.]/g,'');
        //必须保证第一个为数字而不是.
        this.dform[filed] = value.replace(/^\./g,'');
        //保证只有出现一个.而没有多个.
        this.dform[filed] = value.replace(/\.{2,}/g,'.');
        console.log('jkkkk',this.dform[filed])
        //保证.只出现一次，而不能出现两次以上
        this.dform[filed] = value.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
        //只能输入两个小数
        this.dform[filed] = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
        if (value.length > 11) {
          this.dform[filed] = value.slice(0,12)
        }
      }

    },
    watch:{
      dform: {
        handler(val, oldVal){
          console.log('val.regDate:', val.regDate)
          // 研发机构单选changge事件
          // if (val.haveResearchOrg == 1) {
          //   delete val.researchOrgLevel;
          //   this.selectObj.researchOrgLevel = [];
          // }
          // 研发、销售提示文字变更
          if (val.regDate && val.regDate.indexOf('2017') !== -1) {
            this.regYear = '2017'
            delete val.research2016Cost
            delete val.sale2016
            this.searchPlaceHolder = '输入2017/2018年研发费用即可'
            this.salePlaceHolder = '输入2017/2018年销售收入即可'
            this.transPlaceHolder = '输入2017/2018年转化数量即可'
          }
          console.log('inventionAuthPatentNum', val.inventionAuthPatentNum)
          // /(^[1-9]{1,9}$)|(^[0-9]{1,9}\.\d{1,2}$)/
          if (val.regDate && val.regDate.indexOf('2018') !== -1) {
            this.regYear = '2018'
            delete val.research2016Cost
            delete val.sale2016
            delete val.research2017Cost
            delete val.sale2017
            this.searchPlaceHolder = '输入2018年研发费用即可'
            this.salePlaceHolder = '输入2018年销售收入即可'
            this.transPlaceHolder = '输入2018年转化数量即可'
          }
          if (val.regDate && val.regDate.indexOf('2017') === -1 && val.regDate.indexOf('2018') === -1) {
            this.regYear = '2000'
            this.searchPlaceHolder = '请输入研发费用'
            this.salePlaceHolder = '请输入销售收入'
            this.transPlaceHolder = '请输入转化数量'
          }
          if (val.researchOrgLevel) {
            val.haveResearchOrg = 0
          }
          // /(^[1-9]{1,9}$)|(^[0-9]{1,9}\.\d{1,2}$)/
        },
        deep: true
      },
      whiteKeyNameList() {
        this.dform = this.createFormData();
        this.init();
      },
      formData() {
        this.dform = { ...this.dform, ...this.formData };
        this.init();
      },
      isRequired() {
        if (!this.isRequired) {
          this.requrieKeys = [...requrieKeys]
        } else {
          this.requrieKeys = [...formLableKeys]
        }
      }
    },
    // watch: {
    //   radio(){
    //     this.dform.propertyNumber = '';
    //     this.checkList = [];
    //   }
    // },
		filters: {
		  format: Filters.formatDate.format,
		  priceformat:Filters.priceformat
		}
	}
</script>
<style lang="scss">
@import  "~assets/css/cssshake.css";
	.company_form_new{
    background: #fff;border-radius: 10px 10px 0 0;overflow: hidden;
    .form_box{
      >h2{font-size: 34px;color: #114293;text-align: center;line-height: 128px;background: #deebff;border-radius: 10px 10px 0 0;}
      >label{
        font-size: 30px;color: #333;line-height: 42px;display: block;padding-left: 40px;
        i{font-size: 30px;color: #F64744;font-style: normal;}
        &.hight{color: #333;font-weight: 700;}
      }
      .subtil{padding: 0 40px;height: 48px;line-height: 48px;font-size: 30px;color: #666;margin-top: 38px;}
      .boxes_in_til{
        font-size: 30px;line-height: 42px;font-weight:700;padding-left: 40px;
      }
      .more_items{font-size:30px;width: 210px;height: 62px;line-height: 60px;border: 1PX solid #EEEEEE;color: #999;text-align: center;border-radius: 62px;margin:39px auto 0;}
      .tips{height:28px;font-size:28px;line-height: 28px; margin-top: 20px;text-align: center;color: #999;margin-bottom: 12px;}
      .form_item{
        padding: 30px 40px 0;
        >label{
          font-size: 30px;color: #333;line-height: 42px;display: block;
          i{font-size: 30px;color: #F64744;font-style: normal;}
          &.hight{color: #333;font-weight: 700;}
        }
        .form_item_content{
          position: relative;border-bottom: 1px solid #eee;padding:29px 0 15px;
          >img{width: 12px;position: absolute;right: 0; bottom: 31%;}
          .text{width: 100%;border:0;background-color: transparent;line-height: 42px;font-size: 30px;color: #333333;padding-right: 30px;
            &.pl{color: #bbb;}
          }
          input{width: 100%;border:0;background-color: transparent;height: 42px;line-height: 42px;font-size: 30px;color: #333333;}
          input[disabled="disabled"]{color: #999;opacity:1; -webkit-text-fill-color:#999;-webkit-opacity:1;}
          textarea{width:630px;height:312px;background-color: #f3f3f3;border-color: #f3f3f3;line-height: 42px;font-size: 30px;padding: 10px 20px;resize: none;color: #333333;}
          .textarea_num{position: absolute; right: 20px; bottom: 5px;line-height: 30px;font-size: 24px;font-style: normal;}
          .applyStatus{line-height: 42px;}
          .platformLabel{
            display: inline-block;border: 1px solid #e5e5e5;line-height: 60px;height: 60px;padding: 0 30px;font-size: 30px;border-radius: 6px;color: #333;text-decoration: none;margin-right: 20px;margin-top: 20px;background: #eee;color: #999;
            &.activeLabel{color: #2F80F6;border-color: #2f80f6;background: #fff;text-decoration: none;}
            &:visted{text-decoration: none;}
            &:last-child{margin-right: 0;}
          }
          &.checkbox_row{
            padding-bottom: 0;border-bottom: 0;
            .el-checkbox__label{color: #333;font-size: 30px;}
          }
          &.has_extarea{margin-top: 20px; padding-top: 0;padding-bottom: 40px;background-color: #f3f3f3;border-bottom:0;}
          &.fle{display: flex;
            p{width: 150px;font-size: 30px;color: #333;line-height: 42px;height: 42px;}
            input{flex-grow: 1;line-height: 42px;height: 42px;}
          }
          &.fle2{display: flex;
            p{width: 300px;font-size: 30px;color: #333;line-height: 42px;height: 42px;}
            input{flex-grow: 1;line-height: 42px;height: 42px;}
          }
          &.fle3{display: flex;
            .cls{width: 240px;}
            p{width: 202px;font-size: 30px;color: #333;line-height: 42px;height: 42px;}
            input{flex-grow: 1;line-height: 42px;height: 42px;}
            .vux-cell-box{transform: translateY(3px);flex-grow: 1;}
          }
          &.fle4{display: flex;flex-direction: row;justify-content: flex-start;
            p{flex-basis: 340px;font-size: 30px;color: #333;line-height: 42px;height: 42px;}
            input{width: 330px; line-height: 42px;height: 42px;}
          }
          &.fle5{display: flex;flex-direction: row;justify-content: flex-start;
            p{flex-basis: 230px;font-size: 30px;color: #333;line-height: 42px;height: 42px;}
            input{width: 440px; line-height: 42px;height: 42px;}
          }
          &.fle6{display: flex;flex-direction: row;justify-content: flex-start;
            p{flex-basis: 400px;font-size: 30px;color: #333;line-height: 42px;height: 42px;}
            input{width: 270px;line-height: 42px;height: 42px;}
          }
          .radio_label{
            vertical-align: top;margin-right: 30px;height: 32px;line-height: 32px;
            span{display: inline-block;width: 30px;height: 30px;border: 1px solid #409EFF;border-radius: 30px;vertical-align: top;margin-right: 10px;margin-top: 2px}
            span.hight{border: 0;background: transparent url(~assets/img/icon/hight.png) center center no-repeat;background-size:32px 32px;}
          }
          .radio_label+.radio_label{margin-left: 40px;}
          .el-radio__label{font-size: 30px;color: #333333;}
          .el-radio__inner{width: 30px;height: 30px;border-color: #409EFF;}
          .vux-calendar{
            .weui-cell{
              padding:0;
              .vux-label{color:#999;}
            }
            .vux-cell-primary{text-align: left;}
            &:before{border:0;}
          }
          .vux-cell-box{
            .weui-cell{
              padding:0;color:#999;
              .vux-label{color:#999;}
            }
            .vux-popup-picker-select,.vux-popup-picker-value{text-align: left!important;}
            &:before{border:0;}
          }
          .vux-datetime{
            padding: 0;height: 25px;
            .weui-cell__ft{
              text-align: left;
              span{color: #333;}
            }
            .weui-cell__ft:after{right: 0;display:none;}
          }
          &.gm{
            .vux-cell-box{
              .weui-cell__ft:after{display:none;}
            }
          }
        }
        .noborder{border-bottom:0;}
        .form_item_content_noborder{
          border-bottom:0;padding-bottom: 0;height: 62px;
        }
        .el-radio+.el-radio{margin-left: 40px;}
      }
      .has{
        background: #F8F8F8;height: 456px;padding:30px 0;color: #333333;
        .form_item{
          >label{color:#333;}
          .el-checkbox__inner{
            width: 32px;height: 32px;
            &::after{left:10px;}
          }
          .el-checkbox__label{color:#333;font-size: 32px;}
          .el-checkbox{margin-left: 0;width: 300px;}
          &:last-child{
            .form_item_content{
              border-bottom:0;text-align: left;
              label{margin-bottom: 15px;}
            }
          }
        }
      }
      .footer_btn{
        text-align: center;padding: 60px 40px 0;font-size: 28px;color: #999;
        .button{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:45px;width: 100%;height: 90px;line-height: 90px;text-align: center;font-size: 30px;color: #FFFFFF;}
      }
    }
    .fixed{
      .footer_btn{
        position: fixed;left: 0; bottom: 0; width: 100%;text-align: center;padding: 20px 40px;font-size: 28px;color: #999;background-color: #fff;
        .button{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:45px;width: 100%;height: 90px;line-height: 90px;text-align: center;font-size: 30px;color: #FFFFFF;}
      }
    }
    a:hover,a:active,a:visited{text-decoration: none;}
	}
  @keyframes fade {
    0% {
      opacity: 0.2;
    }
    100% {
      opacity: 0.8;
    }
  }
  @keyframes fade1 {
    0% {
      opacity: 0.2;
    }
    100% {
      opacity: 0.8;
    }
  }
  @keyframes fade2 {
    0% {
      opacity: 0.2;
    }
    100% {
      opacity: 0.8;
    }
  }
  .calendar-header{padding: 0.8rem 0;font-size: 34px;}
  .vux-close {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    color: #999;
    width: 24px;
    height: 24px;
    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 11px;
      width: 24px;
      height: 1px;
      background-color: currentColor;
      transform: rotate(-45deg);
    }
    &:after {
      transform: rotate(45deg);
    }
  }

  .popup0 {
    padding-bottom:15px;
    height:200px;
  }
  .popup1 {
    width:100%;
    height:100%;
  }
  .popup2 {
    padding-bottom:15px;
    height:400px;
  }
  .position-vertical-demo {
    background-color: #ffe26d;
    color: #000;
    text-align: center;
    padding: 15px;
  }
  .position-horizontal-demo {
    position: relative;
    height: 100%;
    .vux-close {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%) scale(4);
      color: #000;
    }
  }
  .selectBtn{bottom: -90px;line-height: 90px;background:linear-gradient(90deg,rgba(71,156,255,1) 0%,rgba(35,124,255,1) 100%);width: 750px;color: #fff;position: fixed;z-index: 600;animation: all .3s 0.1s;display: block;
    &.showBtn{animation: showUp .3s 0.1s;animation-fill-mode: forwards;}
  }
  @keyframes showUp{
    0%{
      bottom: -90px;
    }
    100%{
      bottom: 0;
    }
  }
  .vux-popup-dialog {
    border-radius:6px 6px 0px 0px;
    .title{display: flex;line-height: 95px;background: #fff;padding: 0 30px;font-size: 32px;border-bottom: none;
      p{flex-grow: 1;color: #333;}
      div{width: 100px;text-align: right;color: #999;}
    }
    .weui-cell{
      border-radius: 10px 10px 0 0;
      &:first-child{padding-top: 20px;}
    }
  }

  .blank{height: 90px;}

  /* .vux-popup-header{height: 80px;line-height: 80px;font-size: 30px}
  .vux-popup-picker-placeholder, .vux-popup-picker-value, .vux-cell-placeholder,.vux-cell-value{font-size: 30px;} */
  .vux-popup-picker-placeholder, .vux-cell-placeholder{color: #bbb!important;font-size: 0.9375rem;}
  .vux-popup-picker-value, .vux-cell-value{color: #333!important;}
  .el-radio__input{vertical-align: top;}
  .el-radio__inner::after{width: 10px; height: 10px;}
  input::-webkit-input-placeholder{
    font-size: 30px;
    color: #bbb;
  }



  .vux-cell-box:not(:first-child):before {
    content: " ";
    position: absolute;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    left: 15px;
  }
  .vux-popup-picker-header {
    height: 88px;
  }

  .vux-popup-picker-header-menu {
    padding-left: 30px;
    line-height: 88px;
  }
  .vux-popup-picker-header-menu-right {
    padding-right: 30px;
  }

  .vux-popup-picker-select-box.weui-cell__bd:after {
    height: 12px;
    width: 12px;
    border-width: 4px 4px 0 0;
    top: -4px;
    top: 50%;
    right: 30px;
    margin-top: -6px;
  }

  input{vertical-align: top;}

</style>
