import http from '@/plugins/flyio/request'
const { rootUrl } = CONFIG;

export default {
  // 项目企业列表 new
  async projectCompanyList (data) {
    const url = `${rootUrl}/admin/companyList`;
    let d = { 
      ...data,
      queryType: 1
    }
    return await http.get(url, d);
  },
  // 总库企业列表 new
  async allCompanyList (data) {
    const url = `${rootUrl}/admin/companyList`;
    let d = { 
      ...data,
      queryType: 0
    }
    return await http.get(url, d);
  },
  // 百人计划列表
  async talentList (data) {
    const url = `${rootUrl}/admin/talentList`;
    return await http.post(url, data);
  },
  // 百人计划详细信息
  async getTalentDetail (id) {
    const url = `${rootUrl}/admin/getTalentDetail`;
    return await http.get(url, {id});
  },
  // 查询 项目来源列表
  async getFromList () {
    const url = `${rootUrl}/admin/getFromList`;
    return await http.get(url);
  },
  // 查询 项目类别列表
  async getProjectCategoryList () {
    const url = `${rootUrl}/admin/getProjectCategoryList`;
    return await http.get(url);
  },
  // 查询 评审时间列表
  async getReviewTimeList () {
    const url = `${rootUrl}/admin/getReviewTimeList`;
    return await http.get(url);
  },
  // 查询 推荐机构列表
  async getAgencyList () {
    const url = `${rootUrl}/admin/getAgencyList`;
    return await http.get(url);
  },
  // 查询 行业列表
  async getIndustryList () {
    const url = `${rootUrl}/admin/getIndustryList`;
    return await http.get(url);
  },
  // 修改百人计划详细信息
  async updateTalent (data) {
    const url = `${rootUrl}/admin/updateTalent`;
    return await http.post(url, data);
  },



	// 陈局_国高_参与调研企业
  async ggResearchStatistics () {
    const url = `${rootUrl}/admin/ggResearchStatistics`;
    return await http.get(url);
  },
  // 陈局_国高_需复评企业
  async ggReviewStatistics () {
    const url = `${rootUrl}/admin/ggReviewStatistics`;
    return await http.get(url);
  },
  // 陈局_国高_国高预估数量
  async ggYuguStatisticsAdmin () {
    const url = `${rootUrl}/admin/ggYuguStatistics`;
    return await http.get(url);
  },
  // 陈局_省科_参与调研企业
  async skResearchStatistics () {
    const url = `${rootUrl}/admin/skResearchStatistics`;
    return await http.get(url);
  },
  // 陈局_省科_已有称号企业
  async skExistStatistics () {
    const url = `${rootUrl}/admin/skExistStatistics`;
    return await http.get(url);
  },
  // 陈局_省科_省科预估数量
  async skYuguStatistics () {
    const url = `${rootUrl}/admin/skYuguStatistics`;
    return await http.get(url);
  },
  // 陈局_通用
  async cp (type) {
    const url = `${rootUrl}/admin/cp`;
    return await http.get(url, {type});
  },

  // 通用企业列表 old
  async cultivationList (data) {
    const url = `${rootUrl}/street/cultivationList`;
    return await http.get(url, data);
  },
  // 国高高新技术企业列表
  async getGgList (data) {
    const url = `${rootUrl}/street/ggList`;
    return await http.get(url, data);
  },
  // 省科技型企业列表
  async getSkList (data) {
    const url = `${rootUrl}/street/skList`;
    return await http.get(url, data);
  },
  // 查看企业详情
  async queryCompanyDetail (id) {
    const url = `${rootUrl}/street/queryCompanyDetail`;
    return await http.get(url, {id});
  },
  // 查看企业详情
  async queryCompanyDetailNew (id) {
    const url = `${rootUrl}/street/queryCompanyDetailNew`;
    return await http.get(url, {id});
  },


  // 街道_国高_ 参与调研企业
  async stggResearchStatistics () {
    const url = `${rootUrl}/street/ggResearchStatistics`;
    return await http.get(url);
  },
  // 街道_国高_需复评企业
  async stggReviewStatistics () {
    const url = `${rootUrl}/street/ggReviewStatistics`;
    return await http.get(url);
  },
  // 街道_国高_国高预估数量
  async stggYuguStatistics () {
    const url = `${rootUrl}/street/ggYuguStatistics`;
    return await http.get(url);
  },
  // 街道_省科_参与调研企业
  async stskResearchStatistics () {
    const url = `${rootUrl}/street/skResearchStatistics`;
    return await http.get(url);
  },
  // 街道_省科_已有称号企业
  async stskExistStatistics () {
    const url = `${rootUrl}/street/skExistStatistics`;
    return await http.get(url);
  },
  // 街道_省科_省科预估数量
  async stskYuguStatistics () {
    const url = `${rootUrl}/street/skYuguStatistics`;
    return await http.get(url);
  },
  // 陈局_通用
  async jp (type) {
    const url = `${rootUrl}/street/jp`;
    return await http.get(url, {type});
  },



}
