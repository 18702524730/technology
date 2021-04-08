<template>
  <div class="gg-card-container">
		<pub-header ></pub-header>
		<div class="page_wrap" :style="{height: `${boxHei}px`, minHeight: '502px'}">
			<Loading :loading="loading" />
			<areas :curStreetId="curStreetId" @changeArea="changeArea"></areas>
			<!-- 专利 -->
			<h2 class="module_title" style="border-top: 1px solid #eee;padding-top: 20px;">专利</h2>
			<div class="line_wrap">
				<div class="box_wrap" >
					<p>发明专利数</p>
					<h2>{{tData.patent.fm || 0}}</h2>
				</div>
				<div class="box_wrap">
					<p>已授权发明专利数</p>
					<h2>{{tData.patent.fmsq || 0}}</h2>
				</div>
				<div class="box_wrap">
					<p>实用新型专利数</p>
					<h2>{{tData.patent.syxx || 0}}</h2>
				</div>
				<div class="box_wrap">
					<p>外观专利数</p>
					<h2>{{tData.patent.wg || 0}}</h2>
				</div>
			</div>
			<!-- 版权 -->
			<h2 class="module_title">版权</h2>
			<div class="line_wrap">
				<div class="box_wrap">
					<p>软件著作权 </p>
					<h2>{{tData.copyright.softCopyright || 0}}</h2>
				</div>
				<div class="box_wrap">
					<p>作品著作权</p>
					<h2>{{tData.copyright.workCopyright || 0}}</h2>
				</div>
			</div>
			<!-- 商标 -->
			<h2 class="module_title">商标</h2>
			<div class="line_wrap">
				<div class="box_wrap">
					<p>有效商标数 </p>
					<h2>{{tData.tm.tmNum || 0}}</h2>
				</div>
			</div>
		</div>
		<p class="copy_roght">
			<!-- © 2018-现在 长三角(杭州·江干)科技大市场版权所有 &nbsp; 指导单位：杭州江干科技局 -->
			© 2018-现在 浙江伍一技术股份有限公司
		</p>

  </div>
</template>

<script>

import Filters from 'utils/filters'
import areas from 'components/public/areas.vue'
const { pubFilters, statusFilters } = Filters
import pubHeader from 'components/public/header.vue'
import Loading from 'components/loading.vue'
export default {
  data () {
  	let self = this;
    return {
    	dlist: [],
    	selectType: 1,
    	isSuper: false, // 默认不是管理员
    	showChart: false,
    	show: false,
    	tData: {
				copyright: {softCopyright: '', workCopyright: ''},
				patent: {fm: '', fmsq: '', syxx: '', wg: ''},
				tm: {tmNum: ''}
			},
			now:'',
			loading: false,
			boxHei: 500,
			streetName: '',
			curStreetId: 0,
    }
  },
  components: {
    pubHeader, areas, Loading
  },
  mounted() {
		// this.curStreetId = localStorage.getItem('tech_admin_streetId');
		console.log('this.curStreetId', this.curStreetId)
		this.boxHei = document.documentElement.clientHeight - 50 - 20 - 52;
		this.streetName = this.$storage.get('streetName') || '江干区';
  	this.isSuper = this.$storage.get('isSuper') == 1;
  	this.getData();
  	this.now = pubFilters.filters.dateFormat(new Date().getTime());
  },
  methods: {
		changeArea(id) {
			this.curStreetId = id;
			console.log('id', id)
			this.getData(id);
		},
  	pathTo(type) {
  		type = (type + '') || '0';
  		let path = '/reserve/list/list';
  		this.$router.push({
  			path,
  			query: {
	  			type
	  		}
	  	});
  	},
    callback (key) {
      console.log(key)
    },
    async getData(id) {
			try {
				this.loading = true;
				let streetId = id || '';
				if (localStorage.getItem('tech_admin_isSuper') !=1) {
					streetId = localStorage.getItem('tech_admin_streetId');
					this.curStreetId = Number(streetId);
				}
				let data = await this.API.homePage.ipInfo({street: streetId});
				this.loading = false;
				this.tData = data;
				console.log(this.tData)
			} catch (err){
				this.loading = false;
				this.$message.warn('网络繁忙，请稍后再试')
			}
    }
  },
}
</script>

<style lang="scss" scoped="true">
	body{background: #f8f8f8!important;}
	.gg-card-container{
		.page_wrap{background: #fff;margin: 20px 20px 0;padding: 0 0 20px;min-width: 1280px;position: relative;}
		.module_title{font-size: 16px;color: #333;line-height: 22px;font-weight: 600;padding: 0 20px 10px;margin: 0;}	
		.line_wrap{overflow: hidden;padding: 0 20px;
			.box_wrap{float: left;width: 348px;padding: 20px;background: #f8f8f8;margin-right: 20px;border-radius: 2px;margin-bottom: 20px;
				p{font-size: 13px;line-height: 18px;color: #333;padding-bottom: 10px;}
				h2{font-size:20px;line-height: 28px;font-weight: 600;margin: 0; }
				&:last-child{margin-right: 0;}
			}
		}
		.card-wrap{
			padding: 0 20px;
			.card{
				position: relative;display: inline-block; width: 350px;background-color: #F8F8F8;padding: 15px 20px;margin-right: 10px;cursor: pointer;margin-bottom: 10px;border: 1px solid #F8F8F8;
				p{color: #666;line-height: 17px;height: 17px;overflow:hidden;font-size:12px;margin-bottom: 8px;}
				span{font-family:Arial;display: block; height: 22px;line-height: 22px;font-size:20px;color: #333;}
				.anticon{position: absolute; right: 15px; bottom: 14px;}
				.tip{
					position: absolute;right: -102px;bottom: 12px;font-size:12px;color: #fff;background-color: #999;display: inline-block;padding: 0 5px;height: 24px;line-height: 24px;border-radius:2px;
					i{position: absolute;left: -3px; top: 7px;display: inline-block;border-right: 8px solid #999;border-top: 10px solid transparent;border-bottom: 8px solid transparent;width: 10px;height: 10px;transform: rotate(225deg)}
				}
				.hide{transition: opacity 0.5s;opacity:0;}
			}
			.active {border: 1px solid #1890ff;}
		}
		.copy_roght {color: #bbb; font-size: 12px; padding: 15px 0 20px 20px;line-height: 17px;text-align: center}
	}
</style>
