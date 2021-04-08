<template>
  <div class="pick_wrap" v-if="show">
    <div class="pick_bg" @click="hideFn()"></div>
    <div class="pick_fixed" :class="{'fadeIn': show, 'fadeOut': !show}">
      <div class="pick_con">
        <div class="title">
          <i class="prev">&nbsp;</i>
          <span>达标条件</span>
          <i class="next">&nbsp;</i>
        </div>
        <div class="pick_item">
          <p v-html="item" v-for="(item, index) in list" :key="index"></p>
        </div>
        <div class="cancel" @click="hideFn()"><img src="~assets/img/icon/chacha1.png"></div>
      </div>
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
  .pick_wrap{
    position: fixed; left: 0; top: 0; width: 100%; height: 100%;z-index: 2001;
    .pick_bg {width: 100%; height: 100%; position: fixed; left: 0; top: 0; background: rgba(0,0,0,.5); z-index: 1; }
    .pick_fixed {
      width:648px;height: 880px; background: #fff; position: absolute; left: 50%; top: 50%;margin-top: -440px;z-index: 10;transform: translate(-50%);border-radius:10px;overflow: hidden;
      &.fadeIn {animation: fadeIn 0.2s ease-out; animation-fill-mode: forwards;}
      &.fadeOut {animation: fadeOut 0.2s ease-out; animation-fill-mode: forwards; }
      .pick_con{
        position: relative;overflow: hidden;height: 100%;
        .title{
          padding:40px 0;width: 100%;display: flex;justify-content: center; align-items: center;
          .prev{width:97px;height:1PX;background-image:linear-gradient(90deg, rgba(228,228,228,1), rgba(151,151,151,1));}
          span{height:45px;font-size:32px;line-height:45px;padding: 0 10px;}
          .next{width:97px;height:1PX;background-image:linear-gradient(-90deg, rgba(228,228,228,1), rgba(151,151,151,1));}
        }
        .pick_item {
          height: 755px;font-size:32px;line-height: 54px;padding: 0 40px 40px;overflow: auto;
          p{margin-bottom: 15px;font-size:32px;color: #666}
          .light{color:#3576FF;}
        }
        .cancel {
          position: absolute; top: 28px; right: 28px;padding-top: 6px;width:68px; height: 68px; font-size: 36px; color: #ccc; text-align: center;
          img{width: 28px;height: 28px;}
        }
      }
    }
  }
</style>
