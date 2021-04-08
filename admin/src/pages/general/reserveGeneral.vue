<template>
  <div class="reverse_general_page clearfix" >

		<div class="graph_box">
			<div class="total_num">
				<div class="total_title">
					<span class="text"> 企业库概况</span>
					<span class="time">截止时间：{{ dateNow | dateFormat }}</span>
					<a-icon type="sync" @click="showModalFn" />
				</div>
				<div class="num_list num_list_label clearfix" >
					<div class="item">
						<p class="title">辖区内企业总数（家）</p>
						<p class="num_line">
							<span class="num">{{ headStatisticsData.totalCompanyNum }}</span>
						</p>
						<span class="link" @click="goListFn(0)">查看列表</span>
					</div>
					<div class="item">
						<p class="title">科技型企业总数（家）</p>
						<p class="num_line">
							<span class="num">{{ headStatisticsData.storeNum }}</span>
						</p>
						<span class="link" @click="goListFn(17)">查看列表</span>
					</div>
					<div class="item">
						<img src="~assets/img/icon/i_green.png" class="icon" alt="">
						<p class="title">国家高新技术企业培育总数（家）</p>
						<p class="num_line">
							<span class="num">{{ headStatisticsData.ggStoreNum }}</span>
						</p>
						<span class="link" @click="goListFn(2)">查看列表</span>
					</div>
					<div class="item">
						<img src="~assets/img/icon/i_green.png" class="icon" alt="">
						<p class="title">市级高新技术企业培育总数（家）</p>
						<p class="num_line">
							<span class="num">{{ headStatisticsData.sgStoreNum }}</span>
						</p>
						<span class="link" @click="goListFn(5)">查看列表</span>
					</div>
					<div class="item">
						<img src="~assets/img/icon/i_green.png" class="icon" alt="">
						<p class="title">省级科技型中小企业培育总数（家）</p>
						<p class="num_line">
							<span class="num">{{ headStatisticsData.skStoreNum }}</span>
						</p>
						<span class="link" @click="goListFn(8)">查看列表</span>
					</div>
					<div class="item">
						<img src="~assets/img/icon/i_red.png" class="icon" alt="">
						<p class="title">竞争性项目企业培育总数（家）</p>
						<p class="num_line">
							<span class="num">{{ headStatisticsData.jzStoreNum }}</span>
						</p>
						<span class="link" @click="goListFn(11)">查看列表</span>
					</div>
				</div>
			</div>

			<div class="total_graph" >
				<div class="select_wrap" @click.stop="newListShow = true">
					<div class="check_all">
						<a-checkbox
							:indeterminate="indeterminate1"
							@change="onCheckAllChange1"
							:checked="checkAll1"
						>
						科技型企业({{ headStatisticsData.storeNum }}家)
						</a-checkbox>
					</div>
					<div class="option_list" >
						<a-checkbox-group :options="plainOptions1" v-model="checkedList1" @change="onChange1" />
					</div>
				</div>

				<div class="select_wrap" @click.stop="oldListShow = true">
					<div class="check_all">
						<a-checkbox
							:indeterminate="indeterminate2"
							@change="onCheckAllChange2"
							:checked="checkAll2"
						>
						已获评
						</a-checkbox>
					</div>
					<div class="option_list" >
						<a-checkbox-group :options="plainOptions2" v-model="checkedList2" @change="onChange2" />
					</div>
				</div>

				<div class="select_box" v-if="isSuper">
					<a-select defaultValue="单街道查看" @change="handleChange">
						<a-select-option value="all" >全选</a-select-option>
						<a-select-option :value="item" v-for="(item, index) in streetList" :key="index">{{ item }}</a-select-option>
					</a-select>
				</div>

				<div id="graph_container" class="graph_container" ></div>
			</div>
		</div>
		<div class="list_box list_box_ip clearfix">
			<div class="list_wrap clearfix">
				<div class="title_box">
					<span class="txt">知识产权概况</span>
					<span class="more"  @click="pathTo('/reserve/IPGeneral/IPGeneral')">查看详情</span>
				</div>
				<div class="graph_box" >
					<div id="ipGraph" class="ip_graph"></div>
				</div>
			</div>
		</div>

		<div class="list_box clearfix">
			<div class="list_wrap">
				<div class="title_box">
					<span class="txt">国家预估</span>
					<span class="more"  @click="goGgDetailFn(1)">查看详情</span>
				</div>
				<div class="state_wrap">
					<div class="item" @click="goGgDetailFn(1)">
						<p class="lef">
							<span class="lab">国</span>
							<span class="year">2019年国高预估数</span>
						</p>
						<p class="rig">
							<span class="range_num">{{ ggygOverview.yuguLowNum }}家～{{ ggygOverview.yuguHighNum }}家</span>
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="list_box clearfix">
			<div class="list_wrap">
				<div class="title_box">
					<span class="txt">市高预估</span>
					<span class="more"  @click="goShiDetailFn()">查看详情</span>
				</div>
				<div class="state_wrap prowincy_wrap">
					<div class="item clearfix" @click="goShiDetailFn()">
						<p class="lef">
							<span class="lab lab_green">市</span>
							<span class="year">2019年市高预估数</span>
						</p>
						<p class="rig">
							<span class="range_num">{{ sgygOverview.yuguLowNum }}家～{{ sgygOverview.yuguHighNum }}家</span>
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="list_box clearfix">
			<div class="list_wrap">
				<div class="title_box">
					<span class="txt">省科预估</span>
					<span class="more"  @click="goSkDetailFn()">查看详情</span>
				</div>
				<div class="state_wrap prowincy_wrap">
					<div class="item clearfix" @click="goSkDetailFn()">
						<p class="lef">
							<span class="lab">省</span>
							<span class="year">2019年省科预估数</span>
						</p>
						<p class="rig">
							<span class="range_num">{{ skygOverview.yuguLowNum }}家～{{ skygOverview.yuguHighNum }}家</span>
							<!-- <span class="up_num">预计新增45家</span> -->
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="list_box list_box_company survey_company mt15">
			<div class="list_wrap">
				<div class="title_box">
					<span class="txt">企业库企业列表</span>
					<span class="more"  @click="goListFn(0)">查看更多</span>
				</div>
				<div class="state_wrap company_wrap">
					<div class="item clearfix" v-for="(item, index) in totalObj.companyList" :key="index">
						<p class="lef">
							<span class="company">{{ index+1 }} &nbsp; {{ item.companyName }}</span>
						</p>
						<p class="rig">
							<span class="time">共{{ item.zlNum }}件专利</span>
						</p>
					</div>
				</div>
			</div>
			<div class="empty_box" v-if="!loading && (!totalObj.companyList || !totalObj.companyList.length)">
				<img src="~assets/img/icon/empty.png" alt="">
				<p class="text">暂无数据</p>
			</div>
		</div>

		<a-modal
      :title="modalTitale"
      :footer="null"
      wrapClassName="modal_box"
      v-model="visible"
      @ok="handleOk"
    >
    	<div class="data_box">
    		<p class="item">基本数据：</p>
    		<p class="item">调研访问量新增：<span class="num">{{ headStatisticsData.pageViewIncr || 0}}次</span></p>
    		<p class="item">参与调研企业数量新增：<span class="num">{{ headStatisticsData.researchIncr || 0}}家</span></p>
    		<p class="item">国高重点培育企业新增：<span class="num">{{ headStatisticsData.ggCultivateIncr || 0}}家</span></p>
    		<p class="item">省科技型可培育企业新增：<span class="num">{{ headStatisticsData.scultivateIncr || 0}}家</span></p>
    		<p class="item">国高需复评企业新增：<span class="num">{{ headStatisticsData.ggReviewIncr || 0}}家</span></p>
    	</div>
    	<div class="data_box">
    		<p class="item">预估数据：</p>
    		<p class="item">2019年国高预估新增：<span class="num">{{ headStatisticsData.gg2019YuguIncr || 0}}次</span></p>
    		<p class="item">2020年国高预估新增：<span class="num">{{ headStatisticsData.gg2020YuguIncr || 0}}家</span></p>
    		<p class="item">2021年国高预估新增：<span class="num">{{ headStatisticsData.gg2021YuguIncr || 0}}家</span></p>
    		<p class="item">2019年省科预估新增：<span class="num">{{ headStatisticsData.s2019YuguIncr || 0}}家</span></p>
    	</div>
    </a-modal>

	</div>
</template>

<script>
	import HighCharts from 'highcharts'
	import Filters from 'utils/filters'
	let options = {
		chart: {
			type: 'column'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: ['闸弄口街道', '闸弄口街道', '闸弄口街道', '闸弄口街道', '闸弄口街道', '闸弄口街道', '闸弄口街道', '闸弄口街道'],
		},
		yAxis: {
			allowDecimals: false,
			min: 0,
			title: {
				text: ''
			},
			gridLineColor: '#f1f1f1'
		},
		legend: {
			enabled: false
		},
		colors: ['#ddd', '#FF5722', '#ddd', '#FF9802'],
		tooltip: {
			formatter: function () {
				return '<b>' + this.x + '</b><br/>' +
					this.series.name + ': ' + this.y + '<br/>' +
					'总量: ' + this.point.stackTotal;
			}
		},
		plotOptions: {
			series: {
				type: 'column',
				stacking: 'normal',
				groupPadding : 0.1, //两个柱子之间的距离
				pointWidth: 9,  //柱子的宽度
				borderRadius: 4,  //圆角
			}
		},
		series: [{
			name: '新认定且符合国家申报条件的企业',
			data: [1],
			stack: 2
		}, {
			name: '已获评国家高新技术企业',
			data: [2],
			stack: 2
		}, {
			name: '新认定且符合省科申报条件的企业',
			data: [3],
			stack: 1 // stack 值相同的为同一组
		}, {
			name: '已获评省科技型企业',
			data: [4],
			stack: 1
		}]
	}
	let pieOptions = {
		chart: {
			spacing : [40, 0 , 40, 0]
		},
		title: {
			floating:true,
			text: ''
		},
		colors: ['#3576FF', '#A5C2FF', '#8CB1FF', '#6899FF', '#6899FF', '#5088FF'],
		tooltip: {
			valueSuffix: '家'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<span>{point.name}</span>:<br> {point.y}件',
					style: {
						color: '#333',
						"fontSize": "12px",
						"fontWeight": "normal",
					}
				},
				// point: {
				// 	events: {
				// 		mouseOver: function(e) {  // 鼠标滑过时动态更新标题
				// 			// 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
				// 			chart.setTitle({
				// 				text: e.target.name+ '\t'+ e.target.y + ' %'
				// 			});
				// 		}
				// 		//,
				// 		// click: function(e) { // 同样的可以在点击事件里处理
				// 		//     chart.setTitle({
				// 		//         text: e.point.name+ '\t'+ e.point.y + ' %'
				// 		//     });
				// 		// }
				// 	}
				// },
			}
		},
		series: [{
			type: 'pie',
			innerSize: '70%',
			name: '市场份额',
			data: [
				['Safari',    8.5],
				['Opera',     6.2],
				['其他',   0.7]
			]
		}]
	}

	const plainOptions = ['国家高新技术企业', '市级高新技术企业', '省级科技型中小企业', '竞争性项目']
	const colorList = ['#FFC939', '#FF9D39', '#FF6639', '#FF3939', '#C739FF', '#A239FF', '#7F39FF', '#5E39FF','#3966FF', '#3995FF', '#39BEFF', '#62C5CF']
	const streetList = ['闸弄口街道', '凯旋街道', '采荷街道', '四季青街道', '笕桥街道', '彭埠街道', '钱塘智慧城', '丁兰街道']
	const plainOptions1 = [
		{name:'国家高新技术企业', color:'#FFC939'},
		{name:'市级高新技术企业', color: '#FF9D39'},
		{name: '省级科技型中小企业', color: '#FF6639'},
		{name: '杭州市专利试点企业', color: '#FF3939'},
		{name: '杭州市专利示范企业', color: '#C739FF'},
		{name: '省级高新技术企业研究开发中心', color: '#A239FF'},
		{name: '市级高新技术企业研究开发中心', color: '#7F39FF'},
		{name: '省级企业技术中心', color: '#5E39FF'},
		{name: '市级企业技术中心', color: '#3966FF'},
		{name: '浙江省重大科技计划项目', color: '#3995FF'},
		{name: '杭州市重大科技计划项目', color: '#39BEFF'},
		{name: '市科技型初创企业培育工程', color: '#62C5CF'},
	]
	const defaultCheckedList = ['国家高新技术企业', '市级高新技术企业', '省级科技型中小企业', '竞争性项目']
	export default {
		data() {
			return {
				showBox: true,  //展示概况
				checkedList1: defaultCheckedList,
				checkedList2: defaultCheckedList,
				checkedListData1: [],
				checkedListData2: [],
				indeterminate1: false,
				indeterminate2: false,
				checkAll1: true,
				checkAll2: true,
				plainOptions1: plainOptions,
				plainOptions2: plainOptions,
				newListShow: false,  //新认定列表
				oldListShow: false,  //已获评
				categories: [], //街道名
				chrtDataList: [],  //图标列表数据
				streetList: streetList, //街道列表
				selectStreet: 'all',
				selectStreetObj: {},  //选择的街道数据

				totalObj: {}, //概况信息
				ipDataObj: {}, //知识产权概况
				headStatisticsData: {},  //培育库概况
				ggCultivateOverview: {},  //国高重点培育企业
				ggReviewOverview: {},  //国高需复评企业
				ggygOverview: {},  //国高预估
				skygOverview: {},  //省科预估
				sgygOverview:{},  //市高预估
				options: options,
				pieOptions: pieOptions, //饼图
				visible: false,
				modalTitale: '',
				dateNow: '',
				isSuper: 1,  //默认管理员
				loading: false,
			}
		},
		mounted () {
			this.dateNow = new Date().getTime();
			this.isSuper = this.$storage.get('isSuper');
			this.overviewFn();   //查询概览;
			this.gerIpDataFn();  //知识产权概况
		},
		methods: {
			handleChange (v) {
				this.selectStreet = v;
				for (let index = 0; index < this.chrtDataList.length; index++) {
					const element = this.chrtDataList[index];
					if(element.streetName == v){
						this.selectStreetObj = element;
					}
				}
				this.matchDataFn();  //匹配选择的筛选项
			},
			onChange1 (checkedList) {
				this.indeterminate1 = !!checkedList.length && (checkedList.length < plainOptions.length)
				this.checkAll1 = checkedList.length === plainOptions.length;
				this.newListShow = false;
				this.matchDataFn();  //匹配选择的筛选项
			},
			onCheckAllChange1 (e) {
				this.newListShow = true;
				Object.assign(this, {
					checkedList1: e.target.checked ? plainOptions : [],
					indeterminate1: false,
					checkAll1: e.target.checked,
				})
				this.matchDataFn();  //匹配选择的筛选项
			},
			onChange2 (checkedList) {
				this.indeterminate2 = !!checkedList.length && (checkedList.length < plainOptions.length)
				this.checkAll2 = checkedList.length === plainOptions.length;
				this.oldListShow = false;
				this.matchDataFn();  //匹配选择的筛选项
			},
			onCheckAllChange2 (e) {
				this.oldListShow = true;
				Object.assign(this, {
					checkedList2: e.target.checked ? plainOptions : [],
					indeterminate2: false,
					checkAll2: e.target.checked,
				})
				this.matchDataFn();  //匹配选择的筛选项
			},

			// 组装配置文件 （管理员）
			getOptionByAdminFn () {
				function getIndex (totalArr, item) {
					return totalArr.indexOf(item)
				}
				this.checkedListData1 = this.checkedList1.map( (data, idx) => {
					return {name: data, data: [], stack: idx, color: '#ddd'}
				})
				this.checkedListData2 = this.checkedList2.map( (data, idx) => {
					return {name: data, data: [], stack: idx, color: colorList[idx]}
				})
				console.log(this.chrtDataList)
				this.categories = [];
				this.chrtDataList.forEach( listItem => {
					this.categories.push(listItem.streetName+`<br>科技型企业：${listItem.storeNum}家`);
					this.checkedListData1.forEach((info, idx) => {
						let index_ = getIndex(plainOptions, info.name);
						info.data.push(listItem.newNum[index_])
					})
					this.checkedListData2.forEach((info, idx) => {
						let index_ = getIndex(plainOptions, info.name);
						info.data.push(listItem.existNum[index_])
					})
				})
				this.checkedListData1.forEach( ch => {
					ch.name = '科技型企业-' + ch.name
				})
				this.checkedListData2.forEach( ch => {
					ch.name = '已获评-' + ch.name
				})
				this.options.series = [...this.checkedListData1, ...this.checkedListData2];
				console.log(this.options.series)
			},
			//组装配置文件 （街道）
			getOptionByStreet () {
				this.categories = plainOptions;
				let arr1 = plainOptions.map( item => { return {name: item, data: 0} });
				let arr2 = plainOptions.map( item => { return {name: item, data: 0} });;
				for (let i = 0; i < arr1.length; i++) {
					const item = arr1[i];
					for (let j = 0; j < this.checkedList1.length; j++) {
						const info = this.checkedList1[j];
						if (item.name == info) {
							item.data = this.selectStreetObj.existNum[i]
							break
						}
					}
				}
				for (let i = 0; i < arr2.length; i++) {
					const item = arr2[i];
					for (let j = 0; j < this.checkedList2.length; j++) {
						const info = this.checkedList2[j];
						if (item.name == info) {
							item.data = this.selectStreetObj.newNum[i]
							break
						}
					}
				}
				let data1 = arr1.map( item => {return item.data});
				let data2 = arr2.map( item => {return item.data});
				this.options.series = [];
				this.options.series[0] = {
					name: '科技型企业', data: data2, stack: 1
				}
				this.options.series[1] = {
					name: '已获评', data: data1, stack: 1
				}
				this.options.xAxis.labels = {};
				// this.options.xAxis.labels.rotation = 45;
				console.log(this.options.series)
			},
			// 匹配已选择数据
			matchDataFn () {
				if (this.isSuper && this.selectStreet == 'all') {
					this.getOptionByAdminFn();  //组装配置文件 （管理员）
				}
				if (!this.isSuper || this.selectStreet != 'all') {
					console.log(2223);
					this.getOptionByStreet();  //组装配置文件 （街道）
				}
				this.totalGraphFn();  //绘制
			},
			// 知识产权概况
			async gerIpDataFn () {
				let data = {};
				if (this.isSuper) {
					data.street = 0;
				}
				else{
					data.street = this.$storage.get('streetId');
				}
				try{
					let resp = await this.API.general.ccIpCount(data);
					this.ipDataObj = resp;
					this.pieGraphFn();
				}
				catch(e){}
			},
			// 绘制知识暗黑城怒气按概况饼图
			pieGraphFn () {
				let graphData = this.ipDataObj.headStatisticsData;
				let data = [
					['外观专利数', graphData.wgzlNum],
					['作品著作权总数', graphData.zpzzNum],
					['商标总数', graphData.tmNum],
					['软件著作权总数', graphData.rzNum],
					['发明授权专利总数', graphData.fmsqzlNum],
					['实用新型专利总数', graphData.syxxzlNum]
				]
				this.pieOptions.series[0].data = [...data];
				HighCharts.chart('ipGraph', this.pieOptions);
			},
			totalGraphFn () {
				this.options.xAxis.categories = this.categories;
				if (this.isSuper) {
					let wid_ = 4; //柱状体宽度
					let padding_ = 0.1;  //柱子间距离
					let len_ = Math.ceil(this.options.series.length / 2);
					if(len_<3){
						wid_ = 14;
						padding_ = 0.1;
					}
					else if (len_ >=3 && len_ <12) {
						wid_ = 8;
						padding_ = 0.8;
					}
					if (len_ == 12 || this.options.series.length >= 12){
						wid_ = 4;
						padding_ = 0.8;
					}
					this.options.plotOptions.series.pointWidth = wid_;
					this.options.plotOptions.series.groupPadding = padding_;
				}
				else{
					this.options.plotOptions.series.pointWidth = 32;
				}
				console.log(this.options)
				HighCharts.chart('graph_container', this.options);
			},
			// 查看列表
			goListFn (type) {
				let url = `/reserve/list/list?type=${type}`;
				this.$router.push(url);
			},
			// 国高预估图表
			goGgDetailFn (type) {
				this.$router.push(`nationalTech/nationalTech?tab=3&selectType=${type}`)
			},
			//省科预估图表
			goSkDetailFn () {
				this.$router.push(`provincialTech/provincialTech?tab=3`)
			},
			//市科预估图表
			goShiDetailFn () {
				this.$router.push(`cityTech/cityTech`)
			},
			pathTo(path, query = {}) {
	  		this.$router.push({path, query});
	  	},
			showModalFn () {
				this.dateNow = new Date().getTime();
				let time = Filters.pubFilters.filters.dateFormat(new Date().getTime());
				this.modalTitale = `截止时间：${time}更新如下数据:`;
				// this.visible = true;
				this.overviewFn();   //查询概览;
				this.gerIpDataFn();  //知识产权概况
			},
			handleOk(e) {
	      console.log(e);
	      this.visible = false
	    },
			// 查询概览（陈局）
			async overviewFn () {
				this.loading = true;
				let data = {};
				if (this.isSuper) {
					data.street = 0;
				}
				else{
					data.street = this.$storage.get('streetId');
				}
				try {
					let resp = await this.API.general.ccOverview(data);
					this.totalObj = resp;
					this.loading = false;
					this.headStatisticsData = this.totalObj.headStatisticsData;
					this.ggygOverview = this.totalObj.ggygOverview;  //国高需复评
					this.skygOverview = this.totalObj.skygOverview;  //国高需复评
					this.sgygOverview = this.totalObj.sgygOverview;  //市高预估
					resp.streetOverview.forEach( item => {
						item.existNum = [item.existGgCompanyNum, item.existSgCompanyNum, item.existSCompanyNum, item.existJzCompanyNum];
						item.newNum = [item.ggStoreNum, item.sgStoreNum, item.skStoreNum, item.jzStoreNum];
					})
					if(this.isSuper){
						this.chrtDataList = this.totalObj.streetOverview;  //街道数据
					}
					else{
						this.selectStreetObj = this.totalObj.streetOverview[0];
					}
					this.matchDataFn();
				}
				catch (e){}
			},
		},
		filters: {
			dateFormat: Filters.pubFilters.filters.dateFormat,
			applyStatus: Filters.statusFilters.filters.applyStatus,
		}
	}
</script>


<style lang="scss">
	.reverse_general_page {
  	padding: 16px 15px 0 15px;
  	.loading_box {
  		position: absolute; z-index: 10; width: 100%; height: 100%; background: rgba(255,255,255,.3); text-align: center; padding-top: 300px;
  	}
  	.graph_box {
  		width: 1115px; min-height: 100%; float: left;
  		.total_num {
				width: 100%; height: auto; background: #fff; position: relative;
				.more_box {
					width: 60px; height: 10px; line-height: 10px; cursor: pointer; background: #fff; border-radius:0px 0px 52px 52px; position: absolute; left: 50%; bottom: -10px; margin-left: -30px; text-align: center; z-index: 10; background:url(~assets/img/icon/up.png) no-repeat;
				}
				.box_down {background:url(~assets/img/icon/down.png) }
  			.total_title {
  				width: 100%; height: 40px; line-height: 40px; border-bottom: 1px solid #F1F1F1; padding-left: 20px;
  				.text {font-size: 14px; color: #333; font-weight: 600;}
  				.time {font-size: 12px; color: #3576FF; margin-left: 25px;}
  				.anticon {color: #3576FF; margin-left: 10px; cursor: pointer;}
  			}
  			.num_list {
  				width: 100%; height: auto; border-bottom: 1px solid #f5f5f5; position: relative;
					&:last-child {border-bottom: none;}
  				.item {
  					width: 33.3333%; height: 100px; float: left; padding: 15px 0 0 15px; text-align: left; position: relative;
  					.title {font-size: 12px; color: #666;}
  					.num_line {
  						width: 100%; line-height: 23px; text-align: left; margin-top: 10px; margin-bottom: 2px;
							.num	{font-size: 20px; color: #333; display: inline-block; vertical-align: middle; font-family: 'ArialMT'}
  						.up {display: inline-block; height: 16px; line-height: 16px; padding: 0 5px; background: #36AF47; color: #fff; font-size: 12px; margin-left: 5px; vertical-align: middle;}
  					}
  					.link {
  						font-size: 12px; color: #999; cursor: pointer;
  						&:hover {color: #3576FF;}
  					}
  					.info {font-size: 12px; color: #999; margin-right: 30px;}
  				}
					.type_lab {
						width: 0; height: 0; border: 42px solid transparent; border-left-color: #36AF47; position: absolute; right: -42px; top: -42px; transform: rotate(-45deg);
						span {position: absolute; left: -36px; top: -10px; color: #fff; transform: rotate(90deg); font-size: 12px; }
					}
  			}
				.b_green {
					border-left: 4px solid #36AF47;
					.type_lab {border-left-color: #36AF47;}
				}
				.b_yellow {
					border-left: 4px solid #FF9639;
					.type_lab {border-left-color: #FFC86D;}
				}
				.b_red {
					border-left: 4px solid #F64744;
					.type_lab {border-left-color: #FF6260;}
				}
				.b_gray {
					border-left: 4px solid #ddd;
				}
  			.street_num {
  				.item {width: 25%;}
  			}
				.num_list_label {
					.item {
						border-right: 1px solid #F5F5F5; border-bottom: 1px solid #F5F5F5; position: relative;
						&:last-child {border-right: none;}
						.icon {position: absolute; width: 40px; height: 40px; right: 0; top: 0;}
					}
				}
  		}
  		.total_graph {
				width: 100%; height: 806px; margin-top: 15px; background: #fff; padding: 20px; padding-top: 64px; position: relative;
				.select_box {
					float: right; width: 224px;
					.ant-select {width: 100%;}
					.ant-select-selection--single {height: 32px; border: 1px solid rgba(0,0,0,0.1);}
					.ant-select-selection__rendered {line-height: 30px;}
					.ant-select-selection-selected-value {color:rgba(0,0,0,0.25);}
				}
				.select_wrap {
					margin-top: 15px;
					.check_all {
						margin-bottom: 16px;
						.ant-checkbox + span {font-size: 13px; color: #333; font-weight: 600;}
					}
					.option_list {
						border-bottom: 1px dashed #F1F1F1; padding-bottom: 15px;
						&:last-child {border-bottom: none;}
						.ant-checkbox-group-item {margin-right: 50px; font-size: 12px; color: #333;}
						.ant-checkbox {display: none;}
						.ant-checkbox-checked + span {
							border: 1px solid #E6E6E6; display: inline-block; height: 22px; line-height: 20px; border-radius:2px; background: url(~assets/img/icon/close.png) no-repeat 98% center #F5F5F5; padding-right: 17px;
						}
					}
				}
				.select_box {
					position: absolute; right: 20px; top:20px;
				}
  			.graph_container {padding: 52px 20px 40px 20px; height: 600px;}
  		}
  		.street_total_graph {
  			width: 550px; height: 590px; float: left; margin-right: 15px;
  			.graph_container {height: 100%;}
  		}
  		.company_graph {
  			width: 100%; height: 288px; margin-top: 15px;
  			.company_item {
  				width: 550px; height: 100%; float: left; margin-right: 15px; background: #fff;
  				&:last-child {margin-right: 0;}
  				.title {height: 40px; line-height: 40px; padding-left: 20px; font-size: 14px; color: #333; font-weight: 600; border-bottom: 1px solid #f1f1f1;}
  				.graph {
  					width: 100%; height: 246px;
  					.state_graph {padding: 20px; height: 100%;}
  				}
  			}
  		}
  		.street_company_graph {
  			width: 550px; float: left;
  			.company_item {
  				margin-bottom: 15px; margin-right: 0;
  				&:last-child {margin-bottom: 0;}
  			}
  		}
  	}
  	.list_box {
  		max-width: 540px; float: left; position: relative;
  		.list_wrap {
  			width: 100%; height: auto; background: #fff; float: left;
  			.title_box {
  				height: 40px; line-height: 40px; padding: 0 20px; border-bottom: 1px solid #f1f1f1; box-sizing: content-box;
  				.txt {font-size: 14px; color: #333; float: left; font-weight: 600;}
  				.more {font-size: 12px; color: #999; float: right; cursor: pointer;}
  			}
				.graph_box {
					width: 100%; height: 350px; background: #fff;
					.ip_graph {width: 100%; height: 100%;}
				}
  			.state_wrap {
  				width: 100%; height: auto;
  				.item {
  					padding: 0 20px; height: 66px; line-height: 66px; border-bottom: 1px solid #f1f1f1; cursor: pointer;
  					&:last-child {border-bottom: none;}
  					.lef {
  						height: 100%; float: left; max-width: 160px;
  						.lab {width: 36px; height: 36px; display: inline-block; line-height: 36px; background: #3576FF; border-radius: 50%; font-size: 14px; color: #fff; text-align: center;}
  						.year {font-size: 13px; color: #666; margin-left: 10px;}
  					}
  					.rig {
  						width: 300px; float: right; height: 66px; text-align: right;
  						.range_num {font-size: 14px; color: #333; margin-right: 10px; display: inline-block;}
  						.up_num {
  							height: 20px; line-height: 18px; padding: 0 10px; border-radius: 1px; display: inline-block; background: #E2EBFF; border: 1px solid #BCD1FF; color: #3576FF; font-size: 12px; text-align: center; position: relative;
								&:before {content:''; width: 0; height: 0; border: 4px solid transparent; border-right-color: #BCD1FF; position: absolute; left: -8px; top: 50%; margin-top: -4px;}
								&:after {content:''; width: 0; height: 0; border: 4px solid transparent; border-right-color: #E2EBFF; position: absolute; left: -7px; top: 50%; margin-top: -4px;}
  						}
  					}
  				}
  				.item_total {
  					height: 48px; line-height: 48px; padding: 0 20px;
  					.total {font-size: 13px; color: #333; text-align: right; }
  				}
  			}
  			.company_wrap {
  				.item {
  					height: 48px; height: 48px;
  					.lef {
  						line-height: 48px;
							.company {font-size: 13px; color: #333; display: inline-block; width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
  					}
  					.rig {
  						 width: 260px; height:48px; line-height: 48px;
							.statu {font-size: 13px; color: #333; margin-right: 20px;}
  						.time {font-size: 13px; color: #999;}
  					}
  				}
  			}
  			.prowincy_wrap {
  				.item {
  					.lef {
							.lab {background: #F5A623;}
							.lab_green {background: #36AF47;}
  					}
  					.rig {
  						.up_num {
  							background: #FFF2DC; border: 1px solid #FFE3B4; color: #F5A623;
  							&:before {border-right-color: #FFE3B4;}
  							&:after {border-right-color: #FFF2DC;}
  						}
  					}
  				}
  			}
  		}
			.empty_box {
				width: 100%; text-align: center; position: absolute; top: 50%; margin-top: -64px;
				img {width: 140px; height: 140px;}
				.text {font-size: 12px; color: #999; margin-top: 10px; text-align: center;}
			}
  	}
  	.list_box_company {
  		height: 478px; background: #fff; overflow: hidden;
		}
		.survey_company {height: 288px;}
  }
  @media screen and (min-width: 1920px) {
  	.reverse_general_page {
			min-width: 1650px;
			.list_box {
				width: 540px; margin-left: 15px; margin-top: 15px;
				.list_wrap {
					.company_wrap {
						.item {
							.lef {max-width: 220px;}
						}
					}
				}
			}
			.list_box_ip {margin-top: 0;}
		}
  }
	@media screen and (max-width: 1919px) and (min-width: 1366px) {
		.reverse_general_page {
			min-width: 1720px;
			.list_box {
				width: 540px; margin-left: 15px; margin-top: 15px;
			}
			.list_box_ip {margin-top: 0;}
		}
	}
	@media screen and (max-width: 1366px) {
		.reverse_general_page {
			width: 1166px;
			.list_box {
				max-width: 550px; width: 550px; margin-left: 15px; margin-top: 15px;
			}
			.list_box_ip {
				height: 351px; margin-left: 0;
				.list_wrap {
					.graph_box {height: 310px;}
				}
			}
			.list_box_company {margin-left: 15px; height: 340px; background: #fff; height: 220px;}
			.survey_company {height: 227px; width: 1115px; max-width: 1115px; margin-left: 0;}
		}
	}
</style>
