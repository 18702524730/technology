<template>
  <div class="content_inner" :style="'min-height:' + boxH + 'px'">
    <!-- <transition name="fade"> -->
      <router-view :key="key"></router-view>
    <!-- </transition> -->
  </div>
</template>
<script>
  export default {
    name: 'Content',
    data () {
      return {
      	boxH: 0
      }
    },
    computed: {
      // 默认情况下不同路由引入同一个组件 不触发created 数据作用域是同一个，加一个可以加以区别。
      key() {
        return this.$route.name !== undefined ? this.$route.name : this.$route
      }
    },
    methods:{
    },
    created(){
    	this.boxH = document.body.clientHeight - 50 - 20 - 53;
    },
    mounted(){
    }
  }
</script>

<style lang='scss'>
	.content_inner{background-color: #fff;margin: 20px 20px 0;}
	.fade-enter-active,
	.fade-leave-active {
	    transition: opacity .3s
	}

	.fade-enter,
	.fade-leave-active {
	    opacity: 0
	}
</style>
