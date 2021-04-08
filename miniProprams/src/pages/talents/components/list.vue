<template>
  <div class="talents_list" v-if="list.length && activeIndex != 2">
    <p class="tip">已经找到<span>{{ total }}个</span>人才</p>
    <div class="t_item" v-for="(item, index) in list" :key="index" @click="selectFn(item)">
      <img src="../../../assets/img/icon/first.png" class="label" alt="" v-if="item.title == '教授'">
      <img src="../../../assets/img/icon/second.png" class="label" alt="" v-if="item.title == '副教授'">
      <div class="info_box row-start">
        <div class="head_img">
          <img :src="item.avatar" alt="" v-if="item.avatar">
          <span v-if="!item.avatar">{{ item.headText }}</span>
        </div>
        <div class="text_box">
          <p class="person">
            <span class="name">{{ item.name }}</span>
            <span class="lab" v-if="item.title">
              <span class="line"></span>
              {{ item.title }}
            </span>
          </p>
          <p class="school">{{ item.unit }}</p>
        </div>
      </div>
      <div class="achievement_box row-between">
        <p class="content">
          <span class="li">专利：{{ item.patentNum}}</span>
          <span class="li">论文：{{ item.paperNum }}</span>
          <span class="li">项目：{{ item.projectNum }}</span>
        </p>
        <img src="../../../assets/img/icon/more.png" class="more" alt="">
      </div>
    </div>
    <div class="list_tips" v-if="list.length">
      <p class="loading" v-if="loading">正在加载...</p>
      <p class="no_more" v-if="!loading && moModre">已经到底了</p>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      list: {
        type: Array,
        default: []
      },
      total: {
        type: Number,
        default: 0
      },
      loading: {
        type: Boolean,
        default: false
      },
      moModre: {
        type: Boolean,
        default: false
      }
    },
    computed: {

    },
    data () {
      return {

      }
    },
    mounted () {

    },
    methods: {
      selectFn (item) {
        this.$emit('select', item);
      },
    }
  };
</script>

<style lang='scss'>
  .list_tips {
    width: 100%; margin: 20px 0 30px 0;
    .loading {width: 100%; text-align: center; color: #666; font-size: 24px;}
    .no_more {width: 100%; text-align: center; color: #666; font-size: 24px;}
  }
</style>
