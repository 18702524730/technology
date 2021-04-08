<template>
  <div class="ip_search_page">
    <p class="tit">知查查</p>
    <p class="info">查企业知识产权，就上知查查</p>
    <div class="search_box row-start">
      <img src="~assets/img/icon/search.png" alt="" class="search">
      <input type="text" class="input" placeholder-class="input-placeholder" :focus="autoFocus" placeholder="输入企业名称，查企业知识产权信息" @input="changeFn" @confirm="searchFn" v-model="keyword">
      <img src="~assets/img/icon/close.png" alt="" class="clear" v-if="keyword" @click="keyword = ''">
    </div>
    <div class="suggest_box" v-if="showSuggest">
      <p v-for="(item, index) in suggestList" :key="index" v-if="index<=4"  class="item row-between" @click="goSearchFn(item.name)">
        <rich-text :nodes="item.nameLight" class="text"></rich-text>
        <img src="~assets/img/icon/go_down.png" alt="">
      </p>
    </div>
    <div >
      <button class="btn_search" @click="searchFn">立即查询</button>
      <p class="tips">企业商标、专利、著作权、论文、项目、技术一键查询</p>
    </div>

    <mptoast />
    
  </div>
</template>

<script>
import mixin from 'mixins/'
import filter from 'utils/filters'
export default {
  mixins: [mixin],
  data () {
    return {
      keyword: '',  //关键词
      autoFocus: true,
      suggestList: [],
      showSuggest: false,
    }
  },
  onShow () {
    this.keyword = '';
    this.showSuggest = false;
    this.init();
  },
  mounted () {
    let curCompanyName = this.$storage.get('curCompanyName');
    this.keyword = curCompanyName || '';
  },
  methods: {
    async init() {
      this.isLogin = await this.checkLoginAndMark();
      let auth = this.$storage.get('auth');
      this.auth = auth;
      let showAuthorize = !this.isLogin;
      if(!this.isLogin || !auth) {
        wx.reLaunch({url: `/pages/login/login?showAuthorize=${showAuthorize}`})
      }
    },
    searchFn () {
      if(!this.keyword){
        this.$mptoast('请输入关键词！')
        return
      }
      this.$router.push({path: `/pages/ipSearch/searchList?keyword=${this.keyword}`});
    },
    goSearchFn (name) {
      this.$router.push({path: `/pages/ipSearch/searchList?keyword=${name}`});
    },
    changeFn () {
      if(this.keyword.length >= 2) {
        this.suggestFn(this.keyword)
      }
    },
    async suggestFn (data) {
      this.content = data;
      this.showSuggest = true;
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
  },
  watch: {
    keyword (n) {
      if (n === '') {
        this.suggestList = [];
      }
    }
  }
}
</script>

<style lang="scss">
  .ip_search_page {
    position: absolute; width: 100%; height: 100%; background: #fff;
    .tit {text-align: center; font-size: 50px; color: #333; margin-top: 160px; font-weight: 600;}
    .info {text-align: center; font-size: 28px; color: #666; margin-top: 16px;}
    .search_box {
      margin: 0 30px; padding: 0 20px; margin-top: 40px; height: 90px; border: 1px solid #e6e6e6; border-radius: 10px;
      .search {width: 32px; height: 32px; margin-right: 10px;}
      .clear {width: 28px; height: 28px; margin-left: 80px;}
      .input {font-size: 28px; width: 500px; line-height: 40px;}
      .input-placeholder {color: #bbb; font-size: 28px; line-height: 40px;}
    }
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
    .btn_search {width: 690px; height: 90px; line-height: 90px; padding: 0; margin: 30px; background:linear-gradient(270deg,rgba(53,89,250,1) 0%,rgba(53,118,255,1) 100%); color: #fff; font-size: 32px; }
    .tips {font-size: 24px; color: #999; text-align: center;}
  }
</style>
