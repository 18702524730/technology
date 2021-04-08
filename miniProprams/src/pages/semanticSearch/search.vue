<template>
  <div class="semantic_search">
    <div class="textarea_box">
      <textarea class="area_box" style="height: 290rpx;" maxlength="500" v-model="content" placeholder="对技术/产品/方法的一段文本描述，智能搜索匹配最相关的专利、论文、项目。" />
      <p class="num_box">{{ content.length || 0 }}/500</p>
    </div>
    
    <button class="search_btn" @click="searchFn">搜索</button>

    <p class="tips">不明白填什么？您可以试试下面这个例子</p>

    <div class="example" @click="cloneFn">
      <div class="san"></div>
      {{ example }}
    </div>

    <mptoast  />


  </div>
</template>

<script>

export default {
  data () {
    return {
      content: '',
      example: '针对3D生物打印设备通常无法实现多喷头切换的问题，研发一种3D生物打印设备。希望该设备包括以下模块：喷头架、喷头体和抓取等必要装置，可以实现自动三维扫描矫正，通过三维打印工艺将矫形器数字三维模型打印成形。希望该3D生物打印设备能广泛应用于人体器官打印等前沿领域。'
    }
  },
  async onShow () {
  },
  methods: {
    cloneFn () {
      this.content = this.example;
    },
    searchFn () {
      if (!this.content) {
        this.$mptoast('输入内容不能为空！')
        return
      }
      this.$router.push({path: `/pages/semanticSearch/searchList?keyword=${this.content}`})
    }
  }
}
</script>

<style lang="scss">
  .semantic_search {
    position: absolute; width: 100%; height: 100%; background: #fff;
    .textarea_box {
      width: 690px; height: 400px; margin: 30px auto; padding: 30px; position: relative; box-shadow:0px 4px 16px 0px rgba(54,93,176,0.11);
      .area_box {width: 100%; height: 300px; display: inline-block; font-size: 26px;}
      .num_box {position: absolute; right: 30px; bottom: 30px; color: #999; font-size: 26px;}
      .placeholderStyle {}
    }
    .search_btn {width: 690px; margin-left: 30px; margin-bottom: 30px; height: 90px; line-height: 90px; border: none; color: #fff; background:linear-gradient(270deg,rgba(53,89,250,1) 0%,rgba(53,118,255,1) 100%); font-size: 32px; text-align: center; padding: 0;}
    .tips {width: 100%; text-align: center; font-size: 24px; color: #3576FF; text-align: center; }
    .example {
      position: relative; width: 690px; height: 340px; border-radius: 10px; background: #EAF1FF; margin: 0 auto; padding: 30px; font-size: 26px; color: #333; line-height: 48px; margin-top: 20px;
      .san {position: absolute; top:-38px; left: 50%; margin-left: -5px; width: 0; height: 0; border: 14px solid transparent; border-bottom-color: #EAF1FF; border-top-width: 20px; border-bottom-width: 20px;}
    }
  }
</style>
