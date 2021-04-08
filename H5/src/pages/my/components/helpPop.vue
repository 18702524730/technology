<template>
  <div class="help_pick_wrap" v-if="show">
    <div class="pick_bg" @click="hideFn()"></div>
    <div class="pick_fixed" :class="{'fadeIn': show, 'fadeOut': !show}">
      <div class="pick_con">
        <img src="~assets/img/company/help.png">
        <div class="title">专家辅导热线：0571-28253793</div>
        <a class="tel" href="tel:0571-28253793">拨打电话</a>
        <div class="cancel" @click="hideFn()"><img src="~assets/img/icon/chacha1.png"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
      }
    },
    methods: {
      fn(){},
      hideFn () {
        this.$emit('update:show', false)
      }
    }
  }
</script>

<style lang="scss">
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .help_pick_wrap{
    position: fixed; left: 0; top: 0; width: 100%; height: 100%;z-index: 2000;
    .pick_bg {width: 100%; height: 100%; position: fixed; left: 0; top: 0; background: rgba(0,0,0,.5); z-index: 1; }
    .pick_fixed {
      width:648px;height: 468px; background: #fff; position: absolute; left: 50%; top: 50%;margin-top: -234px;z-index: 10;transform: translate(-50%);border-radius:10px;overflow: hidden;
      &.fadeIn {animation: fadeIn 0.2s ease-out; animation-fill-mode: forwards;}
      &.fadeOut {animation: fadeOut 0.2s ease-out; animation-fill-mode: forwards; }
      .pick_con{
        display: flex; flex-direction: column; align-items: center; overflow: hidden;height: 100%;text-align: center;
        >img{width: 186px;height: 186px;display: block;margin-top: 35px;}
        .title{
          height:48px;font-size:34px;line-height: 48px;margin-top: 26px;
        }
        .tel{margin-top: 53px;width:560px;height:80px;line-height:80px;font-size:28px;color:#fff;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:10px;}
        .cancel {
          position: absolute; top: 28px; right: 28px;width:68px; height: 68px; text-align: center;
          img{width: 28px;height: 28px;margin-top: 20px;}
        }
      }
    }
  }
</style>
