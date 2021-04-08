<template>
	<div class="detail-list-wrap">
		<div class="back">
			<a-icon type="left-circle" @click="back" /><span @click="back">返回列表</span>
		</div>
		<div class="title">{{detailData.companyName}}</div>
		<div class="list-card multi-colums mt20">
			<h4>基本信息</h4>
			<div class="items-wrap">
				<div class="items clearfix">
					<div class="item">
						<label>企业名称：</label><span>{{detailData.companyName}}</span>
					</div>
					<div class="item">
						<label>注册时间：</label><span>{{detailData.regDate|dateFormat("date")}}</span>
					</div>
					<div class="item">
						<label>注册资金（万元）：</label><span>{{detailData.regCapital}}</span>
					</div>
				</div>
				<div class="items clearfix">
					<div class="item">
						<label>注册地址：</label><span>{{detailData.regAddress}}</span>
					</div>
					<div class="item">
						<label>统一社会信用代码：</label><span>{{detailData.creditcode}}</span>
					</div>
					<div class="item">
						<label>组织机构代码：</label><span>{{detailData.orgnumber}}</span>
					</div>
				</div>
				<div class="items clearfix">
					<div class="item">
						<label>所属行业：</label><span>{{detailData.industry}}</span>
					</div>
					<div class="item">
						<label>人员规模：</label><span>{{detailData.companySize|companySize}}</span>
					</div>
					<div class="item">
						<label>经营范围：</label><span>{{detailData.opscope}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="list-card multi-colums">
			<h4>知识产权</h4>
			<div class="items-wrap">
				<div class="items clearfix">
					<div class="item">
						<label>授权发明专利：</label><span>{{detailData.inventionAuthPatentNum}}</span>
					</div>
					<div class="item">
						<label>实用新型专利：</label><span>{{detailData.utilityModelPatentNum}}</span>
					</div>
					<div class="item">
						<label>外观设计专利：</label><span>{{detailData.industrialDesignPatentNum}}</span>
					</div>
				</div>
				<div class="items clearfix">
					<div class="item">
						<label>软件著作权：</label><span>{{detailData.softCopyrightNum}}</span>
					</div>
					<div class="item">
						<label>作品著作权：</label><span>{{detailData.workCopyrightNum}}</span>
					</div>
					<!-- 
					<div class="item">
						<label>知识产权贯标：</label><span>{{detailData.intellectualPropertyIso|intellectualPropertyIso}}</span>
					</div>
				</div>
				<div class="items clearfix">
					<div class="item">
						<label>集成电路布图设计专有权：</label><span>{{detailData.icDesignNum}}</span>
					</div>
					 -->
					<div class="item">
						<label>有效商标数量：</label><span>{{detailData.effectiveTmNum}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="list-card research">
			<h4>调研入库</h4>
			<div class="items-wrap clearfix">
				<div class="list_title" v-if="detailData.inlibNum">入库次数总计：{{detailData.inlibNum}}</div>
				<div class="list_title" v-else style="font-weight: normal;">未入库</div>
				<div v-for="(item, index) in detailData.companyCultivationDTOs" :key="index">
					<div class="list" :class="{'list_hight': curIndex === index}">
						<span><a-icon :type="curIndex === index ? 'up-circle': 'down-circle'" class="up-circle mr10" />第{{detailData.companyCultivationDTOs.length - index}}次入库</span><span>时间：{{item.updateTime|dateFormat}}</span><span>方式：{{item.auditResult === 0 ? '数据导入' : item.auditResult === 1 ? '法人验证' : ''}}</span><span>入库：{{item.contact}}</span><span>手机：{{item.contactNumber}}</span><span>法人姓名：{{item.frname}}</span><span>法人手机：{{item.frphone}}</span><span class="switch" @click="curIndex = curIndex === index ? '' : index">{{curIndex === index ? '收起' : '展开'}}</span>
					</div>
					<div class="list_con clearfix" v-if="curIndex === index">
						<div class="list_title">评估结果：</div>
						<div class="halfs-wrap mt10 clearfix">
							<div class="half-wrap">
								<table width="100%" height="198">
									<tr>
										<th>编号</th>
										<th>项目名称</th>
										<th>评估结果</th>
										<th>指导意见</th>
									</tr>
									<tr v-for="(it, idx) in item.techSuitResultDTOs" v-if="idx < 6" :key="it.suitName">
										<td>{{idx+1}}</td>
										<td>{{it.suitName}}</td>
										<td>{{it.result|evaResult}}</td>
										<td>{{it.result|guideAdvice}}</td>
									</tr>
								</table>
							</div>
							<div class="half-wrap half-rig">
								<table width="100%" height="198">
									<tr>
										<th>编号</th>
										<th>项目名称</th>
										<th>评估结果</th>
										<th>指导意见</th>
									</tr>
									<tr v-for="(it, idx) in item.techSuitResultDTOs" v-if="idx >= 6" :key="it.suitName">
										<td>{{idx+1}}</td>
										<td>{{it.suitName}}</td>
										<td>{{it.result|evaResult}}</td>
										<td>{{it.result|guideAdvice}}</td>
									</tr>
								</table>
							</div>
						</div>
						<div class="list_title">调研结果：</div>
						<div class="list_con_wrap mt10">
							<div class="list_con_title">企业人员情况:</div>
							<div class="items clearfix">
								<div class="item">
									<label>企业人员总数：</label><span>{{item.companyNum || item.companyRoundNum || 0}}</span>
								</div>
								<div class="item">
									<label>研发人员总数：</label><span>{{item.researchNum || item.researchRoundNum || 0}}</span>
								</div>
								<div class="item">
									<label>本科或中级职称及以上：</label><span>{{item.collegeAboveRoundNum || 0}}</span>
								</div>
								<div class="item">
									<label>博士人数：</label><span>{{item.doctorSeniorNum || 0}}</span>
								</div>
							</div>
							<div class="list_con_title">企业近三年研发费用(万元):</div>
							<div class="items clearfix">
								<div class="item">
									<label>2016年：</label><span>{{item.research2016Cost || 0}}</span>
								</div>
								<div class="item">
									<label>2017年：</label><span>{{item.research2017Cost || 0}}</span>
								</div>
								<div class="item">
									<label>2018年：</label><span>{{item.research2018Cost || 0}}</span>
								</div>
							</div>
							<div class="list_con_title">企业近三年销售收入(万元):</div>
							<div class="items clearfix">
								<div class="item">
									<label>2016年：</label><span>{{item.sale2016 || 0}}</span>
								</div>
								<div class="item">
									<label>2017年：</label><span>{{item.sale2017 || 0}}</span>
								</div>
								<div class="item">
									<label>2018年：</label><span>{{item.sale2018 || 0}}</span>
								</div>
							</div>
							<div class="list_con_title">企业需求:</div>
							<div class="items clearfix">
								<div class="item">
									<label>是否有知识产权质押融资的需求：</label><span>{{item.wantPledge == 1 ? '有' : '否'}}</span>
								</div>
								<div class="item">
									<label>是否有技术对接需求(规划、购买、转化等)：</label><span>{{item.wantTechButt == 1 ? '有' : '否'}}</span>
								</div>
								<div class="item">
									<label>希望申请的资质荣誉：</label><span>{{item.wantQualification || '暂无'}}</span>
								</div>
								<div class="item">
									<label>已获得的资质荣誉：</label><span>{{item.qualification || '暂无'}}</span>
								</div>
							</div>
							<div class="list_con_title">补充信息:</div>
							<div class="items clearfix">
								<div class="item">
									<label>技术领域：</label><span>{{item.productField || '无'}}</span>
								</div>
								<div class="item">
									<label>是否与高校有合作：</label><span>{{item.cooperationUniversities == 1 ? '有' : '否'}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="list-card">
			<h4>认定资质</h4>
			<div class="items-wrap">
				<p>{{detailData.qualification || '暂无'}}</p>
			</div>
		</div>
		
		<!-- <div class="list-card qualification">
			<h4>认定资质</h4>
			<div class="items-wrap">
				<div class="items clearfix">
					<table width="66%">
						<tr>
							<th>项目名称</th>
							<th>认定时间</th>
						</tr>
						<tr>
							<td>国家高新技术企业</td>
							<td>2018</td>
						</tr>
						<tr>
							<td>国家高新技术企业</td>
							<td>2018</td>
						</tr>
					</table>
				</div>
			</div>
		</div> -->
		
		<abilityMap :show.sync="showAbilityMap" :saleResult="saleResult" :researchCostResult="researchCostResult" :intellectualPropertyResult="intellectualPropertyResult"/>
  </div>
</template>

<script>
	import Filters from 'utils/filters'
	import projectLists from 'utils/projectLists'
	import abilityMap from 'components/detail/abilityMap'
	const { pubFilters, statusFilters } = Filters
	export default {
		components: {
			abilityMap
		},
		data() {
	    return {
	    	showChart: false,
	    	showAbilityMap: false,
	    	saleResult:0,
	    	researchCostResult:0,
	    	intellectualPropertyResult: 1,
	      detailData: {
					passList: [],
					noPassList: []
				},
				allSubsidyNum: 0, //最高补助
				allReduction: 0, //最高税减百分比
				loading: false,
				type: '', // 用于是否是国高企业判断 type == 44
	      options: {
					chart: {
						type: 'column',
						height: 320,
						width: 460,
						marginBottom: 60,
					},
					colors: ['#3576FF'],
					title: {
						text: ' ',
						floating: false,
						verticalAlign: 'bottom',
						style: {
							fontSize:'12px',
						},
						margin: 30,
						useHTML: true,
					},
					xAxis: {
						categories: ['商标', '外观专利', '实用新型专利', '发明授权专利', '软件著作权', '作品著作权'],
						title: {
							text: null
						}
					},
					yAxis: {
						min: 0,
						title: {
							text: '数量(件)',
							align: 'high'
						},
						labels: {
							overflow: 'justify'
						}
					},
					tooltip: {
						valueSuffix: '件'
					},
					plotOptions: {
						bar: {
							dataLabels: {
								enabled: true,
								allowOverlap: true // 允许数据标签重叠
							}
						}
					},
					legend: {
						verticalAlign: 'middle',
						borderWidth: 1,
						backgroundColor: '#FFFFFF',
						shadow: true
					},
					series: [{
						name: '数量',
						showInLegend: false,
						data: [107, 31, 635],
						maxPointWidth: 30
					}]
				},
				projectLists: projectLists,
				curIndex: 0,
	    }
	  },
	  mounted() {
	  	let id = this.$route.query.id;
	  	this.type = this.$route.query.type;
	  	this.queryCompanyDetail(id);
	  },
		methods: {
			// 计算最高补助和最高税减百分比
      calSubsidy() {
        let allSubsidyNum = 0;
        let allReduction = 0;
        projectLists.forEach((item) => {
					if(!item.ignore){
						allSubsidyNum += item.subsidyNum;
						allReduction += item.reduction;
					}
        });
        //最高补助
        this.allSubsidyNum = allSubsidyNum;
        //最高税减百分比
        this.allReduction = allReduction >= 100 ? 100 : allReduction
      },
			back() {
				this.$router.go(-1);
			},
			toDetail(id) {
				this.$router.push({
					path: '/home/nationalTech/detail',
					query: {
						id
					}
				});
			},
			viewAbilityMap(item) {
				this.showAbilityMap = true;
				this.saleResult = item.saleResult;
				this.researchCostResult = item.researchCostResult;
				this.intellectualPropertyResult = item.intellectualPropertyResult;
			},
			async queryCompanyDetail(id) {
				this.loading = true;
				let data = await this.API.tech.queryCompanyDetailNew(id);
				this.loading = false;
				this.detailData = data || {};
				this.options.series[0].data = [
					data.effectiveTmNum || 0,
					data.industrialDesignPatentNum || 0,
					data.utilityModelPatentNum || 0,
					data.inventionPatentNum || 0,
					data.softCopyrightNum || 0,
					data.workCopyrightNum || 0,
				]
				this.showChart = true;
				this.calSubsidy();
				if(this.detailData.passList && this.detailData.passList.length){
					let arr = [];
					this.projectLists.forEach(item => {
						let hasPass = this.detailData.passList.find(pass => item.id===pass);
						if(!hasPass && item.id != 13){
							arr.push(item.id)
						}
					})
					this.detailData.noPassList = arr;
				}
				else{
					this.detailData.noPassList = [];
					this.projectLists.forEach(item=>{
						if(item.id != 13) {
							this.detailData.noPassList.push(item.id)
						}
					});
				}
			},
			handleChange() {},
			onChange(date, dateString) {
	      console.log(date, dateString);
	    }
		},
		filters: { ...pubFilters.filters, ...statusFilters.filters }
	}
</script>


<style lang="scss">
</style>
