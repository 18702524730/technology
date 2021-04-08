<template>
  <div class="copyright_list_page">
    <div class="menu_box row-center">
      <p class="menu" @click="selectTabFn(index)" v-for="(item, index) in menuList" :key="index" v-show="!loading" :class="{'active': index==activeIndex}">{{ item }}</p>
    </div>
    <div class="list_wrap">
      <div class="item row-between" v-if="activeIndex==0" @click="goDetailFn(item)" v-for="(item, index) in list1" :key="index">
        <div class="info_box">
          <p class="tit">{{ item.name }}</p>
          <p class="info row-start">
            <span class="key">软件简称:</span>
            <span class="value">{{ item.shortName || '--' }}</span>
          </p>
          <p class="info row-start">
            <span class="key">登记号:</span>
            <span class="value">{{ item.registerNo }}</span>
          </p>
          <p class="info row-start">
            <span class="key">登记批准日期:</span>
            <span class="value">{{ item.registerAperDate }}</span>
          </p>
        </div>
        <img src="../../../assets/img/icon/more.png" alt="" class="more">
      </div>
      <div class="item row-between" v-if="activeIndex==1" @click="goDetailFn(item)" v-for="(item, index) in list2" :key="index">
        <div class="info_box">
          <p class="tit">{{ item.name }}</p>
          <p class="info row-start">
            <span class="key">类型:</span>
            <span class="value">{{ item.category }}</span>
          </p>
          <p class="info row-start">
            <span class="key">登记号:</span>
            <span class="value">{{ item.registerNo || '--' }}</span>
          </p>
          <p class="info row-start">
            <span class="key">登记日期:</span>
            <span class="value">{{ item.registerDate || '--' }}</span>
          </p>
          <p class="info row-start">
            <span class="key">完成日期:</span>
            <span class="value">{{ item.finishDate || '--' }}</span>
          </p>
          <p class="info row-start">
            <span class="key">首次发表日期:</span>
            <span class="value">{{ item.publishDate || '--' }}</span>
          </p>
        </div>
        <img src="../../../assets/img/icon/more.png" alt="" class="more">
      </div>
      <!-- 空数据 -->
      <!-- <div class="empty_box row-center" v-if="!loading && ((activeIndex==0 && !list1.elements.length) || (activeIndex==1 && !list2.elements.length))">
        <div class="content">
          <img src="../../../assets/img/icon/null.png" alt="" class="icon">
          <p class="text">暂无收录哦</p>
          <p class="text">我们可以看一下其他信息~</p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    noMore: {
      type: Boolean,
      default: false
    },
    list1: {
      type: Object,
      default: {}
    },
    list2: {
      type: Object,
      default: {}
    },
    copyType: {   //类型
      type: Number,
      default: 0
    },
    menuList: {
      type: Array,
      default: ['软件著作权:', '作品著作权:']
    }
  },
  data () {
    return {
      activeIndex: 0,
      loading:false,
    }
  },
  mounted () { 
    this.activeIndex = this.copyType;
  },
  methods: {
    selectTabFn (index) {
      this.activeIndex = index;
      this.$emit('typeChange', index)
    },
    // 去著作权详情
    goDetailFn (item) {
      this.$storage.set('detailData', item)
      this.$router.push({path: `/pages/ipSearch/copyrightDetail?type=${this.activeIndex}`});
    },
  }
}
</script>

<style lang="scss">
  .copyright_list_page {
    .menu_box {
      margin: 30px; height: 58px;
      .menu {width: 345px; height: 58px; line-height: 56px; background: none; color: #4B85FF; font-size: 26px; border: 1px solid #3576FF; text-align: center;}
      .active {background: #3576FF; color: #fff;}
    }
    .list_wrap {
      .item {
        padding: 30px; background: #fff; margin-bottom: 20px;
        &:last-child {margin-bottom: 0;}
        .info_box {
          .tit {font-size: 36px; color: #333; font-weight: 500; margin-bottom: 30px; max-width: 650px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
          .info {
            width: 100%; margin-top: 20px; line-height: 40px;
            .key {font-size: 28px; color: #999; width: 200px;}
            .value {font-size: 28px; color: #666; max-width: 500px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
          }
        }
        .more {width: 50px; height: 50px;}
      }
    }
  }
</style>
