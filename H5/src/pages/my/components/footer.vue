<template>
  <div class="footer">
    <p class="tip">如有疑惑请咨询专家</p>
    <a class="phone mt20" href="tel:0571-28253793 ">0571-28253793 </a> 或 <a class="phone" href="tel:0571-28253778">0571-28253778</a>
    <img src="~assets/img/index/logoBot.jpg" alt="">
    <h5>长三角(杭州·江干)科技大市场版权所有</h5>
    <p class="tec">指导单位：杭州江干科技局</p>
    <p class="tec">技术支持单位：杭州拾贝知识产权服务有限公司</p>
  </div>
</template>
<script>
	export default {
		data() {
		  return {
		  }
    },
		mounted(){
		},
		methods: {
    },
	}
</script>
<style lang="scss">
  .footer{
    text-align: center;padding: 50px 40px 100px;font-size: 28px;color: #999;
    >img{width: 200px;margin: 60px auto 0;font-size: 0;display: block;}
    .tip{font-size: 26px;color: #999;line-height: 40px;}
    .phone{display: inline-block;font-size: 28px;color: #2A79FF;line-height: 40px;padding-top: 2px;}
    h5{font-size: 24px;color: #333;text-align: center;line-height: 33px;font-weight: normal;padding-bottom: 5px;}
    .tec{font-size: 24px;color: #999;line-height: 33px;}
  }
</style>
