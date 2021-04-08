<template>
    <div class="loading_wrap" v-show="loading">
      <a-spin :tip="'加载中...'" />
    </div>	
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped="true">
.loading_wrap{width: 100%;height: 100%;text-align: center;position: absolute;left: 0;top: 0;background: #fff;opacity: 0.5;z-index: 999;
  .ant-spin{position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);}
}
 
</style>
