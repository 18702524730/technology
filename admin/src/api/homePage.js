import http from '@/plugins/flyio/request'
const { rootUrl } = CONFIG;

export default {
  /**
   * 商铺也查询
   */
  async index (data) {
    const url = `${rootUrl}/admin/index`;
    return await http.get(url, data);
  },
  // 首页统计数据
  async home (data) {
    const url = `${rootUrl}/home`;
    return await http.get(url, data);
  },
  // 知识产权看板
  async ipInfo (params) {
    const url = `${rootUrl}/admin/ipInfo`;
    return await http.get(url, params);
  }
}
