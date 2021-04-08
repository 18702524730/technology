<template>
  <div class="helpStation">
    <web-view v-if="url" :src="url" style="margin:0;padding:0;border:0;"></web-view>
  </div>
</template>

<script>
  import mixin from 'mixins/'
  const rootUrl = CONFIG.rootUrl;

  export default {
    mixins: [mixin],
    data () {
      return {
        url: '',
        rootUrl: rootUrl,
      }
    },
    mounted(){
      let isIphoneX = this.judgeIsPhoneX();
      let baseUrl = `${rootUrl}/h5/index.html#`;
      // if (process.env.NODE_ENV === 'development') {
      //   baseUrl = `http://localhost:8083/#`;
      // }
      let query = this.$root.$mp.query;
      let name = encodeURI(query.name);
      let contacts = encodeURI(query.contacts || '');
      let key = query.key;
      let path = query.path || '/stepTwo';
      let sessionId = this.$storage.get('sessionId');
      let auth = this.$storage.get('auth');
      this.url = `${baseUrl}${path}?key=${key}&name=${name}&phone=${auth.phone}&contacts=${contacts}&miniAppType=${this.miniAppType}&sessionId=${sessionId}&isIphoneX=${isIphoneX}`;
      console.log(this.url)
      console.log('highTechIn_query:', query)
    },
    methods: {
    }
  }
</script>

<style lang='scss'>
  .helpStation {
    width: 100%; height: 100%;
  }
</style>
