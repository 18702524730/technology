<template>
  <div class="ip_list_page">
    <div class="total_num" v-if="list && list.length">共有 {{ total }} 条专利</div>
    <div class="list_wrap" id="listWrap">
      <div class="item" :class="'item_'+index" v-for="(item, index) in list" :key="index" @click="goDetailFn(item)">
        <p class="tit">{{ item.title }}</p>
        <p class="info">
          <span>{{ item.inventroNameStr }}</span> &nbsp;
          <span>{{ item.applicantNameStr }}</span>
        </p>
        <p class="line mt20"><span class="key">法律状态：</span><span class="value">{{ item.lprs }}</span></p>
        <p class="line"><span class="key">申请日期：</span><span class="value">{{ item.appDate }}</span></p>
        <p class="line"><span class="key">申请地址：</span><span class="value">{{ item.address }}</span></p>
        <p class="line line_abs"><span class="key key_des">摘要</span>：<span class="value">{{ item.abs }}</span> 
          <!-- <img src="../../../assets/img/icon/clamp.png" alt="" v-if="item.abs.length > 18"> -->
          <span class="more">...</span>
        </p>
        <p class="lab_box row-between">
          <sapn class="lab">{{ item.patTypeName }}</sapn>
          <!-- <span class="time">{{ item.pubDate }}</span> -->
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from 'utils/filters'
import Vue from 'vue'
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      filters: Filters.filters
    }
  },
  computed: {
    patTypeFil () {
      let self = this;
      if(self.list && self.list.length) {
        self.list.forEach( (item, index) => {
          item.showMore = false;
          item.patTypeName = self.filters.patentTypeTag(item.patType);
          item.inventroNameStr = item.inventroName.join(',');
          item.applicantNameStr = item.applicantName.join(',');
        })
        // 因为得到高度是异步操作，所以这里需要一个延时器保证在获取高度时列表已经渲染完了
        // setTimeout(function(){
        //   self.list.forEach((item, index) => {
        //     console.log(index);
        //     self.getHeight(index, 18)
        //     // Vue.set(self.list, index, item)
        //   })
        // }, 300)
      }
    }
  },
  mounted () {
    
  },
  methods: {
    // 去专利详情
    goDetailFn (item) {
      this.$storage.set('detailData', item)
      this.$router.push({path: `/pages/ipSearch/patentDetail`});
    },
    // 得到摘要高度来判断是都要显示多行省略
    getHeight (index, oneLine) {
      var query = wx.createSelectorQuery();
      //选择id
      var that = this;
      query.select('#listWrap .item_'+ index +' .line_abs').boundingClientRect();
      query.exec(function (res) {
        that.list[index].showMore = res[0].height > oneLine ? true : false;  //判断是都是多行，多行就要显示更多的标志
      })
    }
  } 
}
</script>

<style lang="scss">
  .ip_list_page {
    width: 100%;
    .total_num {padding-right: 40px; height: 80px; line-height: 80px; text-align: right; font-size: 28px; color: #999;}
    .list_wrap {
      width: 100%;
      .item {
        padding: 30px; background: #fff; margin-bottom: 20px;
        .tit {font-size: 36px; color: #333; font-weight: 500; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
        .info {
          color: #666; font-size: 26px; margin-top: 10px; line-height: 37px; 
        }
        .gray {color: #bbb; font-size: 26px; margin-top: 20px; line-height: 37px;}
        .line {
          font-size: 28px; 
          .key {color: #aaa;}
          .key_des {width: 112px; text-align-last: justify; display:inline-block;}
          .value {color: #666;}
        }
        .line_abs {
          max-height: 75px; line-height: 40px; overflow: hidden; position: relative;
          img {width: 81px; height: 30px; position: absolute; right: 0; bottom: 0;}
          .more {width: 30px; height: 30px; background: #fff; text-align: right; position: absolute; right: 2px; bottom: 0; z-index: 10;}
        }
        .lab_box {
          margin-top: 30px;
          .lab {height: 44px; line-height: 44px; padding: 0 20px; background: #f5f5f5; color: #8C8C8C; font-size: 24px; display: inline-block;}
          .time {font-size: 26px; color: #bbb;}
        }
      }
    }
  }
</style>
