<template>
  <div class="search_history_page">
    <search-box :content="content" @search="searchFn" @suggest="suggestFn"></search-box>
    
    <div class="suggest_box" v-if="showSuggest">
      <p v-for="(item, index) in suggestList" :key="index"  class="item row-between" @click="goSearchFn(item.name)">
        <rich-text :nodes="item.nameLight" class="text"></rich-text>
        <img src="~assets/img/icon/go_down.png" alt="">
      </p>
    </div>

    <div v-if="!showSuggest">
      <div class="hitory_wrap" v-if="recentList.length">
        <p class="title">最近搜索</p>
        <div class="key_box row-start">
          <span class="item" v-for="(item, index) in recentList" :key="index" @click="goSearchFn(item)">{{ item }}</span>
        </div>
      </div>
      <div class="hitory_wrap" v-if="historyList.length">
        <p class="title row-between"> 
          <span class="text">浏览历史</span> 
          <img src="~assets/img/icon/delete.png" alt="" @click="deleteFn">
        </p> 
        <div class="key_box row-start">
          <span class="item" v-for="(item, index) in historyList" :key="index" @click="goSearchFn(item)">{{ item }}</span>
        </div>
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
      content: '', //搜索关键词
      recentList: [],
      historyList: [],
      suggestList: [],
      showSuggest: false,
    }
  },
  onShow () {
    this.content = '';
    this.showSuggest = false;
    this.suggestList = [];
    this.searchHistoryFn();  //搜索历史
  },
  methods: {
    async searchHistoryFn () {
      try {
        let resp = await this.API.ipSearch.searchHistory();
        this.recentList = resp.recentSearch;
        this.historyList = resp.viewHistory;
      }
      catch (e){}
    },
    async deleteFn () {
      try {
        let resp = await this.API.ipSearch.removeHistory();
        this.searchHistoryFn();  //搜索历史
      }
      catch (e) {}
    },
    goSearchFn (name) {
      this.$router.replace({path: `/pages/ipSearch/searchList?keyword=${name}`});
    },
    searchFn (data) {
      this.$router.replace({path: `/pages/ipSearch/searchList?keyword=${data}`});
    },
    async suggestFn (data) {
      this.content = data;
      this.showSuggest = true;
      // 搜索为空
      if(!data) {
        wx.navigateBack();
      }
      try {
        let resp = await this.API.ipSearch.companyFilter({keyword: data});
        let conArr = this.content.split('');
        let list = [];
        resp.forEach(item => {
          let arr = item.split('');
          conArr.forEach( (info,i) => {
            arr.forEach( (it, j) => {
              if(it == info) {
                arr[j] = '<span class="keyword">' + it + '</span>';
              }
            })
          })
          list.push({name: item, nameLight: arr.join('')});
        })
        this.suggestList = list;
      }
      catch (e) {}
    }
  }
}
</script>

<style lang="scss">
  .search_history_page {
    position: absolute; width: 100%; background: #fff;
    .suggest_box {
      padding: 0 30px;
      .item {
        height: 80px; padding: 20px; border-bottom: 1px solid #eee;
        .text {
          max-width: 600px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: #333; font-size: 24px;
          .keyword {color: #355CFB;}
        }
        img {width: 22px; height: 24px;}
      }
    }
    .hitory_wrap  {
      padding: 26px 32px 0 32px;
      .title {
        margin-bottom: 28px; font-size: 36px; color: #333; font-weight: 600;
        .text {font-size: 36px; color: #333; font-weight: 600;}
        img {width: 32px; height: 30px;}
      }
      .key_box {
        width: 100%; padding-bottom: 24px; border-bottom: 1px solid #eee; flex-wrap: wrap;
        .item {height: 64px; line-height: 64px; color: #333; font-size: 28px; padding: 0 24px; margin: 0 24px 24px 0; background: #F5F5F5;}
      }
      &:last-child {
        .key_box {
          border-bottom: none;
        }
      }
    }
  }
</style>
