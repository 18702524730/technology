<template>
  <div class="tm_list_page">
    <div class="total_num" v-if="list && list.length">共有 {{ total }} 个商标</div>
    <div class="list_wrap">
      <div class="item row-start" v-for="(item, index) in list" :key="index" @click="goDetailFn(item)">
        <div class="img_box"><img :src="item.tmImg" alt=""></div>
        <div class="info_box">
          <p class="tit">{{ item.tmName }}</p>
          <!-- {{ cateIdData[item.intCls - 1].goodsname }} -->
          <p class="gray" >{{ item.intCls<10 ? '0'+item.intCls : item.intCls  }}类  {{ item.intClsName }} | {{ item.appDate }}申请</p>
          <p class="lab_box row-start">
            <sapn class="lab">{{ item.currentStatus }}</sapn>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tmTypeData from '../../../utils/tmTypeData'
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
      cateIdData: tmTypeData.cateIdData
    }
  },
  computed: {
    intClsFul: function () {
      if (this.list && this.list.length) {
        this.list.forEach( item => {
          item.intClsName = this.cateIdData[item.intCls - 1].goodsname;
        })
      }
    }
  },
  methods: {
    // 去商标详情
    goDetailFn (item) {
      this.$router.push({path: `/pages/ipSearch/trademarkDetail?regNo=${item.applicantOther2}&intCls=${item.intCls}`});
    },
  }
}
</script>

<style lang="scss">
  .tm_list_page {
    width: 100%;
    .total_num {padding-right: 40px; height: 80px; line-height: 80px; text-align: right; font-size: 28px; color: #999;}
    .list_wrap {
      width: 100%;
      .item {
        padding: 30px; background: #fff; margin-bottom: 20px;
        .img_box {
          width: 160px; height: 160px; border-radius: 2px; border: 1px solid #eee;
          img {width: 100%; height: 100%;}
        }
        .info_box {
          margin-left: 20px;
          .tit {font-size: 34px; color: #333; font-weight: 500; max-width: 500px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
          .gray {color: #999; font-size: 24px; margin-top: 14px; line-height: 37px;}
          .lab_box {
            margin-top: 20px;
            .lab {height: 36px; line-height: 36px; padding: 0 20px; background:rgba(233,90,39,0.1); color: #E8541E; font-size: 24px; display: inline-block;}
          }
        }
      }
    }
  }
</style>
