<template>
  <div class="legalStatusPop" v-if="show">
    <div class="techSearchMask" @click="hide"></div>
    <div class="pop_legal">
      <div class="table_til">
        <span class="fir">法律状态公告日</span>
        <span class="sec">法律状态</span>
        <span class="thi">法律状态信息</span>
      </div>
      <div class="table_con" v-for="(item, index) in data" :key="index">
        <span class="fir">{{item.legalPublicationDate}}</span>
        <span class="sec">{{item.legalStatus}}</span>
        <span class="thi">{{item.legalStatusInfo}}</span>
      </div>
      <div class="close" @click="hide">×</div>
    </div>
  </div>
</template>

<script>
  import Filters from 'utils/filters.js'
  export default {
    components: {
    },
    props: {
      show: {
        type: Boolean,
        default: true
      },
      data: Array,
    },
    data () {
      return {
      }
    },
    mounted() {
    },
    methods: {
      hide() {
        this.$emit('update:show', false)
      },
      fn() {}
    },
    watch: {
    }
  }
</script>

<style lang="scss">
  .legalStatusPop {
    position: fixed;top: 0;left: 0;right: 0;height: 100%;
    .techSearchMask{position: fixed;left: 0;top: 0;right: 0;bottom: 0;z-index: 1;background-color: rgba(0, 0, 0, 0.5);}
    .pop_legal{
      position: relative;top: 50%;margin: 0 30px;background-color: #fff;z-index: 2;transform: translateY(-50%);border-radius:5px;font-size: 26px;padding:80px 30px 30px;max-height: 90%;overflow-y: auto;
      .fir{width: 35%;}
      .sec{width: 30%;}
      .thi{width: 35%;}
      .table_til{
        width: 100%;background-color: #F8F8F8;height: 80px;line-height: 80px;border:1px solid #EEEEEE;display: table;
        span{display: table-cell;padding:0 10px;text-align: center;border-right:1px solid #EEEEEE;vertical-align: middle;}
        span:last-child{border-right: 0;}
      }
      .table_con{
        width: 100%;border:1px solid #EEEEEE;margin-top: -1px;display: table;
        span{display: table-cell;padding: 20px 10px;line-height: 37px;text-align: center;border-right:1px solid #EEEEEE;vertical-align: middle;}
        span:last-child{border-right: 0;}
      }
      .close{position: absolute;top:-20px;right: 0;padding:30px;font-size: 40px;color:#DDDDDD; }
    }
  }
</style>
