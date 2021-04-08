var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

export default {
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    formatDate: {
        //日期转yyyy-mm-dd格式
        format: function (input, type) {
            if(input == null || input=='' || typeof(input) == "undefined"){
                return "--";
            }
            var _date = new Date(input);
            var year = _date.getFullYear();
            var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
            var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
            if(type == "date"){
                return year + "-" + month + "-" + day;
            } else {
                return year + "-" + month + "-" + day;
            }
            return "--";
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        },
        //日期转时间戳
        timeStamp:function(date){
            var timestamp = Date.parse(new Date(date));
            timestamp = timestamp / 1000;
            return timestamp
        },
        //日期格式转换
        dateFormat: function (input,type) {
            if(input == null || input=='' || typeof(input) == "undefined"){
                return "--";
            }
            var _date = new Date(input);
            var year = _date.getFullYear();
            var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
            var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
            var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
            var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
            var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
            if(type == "date"){
                return year + "-" + month + "-" + day;
            } else if(type == "time") {
                return hour + ":" + minutes + ":" + seconds;
            } else {
                return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
            }
            return "--";
      }
    },
    //订单状态
    orderStatusformat: function (input) {
      var ret = ''
      switch (input+''){
        case '-1':
          ret = "已关闭";
          break;
        case '0':
          ret = "待付款";
          break;
        case '1':
          ret = "已付款";
          break;
        case '2':
          ret = "已完成";
          break;
      }
      return ret;
    },
    //支付状态
    payStatusformat: function (input) {
      var ret = ''
      switch (input+''){
        case '0':
          ret = "未支付";
          break;
        case '1':
          ret = "已支付";
          break;
      }
      return ret;
    },
    //价格保留两位小数
    priceformat: function (input) {
      var ret = '';
      // input 有可能是数字0
      if (input !== null && input !== undefined) {
        ret = input - 0 +'';
        if(ret === 0){
          ret = 0;
        }else{
          ret = (ret-0).toFixed(2);
        }
      }
      return ret;
    },
    //价格转换为万元
    priceUnitFilter(td){
      var ret = td/10000+'';
      if(ret.indexOf('.') !== -1){
        ret = (ret-0).toFixed(2);
        ret = ret.replace(/((\.0{1,2})|0)$/, '');
      }
      return ret;
    },
    refundStateFilter(input){
      var ret = ''
      switch (input+''){
        case '0':
          ret = "待受理";
          break;
        case '1':
          ret = "退款中";
          break;
        case '2':
          ret = "已退款";
          break;
        case '3':
          ret = "已驳回";
          break;
      }
      return ret;
    },
    notarizationStatusformat(input){
      var ret = ''
      switch (input+''){
        case '0':
          ret = "待存证";
          break;
        case '1':
          ret = "存证中";
          break;
        case '2':
          ret = "存证失败";
          break;
        case '3':
          ret = "存证成功";
          break;
      }
      return ret;
    },
    notarizationUsesformat(input){
      var ret = ''
      switch (input+''){
        case '1':
          ret = "电商维权";
          break;
        case '2':
          ret = "自媒体内容维权";
          break;
        case '3':
          ret = "设计作品未经授权发布";
          break;
        case '4':
          ret = "文字创作存证";
          break;
        case '5':
          ret = "美术作品存证";
          break;
        case '6':
          ret = "音乐作品存证";
          break;
        case '7':
          ret = "影像摄影存证";
          break;
        case '8':
          ret = "其他";
          break;
      }
      return ret;
    },
    fileSizeFilter(v){
      if (!v) {
        return '';
      }
      var ret = v;
      if (v > 1024*1024) {
        ret = (ret/1024/1024).toFixed(1) + 'M';
      }else{
        var t = (ret/1024).toFixed(1);
        ret = (t === '0.0' ? '0.1' : t) + 'KB';
      }
      return ret;
    },
    formatPatent:{
        //专利类型转换
        format: function (input) {
            if(input == null || input=='' || typeof(input) == "undefined"){
                return "";
            }else{
                switch (input){
                    case 1:
                        return "发明专利";
                    case 2:
                        return "实用新型专利";
                    case 3:
                        return "外观设计专利";
                }
            }
        }
    },
    formatIPRClassify:{
        //知产分类转换
        format: function (input) {
            switch (input){
                case 0:
                    return "商标";
                case 1:
                    return "专利";
            }
        }
    },
    formatStatus:{
        //会员状态转换
        format: function (input) {
            switch (input){
                case false:
                    return 0;
                case true:
                    return 1;
            }
        }
    },
    //申请主体类型
    formatApplySbj:{
      format: function (input) {
        switch (input){
          case 1:
            return "大陆个体";
          case 2:
            return "大陆企业";
          case 3:
            return "境外个体";
          case 4:
            return "境外企业";
        }
      }
    },
    titleLengthFormat (input) {
      if (input && input.length>46) {
        return input.slice(0,45)+'...';
      }
      return input;
    },
    //IPT行为类型筛选
    logTypeFil: function (input) {
      switch (input){
        case 0:
          return '注册';
        case 1:
          return '登录';
        case 2:
          return '签到';
        case 3:
          return '邀请别人注册';
        case 4:
          return '邀请别人开店';
        case 5:
          return '开店';
        case 6:
          return '订单完成';
        case 7:
          return '服务完成';
        case 8:
          return '季度分红';
        case 9:
          return '服务评价';
      }
    },
    street: function (input) {
      switch (input+''){
        case '1':
          return '闸弄口街道';
        case '2':
          return '凯旋街道';
        case '3':
          return '采荷街道';
        case '4':
          return '四季青街道';
        case '5':
          return '笕桥街道';
        case '6':
          return '彭埠街道';
        case '7':
          return '钱塘智慧城';
        case '8':
          return '丁兰街道';
        default:
          return '--'
      }
    },
    productField: function (input) {
      switch (input+''){
        case '1':
          return '电子信息';
        case '2':
          return '生物与新医药';
        case '3':
          return '航空航天';
        case '4':
          return '新材料';
        case '5':
          return '高技术服务';
        case '6':
          return '新能源与节能';
        case '7':
          return '资源与环境';
        case '8':
          return '先进制造及自动化';
      }
    },
    apply2019Status: function (input) {
      switch (input+''){
        case '1':
          return '2019新认定';
        case '2':
          return '2019复评';
        case '3':
          return '2020新认定';
        case '4':
          return '2020复评';
        case '5':
          return '2021新认定';
        case '6':
          return '2021复评';
        case '7':
          return '暂无意向';
        default: 
          return '--'
      }
    },
    companySize: function (input) {
      switch (input+''){
        case '1':
          return '50人以下';
        case '2':
          return '50～100人';
        case '3':
          return '100人以上';
      }
    },
    // 是否有知识产权质押需求
    wantPledgeFil: function (input) {
      switch (input+''){
        case '1':
          return '有';
        case '2':
          return '没有';
      }
    },
    // 是否有技术对接需求
    wantTechButtFil: function (input) {
      switch (input+''){
        case '1':
          return '有';
        case '2':
          return '没有';
      }
    },
    // 知识产权贯标状态
    intellectualPropertyIsoFil: function (input) {
      switch (input+''){
        case '1':
          return '未实施';
        case '2':
          return '实施中';
        case '3':
          return '取得证书';
        case '4':
          return '是';
        case '5':
          return '否';
        default: 
        return '--'
      }
    },
    // 机构或平台级别
    researchOrgLevelFil: function (input) {
      switch (input+''){
        case '1':
          return '区级';
        case '2':
          return '市级';
        case '3':
          return '省级';
        case '4':
          return '国家级';
        case '5':
          return '未设有';
      }
    },
    // 机构或平台级别
    isExcellenceManageFil: function (input) {
      switch (input+''){
        case '0':
          return '是';
        case '1':
          return '否';
        default: 
          return '--'
      }
    },
    isNumFil: function(input) {
      if(input >=0 ) {
        return input
      }
      else{
        return '--'
      }
    }
};
