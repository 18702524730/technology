<template>
	<div class="detail-list-wrap areaHundredDetail">
		<div class="back">
			<a-icon type="left-circle" @click="back" /><span @click="back">返回列表</span>
		</div>
		<div class="title" v-if="talentDetail.achieve=='已落地'">{{talentDetail.name}}（{{talentDetail.achieve}}-{{talentDetail.companyName}}）</div>
		<div class="title" v-else-if="talentDetail.achieve=='对接中' || talentDetail.achieve=='不落地'">{{talentDetail.name}}（{{talentDetail.achieve}}）</div>
		<div class="title" v-else>{{talentDetail.name}}</div>
		<a-tabs defaultActiveKey="1" @change="tabChange" class="tab">
	    <a-tab-pane tab="百人信息" key="1">
	    	<div class="list-card multi-colums">
					<h4>人才信息<span @click="showModal(1)"><a-icon type="form" class="mr5" />修改</span></h4>
					<div class="items-wrap">
						<div class="items clearfix">
							<div class="item">
								<label>姓名：</label><span>{{talentDetail.name}}</span>
							</div>
							<div class="item">
								<label>毕业院校：</label><span>{{talentDetail.graduate}}</span>
							</div>
							<div class="item">
								<label>学历职称：</label><span>{{talentDetail.education}}</span>
							</div>
						</div>
						<div class="items clearfix">
							<div class="item">
								<label>人才资质情况：</label><span>{{talentDetail.qualifications}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="list-card multi-colums">
					<h4>项目及落地情况<span @click="showModal(2)"><a-icon type="form" class="mr5" />修改</span></h4>
					<div class="items-wrap">
						<div class="items clearfix">
							<div class="item">
								<label>项目名称：</label><span>{{talentDetail.projectName}}</span>
							</div>
							<div class="item">
								<label>项目类别：</label><span>{{talentDetail.projectCategory}}</span>
							</div>
							<div class="item">
								<label>所属行业：</label><span>{{talentDetail.industry}}</span>
							</div>
						</div>
						<div class="items clearfix">
							<div class="item">
								<label>推荐机构：</label><span>{{talentDetail.agency}}</span>
							</div>
							<div class="item">
								<label>评审时间：</label><span>{{talentDetail.reviewTime}}</span>
							</div>
							<div class="item">
								<label>项目来源：</label><span>{{talentDetail.from}}</span>
							</div>
						</div>
						<div class="items clearfix">
							<div class="item">
								<label>立项时间：</label><span>{{talentDetail.buildTime|dateFormat("date")}}</span>
							</div>
							<div class="item">
								<label>企业落地情况：</label><span>{{talentDetail.achieve}}</span>
							</div>
							<div class="item">
								<label>落地时间：</label><span>{{talentDetail.achieveTime|dateFormat("date")}}</span>
							</div>
						</div>
						<div class="items clearfix">
							<div class="item">
								<label>落地单位：</label><span>{{talentDetail.street|street}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="list-card multi-colums">
					<h4>落地企业信息（科技局提供）<span @click="showModal(3)"><a-icon type="form" class="mr5" />修改</span></h4>
					<div class="items-wrap">
						<div class="items clearfix">
							<div class="item">
								<label>企业名称：</label><span>{{talentDetail.companyName}}</span>
							</div>
							<div class="item">
								<label>注册时间：</label><span>{{talentDetail.regDate|dateFormat("date")}}</span>
							</div>
							<div class="item">
								<label>法人姓名：</label><span>{{talentDetail.frname}}</span>
							</div>
						</div>
						<div class="items clearfix">
							<div class="item">
								<label>融资情况：</label><span>{{talentDetail.finance}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="list-card multi-colums">
					<h4>资助情况（万元）<span @click="showModal(4)"><a-icon type="form" class="mr5" />修改</span></h4>
					<div class="items-wrap">
						<div class="items clearfix">
							<div class="item">
								<label>资助总额：</label><span>{{talentDetail.supportAmount}}</span>
							</div>
							<div class="item">
								<label>30%已兑现金额：</label><span>{{talentDetail.promiseCash30}}</span>
							</div>
							<div class="item">
								<label>70%已兑现金额：</label><span>{{talentDetail.promiseCash70}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="list-card multi-colums">
					<h4>税收情况（万元）<span @click="showModal(5)"><a-icon type="form" class="mr5" />修改</span></h4>
					<div class="items-wrap">
						<div class="items clearfix">
							<div class="item">
								<label>2016年税收：</label><span>{{talentDetail.tax2016}}</span>
							</div>
							<div class="item">
								<label>2017年税收：</label><span>{{talentDetail.tax2017}}</span>
							</div>
							<div class="item">
								<label>2018年税收：</label><span>{{talentDetail.tax2018}}</span>
							</div>
						</div>
						<div class="items clearfix">
							<div class="item">
								<label>2019年2月税收：</label><span>{{talentDetail.tax2019}}</span>
							</div>
						</div>
					</div>
				</div>
	    </a-tab-pane>
	    <a-tab-pane tab="企业信息" key="2" forceRender v-if="talentDetail.achieve=='已落地'">
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
						<template v-for="(item, index) in detailData.companyCultivationDTOs">
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
											<tr v-for="(it, idx) in item.techSuitResultDTOs" v-if="idx<6" :key="idx">
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
											<tr v-for="(it, idx) in item.techSuitResultDTOs" v-if="idx>=6" :key="idx">
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
						</template>
					</div>
				</div>

				<div class="list-card">
					<h4>认定资质</h4>
					<div class="items-wrap">
						<p>{{detailData.qualification || '暂无'}}</p>
					</div>
				</div>
				<abilityMap :show.sync="showAbilityMap" :saleResult="saleResult" :researchCostResult="researchCostResult" :intellectualPropertyResult="intellectualPropertyResult"/>
	    </a-tab-pane>
	  </a-tabs>
	  <a-modal
      v-model="visible"
      :title="titleList[modalIndex-0]+'修改'"
      onOk="handleOk"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel">取 消</a-button>
        <a-button key="submit" type="primary" @click="handleOk">确定</a-button>
      </template>
      <a-form :form="form">
      	<template v-if="modalIndex==1">
			    <a-form-item
			      v-bind="formItemLayout"
			      label="姓名"
			    	>
			      <a-input id="error" placeholder="请输入姓名" 
				      v-decorator="[
			          'name',
			          {
			            rules: [{
			              type:'string', required: false, message: '请输入姓名!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="毕业院校"
			    	>
			      <a-input id="error" placeholder="请输入毕业院校" 
				      v-decorator="[
			          'graduate',
			          {
			            rules: [{
			              type:'string', required: false, message: '请输入毕业院校!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="学历职称"
			    	>
		        <a-select placeholder="请选择学历职称" allowClear v-decorator="[
			          'education',
			          {
			            rules: [{
			              type:'string', required: false, message: '请选择学历职称!',
			            }]
			          }
			        ]">
			        <a-select-option v-for="(item, index) in educationList" :value="item" :key="index">
			          {{item}}
			        </a-select-option>
			      </a-select>
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="人才资质情况"
			    	>
			      <a-input id="error" placeholder="请输入人才资质情况" 
				      v-decorator="[
			          'qualifications',
			          {
			            rules: [{
			              type:'string', required: false, message: '请输入人才资质情况!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
		    </template>
		    <template v-if="modalIndex==2">
			    <a-form-item
			      v-bind="formItemLayout"
			      label="项目名称"
			    	>
			      <a-input id="error" placeholder="请输入项目名称" 
				      v-decorator="[
			          'projectName',
			          {
			            rules: [{
			              type:'string', required: false, message: '请输入项目名称!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="项目类别"
			    	>
			    	<a-select placeholder="请选择项目类别" allowClear v-decorator="[
			          'projectCategory',
			          {
			            rules: [{
			              type:'string', required: false, message: '请选择项目类别!',
			            }]
			          }
			        ]">
			        <a-select-option v-for="(item, index) in projectCategoryList" :value="item" :key="item">
			          {{item}}
			        </a-select-option>
			      </a-select>
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="所属行业"
			    	>
		        <a-select placeholder="请选择所属行业" allowClear v-decorator="[
			          'industry',
			          {
			            rules: [{
			              type:'string', required: false, message: '请选择所属行业!',
			            }]
			          }
			        ]">
			        <a-select-option v-for="(item, index) in industryList" :value="item" :key="item">
			          {{item}}
			        </a-select-option>
			      </a-select>
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="推荐机构"
			    	>
		        <a-select placeholder="请选择推荐机构" allowClear v-decorator="[
			          'agency',
			          {
			            rules: [{
			              type:'string', required: false, message: '请选择推荐机构!',
			            }]
			          }
			        ]">
			        <a-select-option v-for="(item, index) in agencyList" :value="item" :key="item">
			          {{item}}
			        </a-select-option>
			      </a-select>
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="评审时间"
			    	>
		        <a-select placeholder="请选择评审时间" allowClear v-decorator="[
			          'reviewTime',
			          {
			            rules: [{
			              type:'string', required: false, message: '请选择评审时间!',
			            }]
			          }
			        ]">
			        <a-select-option v-for="(item, index) in reviewTimeList" :value="item" :key="item">
			          {{item}}
			        </a-select-option>
			      </a-select>
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="项目来源"
			    	>
		        <a-select placeholder="请选择项目来源" allowClear v-decorator="[
			          'from',
			          {
			            rules: [{
			              type:'string', required: false, message: '请选择项目来源!',
			            }]
			          }
			        ]">
			        <a-select-option v-for="(item, index) in fromList" :value="item" :key="item">
			          {{item}}
			        </a-select-option>
			      </a-select>
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="立项时间"
			    	>
			    	<a-date-picker :format="dateFormat" style="width: 100%" placeholder="请选择立项时间" 
				      v-decorator="[
			          'buildTime',
			          {
			            rules: [{
			              type: 'object', required: false, message: '请选择立项时间!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="企业落地情况"
			    	>
			    	<a-select placeholder="请选择企业落地情况" allowClear v-decorator="[
			          'achieve',
			          {
			            rules: [{
			              type:'string', required: false, message: '请选择企业落地情况!',
			            }]
			          }
			        ]">
			        <a-select-option v-for="(item, index) in achieveList" :value="item" :key="item">
			          {{item}}
			        </a-select-option>
			      </a-select>
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="落地时间"
			    	>
			    	<a-date-picker :format="dateFormat" style="width: 100%" placeholder="请选择落地时间" 
				      v-decorator="[
			          'achieveTime',
			          {
			            rules: [{
			              type: 'object', required: false, message: '请选择落地时间!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="落地单位"
			    	>
		        <a-select placeholder="请选择落地单位" allowClear v-decorator="[
			          'street',
			          {
			            rules: [{
			              type: 'number', required: false, message: '请选择落地单位!',
			            }]
			          }
			        ]">
			        <a-select-option v-for="(item, index) in streetList" :value="item.value-0" :key="item.value">
			          {{item.name}}
			        </a-select-option>
			      </a-select>
			    </a-form-item>
		    </template>
		    <template v-if="modalIndex==3">
			    <a-form-item
			      v-bind="formItemLayout"
			      label="企业名称"
			    	>
			      <a-input id="error" placeholder="请输入企业名称" 
			      	disabled 
				      v-decorator="[
			          'companyName',
			          {
			            rules: [{
			              type:'string', required: false, message: '请输入企业名称!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="注册时间"
			    	>
		        <a-date-picker :format="dateFormat" style="width: 100%" placeholder="请选择注册时间" 
				      v-decorator="[
			          'regDate',
			          {
			            rules: [{
			              type: 'object', required: false, message: '请选择注册时间!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="法人姓名"
			    	>
			      <a-input id="error" placeholder="请输入法人姓名" 
				      v-decorator="[
			          'frname',
			          {
			            rules: [{
			              type:'string', required: false, message: '请输入法人姓名!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="融资情况"
			    	>
			      <a-input id="error" placeholder="请输入融资情况" 
				      v-decorator="[
			          'finance',
			          {
			            rules: [{
			              type:'string', required: false, message: '请输入融资情况!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
		    </template>
		    <template v-if="modalIndex==4">
			    <a-form-item
			      v-bind="formItemLayout"
			      label="资助总额"
			    	>
			      <a-input id="error" placeholder="请输入资助总额" 
				      v-decorator="[
			          'supportAmount',
			          {
			            rules: [{
			              required: false, message: '请输入资助总额!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="30%已兑现金额"
			    	>
			      <a-input id="error" placeholder="请输入30%已兑现金额" 
				      v-decorator="[
			          'promiseCash30',
			          {
			            rules: [{
			              required: false, message: '请输入30%已兑现金额!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="70%已兑现金额"
			    	>
			      <a-input id="error" placeholder="请输入70%已兑现金额" 
				      v-decorator="[
			          'promiseCash70',
			          {
			            rules: [{
			              required: false, message: '请输入70%已兑现金额!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
		    </template>
		    <template v-if="modalIndex==5">
			    <a-form-item
			      v-bind="formItemLayout"
			      label="2016年税收"
			    	>
			      <a-input id="error" placeholder="请输入2016年税收" 
				      v-decorator="[
			          'tax2016',
			          {
			            rules: [{
			              required: false, message: '请输入2016年税收!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="2017年税收"
			    	>
			      <a-input id="error" placeholder="请输入2017年税收" 
				      v-decorator="[
			          'tax2017',
			          {
			            rules: [{
			              required: false, message: '请输入2017年税收!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="2018年税收"
			    	>
			      <a-input id="error" placeholder="请输入2018年税收" 
				      v-decorator="[
			          'tax2018',
			          {
			            rules: [{
			              required: false, message: '请输入2018年税收!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
			    <a-form-item
			      v-bind="formItemLayout"
			      label="2019年2月税收"
			    	>
			      <a-input id="error" placeholder="请输入2019年2月税收" 
				      v-decorator="[
			          'tax2019',
			          {
			            rules: [{
			              required: false, message: '请输入2019年2月税收!',
			            }]
			          }
			        ]"
		        />
			    </a-form-item>
		    </template>
		  </a-form>
    </a-modal>
  </div>
</template>

<script>
	import Filters from 'utils/filters'
	import projectLists from 'utils/projectLists'
	import abilityMap from 'components/detail/abilityMap'
	import moment from 'moment';
	const { pubFilters, statusFilters } = Filters
	const achieveList = ['已落地', '对接中', '不落地'];
	const streetList = [
		{
			name:'不确定',
			value: '0',
		},
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
	const educationList = ['博士', '硕士', '学士'];
	export default {
		components: {
			abilityMap
		},
		data() {
	    return {
	    	achieveList,
	    	streetList,
	    	educationList,
	    	reviewTimeList: [],
	    	projectCategoryList: [],
	    	fromList: [],
	    	industryList: [],
	    	agencyList: [],
	    	showChart: false,
	    	showAbilityMap: false,
	    	saleResult:0,
	    	researchCostResult:0,
	    	intellectualPropertyResult: 1,
	      detailData: {
					passList: [],
					noPassList: []
				},
				talentDetail: {},
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
				visible: false,
				formItemLayout: {
	        labelCol: {
	          xs: { span: 24 },
	          sm: { span: 6 },
	        },
	        wrapperCol: {
	          xs: { span: 24 },
	          sm: { span: 18 },
	        },
	      },
	      modalIndex: 1,
	      dateFormat: 'YYYY-MM-DD',
	      titleList:['人才信息', '项目及落地情况', '落地企业信息', '资助情况', '税收情况'],
	      curIndex: 0,
	    }
	  },
	  beforeCreate () {
	    this.form = this.$form.createForm(this);
	  },
	  mounted() {
	  	let id = this.$route.query.id;
	  	this.type = this.$route.query.type;
	  	this.id = id;
	  	this.getTalentDetail(id);
	  	this.getFromList();
	  	this.getProjectCategoryList();
	  	this.getReviewTimeList();
	  	this.getAgencyList();
	  	this.getIndustryList();
	  },
		methods: {
			moment,
			async getReviewTimeList() {
	    	let resp = await this.API.tech.getReviewTimeList();
	    	this.reviewTimeList = resp;
	    },
	    async getFromList() {
	    	let resp = await this.API.tech.getFromList();
	    	this.fromList = resp;
	    },
	    async getProjectCategoryList() {
	    	let resp = await this.API.tech.getProjectCategoryList();
	    	this.projectCategoryList = resp;
	    },
	    async getAgencyList() {
	    	let resp = await this.API.tech.getAgencyList();
	    	this.agencyList = resp;
	    },
	    async getIndustryList() {
	    	let resp = await this.API.tech.getIndustryList();
	    	this.industryList = resp;
	    },
			showModal(index) {
	      this.visible = true;
	      this.modalIndex = index;
	      setTimeout(() => {
	      	let d = this.talentDetail;
	      	for(let key in d) {
	      		if (key === 'buildTime' || key === 'achieveTime' || key === 'regDate') {
	      			let t = pubFilters.filters.dateFormat(d[key], "date");
	      			d[key] = d[key] ? moment(t, this.dateFormat) : null;
	      			console.log(d[key])
	      		}
	      	}
	      	this.form.setFieldsValue(d);
	      }, 200);
	    },
	    handleOk(e) {
	    	this.form.validateFieldsAndScroll(async (err, values) => {
	        if (!err) {
	          console.log('Received values of form: ', values);
	          await this.API.tech.updateTalent({...values, id: this.id});
	          this.getTalentDetail(this.id);
	          this.visible = false;
	          this.$message.success('保存成功！');
	        }
	      });
	      /*this.loading = true;
	      setTimeout(() => {
	        this.visible = false;
	        this.loading = false;
	      }, 3000);*/
	    },
	    handleCancel(e) {
	      this.visible = false;
	    },
			tabChange(key) {
				if (key == 2 && !this.detailData.companyName) {
					this.queryCompanyDetail(this.talentDetail.companyId);
				}
			},
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
			async getTalentDetail(id) {
				this.loading = true;
				let data = await this.API.tech.getTalentDetail(id);
				this.loading = false;
				this.talentDetail = data || {};
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
.areaHundredDetail{
	>.title{font-size:18px;line-height: 25px;height: 25px;font-weight: 600;margin-top: 20px;}
	.tab{
		margin-top:20px; 
		.ant-tabs-nav .ant-tabs-tab{font-size:14px;border:1px solid #DDDDDD;border-radius: 19px;height: 32px;line-height: 30px;padding: 0 20px;margin-right: 10px;}
		.ant-tabs-nav-wrap{margin-bottom: 0;}
		.ant-tabs-nav .ant-tabs-tab-active{font-size:14px;background-color: #3576FF;border:1px solid #3576FF;color: #fff;}
		.ant-tabs-ink-bar-animated{display: none!important;}
		.ant-tabs-bar{border-bottom: 0;margin-bottom: 20px;}
	}
}
.ant-form-item{margin-bottom: 10px;}
</style>
