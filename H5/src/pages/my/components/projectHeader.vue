<template>
  <div class="projectHeader">
    <h1>{{name}}</h1>
    <p class="subtip" v-if="subsidy">（{{subsidy}}）</p>
  </div>
</template>
<script>
	export default {
    props: {
      // 文字
      name: {
        type: String,
        default: ''
      },
      // 政策描述
      subsidy: {
        type: String,
        default: ''
      },
    },
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
  .projectHeader{
    height: 370px;background:url('~assets/img/company/project_bg.png') no-repeat;background-size: 100% auto;text-align: center;padding-top: 55px;
    >h1{font-size: 48px;height:67px;color: #fff;line-height: 67px;font-weight: 700;}
    .subtip{height:45px;line-height: 45px;font-size:32px;font-weight:500;color: #F9DA58;margin-top: 7px;}
  }
</style>
