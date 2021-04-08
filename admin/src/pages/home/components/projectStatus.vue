<template>
  <div class="pub_subject_status">
    <label for="subject_status">{{projectName}}：</label>
    <span v-for="(item, index) in statusArr" :key="index" :class="{'cur': item.id === curStatusId}" @click="changeMenu(item.id)">{{item.name}}（{{item.total}}）</span>
  </div>
</template>

<script>
  /*const statusArr = [
    {
      id: 0,
      name: '已认定',
      total: 313,
    },
    {
      id: 1,
      name: '储备',
      total: 33,
    },
    {
      id: 2,
      name: '重点培育',
      total: 33,
    }
  ]*/
  export default {
    props: {
      curStatusId: Number,
      projectName: String,
      statusArr: Array
    },
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
      changeMenu (idx) {
        this.$emit('changeStatus', idx);
      },
    },
  }
</script>

<style lang="scss">
  .pub_subject_status {
    background-color: #fff;height: 48px;padding-left: 20px;
    label{display: inline-block;height:48px;line-height: 48px;font-size:13px;font-weight:600;vertical-align: top;color: #333;}
    span{
      display: inline-block;height:48px;line-height: 48px;font-size:13px;color: #666;margin-left: 30px;cursor: pointer;
      &.cur{color: #3576FF;font-weight:600;}
    }
  }
</style>
