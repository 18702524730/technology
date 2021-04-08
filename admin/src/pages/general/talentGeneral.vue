<template>
  <div class="general_page clearfix">
		<Loading :loading="loading" />
  	<areas :curStreetId="curStreetId" @changeArea="changeArea"></areas>
		<div class="graph_box">
			<div class="total_num" :style="{minHeight: minHeight + 'px'}">

				<h3 v-if="isSuper">人才类</h3>
				<div class="num_list b_yellow clearfix" v-if="isSuper">
					<div class="item" @click="goListFn('areaHundred', 127)" v-if="talentsData.rc">
						<p class="title">江干百人计划</p>
						<ul>
							<li>
								<span class="num">{{ talentsData.rc.identify }}</span>
								<span class="status">已认定</span>
							</li>
						</ul>
						<div class="type_lab"><span><span>人才</span></span></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import areas from 'components/public/areas.vue'
	import Loading from 'components/loading.vue'
	export default {
		data() {
			return {
				minHeight: 500,
				totalObj: {},
				//资质类
				aptitudeData: {
					gg: {},
					sj: {},
					sk: {}
				},
				//竞争类 
				competeData: {
					zjzd: {},
					hzzd: {},
					pygc: {}
				}, 
				//载体类
				supporterData: {
					skyf: {},
					sjyf: {},
				}, 
				//人才类
				talentsData: {
					rc: {}
				}, 
				isSuper: 1,  //默认管理员
				loading: false,
				curStreetId: 0,
			}
		},
		components: {
			areas, Loading
		},
		mounted () {
			this.minHeight = document.documentElement.clientHeight - (53 + 48 + 50 + 20);
			this.isSuper = this.$storage.get('isSuper');
			if (!this.isSuper) {
				this.curStreetId = this.$storage.get('streetId')
			}else{
				let query = this.$route.query;
				let streetId = query.street ? query.street - 0 : 0;
				this.curStreetId = streetId || 0;
			}
			if (this.curStreetId === 0) {
				this.overviewFn();
			}
		},
		methods: {
			changeArea(id) {
				this.curStreetId = id;
				this.$router.replace({
					...this.$route.path,
					query: {street: this.curStreetId}
				});
			},
			// 查看列表
			goListFn (pathName, type) {
				let url = `/home/${pathName || 'list'}/list?type=${type}&street=${this.curStreetId}`;
				this.$router.push(url);
			},
			// 查询概览
			async overviewFn () {
				this.loading = true;
				try {
					let resp = await this.API.general.companySubjectInfo(this.curStreetId);
					this.totalObj = resp;
					this.loading = false;
					this.aptitudeData = this.totalObj['1'];//资质类
					this.supporterData = this.totalObj['2']; //载体类
					this.competeData = this.totalObj['3']; //竞争类
					this.talentsData = this.totalObj['4']; //人才类
				}
				catch (e){
					this.loading = false;
					this.$message.warn(e.msg || '网络繁忙，请稍后再试')
				}
			},
		},
		watch: {
			curStreetId() {
				this.overviewFn();
			}
		}
	}
</script>


<style lang="scss">
body{min-width: 1280px;}
  .general_page {
  	.loading_box {
  		position: absolute; z-index: 10; width: 100%; height: 100%; background: rgba(255,255,255,.3); text-align: center; padding-top: 300px;
  	}
  	.graph_box {
  		padding: 20px 20px 0 20px;
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
