<template>
  <!-- 入库完成 -->
	<div class="enterComplete">
    <div class="tipall">
      <img class="top_img" src="~assets/img/company/enter_c_bg.png">
      <h3>恭喜纳入企业项目申报培育库</h3>
      <p>信息已同步推送至相关法人的手机号，法人可以同步查看</p>
      <div class="button" @click="completeAll">继续完善企业信息，申领更多资金补贴</div>
    </div>
    <div class="back" @click="toHome">
      <img src="~assets/img/icon/back_index1.png">
      回到首页
    </div>
	</div>
</template>
<script>
	export default {
		data() {
		  return {
		  }
    },
    components: {
    },
		mounted(){
		},
		methods: {
      // 完善all数据
      completeAll() {
        this.$router.push('/pages/my/makeAllPerfect')
      },
      // 回到首页
      toHome() {
        wx.switchTab({
          url: '/pages/index/index'
        })
      },
    },
    watch:{

    },
    // 监听用户点击页面内转发按钮
    onShareAppMessage() {
      let obj = {};
      let memberId = this.$storage.get('auth').member_id;
      obj = {
        title: '链科，链接每一个企业的科技价值！',
        path: "/pages/index/index?memberId="+ memberId,
        //imageUrl: 'https://www.ipsebe.com/cms/webfile/upload/2018/12-14/18-06-0608961222801360.jpg'
      }
      return obj;
    },
	}
</script>
<style lang="scss">
	.enterComplete{
    background: #F8F8F8;padding-top: 30px;
    .tipall{
      display: flex;flex-direction: column;align-items: center;
      .top_img{width: 750px;height: 473px;}
      h3{height:50px;line-height: 50px;font-size:36px;color:#2D81F6;font-weight:600;margin-top: -30px;}
      >p{height:37px;font-size:26px;color: #999;margin-top: 20px;}
      .button{width:690px;height:90px;line-height: 90px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:10px;text-align: center;font-size: 32px;color: #FFFFFF;margin-top: 50px;}
    }
    .back{
      position: absolute;bottom: 65px;left: 50%;margin-left: -99px;width:198px;height:63px;background-color: #6EABFF;border-radius:63px;display: flex;align-items: center;justify-content: center;font-size:24px;color: #fff;
      img{width: 42px;height: 32px;margin-right: 10px;}
    }
	}
</style>
