<template>
  <div class="firstpage">
    <img src="~assets/img/homepage/pica.png" alt="pic">
    <div @click="tocp" class="cepingbtn">开始评测</div>
  </div>
</template>
<script>
export default {
  data(){
    return{}
  },
  methods:{
    tocp(){
      this.$router.push({path:'/pages/index/ceping'})
    }
  }
}
</script>
<style lang="scss">
.firstpage{
  min-width: 100%;
  min-height: 100%;
  background-color: #2F80F6;
  // background-image: url('~assets/img/homepage/bg1.png');
  // background-size: 100% auto;
  img{
    width:100%;
    height: 100%;
  }
  .cepingbtn{
    width:484px;
    height:118px;
    margin: 636px auto 20px;
    background:linear-gradient(270deg,rgba(131,203,255,1) 0%,rgba(98,162,255,1) 100%);
    border-radius:67px;
    text-align: center;
    line-height: 118px;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
}
</style>

