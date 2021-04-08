<template>
    <div class="resultbox">
        <div class="tphone" @tap="dalphone">
            <span class="iconphone"></span>
            <span class="tit">顾问专线：</span>
            <span class="phonenum">15868120211</span>
            <span class="tit">饶老师</span>
        </div>
        <div class="" v-if="pinggu==1">
            <div>
                <h3 class="cname">{{companyName}}</h3>
                <h3 class="gongxi" v-if="result.length">恭喜，您获可申报以下项目：</h3>
                <h3 class="gongxi" v-if="!result.length">暂未查到可申报项目</h3>
                <ul class="resultlist" v-if="result.length">
                    <li v-for="(item,index) in result" :key="index"><span class="title">{{item}}</span><span class="jine">202万</span></li>
                </ul>
            </div>
            <div class="getphonenum">
                <button  open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" >领取免费上门申报辅导</button>
            </div>
            <div class="shuoming">系统将向您申请获取手机号，请同意以便为您提供服务</div>
            <div class="chongxin" @click="back">
                我想重新评估
            </div>
        </div>
        <div v-if="pinggu==2">
            <div class="successbox"></div>
            <div class="tips">
                <p>您的申报辅导请求我们已经收到</p>
                <p>1个工作日内申报专家将与您取得联系</p>
            </div>
            <div class="backresult" @click="pinggu=1">
                返回评估结果
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            pinggu:1,
            result:[],
            companyName:''
        }
    },
    onShow(){
        this.companyName = wx.getStorageSync('companyName');
        let list = wx.getStorageSync('cepingresult');
        console.log(list)
        this.API.interfaces.checkLogin()
        this.result = JSON.parse(list);
    },
    methods:{
        async getPhoneNumber(e) {
            let phone = await this.API.interfaces.getPhoneNumber(e,this.companyName);
            if(phone){
                this.tosuc()
            }
        },
        back(){
            this.$router.push({path:'/pages/index/ceping'})
        },
        tosuc(){
            this.pinggu = 2
        },
        dalphone(){
            wx.makePhoneCall({
                phoneNumber: '15868120211'
            })
        }
    }
}
</script>
<style lang="scss">
.resultbox{
    min-height: 100%;
    padding-top: 60px;
    background-color: #fff;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 100px;
    .tphone{
        position: fixed;
        top: 0;
        left: 0;
        width:100%;
        height:60px;
        padding: 10px 40px;
        background:rgba(255,249,215,1);
        font-size: 24px;
        >span{
            float: left;
            color: #333;
        }
        .iconphone{
            width: 20px;
            height: 20px;
            background: url('~assets/img/icon/phonet.png') center center no-repeat;
            background-size: 100% 100%;
            margin-top: 10px;
            margin-right: 10px;
            // background-color: #379dea;
        }
        
        .phonenum{
            color:#247DFF;
            margin-right: 20px;
        }
    }
    .tips{
        text-align: center;
        font-size:28px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:40px;
        margin-bottom: 106px;
        p{
            text-align: center;
        }
    }
    .cname{
        height:50px;
        margin-top: 43px;
        margin-bottom: 36px;
        font-size:36px;
        font-weight:500;
        color:rgba(36,125,255,1);
        line-height:50px;
    }
    .gongxi{
        height:48px;
        margin-bottom: 46px;
        font-size:34px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:48px;
    }
    .resultlist{
        margin-bottom: 100px;
        >li{
            height:74px;
            padding: 20px 15px;
            background:linear-gradient(270deg,rgba(131,203,255,1) 0%,rgba(98,162,255,1) 100%);
            margin-bottom: 24px;
            .title{
                float: left;
                padding-left: 25px;
                max-width: 540px;
                line-height: 34px;
                font-size: 30px;
                color: #fff;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .jine{
                float: right;
                width:110px;
                height:34px;
                line-height: 34px;
                background:rgba(255,255,255,1);
                border-radius:17px;
                font-size:24px;
                font-weight:400;
                color:rgba(255,60,60,1);
                text-align: center;
            }
        }
    }
    .getphonenum{
        height:90px;
        background:rgba(47,128,246,1);
        border-radius:6px;
        width:100%;
        margin-bottom: 16px;
        button{
            border:none;
            outline: none;
            background: none;
            float: left;
            width: 100%;
            height: 100%;
            margin: 0;
            padding:0;
            color:#fff;
            font-size:32px;
            font-weight:400;
            line-height:90px; 
            text-align: center;
        }
    }
    .shuoming{
        width:100%;
        height:33px;
        margin-bottom: 52px;
        font-size:24px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(176,176,176,1);
        line-height:33px;
        text-align: center;
    }
    .chongxin{
        width:100%;
        height:33px;
        font-size:24px;
        font-weight:400;
        color:rgba(36,125,255,1);
        line-height:33px;
        text-align: center;
    }
    .successbox{
        width: 102px;
        height: 102px;
        background: url('~assets/img/icon/suc.png') center center no-repeat;
        background-size: 100%;
        margin: 112px auto 43px;
    }
    .backresult{
        height:90px;
        background:rgba(47,128,246,1);
        border-radius:6px;
        width:100%;
        color:#fff;
        font-size:32px;
        font-weight:400;
        line-height:90px;
        text-align: center;
    }
}
</style>
