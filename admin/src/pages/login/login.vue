<template>
  <div class="login_page">
    <div class="top_box">
    	<div class="container_cen">
    		<img src="~assets/img/icon/logo.png" alt="" class="logo">
    		<span class="name">江干科创云管理平台</span>
    	</div>
    </div>
    <div class="content_box">
    	<div class="container_cen">
    		<div class="login_box">
    			<p class="title">账号密码登录</p>
					<a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
				    <a-form-item
				      label=''
				      :labelCol="{ span: 0 }"
				      :wrapperCol="{ span: 24 }"
				      fieldDecoratorId="name"
				      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账号！' }]}"
				    >
				      <a-input placeholder='请输入账号' type="text" v-model="name">
				      	<img src="~assets/img/icon/user.png" alt="" slot="prefix" class="icon">
				      	<!-- <a-icon slot="prefix" type='user' style="color:rgba(0,0,0,.25)"/> -->
				      </a-input>
				    </a-form-item>
				    <a-form-item
				      label=''
				      :labelCol="{ span: 0 }"
				      :wrapperCol="{ span: 24 }"
				      fieldDecoratorId="password"
				      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码' }]}"
				    >
				      <a-input placeholder='请输入密码' type="password" v-model="password">
				      	<img src="~assets/img/icon/pwd.png" alt="" slot="prefix" class="icon">
				      	<!-- <a-icon slot="prefix" type='lock' style="color:rgba(0,0,0,.25)"/> -->
				      </a-input>
				    </a-form-item>
				    <a-form-item
				      :wrapperCol="{ span: 24 }"
				    >
				      <a-button type='primary' htmlType='submit' size="large" :block="block">登录</a-button>
				    </a-form-item>
				  </a-form>


    		</div>
    	</div>
    </div>
    <div class="footer">
    	<!-- © 2018-现在 长三角(杭州·江干)科技大市场版权所有 &nbsp; 指导单位：杭州江干科技局 -->
		© 2018-现在 浙江伍一技术股份有限公司
    </div>

	</div>
</template>

<script>
	import md5 from 'md5';
	import Filters from 'utils/statusFilters'

	export default {
		data() {
			return {
				formLayout: 'horizontal',
				block: true,
				name: '',
				password: '',
			}
		},
		methods: {
			handleSubmit (e) {
	      e.preventDefault()
	      this.form.validateFields((err, values) => {
	        if (!err) {
	        	this.loginFn(values);
	          console.log('Received values of form: ', values)
	        }
	      })
	    },
	    async loginFn (obj) {
	    	let data = {
	    		name: obj.name,
	    		password: md5(obj.password)
	    	}
	    	try {
	    		let resp = await this.API.login.loginFn(data);
	    		this.$storage.set('isSuper', resp.isSuper);  //是否是管理员
	    		this.$storage.set('streetId', resp.street);  //街道ID
	    		this.$storage.set('streetName', resp.streetName);  //街道名称
	    		this.$message.success('登录成功！')
					let returnUrl = this.$route.query.return_url || '';
	    		if (returnUrl) {
						sessionStorage.removeItem('returnUrl');
	    			location.href = decodeURIComponent(returnUrl);
	    		}
	    		else{
	    			this.$router.push({path: '/index'});
	    		}
	    	}
    		catch (e){
          console.log(e);
          if (e.status == 10003) {
            this.$message.warn(e.msg)
            return
          }
    			this.$message.warn('网络繁忙，请稍后再试')
    		}
	    },
	    handleSelectChange (value) {
	      this.form.setFieldsValue({
	        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
	      })
	    },
		}
	}
</script>


<style lang="scss">
  .login_page {
  	position: absolute; height: 100%; width: 100%; background: #F8F8F8;
    .top_box {
    	width: 100%; height: 60px; line-height: 60px; background:linear-gradient(45deg,rgba(37,37,41,1) 0%,rgba(34,34,34,1) 100%);
    	.container_cen {
    		width: 1200px; margin: 0 auto; height: 100%;
				.logo {width: 60px; height: 44px; display: inline-block; margin-bottom: 8px;}
				.name {margin-left: 16px; font-size: 16px; font-weight: 600; color: #fff;}
    	}
    }
    .content_box {
    	width: 100%; height: 650px; background: url(~assets/img/login/bg.jpg) no-repeat; background-position:center; border-bottom: 1px solid #eee;
    	.container_cen {
    		width: 1200px; margin: 0 auto;
	    	.login_box {
	    		float: right; margin-top: 165px; width: 360px; min-height: 320px; background: #fff; padding: 40px 30px; box-shadow:0px 0px 4px 0px rgba(0,0,0,0.12);
	    		.title {font-size: 16px; color: #333; font-size: 16px; font-weight: 600; margin-bottom: 30px;}
	    		.ant-form-inline .ant-form-item {margin-right: 0; width: 300px;}
	    	}
    	}
    }
    .footer {
    	width: 100%; text-align: center; font-size: 12px; color: #999; padding-top: 15px;
    }
    .ant-input-affix-wrapper .ant-input {height: 46px; border-radius: 2px; border: 1px solid #eee;}
    .ant-btn-lg {height: 46px; }
    .ant-btn-primary {background:linear-gradient(270deg,rgba(66,114,255,1) 0%,rgba(35,124,255,1) 100%); border: none;}
    .ant-btn-primary:hover {background:linear-gradient(270deg,rgba(66,114,255,1) 0%,rgba(35,124,255,1) 100%); border: none;}
    .ant-input-affix-wrapper {
    	.ant-input-prefix {
    		width: 16px; height: 20px;
    		img {width: 100%; height: 100%;}
    	}
    }
    .ant-input-affix-wrapper .ant-input:not(:first-child) {padding-left: 37px;}
    .ant-btn-lg {border-radius: 2px;}
  }
  .ant-form {
  	.ant-form-item {margin-bottom: 20px;}
  	.ant-form-item-with-help {margin-bottom: 5px;}
  	.has-error .ant-form-explain, .has-error .ant-form-split {font-size: 12px; padding: 4px 0 4px 0; color: #F64744;}
  }

</style>
