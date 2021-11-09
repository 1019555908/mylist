<template>
  <div style="width:100%;" id="top">
    <div class="top" @click="back">
      <van-icon
        name="arrow-left"
        style=" margin: 15px;
    position: absolute;
    left: 0;
    font-size: 29px;
"
      />
      <img src="../assets/img/bl.png" alt />
    </div>
    <van-form :show-error="false">
      <van-field
        type="text"
        v-model="username"
        :rules="rules.username"
        left-icon="manager-o"
        placeholder="请输入用户名"
        :clearable="true"
        name="username"
      />
      <div class="pasbox">
        <van-field
          v-model="password"
          :type="pwdtype"
          left-icon="lock"
          :right-icon="pwdicon"
          placeholder="请输入密码"
          :rules="rules.password"
          password="password"
          @click-right-icon="iconb"
        />
        <router-link to="/register" class="forget">忘记密码</router-link>
      </div>
      <van-button style type="primary" size="large" round @click="submit">点击登录</van-button>
      <br />
      <router-link style="margin-top:100px;" type="primary" to="/register">注册账号</router-link>
    </van-form>

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
import Vue from "vue";
import { Field, Form } from "vant";
// console.log(Form);
import axios from "axios";
import { Toast } from "vant";
Vue.use( Form);
Vue.use(Field);
Vue.use(Toast)

export default {
  data() {
    return {
      from: "/",
      tel: "",
      text: "",
      digit: "",
      number: "",
      username: "",
      password: "",
      pwdicon: "closed-eye", //这是上边righticon得变量值
      pwdtype: "password", //这是上边type得变量值
      rules: {
        username: [
          {
            required: true,
            message: (val) => (!val ? "请填写用户名" : "用户名格式不正确"),
            pattern: /^\w{6,18}$/,
            trigger: "onBlur",
            error: false,
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
      },
    };
  },
  methods: {
    back() {
      console.log(this.$router.push("/box/box"));
    },
    iconb() {
      this.pwdicon = this.pwdicon == "closed-eye" ? "eye-o" : "closed-eye"; //更换密码框得眼睛样式
      this.pwdtype = this.pwdtype == "password" ? "text" : "password"; //更换密码框得type格式
    },
    submit() {
      if (this.username && this.password) {
        axios.post("http://81.68.176.64:3000/login", {
            //请求后端接口往服务器传输登录的账号
            username: this.username,
            password: this.password,
          }).then((data) => {
            console.log(data.data);
            if (data.data.token) {
              window.localStorage.setItem("localMsg", data.data.token);
              window.localStorage.setItem("username", data.data.username);
              Toast.success("登陆成功，跳转ing。。。。");

              console.log(this.from);
              this.$router.push(this.from);
            } else if (data.data.statusCode == 400) {
              Toast.fail({ className: "toast", message: data.data.message });
            } else {
              Toast.fail(data.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  beforeRouteEnter(...obj) {
    obj[2]((vm) => {
      console.log(obj);
      console.log( obj[1].name && obj[1].name !== "register" && obj[1].name !== "mybl" ? obj[1].name  : "/my"
      );
      vm.from = obj[1].name && obj[1].name !== "register" && obj[1].name !== "mybl" ? obj[1].name: "/my";
    });
  },
  beforeCreate() {
    // console.log(this.$router.push("/box/box"));

    if (window.localStorage.localMsg) {
      this.$router.push("/my");
    } else {
      //  this.$router.push("/login");
    }
  },
  created() {
    console.log(this.$router);
    // var from = this.$route.query.from
    // this.from = from ? from : "/";
  },
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
  width: 5rem;
  height: 5rem;
  margin: 0 auto;
}
a {
  color: rgb(126, 126, 126);
}
.pasbox {
  padding-right: 5rem;
  position: relative;
}
.forget {
  border-left: 1px solid #ccc;
  position: absolute;
  padding-left: .625rem;
  right: .625rem;
  top: .8125rem;
  color: #000;
  font-size: .875rem;
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
  margin: .625rem .3125rem;
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
  width: 2.25rem;
  height: 2.25rem;
  margin: .9375rem;
}

.passport-all__protocol {
  width: 100%;
  height: 6.0625rem;
  position: fixed;
  bottom: 0;
  text-align: center;
  color: #bbb;
  font-size: .75rem;
  background: url(../assets/img/login_b.png) bottom no-repeat;
  background-size: 100%;
}
</style>
