<template>
  <div class="pub_area">
    <label for="areas">辖区：</label>
    <span v-for="(item, index) in areaArr" :key="index" :class="{'cur': item.id === curStreetId}" @click="changeMenu(item.id)">{{item.name}}</span>
  </div>
</template>

<script>
  const areaArr = [
    {
      id: 0,
      name: '全部',
    },
    {
      id: 1,
      name: '闸弄口街道',
    },
    {
      id: 2,
      name: '凯旋街道',
    },
    {
      id: 3,
      name: '采荷街道',
    },
    {
      id: 4,
      name: '四季青街道',
    },
    {
      id: 5,
      name: '笕桥街道',
    },
    {
      id: 6,
      name: '彭埠街道',
    },
    {
      id: 7,
      name: '钱塘智慧城',
    },
    {
      id: 8,
      name: '丁兰街道',
    },
  ]
  export default {
    props: {
      curStreetId: Number
    },
    data () {
      return {
        areaArr: areaArr, 
        streetName: '',  //街道名
        isSuper: 1,  //默认管理员
      }
    },
    computed: {
    },
    mounted () {
      this.isSuper = this.$storage.get('isSuper');
      if (!this.isSuper) {
        this.areaArr = [
          {
            id: this.$storage.get('streetId'),
            name: this.$storage.get('streetName')
          }
        ]
      }
    },
    methods: {
      changeMenu (idx) {
        this.$emit('changeArea', idx);
      },
    },
  }
</script>

<style lang="scss">
  .pub_area {
    background-color: #fff;height: 48px;padding-left: 20px;
    label{display: inline-block;height:48px;line-height: 48px;font-size:13px;font-weight:600;vertical-align: top;}
    span{
      display: inline-block;height:48px;line-height: 48px;font-size:13px;color: #666;margin-left: 30px;cursor: pointer;
      &.cur{color: #3576FF;font-weight:600;}
    }
  }
</style>
