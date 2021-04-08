<template>
  <div class="helpStation">
    <web-view :src="rootUrl+'/h5/index.html#/helpStation?key='+ key" style="margin:0;padding:0;border:0;"></web-view>
  </div>
</template>

<script>
const rootUrl = CONFIG.rootUrl;
  export default {
    data () {
      return {
        url: '',
        key: this.$storage.get('key'),
        rootUrl: rootUrl,
      }
    },
    methods: {

    },
    onShareAppMessage() {
      let obj = {};
      let memberId = this.$storage.get('auth').member_id;
      /*obj = {
        title: '我在【拾贝宝】开店赚钱，邀请你一起加入哦！',
        path: "/pages/authorize/authorize?memberId="+ memberId,
        imageUrl: '/static/icon/bg.png'
      }*/
      return obj;
    }
  }
</script>

<style lang='scss'>
  .helpStation {
    width: 100%; height: 100%;
  }
</style>
