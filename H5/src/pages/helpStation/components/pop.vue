<template>
	<div class="ipSurveyPop" @touchmove.stop="fn" v-if="show">
    <div class="mask" @click="hide"></div>
    <div class="popBox">
      <div class="popBoxIn">
        <img src="~assets/img/ipSurvey/smile.png" alt="">
        <h3>提交成功</h3>
        <p>专家会在48小时内联系您，请您保持电话畅通。</p>
        <div class="button" @click="toIndex">返回首页</div>
        <div class="close-chain"></div>
        <img class="close" @click="hide" src="~assets/img/ipSurvey/close.png">
        <!-- <div class="close" @click="hide">×</div> -->
      </div>
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
		  }
		},
		mounted(){
		},
		methods: {
      fn(){},
      toIndex(){
        wx.miniProgram.reLaunch({url: '/pages/index/index'});
      },
      hide() {
        this.$emit('update:show', false)
      },
		},
    watch: {
    },
	}
</script>

<style lang="scss">
	.ipSurveyPop{
    position: fixed;top:0;left: 0;height: 100%;width: 100%;z-index: 1001;
    .mask{position: fixed;top:0;left: 0;z-index: 1002;height: 100%;width: 100%;background:rgba(0,0,0,0.5);}
    .popBox{
      position: relative;z-index: 1003;width: 520px;height: 690px;top: 50%;margin: 0 auto;transform: translateY(-50%);
      .popBoxIn{
        position: relative;background-color: #fff;width: 100%;height: 548px;border-radius:12px;display: flex;flex-direction: column;align-items: center;padding-top: 60px;
        img{width: 134px;height: 134px;display: block;}
        h3{font-size:36px;font-weight:600;margin-top: 30px;}
        p{font-size:28px;color: #999;line-height: 40px;width: 380px;text-align: center;margin-top: 20px;}
        .button{width: 400px;font-size:32px;color: #fff;text-align: center;height:84px;line-height: 84px;background:linear-gradient(270deg,rgba(66,114,255,1) 0%,rgba(35,124,255,1) 100%);border-radius:10px;margin-top: 30px;}
        .close-chain{position: absolute; bottom: -40px; left: 50%;height: 40px;width: 1PX;border-right:1PX dashed #fff;}
        .close{position: absolute; bottom: -138px; left: 50%; margin-left: -49px;width: 98px;height: 98px;border-radius: 98px;color: #999;text-align: center;line-height: 98px;font-size: 46px;}
      }
    }
	}
</style>
