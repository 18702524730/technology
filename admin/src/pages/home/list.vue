<template>
	<div class="list-wrap">
		<!-- <projectStatus :curStatusId="curStatusId" :statusArr="statusArr" :projectName="projectName" @changeStatus="changeStatus"></projectStatus> -->
		<div class="table-list-wrap">
			<div class="title">
				<span>{{projectName}}</span>
				<div>截止时间：{{now}} <a-icon type="sync" @click="refresh" /></div>
			</div>
			<div class="condition">
				<a-select class="regular" allowClear placeholder="请选择街道" v-model="obj.street" v-if="isSuper">
		      <a-select-option :value="item.value" v-for="item in streetList" :key="item.value">{{item.name}}</a-select-option>
		    </a-select>
				<a-input class="regular" placeholder="请输入企业名称" v-model="obj.companyName"/>
				<a-select class="regular" allowClear placeholder="请选择入库状态" v-model="obj.isRuKu">
					<a-select-option value="0">已入库</a-select-option>
					<a-select-option value="1">未入库</a-select-option>
		    </a-select>
		    <a-select class="regular" allowClear placeholder="请选择评估结果" v-model="obj.evaResult">
					<a-select-option :value="item.value" v-for="item in evaResultList" :key="item.value">{{item.name}}</a-select-option>
		    </a-select>
				<!-- 
				<a-select class="regular" allowClear placeholder="请选择申请状态" v-model="obj.applyStatus">
					<a-select-option :value="item" v-for="item in statusList" :key="item">{{item}}</a-select-option>
		    </a-select>
		     -->
		    <a-input class="regular" placeholder="请输入联系人姓名" v-model="obj.contact"/>
		    <a-input class="regular" placeholder="请输入联系电话" v-model="obj.contactNumber"/>
		    <a-range-picker class="regular" style="width: 310px;"
		    	v-model="regDate"
		    	:placeholder="['注册时间开始', '注册时间结束']"
		    	@change="onRegDateChange"
		    />
		    <!-- :defaultValue="[moment(obj.regDateStart, 'x'), moment('1541462400000', 'x')]" -->
		    <a-select class="regular" allowClear placeholder="请选择企业规模" v-model="obj.companySize">
		      <a-select-option value="1">50人以下</a-select-option>
		      <a-select-option value="2">50~100人</a-select-option>
		      <a-select-option value="3">100人以上</a-select-option>
		    </a-select>
		    <a-select class="regular" allowClear placeholder="请选择技术领域" v-model="obj.productField">
		      <a-select-option :value="item" v-for="item in productFieldList" :key="item">{{item}}</a-select-option>
		    </a-select>
		    <a-range-picker class="regular" style="width: 310px;" v-model="createTime" :placeholder="['入库时间开始', '入库时间结束']" @change="onCreateTimeChange" />
		    <a-select class="regular" allowClear placeholder="是否有知识产权状态" v-model="obj.haveIntellectualProperty">
		      <a-select-option value="1">有</a-select-option>
		      <a-select-option value="2">无</a-select-option>
		    </a-select>
		    <a-select class="regular" allowClear placeholder="是否设有研发机构" defaultValue="" v-model="obj.researchOrgLevel">
		      <a-select-option value="2">市级</a-select-option>
		      <a-select-option value="3">省级</a-select-option>
		      <a-select-option value="4">国家级</a-select-option>
		      <a-select-option value="5">未设有</a-select-option>
		    </a-select>
		    <!-- <a-select class="regular" allowClear placeholder="请选择评估结果" v-model="obj.result">
		    					<a-select-option value="1">重点培育</a-select-option>
		    					<a-select-option value="2">培育</a-select-option>
		    </a-select> -->
		    <a-input-group class="mt10 mr10" compact style="width: 310px;">
			    <a-input style=" width: 140px; text-align: center" placeholder="2016年研发费用" v-model="obj.research2016Start" />
			    <a-input style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff" placeholder="~" disabled />
			    <a-input style="width: 140px; text-align: center; border-left: 0" placeholder="2016年研发费用" v-model="obj.research2016End"/>
			  </a-input-group>
			  <a-input-group class="mt10 mr10" compact style="width: 310px;">
			    <a-input style=" width: 140px; text-align: center" placeholder="2017年研发费用" v-model="obj.research2017Start" />
			    <a-input style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff" placeholder="~" disabled />
			    <a-input style="width: 140px; text-align: center; border-left: 0" placeholder="2017年研发费用" v-model="obj.research2017End" />
			  </a-input-group>
			  <a-input-group class="mt10 mr10" compact style="width: 310px;">
			    <a-input style=" width: 140px; text-align: center" placeholder="2018年研发费用" v-model="obj.research2018Start" />
			    <a-input style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff" placeholder="~" disabled />
			    <a-input style="width: 140px; text-align: center; border-left: 0" placeholder="2018年研发费用" v-model="obj.research2018End" />
			  </a-input-group>
			  <a-input-group class="mt10 mr10" compact style="width: 310px;">
			    <a-input style=" width: 140px; text-align: center" placeholder="2016年销售收入" v-model="obj.sale2016Start" />
			    <a-input style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff" placeholder="~" disabled />
			    <a-input style="width: 140px; text-align: center; border-left: 0" placeholder="2016年销售收入" v-model="obj.sale2016End" />
			  </a-input-group>
			  <a-input-group class="mt10 mr10" compact style="width: 310px;">
			    <a-input style=" width: 140px; text-align: center" placeholder="2017年销售收入" v-model="obj.sale2017Start" />
			    <a-input style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff" placeholder="~" disabled />
			    <a-input style="width: 140px; text-align: center; border-left: 0" placeholder="2017年销售收入" v-model="obj.sale2017End" />
			  </a-input-group>
			  <a-input-group class="mt10 mr10" compact style="width: 310px;">
			    <a-input style=" width: 140px; text-align: center" placeholder="2018年销售收入" v-model="obj.sale2018Start" />
			    <a-input style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff" placeholder="~" disabled />
			    <a-input style="width: 140px; text-align: center; border-left: 0" placeholder="2018年销售收入" v-model="obj.sale2018End" />
			  </a-input-group>
			  <!-- 
			  <a-select class="regular" showSearch allowClear optionFilterProp="children" @filterOption="filterOption" placeholder="请选择项目" v-model="obj.type" style="width: 310px;">
		      <a-select-option :value="item.value" v-for="(item, index) in typeList" :key="index">{{item.name}}</a-select-option>
		    </a-select>
		     -->
			  <div class="serach-btn">
			    <a-button class="regular-btn mt10 mr10" type="primary" @click="search">搜索</a-button>
		    	<a-button class="regular-btn mt10" @click="reset">重置</a-button>
	    	</div>
			</div>
			<div class="table-box">
			  <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="pagination">
			  	<span slot="street" slot-scope="text, record" v-if="isSuper">{{streetList[record.street-1] && streetList[record.street-1].name}}</span>
			  	<span slot="isRuKu" slot-scope="text, record">{{record.isRuKu ? "已入库":"未入库"}}</span>
			  	<span slot="evaResult" slot-scope="text, record">{{record.evaResult|evaResult}}</span>
			  	<span slot="guideAdvice" slot-scope="text, record">{{record.evaResult|guideAdvice}}</span>
			  	<span slot="regDate" slot-scope="text, record">{{record.regDate|dateFormat('date')}}</span>
			  	<!-- <span slot="companySize" slot-scope="text, record">{{record.companySize|companySize}}</span> -->
			  	<span slot="inventionAuthPatentNum" slot-scope="text, record">{{record.inventionAuthPatentNum}}</span>
			  	<span slot="softCopyrightNum" slot-scope="text, record">{{record.softCopyrightNum}}</span>
			  	<span slot="createTime" slot-scope="text, record">{{record.createTime|dateFormat}}</span>
			    <span slot="action" slot-scope="text, record">
			      <a href="javascript:;" @click="toDetail(record.id, obj.type)">查看详情</a>
			    </span>
			  </a-table>
		  </div>
	  </div>
  </div>
</template>

<script>
	import moment from 'moment';
	import Filters from 'utils/filters'
	import projectStatus from './components/projectStatus.vue'
	const { pubFilters, statusFilters } = Filters
	const productFieldList = [ '电子信息', '生物与新医药', '航空航天', '新材料', '高技术服务', '新能源与节能', '资源与环境', '先进制造及自动化' ];
	const statusList = [ '新认定2019', '复评2019', '新认定2020', '复评2020', '新认定2021', '复评2021', '暂无意向', '重认15', '复审15', '省级15', '重认16', '复审16', '省级16', '重认17', '复审17', '省级17'];
	const evaResultList = [
		{
			name:'可申报',
			value: '0',
		},
		{
			name:'未完善',
			value: '1',
		},
		{
			name:'不满足',
			value: '2',
		},
		{
			name:'已认定',
			value: '4',
		}
	];
	const streetList = [
		{
			name:'闸弄口街道',
			value: '1',
		},
		{
			name:'凯旋街道',
			value: '2',
		},
		{
			name:'采荷街道',
			value: '3',
		},
		{
			name:'四季青街道',
			value: '4',
		},
		{
			name:'笕桥街道',
			value: '5',
		},
		{
			name:'彭埠街道',
			value: '6',
		},
		{
			name:'钱塘智慧城',
			value: '7',
		},
		{
			name:'丁兰街道',
			value: '8',
		},
	];
	const columns = [
		{
		  title: '序号',
		  dataIndex: 'seqNo',
		  key: 'seqNo',
		  width: '80px',
		},
		{
		  title: '企业名称',
		  dataIndex: 'companyName',
		  key: 'companyName',
		  width: '260px',
		},
		{
		  title: '入库状态',
		  dataIndex: 'isRuKu',
		  key: 'isRuKu',
		  width: '120px',
		  scopedSlots: { customRender: 'isRuKu' },
		},
		{
		  title: '评估结果',
		  dataIndex: 'evaResult',
		  key: 'evaResult',
		  width: '120px',
		  scopedSlots: { customRender: 'evaResult' },
		},
		{
		  title: '指导意见',
		  dataIndex: 'guideAdvice',
		  key: 'guideAdvice',
		  width: '120px',
		  scopedSlots: { customRender: 'guideAdvice' },
		},
		{
		  title: '联系人',
		  dataIndex: 'contact',
		  key: 'contact',
		  width: '120px',
		},
		{
		  title: '联系电话',
		  dataIndex: 'contactNumber',
		  key: 'contactNumber',
		  width: '180px',
		},
		{
		  title: '企业注册时间',
		  dataIndex: 'regDate',
		  key: 'regDate',
		  width: '150px',
		  scopedSlots: { customRender: 'regDate' },
		},
		/*{
		  title: '企业规模',
		  dataIndex: 'companySize',
		  key: 'companySize',
		  width: '120px',
		  scopedSlots: { customRender: 'companySize' },
		},*/
		{
		  title: '技术领域',
		  dataIndex: 'productField',
		  key: 'productField',
		  width: '180px',
		},
		{
		  title: '发明授权专利(件)',
		  dataIndex: 'inventionAuthPatentNum',
		  key: 'inventionAuthPatentNum',
		  width: '170px',
		  scopedSlots: { customRender: 'inventionAuthPatentNum' },
		},
		{
		  title: '软件著作权(件)',
		  dataIndex: 'softCopyrightNum',
		  key: 'softCopyrightNum',
		  width: '150px',
		  scopedSlots: { customRender: 'softCopyrightNum' },
		},
		{
		  title: '入库时间',
		  key: 'createTime',
		  dataIndex: 'createTime',
		  width: '220px',
		  scopedSlots: { customRender: 'createTime' },
		},
		{
		  title: '操作',
		  key: 'action',
		  width: '120px',
		  scopedSlots: { customRender: 'action' },
		}
	];

	const data = [
    /*{
      "seqNo": 1,
      "id": 44,
      "identificationType": 1,
      "companyName": "很符合",
      "regDate": 1475452800000,
      "street": 1,
      "companySize": 1,
      "productField": "生物与新医药,新材料",
      "haveIntellectualProperty": 1,
      "researchOrgLevel": null,
      "contact": "V型",
      "contactNumber": "18515490316",
      "createTime": 1539311820000
    }*/
  ];

	const obj = {
		street: undefined,
		companyName: '',
		isRuKu: undefined,
		evaResult: undefined,
		//applyStatus: undefined,
		contact: '',
		contactNumber: '',
		regDateStart: '',
		regDateEnd: '',
		companySize: undefined,
		productField: undefined,
		haveIntellectualProperty: undefined,
		researchOrgLevel: undefined,
		research2016Start: '',
		research2017Start: '',
		research2018Start: '',
		research2016End: '',
		research2017End: '',
		research2018End: '',
		sale2016Start: '',
		sale2017Start: '',
		sale2018Start: '',
		sale2016End: '',
		sale2017End: '',
		sale2018End: '',
		createTimeStart: '',
		createTimeEnd: '',
		type: undefined,
		pgIndex: 1,
		pgCount: 10,
		result:undefined,
	}

	const typeList = [
		{
			value: '0',
			name: '全部'
		},
		{
			value: '1',
			name: '参与调研企业'
		},
		{
			value: '2',
			name: '“国家高新技术企业”预计企业总数'
		},
		{
			value: '3',
			name: '新认定且符合“国家高新技术企业”申报条件的企业总数(家)'
		},
		{
			value: '4',
			name: '已获评“国家高新技术企业”称号的企业总数'
		},
		{
			value: '5',
			name: '2018年已复评企业总数'
		},
		{
			value: '6',
			name: '2019年需复评企业总数'
		},
		{
			value: '7',
			name: '2020年需复评企业总数'
		},
		{
			value: '8',
			name: '2019年国高预估数量'
		},
		{
			value: '9',
			name: '2020年国高预估数量'
		},
		{
			value: '10',
			name: '“市级高新技术企业”预计企业总数'
		},
		{
			value: '11',
			name: '新认定且符合“市级高新技术企业”申报条件的企业总数(家)'
		},
		{
			value: '12',
			name: '已获评“市级高新技术企业”称号的企业总数'
		},
		{
			value: '13',
			name: '“省级科技型中小企业”预计企业总数'
		},
		{
			value: '14',
			name: '新认定且符合“省级科技型中小企业”申报条件的企业总数(家)'
		},
		{
			value: '15',
			name: '已获评“省级科技型中小企业”称号的企业总数(家)'
		},
		{
			value: '16',
			name: '“杭州市专利试点企业”预计企业总数'
		},
		{
			value: '17',
			name: '新认定且符合“杭州市专利试点企业”申报条件的企业总数(家)'
		},
		{
			value: '18',
			name: '已获评“杭州市专利试点企业”称号的企业总数(家)'
		},
		{
			value: '19',
			name: '“杭州市专利示范企业”预计企业总数'
		},
		{
			value: '20',
			name: '新认定且符合“杭州市专利示范企业”申报条件的企业总数(家)'
		},
		{
			value: '21',
			name: '已获评“杭州市专利示范企业”称号的企业总数(家)'
		},
		{
			value: '22',
			name: '“省级高新技术企业研究开发中心”预计企业总数'
		},
		{
			value: '23',
			name: '新认定且符合“省级高新技术企业研究开发中心”申报条件的企业总数(家)'
		},
		{
			value: '24',
			name: '已获评“省级高新技术企业研究开发中心”称号的企业总数(家)'
		},
		{
			value: '25',
			name: '“市级高新技术企业研究开发中心”预计企业总数'
		},
		{
			value: '26',
			name: '新认定且符合“市级高新技术企业研究开发中心”申报条件的企业总数(家)'
		},
		{
			value: '27',
			name: '已获评“市级高新技术企业研究开发中心”称号的企业总数(家)'
		},
		{
			value: '28',
			name: '省级企业技术中心”预计企业总数'
		},
		{
			value: '29',
			name: '新认定且符合“省级企业技术中心”申报条件的企业总数(家)'
		},
		{
			value: '30',
			name: '已获评“省级企业技术中心”称号的企业总数(家)'
		},
		{
			value: '31',
			name: '“市级企业技术中心”预计企业总数'
		},
		{
			value: '32',
			name: '新认定且符合“市级企业技术中心”申报条件的企业总数(家)'
		},
		{
			value: '33',
			name: '已获评“市级企业技术中心”称号的企业总数(家)'
		},
		{
			value: '34',
			name: '“浙江省重大科技计划项目”预计企业总数'
		},
		{
			value: '35',
			name: '新认定且符合“浙江省重大科技计划项目”申报条件的企业总数(家)'
		},
		{
			value: '36',
			name: '已获评“浙江省重大科技计划项目”称号的企业总数(家)'
		},
		{
			value: '37',
			name: '“杭州市重大科技计划项目”预计企业总数'
		},
		{
			value: '38',
			name: '新认定且符合“杭州市重大科技计划项目”申报条件的企业总数(家)'
		},
		{
			value: '39',
			name: '已获评“杭州市重大科技计划项目”称号的企业总数(家)'
		},
		{
			value: '40',
			name: '“市科技型初创企业培育工程”预计企业总数'
		},
		{
			value: '41',
			name: '新认定且符合“市科技型初创型企业培育工程”申报条件的企业总数(家)'
		},
		{
			value: '42',
			name: '已获评“市科技型初创企业培育工程”称号的企业总数(家)'
		},
		{
			value: '43',
			name: '重点培育'
		},
		{
			value: '44',
			name: '调研结果符合国家高新技术企业',
			projectName: '国家高新技术企业'
		},
		{
			value: '45',
			name: '调研结果符合市级高新技术企业',
			projectName: '市级高新技术企业'
		},
		{
			value: '46',
			name: '调研结果符合省级科技型中小企业',
			projectName: '省级科技型中小企业'
		},
		{
			value: '47',
			name: '调研结果符合杭州市专利试点企业',
			projectName: '杭州市专利试点企业'
		},
		{
			value: '48',
			name: '调研结果符合杭州市专利示范企业',
			projectName: '杭州市专利示范企业'
		},
		{
			value: '49',
			name: '调研结果符合省级高新技术企业研究开发中心',
			projectName: '省级高新技术企业研究开发中心'
		},
		{
			value: '50',
			name: '调研结果符合市级高新技术企业研究开发中心',
			projectName: '市级高新技术企业研究开发中心'
		},
		{
			value: '51',
			name: '调研结果符合省级企业技术中心',
			projectName: '省级企业技术中心'
		},
		{
			value: '52',
			name: '调研结果符合市级企业技术中心',
			projectName: '市级企业技术中心'
		},
		{
			value: '53',
			name: '调研结果符合浙江省重大科技计划项目',
			projectName: '浙江省重大科技计划项目'
		},
		{
			value: '54',
			name: '调研结果符合杭州市重大科技计划项目',
			projectName: '杭州市重大科技计划项目'
		},
		{
			value: '55',
			name: '调研结果符合市科技型初创企业培育工程',
			projectName: '市科技型初创企业培育工程'
		},
		{
			value: '56',
			name: '其他已认定项目企业数'
		},


		{
			value: '100',
			name: '辖区企业总数'
		},
		{
			value: '101',
			name: '科技型企业库（储备库）'
		},
		{
			value: '102',
			name: '入库科技型企业数'
		},
		{
			value: '103',
			name: '已认定未入库企业数'
		},
		{
			value: '104',
			name: '储备国家高新技术企业'
		},
		{
			value: '105',
			name: '储备市高新技术企业'
		},
		{
			value: '106',
			name: '储备升级科技型中小企业'
		},
		{
			value: '107',
			name: '储备竞争性项目'
		},
		{
			value: '108',
			name: '已认定国家高新技术企业'
		},
		{
			value: '109',
			name: '已认定市高新技术企业'
		},
		{
			value: '110',
			name: '已认定市初创科技型企业培育工程'
		},
		{
			value: '111',
			name: '已认定省科技型中小企业'
		},
		{
			value: '112',
			name: '发明专利'
		},
		{
			value: '113',
			name: '实用新型专利'
		},
		{
			value: '114',
			name: '外观专利'
		},
		{
			value: '115',
			name: '软著'
		},
		{
			value: '116',
			name: '区本级企业数'
		},
		{
			value: '117',
			name: '科研院所'
		},
		{
			value: '118',
			name: '个人'
		},


		{
			value: '119',
			name: '重点培育国家高新技术企业'
		},
		{
			value: '120',
			name: '培育市级高新技术企业'
		},
		{
			value: '121',
			name: '培育省级科技型中小企业'
		},
		{
			value: '122',
			name: '培育省级高新技术企业研究开发中心'
		},
		{
			value: '123',
			name: '培育市级高新技术企业研究开发中心'
		},
		{
			value: '124',
			name: '培育浙江省重大科技计划项目'
		},
		{
			value: '125',
			name: '培育杭州市重大科技计划项目'
		},
		{
			value: '126',
			name: '培育市科技型初创企业培育工程'
		},
		{
			value: '127',
			name: '江干百人计划'
		},
	];
	export default {
		data() {
	    return {
	    	typeList,
	    	streetList,
	    	productFieldList,
	    	statusList,
	    	evaResultList,
	    	isSuper: false,
	    	moment,
	    	now: '', //客户端现在时间
	    	createTime: [],
	    	regDate: [],
	    	obj: {...obj},
	      data,
	      columns: [...columns],
	      loading: false,
	      pagination: {
	      	current: 1,
	      	showTotal: (total) => `共${total}家 `,
	      	/*defaultCurrent: 1,
	      	defaultPageSize: 15,*/
	      	total: 0,
	      	onChange(){}
	      },
	      page: '',
	      isGg: true, // 是否是国高列表页面
	      statusArr: [],
	      curStatusId: 0,
	      projectName: '',
	    }
	  },
	  components: {
			projectStatus
		},
	  mounted() {
	  	let query = this.$route.query;
	  	// 首页面板中 已认定的4个项目入口进入列表页面， 去除'培育结果'列
	  	if (query.type == 108 || query.type == 109 || query.type == 110 || query.type == 111) {
	  		this.columns.splice(2, 1);
	  	}
	  	this.isSuper = this.$storage.get('isSuper') == 1;
	  	if (this.isSuper) {
		  	this.columns.splice(1, 0, {
				  title: '街道',
				  dataIndex: 'street',
				  key: 'street',
				  width: '120px',
				  scopedSlots: { customRender: 'street' },
				})
			}
	  	this.pageInit();
	  },
		methods: {
			pageInit () {
				this.isGg = this.$route.path.includes('nationalTech');
		  	let query = this.$route.query;
		  	this.obj = { ...obj, ...query };
		  	this.obj.street = this.obj.street == 0 ? undefined : this.obj.street;
		  	this.page = this.obj.pgIndex -0 || 1;
		  	this.now = pubFilters.filters.dateFormat(new Date().getTime());
		  	this.pagination.current = this.page;
		  	this.pagination.onChange = this.pageChange;
		  	// todo时间控件赋值有待研究, 先置空
		  	this.obj.regDateStart = '';
		  	this.obj.regDateEnd = '';
		  	this.obj.createTimeStart = '';
		  	this.obj.createTimeEnd = '';
		  	this.initListTitle();
			},
			filterOption(input, option) {
	      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
	    },
	    // 渲染项目名称
			initListTitle() {
				let query = this.$route.query;
				let type = query.type;
				typeList.some((item) => {
					if (item.value == type) {
						this.projectName = item.projectName;
						return true
					}
				})
			},
			changeStatus(id) {
				this.curStatusId = id;
			},
			custormAnchor(anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        //console.log(anchorElement)
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) { anchorElement.scrollIntoView(); }
      },
			// 返回
			back() {
				this.$router.go(-1);
			},
			// 查看详情
			toDetail(id, type) {
				let arr = this.$route.fullPath.split('/');
  			let pathName = arr[arr.length - 2]; // 第二级路由
				this.$router.push({
					path: `/home/${pathName}/detail`,
					query: {
						id,
						type
					}
				});
			},
			// 请求查询列表
			async getGgList() {
				this.obj.pgIndex = this.page;
				this.loading = true;
				if (!this.isSuper) {
					this.obj.street = this.$storage.get('streetId');
				}
				let data = this.initPostData(this.obj);
				try	{
					let resp = await this.API.tech.projectCompanyList(data) || {};
					this.loading = false;
					this.data = resp.elements;
					this.pagination.current = this.page;
					this.pagination.total = resp.totalElements || 0;
					/*this.$router.replace({
						path: this.$router.path,
						query: {...data}
					});*/
					this.custormAnchor('anchor');
				} catch(e) {
					console.log(e)
					this.loading = false;
					this.$message.error(e.msg || '网络繁忙，请稍后重试');
				}
			},
			// 初始化请求data，删除空值
			initPostData(data) {
				let ret = {};
				for(let key in data){
					if (data[key]) {
						ret[key] = data[key]
					}
				}
				return ret;
			},
			// 翻页事件
			pageChange(page, pageSize){
				this.page = page;
				console.log(page, pageSize)
			},
			// 重置
			reset() {
				// obj重置，但type不重置
				this.obj = {...obj, type: this.obj.type };
				this.regDate = [];
				this.createTime = [];
				this.search();
			},
			// 搜索
			search() {
				this.page = 0;
				setTimeout(() => {
					this.page = 1;
				});
			},
			refresh() {
				this.reset();
				this.search();
				this.now = pubFilters.filters.dateFormat(new Date().getTime());
			},
			// 注册时间选择
			onRegDateChange(date, dateString) {
				console.log(date, dateString)
				this.obj.regDateStart = dateString[0] ? new Date(dateString[0]).getTime() - 8*60*60*1000 : '';
				this.obj.regDateEnd = dateString[1] ? new Date(dateString[1]).getTime() - 8*60*60*1000 + 86399000 : '';
	    },
	    // 入库时间选择
	    onCreateTimeChange(date, dateString) {
	    	//console.log(this.createTime[0].toDate())
	      this.obj.createTimeStart = dateString[0] ? new Date(dateString[0]).getTime() - 8*60*60*1000 : '';
				this.obj.createTimeEnd = dateString[1] ? new Date(dateString[1]).getTime() - 8*60*60*1000 + 86399000 : '';
	    },
	    replacePath() {
	    	let data = this.initPostData(this.obj);
				this.$router.replace({
					path: this.$router.path,
					query: {...data}
				});
	    }
		},
		watch: {
			page() {
				if (this.page) {
					this.getGgList();
					this.replacePath();
				}
			},
			$route(to, from) {
				if (to.path === from.path && to.query.type !== from.query.type) {
					console.log(888, to, from)
					this.pageInit();
					this.getGgList();
					this.replacePath();
				}
		 	}
		},
		filters: { ...pubFilters.filters, ...statusFilters.filters }
	}
</script>

<style lang="scss">
	.list-wrap{
	  .table-list-wrap {
			position: relative;padding: 20px;background-color: #fff;color:#333;
	    .title{
	    	vertical-align: middle;
	    	span{font-size:18px;vertical-align: middle;font-weight: 600;}
	    	div{
	    		display: inline-block;padding: 0 5px 0 15px;height:30px;line-height: 28px;border-radius:15px;border:1px solid #E5EDFF; background-color: #F5F8FF; margin-left: 10px;vertical-align: middle;color: #3576FF;
	    		i{font-size: 14px;color: #3576FF;vertical-align: top;padding: 8px 10px;cursor: pointer;font-weight: bold;}
	    	}
	    }
	    .condition{
	    	vertical-align: top;padding: 10px 0;
	    	.ant-calendar-picker-input.ant-input{
	    		//padding-left: 2px;
	    		.ant-calendar-range-picker-input{vertical-align: top;}//text-align: left;padding-left: 10px;
	    	}
	    }
	    .mt10{margin-top: 10px;}
	    .mr10{margin-right: 10px;}
	    .ml10{margin-left: 10px;}
	    .regular{display: inline-block;width: 150px;margin-right: 10px;margin-top: 10px;vertical-align: top;}
	    .serach-btn{display: inline-block;}
	    .table-box{margin-top: 10px;min-height:100px;}
	    .ant-table{font-size: 13px;}
	    .ant-table table{border: 1px solid #f1f1f1;border-bottom: 0;}
	    .ant-table-thead > tr > th{background: #f1f1f1;}
	    .ant-table-thead > tr > th, .ant-table-tbody > tr > td{line-height: 18px;color: #333;}
	    .ant-table-pagination.ant-pagination{margin: 20px 0;}
	    .ant-input-group.ant-input-group-compact{display: inline-block;vertical-align: top;}
	    .regular-btn{padding: 0 30px;}
	  }
  }
</style>
