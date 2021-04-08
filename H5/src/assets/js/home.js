import $ from 'jquery'

/**
 *
 * Created by dell on 2018/9/13.
 */
/**
 * Created by dell on 2018/9/3.
 */
var server = 'https://www.itech4u.cn';  //接口前面的地址
// var server = 'http://118.178.118.95';
// var server = 'http://192.168.1.66:8080';
var config = {
    //搜索跳转的URL
    "searchUrl": {
        "all": "/archive/mobile_pages/src/searchH5/searchAll/index.html",
        "subject": "/archive/mobile_pages/src/searchH5/searchSubject/index.html",
        "name": "/archive/mobile_pages/src/searchH5/searchName/index.html",
        "unit": "/archive/mobile_pages/src/searchH5/searchUnit/index.html"
    },
    "navUrl": {
        "expertSearch": "/archive/mobile_pages/src/searchH5/homeSearch/index.html",
        "semanticSearch": "/archive/mobile_pages/src/semanticSearch/index.html",
        "bigData": "/archive/mobile_pages/src/bigDataH5/index.html"
    },
    "detailUrl": {
        "moreExpertMien": "/archive/mobile_pages/src/expertMien_list/index.html",
        "expertMienDetail": "/archive/mobile_pages/src/expert_detailH5/index.html",
        "successCaseDetail": "/archive/mobile_pages/src/case_detail/index.html"
    },
    "footerUrl": {
        "appDownload": '/archive/shareH5/shareH5.html',
        "desktop": ''
    }
};
/**
 * 获取url传递参数值
 */
function getUrlParam(param) {
    var reg, arr;
    reg = new RegExp("(\\?|&)" + param + "=([^&]*)(&|$)");
    arr = window.location.search.match(reg);
    if (arr)
        return decodeURIComponent(arr[2]);
    else
        return null;
}
var searchUrl = config.searchUrl.all;

function goSearch() {
    var searchKeyword = $('#search_input').val();
    if (!searchKeyword) {
        alert('请输入要搜索的关键词');
        return;
    }
    window.location.href = server + searchUrl + '?keyword=' + searchKeyword;
}

//监听按键
var enterEvent = function (e) {
    var keycode = window.event ? e.keyCode : e.which;
    if (keycode === 13) {
        $('.search-suggest').hide();
        goSearch();
        return false;
    }
};

/**搜索推荐**/
var suggestList = [];
function getSuggest() {
    var keyword = $('#search_input').val();
    suggestList = [];
    if (!keyword) {
        $('.search-suggest').hide();
        return;
    }
    var reqUrl = '/api/h5/suggest';
    var reqData = {
        "keyword": keyword
    };
    $.ajax({
        type: 'GET',
        url: server + reqUrl,
        data: reqData,
        dataType: 'json'
    })
        .done(function (res) {
            /**返回正确时**/
            if (res.meta.success) {
                if (!$('#search_input').val()) { //搜索条为空时隐藏，防止因为异步的原因显示旧的搜索提示，不用keyword变量是因为每个function keyword互不影响
                    suggestList = [];
                    $('.search-suggest').hide();
                    return;
                }
                suggestList = res.data.keyword;
                if (suggestList.length > 0) {
                    var htm = '';
                    suggestList.forEach(function (item) {
                        var str = "'" + item + "'";
                        htm += '<li onclick="suggestSearch(' + str + ')" class="text-ellipsis">' + item + '</li> '
                    });
                    $('.search-suggest ul').html(htm);
                    $('.search-suggest').show();
                } else {
                    $('.search-suggest').hide();
                }
            }
        })
        .fail(function () {
            return false;
        });
}
$('#search_input').bind('input propertychange', getSuggest);
function showSuggest() {
    if (suggestList.length > 0) {
        $('.search-suggest').show();
    }
}
$('body>*').on('click', function () {
    $('.search-suggest').hide();
});
$('#search_input').click(function (event) {
    event.stopPropagation();
});
function suggestSearch(searchKeyword) {
    $('#search_input').val(searchKeyword);
    goSearch();
}

/**
 * 获取人才风采列表
 */
function getExpertMienList() {
    var reqData = {};
    //获取主要内容
    $.ajax({
        type: 'POST',
        url: server + '/api/h5/getTopExpert',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(reqData),
        dataType: 'json'
    })
        .done(function (res) {
            /**处理出错提示**/
            if (!res.meta.success) {
                var errorNode = $('#error_msg');
                errorNode.text(res.meta.message);
                errorNode.show();
                return false;
            }

            /**返回正确时**/

                //todo: 内容填充
            var htm = '';
            res.data.forEach(function (item) {
                var bgImgStr,
                    wordAvatar = ''; //无照片时用姓做图标
                if (item.photo === null || item.photo === 'http://img.itech4u.cn/default/expert_avatar.png') {
                    bgImgStr = '';
                    wordAvatar = item.name.substr(0, 1);
                } else {
                    bgImgStr = "background-image: url('" + item.photo + "')";
                }
                var fnStr = "'" + item.expertId + "'";

                htm += '<div class="expert-item" onclick="goExpertMienDetail(' + fnStr + ')">' +
                    '<div class="clearfix">' +
                    '<div class="expert-item__avatar" style="' + bgImgStr + '">' + wordAvatar + '</div>' +
                    '<div class="expert-item__baseInfo">' +
                    '<div class="item1">' +
                    '<span class="name">' + item.name + '</span>';
                if (item.title) {
                    htm += '<span class="title tag">' + item.title + '</span>';
                }
                if (item.degree) {
                    htm += '<span class="education tag">' + item.degree + '</span>';
                }
                var subjectStr = '';
                try {
                    item.abilityList = item.ability.split('、');
                } catch (e) {
                    item.abilityList = [];
                }
                item.abilityList.forEach(function (sItem) {
                    subjectStr += '<span class="subject-tag">' + sItem + '</span>';
                });
                htm += '</div>' +
                    '<div class="item2"><span class="unit">' + item.school + '</span></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="text-ellipsis clearfix subject-list">' +
                    subjectStr +
                    '</div>' +
                    '</div>';
            });

            $('.expertMien__list').html(htm);
        })
        .fail(function () {
            var errorNode = $('#error_msg');
            errorNode.text('服务器正在维护，请稍后重试');
            errorNode.show();
            return false;
        });
}

/**
 * 获取成功案例列表
 */
function getSuccessCaseList() {
    var reqData = {};
    //获取主要内容
    $.ajax({
        type: 'POST',
        url: server + '/api/h5/getTopCaseList',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(reqData),
        dataType: 'json'
    })
        .done(function (res) {
            /**处理出错提示**/
            if (!res.meta.success) {
                var errorNode = $('#error_msg');
                errorNode.text(res.meta.message);
                errorNode.show();
                return false;
            }

            /**返回正确时**/

                //todo: 内容填充
            var htm = '';
            res.data.forEach(function (item) {
                var fnStr = "'" + item.channelId + "'"+","+"'" + item.contentId + "'";

                htm += '<li class="item text-ellipsis">'+
                    '<a onclick="goSuccessCaseDetail(' + fnStr + ')">'+
                    '<b>·</b><span class="T">'+item.title+'</span>'+
                    '</a>'+
                    '</li>';

            });

            $('#successCase_list').html(htm);
        })
        .fail(function () {
            var errorNode = $('#error_msg');
            errorNode.text('服务器正在维护，请稍后重试');
            errorNode.show();
            return false;
        });
}

function goExpertSearch() {
    window.location.href = server + config.navUrl.expertSearch;
}
function goSemanticSearch() {
    window.location.href = server + config.navUrl.semanticSearch;
}
function goBigData() {
    window.location.href = server + config.navUrl.bigData;
}
function goExpertMien() {
    window.location.href = server + config.detailUrl.moreExpertMien;
}
function goExpertMienDetail(expertId) {
    window.location.href = server + config.detailUrl.expertMienDetail + '?expertId=' + expertId + '&platform=h5';
}
function goSuccessCaseDetail(channelId, contentId) {
    window.location.href = server + config.detailUrl.successCaseDetail + '?channelId=' + channelId + '&contentId=' + contentId + '&platform=h5';
}

function goDesktopPage() {
    window.location.href = server + config.footerUrl.desktop;
}
function goAppDownload() {
    window.location.href = server + config.footerUrl.appDownload;
}


export default {
  getExpertMienList,
  getSuccessCaseList
}

