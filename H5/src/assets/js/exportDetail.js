/**
 *
 * Created by dell on 2018/9/13.
 */
/**
 * Created by dell on 2018/9/3.
 */
import $ from 'jquery'

var server = 'https://www.itech4u.cn';  //接口前面的地址
// var server = 'http://118.178.118.95';
// var server = 'http://192.168.1.66:8080';
var expertSearchUrl = '/archive/mobile_pages/src/searchH5/searchName/index.html'; //用于跳转姓名搜索页
var patentDetailUrl = '/archive/mobile_pages/src/patent_detail/patent_detail.html';//专利详情
var paperDetailUrl = '/archive/mobile_pages/src/paper_detail/paper_detail.html';//专利详情
var projectDetailUrl = '/archive/mobile_pages/src/project_detail/project_detail.html';//专利详情
var semanticSearchUrl = '/archive/mobile_pages/src/semanticSearch/index.html';//语义搜索
var radarUrl = '/archive/mobile_pages/src/expert_radar/radar.html'; //雷达图url
var netWordUrl = '/archive/mobile_pages/src/expert_netWords/netWords.html'; //云词url
var socialNetworkUrl = '/archive/mobile_pages/src/expert_socialNetwork/socialNetwork.html'; //自我网络url

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

var expertId = getUrlParam('expertId');

//筛选的单位类型
var unitTypeObj = {
    '0': '所有单位',
    '1': '大专院校',
    '2': '科研院所',
    '3': '企业'
};
//筛选的专利类型
var patentTypeObj = {
    '0': '所有专利',
    '1': '发明专利',
    '2': '实用新型',
    '3': '外观设计'
};
//筛选的论文类型
var paperTypeObj = {
    '0': '所有论文',
    '23': 'EI/一级',
    '4': '核心期刊'
};
//筛选的项目类型
var projectTypeObj = {
    '0': '所有项目',
    '2': '国家科技计划项目',
    '1': '国家自然科学基金',
    '3': '省部级项目',
    '4': '横向项目'
};

var searchFilter = {
    "expertId": expertId,
    "type": "project"
};

/**分页*/
function cancel() {
    window.history.go(-1);
}

/**
 * 搜索
 * @param searchKeyword 搜索关键词，如果没填或者null，则使用上一次搜索的词（用于分页）
 */
var response;
function search(searchKeyword) {
    if (searchKeyword) {
        searchFilter.expertId = searchKeyword;
    }
    $('.resultList-wp').hide();
    $('#error_msg').hide();
    $('#prompt_msg').show(); //显示提示
    $('#no_result').hide();
    $('#loading').show();   //显示加载
    $('.expert-info__mien').hide();

    var reqData = {
        "id": searchFilter.expertId
    };
    //获取主要内容
    $.ajax({
        type: 'GET',
        url: server + '/api/h5/getExpertInfo',
        data: reqData,
        dataType: 'json'
    })
        .done(function (res) {
            $('#loading').hide();

            /**处理出错提示**/
            if (!res) {
                var errorNode = $('#error_msg');
                errorNode.text(res);
                errorNode.show();
                return false;
            }

            /**返回正确时**/
            $('#prompt_msg').hide();
            $('.resultList-wp').show();

            //todo: 内容填充
            response = res;

            // 人才风采的处理
            if(res.data.importId != 0){
                $('.expert-info__mien').show();
                $('#expert_detail .expertName').text(res.data.expertName);
                if(res.data.expertTitle){
                    $('#expert_detail .expertTitle').text(res.data.expertTitle);
                }else{
                    $('#expert_detail .expertTitle').hide();
                }
                if(res.data.expertEducation){
                    $('#expert_detail .expertEducation').text(res.data.expertEducation);
                }else{
                    $('#expert_detail .expertEducation').hide();
                }
                $('#expert_detail .expertUnit').text(res.data.expertUnit);
                $('#expert_detail .college').text(res.data.college);
                $('#expert_detail .college').text(res.data.college);

                var subjectStr = '';
                var abilityList = [];
                try {
                    abilityList = res.data.ability.split('、');
                } catch (e) {
                }
                abilityList.forEach(function (sItem) {
                    subjectStr += '<span class="subject-tag">' + sItem + '</span>';
                });
                $('#expert_detail .ability').html(subjectStr);

                $('#expert_detail .introduction').text(res.data.introduction);
                $('#expert_detail .achievementIntroduction').text(res.data.achievementIntroduction);
                $('#expert_detail .honor').text(res.data.honor);

            }


            changeFilterType('patent');
            var htm = '';
            if(res.data.expertAvatar){
                $('.expert-info__avatar').css('background-image', 'url("'+res.data.expertAvatar+'")');
            }else{
                $('.expert-info__avatar').text(res.data.expertName.substr(0, 1));
            }
            $('.expert-info__baseInfo .name').text(res.data.expertName);
            if(res.data.expertTitle){
                htm += '<span class="title tag">'+res.data.expertTitle+'</span>';
            }
            if(res.data.expertEducation){
                htm += '<span class="education tag">'+res.data.expertEducation+'</span>';
            }
            $('.expert-info__baseInfo .item1').append(htm);
            $('.expert-info__baseInfo .unit-name').text(res.data.expertUnit);
            $('.expert-info__baseInfo .patent .all').text(res.data.patentNum);
            $('.expert-info__baseInfo .paper .all').text(res.data.paperNum);
            $('.expert-info__baseInfo .project .all').text(res.data.projectNum);

        })
        .fail(function () {
            $('#loading').hide();
            var errorNode = $('#error_msg');
            errorNode.text('服务器正在维护，请稍后重试');
            errorNode.show();
            return false;
        });
}

function changeFilterType(type){
    var filterLevel1ItemNode = $('.search-filter__level1 .item');
    var htm = '<div id="no_result"><div class="center-table"> <div class="center-cell"><div class="I"><img src="no_result.png"></div><div class="tip">没有找到相关结果</div></div></div></div>';

    switch (type) {
        case 'patent':
            filterLevel1ItemNode.removeClass('selected');
            $('.search-filter__level1 .item.patent').addClass('selected');
            if(response.data.patents.length === 0){
                break;
            }
            htm = '';
            response.data.patents.forEach(function (item) {
                item.patentAbstract = item.patentAbstract ? item.patentAbstract : '';
                htm += '<div class="result-item" onclick="goDetail('+"'" + server + patentDetailUrl + '?id=' + item.patentId + '&platform=h5'+"'"+')">' +
                    '<div class="result-item__title text-ellipsis"><a href="' + server + patentDetailUrl + '?id=' + item.patentId + '&platform=h5' + '">' + item.name + '</a></div>' +
                    '<div class="result-item__userInfo">' +
                    '<span class="name">' + item.inventors + '</span>' +
                    '<span class="unit">' + (item.applicant ? item.applicant : '') + '</span>' +
                    '</div>' +
                    '<div class="result-item__baseInfo">' +
                    '<div class="type">' + patentTypeObj[item.patentType] + '</div>' +
                    '<div class="time">' + item.publicationDate + '</div>' +
                    '</div>' +
                    '<div class="split-line"></div>' +
                    '<div class="result-item__detail">' +
                    item.patentAbstract +
                    '</div>' +
                    '</div>';
            });
            break;
        case 'paper':
            filterLevel1ItemNode.removeClass('selected');
            $('.search-filter__level1 .item.paper').addClass('selected');
            var paperNameHtm = '';
            var paperTimeHtm = '';
            if(response.data.papers.length === 0){
                break;
            }
            htm = '';
            response.data.papers.forEach(function (item) {
                item.paperAbstract = item.paperAbstract ? item.paperAbstract : '';
                if (item.journalName){
                    paperNameHtm = '<div class="type">' + item.journalName + '</div>';
                }else{
                    paperNameHtm = '';
                }
                if (item.journalNo){
                    paperTimeHtm = '<div class="time">' + item.journalNo + '</div>';
                }else{
                    paperTimeHtm = '';
                }
                htm += '<div class="result-item" onclick="goDetail('+"'" + server + paperDetailUrl + '?id=' + item.paperId + '&platform=h5'+"'"+')">' +
                    '<div class="result-item__title text-ellipsis"><a href="' + server + paperDetailUrl + '?id=' + item.paperId + '&platform=h5' + '">' + item.name + '</a></div>' +
                    '<div class="result-item__userInfo">' +
                    '<span class="name">' + item.authors + '</span>' +
                    '<span class="unit">' + item.unit + '</span>' +
                    '</div>' +
                    '<div class="result-item__baseInfo">' +
                    paperNameHtm +
                    paperTimeHtm +
                    '</div>' +
                    '<div class="split-line"></div>' +
                    '<div class="result-item__detail">' +
                    item.paperAbstract +
                    '</div>' +
                    '</div>';
            });
            break;
        case 'project':
            filterLevel1ItemNode.removeClass('selected');
            $('.search-filter__level1 .item.project').addClass('selected');
            if(response.data.projects.length === 0){
                break;
            }
            htm = '';
            response.data.projects.forEach(function (item) {
                htm += '<div class="result-item" onclick="goDetail('+"'" + server + projectDetailUrl + '?id=' + item.projectId + '&platform=h5'+"'"+')">' +
                    '<div class="result-item__title text-ellipsis"><a href="' + server + projectDetailUrl + '?id=' + item.projectId + '&platform=h5' + '">' + item.name + '</a></div>' +
                    '<div class="result-item__userInfo">' +
                    '<span class="name">' + item.member + '</span>' +
                    '<span class="unit">' + item.unit + '</span>' +
                    '</div>' +
                    '<div class="result-item__baseInfo">' +
                    '<div class="type">' + item.projType + '</div>' +
                    '<div class="time">' + item.year + '</div>' +
                    '</div>' +
                    '</div>';
            });
            break;
        default:break;
    }

    $('#result_list').html(htm);
}

/**模态框**/
var bodyEl = document.body;
var top = 0;
function stopBodyScroll (isFixed) {
    if (isFixed) {
        top = window.scrollY;

        bodyEl.style.position = 'fixed';
        bodyEl.style.top = -top + 'px';
    } else {
        bodyEl.style.position = '';
        bodyEl.style.top = '';

        window.scrollTo(0, top) // 回到原先的top
    }
}
function showExpertDetail() {
    $('[role="dialog"]').addClass('in');
    stopBodyScroll(true);
}
function hideModal(event) {
    $('[role="dialog"]').removeClass('in');
    stopBodyScroll(false);
}
$('.window-close').on('click', hideModal);

/**
 * 跳转人才搜索页面
 */
function goExpertSearch() {
    window.location.href = server + expertSearchUrl + '?keyword=' + searchFilter.keyword;
}

/**
 * 跳转语义搜索页面
 */
function goSemanticSearch() {
  window.location.href = server + semanticSearchUrl;
}

/**
 * 跳转综合表征
 */
function goRadar() {
    window.location.href = server + radarUrl + '?id=' + searchFilter.expertId;
}

/**
 * 跳转领域云图
 */
function goNetWord() {
    window.location.href = server + netWordUrl + '?id=' + searchFilter.expertId;
}

/**
 * 跳转自我网络
 */
function goSocialNetwork() {
    window.location.href = server + socialNetworkUrl + '?id=' + searchFilter.expertId;
}

/**
 * 前往论文专利项目详情页
 */
function goDetail(url) {
    window.location.href = url;
}

(function () {
    // $('#content_detail').show();
    // $('#error_msg').hide();
    // $('#prompt_msg').hide(); //显示提示
    // $('#loading').hide();   //显示加载

    var keyword = getUrlParam('expertId');
    if (keyword) {
        search(keyword);
    } else {
        $('.resultList-wp').hide();
    }
}());

export default {
    search,
    showExpertDetail
}
