import http from '@/plugins/flyio/request'
import qs from 'qs'
const { rootUrl } = CONFIG;

export default {
  // 获取评估结果
  async getResult(name) {
    const url = `${rootUrl}/api/getResult`;
    let d = await http.get(url, {name}, {}, {
      isLoading: false
    });
    return d;
  },
  // 获取分享评估结果 v1.5
  async statistics(id) {
    const url = `${rootUrl}/api/statistics/${id}`;
    let d = await http.get(url, {}, {}, {
      isLoading: false
    });
    return d;
  },
  // 获取单项评估结果 v1.5
  async evaluateDetail (params) {
    const url = `${rootUrl}/api/evaluateDetail/${params.companyId}/${params.projectId}`;
    let d = await http.get(url, {}, {}, {
      isLoading: false
    });
    return d;
  },
  // 第一步导入企业
  async importCompany(params) {
    const url = `${rootUrl}/importCompanyName`;
    let d = await http.post(url, params);
    return d;
  },
  // 统计访问量
  async setPageView() {
    const url = `${rootUrl}/setPageView`;
    let d = await http.post(url, {}, {}, {
      isLoading: false
    });
    return d;
  },
  // 获取验证码
  async sendCode(phone) {
    const url = `${rootUrl}/sendCode`;
    let d = await http.get(url, {phone}, {}, {
      isLoading: false
    });
    return d;
  },
  // 获取法人验证码
  async sendFrCheckCode(params = {}) {
    const url = `${rootUrl}/sendFrCheckCode`;
    let d = await http.post(url, params, {}, {
      isLoading: false,
      isErrorDefaultTip: false
    });
    return d;
  },
  // 获取公司信息
  async getCorporation(content) {
    const url = `${rootUrl}/zcc/companyDetail`;
    let d = await http.get(url, {content}, {}, {
      isLoading: false
    });
    return d;
  },
  // 企业名称搜索
  async getCompanyNameList(name) {
    const url = `${rootUrl}/getCompanyNameList`;
    let d = await http.get(url, {name}, {}, {
      isLoading: false
    });
    return d;
  },
  // 获取用户企业列表
  async getCompanyList() {
    const url = `${rootUrl}/getCompanyList`;
    let d = await http.get(url, {}, {}, {
      isLoading: false
    });
    return d;
  },
  // 删除企业
  async deleteCompany(id, companyName) {
    const url = `${rootUrl}/delCompany`;
    let d = await http.post(url, {id, companyName}, {}, {
      isLoading: false
    })
    return d;
  },
  // 提交入库
  async inlib(companyName, code) {
    const url = `${rootUrl}/inlib`;
    let d = await http.post(url, {companyName, code}, {}, {
      isLoading: false,
      isErrorDefaultTip: false
    });
    return d
  },
}
