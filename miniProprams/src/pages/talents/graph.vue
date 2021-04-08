<template>
  <div class="graph_page">

  <web-view :src="url" style="margin:0;padding:0;border:0;"></web-view>

  </div>
</template>

<script>
  const itechUrl = CONFIG.rootUrl;
  export default {
    data () {
      return {
        url: '',
      }
    },
    onShow () {
      let query = this.$route.query;
      switch (query.type) {
        case '1':
          this.url = `${itechUrl}/h5/#/socialNetwork?id=${query.id}`; break;
        case '2':
          this.url = `${itechUrl}/h5/#/expertRadar?id=${query.id}`; break;
        case '3':
          this.url = `${itechUrl}/h5/#/netWords?id=${query.id}`; break;
      }
    },
    methods: {

    }
  }
</script>

<style lang='scss'>
  .graph_page {
    width: 100%; height: 100%;
  }
</style>
