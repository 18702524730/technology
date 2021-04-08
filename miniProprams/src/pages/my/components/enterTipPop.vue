<template>
  <div class="ipSurveyPop" @touchmove.stop="fn" v-if="show">
    <div class="mask" @click="hide"></div>
    <div class="popBox" :class="{'showAnimate': showAnimate, 'zoom': zoom}">
      <div class="popBoxIn">
        <img src="../../../assets/img/company/pop_bg.jpg" alt="">
        <div class="tip">您的企业已经完成企业项目培育评估</div>
        <p>企业入库后即可：</p>
        <p class="t_content">优先享受江干区政策福利、政府扶持、项目申报...</p>
      </div>
      <div class="button" @click="toEnter">立即入库</div>
      <!-- <div class="close-chain"></div> -->
      <img class="close" @click="hide" src="../../../assets/img/company/pop_close.png">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        showAnimate: false,
        zoom: false,
      }
    },
    mounted(){
      setTimeout(() => {
        this.showAnimate = true;
      }, 100)
    },
    methods: {
      fn(){},
      toEnter(){
        this.$emit('toEnter')
        this.hide();
      },
      hide() {
        this.showAnimate = false;
        this.zoom = true;
        setTimeout(() => {
          this.$emit('complete')
        }, 250)
        setTimeout(() => {
          this.zoom = false;
          this.$emit('update:show', false)
        }, 300)
      },
    },
    watch: {
      show() {
        if (this.show) {
          setTimeout(() => {
            this.showAnimate = true;
          }, 100)
        } else {
          this.hide();
        }
      }
    },
  }
</script>

<style lang="scss">
  .ipSurveyPop{
    position: fixed;top:0;left: 0;height: 100%;width: 100%;z-index: 1001;
    .mask{position: fixed;top:0;left: 0;z-index: 1002;height: 100%;width: 100%;background:rgba(0,0,0,0.5);}
    .popBox{
      position: relative;z-index: 1003;width: 585px;height: 600px;top: 50%;left: 50%;/* margin: 0 auto;*/transform: translate(-50%, -50%); opacity: 0;transition: all 1s;
      .popBoxIn{
        position: relative;width: 100%;height: 490px;border-radius:8px;z-index: 2;color: #fff;background-color: #fff;overflow: hidden;
        img{width: 585px;height: 166px;display: block;overflow: visible;}
        .tip{width: 100%;position: absolute;left: 0; top: 65px;height: 42px; line-height: 42px; font-size:30px;font-weight:600;color: #fff;text-align: center;}
        p{margin-top: 46px;height:56px;font-size:32px;font-size:32px;color: #333;line-height: 56px;padding: 0 35px;}
        p.t_content{margin-top: 20px;color:#2A82F7; font-weight:600;font-size:34px;line-height: 57px;}
      }
      .button{position: absolute;bottom: 0;left: 0;width:585px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:8px;color: #fff;text-align: center;height:90px;line-height: 90px;font-size: 32px;}
      .close-chain{position: absolute; top: -36px; right: 24px;height: 36px;width: 1px;border-right:1px solid #bbb;}
      .close{position: absolute; top: -85px; right: 0;width: 49px;height: 85px;}
    }
    .showAnimate{transform: translate(-50%, -50%);opacity:1;}
    /* width: 149px; height: 135px; */
    .zoom{transform: scale(0.25, 0.22);left: 45%;}
  }
</style>
