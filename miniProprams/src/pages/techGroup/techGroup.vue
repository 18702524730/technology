<template>
	<div class="techGroup">
    <p class="tip">区交流群会第一时间推送最新的科技资讯、政策文件、通知公告...</p>
    <div class="contactList clearfix">
      <div class="item" v-for="(item, idx) in rCodeData" :key="idx">
        <img :src="item.wxPic" @click="preview(item.wxPic)">
        <span>{{item.desc}}</span>
      </div>
    </div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
  const rootUrl = CONFIG.rootUrl;
  const getRcodeUrl = rootUrl + '/getGroupWx';

  const title = '江干区科技群';
  const imgUrl = 'https://sebe360test.oss-cn-beijing.aliyuncs.com/B6D57E3A24A407100265911B94032EB0.jpg';

	export default {
    components: {
    },
		data() {
		  return {
        loading: false,
        submited: false,
        rCodeData: [],
		  }
		},
		mounted(){
			//var url = location.href;
      //this.wxShare(title, url, imgUrl, '江干区科技群', url.split('#')[0]); //微信分享  在mian.js里Vue的原型里已定义
      this.getRcode();
		},
		methods: {
      getRcode() {
        this.$http.get(getRcodeUrl).then((res) => {
          this.rCodeData = res;
          console.log(res)
        })
      },
      custormAnchor(anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) { anchorElement.scrollIntoView(); }
      },
      preview(url) {
        url = url.replace('hzsebetest.oss-cn-hangzhou.aliyuncs.com', 'testossfile.ipsebe.com').replace('sebe360test.oss-cn-beijing.aliyuncs.com', 'ossfile.ipsebe.com');
        wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: [url] // 需要预览的图片http链接列表
        });
      }
		},
    watch: {
    },
		filters: {
		}
	}
</script>
<style lang="scss">
	.techGroup{
    .tip{line-height: 40px; padding: 30px;font-size:28px;}
    .contactList{
      background-color: #fff;border-radius:24px 24px 0px 0px;padding:40px 20px 20px;
      .item{
        float: left;margin: 0 20px;width: 315px;height: 363px;display: flex;flex-direction: column;align-items: center;background-color: #F6F9FF;border-radius:10px;border:1px solid #DEE9FF;margin-bottom: 40px;
        img{width: 235px;height: 235px;margin-top: 40px;}
        span{font-size:24px;height: 33px;line-height: 33px;margin-top: 25px;}
      }
    }
	}
</style>
