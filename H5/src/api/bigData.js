import http from 'axios'
//import http from 'src/plugins/flyio/request'
const { itechUrl } = CONFIG;

export default {
  /**
   * 模糊查询大数据关键词
   */
  async suggestField(keyword) {
    const url = `${itechUrl}/api/h5/suggestField?keyword=${keyword}`;
    return await http.get(url);
  }
}
