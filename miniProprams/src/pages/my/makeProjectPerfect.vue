<template>
  <div class="helpStation">
    <web-view v-if="url" :src="url" style="margin:0;padding:0;border:0;"></web-view>
  </div>
</template>

<script>
  const rootUrl = CONFIG.rootUrl;
  import mixins from 'mixins/';
  export default {
    mixins: [mixins],
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
      let path = query.path || '/makeProjectPerfect';
      let isIphoneX = this.judgeIsPhoneX() ? 1 : 0;
      this.url = `${baseUrl}${path}?key=${key}&companyName=${companyName}&projectType=${query.projectType}&isIphoneX=${isIphoneX}`;
      console.log('makeAllPerfect_query:', query, this.url, companyName)
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
