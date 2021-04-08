var rootConfig = {}
if (process.env.METHOD === 'production') {
  rootConfig = {
  	rootUrl: 'https://jgkj.ipsebe.com',
    indexUrl: 'https://www.ipsebe.com',
    cartUrl: 'https://cart.ipsebe.com',
    czUrl:'https://cz.ipsebe.com',
    userUrl: 'https://user.ipsebe.com',
    payUrl: 'https://iprp.ipsebe.com',
    cmsUrl: 'http://cms.ipsebe.com',
    wxUrl: 'https://wechat.ipsebe.com',
    toolsUrl: 'https://tools.ipsebe.com',
    itechUrl: ' https://technology.ipsebe.com/mytech', //代理到https://www.itech4u.cn
    webfileUrl: 'https://www.ipsebe.com/cms/webfile/',  //首頁CMS圖片
  };
}else{
	rootConfig = {
	  rootUrl: 'https://testjgkj.ipsebe.com',
    indexUrl: 'https://testwww.ipsebe.com',
    cartUrl: 'https://testcart.ipsebe.com',
    czUrl:'https://testcz.ipsebe.com',
    userUrl: 'https://testuser.ipsebe.com',
    payUrl: 'https://testiprp.ipsebe.com',
    wxUrl: 'https://testwechat.ipsebe.com',
    cmsUrl: 'http://testcms.ipsebe.com',
    toolsUrl: 'https://testtools.ipsebe.com',
    itechUrl: 'https://testtechnology.ipsebe.com/mytech', //代理到https://www.itech4u.cn
    webfileUrl: 'https://testwww.ipsebe.com/cms/webfile/',  //首頁CMS圖片
	};
}

const cfg = {
  // 指定首页的路径, 方便统一跳转和开发调试用
  indexPath: '/pages/index/pagehome'
}

export default Object.assign({}, rootConfig, cfg)
