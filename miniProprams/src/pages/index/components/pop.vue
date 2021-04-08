<template>
  <div class="ipSurveyPop" @touchmove.stop="fn" v-if="show">
    <div class="mask" @click="hide"></div>
    <div class="popBox" :class="{'showAnimate': showAnimate }">
      <div class="popBoxIn">
        <img src="../../../assets/img/homepage/hj_logo.png" alt="">
        <div class="tip">科技项目申报</div>
        <h3>择优推荐</h3>
        <p>申报科技项目、享受资金补贴</p>
        <p>获得政策扶持、展示企业形象</p>
        <div class="button" @click="jump">立即参与评估</div>
        <div class="close-chain"></div>
        <div class="close_box">
          <img class="close" @click="hide" src="../../../assets/img/homepage/close_icon.png">
        </div>
        <!-- <div class="close" @click="hide">×</div> -->
      </div>
      <img class="bg" src="../../../assets/img/homepage/hj.png" alt="">
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
      }
    },
    mounted(){
      setTimeout(() => {
        this.showAnimate = true;
      }, 200)
    },
    methods: {
      fn(){},
      jump(){
        this.$router.push({path: '/pages/index/highTech'});
        this.hide();
      },
      hide() {
        this.showAnimate = false;
        setTimeout(() => {
          this.$emit('update:show', false)
        }, 200)
      },
    },
    watch: {
      show() {
        if (this.show) {
          setTimeout(() => {
            this.showAnimate = true;
          }, 200)
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
      position: relative;z-index: 1003;width: 540px;height: 785px;top: 50%;margin: 0 auto;transform: translateY(-60%);opacity: 0;transition: all 0.3s;
      .popBoxIn{
        position: relative; width: 100%;height: 620px;border-radius:12px;display: flex;flex-direction: column;align-items: center;padding-top: 57px;z-index: 2;color: #fff;
        img{width: 84px;height: 63px;display: block;overflow: visible;}
        .tip{font-size:26px;margin-top: 20px;color: #fff;}
        h3{font-size:40px;height:60px;line-height:60px;font-weight:600;margin-top: 50px;color: #fff;margin-bottom: 20px;}
        p{font-size:30px;color: #999;line-height: 46px;text-align: center;color: #fff;}
        .button{width:420px;background:linear-gradient(301deg,rgba(255,70,70,1) 0%,rgba(253,94,44,1) 100%);border-radius:42px;color: #fff;text-align: center;height:84px;line-height: 84px;margin-top: 60px;font-size: 32px;}
        .close-chain{position: absolute; bottom: -67px; left: 50%;height: 67px;width: 1px;border-right:1PX dashed #bbb;}
        .close_box {
          position: absolute; bottom: -165px; left: 50%; margin-left: -49px; width: 98px; height: 98px; border-radius: 50%; border:36px solid #bbb; text-align: center;
          .close{width:32px; height: 32px; position:absolute; left: 50%; margin-left: -16px; top:50%; margin-top: -16px; z-index:10;}
        }
      }
      .bg{position: absolute; top:0; left:0; width: 100%;height: 620px;z-index: 1;}
    }
    .showAnimate{transform: translateY(-50%);opacity:1;}
  }
</style>
