import http from '@/plugins/flyio/request'
const { rootUrl } = CONFIG;

export default {
  /**
   * 项目看板
   */
  async companySubjectInfo (street) {
    const url = `${rootUrl}/admin/companySubjectInfo`;
    return await http.get(url, {street});
  },
   /**
   * 条形信息图（科技局） 
   */
  async cpOverviewChart (data) {
    const url = `${rootUrl}/admin/cpOverviewChart`;
    return await http.get(url, data);
  },
   /**
   * 条形信息图（街道） 
   */
  async jpOverviewChartStreet (data) {
    const url = `${rootUrl}/street/jpOverviewChart`;
    return await http.get(url, data);
  },
   /**
   * 储备库概况 
   */
  async ccOverview (data) {
    const url = `${rootUrl}/street/ccOverview`;
    return await http.get(url, data);
  },
   /**
   * 知识产权概况 
   */
  async ccIpCount (data) {
    const url = `${rootUrl}/street/ccIpCount`;
    return await http.get(url, data);
  },
  /**
   * 创业人才库概况 
   */
  async talentsCount (data) {
    const url = `${rootUrl}/admin/getTechStatisticsList`;
    return await http.get(url, data);
  }
}
