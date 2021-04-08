<template>
	<div class="re-table-list-wrap">
		<div class="back">
			<a-icon type="left-circle" @click="back" /><span @click="back">返回</span>
			<div>截止时间：{{now}} <a-icon type="sync" @click="refresh" /></div>
		</div>
		<div class="condition">
			<a-select class="regular" allowClear placeholder="请选择街道" v-model="obj.street" v-if="isSuper">
	      <a-select-option :value="item.value" v-for="item in streetList" :key="item.value">{{item.name}}</a-select-option>
	    </a-select>
			<a-input class="regular" placeholder="请输入企业名称" v-model="obj.companyName"/>
	    <a-input class="regular" placeholder="请输入法人姓名" v-model="obj.frName"/>
	    <a-input class="regular" placeholder="请输入联系电话" v-model="obj.frTel"/>
	    <a-range-picker class="regular" style="width: 310px;"
	    	v-model="regDate"
	    	:placeholder="['注册时间开始', '注册时间结束']"
	    	@change="onRegDateChange"
	    />
	    <a-select class="regular" allowClear placeholder="是否科技型企业" v-model="obj.isKeJiXing">
	      <a-select-option value="0">是</a-select-option>
	      <a-select-option value="1">否</a-select-option>
	    </a-select>
	    <a-select class="regular" allowClear placeholder="请选择入库状态" v-model="obj.isRuKu">
	      <a-select-option value="0">已入库</a-select-option>
	      <a-select-option value="1">未入库</a-select-option>
	    </a-select>
	    <a-select class="regular" allowClear placeholder="是否已认定企业" v-model="obj.isRenDing">
	      <a-select-option value="0">是</a-select-option>
	      <a-select-option value="1">否</a-select-option>
	    </a-select>
	    <!-- :defaultValue="[moment(obj.regDateStart, 'x'), moment('1541462400000', 'x')]" -->
	    <!-- <a-select class="regular" allowClear placeholder="请选择企业规模" v-model="obj.companySize">
	      <a-select-option value="1">50人以下</a-select-option>
	      <a-select-option value="2">50~100人</a-select-option>
	      <a-select-option value="3">100人以上</a-select-option>
	    </a-select>
	    <a-select class="regular" allowClear placeholder="请选择技术领域" v-model="obj.productField">
	      <a-select-option :value="item" v-for="item in productFieldList" :key="item">{{item}}</a-select-option>
	    </a-select>
	    <a-input class="regular" placeholder="请输入所属行业" v-model="obj.industry"/>
	    <a-select class="regular" showSearch allowClear optionFilterProp="children" @filterOption="filterOption" placeholder="请选择项目" v-model="obj.type">
	      <a-select-option :value="item.value" v-for="(item, index) in typeList" :key="index">{{item.name}}</a-select-option>
	    </a-select> -->
		  <div class="serach-btn">
		    <a-button class="regular-btn mt10 mr10" type="primary" @click="search">搜索</a-button>
	    	<a-button class="regular-btn mt10 mr10" @click="reset">重置</a-button>
	    	<!-- <a-button class="regular-btn mt10" @click="exportAll">导出全部数据</a-button> -->
    	</div>
		</div>
		<div class="table-box">
		  <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="pagination">
		  	<span slot="street" slot-scope="text, record" v-if="isSuper">{{streetList[record.street-1] && streetList[record.street-1].name}}</span>
		  	<span slot="regDate" slot-scope="text, record">{{record.regDate|dateFormat('date')}}</span>
		  	<span slot="isKeJiXing" slot-scope="text, record">{{record.isKeJiXing ? "是":"否"}}</span>
		  	<span slot="isRuKu" slot-scope="text, record">{{record.isRuKu ? "已入库":"未入库"}}</span>
		  	<span slot="isRenDing" slot-scope="text, record">{{record.isRenDing ? "是":"否"}}</span>
		    <span slot="action" slot-scope="text, record">
		      <a href="javascript:;" @click="toDetail(record.id)">查看详情</a>
		    </span>
		  </a-table>
	  </div>
  </div>
</template>

<script>
	import qs from 'qs';
	import moment from 'moment';
	import Filters from 'utils/filters'
	const { rootUrl } = CONFIG;
	const { pubFilters, statusFilters } = Filters
	const productFieldList = [ '电子信息', '生物与新医药', '航空航天', '新材料', '高技术服务', '新能源与节能', '资源与环境', '先进制造及自动化' ];
	const statusList = [ '新认定2019', '复评2019', '新认定2020', '复评2020', '新认定2021', '复评2021', '暂无意向', '重认15', '复审15', '省级15', '重认16', '复审16', '省级16', '重认17', '复审17', '省级17'];
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
		  title: '法人',
		  dataIndex: 'frName',
		  key: 'frName',
		  width: '120px',
		},
		{
		  title: '联系电话',
		  dataIndex: 'frTel',
		  key: 'frTel',
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
		  dataIndex: 'companySizeName',
		  key: 'companySizeName',
		  width: '120px',
		},
		{
		  title: '所属行业',
		  dataIndex: 'industry',
		  key: 'industry',
		  width: '180px',
		},
		{
		  title: '发明授权专利(件)',
		  dataIndex: 'inventionAuthPatentNum',
		  key: 'inventionAuthPatentNum',
		  width: '190px',
		  scopedSlots: { customRender: 'inventionAuthPatentNum' },
		},
		{
		  title: '软件著作权(件)',
		  dataIndex: 'softCopyrightNum',
		  key: 'softCopyrightNum',
		  width: '190px',
		  scopedSlots: { customRender: 'softCopyrightNum' },
		},*/
		{
		  title: '是否科技型企业',
		  dataIndex: 'isKeJiXing',
		  key: 'isKeJiXing',
		  width: '180px',
		  scopedSlots: { customRender: 'isKeJiXing' },
		},
		{
		  title: '入库状态',
		  dataIndex: 'isRuKu',
		  key: 'isRuKu',
		  width: '190px',
		  scopedSlots: { customRender: 'isRuKu' },
		},
		{
		  title: '是否已认定企业',
		  dataIndex: 'isRenDing',
		  key: 'isRenDing',
		  width: '190px',
		  scopedSlots: { customRender: 'isRenDing' },
		},
		{
		  title: '操作',
		  key: 'action',
		  width: '150px',
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
		frName: '',
		frTel: '',
		regDateStart: '',
		regDateEnd: '',
		companySize: undefined,
		industry: undefined,
		type: undefined,
		isKeJiXing: undefined,
		isRuKu: undefined,
		isRenDing: undefined,
		pgIndex: 1,
		pgCount: 10,
	}
	const typeList = [
		{
			value: '0',
			name: '全部'
		},
		{
			value: '1',
			name: '国高预计总数'
		},
		{
			value: '2',
			name: '国高储备'
		},
		{
			value: '3',
			name: '国高已获评'
		},
		{
			value: '4',
			name: '市高预计总数'
		},
		{
			value: '5',
			name: '市高储备'
		},
		{
			value: '6',
			name: '市高已获评'
		},
		{
			value: '7',
			name: '省科预计总数'
		},
		{
			value: '8',
			name: '省科储备'
		},
		{
			value: '9',
			name: '省科已获评'
		},
		{
			value: '10',
			name: '竞争预计总数'
		},
		{
			value: '11',
			name: '竞争储备'
		},
		{
			value: '12',
			name: '竞争已获评'
		},
		{
			value: '13',
			name: '拥有专利'
		},
		{
			value: '14',
			name: '专利为0'
		},
		{
			value: '15',
			name: '拥有软著'
		},
		{
			value: '16',
			name: '软著为0'
		},
		{
			value: '17',
			name: '科技型企业总数'
		},
		{
			value: '18',
			name: '拥有实用新型授权企业'
		},
		{
			value: '19',
			name: '拥有外观专利授权企业 '
		},
		{
			value: '20',
			name: '拥有软著授权企业'
		}
	];
	export default {
		data() {
	    return {
	    	typeList,
	    	streetList,
	    	productFieldList,
	    	statusList,
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
	    }
	  },
	  mounted() {
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
			this.isGg = this.$route.path.includes('nationalTech');
	  	let query = this.$route.query;
	  	this.obj = { ...this.obj, ...query };
	  	this.page = this.obj.pgIndex -0 || 1;
	  	this.now = pubFilters.filters.dateFormat(new Date().getTime());
	  	this.pagination.current = this.page;
	  	this.pagination.onChange = this.pageChange;
	  	// todo时间控件赋值有待研究, 先置空
	  	this.obj.regDateStart = '';
	  	this.obj.regDateEnd = '';
	  	this.obj.createTimeStart = '';
	  	this.obj.createTimeEnd = '';
	  },
		methods: {
			filterOption(input, option) {
	      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
	    },
			exportAll() {
				let data = this.initPostData(this.obj);
				location.href = `${rootUrl}/street/expertStoreList?${qs.stringify(data)}`;
			},
			custormAnchor(anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        console.log(anchorElement)
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) { anchorElement.scrollIntoView(); }
      },
			// 返回
			back() {
				this.$router.go(-1);
			},
			// 查看详情
			toDetail(id) {
				let arr = this.$route.fullPath.split('/');
  			let pathName = arr[arr.length - 2]; // 第二级路由
				this.$router.push({
					path: `/reserve/${pathName}/detail`,
					query: {
						id
					}
				});
			},
			// 请求查询列表
			async getList() {
				this.obj.pgIndex = this.page;
				this.loading = true;
				if (!this.isSuper) {
					this.obj.street = this.$storage.get('streetId');
				}
				let data = this.initPostData(this.obj);
				try	{
					let resp = await this.API.tech.allCompanyList(data) || {};
					this.loading = false;
					this.data = resp.elements;
					this.pagination.current = this.page;
					this.pagination.total = resp.totalElements || 0;
					this.$router.replace({
						path: this.$router.path,
						query: {...data}
					});
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
				this.obj = {...obj}
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
	    // 申请时间选择
	    onCreateTimeChange(date, dateString) {
	    	//console.log(this.createTime[0].toDate())
	      this.obj.createTimeStart = dateString[0] ? new Date(dateString[0]).getTime() - 8*60*60*1000 : '';
				this.obj.createTimeEnd = dateString[1] ? new Date(dateString[1]).getTime() - 8*60*60*1000 + 86399000 : '';
	    }
		},
		watch: {
			page() {
				if (this.page) {
					this.getList();
				}
			}
		},
		filters: { ...pubFilters.filters, ...statusFilters.filters }
	}
</script>

<style lang="scss">
  .re-table-list-wrap {
		padding: 20px;background-color: #fff;color:#333;
    .back{
    	vertical-align: middle;
    	i{font-size: 24px;color:#bbb;vertical-align: middle;cursor: pointer;}
    	span{padding-left: 5px;font-size:14px;vertical-align: middle;cursor: pointer; margin-right: 20px;}
    	div{
    		display: inline-block;padding: 0 5px 0 15px;height:30px;line-height: 28px;border-radius:15px;border:1px solid #E5EDFF; background-color: #F5F8FF;vertical-align: middle;color: #3576FF;
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
    .table-box{margin-top: 10px;}
    .ant-table{font-size: 13px;}
    .ant-table table{border: 1px solid #f1f1f1;border-bottom: 0;}
    .ant-table-thead > tr > th{background: #f1f1f1;}
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td{line-height: 18px;color: #333;}
    .ant-table-pagination.ant-pagination{margin: 20px 0;}
    .ant-input-group.ant-input-group-compact{display: inline-block;vertical-align: top;}
    .regular-btn{padding: 0 30px;}
  }
</style>
