<template>
  <div class="search_list_page">
    <search-box :showText="showText" :content="content" @focus="goHistoryFn" ></search-box>
    
    <div class="num_box" :class="{'movw_up': !timeoutShow}" v-if="totalNum">
      <span class="total_num">为您搜到{{ totalNum }}条结果</span>
    </div>

    <div class="search_list">
      <div class="item" v-for="(item, index) in searchList" :key="index" @click="goDetailFn(item)">
        <div class="c_name row-start" >
          <div class="img_box"><img src="~assets/img/icon/compant_logo.png" alt=""></div>
          <rich-text :nodes="item.nameLight" class="name"></rich-text>
        </div>
        <div class="info_box row-center">
          <div class="info column_center">
            <p class="key">法定代表人</p>
            <p class="value">{{ item.faren }}</p>
          </div>
          <div class="info column_center">
            <p class="key">注册资本</p>
            <p class="value">{{ item.regcap || '--' }}</p>
          </div>
          <div class="info column_center">
            <p class="key">成立时间</p>
            <p class="value">{{ item.esdate }}</p>
          </div>
        </div>
        <!-- <div class="ip row-between">
          <p class="text">
            <img src="~assets/img/icon/link.png" alt="">
            <span class="des">{{ item.info }}</span>
          </p>
          <img src="~assets/img/icon/more.png" alt="" class="more">
        </div> -->
      </div>
    </div>

    <!-- 加载中 -->
    <div class="noMore" v-if="loading">
      <span class="text">加载中...</span>
    </div>
    <!-- 底线 -->
    <div class="noMore" v-if="!loading && noMore && searchList.length">
      <span class="text">——我是底线——</span>
    </div>
    <!-- 空数据 -->
    <div class="empty_box row-center" v-if="!loading && !searchList.length">
      <div class="content">
        <img src="~assets/img/icon/null.png" alt="" class="icon">
        <p class="text">暂无收录哦</p>
        <p class="text">我们可以看一下其他信息~</p>
      </div>
    </div>

  </div>
</template>

<script>
import searchBox from 'components/search/searchBox'
import filter from 'utils/filters'
export default {
  components: {searchBox},
  data () {
    return {
      showText: false,
      content: '', //搜索关键词
      pgIndex: 1,
      pgCount: 5,
      pageAll: 0,
      loading:false,
      noMore: true,
      searchList: [
      ],
      totalNum: 0,  //总结果条数
      timeoutShow: true,  //显示总条数
    }
  },
  // 上拉加载
  // onReachBottom () {
  //   if(this.pgIndex >= this.pageAll) {
  //     this.noMore = true;
  //     return
  //   }
  //   else {
  //     this.noMore = false;
  //     this.pgIndex ++;
  //     this.searchFn();  //默认搜索
  //   }
  // },
  onShow () {
    this.pgIndex = 1;
    this.content = this.$route.query.keyword;
    // this.timeoutShow = true;  //默认显示总条数
  },
  mounted () {
    this.searchList = [];
    this.searchFn();  //默认搜索
  },
  methods: {
    // 去企业详情
    goDetailFn (item) {
      this.$router.push({path: `/pages/ipSearch/searchDetail?faren=${item.faren}&name=${item.name}`});
    },
    async searchFn () {
      let data = {
        keyword: this.content,
        pgIndex: this.pgIndex,
        pgCount: this.pgCount
      }
      this.loading = true;
      try {
        let resp = await this.API.ipSearch.queryCompanyList(data);
        this.loading = false;
        this.totalNum = resp.totalElements;
        let timeId;
        if (this.totalNum) {
          let self = this;
          timeId = setTimeout(function(){
            self.timeoutShow = false;
            clearTimeout(timeId);
          }, 2000)
        }
        this.pageAll = Math.ceil(this.totalNum / this.pgCount);
        if (this.pageAll == 1) {
          this.searchList = resp.elements;
          this.noMare = true;
          this.keywordFilFn();
          return
        }
        this.searchList = [...this.searchList, ...resp.elements];
        this.keywordFilFn();
      }
      catch (e){}
    },
    // 搜索结果关键词高亮
    keywordFilFn () {
      function replaceFn (leeter) {
        // 匹配关键字正则
        let replaceReg = new RegExp(leeter, 'g');
        // 高亮替换v-html值
        let replaceString = '<span class="keyword">' + leeter + '</span>';
        return replaceString
      }
      let contentArr = this.content.split('');
      if (this.content && this.content.length) {
        this.searchList.forEach( item => {
          let sArr = item.name.split('');
          contentArr.forEach( lett => {
            sArr.forEach( (i, idx) => {
              if (i == lett) {
                sArr[idx] = replaceFn(i);
              }
            })
          })
          item.nameLight = sArr.join('');
        })
      }
    },
    goHistoryFn () {
      this.$router.replace({path: '/pages/ipSearch/searchHistory'});
    }
  }
}
</script>

<style lang="scss">
  @keyframes movwDown {
    from {
      opacity: 0;
      transform: translateY(-100%);
      height: 0;
    }
    to {
      opacity: 1;
      transform: translateY(0);
      height: 66px;
    }
  }
  @keyframes movwUp {
    from {
      opacity: 1;
      transform: translateY(0);
      height: 66px;
    }
    to {
      opacity: 0;
      transform: translateY(-100%);
      height: 0;
    }
  }
  .search_list_page {
    .search_input_wrap {position: relative; z-index: 1;}
    .num_box {
      width: 100%; text-align: center; animation: movwDown 0.5s linear;
      .total_num {margin: 24px auto; height: 66px; line-height: 66px; padding: 0 28px; background:rgba(0,0,0,0.05); color: #333; font-size: 24px; text-align: center; border-radius: 33px; display: inline-block;}
      &.movw_up {animation: movwUp 0.5s linear; animation-fill-mode: forwards;}
    }
    .search_list {
      padding-top: 20px;
      .item {
        padding: 26px 30px 0 30px; margin-bottom: 20px; background: #fff;
        .c_name {
          height: 80px; line-height: 80px; width: 100%;
          .img_box {
            width: 80px; height: 80px; border: 1px solid #eee; border-radius: 5px;
            img {width: 100%; height: 100%;}
          }
          .name {
            margin-left: 30px; font-size: 34px; color: #333; font-weight: 400; line-height: 48px; max-width: 570px;
            .keyword {color: #355CFB;}
          }
        }
        .info_box {
          width: 100%; margin-top: 36px; padding-bottom: 30px; align-items: flex-start;
          .info {
            flex: 1;
            .key {font-size: 24px; color: #999; line-height: 33px; text-align: center;}
            .value {color: #333; font-size: 28px; line-height: 40px; margin-top: 14px; text-align: center; padding: 0 10px;}
          }
        }
        .ip {
          width: 100%; border-top: 1px solid #f1f1f1; height: 88px; line-height: 88px;
          .text {
            img {width: 25px; height: 25px;}
            .des {
              font-size: 26px; color: #aaa; margin-left: 12px;
              .keyword {color: #365BFB;}
            }
          }
          .more {width: 40px; height: 40px;}
        }
      }
    }
    .noMore {
      width: 100%; text-align: center; padding: 40px 0 50px 0;
      .text{color: #ddd; font-size: 28px;}  
    }
  }
</style>
