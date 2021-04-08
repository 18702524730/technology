<template>
  <div class="helpStation">
    <!-- <web-view :src="rootUrl+'/h5/index.html#/makeAllPerfect?key='+ key + '&companyName=' + companyName" style="margin:0;padding:0;border:0;"></web-view> -->
    <!-- <web-view :src="'http://localhost:8083/#/makeAllPerfect?key='+ key + '&companyName=' + companyName" style="margin:0;padding:0;border:0;"></web-view> -->
    <web-view v-if="url" :src="url" style="margin:0;padding:0;border:0;"></web-view>
  </div>
</template>

<script>
  const rootUrl = CONFIG.rootUrl;
  export default {
    data () {
      return {
        url: '',
        rootUrl: rootUrl,
      }
    },
    mounted() {
      let baseUrl = `${rootUrl}/h5/index.html#`;
      // if (process.env.NODE_ENV === 'development') {
      //   baseUrl = `http://localhost:8083/#`;
      // }
      let key = this.$storage.get('key');
      let query = this.$root.$mp.query;
      let companyName = encodeURI(this.$storage.get('curCompanyName') || '');
      let path = query.path || '/makeAllPerfect';
      this.url = `${baseUrl}${path}?key=${key}&companyName=${companyName}`;
      console.log('makeAllPerfect_query:', query)
    },
    methods: {
    },
  }
</script>

<style lang='scss'>
  .helpStation {
    width: 100%; height: 100%;
  }
</style>
