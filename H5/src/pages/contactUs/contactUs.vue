<template>
	<div class="contactUs">
    <p class="tip">请根据自身需求选择需要联系的专家：</p>
    <div class="notice" @click="jump">
      <img class="prev" src="~assets/img/contactUs/prev_img.png">
      <span>江干区科技群：最新的科技咨询、政策文件、通知公告...</span>
      <img class="last" src="~assets/img/contactUs/hand.png">
    </div>
    <div class="contactList clearfix">
      <div class="item">
        <a href="tel:15868120211">
          <img src="~assets/img/contactUs/1.png">
          <span>企业项目培育库</span>
        </a>
      </div>
      <div class="item even">
        <a @click="showPick=true">
          <img src="~assets/img/contactUs/2.png">
          <span>IPO知产尽调</span>
        </a>
      </div>
      <div class="item">
        <a href="tel:17816082754">
          <img src="~assets/img/contactUs/3.png">
          <span>找技术/找专家</span>
        </a>
      </div>
      <div class="item even">
        <a href="tel:17816082754">
          <img src="~assets/img/contactUs/4.png">
          <span>求助站</span>
        </a>
      </div>
      <div class="item">
        <a href="tel:17816082754">
          <img src="~assets/img/contactUs/5.png">
          <span>创新券领取</span>
        </a>
      </div>
      <div class="item">
      </div>
    </div>
    <pickList :list="list" :showList.sync="showPick" @hide="hideFn" key="sho11wList"></pickList>
	</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
  import pickList from './components/pickList';

  const cartUrl = CONFIG.cartUrl;
  const addUrl = cartUrl + '/mainConfirmation/addMainConfirmation.htm';

	export default {
    components: {
      pickList
    },
		data() {
		  return {
        loading: false,
        submited: false,
        list: [
          {title: '18301559250', id: 1}
        ],
        showPick: false,
		  }
		},
		mounted(){
			//this.wxShare(title,link,imgUrl,this.path); //微信分享  在mian.js里Vue的原型里已定义
		},
		methods: {
      hideFn(data) {
        this.showPick = data;
      },
      custormAnchor(anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) { anchorElement.scrollIntoView(); }
      },
      makePhoneCall(num) {
        wx.makePhoneCall({
          phoneNumber: num
        });
      },
      jump() {
        // this.$router.push('/techGroup');
        wx.miniProgram.navigateTo({url: '/pages/associationCircle/join'});
      }
		},
    watch: {
    },
		filters: {
		}
	}
</script>
<style lang="scss">
	.contactUs{
    padding-top: 30px;
    .tip{height: 40px; line-height: 40px; padding-left: 30px;font-size:28px;}
    .notice{
      position: relative;margin: 20px 30px 0;height:64px;background:linear-gradient(270deg,rgba(255,149,0,1) 0%,rgba(255,179,46,1) 100%);border-radius:33px;padding: 0 20px;vertical-align: top;
      .prev{width: 40px;height: 32px;margin-top: 14px;}
      span{display: inline-block;height: 32px;line-height: 32px;font-size:24px;color: #fff;vertical-align: top;margin-top: 14px;max-width: 590px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
      .last{position: absolute; top: 14px; right: -24px;width: 48px;height: 61px;animation: handBtn 1s infinite normal;}
      @keyframes handBtn {
        0% {top:14px;right:-24px;}
        50% {top:24px;right:-24px;}
        100% {top:14px;right:-24px;}
      }
    }
    .contactList{
      position: absolute;top: 184px;left: 0; right: 0;bottom: 0;
      background-color: #fff;border-radius:24px 24px 0px 0px;
      .item{
        float: left;width: 50%;height: 234px;border-bottom: 1px solid #eee;border-right: 1px solid #eee;
        a{display: flex;flex-direction: column;align-items: center;text-decoration: none;
          img{width: 100px;height: 100px;margin-top: 40px;}
          span{font-size:24px;margin-top: 20px;}
        }
      }
      .even{border-right: 0;}
    }
	}
</style>
