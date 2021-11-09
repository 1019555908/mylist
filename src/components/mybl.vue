<template>
  <div style="width:90%;margin:0 auto; " id="top">
    <router-view></router-view>
    <div @click="back" style="position: absolute;left:0;margin:25px;font-size:29px;">
      <van-icon name="arrow-left" />
    </div>
    <div style="height:200px;width:100%;">
      <img
        style="width:80px;height:80px;margin-top: 30px;"
        src="data:image/png;base64,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"
        alt
      />
    </div>

    <div class="mobel">
      <div class="inpmobel">
        <div class="shouji"></div>

        <van-field v-model="tel" type="tel" label="请输入手机号" />
        <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <template #button>
            <van-button size="small" type="primary">发送验证码</van-button>
          </template>
        </van-field>
      </div>
      <button class="butyz">获取验证码</button>
    </div>
    <router-link to>账号密码登录</router-link>
    <router-link to="/login" style="width:100px;height:20px;float:left;" @click="submit">登录</router-link>
    <router-link to="/register" style="width:100px;height:20px;float:right;">注册</router-link>

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
import { Icon } from "vant";
import { Field } from "vant";
import { Button } from "vant";
Vue.use(Field);
Vue.use(Icon);
Vue.use(Button);
export default {
  data() {
    return {
      value: "",
      tel: "",
      sms: "",
      mobel: [
        {
          required: true,
          message: (val) => (!val ? "请输入正确的手机号" : ""),
          pattern: /^1[3|4|5|7|8][0-9]{9}$/,
          trigger: "onBlur",
        },
      ],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    submit() {},
  },
    beforeCreate(){
      if(window.localStorage.localMsg){
           this.$router.push("/my");
      }else{
           this.$router.push("/login");

      }
  }
};
</script>

<style scoped>
.shouji {
  width: 35px;
  position: absolute;
  height: 43px;
  top: 1px;
  left: 0;
  z-index: 1000;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAALVBMVEUAAACZmZmZmZmcnJyZmZmYmJiZmZmampqZmZmampqZmZmZmZmZmZmLi4uZmZnYbEZcAAAADnRSTlMA8SYcra62tX1qSzf+Czj26QwAAABmSURBVDjLYxjpgMnxHQSIKqBKKL6DASFUCb9kKMP8CaqEnAGUwfwQVeIdAwMf0JwHQBbREhAwKkGEBBzglCDJjl04JLjPTcAuwfWuAczCTAwzLmAmBr9iKMPsCZEJjikQkURHOgAApy1nkTc+bGUAAAAASUVORK5CYII=)
    50% no-repeat;
  background-size: 100% 100%;
}
.butyz {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#9dd300),
    to(#46bd01)
  );
  background: linear-gradient(90deg, #9dd300, #46bd01);
  pointer-events: auto !important;
  display: block;
  height: 2.75rem;
  margin: 50px auto;
  border: none;
  border-radius: 0.9125rem;
  font-size: 1rem;
  text-align: center;
  color: #fff;
  pointer-events: none;
  width: 19.6875rem;
}
.inpmobel {
  position: relative;
  padding-left: 20px;
  border-bottom: 1px solid #ccc;
}
.mobel input {
  margin-bottom: 5px;

  border: none;
}
.passport-all__protocol {
  position: absolute;
  bottom: 0;
  text-align: center;
  color: #bbb;
  font-size: 12px;
  margin-bottom: 20px;
  padding: 0 30px;
}
.passport-all__protocol a {
  color: #000;
  font: inherit;
  vertical-align: baseline;
  -webkit-text-size-adjust: none;
}
</style>
