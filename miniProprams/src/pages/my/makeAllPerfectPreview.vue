<template>
  <div class="helpStation">
    <!-- <web-view :src="rootUrl+'/h5/index.html#/makeAllPerfect?key='+ key + '&companyName=' + companyName" style="margin:0;padding:0;border:0;"></web-view> -->
    <!-- <web-view :src="'http://localhost:8083/#/makeAllPerfect?key='+ key + '&companyName=' + companyName" style="margin:0;padding:0;border:0;"></web-view> -->
    <web-view v-if="url" :src="url" style="margin:0;padding:0;border:0;"></web-view>

    <cover-view>
      <transition-up :show="showEnterPop" @hide="hideFn">
        <enterPop :companyName="companyName" @hide="hideFn" />
      </transition-up>
    </cover-view>
  </div>
</template>

<script>
  const rootUrl = CONFIG.rootUrl;

  import enterPop from './components/enterPop.vue';

  export default {
    components: {
      enterPop,
    },
    data () {
      return {
        url: '',
        rootUrl: rootUrl,
        showEnterPop: false, //显示提交入库
        companyName: ''
      }
    },
    onShow() {
      // let query = this.$root.$mp.query;
      // if (query.popUp == 1) {
      //   this.showEnterPop = true;
      //   this.companyName = query.name;
      // }
    },
    mounted() {
      let baseUrl = `${rootUrl}/h5/index.html#`;
      // if (process.env.NODE_ENV === 'development') {
      //   baseUrl = `http://localhost:8083/#`;
      // }
      let key = this.$storage.get('key');
      let query = this.$root.$mp.query;
      let companyName = this.$storage.get('curCompanyName') || '';
      let encodeName = encodeURI(companyName);
      let path = query.path || '/makeAllPerfectPreview';
      this.url = `${baseUrl}${path}?key=${key}&companyName=${encodeName}&inlib=${query.inlib}`;
      console.log('makeAllPerfect_query:', query)
      wx.setNavigationBarTitle({
        title: companyName
      })
    },
    methods: {
       // 弹框隐藏
      hideFn(){
        let temp = false;
        if (this.showCannot) {temp = true;}
        this.showEnterPop = false;
        setTimeout(() => {
          temp && wx.pageScrollTo({
            scrollTop: 500
          })
        }, 200);
      }
    },
  }
</script>

<style lang='scss'>
  .helpStation {
    width: 100%; height: 100%;
  }
</style>
