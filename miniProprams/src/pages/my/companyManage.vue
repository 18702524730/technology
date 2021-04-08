<template>
  <div class="company_toggle">
    <div class="list_wrap">
      <div class="item" :class="{'showCheck': showCheck, 'active': item.active, 'disbaled': item.inlib===0 && showCheck}" v-for="(item,index) in companyList" :key="index" >
        <span class="checkbox" v-if="showCheck && item.inlib===1" @click="selectCompanyFn(item)"><span class="checked" v-show="item.active"></span></span>
        <p class="name" @click="selectCompanyFn(item)">{{ item.companyName }}</p>
        <img src="~assets/img/icon/join.png" alt="" v-if="item.inlib===0">
      </div>
      <div class="null_box row-center" v-show="(!companyList || !companyList.length) && !loading">
        <img src="~assets/img/icon/null_company.png" class="null_img" alt="">
      </div>
    </div>
    <div class="add_btn" v-show="!showCheck || !companyList.length" @click="addCompanyFn">添加企业</div>
    <div class="fixed_box row-center" v-if="!showCheck && companyList && companyList.length">
      <button class="btn btn_gray" @click="deleteFn">删除企业</button>
      <button class="btn btn_blue" @click="setSelectFn">确定</button>
    </div>
    <div class="fixed_box row-center" v-if="showCheck">
      <button class="btn btn_gray" @click="confirmDeleteFn">{{ confirmDelete }}</button>
      <button class="btn btn_blue" @click="cancelFn">取消</button>
    </div>

    <mptoast />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        companyList: [],
        showCheck: false,  //是否可选
        confirmDelete: '确认删除',
        selectCompany: {}, //选择的企业
        loading: false,
      }
    },
    mounted() {
      this.showCheck = false;
      this.companyList = this.$storage.get('companyList') || [];
      this.initFn();
    },
    methods: {
      // 添加企业
      addCompanyFn () {
        this.$router.push({
          path: '/pages/index/highTech',
        })
      },
      async getCompanyList() {
        this.loading = true;
        let resp = await this.API.my.getCompanyList();
        this.loading = false;
        this.$storage.set('companyList', resp || '');
        this.companyList = resp || [];
      },
      // 查询企业列表
      initFn () {
        let companyName = this.$storage.get('curCompanyName') || '';
        this.selectCompany.companyName = companyName;
        this.companyList.forEach( item => {
          item.active = false;
          if(item.companyName == companyName){
            item.active = true;
            this.selectCompany.id = item.id;
            this.selectCompany.inlib = item.inlib
          }
        })
        // 当企业列表为空时，清除curCompanyName
        if (!this.companyList.length) {
          this.$storage.remove('curCompanyName');
        }
      },
      // 删除企业
      deleteFn () {
        if(this.selectCompany.inlib==0) {
          this.$mptoast('已入库企业不能删除')
          return
        }
        wx.setNavigationBarTitle({
          title: '删除企业'
        })
        this.showCheck = true;
        this.confirmDelete = '确认删除(1)'
      },
      // 确认删除企业
      async confirmDeleteFn () {
        if(!this.selectCompany.companyName || this.selectCompany.inlib==0){
          this.$mptoast('请选择要操作的企业')
          return
        }
        let resp = await this.API.my.deleteCompany(this.selectCompany.id, this.selectCompany.companyName);
        if(resp.status == 200){
          this.$mptoast('删除成功')
          this.showCheck = false;
          this.selectCompany = {}; //清空当前选择的企业信息
          this.$storage.remove('curCompanyName'); //清除缓存
          await this.getCompanyList();
          this.initFn();
        }
      },
      // 选择企业
      selectCompanyFn (item) {
        if(item.inlib === 0 && this.showCheck){
          this.$mptoast('已入库企业不能删除')
          return false
        }
        this.companyList.forEach(item => {
          item.active =false;
        })
        item.active =true;
        this.selectCompany = item;
        this.confirmDelete = '确认删除(1)'
      },
      // 多选企业
      selectCheckFn (item) {
        this.companyList.forEach(item => {
          item.active =false;
        })
        item.active = true;
      },
      // 取消选择
      cancelFn () {
        wx.setNavigationBarTitle({
          title: '企业切换'
        })
        this.showCheck = false;
      },
      // 确认选择
      setSelectFn () {
        if(this.selectCompany.companyName) {
          this.$storage.set('curCompanyName', this.selectCompany.companyName);
          wx.switchTab({
            url: '/pages/my/my'
          })
        }
        else{
          this.$mptoast('请选择要操作的企业')
        }
      }
    }
  }
</script>

<style lang="scss">
  .company_toggle {
    width: 100%; min-height:100%; background: #fff; padding-bottom: 150px;
    .list_wrap {
      width: 100%;
      .item {
        width: 100%; height: 90px; line-height: 90px; position: relative; margin-bottom: 20px; transition: all 0.5s; transform: translateX(0);
        .checkbox {
          width: 36px; height: 36px; background: #D8E8FF; position: absolute; left: -20px; top: 28px; border-radius: 50%;
          .checked {width: 20px; height: 20px; background: #2E81F6; border-radius: 50%; position: absolute; left: 8px; top: 8px;}
        }
        .name {position: absolute; left: 40px; top: 0; right: 40px; bottom: 0; padding: 0 30px; background: #F4F4F4; border-radius: 8px; color: #333; font-size: 32px; white-space: nowrap; overflow: hidden; text-overflow:ellipsis;}
        img {position: absolute; right: 40px; top: 0; width: 105px; height: 90px;}
      }
      .null_box {
        width: 100%; margin: 0 0 72px 0; padding-top: 220px;
        .null_img {width: 220px; height: 254px;}
      }
      .active {
        .name {background: #2E81F6; color: #fff; }
      }
      .disbaled {
        .name {background: #F4F4F4; color: #E0E0E0;}
      }
      .showCheck {transform: translateX(50px); }
    }
    .add_btn {margin: 0 40px; height: 94px; line-height: 92px; border: 1px dashed #979797; font-size: 32px; color: #333; text-align: center; border-radius: 8px;}
    .fixed_box {
      width: 100%; height: 100px; position: fixed; left: 0; bottom: 0; border-top: 1px solid #f1f1f1;
      .btn {width: 50%; height: 100%; line-height: 100px; font-size: 32px; text-align: center; padding: 0; border:none; border-radius: 0;}
      .btn_gray {background: #fff; color: #333; }
      .btn_blue {background: #2E81F6; color: #fff;}
    }
  }
</style>
