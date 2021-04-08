<template>
  <div class="graph_page">

  <web-view :src="url" style="margin:0;padding:0;border:0;"></web-view>

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
      let rootUrl = CONFIG.rootUrl;
      let url_ = encodeURI(`${rootUrl}/h5/#/bigData?keyword=石墨烯`);
      this.url = url_
    },
    methods: {

    }
  }
</script>

<style lang='scss'>
  .graph_page {
    width: 100%; height: 100%; background: #3559FA;
  }
</style>
