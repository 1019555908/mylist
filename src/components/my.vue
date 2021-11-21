<template>
  <div id="my   top">
    <div class="header">
      <div class="bc">
        <div class="photo">
          <img src="../assets/img/avatar.png" alt />
        </div>
        <div class="quit" @click="quit">
          <img src="../assets/img/quit.png" alt />
          <span style="color:#fff;">退出</span>
        </div>

        <div class="user">
          <p class="first">
            本来用户
            <span style="color:red;font-size:24px;">{{this.my}}</span>
            <span @click="customer " style="    margin-left: 34px;">客服中心</span>
          </p>
          <p class="vip">
            <img
              src="https://image.benlailife.com/static/images/mycenter/member_icon02_4319e53f.png"
              alt
            />注册会员
          </p>
        </div>
      </div>
    </div>
    <div class="vip2">
      <ul class="ulvip2">
        <li>
          <p>当前拥有</p>
          <span>{{czz}}</span>
          <p>成长值</p>
        </li>
        <li>
          <p>升级至绿卡所需</p>
          <span>{{needczz}}</span>
          <p>成长值</p>
        </li>
      </ul>
    </div>
    <div class="indent">
      <div class="top">
        <h3>我的订单</h3>
        <span>查看全部订单 ></span>
      </div>
      <van-grid>
        <van-grid-item
          icon="https://image.benlailife.com/AppIcons/mycenter/20180110icon_A@2x.png"
          to="/shopcar"
          badge="0"
          text="待支付"
        />
        <van-grid-item
          icon="https://image.benlailife.com/AppIcons/mycenter/20180110icon_A@2x.png"
          badge="0"
          text="配送中"
        />
        <van-grid-item
          icon="https://image.benlailife.com/AppIcons/mycenter/20180110icon_C@2x.png"
          badge="0"
          text="待评价"
        />
        <van-grid-item
          icon="https://image.benlailife.com/AppIcons/mycenter/20180110icon_D@2x.png"
          badge="99+"
          text="退换货"
          url="/shopcar"
        />
      </van-grid>
    </div>
    <div>
      <div>
        我的钱包
        <span style="float:right;    margin-right: 40px;">></span>
      </div>
      <div class="dd">
        <ul class="mywallet">
          <li>
            <p>
              <span>0</span>元
            </p>
            <p>余额</p>
          </li>
          <li>
            <p>
              <span>6</span>张
            </p>
            <p>优惠券</p>
          </li>
          <li>
            <p>
              <span>0</span>分
            </p>
            <p>积分</p>
          </li>
          <li>
            <p>
              <span>0</span>元
            </p>
            <p>礼金卡</p>
          </li>
          <li>
            <p>
              <span>0</span>元
            </p>
            <p>领货码</p>
          </li>
        </ul>
      </div>
      <div id="scroll_div" class="fl">
        <div id="scroll_end"></div>
      </div>
    </div>
    <div class="recharge">
      <h3>本来充值有好礼</h3>
      <div class="recharge-countent">
        <ul>
          <li v-for="(item,index) of recharge " :key="index">
            <p>
              <span>{{item.price}}</span>元
            </p>
            <p class="bottom">{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="chongzhi">
      <van-button size="large" color="#7232dd">立即充值</van-button>
    </div>
    <div class="serve">
      <h3>更多服务</h3>
      <div class="serveul">
        <ul>
          <li v-for="(item,index) of this.more" :key="index" @click="morevip(item.text,item.newurl)">
            <img :src="item.img" alt />
            <p>{{item.text}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Grid, GridItem } from "vant";
import { Tab, Tabs } from "vant";
import less from "less";
import axios from "axios";
import { Toast } from "vant";
import { Button } from "vant";

Vue.use(Button);
Vue.use(Toast);
Vue.use(less);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Grid);
Vue.use(GridItem);
export default {
  name: "my",
  data() {
    return {
      name: "qqqqq",
      czz: 0,
      needczz: 1,
      active: 2,
      recharge: [],
      my: "",
      more: [],
    };
  },
  async created() {
    this.my = window.localStorage.username;

    const data = await axios.get("http://81.68.176.64:3000/recharge");
    // console.log(data.data);
    this.recharge = data.data;
    // console.log(window.localStorage.localMsg);
    var localmsg = window.localStorage.localMsg;
    console.log(localmsg);
    const data1 = await axios.post(`http://81.68.176.64:3000/verify`, {
      localmsg: localmsg,
      i:"kkkkkkkkkkkk"
    });
    console.log(data1);
    if (data1.data.statusCode == 403) {
      Toast.fail(data1.data.message);
      setTimeout(() => {
        window.localStorage.removeItem("localMsg");
        window.localStorage.removeItem("username");
        this.$router.push("/login");
      }, 2000);
    }
    if (data1.data.statusCode == 200) {
      console.log(data1.data);
    }
    const data2 = await axios.get("http://81.68.176.64:3000/mymore");
    // console.log(data2.data);
    this.more = data2.data;
  },
  mounted() {},
  methods: {
    customer() {
      this.$router.push("/customer");
    },
    quit() {
      this.$router.push("/login");
      window.localStorage.removeItem("localMsg");
      window.localStorage.removeItem("username");
      //   window.sessionStorage.clear();
    },
    morevip(text,newurl){
      console.log(`'点击了更多服务的${text}`)
      if(text=='管理台'){
        this.$router.push(`/${newurl}`)
      }
      
    },
  },
  beforeCreate() {
    if (window.localStorage.localMsg) {
      //    this.$router.push("/my");
    } else {
      //    this.$router.push("/login");
    }
  },
};
</script>

<style lang="less" scoped>
#my {
  margin:0 0 100px 0;
}
.bc {
  width: 100%;
  height: 130px;
  display: block;
  left: 0;
  top: 0;
  background: url(//image.benlailife.com/static/images/mycenter/new_head_bg_cff93aae.png)
    center 0 no-repeat;
  background-size: cover;

  position: absolute;
  z-index: -1;
  background-color: #8cc800;
  .photo {
    position: absolute;
    line-height: 150px;
    left: 24px;
    top: 10px;
    img {
      width: 3.125rem;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #fff;
    }
  }
}
.quit {
  width: 100px;
  height: 44px;
  position: absolute;
  color: #000;
  right: 0;
  vertical-align: middle;
  img {
    width: 47px;
    vertical-align: middle;
    height: 44px;
  }
}
.user {
  position: absolute;
  left: 97px;
  top: 20px;
  .vip {
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    width: 80px;
    background-color: rgba(12, 208, 32, 0.3);
    border: 1px solid #ccc;
    border-radius: 20px;
    img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
  }
}

.vip2 {
  /* float: left; */
  margin-top: 100px;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}
.ulvip2 {
  display: flex;
  flex-wrap: nowrap;
  li {
    background-color: #fff;
    width: 43%;
    height: 5rem;
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
    padding: 10px 0 10px 15px;
    box-shadow: 0 4px 8px 0 rgb(138 198 0 / 30%);
    // background-image: linear-gradient(225deg, #f7f2ea 0, #e9dcc6 100%);
    // background: url(//image.benlailife.com/static/images/mycenter/recharge_agpay02_392df00c.png)
    //   right top no-repeat;
    span {
      display: block;
      text-align: left;
      font-weight: 700;
      font-size: 18px;
    }
    p {
      left: 0;
      margin: 5px 0;
      text-align: left;
      font-size: 12px;
      color: #ccc;
    }
  }
}
.indent {
  width: 96%;
  height: 150px;
  margin: 28px auto;
  background-color: rgba(194, 194, 194, 0.1);
  .top {
    display: flex;
    flex-wrap: nowrap;
    h3 {
      display: inline-block;
      text-align: left;
      width: 50%;
    }
    span {
      display: inline-block;
      text-align: right;
      font-size: 13px;
      color: rgb(182, 181, 181);
      line-height: 40px;
      width: 50%;
      padding: 10px 20px 10px 0;
    }
  }
}
.recharge {
  h3 {
    text-align: left;
    margin-left: 50px;
  }
  .recharge-countent {
    width: 100%;
    height: 107px;
    overflow: overlay;
    ul {
      width: 5 * 180px;
      height: 92px;
      float: left;
      padding-left: 10px;
      // display: flex;
      // flex-wrap: nowrap;
      // white-space: nowrap;
      // justify-content: space-around;
      li {
        margin-left: 10px;
        width: 160px;
        height: 90px;
        display: inline;
        float: left;
        position: relative;
        background-image: linear-gradient(225deg, #f7f2ea 0, #e9dcc6 100%);
        padding-left: 10px;
        & :nth-child(1) {
          text-align: left;
          font-weight: 700;
          // border-bottom: 1px dashed #fff;
        }
        & :nth-child(2) {
          padding-top: 5px;
          border-top: 1px dashed #fff;
        }
        p {
          padding: 0 10px;
          text-align: left;
          font-size: 12px;
          span {
            margin-right: 5px;
            font-size: 20px;
          }
        }
      }
    }
  }
}
.chongzhi {
  width: 90%;
  margin: 0 auto;
}
.serve {
  margin-bottom:100px;
  h3 {
    text-align: left;
    margin-left: 20px;
  }
  .serveul {
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        width: 84px;
        height: 82px;
        box-sizing: border-box;
        img {
          width: 48px;
          height: 48px;
        }
        p {
          line-height: 2px;
          font-size: 12px;
        }
      }
    }
  }
}
::v-deep .van-hairline::after {
  border: none;
}
::v-deep .van-icon__image {
  width: 50px;
  height: 50px;
}
.dd {
  width: 100%;
  overflow: scroll;
  height: 100px;
}
.mywallet {
  width: 500px;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  justify-content: space-around;
  li {
    width: 100px;
    display: inline;
    height: 100px;
    p {
      font-size: 14px;
      margin-top: 10px;
      span {
        font-size: 18px;
        font-weight: 700;
        margin-right: 5px;
      }
    }
  }
}

/* box-sizing: border-box; */
/* float: left; */
/* padding: 20px; */ ;
</style>