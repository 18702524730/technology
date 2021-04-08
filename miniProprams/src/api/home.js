import http from '@/plugins/flyio/request'
const { cartUrl, indexUrl, wxUrl, rootUrl } = CONFIG;

export default {
  async gettime(data){
    const url = `${rootUrl}/techjg/techinnovation/getRegisterTime`;
    return await http.get(url, data);
  },
  async postceping(params) {
    const url = `${rootUrl}/techjg/techinnovation/lianke`;
    return await http.post(url, params,{},{isLoading: true});
  },
  /**
   * 根据推单id查询详情
   */
  async getInfo(id) {
    const url = `${cartUrl}/asistant/asistantList.htm`;
    return await http.get(url, {asistantOrderCustomerId : id});
  },
  /**
   * 首页信息列表-详情
   */
  async contentAttribute(parmas) {
    const url = `${indexUrl}/cms/api/directive/contentAttribute`;
    return await http.get(url, parmas);
  },
  /**
   * 首页-查询轮播资讯信息
   */
  async contentList(parmas) {
    const url = `${indexUrl}/cms/api/directive/contentList`;
    return await http.get(url, parmas, {}, {
      isLoading: false
    });
  },
  // 发送附件
  async sendMail(parmas) {
    const url = `${rootUrl}/tool/sendMail`;
    return await http.post(url, parmas, {}, {
      isLoading: false
    });
  },
 /**
  * 获取二维码
  */
 async createwxaqrcode (params) {
    const url = `${wxUrl}/weixin/miniApp2/createwxaqrcode.do`;
    return await http.post(url, params, {}, {isLoading: true})
  },
}
