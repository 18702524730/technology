<template>
  <div class="join_page">
    <p class="title">社群圈会第一时间推送最新的科技资讯、政策文件、通知公告...</p>
    <img src="~assets/img/circle/erweima.png" class="icon" alt="" @click="showImgFn">
    <button class="join_btn" @click="showImgFn">加入社区群</button>
    <p class="tips_info">管理员微信号：<text class="blue" selectable='true'>17816082754</text></p>
    <p class="tips_info mt">扫描添加管理员加入社群圈</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        url: ''
      }
    },
    onShow () {

    },
    methods: {
      showImgFn () {
        wx.getImageInfo({
          src: 'https://testossfile.ipsebe.com/EB465B954A589CCFC773AF6B0591D10E.png',
          success(res) {
            wx.previewImage({
              current: res.path, // 当前显示图片的http链接
              urls: [].concat(res.path) // 需要预览的图片http链接列表
            })
          }
        })
      }
    }
  }
</script>

<style lang='scss'>
  .join_page {
    width: 100%; height: 100%; position: relative; background: #fff;
    .title {width: 640px; color: #2F80F6; font-size: 32px; line-height: 45px; font-weight: 500; padding-top: 60px; margin-left: 58px; text-align: center;}
    .icon {width: 703px; height: 667px; margin: 90px 0 0 47px;}
    .join_btn {width:580px; height:86px; line-height: 86px; margin-left: 85px; padding: 0; background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%); border-radius:10px; font-size: 30px; color: #fff; text-align: center; margin-top: -16px;}
    .tips_info {
      font-size: 26px; color: #999; width: 100%; text-align: center; margin-top: 20px;
      .blue {color: #2A83F7;}
    }
    .mt {margin-top: 14px;}
  }
</style>
