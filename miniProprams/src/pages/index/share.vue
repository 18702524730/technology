<template>
  <div :class="['canvasWrap', isPhoneX ? 'phoneXWrap' : '']">
    <canvas canvas-id="shareCanvas" @click="preViewPic" @longtap="savePicToAlbum(shareImage)" class="sharecanvas"></canvas>
    <img v-if="shareImage" mode="widthFix" @click="preViewPic" :src="shareImage" :style="{width: imageSize.width + 'px'}" alt="">
    <!-- <div class="test" @click="imitation">模拟打开C端</div> -->
    <div class="nextStepWrap" v-if="shareImage">
      <button type="button" class="nextStepBtn" @click="savePicToAlbum(shareImage)">保存卡片到手机相册</button>
      <div class="iphoneX" v-if="isPhoneX"></div>
    </div>
  </div>
</template>

<script>
import Filters from 'utils/filters.js'
export default {
  data () {
    return {
      bgUrl: '',
      isPhoneX: false,
      platform: 'ios', // android
      productUrl: '',
      shareImage: '',
      showSharePic: false,
      codeImgUrl: '',
      storeInfo: {},
      imageSize: '',
      detailData: {},
      imageCodeState: true // 二维码下载状态，下载失败时变成false
    }
  },
  components: {

  },
  onLoad () {
    this.shareImage = ''
  },
  async mounted () {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res.model)
        if (res.model.indexOf('iPhone X') != -1) {
          this.isPhoneX = true;
        }
        this.platform = res.platform;
      }
    })
    await this.getDetailInfoFn();
    this.image()
    this.drawSharePic()
  },
  methods: {
    // 获取文章类容
    async getDetailInfoFn () {
      let id = this.$route.query.id;
      let data = {
        id
      }
      try {
        let resp = await this.API.home.contentAttribute(data);
        // 去掉&nbsp 、p,br,img标签、
        // resp.object.text = resp.object.text.replace(/(\&nbsp\;\ *)|(\<(p|span|b|strong|i|a).*?(?=\>))|(\<\/(p|span|b|strong|i|a)\>)|(\<br\/\>)|(\<img.*\/\>)/gi, '');
        resp.object.text = resp.object.text.replace(/(\&nbsp\;\ *)|(\<(p|span|b|strong|i|a).*?\>)|(\<\/(p|span|b|strong|i|a)\>)|(\<br\/\>)|(\<img.*?\/\>)/gi, '');
        this.detailData = resp.object;
        this.detailData.publishDate = Filters.filters.dateFormat(this.detailData.publishDate, 'date');
        console.log('detail', this.detailData)
      }
      catch (e) {}
    },
    // 模拟分享
    imitation() {
      let sense, path;
      if (this.$route.query.productNum) {
        sense = this.$storage.get("storeInfo").storeCode + "_" + this.$route.query.productNum
        path = 'pages/store/serviceDetail'
      } else {
        sense = this.storeInfo.storeCode
        path = 'pages/store/index'
      }
      console.log('placeUrl_sense:', sense)
      console.log('placeUrl_path:', path)
      wx.navigateToMiniProgram({
        appId: 'wx10617813540e0d66', //C端
        path: path,
        extraData: {
          scene: sense
        },
        envVersion: 'trial'
      });
    },
    image() {
      var imageSize = {};
      var originalScale = 1.78; //图片高宽比
      //获取屏幕宽高
      wx.getSystemInfo({
        success: function(res) {
          var windowWidth = res.windowWidth;
          var windowHeight = res.windowHeight;
          imageSize.width = res.windowWidth;
          imageSize.height = res.windowHeight;
          var windowscale = windowHeight / windowWidth; //屏幕高宽比
          console.log("windowWidth: " + windowWidth);
          console.log("windowHeight: " + windowHeight);
          if (originalScale < windowscale) {
            //图片高宽比小于屏幕高宽比
            //图片缩放后的宽为屏幕宽
            imageSize.imageWidth = windowWidth;
            imageSize.imageHeight = windowWidth * originalScale;
            imageSize.chaHeight = windowHeight - imageSize.imageHeight;
          } else {
            //图片高宽比大于屏幕高宽比
            //图片缩放后的高为屏幕高
            imageSize.imageHeight = windowHeight;
            imageSize.imageWidth = windowHeight / originalScale;
            imageSize.chaWidth = windowWidth - imageSize.imageWidth;
          }
        }
      });
      console.log("缩放后的宽: " + imageSize.imageWidth);
      console.log("缩放后的高: " + imageSize.imageHeight);
      this.imageSize = imageSize
      // return imageSize;
    },
    preViewPic () {
      wx.previewImage({
        urls: [this.shareImage],
      });
    },
    // 获取验证码
    async getCodeImg() {
      // let codeUrlData = await WXP.getImageInfo({ // https://sebe360test.oss-cn-beijing.aliyuncs.com/004142D77937A8F15248DDABA220CECF.png
      //   src: 'https://ossfile.ipsebe.com/004142D77937A8F15248DDABA220CECF.png' //服务器返回的图片地址
      // });
      // this.codeImgUrl = codeUrlData.path;
      // console.log('this.codeImgUrl', this.codeImgUrl)

      try {
        let data = await this.API.home.createwxaqrcode({
          // miniAppSessionId: "wx10617813540e0d66_b1KmeZ6KzV1PYPkLD1x3PWVIsS14lsY6",
          miniAppType: 8, // 2为拾贝微商城 3为推单助手wepy.$instance.globalData.miniAppType,
          qrcodeType: 2, // 1接口A,2 接口B,3 接口C 接口ABC的参数必传其一
          scene: this.$route.query.id,
          path:'pages/index/msgDetail', // 2接口B不能带参数，需传scene。接口A和接口C需要带参数
          width: 420,
          auto_color: false,
          line_color: { r: "47", g: "128", b: "246" }
        });
        let codeUrlData = await WXP.getImageInfo({
          src: data.imageurl //服务器返回的图片地址
        });
        this.codeImgUrl = codeUrlData.path;
      } catch (e) {
        console.log('eeee', e)
        this.imageCodeState = false
      }
   
    },
    savePicToAlbum(tempFilePath) {
      let that = this;
      wx.getSetting({
        success(res) {
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            wx.authorize({
              scope: "scope.writePhotosAlbum",
              success() {
                wx.saveImageToPhotosAlbum({
                  filePath: tempFilePath || that.shareImage,
                  success(res) {
                    wx.showToast({
                      icon: 'none',
                      title: "保存成功去发朋友圈吧~"
                    });
                  },
                  fail(res) {
                    console.log(res);
                  }
                });
              },
              fail() {
                // 用户拒绝授权,打开设置页面
                wx.openSetting({
                  success: function(data) {
                    console.log("openSetting: success");
                  },
                  fail: function(data) {
                    console.log("openSetting: fail");
                  }
                });
              }
            });
          } else {
            wx.saveImageToPhotosAlbum({
              filePath: tempFilePath || that.shareImage,
              success(res) {
                wx.showToast({
                  icon: 'none',
                  title: "保存成功去发朋友圈吧~"
                });
              },
              fail(res) {
                console.log(res);
              }
            });
          }
        },
        fail(res) {
          console.log(res);
        }
      });
    },
    Point(x, y) {
      return { x: x, y: y };
    },
    drawRoundedRect(rect, r, ctx, shadow, fillStyle) {
      var ptA = this.Point(rect.x + r, rect.y);
      var ptB = this.Point(rect.x + rect.width, rect.y);
      var ptC = this.Point(rect.x + rect.width, rect.y + rect.height);
      var ptD = this.Point(rect.x, rect.y + rect.height);
      var ptE = this.Point(rect.x, rect.y);

      ctx.beginPath();

      ctx.moveTo(ptA.x, ptA.y);
      ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r);
      ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r);
      ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r);
      ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r);
      ctx.fillStyle = fillStyle ? fillStyle : "#fff";
      ctx.setShadow(0, 15, 28, shadow);
      // ctx.stroke(); // 线框
      ctx.fill(); // 填充
    },

    Rect(x, y, w, h) {
      return { x: x, y: y, width: w, height: h };
    },
    // 下载背景图片
    async downImg(type) {
      //获取网络图片本地路径 https://sebe360test.oss-cn-beijing.aliyuncs.com/BB984E0687083AFB91CEC938B8052C49.jpg
      let bgUrlData = await WXP.getImageInfo({ // https://sebe360test.oss-cn-beijing.aliyuncs.com/02105A4AFC375E0FA95EDFB8FF4914EE.jpg
        src: "https://ossfile.ipsebe.com/71210D794A001E1ED8E29D6EF4823D58.jpg" // 分享背景图地址
      });
      this.bgUrl = bgUrlData.path;
      console.log('asda', this.bgUrl)
    },
    async drawSharePic() {
      let scale = 1;
      if (this.imageSize.width === 320) {
        scale = 0.853;
      } else if (this.imageSize.width === 360) {
        scale = 0.96
      }
      this.shareDiaState = false;
      await this.getCodeImg("pages/store/index");

      // 如果二维码下载失败，刷新重试
      if (!this.imageCodeState) {
        console.log('二维码下载失败，刷新重试')
        wx.showModal({
          title: '提示',
          content: '分享链接获取失败请关闭页面重试',
          showCancel: false,
          success: () => {
            this.imageCodeState = true;
            this.$router.go(-1);
          }
        })
        return
      }

      wx.showLoading({
        title: "正在生成图片...",
        mask: true
      });
      await this.downImg();

      //y方向的偏移量，因为是从上往下绘制的，所以y一直向下偏移，不断增大。
      let yOffset = 0;
      const goodsTitle = this.detailData.title.length > 34 ? this.detailData.title.slice(0, 33) + '……' : this.detailData.title;
      let goodsTitleArray = [];
      //为了防止标题过长，分割字符串,每行18个
      for (let i = 0; i < goodsTitle.length / 17; i++) {
        if (i > 1) {
          break;
        }
        goodsTitleArray.push(goodsTitle.substr(i * 17, 17));
      }
      let content = this.detailData.text.length > 188 ? this.detailData.text.slice(0, 188) + '……' : this.detailData.text;
      let contentArr = [];
      //为了防止标题过长，分割字符串,每行20个
      for (let i = 0; i < content.length / 21; i++) {
        if (i > 8) {
          break;
        }
        contentArr.push(content.substr(i * 21, 21));
      }

      const time = this.detailData.publishDate;

      const canvasCtx = wx.createCanvasContext("shareCanvas");
      // ctx.textBaseline = 'middle'
      //绘制背景

      canvasCtx.setFillStyle("white"); // 0px 30px 56px 0px rgba(61,82,190,0.17);

      canvasCtx.fillRect(0, 0, 750*scale, 1448*scale);
      // 绘制背景图
      canvasCtx.drawImage(this.bgUrl, 0, 0, 750*scale, 1448*scale);
      // 绘制时间
      canvasCtx.setFontSize(30*scale);
      canvasCtx.setFillStyle("#999");
      canvasCtx.setTextAlign("left");
      canvasCtx.fillText(time, 80*scale, 286*scale);
      //绘制标题
      yOffset = 356*scale;
      goodsTitleArray.forEach((value) => {
        canvasCtx.setFontSize(34*scale);
        canvasCtx.setFillStyle("#333333");
        canvasCtx.setTextAlign("left");
        canvasCtx.font = 'normal normal bold '+ 34*scale +'px normal';
        canvasCtx.fillText(value, 80*scale, yOffset);
        yOffset += 48*scale;
      });
      canvasCtx.font = 'normal normal 400 '+ 34*scale +'px normal';
      yOffset += 28;
      // 绘制内容
      contentArr.forEach(function(value) {
        canvasCtx.setFontSize(28*scale);
        canvasCtx.setFillStyle("#333333");
        canvasCtx.setTextAlign("left");
        canvasCtx.fillText(value, 80*scale, yOffset);
        yOffset += 48*scale;
      });
      
      //绘制最底部文字
      canvasCtx.setFontSize(28*scale);
      canvasCtx.setFillStyle("#bbb");
      canvasCtx.setTextAlign("left");
      canvasCtx.fillText("长按或扫描小程序码", 340*scale, 1126*scale);
      canvasCtx.fillText("了解详情", 340*scale, 1166*scale);
      // 绘制二维码
      yOffset += 5*scale;
      canvasCtx.drawImage(this.codeImgUrl, 80*scale, 1024*scale, 240*scale, 240*scale);

      // 绘制底部灰色文字
      canvasCtx.setFillStyle("#F8F8F8"); // 0px 30px 56px 0px rgba(61,82,190,0.17);
      canvasCtx.fillRect(40*scale, 1314*scale, 670*scale, 60*scale);
      // Powered by 长三角(杭州·江干)科技大市场 / 指导单位:江干科技局
      canvasCtx.setFontSize(20*scale);
      canvasCtx.setFillStyle("#999");
      canvasCtx.setTextAlign("center");
      canvasCtx.fillText("Powered by 长三角(杭州·江干)科技大市场 / 指导单位:江干科技局", 374*scale, 1350*scale);

      canvasCtx.draw();
      //绘制之后加一个延时去生成图片，如果直接生成可能没有绘制完成，导出图片会有问题。
      setTimeout(() => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 750*scale,
          height: 1448*scale,
          destWidth: 1125*scale,
          destHeight: 2172*scale,
          fileType: "png",
          quality: 1,
          canvasId: "shareCanvas",
          success: res => {
            this.shareImage = res.tempFilePath;
            console.log(this.shareImage)
            this.showSharePic = true;
            wx.hideLoading();
            // 这里保存图片
            // this.savePicToAlbum(res.tempFilePath);
          },
          fail: function(res) {
            console.log(res);
            wx.hideLoading();
          }
        });
      }, 1500);
    }
  },
}
</script>

<style lang="scss">
.canvasWrap{width: 750px;position: relative;padding-bottom: 130px;
  .test{position: absolute;top: 50px;width: 750px;line-height: 60px;font-size: 28px;color: #333;left: 0;text-align: center;}
  .sharecanvas{width: 1500px;height: 2896px;margin: 0 auto;position: fixed;top: 0;left: -1500px;}
  img{margin: 0 auto;display: block;}
  .nextStepWrap{box-shadow:0px -2px 20px 0px rgba(147,2,0,0.08);background:rgba(255,255,255,1);padding: 20px;text-align: center;
  position: fixed;bottom: 0;left: 0;width: 100%;z-index: 10;
    .nextStepBtn{display: block;padding: 0;border: none;line-height: 88px;color: #3576FF;font-size: 30px;border-radius: 50px;border: 1px solid #3576ff;}
    .iphoneX{height: 68px;background: #fff;}
  }
  .phoneXWrap{padding-bottom: 198px;}
}

</style>
