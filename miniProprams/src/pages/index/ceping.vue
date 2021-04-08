<template>
    <div class="kejipingce">
        <div v-if="nowtype==1">
            <h3 class="typetitle">科技项目评测</h3>
            <div class="labname">企业名称：</div>
            <div class="textbox"><input type="text" v-model="companyName" placeholder="请输入您的企业名称"></div>
            <div class="labname">您企业是否认定为国家高新技术企业？</div>
            <div class="radiobox">
                <radio-group @change="changetype">
                <label class="space"><radio value="1" >是</radio></label>
                <radio value="0" checked="true">否</radio>
                </radio-group>
            </div>
            <div class="nextstep mt200" @click="tonext">下一步</div>
        </div>
        <div v-if="nowtype==2">
            <h3 class="typetitle"><span>{{companyName}}</span> <span class="gaoxin">高新</span></h3>
            <div class="datepicker" v-if="!year">
                <picker mode="date" :value="date" start="1970-01-01" end="2020-12-31" @change="bindDateChange" >
                    <view class="picker">
                    企业注册时间: {{date}}
                    </view>
                </picker>
            </div>
            <div class="labname">上年度销售收入(万元)</div>
            <div class="radiobox">
                <radio-group @change="changetypea">
                <div class="itemblock"><radio value="1" checked="true">小于3000</radio></div>
                <div class="itemblock"><radio value="2" >3000~8000</radio></div>
                <div class="itemblock"><radio value="3" >8000~2亿</radio></div>
                <div class="itemblock"><radio value="4" >大于2亿</radio></div>
                </radio-group>
            </div>
            <div class="labname">科研载体</div>
            <div class="radiobox">
                <radio-group @change="changetypeb">
                <div class="itemblock"><radio value="1" checked="true">无</radio></div>
                <div class="itemblock"><radio value="2" >市级（研发中心或技术中心）</radio></div>
                <div class="itemblock"><radio value="3" >省级（研发中心、技术中心、企业研究院）</radio></div>
                </radio-group>
            </div>
            <div class="labname">上年度研发费用（万元）</div>
            <div class="radiobox">
                <radio-group @change="changetypec">
                <div class="itemblock"><radio value="1" checked="true">小于100</radio></div>
                <div class="itemblock"><radio value="2" >100~200（软件企业）</radio></div>
                <div class="itemblock"><radio value="3" >200~1000（市技术中心、市研发中心）</radio></div>
                <div class="itemblock"><radio value="4" >大于等于1000（省研发，市重大）</radio></div>
                </radio-group>
                
            </div>
            <div class="labname">发明专利已授权授权数量是否达到4项</div>
            <div class="radiobox">
                <radio-group @change="changetyped">
                <div class="itemblock"><radio value="1" checked="true">是</radio></div>
                <div class="itemblock"><radio value="2" >否</radio></div>
                </radio-group>
            </div>
            <div class="nextstep mt16" @click="ceping">立即评估项目</div>
        </div>
        <div v-if="nowtype==3">
            <h3 class="typetitle">{{companyName}}</h3>
            <div class="datepicker" v-if="!year">
                <picker mode="date" :value="date" start="1970-01-01" end="2020-12-31" @change="bindDateChange" >
                    <view class="picker">
                    企业注册时间: {{date}}
                    </view>
                </picker>
            </div>
            <div class="labname">知识产权（多选）</div>
            <div class="radiobox">
                <checkbox-group @change="changetypeef">
                    <div class="itemblock"><checkbox value="1" :disabled="isdisable==1">无</checkbox></div>
                    <div class="itemblock"><checkbox value="2" :disabled="isdisable==2">在申请</checkbox></div>
                    <div class="itemblock"><checkbox value="3" :disabled="isdisable==2">已授权</checkbox></div>
                </checkbox-group>
            </div>
            <div class="labname">上年度销售收入（万元）</div>
            <div class="radiobox">
                <radio-group @change="changetypef">
                <div class="itemblock"><radio value="1" checked="true">0</radio></div>
                <div class="itemblock"><radio value="2" >0~300</radio></div>
                <div class="itemblock"><radio value="3" >300~5000</radio></div>
                <div class="itemblock"><radio value="4" >大于5000</radio></div>
                </radio-group>
            </div>
            <div class="labname">社保缴纳人员情况</div>
            <div class="radiobox">
                <radio-group @change="changetypeg">
                <div class="itemblock"><radio value="1" checked="true">0</radio></div>
                <div class="itemblock"><radio value="2" >0~5</radio></div>
                <div class="itemblock"><radio value="3" >大于等于5</radio></div>
                </radio-group>
            </div>
            <div class="labname">上年度研发费用（万元）</div>
            <div class="radiobox">
                <radio-group @change="changetypeh">
                <div class="itemblock"><radio value="1" checked="true">0</radio></div>
                <div class="itemblock"><radio value="2" >0~50</radio></div>
                <div class="itemblock"><radio value="3" >大于等于50</radio></div>
                </radio-group>
            </div>
            <div class="labname">委外技术开发</div>
            <div class="radiobox">
                <radio-group @change="changetypei">
                <div class="itemblock"><radio value="1" checked="true">有</radio></div>
                <div class="itemblock"><radio value="2" >无</radio></div>
                </radio-group>
            </div>
            <div class="nextstep mt16" @click="ceping">立即评估项目</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            nowtype:1,
            companyName:'',
            isNewHigh: 2,
            lastYearSalesRevenue:1,
            researchCarrier:1,
            sciencePerson:1,
            lastYearResearchCost:1,
            inventNum:1,
            ip:'',
            date:'',
            dates:'',
            lastYearSalesRevenues:1,
            socialSec:1,
            lastYearResearchCosts:1,
            outTech:1,
            isdisable: 0,
            year: ''
        }
    },
    onShow(){
        this.nowtype = 1;
        this.companyName = ''
        // let nowtime = new Date();
        // this.date = this.toymd(nowtime)
    },
    methods:{
        setreset(){
            this.isdisable = 0;
            this.isNewHigh= 2;
            this.lastYearSalesRevenu=1;
            this.researchCarrier=1;
            this.sciencePerson=1;
            this.lastYearResearchCost=1;
            this.inventNum=1;
            this.ip='';
            this.date='';
            this.lastYearSalesRevenues=1;
            this.socialSec=1;
            this.lastYearResearchCosts=1;
            this.outTech=1;
            this.year='';
        },
        async gettime(){
            let data = {
                companyName: this.companyName,
                isNewHigh: this.isNewHigh
            }
            let res = await this.API.home.gettime(data);
            this.year = res.registerYear
            console.log(res)
        },
        tostamp(t){
            return new Date(t).getTime()
        },
        toymd(t){
            let nowtime = new Date(t);
            let y = nowtime.getFullYear();
            let m = nowtime.getMonth() +1;
            let d = nowtime.getDate()
            let sm = m>9?m:'0'+m;
            let sd = d>9?d:'0'+d
            return  y+'-'+sm+'-'+sd
        },
        async postceping(data){
            try {
                let res = await this.API.home.postceping(data)
                console.log(res)
                let rests = JSON.stringify(res.list)
                wx.setStorageSync('companyName', this.companyName);
                wx.setStorageSync('cepingresult', rests);
                this.setreset()
                this.$router.push({path:'/pages/index/result'})
            } catch (error) {
                
            }

        },
        bindDateChange(e){
            this.date = e.target.value;
            console.log(e.target.value)
        },
        changetype(e){
            this.isNewHigh = e.target.value
        },
        changetypea(e){
            this.lastYearSalesRevenue = e.target.value
        },
        changetypeb(e){
            this.researchCarrier = e.target.value
        },
        changetypec(e){
            this.lastYearResearchCost = e.target.value
        },
        changetyped(e){
            this.sciencePerson = e.target.value
        },


        changetypef(e){
            this.lastYearSalesRevenues = e.target.value
        },
        changetypeg(e){
            this.socialSec = e.target.value
        },
        changetypeh(e){
            this.lastYearResearchCosts = e.target.value
        },
        changetypei(e){
            this.outTech = e.target.value
        },
        changetypeef(e){
            let res = e.target.value;
            if(res.indexOf('2')!=-1 ||res.indexOf('3')!=-1 ){
                this.isdisable = 1
            }else if(res.indexOf('1')!=-1){
                this.isdisable = 2;
            }else{
                this.isdisable = 0
            }
            if(res.indexOf('1')!=-1){
                this.ip = 1
            }
            if(res.indexOf('2')!=-1&&res.length==1){
                this.ip = 2
            }
            if(res.indexOf('3')!=-1&&res.length==1){
                this.ip = 3
            }
            if(res.indexOf('2')!=-1&&res.indexOf('3')!=-1){
                this.ip = 4
            }
            if(!res.length){
                this.ip = ''
            }
            console.log(this.ip)
        },
        back(){
            this.nowtype =1
        },
        ceping(){
            let data = {}
            if(this.isNewHigh ==2){
                if(!this.ip){
                    wx.showToast({
                        title: '请选择知识产权情况',        // 显示文本
                        icon:'none',          // 图标类型
                        duration:  2000,        // 关闭时间
                    })
                    return 
                }
                data = {
                    companyName: this.companyName,
                    isNewHigh: this.isNewHigh-0,
                    ip:this.ip-0,
                    lastYearSalesRevenue:this.lastYearSalesRevenues-0,
                    socialSec: this.socialSec-0,
                    lastYearResearchCost:this.lastYearResearchCosts-0,
                    outTech:this.outTech-0,
                }
                if(this.year){
                    data.registerYear = this.year
                }
                if(this.date){
                    data.registerTime = this.tostamp(this.date)
                }
            }
            if(this.isNewHigh ==1){
                
                data = {
                    companyName: this.companyName,
                    isNewHigh: this.isNewHigh-0,
                    lastYearSalesRevenue:this.lastYearSalesRevenue-0,
                    researchCarrier:this.researchCarrier-0,
                    sciencePerson: this.sciencePerson-0,
                    lastYearResearchCost:this.lastYearResearchCost-0,
                    inventNum:this.inventNum-0,
                }
            }
            if(!this.year&&!this.date){
                wx.showToast({
                    title: '请选择企业注册时间',        // 显示文本
                    icon:'none',          // 图标类型
                    duration:  2000,        // 关闭时间
                })
                return 
            }
            if(this.year){
                data.registerYear = this.year
            }
            if(this.date){
                data.registerTime = this.tostamp(this.date)
            }
            console.log(data)
            this.postceping(data)
            
        },
        tonext(){
            if(this.companyName){
                this.gettime()
                if(this.isNewHigh==2){
                    this.nowtype = 3
                }
                if(this.isNewHigh==1){
                    this.nowtype = 2
                }
            }else{
                wx.showToast({
                    title: '请填写企业名称',        // 显示文本
                    icon:'none',          // 图标类型
                    duration:  2000,        // 关闭时间
                })
            }
        }
    },
}
</script>

<style lang="scss">
.kejipingce{
    min-height: 100%;
    background-color: #fff;
    padding: 43px 40px 100px;
    font-family:'PingFangSC-Medium','PingFang SC';
    .datepicker{
        height: 60px;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
    }
    .typetitle{
        height:50px;
        font-size:36px;
        font-weight:500;
        color:rgba(36,125,255,1);
        line-height:50px;
        margin-bottom: 60px;
        span{
            float: left;
            margin-right: 10px;
        }
        .gaoxin{
            padding: 0 10px;
            height: 34px;
            margin-top: 8px;
            line-height: 34px;
            background-color: #247DFF;
            color: #fff;
            font-weight: normal;
            font-size: 24px;
            vertical-align: bottom
        }
    }
    .labname{
        height:40px;
        font-size:28px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:40px;
        margin-bottom: 16px;
    }
    .textbox{
        height: 82px;
        padding: 20px;
        border: 1px solid #E5E5E5;
        margin-bottom: 32px;
    }
    .radiobox{
        padding: 16px 0;
        margin-bottom: 28px;
        label{
            margin-right: 200px;
        }
        .itemblock{
            margin-bottom: 28px;
        }
    }
    .nextstep{
        width: 670px;
        height:90px;
        margin: 0 auto;
        background:rgba(47,128,246,1);
        border-radius:6px;
        color:#fff;
        font-size:32px;
        font-weight:400;
        line-height:90px;
        text-align: center;
    }
    .mt200{
        margin-top: 200px;
    }
    .mt16{
        margin-top: 16px;
    }
    
}
</style>
