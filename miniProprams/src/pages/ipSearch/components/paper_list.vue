<template>
  <div class="paper_list_page">
    <div class="total_num" v-if="list && list.length">共有 {{ total }} 篇论文</div>
    <div class="list_wrap">
      <div class="item" v-for="(item, index) in list" :key="index" @click="goDetailFn(item)">
        <p class="tit">{{ item.name }}</p>
        <p class="info">摘要：{{ item.paperAbstract }}</p>
        <p class="gray">{{ item.authors }} {{ item.unit }}</p>
        <p class="lab_box row-between">
          <sapn class="lab">{{ item.journalName }}</sapn>
          <span class="time">{{ item.journalNo }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
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

    }
  },
  mounted () {

  },
  methods: {
    // 去论文详情
    goDetailFn (item) {
      this.$storage.set('detailData', item)
      this.$router.push({path: `/pages/ipSearch/paperDetail`});
    }
  }
}
</script>

<style lang="scss">
  .paper_list_page {
    width: 100%;
    .total_num {padding-right: 40px; height: 80px; line-height: 80px; text-align: right; font-size: 28px; color: #999;}
    .list_wrap {
      width: 100%;
      .item {
        padding: 30px; background: #fff; margin-bottom: 20px;
        .tit {font-size: 36px; color: #333; font-weight: 500; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
        .info {color: #666; font-size: 26px; margin-top: 20px; line-height: 37px;}
        .gray {color: #bbb; font-size: 26px; margin-top: 20px; line-height: 37px;}
        .lab_box {
          margin-top: 10px;
          .lab {height: 44px; line-height: 44px; padding: 0 20px; background: #f5f5f5; color: #8C8C8C; font-size: 24px; display: inline-block;}
          .time {font-size: 26px; color: #bbb;}
        }
      }
    }
  }
</style>
