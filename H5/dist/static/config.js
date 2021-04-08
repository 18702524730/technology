var rootConfig = {
	rootUrl: '//user.ipsebe.com',
  indexUrl: '//technology.ipsebe.com',
  techUrl: '//technology.ipsebe.com',
  cartUrl: '//cart.ipsebe.com',
  czUrl:'//cz.ipsebe.com',
  userUrl: '//user.ipsebe.com',
  payUrl: '//iprp.ipsebe.com',
  wxUrl: '//wechat.ipsebe.com/weixin',
  toolsUrl: '//tools.ipsebe.com',
  itechUrl: '//technology.ipsebe.com/mytech', //代理到https://www.itech4u.cn
};
if (location.host.indexOf('localhost') === 0) {
	rootConfig = {
	  rootUrl: '//localhost:8083/iprp_portal',
    indexUrl: '//localhost:8083/ipsebe-technology-web',
    techUrl: '//localhost:8083/technology',
    cartUrl: '//localhost:8083/portalsite-cnsebe',
    czUrl: '//localhost:8083/cz',
    userUrl: '//localhost:8083/iprp_portal',
    payUrl: '//localhost:8083/pay',
    wxUrl: '//localhost:8083/weixin',
    toolsUrl: '//localhost:8083/tools',
    itechUrl: '//localhost:8083/mytech', //代理到https://www.itech4u.cn
	};
}
if (location.host.indexOf('192.168') === 0) {
	rootConfig = {
	  rootUrl: '//localhost:8083/iprp_portal',
    indexUrl: '//192.168.1.14:8083/ipsebe-technology-web',
    techUrl: '//192.168.1.14:8083',
    cartUrl: '//localhost:8083/portalsite-cnsebe',
    czUrl: '//localhost:8083/cz',
    userUrl: '//localhost:8083/iprp_portal',
    payUrl: '//localhost:8083/pay',
    wxUrl: '//localhost:8083/weixin',
    toolsUrl: '//localhost:8083/tools',
    itechUrl: '//localhost:8083/mytech', //代理到https://www.itech4u.cn
	};
}
if (location.host.indexOf('test') === 0) {
	rootConfig = {
	  rootUrl: '//testuser.ipsebe.com',
    indexUrl: '//testtechnology.ipsebe.com',
    techUrl: '//testtechnology.ipsebe.com',
    cartUrl: '//testcart.ipsebe.com',
    czUrl:'//testcz.ipsebe.com',
    userUrl: '//testuser.ipsebe.com',
    payUrl: '//testiprp.ipsebe.com',
    wxUrl: '//testwechat.ipsebe.com/weixin',
    toolsUrl: '//testtools.ipsebe.com',
    itechUrl: '//testtechnology.ipsebe.com/mytech', //代理到https://www.itech4u.cn
	};
}
if (location.host.indexOf('pre') === 0) {
	rootConfig = {
	  rootUrl: '//preuser.ipsebe.com',
    indexUrl: '//pretechnology.ipsebe.com',
    techUrl: '//pretechnology.ipsebe.com',
    cartUrl: '//precart.ipsebe.com',
    czUrl:'//precz.ipsebe.com',
    userUrl: '//preuser.ipsebe.com',
    payUrl: '//preiprp.ipsebe.com',
    wxUrl: '//prewechat.ipsebe.com/weixin',
    toolsUrl: '//pretools.ipsebe.com',
    itechUrl: '//pretechnology.ipsebe.com/mytech', //代理到https://www.itech4u.cn
	};
}

window.CONFIG = rootConfig;
