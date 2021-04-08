var rootConfig = {
  rootUrl: 'https://technology.ipsebe.com',
  indexUrl: 'https://technology.ipsebe.com'
};
if (location.host.indexOf('localhost') === 0 || /^\d{1,3}\.[^]*/.test(location.host)) {
  rootConfig = {
    rootUrl: 'http://' + location.host + '/admin_fe',
    indexUrl: 'http://' + location.host,
  }
}
if (location.host.indexOf('test') === 0) {
  rootConfig = {
    rootUrl: 'https://testtechnology.ipsebe.com',
    indexUrl: 'https://testtechnology.ipsebe.com'
  }
}
//临时版本
if (location.host.indexOf('kechuangyun') >-1) {
  rootConfig = {
    rootUrl: 'http://jianggan.kechuangyun.net',
    indexUrl: 'http://jianggan.kechuangyun.net'
  }
}
if (location.host.indexOf('pre') === 0) {
  rootConfig = {
    rootUrl: 'https://pretechnology.ipsebe.com',
    indexUrl: 'https://pretechnology.ipsebe.com'
  }
}

export default rootConfig
