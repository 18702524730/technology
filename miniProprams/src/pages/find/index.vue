<template>
  <div class="find_home">
    <div class="top_header">
      <div class="top_header_in">
        <h2>找技术/找专家</h2>
        <p>国内领先的技术与专家大数据搜索引擎</p>
        <div class="serach_box" @click="focusFn">
          <img src="~assets/img/find/search.png">
          <span>请输入科技关键词、人名、单位等关键词</span>
          <!-- <input type="text" name="keyword" placeholder-class="placeholder" placeholder="请输入科技关键词、人名、单位等关键词">
          <span>搜索</span> -->
        </div>
        <div class="row-between keywords_box">
          <div class="keywords_list"><span v-for="(item, index) in keywordsArr" :key="index" @click="toSearch(item)">{{item}}</span></div>
          <div class="change"><img :class="{'animate_r': isChanging}" src="~assets/img/find/fresh.png"><span @click="changeHotWord">换一批</span></div>
        </div>
        <div class="row-center entrance_list">
          <div class="entrance" @click="goInnerPageFn(0)">
            <img src="~assets/img/find/1.png">
            <p>人才搜索</p>
          </div>
          <div class="entrance" @click="goInnerPageFn(1)">
            <img src="~assets/img/find/2.png">
            <p>语义搜索</p>
          </div>
          <div class="entrance" @click="goInnerPageFn(2)">
            <img src="~assets/img/find/3.png">
            <p>科技大数据</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 专家大数据 -->
    <div class="experts_big_data">
      <h3 class="row-between">
        <span>专家大数据</span><span @click="findExpert">找专家</span>
      </h3>
      <div class="card_lists">
        <div class="card" v-for="(item, index) in expertsList" :key="index" @click="toExpertDetail(item.expertId)">
          <div class="info">
            <img :src="item.photo">
            <div class="column-between">
              <div><span>{{item.name}}</span><span class="grade" v-if="item.title">| {{item.title}}</span></div>
              <p>{{item.school}}</p>
            </div>
          </div>
          <p><span v-for="(it, idx) in item.abilityArr" :key="idx">{{it}}</span><img src="~assets/img/find/arrow_right.png"></p>
          <img v-if="item.title == '教授'" class="grade_img" src="~assets/img/find/js.png">
          <img v-else class="grade_img" src="~assets/img/find/fjs.png">
        </div>
      </div>
    </div>

    <!-- 成果转化 -->
    <div class="results_transform">
      <h3 class="row-between">
        <span>成果转化</span><span></span>
      </h3>
      <div class="cards">
        <div class="card" v-for="(item, index) in caseList" :key="index" @click="toDetail(item)">
          <div class="column-between" :class="{'has_img': item.typeImg}">
            <p>{{item.title}}</p>
            <p>发布时间：{{item.releaseDate}}</p>
          </div>
          <span v-if="item.typeImg"><img :src="item.typeImg" mode="aspectFill"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Filters from '../../utils/filters.js'
  const keywordsArrData = ['人工智能', '石墨烯', '基因治疗', '物联网', '集成电路', '大数据', '新能源材料', '超导材料', '免疫疗法', '智能制造', '数据挖掘', '核燃料'];
  export default {
    components: {
      // footerNav
    },
    data () {
      return {
        isChanging: false,
        expertsList: [],
        caseList: [],
        keywordsArr: [],
        oldArr: []
      }
    },
    async onShow () {
      this.getTopExpert();
      this.getTopCaseList();
      this.initKeywordsArr();
    },
    methods: {
      goInnerPageFn (type) {
        let page = '';
        switch (type) {
          case 0:
            page = '/pages/talents/index'; break;  //人才搜索
          case 1:
            page = '/pages/semanticSearch/search'; break;  //语义搜索
          case 2:
            page = '/pages/bigData/bigData'; break;  //科技大数据
        }
        this.$router.push(page);
      },
      initKeywordsArr() {
        function getRandom(min,max){
          let random = Math.random()*(max-min)+min;
          random = Math.floor(random);
          return random;
        }
        let arr = [];
        let l = keywordsArrData.length;
        for (var i = 0; i < 100 && arr.length < 4; i++) {
          let index = getRandom(0, l);
          if (arr.includes(index) || this.oldArr.includes(index)) {
            continue;
          }else{
            arr.push(index)
          }
        }
        console.log(arr)
        this.oldArr = arr;
        this.keywordsArr = keywordsArrData.filter((it, index) => {
          return arr.includes(index);
        })
      },
      async getTopExpert() {
        // let data = await this.API.find.getImportSchoolExpertList({"start":0,"pageSize":4}, true)
        let data = await this.API.find.getTopExpert();
        // data = data.list;
        data.forEach((item) => {
          item.abilityArr = item.ability.split('、');
        });
        this.expertsList = data;
        console.log(this.expertsList)
      },
      async getTopCaseList() {
        let data = await this.API.find.getTopCaseList();
        data.forEach((item) => {
          item.releaseDate = Filters.filters.dateFormat(item.releaseDate, 'yyyy.MM.dd').slice(0, 10);
        });
        this.caseList = data;
        console.log(this.caseList)
      },
      changeHotWord() {
        this.isChanging = true;
        setTimeout(() => {
          this.isChanging = false;
        }, 500);
        this.initKeywordsArr();
      },
      focusFn() {
        this.$router.push('/pages/find/techSearch')
      },
      toSearch(keyword) {
        this.$router.push('/pages/find/techSearch?keyword=' + keyword)
      },
      findExpert() {
        this.$router.push('/pages/find/expertList')
      },
      toExpertDetail(expertId) {
        this.$router.push('/pages/talents/talentDetail?id=' + expertId)
      },
      toDetail(item) {
        let { channelId, contentId } = item;
        this.$router.push({
          path: '/pages/find/caseDetail',
          query: {
            channelId,
            contentId,
          }
        });
      }
    }
  }
</script>
<style lang="scss">
  .find_home {
    font-size: 28px;background-color: #fff;
    .top_header{
      background:linear-gradient(180deg,rgba(53,89,250,1) 0%,rgba(53,118,255,1) 100%);
      .top_header_in{
        padding-top: 40px;background: transparent url(~assets/img/find/top_bg.png) 0 bottom no-repeat;background-size: 100% 184px;
        h2{height:59px;line-height: 59px;font-size:44px;font-weight:bold;color: #fff;text-align: center;}
        >p{margin-top: 20px;height:40px;line-height:40px;color: #fff;text-align: center;}
        .serach_box{
          height: 70px;border-radius: 45px;margin: 30px 30px 0;background:rgba(255,255,255,0.15);padding: 15px 30px;
          img{float: left;width: 32px;height: 32px;margin-top: 4px;}
          //input{float: left;margin-left: 10px;height:53px;line-height: 53px;width: 520px; color: #fff;border:0;margin-top: -6px;}
          //span{float: right;color: #fff;height:40px;line-height: 40px;}
          span{float: left;margin-left: 10px;height:53px;line-height: 53px;width: 520px; color: #A9BFFE;border:0;margin-top: -6px;}
          .placeholder{color: #A9BFFE;}
        }
        .keywords_box{
          margin: 20px 30px 0;
          .keywords_list{
            max-width: 560px;overflow: hidden;height:48px;
            span{font-size:24px;color: #C8D9FF;display: inline-block;height:48px;line-height: 48px;border-radius: 45px;background:rgba(255,255,255,0.1);text-align: center;margin-right: 10px;padding: 0 15px;}
            span:last-child{margin-right:0;}
          }
          .change{
            background:rgba(255,255,255,0.1);text-align: center;height:48px;line-height: 28px;border-radius: 45px;padding: 10px 15px;
            img{display: inline-block;width: 28px;height: 28px;}
            span{padding-left: 5px;font-size:20px;color: #C8D9FF;display: inline-block;height: 28px;line-height: 28px;vertical-align: top;}
            .animate_r{transform:rotate(360deg);transition: transform 0.3s ease-in;}
          }
        }
        .entrance_list{
          margin: 30px 30px 0;height: 200px;background-color: #fff;box-shadow:0px 4px 16px 0px rgba(54,93,176,0.11);border-radius:10px;padding-top: 35px;align-items: flex-start;
          .entrance{
            width: 230px;text-align: center;
            img{width: 82px; height: 82px;display: block;margin: 0 auto;}
            p{margin-top: 15px;font-size:24px;height: 33px;line-height: 33px;}
          }
        }
      }
    }

    .experts_big_data{
      margin: 40px 30px 0;
      h3{
        span{display: inline-block;height: 44px;line-height: 44px;background: #fff url(~assets/img/find/zj.png) 0 0 no-repeat;background-size: 39px 44px;padding-left: 49px;font-size:30px;font-weight:600;}
        span:last-child{color: #999;font-weight: 400;background: none;font-size: 28px;}
      }
      .card_lists{
        padding-top: 25px;min-height: 438px;
        .card{
          width: 100%;height: 219px;border-radius:10px;padding: 30px 10px 30px 30px;background-color: #fff;position: relative;overflow: hidden;box-shadow:0px 4px 16px 0px rgba(54,93,176,0.11);margin-bottom: 20px;
          .info{
            display: flex;flex-direction: row;
            img{width: 95px;height: 95px;border-radius: 95px;border: 1px solid #eee;}
            >div{
              margin-left:20px;align-items: flex-start;
              span{font-size:32px;height:45px;line-height:45px;}
              span.grade{margin-left: 20px;height:24px;font-size:26px;line-height:24px;color: #666;}
              p{height:37px;line-height:37px;font-size:26px;color: #666;}
            }
          }
          >p{
            padding-top: 20px;position: relative;height:64px;overflow: hidden;vertical-align: top;
            span{font-size:24px;color: #3576FF;display: inline-block;height:44px;line-height: 44px;border-radius: 22px;background:#EAF1FF;text-align: center;margin-right: 10px;padding: 0 20px;vertical-align: top;}
            img{position: absolute;right: 0;top: 20px;width: 40px;height: 40px;}
          }
          .grade_img{position: absolute;top: 0;right: 0;width: 73px;height: 73px;}
        }
      }
    }

    .results_transform{
      margin: 35px 0 0;padding:0 0 170px;background-color: #f8f8f8;
      h3{
        background-color: #fff;padding: 0 30px;
        span{display: inline-block;height: 44px;line-height: 44px;background: #fff url(~assets/img/find/cg.png) 0 0 no-repeat;background-size: 39px 44px;padding-left: 49px;font-size:30px;font-weight:600;}
        span:last-child{color: #999;font-weight: 400;background: none;}
      }
      .cards{
        padding: 25px 30px 0;background-color: #fff;
        .card{
          border-top: 1px solid #eee;padding: 30px 30px 30px 0;position: relative;
          >div{
            align-items: flex-start;
            p{font-size:30px;line-height: 42px;max-width: 630px;}
            p:last-child{font-size: 26px;height:37px;line-height:37px;color: #999;margin-top: 20px}
          }
          .has_img{
            height: 180px;
            p{width: 470px;}
          }
          span{
            width: 180px;height: 180px;position: absolute;top:30px;right: 0;border-radius: 10px;border: 1px solid #fff;overflow: hidden;
            img{width: 178px;height: 178px;vertical-align: middle;}
          }
        }
      }
    }
  }
</style>
