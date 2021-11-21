<template>
  <div style="margin-bottom:100px;" id="top">
    <div @click="back" style=" position: fixed;z-index:500;left:0;margin:15px;font-size:23px;">
      <van-icon name="arrow-left" />
    </div>
    <div v-for="(item,index) of yemian" :key="index">
      <div class="picture">
        <ul>
          <li>
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
              <van-swipe-item>
                <img class="simg" v-show="item.simg ? item.simg :''" :src="item.simg" alt />
                <img :src="item.bimg" alt />
              </van-swipe-item>
            </van-swipe>
          </li>
        </ul>
      </div>
      <div class="aq">
        <p>
          安全保障，
          <em>全程溯源质检</em>
        </p>
        <div>点击查看报告</div>
      </div>
      <div class="price">
        <p>
          ￥
          <span>{{item.nprice}}</span>
        </p>
        <span></span>
      </div>
      <div class="name">
        <span>
          <img src="https://image3.benlailife.com/Product/Tag/843d9315-8948-4994-b640-4e2d157af588.jpg" alt />
        </span>
        <p>{{item.name}}</p>
      </div>
      <div class="cx">
        <p>
          <em>促销</em>
          <span>{{item.zk}}</span>限时99元选4件，部分商品限购，抢完即止。
        </p>
      </div>
      <div class="ad">
        <p style="text-align:left;margin-left:15px; ">
          送至:
          <span>河南省郑州市</span>
        </p>
        <p style="text-align:left;margin-left:15px;  font-size:18px;">
          配送
          <span style="text-align:left;margin-left:15px;  font-size:12px;">郑州市冷链配商品满199元包邮</span>
        </p>
        <p style="text-align:left;margin-left:15px; font-size:18px;">产地</p>
        <p style="text-align:left; font-size:18px;">不支持7天无理由退货</p>
      </div>
      <div class="jcbg">
        <div class="left"></div>
        <div class="right">
          <p>已通过本来生活网品质实验室专业质检</p>
          <a href>点击查看详细检测报告</a>
        </div>
      </div>
      <div>
        <p>
          <span></span>全程冷链
          <span></span>资深买手
          <span></span>全面质检
        </p>
        <em>></em>
      </div>
    </div>
    <div class="addnumber">
      <p>{{this.yemian.name}}</p>
      <van-stepper v-model="buynum" theme="round" button-size="22" />
    </div>
    <div class="bottom">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
        <van-goods-action-button type="warning" text="加入购物车" @click="addcart(1)" />
        <van-goods-action-button type="danger" text="立即购买" @click="buyshop(2)" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'
import { List } from 'vant'
import axios from 'axios'
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant'
import { Swipe, SwipeItem } from 'vant'
import { Toast } from 'vant'
import { Stepper } from 'vant'

Vue.use(Stepper)
Vue.use(Toast)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
Vue.use(List)
Vue.use(Icon)
export default {
  name: 'BenlaaaShopxq',
  data() {
    return {
      yemian: [],
      id: 0,
      buynum: 1,
    }
  },
  created() {
    console.log(this.$route)
    this.id = Number(this.$route.params.id) + 1
    console.log(this.id)
    axios.get(`http://81.68.176.64:3000/shopxq?id=${this.id}`).then((data) => {
      //   console.log(data.data);
      this.yemian = data.data
    })
    // const data = await axios.post(`http://81.68.176.64:3000/verify`);
    // if (data.data.statusCode == 403) {
    //   Toast.fail("登录验证信息失效，请重新登录");
    // }else  if (data.data.statusCode ==200) {
    //   Toast.fail("您已登录请操作");
    // }
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1)
    },
    addcart() {
      // console.log(this.id);
      // console.log(this.yemian[0]);
      if (window.localStorage.localMsg) {
        let goods = {
          id: this.id,
          username: window.localStorage.username,
          img: this.yemian[0].bimg,
          price: Number(this.yemian[0].nprice).toFixed(2),
          name: this.yemian[0].name,
          sname: this.yemian[0].sname2,
          num: 1,
        }
        console.log(goods)
        axios.post(`http://81.68.176.64:3000/addcar`, goods).then((data) => {
          // data.data.push(goods)
          if (data) {
            console.log(data.data)
          }
        })
      } else {
        Toast.fail('尊敬的客户，您需要先登录一下再加入购物车哟！')
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
      }
    },
    buyshop() {
      //立即购买
      if (window.localStorage.localMsg) {
        if (this.buynum) {
          // console.log('q')
          Toast.fail(`您选择了${this.buynum}件商品，这就为您下单`)
        }
      } else {
        Toast.fail(`请先登录`)
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
      }
    },
  },
}
</script>

<style lang="less" scoped>
@wid: 100%;
@hei: 100%;
.addnumber {
  position: fixed;
  bottom: 50px;
  width: @wid;
  height: 50px;
  background-color: #ccc;
  p {
    width: 80%;
    height: 20px;
  }
  ::v-deep .van-stepper {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
.picture {
  width: @wid;
  height: @hei;
  ul {
    li {
      position: relative;
      .simg {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 50px;
        left: 20px;
      }
      img {
        width: @wid;
        height: @hei;
      }
    }
  }
}
.aq {
  width: @wid;
  height: 50px;
  p {
    float: left;
  }
  div {
    float: right;
  }
}
.price {
  p {
    text-align: left;
    span {
      font-size: 24px;
      color: orange;
    }
  }
}
.name {
  span {
    img {
      width: 50px;
      height: 20px;
      float: left;
      padding-left: 20px;
    }
  }
  p {
    font-size: 18px;
    font-weight: 700;
    padding: 0 20px;
  }
}
.cx {
  p {
    font-size: 14px;
    color: #000;
    em {
      color: #ccc;
    }
    span {
      display: inline-block;
      overflow: hidden;
      font-size: 12px;
      width: 37px;
      height: 15px;
      background-color: rgb(243, 175, 50);
    }
  }
}
.jcbg {
  display: flex;

  width: 98%;
  .left {
    width: 67px;
    height: 95px;
    margin-right: 12px;
    background: url(//image.benlailife.com/static/images/quality_report_3fc2b2b2.png)
      center center/100% 100% no-repeat;
  }
  .right {
    p {
      font-size: 14px;
    }
    a {
      display: block;
      width: 190px;
      height: 32px;
      text-align: center;
      font-weight: 600;
      font-size: 13px;
      line-height: 32px;
      color: #fff;
      margin-top: 28px;
      background: linear-gradient(90deg, #9dd300 0, #46bd01 100%);
    }
  }
}
</style>