<template>
  <div class="general_page clearfix">
		<Loading :loading="loading" />
		<div class="graph_box">
      <div class="table-box">
			<table class="result_type">
        <thead>
          <tr class="thead">
            <th class="maxWidth"></th>
            <th class="minWidth alignc">2011年</th>
            <th class="alignc minWidth">2012年</th>
            <th class="minWidth alignc">2013年</th>
            <th class="minWidth alignc">2014年</th>
            <th class="minWidth alignc">2015年</th>
             <th class="minWidth alignc">2016年</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr>
          	<td class="maxWidth pdl20">征集数</td>
            <td class="minWidth alignc">{{yearsData.eleven.recruitment}}</td>
            <td class="minWidth alignc">{{yearsData.twelve.recruitment}}</td>
            <td class="minWidth alignc">{{yearsData.thirteen.recruitment}}</td>
            <td class="minWidth alignc">{{yearsData.fourteen.recruitment}}</td>
            <td class="minWidth alignc">{{yearsData.fifteen.recruitment}}</td>
            <td class="minWidth alignc">{{yearsData.sixteen.recruitment}}</td>
          </tr>
          <tr>
          	<td class="maxWidth pdl20">认定数</td>
            <td class="minWidth alignc">{{yearsData.eleven.verification}}</td>
            <td class="minWidth alignc">{{yearsData.twelve.verification}}</td>
            <td class="minWidth alignc">{{yearsData.thirteen.verification}}</td>
            <td class="minWidth alignc">{{yearsData.fourteen.verification}}</td>
            <td class="minWidth alignc">{{yearsData.fifteen.verification}}</td>
            <td class="minWidth alignc">{{yearsData.sixteen.verification}}</td>
          </tr>
          <tr>
          	<td class="maxWidth pdl20">认定数资助金额</td>
            <td class="minWidth alignc">{{yearsData.eleven.verificationAmount}}</td>
            <td class="minWidth alignc">{{yearsData.twelve.verificationAmount}}</td>
            <td class="minWidth alignc">{{yearsData.thirteen.verificationAmount}}</td>
            <td class="minWidth alignc">{{yearsData.fourteen.verificationAmount}}</td>
            <td class="minWidth alignc">{{yearsData.fifteen.verificationAmount}}</td>
            <td class="minWidth alignc">{{yearsData.sixteen.verificationAmount}}</td>
          </tr>
          <tr>
          	<td class="maxWidth pdl20">落地数</td>
            <td class="minWidth alignc">{{yearsData.eleven.born}}</td>
            <td class="minWidth alignc">{{yearsData.twelve.born}}</td>
            <td class="minWidth alignc">{{yearsData.thirteen.born}}</td>
            <td class="minWidth alignc">{{yearsData.fourteen.born}}</td>
            <td class="minWidth alignc">{{yearsData.fifteen.born}}</td>
            <td class="minWidth alignc">{{yearsData.sixteen.born}}</td>
          </tr>
          <tr>
          	<td class="maxWidth pdl20">落地数资助金额</td>
            <td class="minWidth alignc">{{yearsData.eleven.bornAmount}}</td>
            <td class="minWidth alignc">{{yearsData.twelve.bornAmount}}</td>
            <td class="minWidth alignc">{{yearsData.thirteen.bornAmount}}</td>
            <td class="minWidth alignc">{{yearsData.fourteen.bornAmount}}</td>
            <td class="minWidth alignc">{{yearsData.fifteen.bornAmount}}</td>
            <td class="minWidth alignc">{{yearsData.sixteen.bornAmount}}</td>
          </tr>
          <tr>
          	<td class="maxWidth pdl20">已拨付资金</td>
            <td class="minWidth alignc">{{yearsData.eleven.payAmount}}</td>
            <td class="minWidth alignc">{{yearsData.twelve.payAmount}}</td>
            <td class="minWidth alignc">{{yearsData.thirteen.payAmount}}</td>
            <td class="minWidth alignc">{{yearsData.fourteen.payAmount}}</td>
            <td class="minWidth alignc">{{yearsData.fifteen.payAmount}}</td>
            <td class="minWidth alignc">{{yearsData.sixteen.payAmount}}</td>
          </tr>
          <!-- <tr class="empty" v-show="!loading && !dataList.length">
            <td colspan="13" class="norecord">
              <div class="empty_ic"><span>暂无信息</span></div>
            </td>
          </tr> -->
        </tbody>
	    </table>
      </div>
      <div class="form_control">
				<a-select placeholder="请选择年份" :options='options' v-model='searchObj.year' @change="changeYear">
				</a-select> 
			</div>
      <div class="table-box">
      <table class="result_type">
        <thead>
          <tr class="thead">
            <th class="maxWidth"></th>
            <th class="avWidth alignc">直通车</th>
            <th class="alignc avWidth">启明星</th>
            <th class="avWidth alignc">钱塘之星</th>
            <th class="avWidth alignc">创客天下</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr>
          	<td class="pdl20">征集数</td>
            <td class="avWidth alignc" v-show='ishow'>{{searchData.throughTrain.recruitment}}</td>
            <td class="avWidth alignc" v-show='ishow'>{{searchData.venus.recruitment}}</td>
            <td colspan="2" class="alignc" v-show='!ishow'>{{searchData.throughTrain.recruitment}}</td>
            <td class="avWidth alignc">{{searchData.qiantangStar.recruitment}}</td>
            <td class="avWidth alignc">{{searchData.chuangke.recruitment}}</td>
          </tr>
          <tr>
          	<td class="pdl20">认定数</td>
            <td class="avWidth alignc">{{searchData.throughTrain.verification}}</td>
            <td class="avWidth alignc">{{searchData.venus.verification}}</td>
            <td class="avWidth alignc">{{searchData.qiantangStar.verification}}</td>
            <td class="avWidth alignc">{{searchData.chuangke.verification}}</td>
          </tr>
          <tr>
          	<td class=" pdl20">认定数资助金额</td>
            <td class="avWidth alignc">{{searchData.throughTrain.verificationAmount}}</td>
            <td class="avWidth alignc">{{searchData.venus.verificationAmount}}</td>
            <td class="avWidth alignc">{{searchData.qiantangStar.verificationAmount}}</td>
            <td class="avWidth alignc">{{searchData.chuangke.verificationAmount}}</td>
          </tr>
          <tr>
          	<td class="pdl20">落地数</td>
            <td class="avWidth alignc">{{searchData.throughTrain.born}}</td>
            <td class="avWidth alignc">{{searchData.venus.born}}</td>
            <td class="avWidth alignc">{{searchData.qiantangStar.born}}</td>
            <td class="avWidth alignc">{{searchData.chuangke.born}}</td>
          </tr>
          <tr>
          	<td class=" pdl20">落地数资助金额</td>
            <td class="avWidth alignc">{{searchData.throughTrain.bornAmount}}</td>
            <td class="avWidth alignc">{{searchData.venus.bornAmount}}</td>
            <td class="avWidth alignc">{{searchData.qiantangStar.bornAmount}}</td>
            <td class="avWidth alignc">{{searchData.chuangke.bornAmount}}</td>
          </tr>
          <tr>
          	<td class=" pdl20">已拨付资金</td>
            <td class="avWidth alignc">{{searchData.throughTrain.payAmount}}</td>
            <td class="avWidth alignc">{{searchData.venus.payAmount}}</td>
            <td class="avWidth alignc">{{searchData.qiantangStar.payAmount}}</td>
            <td class="avWidth alignc">{{searchData.chuangke.payAmount}}</td>
          </tr>
          <!-- <tr class="empty" v-show="!loading && !dataList.length">
            <td colspan="13" class="norecord">
              <div class="empty_ic"><span>暂无信息</span></div>
            </td>
          </tr> -->
        </tbody>
	    </table>
      </div>
		</div>
	</div>
</template>

<script>
	import Loading from 'components/loading.vue'
	export default {
		data() {
			return {
        searchObj:{
          year:'2019',
        },
        loading: false,
        options:[
          {value:'2019',label:'2019年'},
          {value:'2018',label:'2018年'},
          {value:'2017',label:'2017年'},
        ],
        showData:[],
        findData:[],
        yearsData:{
          eleven:{
            recruitment: '',
            verification: '',
            verificationAmount: '',
            born: '',
            bornAmount: '',
            payAmount: ''
          },
          twelve:{
          },
          thirteen:{
          },
          fourteen:{
          },
          fifteen:{
          },
          sixteen:{
          }
        },
        searchData:{
          throughTrain:{
          },
          venus:{
          },
          qiantangStar:{
          },
          chuangke:{
          }
        },
			}
		},
		components: {
			Loading
		},
		mounted () {
      this.overviewFn(this.searchObj)
		},
		methods: {
      changeYear(val){
        this.overviewFn(this.searchObj)
      },
      //查询概况
			async overviewFn (data) {
        this.loading = true;
        let that = this;
				try {
          let resp = await this.API.general.talentsCount(data);
          resp.map(item=>{
            if(item.year<2017){
              switch(item.year){
                case '2011':
                  that.yearsData.eleven = item;
                  break;
                case '2012':
                  that.yearsData.twelve = item;
                  break;
                case '2013':
                  that.yearsData.thirteen = item;
                  break;
                case '2014':
                  that.yearsData.fourteen = item;
                  break;
                case '2015':
                  that.yearsData.fifteen = item;
                  break;
                case '2016':
                  that.yearsData.sixteen = item;
                  break;
              }
            }
            if(item.year>2016){
              switch(item.type){
                case '1':
                  that.searchData.throughTrain = item;
                  break;
                case '2':
                  that.searchData.venus = item;
                  break;
                case '3':
                  that.searchData.qiantangStar = item;
                  break;
                case '4':
                  that.searchData.chuangke = item;
                  break;
              }
            }
          })
          this.loading = false;
				}
				catch (e){
					this.loading = false;
					this.$message.warn(e.msg || '网络繁忙，请稍后再试')
				}
			},
    },
    computed:{
      ishow(){
        return !(this.searchObj.year=='2017');
      }
    },
		watch: {
		}
	}
</script>


<style lang="scss">
body{min-width: 1280px;}
  .general_page {
  	.loading_box {
  		position: absolute; z-index: 10; width: 100%; height: 100%; background: rgba(255,255,255,.3); text-align: center; padding-top: 300px;
  	}
    .form_control{
      width: 150px;margin-bottom: 10px;
      .ant-select{
        width: 100%;
      }
    }
    .table-box{
      min-width: 800px;
      max-width: 1080px;
    }
    .result_type{
			width: 100%;background-color: #F5F5F5;border: 1px solid #DFE2E5;margin-bottom: 30px;
      .pdl20{
        padding-left: 20px;
      }
      
			thead{
				height: 50px;overflow:hidden;border: 1px solid #DFE2E5;
				tr{
					height: 50px;overflow:hidden;
					th{text-align: left;font-size: 13px;color: #223344;font-weight: normal;padding:5px 3px;}
					th.alignc{text-align: center;}
					th.minWidth{width: 14%;}
					th.maxWidth{width: 16%;}
          th.avWidth{width: 20%;}
				}
			}
			tbody{
				tr{
					height: 50px;border: 1px solid #DFE2E5;background-color: #fff;
					td{
						min-height: 50px;font-size: 13px;color: #556677;padding:5px 3px;word-break:break-all;
            border: 1px solid #DFE2E5; border-collapse: collapse;
					}
					td.alignc{text-align: center;}
					td.minWidth{width: 14%;}
					td.maxWidth{width: 16%;}
          td.avWidth{width: 20%;}
					td.action{
						min-width: 60px;
						a{color: #479CFF;margin-right: 7px}
					}
				}
				tr:hover,tr.hover{
					background-color: #F9F9F9;
				}
				tr.empty{
					.empty_ic{
						height: 200px;text-align: center;padding-top:83px;
						span{display: inline-block;height: 34px;line-height: 34px;padding-left: 40px; color: #A8AFB5}
					}
					&:hover{background-color: #fff;}
				}
			}
		}
  	.graph_box {
  		padding: 40px;
  		.total_num {
				background: #fff; position: relative;padding: 20px 0 0 20px;
				>h3{font-size:16px; line-height: 22px;font-weight:600;}
  			.num_list {
  				position: relative;margin-top: 10px;
  				.item {
  					position: relative;width: 348px; height: 124px; float: left; padding: 20px 0 0 20px; text-align: left; margin-right:20px;background-color: #F8F8F8;border-radius:2px;margin-bottom: 20px;cursor: pointer;
  					&:last-child {margin-right: 0;}
  					.title {font-size: 13px;line-height: 18px;color: #333;}
  					ul{
  						width:100%; overflow: hidden;padding-top: 15px;margin: 0;
  						li{
  							float: left;width: 33%;cursor: pointer;height: 52px;
  							.num{display: inline-block; width:100%;font-size:20px;line-height: 28px;height: 28px;font-weight:600;color: #333;vertical-align: top;}
  							.status{display: inline-block;font-size:13px;line-height: 18px;color:#666;margin-top: 5px;}
  						}
  						li:hover{
  							.num{color: #3576FF;}
  							.status{color: #3576FF;}
  						}
  					}
  					.type_lab {
							width: 0; height: 0; border: 26px solid transparent; border-left-color: #36AF47; position: absolute; right: -26px; top: -26px; transform: rotate(-45deg);
							>span{
								position: absolute; left: -28px; top: -8px; color: #fff; transform: rotate(90deg);
								span { font-size: 10px;transform:scale(0.8);display:block;}
							}
						}
  				}
  			}
				.b_yellow {
					.item {
						.type_lab {border-left-color: #FFC225;}
					}
				}
  		}
  	}
  }
  .ant-popover-inner {
  	.ant-btn-sm {border-radius: 2px;}
  }
</style>
