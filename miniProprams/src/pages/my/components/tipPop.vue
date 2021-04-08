<template>
  <div class="tipPop" @touchmove.stop="fn" v-if="show">
    <div class="mask" @click="hide"></div>
    <div class="popBox" :class="{'showAnimate': showAnimate, 'zoom': zoom}">
      <div class="popBoxIn">
        <h3>提示</h3>
        <p class="t_content"><span>建议申报：</span>根据您企业当前经营状况，已满足申报条件，建议您联系科技大市场,进行项目申报认定；</p>
        <p class="t_content"><span>长期培育：</span>根据您企业当前经营状况，部分条件还需努力，方可进行申报，请联系科技大市场获取规划帮助；</p>
        <p class="t_content"><span>已认定：</span>您的企业已获得该政策补助与减免，如有其他疑问或需帮助，请联系科技大市场。</p>
        <div class="button" @click="myPhoneCall('0571-28253793')">联系科技大市场进行申报</div>
      </div>
      <!-- <div class="close-chain"></div> -->
      <img class="close" @click="hide" src="../../../assets/img/icon/close2.png">
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
        //this.zoom = true;
        setTimeout(() => {
          this.$emit('complete')
        }, 250)
        setTimeout(() => {
          //this.zoom = false;
          this.$emit('update:show', false)
        }, 300)
      },
      myPhoneCall(phoneStr) {
        wx.makePhoneCall({
          phoneNumber: phoneStr //仅为示例，并非真实的电话号码
        })
      }
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
  .tipPop{
    position: fixed;top:0;left: 0;height: 100%;width: 100%;z-index: 1001;
    .mask{position: fixed;top:0;left: 0;z-index: 1002;height: 100%;width: 100%;background:rgba(0,0,0,0.5);}
    .popBox{
      position: relative;z-index: 1003;width: 610px;height: 852px;top: 50%;left: 50%;/* margin: 0 auto;*/transform: translate(-50%, -50%); opacity: 0;transition: all 1s;
      .popBoxIn{
        position: relative;width: 100%;height: 712px;border-radius:6px;z-index: 2;color: #fff;background-color: #fff;overflow: hidden;padding-top: 40px;
        h3{height:50px;line-height: 50px;font-size:34px;font-weight: 600;text-align: center;}
        p.t_content{
          margin-top: 25px;color:#666; font-size:28px;line-height: 42px;padding: 0 40px;
          span{color: #2F80F6;font-size:28px;line-height: 42px;}
        }
        .button{width:530px;margin: 30px auto 0;background-color: #2F80F6;border-radius:6px;color: #fff;text-align: center;height:90px;line-height: 90px;font-size: 30px;}
      }
      .close{position: absolute; bottom: 0; left: 260px;width: 90px;height: 90px;}
    }
    .showAnimate{transform: translate(-50%, -50%);opacity:1;}
    /* width: 149px; height: 135px; */
    .zoom{transform: scale(0.25, 0.22);left: 45%;}
  }
</style>
