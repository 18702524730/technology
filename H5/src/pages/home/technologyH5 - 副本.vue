<template>
	<div class="home_page">
    <div class="header">
      <img class="logo" src="~assets/img/index/hj_logo.png" alt="">
      <h1>江干区企业项目申报培育库</h1>
      <!-- <p class="date">（2018-2020年）</p> -->
      <a class="test_btn" @click.prevent="custormAnchor('test_til')">
        <span>企业项目评估报告</span>
        <img src="~assets/img/index/rightIcon.png" alt="">
      </a>
    </div>
		<div class="platform">
      <!-- <div class="boxes" style="text-align: center;">
        <img class="file" src="~assets/img/index/file.png" alt="">
      </div>
      <div class="boxes chart">
        <h4>江干区“国高企”数量争取实现倍增</h4>
        <img src="~assets/img/index/chart.png">
      </div> -->
      <div class="boxes support">
        <h4>高新技术企业相关政策</h4>
        <p class="top">“国高企”申请认定成功后，企业可享受</p>
        <span>1</span>
        <h2>市区两级财政给予申报补助<b>20万元</b></h2>
        <h2 style="padding-top: 0">认定奖励<b>40万元</b>，共计<b>60万元</b></h2>
        <span>2</span>
        <h2>企业所得税减按<b>15%</b>征收</h2>
        <p class="bot" style="padding-bottom: 0;border: none;">在江干区注册的企业首次认定为“市高企” <br>可<b>享受10万元</b>的政府补助</p>
      </div>

      <div class="boxes test" id="test_til">
        <h2>企业项目评估报告</h2>
        <form>
          <div class="form_item" id="company">
            <label for="companyName"><i>*</i>企业名称:</label>
            <div class="form_item_content">
              <input type="text" v-model="dform.companyName" id="companyName" maxlength="30" placeholder="请输入企业名称" />
            </div>
          </div>
          <!--  -->
          <div class="form_item"  id="regDate">
            <label><i>*</i>企业注册时间:</label>
            <div class="form_item_content">
              <calendar title="" placeholder="请选择日期" v-model="dform.regDate" disable-future></calendar>
              <img src="~assets/img/index/right.png" alt="">
            </div>
          </div>
          <div class="form_item" id="street">
            <label><i>*</i>企业所在街道:</label>
            <div class="form_item_content gm">
              <popup-picker :title="''" :data="streetList" v-model="selectObj.street" @on-change="onChange(selectObj.street, 'street')" placeholder="请选择企业所在街道"></popup-picker>
              <img src="~assets/img/index/right.png" alt="">
            </div>
          </div>
          <div class="form_item" id="companySize">
            <label><i>*</i>企业规模:</label>
            <div class="form_item_content gm">
              <popup-picker :title="''" :data="companySizeList" v-model="selectObj.companySize" @on-change="onChange(selectObj.companySize, 'companySize')" placeholder="请选择企业规模"></popup-picker>
              <img src="~assets/img/index/right.png" alt="">
            </div>
          </div>
          <div class="form_item" id="productField">
            <label><i>*</i>技术领域:</label>
            <div class="form_item_content gm">
              <popup-picker :title="''" :data="productFieldList" v-model="selectObj.productField" @on-change="onChange(selectObj.productField, 'productField')" placeholder="请选择技术领域"></popup-picker>
              <img src="~assets/img/index/right.png" alt="">
            </div>
            <!-- <div class="form_item_content">
              <p :class="['text', productField ? '' : 'pl']" @click="handleSelectPro('proShowState')">{{productField ? productField : '请选择技术领域'}}</p>
              <img src="~assets/img/index/right.png" @click="handleSelectPro('proShowState')" alt="">
              <div v-transfer-dom>
                <popup v-model="proShowState" position="bottom" max-height="50%">

                  <check-list :options="commonList" ref="proObject" v-model="dform.productItem" label-position="left"  @on-change="change(dform.productItem, 'productField')"></check-list>
                  <div class="blank"></div>
                </popup>
                <button v-show="proShowState" :class="['selectBtn' ,proShowState ? 'showBtn' : '']" @click="confirmPro" type="button"> 确定 </button>
              </div>
            </div> -->
          </div>
          <div class="form_item" id="salePrice">
            <label><i>*</i>企业近三年研发费用(万元):</label>
            <div class="form_item_content fle">
              <p :style="{'color': regYear == '2017' || regYear == '2018' ? '#bbb' : '#333'}">2016年</p>
              <input
              type="text"
              :disabled="regYear == '2017' || regYear == '2018'"
              @keyup="dform.research2016Cost = dform.research2016Cost.slice(0, 12)"
              v-model="dform.research2016Cost"
              :placeholder="regYear == '2017' || regYear == '2018' ? searchPlaceHolder : '请输入2016年研发费用'" />
            </div>
            <div class="form_item_content fle">
              <p :style="{'color': regYear == '2018' ? '#bbb' : '#333'}">2017年</p>
              <input type="text" @keyup="dform.research2017Cost = dform.research2017Cost.slice(0, 12)" :disabled="regYear == '2018'" v-model="dform.research2017Cost" :placeholder="regYear == '2018' ? searchPlaceHolder : '请输入2017年研发费用'" />
            </div>
            <div class="form_item_content fle">
              <p>2018年</p>
              <input type="text" v-model="dform.research2018Cost" placeholder="请预估2018年研发费用" />
            </div>
          </div>
          <div class="form_item">
            <label><i>*</i>企业近三年销售收入(万元):</label>
            <div class="form_item_content fle" id="sale2016">
              <p :style="{'color': regYear == '2017' || regYear == '2018' ? '#bbb' : '#333'}">2016年</p>
              <input type="text" :disabled="regYear == '2017' || regYear == '2018'" v-model="dform.sale2016" @keyup="dform.sale2016 = dform.sale2016.slice(0, 12)" :placeholder="regYear == '2017' || regYear == '2018' ? salePlaceHolder : '请输入2016年销售收入'" />
            </div>
            <div class="form_item_content fle" id="sale2017">
              <p :style="{'color': regYear == '2018' ? '#bbb' : '#333'}">2017年</p>
              <input type="text" @keyup="dform.sale2017 = dform.sale2017.slice(0, 12)" :disabled="regYear == '2018'" v-model="dform.sale2017" :placeholder=" regYear == '2018' ? salePlaceHolder : '请输入2017年销售收入'" />
            </div>
            <div class="form_item_content fle" id="sale2018">
              <p>2018年</p>
              <input type="text" v-model="dform.sale2018" maxlength="15" placeholder="请预估2018年销售收入" />
            </div>
          </div>
          <div class="form_item">
            <label><i>*</i>知识产权:</label>
            <div :class="['form_item_content', dform.haveIntellectualProperty == 1 ? 'noborder' : '']">
              <el-radio v-model="dform.haveIntellectualProperty" :label="2">无知识产权</el-radio>
              <el-radio v-model="dform.haveIntellectualProperty" :label="1">有知识产权(商标除外)</el-radio>
            </div>
          </div>
          <div class="form_item" v-if="dform.haveIntellectualProperty==1">
            <div class="form_item_content fle2">
              <p>发明专利</p>
              <input type="text" v-model="dform.inventionAuthPatentNum" :maxlength="9" placeholder="请输入专利数量" />
            </div>
            <div class="form_item_content fle2">
              <p>实用新型专利</p>
              <input type="text" v-model="dform.utilityModelPatentNum" :maxlength="9" placeholder="请输入专利数量" />
            </div>
            <div class="form_item_content fle2">
              <p>外观设计专利</p>
              <input type="text" v-model="dform.industrialDesignPatentNum" :maxlength="9" placeholder="请输入专利数量" />
            </div>
            <div class="form_item_content fle2">
              <p>软件著作权</p>
              <input type="text" v-model="dform.softCopyrightNum" :maxlength="9" placeholder="请输入软件著作权数量" />
            </div>
            <div class="form_item_content fle3 gm">
              <p>知识产权贯标</p>
              <popup-picker :title="''" :data="intellectualPropertyIsoList" v-model="selectObj.intellectualPropertyIso" @on-change="onChange(selectObj.intellectualPropertyIso,'intellectualPropertyIso')" placeholder="请选择贯标状态"></popup-picker>
              <img src="~assets/img/index/right.png" alt="">
            </div>
          </div>
          <div class="form_item" id="haveResearchOrg">
            <label><i>*</i>是否设有研发机构或平台:</label>
            <div :class="['form_item_content', dform.haveResearchOrg == 0 ? '' : '']">
              <!-- <el-radio v-model="dform.haveResearchOrg" :label="0">是</el-radio>
              <el-radio v-model="dform.haveResearchOrg" :label="1">否</el-radio> -->
              <a
              v-for="(item, index) in researchOrgLevelList"
              :key="index"
              :class="['platformLabel', index === labelActiveIndex ? 'activeLabel' : '']"
              @click="clickLabel(item, index)"
              href="javascript:void(0)">{{item.name}}</a>
            </div>
          </div>
          <!-- <div class="form_item" v-if="dform.haveResearchOrg==0" >
            <div class="form_item_content fle3 gm">
              <p class="cls">机构或平台级别
              </p>
              <popup-picker :title="''" :data="researchOrgLevelList" v-model="selectObj.researchOrgLevel" @on-change="onChange(selectObj.researchOrgLevel,'researchOrgLevel')" placeholder="请选择级别"></popup-picker>
              <img src="~assets/img/index/right.png" alt="">
            </div>
          </div> -->
          <div class="form_item">
            <label><i>*</i>是否有知识产权质押融资需求:</label>
            <div class="form_item_content">
              <el-radio v-model="dform.wantPledge" :label="1">有</el-radio>
              <el-radio v-model="dform.wantPledge" :label="2">没有</el-radio>
            </div>
          </div>
          <div class="form_item">
            <label><i>*</i>是否有技术对接需求(规划、购买、转化等):</label>
            <div class="form_item_content">
              <el-radio v-model="dform.wantTechButt" :label="1">有</el-radio>
              <el-radio v-model="dform.wantTechButt" :label="2">没有</el-radio>
            </div>
          </div>
          <div class="form_item" id="qualification">
            <label><i>*</i>已获得的资质荣誉(可多选):</label>
            <div class="form_item_content">
              <p :class="['text', qualification ? '' : 'pl']" @click="handleSelectPro('hasHonorState')">{{qualification ? qualification : '请选择资质荣誉'}}</p>
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

          <div class="form_item">
            <label><i>*</i>希望申请的资质荣誉(可多选):</label>
            <div class="form_item_content">
              <p :class="['text', wantQualification ? '' : 'pl']" @click="handleSelectPro('hopeHonorState')">{{wantQualification ? wantQualification : '请选择希望申请的资质荣誉'}}</p>
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
          <div class="form_item"  id="apply2019Status">
            <label><!-- <i>*</i> -->国家高新技术企业认定计划:</label>
            <div class="form_item_content">
              <div class="applyStatus">
                <el-radio v-model="dform.apply2019Status" :label="1">新认定</el-radio>
                <el-radio v-model="dform.apply2019Status" :label="2">复评</el-radio>
                <el-radio v-model="dform.apply2019Status" :label="7">暂无意向</el-radio>
              </div>
              <div v-if="dform.apply2019Status != 7">
                <a
                v-for="(item, index) in applyYearList"
                :key="index"
                :class="['platformLabel', index === applyYearIndex ? 'activeLabel' : '']"
                @click="clickApplyYear(item, index)"
                href="javascript:void(0)">{{item}}</a>
              </div>
            </div>
          </div>




          <div class="form_item">
            <label for="contact"><i>*</i>联系人:</label>
            <div class="form_item_content">
              <input type="text" id="contact" v-model="dform.contact" maxlength="14" placeholder="请输入联系人姓名" />
            </div>
          </div>
          <div class="form_item">
            <label for="contactNumber"><i>*</i>联系人手机号:</label>
            <div class="form_item_content">
              <input type="text" id="contactNumber" v-model="dform.contactNumber" maxlength="11" placeholder="请输入联系人手机号" />
            </div>
          </div>
          <div class="form_item">
            <label for="chargeName"><i>*</i>企业负责人(法人/分管副总):</label>
            <div class="form_item_content">
              <input type="text" id="chargeName" v-model="dform.chargeName" maxlength="14" placeholder="请输入企业负责人姓名" />
            </div>
          </div>
          <div class="form_item">
            <label for="chargeNumber"><i>*</i>企业负责人手机号:</label>
            <div class="form_item_content">
              <input type="text" id="chargeNumber" v-model="dform.chargeNumber" maxlength="11" placeholder="请输入企业负责人手机号" />
            </div>
          </div>
          <div class="form_item">
            <label for="chargeWx">企业负责人微信号:</label>
            <div class="form_item_content">
              <input type="text" id="chargeWx" v-model="dform.chargeWx" maxlength="20" placeholder="请输入企业负责人微信号" />
            </div>
          </div>
          <div class="footer">
            <button @click.prevent="submit">提交</button>
            <p class="tip">如有疑惑请咨询专家</p>
            <a class="phone" href="tel:0571-28253793 ">0571-28253793 </a> 或 <a class="phone" href="tel:0571-28253778">0571-28253778</a>
            <img src="~assets/img/index/logoBot.jpg" alt="">
            <h5>长三角(杭州·江干)科技大市场版权所有</h5>
            <p class="tec">技术支持单位：杭州拾贝知识产权服务有限公司</p>
          </div>
        </form>
      </div>
		</div>
    <!-- <div v-transfer-dom>
      <alert v-model="show" :title="$t('Congratulations')" @on-show="onShow" @on-hide="onHide"> {{ $t('Your Message is sent successfully~') }}</alert>
    </div> -->
    <toast v-model="showToast" type="warn">{{tip}}</toast>
    <loading :show="loading" text="请稍后"></loading>
	</div>
</template>
<script>
	import Vue from 'vue'
  import qs from 'qs'
  	import Filters from 'src/utils/filters.js';
  import { AlertModule, TransferDom, XButton} from 'vux'

	const title = '拾贝商城，你掌上的知识产权服务平台。';
	const link = 'https://wechat.ipsebe.com/weixin/wechat/oauth2servlet';
	const imgUrl = 'https://sebe360test.oss-cn-beijing.aliyuncs.com/B6D57E3A24A407100265911B94032EB0.jpg';
  const cartUrl = CONFIG.cartUrl;
  const indexUrl = CONFIG.indexUrl;
  const addUrl = cartUrl + '/hightech/addHightech.htm';
  const hightechApi = indexUrl + '/techCompanyPlan';
  const setPageViewUrl = indexUrl + '/setPageView';
  const honor = ['无','国家高新技术企业','市级高新技术企业','杭州市初创型企业','浙江省科技型中小企业','市级研发机构','市专利试点、示范企业','市、区名牌产品','市、区政府质量奖','市重大技术创新项目', 'CNAS实验室'];
  const wantHonor = ['无', '浙江省科技型中小企业', '市级高新技术企业', '国家高新技术企业', '各级研发中心', '专利试点示范企业/专利奖', '名牌产品、政府质量奖', '省级新产品/新技术']
	export default {
    directives: {
      TransferDom
    },
		data() {
		  return {
        searchPlaceHolder: '请输入研发费用',
        salePlaceHolder: '请输入销售收入',
        regYear: '2000',
        labelActiveIndex: 3,
        loading: false,
        submited: false,
        showToast:false,
        applyYearIndex: 0,
        tip: '',
        companyScale:[],
        proShowState: false,
        hasHonorState: false,
        hopeHonorState: false,
        companyStreet: [],
        yearSale:[],
        productField: '',
        qualification: '',
        wantQualification: '',
        qualificationItem: [],
        wantQualificationItem: [],
        companySizeList: [['50人以下', '50-100人', '100人以上']],
        applyYearList: ['2019', '2020', '2021'],
        list2: [['5000万以下', '5000万-2亿', '2亿以上']],
        streetList: [['闸弄口街道','凯旋街道','采荷街道','四季青街道','笕桥街道','彭埠街道','钱塘智慧城','丁兰街道']],
        researchOrgLevelList: [
          {name: '国家级', id: 4},
          {name: '省级', id: 3},
          {name: '市级', id: 2},
          // {name: '区级', id: 1},
          {name: '未设有', id: 5}
        ],
        productFieldList: [[ '电子信息', '生物与新医药', '航空航天', '新材料', '高技术服务', '新能源与节能', '资源与环境', '先进制造及自动化' ]],
        intellectualPropertyIsoList: [['未实施', '实施中', '取得证书']],
        honor,
        wantHonor,
        dform:{
          companyName:'',
          regDate: '',
          street: '',
          companySize: '',
          inventionAuthPatentNum: '',
          apply2019Status: 7,
          applyYear:'2019',
          productField: '',
          research2016Cost: '',
          haveIntellectualProperty: 2,
          wantPledge: 1,
          wantTechButt: 1,
          haveResearchOrg: 0,
          productItem: [], // 技术领域
          wantQualificationItem: [],
          researchOrgLevel: 5,
          qualificationItem: []
        },
        selectObj: {
          apply2019Status: [],
          street: [],
          companySize: [],
          productField: [],
          researchOrgLevel: [],
          intellectualPropertyIso: []
        },
        radio: '0',
        platformRadio: '0',
        checkList:[]
		  }
    },
    components: {
      XButton
    },
		mounted(){
      //this.wxShare(title,link,imgUrl,this.path); //微信分享  在mian.js里Vue的原型里已定义
      // .vux-popup-mask
      this.$http.post(setPageViewUrl)
      document.getElementsByClassName('.vux-popup-mask').touchstart = function (e) {e.preventDefault();}
		},
		methods: {
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
      change (val, filed) {
        console.log('change', val, filed)
        console.log('aaaaaaa', this[filed+'Item'])
        let non = val.findIndex(item => (item === '无'))
        console.log('index', non)
        // if (non != -1 && val.length > 1) {
        //   val = ['无']
        //   this[filed+'Item'] = ['无']
        //   console.log('aaaaaaa', this[filed+'Item'])
        // }
        if (val[0] == '无'&&val.length==1) {

        } else if(val[0] != '无' &&non != -1 && val.length > 1){
          val = ['无']
          this[filed+'Item'] = ['无']
          console.log('aaaaaaa', this[filed+'Item'])
        } else if (val[0] === '无'&&val.length > 1){
          this[filed+'Item'] = val.filter(item => (item != '无'))
        }

        this.dform[filed] = val.join(',')
        this[filed] = val.join('/')
        console.log('dform', this.dform)
      },
      onShow () {
        console.log('on show')
      },
      onHide (type) {
        console.log('on hide', type)
      },
      onChange (val, filed) {
        console.log('val change', val, filed ,this.companyStreet)
        if (filed === 'productField') {
          this.dform[filed] = val[0]
        } else {
          this.dform[filed] = this[filed+'List'][0].findIndex(item => (item === val[0])) + 1
        }

        console.log(this.dform)
      },
      checkValid(){
        console.log('subdform', this.dform)
        if (!this.dform.companyName) {
          this.showToast = true;
          this.custormAnchor('company')
          this.tip = '请输入企业名称'
          return;
        }
        if (!this.dform.regDate) {
          this.showToast = true;
          this.tip = '请选择注册时间'
          this.custormAnchor('regDate')
          return;
        }
        if (!this.dform.street){
          this.showToast = true;
          this.custormAnchor('street')
          this.tip = '请选择企业所在街道';
          return;
        }

        if (!this.dform.companySize){
          this.showToast = true;
          this.custormAnchor('companySize')
          this.tip = '请选择企业规模';
          return;
        }
        if (!this.dform.productField){
          this.showToast = true;
          this.custormAnchor('productField')
          this.tip = '请选择技术领域';
          return;
        }
        if (parseInt(this.regYear) < 2019) {
          if(!this.dform.sale2018){
            this.showToast = true;
            this.custormAnchor('salePrice')
            this.tip = '请输入企业2018年销售收入'
            return;
          }
          if(!this.dform.research2018Cost){
            this.showToast = true;
            this.custormAnchor('salePrice')
            this.tip = '请输入企业2018年研发费用'
            return;
          }

          if (parseInt(this.regYear) < 2018) {
            if(!this.dform.sale2017){
              this.showToast = true;
              this.custormAnchor('salePrice')
              this.tip = '请输入企业2017年销售收入'
              return;
            }
            if(!this.dform.research2017Cost){
              this.showToast = true;
              this.custormAnchor('salePrice')
              this.tip = '请输入企业2017年研发费用'
              return;
            }
          }
          if (parseInt(this.regYear) < 2017) {
            if(!this.dform.sale2016){
              this.showToast = true;
              this.custormAnchor('salePrice')
              this.tip = '请输入企业2016年销售收入'
              return;
            }
            if(!this.dform.research2016Cost){
              this.showToast = true;
              this.custormAnchor('salePrice')
              this.tip = '请输入企业2016年研发费用'
              return;
            }
          }
        }

        if (this.dform.research2016Cost && (parseFloat(this.dform.research2016Cost) < 0 || !/(^[1-9][0-9]{0,8}$)|(^[0-9]{1,9}\.\d{1,2}$)|(^0$)/.test(this.dform.research2016Cost))) {
          this.showToast = true;
          this.custormAnchor('salePrice')
          this.tip = '2016年研发费用请输入正数(最多九位)，可精确到小数点后两位';
          return;
        }
        if (this.dform.research2017Cost && (parseFloat(this.dform.research2017Cost) < 0 || !/(^[1-9][0-9]{0,8}$)|(^[0-9]{1,9}\.\d{1,2}$)|(^0$)/.test(this.dform.research2017Cost))) {
          this.showToast = true;
          this.custormAnchor('salePrice')
          this.tip = '2017年研发费用请输入正数(最多九位)，可精确到小数点后两位';
          return;
        }
        if (this.dform.research2018Cost && (parseFloat(this.dform.research2018Cost) < 0 || !/(^[1-9][0-9]{0,8}$)|(^[0-9]{1,9}\.\d{1,2}$)|(^0$)/.test(this.dform.research2018Cost))) {
          this.showToast = true;
          this.custormAnchor('salePrice')
          this.tip = '2018年研发费用请输入正数(最多九位)，可精确到小数点后两位';
          return;
        }

        if (this.dform.sale2016 && (parseFloat(this.dform.sale2016) < 0 ||!/(^[1-9][0-9]{0,8}$)|(^[0-9]{1,9}\.\d{1,2}$)|(^0$)/.test(this.dform.sale2016))) {
          this.showToast = true;
          this.custormAnchor('salePrice')
          this.tip = '2016年销售收入请输入正数(最多九位)，可精确到小数点后两位';
          return;
        }
        if (this.dform.sale2017 &&(parseFloat(this.dform.sale2017) < 0 || !/(^[1-9][0-9]{0,8}$)|(^[0-9]{1,9}\.\d{1,2}$)|(^0$)/.test(this.dform.sale2017))) {
          this.showToast = true;
          this.custormAnchor('salePrice')
          this.tip = '2017年销售收入请输入正数(最多九位)，可精确到小数点后两位';
          return;
        }
        if (this.dform.sale2018 &&(parseFloat(this.dform.sale2018) < 0 || !/(^[1-9][0-9]{0,8}$)|(^[0-9]{1,9}\.\d{1,2}$)|(^0$)/.test(this.dform.sale2018))) {
          this.showToast = true;
          this.custormAnchor('salePrice')
          this.tip = '2018年销售收入请输入正数(最多九位)，可精确到小数点后两位';
          return;
        }

        if (this.dform.inventionAuthPatentNum && (parseFloat(this.dform.inventionAuthPatentNum) < 0 || !/(^[1-9]\d{0,8}$)|(^0$)/.test(this.dform.inventionAuthPatentNum))){
          this.showToast = true;
          // invent
          this.custormAnchor('salePrice')
          this.tip = '发明授权专利数量请输入九位以内非负整数';
          return;
        }
        if (this.dform.utilityModelPatentNum && (parseFloat(this.dform.utilityModelPatentNum) < 0 ||!/(^[1-9]\d{0,8}$)|(^0$)/.test(this.dform.utilityModelPatentNum))){
          this.showToast = true;
          this.custormAnchor('salePrice')
          this.tip = '实用新型专利数量请输入九位以内非负整数';
          return;
        }
        // /(^[1-9]{1,9}$)|(^[0-9]{1,9}\.\d{1,2}$)/
        if (this.dform.industrialDesignPatentNum && (parseFloat(this.dform.industrialDesignPatentNum) < 0 ||!/(^[1-9]\d{0,8}$)|(^0$)/.test(this.dform.industrialDesignPatentNum))){
          this.showToast = true;
          this.custormAnchor('salePrice')
          this.tip = '外观设计专利数量请输入九位以内非负整数';
          return;
        }

        if (this.dform.softCopyrightNum && (parseFloat(this.dform.softCopyrightNum) < 0 ||!/(^[1-9]\d{0,8}$)|(^0$)/.test(this.dform.softCopyrightNum))){
          this.showToast = true;
          this.custormAnchor('salePrice')
          this.tip = '软件著作权数量请输入九位以内非负整数';
          return;
        }

        if (this.dform.haveIntellectualProperty == 1 && (!this.dform.inventionAuthPatentNum && !this.dform.utilityModelPatentNum && !this.dform.industrialDesignPatentNum && !this.dform.softCopyrightNum && !this.dform.intellectualPropertyIso)) {
          this.showToast = true;
          this.custormAnchor('salePrice')
          this.tip = '请输入专利数量或知识产权贯标'
          return
        }
        if (!this.dform.researchOrgLevel){
          this.showToast = true;
          this.custormAnchor('haveResearchOrg')
          this.tip = '请选择机构或者平台级别'
          return;
        }
        if (!this.dform.wantPledge){
          this.showToast = true;
          this.custormAnchor('haveResearchOrg')
          this.tip = '请选择是否有知识产权质押需求'
          return;
        }
        if (!this.dform.qualification) {
          this.showToast = true;
          this.custormAnchor('haveResearchOrg')
          this.tip = '请选择资质荣誉';
          return;
        }
        if (!this.dform.wantQualification) {
          this.showToast = true;
          this.custormAnchor('haveResearchOrg')
          this.tip = '请选择希望申请的资质荣誉';
          return;
        }

        /*if (this.dform.apply2019Status){
          this.showToast = true;
          this.tip = '请选择2019年国家高新技术企业认定状态';
          this.custormAnchor('apply2019Status')
          return;
        }*/

        if (!this.dform.contact	){
          this.showToast = true;
          this.custormAnchor('qualification')
          this.tip = '请输入联系人姓名';
          return;
        }
        if (!this.dform.contactNumber){
          this.showToast = true;
          this.custormAnchor('qualification')
          this.tip = '请输入联系人手机号';
          return;
        }
        // (\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}
        // var pattern = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/;
        // /^(1[0-9])\d{9}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/
        if (!/^(1[3-9])\d{9}$/.test(this.dform.contactNumber)) {
          this.showToast = true;
          this.tip = '请输入正确的联系人手机号'
          return;
        }
        if (!this.dform.chargeName){
          this.showToast = true;
          this.tip = '请输入企业负责人姓名';
          return;
        }
        if (!this.dform.chargeNumber){
          this.showToast = true;
          this.tip = '请输入企业负责人手机号';
          return;
        }
        if (!/^(1[3-9])\d{9}$/.test(this.dform.chargeNumber)) {
          this.showToast = true;
          this.tip = '请输入正确的企业负责人手机号'
          return;
        }
        // /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
        // if (this.dform.chargeWx && !/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})$/.test(this.dform.chargeWx)) {
        //   this.showToast = true;
        //   this.tip = '微信号格式不正确'
        //   return;
        // }
        // if (!/(^0(\.\d{1,2})?$)|(^[1-9]\d*(\.\d{1,2})?$)/.test(this.dform.researchCost)) {
        //   this.showToast = true;
        //   this.tip = '研发费用请输入数字，可精确到小数点后两位'
        //   return;
        // }

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
          var data = Object.assign({}, this.dform);
          this.reorganize(data);
          delete data.applyYear;
          console.log(data)
          this.submited = true;
          this.loading = true;
          data.source = this.$route.meta.source || '';
          data.inventionAuthPatentNum = parseInt(data.inventionAuthPatentNum)
          data.utilityModelPatentNum = parseInt(data.utilityModelPatentNum)
          data.industrialDesignPatentNum = parseInt(data.industrialDesignPatentNum)
          data.softCopyrightNum = parseInt(data.softCopyrightNum)
          self.$http.post(hightechApi, data)
          // self.$http.post(addUrl, data)
          .then((resp) => {
            console.log('resp', resp)
            this.$router.push({path: '/detail', query: Object.assign({}, resp, {street: this.streetList[0][this.dform.street-1]})})
          })
          .catch((err) => {
            this.submited = false;
            this.loading = false;
            this.showToast = true;
            this.tip = '系统繁忙，请稍后再试';
          });
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
          // 知识产权单选change事件
          if (val.haveIntellectualProperty === 2) {
            val.inventionAuthPatentNum = '';
            delete val.utilityModelPatentNum;
            delete val.industrialDesignPatentNum;
            delete val.softCopyrightNum;
            delete val.intellectualPropertyIso;
            this.selectObj.intellectualPropertyIso = [];
          }

          // 研发机构单选changge事件
          // if (val.haveResearchOrg == 1) {
          //   delete val.researchOrgLevel;
          //   this.selectObj.researchOrgLevel = [];
          // }
          // 研发、销售提示文字变更
          if (val.regDate.indexOf('2017') !== -1) {
            this.regYear = '2017'
            delete val.research2016Cost
            delete val.sale2016
            this.searchPlaceHolder = '输入2017/2018年研发费用即可'
            this.salePlaceHolder = '输入2017/2018年销售收入即可'
          }
          console.log('inventionAuthPatentNum', val.inventionAuthPatentNum)
          // /(^[1-9]{1,9}$)|(^[0-9]{1,9}\.\d{1,2}$)/
          if (val.regDate.indexOf('2018') !== -1) {
            this.regYear = '2018'
            delete val.research2016Cost
            delete val.sale2016
            delete val.research2017Cost
            delete val.sale2017
            this.searchPlaceHolder = '输入2018年研发费用即可'
            this.salePlaceHolder = '输入2018年销售收入即可'
          }
          if (val.regDate.indexOf('2017') === -1 && val.regDate.indexOf('2018') === -1) {
            this.regYear = '2000'
            this.searchPlaceHolder = '请输入研发费用'
            this.salePlaceHolder = '请输入销售收入'
          }
          // /(^[1-9]{1,9}$)|(^[0-9]{1,9}\.\d{1,2}$)/
        },
        deep: true
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
@import  "~assets/css/adaptation.scss";
@import  "~assets/css/cssshake.css";
	.home_page{
    background: #022966;padding-bottom: px(20);
    .header{
      height: px(643);background:url('~assets/img/index/indexBg.png') no-repeat;background-size: 100% auto;text-align: center;
      .logo{width: px(100);margin-top: px(38);}
      >h1{font-size: px(48);color: #fff;line-height: px(66);padding: px(18) px(63) px(11);font-weight: 700;}
      .date{font-size: px(28);line-height: px(28);color: #fff;}
      .banner{width: px(750);height: px(300);}
      .red{position: absolute;left:px(72);bottom:px(-50);width: px(140);height: px(148);}
      .test_btn{margin: px(40) px(110) px(0);height: px(90);line-height: px(90);background:linear-gradient(156deg,rgba(255,38,38,1) 0%,rgba(247,121,40,1) 100%);box-shadow:0px 4px 40px 0px rgba(86,0,0,0.47);border-radius: px(200);display: block;font-size: px(32);color: #FFFFFF;text-align: center;
        img{width: px(23);vertical-align: middle;margin-top: px(-4);}
        span{
          display: inline-block;
          i{display: inline-block;width: px(16);height: px(16);border-top: 1px solid #fff;border-right: 1px solid #fff;transform: rotate(45deg) }
        }
        .preview{position: relative;top:px(-4);}
        .shake-little.shake-constant{animation-duration:3000ms;margin-left: px(5);}
        .fade.shake-constant {
          animation-duration: 1020ms;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .first{animation-delay: 0ms;animation-name: fade;}
        .second{animation-delay: 340ms;animation-name: fade1;}
        .third{animation-delay: 680ms;animation-name: fade2;}
      }
    }
		.platform{
      padding: px(0) px(20) 0;
      margin-top: px(-200);
      .boxes{
        .file{width: px(433);margin: px(31) 0;}
        background: #FFFFFF;box-shadow: 0 px(8) px(8) 0 rgba(18,89,196,0.29);border-radius: px(8);margin-top: px(20);
        h4{font-weight: 600;line-height: px(48);font-size: px(34);color: #333333;text-align: center;padding: px(60) 0 px(48);}
      }
      .chart{
        text-align: center;padding-bottom: px(60);
        h4{}
        img{width: px(544);height: px(374);margin-top: px(30);}
      }
      .support{
        padding: 0 px(50) px(215);background:#fff url('~assets/img/index/supportBg.png') no-repeat 0 bottom;background-size: 100% auto;
        >span{font-size: px(30);width: px(60);height: px(60);border-radius: px(30);background: #F87B2B;display:inline-block;text-align: center;line-height: px(60);color: #fff;margin-left: px(272);margin-top: px(20);}
        h4{padding-bottom: px(40);}
        h2{font-size: px(30);line-height: px(50);font-weight: 600;color: #666;text-align: center;padding: px(10) px(62) px(0);
          b{color: #F87B2B;}
        }
        .comfirm{padding-top: px(40);}
        p.top{font-size: px(26);line-height: px(50);text-align: center;color: #666;}
        p.bot{font-size: px(24);line-height: px(33);color: #666;padding: px(40) px(67) 0;text-align: center;
          b{font-weight: normal;color: #F87B2B;}
        }
        .cus{
          font-size: px(34);color: #333333;background: #fff url(~assets/img/home/cup.png) px(50) center no-repeat;background-size: px(80) px(80);padding-left: px(170);margin-top: px(40);padding-right: px(48);
          i{font-size: px(34);color: #151515;font-style: normal;font-weight: bold;}
          b{font-size: px(34);color: #FFA524;display: block;}
        }
        .rend{background-image: url(~assets/img/home/flag.png);margin-top: px(30);}
      }
      .test_til{
        height: px(204);text-align: center;background: transparent url(~assets/img/home/test.png) center center no-repeat;background-size: px(500) px(142);color:#fff;margin-bottom: px(-20);
        h3{padding-top: px(40);font-size: px(48);color: #FFFFFF;font-weight: normal;}
        p{font-size: px(24);color: #FFFFFF;}
      }
      .test{
        >h2{font-size: px(34);color: #114293;text-align: center;line-height: px(128);background: #deebff;border-radius: px(10) px(10) 0 0;}
        .form_item{
          padding: 0 px(40);
          >label{
            font-size: px(30);color: #666;line-height: px(42);margin-top: px(40);display: block;
            i{font-size: px(32);color: #F64744;font-style: normal;}
          }
          .form_item_content{position: relative;
            >img{width: px(12);position: absolute;right: 0; bottom: 38%;}
            border-bottom: 1px solid #E5E5E5;padding:px(20) 0 px(15);box-shadow: 0 1px 1px #fff;
            .text{width: 100%;border:0;background-color: transparent;line-height: px(42);font-size: px(30);color: #333333;padding-right: px(30);
              &.pl{color: #bbb;}
            }
            input{width: 100%;border:0;background-color: transparent;height: px(42);line-height: px(42);font-size: px(30);color: #333333;}
            &.fle{display: flex;
              p{width: px(150);font-size: px(30);color: #333;}
              input{flex-grow: 1;line-height: px(48);height: px(48);}
            }
            &.fle2{display: flex;
              p{width: px(300);font-size: px(30);color: #333;}
              input{flex-grow: 1;line-height: px(48);height: px(48);}
            }
            &.fle3{display: flex;
              .cls{width: px(240);}
              p{width: px(202);font-size: px(30);color: #333;}
              input{flex-grow: 1;line-height: px(48);height: px(48);}
              .vux-cell-box{transform: translateY(px(3));flex-grow: 1;}
            }
            .el-radio__label{font-size: px(30);color: #333333;}
            .el-radio__inner{width: px(30);height: px(30);}
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
          }
          .noborder{border-bottom:0;}
          .el-radio+.el-radio{margin-left: px(40);}
        }
        .has{
          background: #F8F8F8;height: px(456);padding:px(30) 0;color: #333333;
          .form_item{
            >label{color:#333;}
            .el-checkbox__inner{
              width: px(32);height: px(32);
              &::after{left:px(10);}
            }
            .el-checkbox__label{color:#333;font-size: px(32);}
            .el-checkbox{margin-left: 0;width: px(300);}
            &:last-child{
              .form_item_content{
                border-bottom:0;text-align: left;
                label{margin-bottom: px(15);}
              }
            }
          }
        }
        .footer{
          text-align: center;padding: px(40) px(40) px(60);font-size: px(28);color: #999;
          >img{width: px(200);margin: px(50) auto 0;font-size: 0;display: block;}
          button{background:linear-gradient(90deg,rgba(71,156,255,1) 0%,rgba(35,124,255,1) 100%);box-shadow: 0 px(4) px(40) 0 rgba(18,89,196,0.31);border-radius: px(200);width: px(630);height: px(90);line-height: px(90);text-align: center;font-size: px(32);color: #FFFFFF;}
          .tip{font-size: px(26);color: #999;line-height: px(40);padding-top: px(20);}
          .phone{font-size: px(28);color: #2A79FF;line-height: px(40);padding-top: px(2);}
          h5{font-size: px(24);color: #333;text-align: center;line-height: px(33);font-weight: normal;padding-bottom: px(5);}
          .tec{font-size: px(24);color: #999;line-height: px(33);}
        }
      }
		}
    .applyStatus{padding-bottom: 30px;}
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
  .calendar-header{padding: 0.8rem 0;font-size: px(34);}
  //.vux-popup-header-right{color: }
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
// .dia{position: relative;
//   .selectBtn{position: absolute;left: 0;top: px(-100);z-index: 1000;}
// }
.selectBtn{bottom: px(-90);line-height: px(90);background:linear-gradient(90deg,rgba(71,156,255,1) 0%,rgba(35,124,255,1) 100%);width: px(750);color: #fff;position: fixed;z-index: 600;animation: all .3s 0.1s;display: block;
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
  // background: #fff;
  .title{display: flex;line-height: px(95);background: #fff;padding: 0 px(30);font-size: px(32);border-bottom: none;
    p{flex-grow: 1;color: #333;}
    div{width: px(100);text-align: right;color: #999;}
  }
  // >div{border-radius: px(10) px(10) 0 0;}
  .weui-cell{
    border-radius: px(10) px(10) 0 0;
    &:first-child{padding-top: px(40);}
  }
}


.weui-cell{font-size: px(30);line-height: px(42);}
.blank{height: px(90);}
// .scroller-indicator{height: px(60);line-height: px(60);}
// .scroller-item{height: px(60);line-height: px(60);}
// .scroller-component{height: px(268);}
.vux-popup-header{height: px(80);line-height: px(80);font-size: px(30)}
.vux-popup-picker-placeholder, .vux-popup-picker-value, .vux-cell-placeholder,.vux-cell-value{font-size: px(30);}
.vux-popup-picker-placeholder{color: #bbb;}
.vux-popup-picker-value, .vux-cell-value{color: #333;}
.el-radio__input{vertical-align: top;}
input::-webkit-input-placeholder{
  font-size: px(30);
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
// .scroller-component {
//   height: 476px;
// }
// .scroller-mask {
//   background-size: 100% 204px;
// }
// .scroller-item {
//   text-align: center;
//   font-size: 32px;
//   height: 68px;
//   line-height: 68px;
//   color: #000;
// }

// .scroller-indicator {
//   width: 100%;
//   height: 68px;
//   position: absolute;
//   left: 0;
//   top: 204px;

// }

input{vertical-align: top;}
.form_item_content{
  .platformLabel{display: inline-block;border: 1px solid #e5e5e5;line-height: px(60);padding: 0 px(30);font-size: px(30);border-radius: px(6);
  color: #333;text-decoration: none;margin-right: px(20);margin-bottom: px(20);background: #eee;color: #999;
    &.activeLabel{color: #2F80F6;border-color: #2f80f6;background: #fff;text-decoration: none;}
    &:visted{text-decoration: none;}
    &:last-child{margin-right: 0;}
  }
}

</style>
