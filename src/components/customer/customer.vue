<template>
  <div id="top" ref="scrooltop" style="margin-bottom:80px;    height:667px;
    overflow-y: auto;
">
    <div class="title">
      <div @click="back" class="back">
        <van-icon name="arrow-left" />
      </div>
      <div class="tit">
        <img
          src="https://img.sobot.com/console/60850bc7c25641f5882c318873bb5966/userImage/20161204150206156.JPG"
          alt
        />
        <p>本来生活本姑娘</p>
      </div>
    </div>
    <div class="talk">
      <div>
        <p style="white-space: normal;">
          尊敬的小主：
          <br />
        </p>
        <p>添加官方社群微信号：benlaibaobao02</p>
        <p style="white-space: normal;">①优惠早知道，抢占囤货先机；</p>
        <p style="white-space: normal;">②专属社群活动，可免费得好礼；</p>
        <p style="white-space: normal;">③特色社群，分享交流美食心得；</p>
        <p style="white-space: normal;">④拥有您的专属服务</p>
        <p style="white-space: normal;">快来玩转本来生活社群，本宝宝期待您的加入~</p>
        <p style="white-space: normal;">
          礼品册、提货券、蟹券兑换，您可以关注微信公众号“
          <span style="color: rgb(255, 0, 0);">
            <strong>本来生活服务号</strong>
          </span>”，进入公众号后点击右下角的“
          <span style="color: rgb(255, 0, 0);">
            <strong>个人中心-礼品册兑换</strong>
          </span>”，按照步骤登录操作操作兑换即可；
        </p>
        <p style="white-space: normal;">
          <br />
        </p>
        <p>
          <br />
        </p>
      </div>
    </div>
    <div class="wrap">
      <div class="text-content">
        <p style="white-space: normal;">您好，我是蠢萌可爱的小机器人，非常荣幸为您服务</p>
        <p style="white-space: normal;">
          <br />
        </p>
        <p style="white-space: normal;">若您需要咨询已下订单的相关问题，请您回复“已下单”；</p>
        <p style="white-space: normal;">
          <br />
        </p>
        <p style="white-space: normal;">若您需要咨询发票问题，请您回复“发票”</p>
        <p style="white-space: normal;">
          <br />
        </p>
        <p style="white-space: normal;">若您需要咨询其他问题，请您回复“其他”；</p>
        <p style="white-space: normal;">
          <br />
        </p>
        <p style="white-space: normal;">感谢亲手指的跳动~~</p>
        <p>
          <br />
        </p>
      </div>
    </div>
    <div class="dialogue">
      <div class="content" v-for="(item,index) of message" :key="index">
        <div class="right" style>
          <p style>{{item.text}}</p>
        </div>
        <div class="left" style=" ">
          <p style>{{item.kefu}}</p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <van-field left-icon="service-o" v-model="text" placeholder="请输入文本" label="文本" />

      <slot v-bind:sendname="sendname">
        <van-button
          style="float:right;    margin-top: -28px;"
          @click="send"
          type="primary"
          size="small"
        >{{sendname}}</van-button>
      </slot>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Field } from "vant";
import { Button } from "vant";
const axios = require("axios");
import { Toast } from "vant";
Vue.use(Toast);

Vue.use(Button);
Vue.use(Field);
export default {
  name: "customer",
  data() {
    return {
      value: "",
      text: "",
      sendname: "发送",
      message: [],
      kefu: [],
      mine: [],
    };
  },
  mounted() {},
  updated() {
    document.getElementsByTagName(
      "body"
    )[0].scrollTop = document.getElementsByTagName("body")[0].scrollHeight;
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async send() {
      //   console.log(window.pageYOffset);
      console.log("发送l", this.text);
      this.message.push({ text: this.text });
      const data = await axios.get(
        `http://81.68.176.64:3000/kefu?text=${this.text}`
      );
        //  console.log(data);
      if (!data.data[0].talk) {
      } else if (data.data[0].talk) {
        this.message.push({ kefu: data.data[0].talk });
        // window.pageYOffset = window.pageYOffset + 40;
        // console.log(window.pageYOffset);
        this.$refs.scrooltop.scrollTop = this.$refs.scrooltop.scrollHeight - 40;
      } else {
      }
      // console.log(this.mine);
    },
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  font-size: 14px;
}

.title {
  width: 100%;
  height: 3.125rem;
  border-bottom: 1px solid #f1ebeb;
  margin-bottom: 12px;
  padding-bottom: 11px;
  .back {
    position: fixed;
    z-index: 500;
    left: 0;
    margin: 15px;
    font-size: 23px;
  }
  .tit {
    width: 55%;
    margin: 5px auto;
    img {
      width: 50px;
      height: 50px;
      float: left;
      border-radius: 50%;
    }
    p {
      float: right;
      font-size: 20px;
      line-height: 50px;
      font-weight: 700;
    }
  }
}
.talk {
  width: 97%;
  margin: 0 auto;
  > div {
    background: #fdf4d1;
    color: #99734c;
    padding: 10px 15px;
    margin-bottom: 20px;
    border-radius: 6px;
    line-height: 22px;
    padding-left: 34px;
    // margin-left: 13px;
    transition: all 1s ease-in;
    height: 100%;
    word-break: break-all;
    p {
      text-align: left;
    }
  }
}
.wrap {
  max-width: 80%;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  touch-action: pan-y;
  box-sizing: border-box;
  .text-content {
    max-width: 100%;
    background-color: #f2f5f7;
    border-radius: 20px 20px 20px 6px;
    color: #515a7c;
    font-size: 14px;
    padding: 10px 15px;
    line-height: 22px;
    word-break: break-all;
    p {
      white-space: normal;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
  }
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 88%;
  height: 1.875rem;
  padding: 0 .625rem;
}
.dialogue {
  transition: all 2s;
  margin-bottom: 6.375rem;
  .content {
    .right {
      text-align: right;
      width: 80%;
      margin-right: .625rem;
      margin: .3125rem 0;
      p {
        width: 100px;
        text-align: right;
        display: inline-block;
        background-color: #fdf4d1;
      }
    }
    .left {
      text-align: left;
      width: 80%;
      margin-left: .625rem;
      margin: .3125rem .625rem;
      p {
        width: 100px;
        display: block;
        background-color: #f2f5f7;
      }
    }
  }
}
</style>