<template>
  <div class="help_pick_wrap" v-if="show">
    <div class="pick_bg" @click="hideFn()"></div>
    <div class="help_pick_fixed" :class="{'fadeIn': show, 'fadeOut': !show}">
      <div class="pick_con">
        <div class="title">联系科技大市场进行申报</div>
        <p>0571-28253793</p>
        <a class="tel" href="tel:0571-28253793" @click="makePhoneCall('0571-28253793')">立即获取帮助</a>
      </div>
      <div class="cancel" @click="hideFn()"><img src="../../../assets/img/icon/close2.png"></div>
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
      },
      makePhoneCall(phoneStr) {
        wx.makePhoneCall({
          phoneNumber: phoneStr //仅为示例，并非真实的电话号码
        })
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
    position: fixed; left: 0; top: 0; width: 100%; height: 100%;z-index: 2001;
    .pick_bg {width: 100%; height: 100%; position: fixed; left: 0; top: 0; background: rgba(0,0,0,.5); z-index: 2001; }
    .help_pick_fixed {
      width:610px;height: 490px; position: absolute; left: 50%; top: 50%;margin-top: -245px;z-index: 2002;transform: translate(-50%);overflow: hidden;
      &.fadeIn {animation: fadeIn 0.2s ease-out; animation-fill-mode: forwards;}
      &.fadeOut {animation: fadeOut 0.2s ease-out; animation-fill-mode: forwards; }
      .pick_con{
        background: #fff; height:350px;display: flex; flex-direction: column; align-items: center; overflow: hidden;text-align: center;border-radius:6px;padding-top: 70px;
        .title{
          height:42px;font-size:28px;line-height: 42px;text-align: center;
        }
        p{margin-top: 15px;font-size:34px;font-weight: 600;line-height: 42px;}
        .tel{margin-top: 40px;width:530px;height:90px;line-height:90px;font-size:30px;color:#fff;background:#2F80F6;border-radius:6px;text-decoration: none;}
      }
      .cancel {
        position: absolute; bottom: 0; left: 260px;width:90px; height: 90px;
        img{width:90px; height: 90px;}
      }
    }
  }
</style>
