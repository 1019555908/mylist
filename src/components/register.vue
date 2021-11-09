<template>
  <div style="position:relative;" id="top">
    <div class="top" @click="back">
      <van-icon
        name="arrow-left"
        style=" margin: 15px;
    position: absolute;
    left: 0;
    font-size: 29px;"  />
      <img src="../assets/img/bl.png" alt />
    </div>

    <van-form :show-error="false " style="margin-top:10px;">
      <van-field
        type="text"
        v-model="username"
        :rules="rules.username"
        left-icon="manager-o"
        placeholder="请输入要注册的用户名"
        :clearable="true"
      />
      <van-field
        v-model="password"
        :type="pwdtype"
        left-icon="lock"
        :right-icon="pwdicon"
        placeholder="请输入密码"
        :rules="rules.password"
        @click-right-icon="iconb"
      />
      <van-field
        v-model="password1"
        :type="pwdtype"
        left-icon="lock"
        :right-icon="pwdicon"
        placeholder="确认密码"
        :rules="rules.password1"
        @click-right-icon="iconb"
      />

      <van-button type="primary" size="large" round @click="submit">点击注册</van-button>
      <br />
      <div style="float:left;padding-left:30px;">
        <router-link type="primary" round to="/login" style="margin-top:30px;">账号密码登录</router-link>
      </div>
    </van-form>
    <br />
    <div class="other">
      <span></span>
      <p>其他方式登录</p>
      <span></span>
    </div>
    <div>
      <a
        href="https://auth.alipay.com/login/express.htm?goto=https%3A%2F%2Fmemberexprod.alipay.com%3A443%2Fauthorize%2FuserAuthQuickLoginAction.htm%3Fe_i_i_d%3D62b51cdc056ae7ddabf3051ef03437f6"
      >
        <img src="https://image.benlailife.com/passport/login_alipay.png" alt />
      </a>

      <a
        href="https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=716027609&pt_3rd_aid=100338337&daid=383&pt_skey_valid=0&style=35&s_url=https%3A%2F%2Fconnect.qq.com&refer_cgi=authorize&which=&client_id=100338337&redirect_uri=https%3a%2f%2fpassport.benlai.com%2fauthorization%2fqqlogin&response_type=code&state=bf921bafea7aa5353da82559c25e90e2&scope=get_user_info,get_info,get_tenpay_addr"
      >
        <img src="https://image.benlailife.com/passport/login_qq.png" alt />
      </a>
    </div>

    <div class="passport-all__protocol">
      未注册的手机号验证后将自动创建本来账号
      <br />登录即代表您同意
      <a
        href="https://m.benlai.com/getUserAgreement"
        class="passport-all__protocol-link"
      >《本来生活网用户协议》</a>及
      <a href="https://m.benlai.com/getPrivacyPolicy" class="passport-all__protocol-link">《隐私政策》</a>
    </div>
  </div>
</template>
<script>
// 1、添加表单元素
// 2、添加验证规则
// 3、绑定提交事件
// 4、根据返回的结果显示不同的提示文本，注册成功之后路由跳转到登录页，失败不跳转
//-vmodel 双向数据绑定
import Vue from "vue";
import { Field as vanField } from "vant";
import { Form as vanForm } from "vant";
import axios from "axios";
Vue.use(vanField);
Vue.use(vanForm);
export default {
  data() {
    return {
      tel: "",
      text: "",
      digit: "",
      number: "",
      username: "",
      password: "",
      password1: "",
      pwdicon: "closed-eye", //这是上边righticon得变量值
      pwdtype: "password", //这是上边type得变量值
      rules: {
        username: [
          {
            required: true,
            message: (val) => (!val ? "请填写用户名" : "用户名格式不正确"),
            pattern: /^\w{6,18}$/,
            trigger: "onBlur",
          },
        ],
        password: [
          {
            required: true,
            message: (val) => (!val ? "请填写密码" : "密码格式不正确"),
            pattern: /^\w{6,18}$/,
            trigger: "onBlur",
          },
        ],
        password1: [
          {
            required: true,
            message: (val) => (!val ? "请填写密码" : "和上边密码不一样"),
            validator: (val) => {
              return val === this.password;
            },
            trigger: "onBlur",
          },
        ],
      },
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    iconb() {
      this.pwdicon = this.pwdicon == "closed-eye" ? "eye-o" : "closed-eye"; //更换密码框得眼睛样式
      this.pwdtype = this.pwdtype == "password" ? "text" : "password"; //更换密码框得type格式
    },
    submit() {
      axios.post("http://81.68.176.64:3000/register", {
          //请求后端接口往服务器传输注册的账号
          username: this.username,
          password: this.password,
          password1: this.password1,
        })
        .catch(function (error) {
          console.log(error);
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log(this.$router);
            this.$router.push({ name: "login" });
          } else if (response.status === 500) {
            console.log(response.data);
          }
        });
    },
  },
  //  beforeCreate(){
  //     if(window.localStorage.localMsg){
  //          this.$router.push("/my");
  //     }else{
  //          this.$router.push("/login");

  //     }
  // }
};
</script>
<style scoped>
::v-deep .van-button {
  margin: 30px;
  width: 80%;
  background: linear-gradient(90deg, #9dd300, #46bd01);
  pointer-events: auto !important;
}
.top {
  margin-top: 20px;
  width: 100%;
  height: 100px;
}
.top img {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}
a {
  color: black;
  font-size: 14px;
}
.other {
  display: flex;
  margin: auto;
  flex-wrap: nowrap;
  width: 85%;
  position: relative;
}
.other p {
  color: #ddd;
  margin: 10px 5px;
}
.other span {
  -webkit-box-flex: 1;
  flex: 1;
  margin: auto;
  color: #ddd;
  display: inline-block;
  background-color: #ddd;
  height: 1px;
}
a img {
  width: 36px;
  height: 36px;
  margin: 15px;
}

.passport-all__protocol {
  width: 100%;
  height: 97px;
  position: fixed;
  bottom: 0;
  text-align: center;
  color: #bbb;
  font-size: 12px;
  background: url(../assets/img/login_b.png) bottom no-repeat;
  background-size: 100%;
}
</style>