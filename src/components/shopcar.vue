<template>
    <div  id="top">
    <div class="header">
      <div @click="back" style="position: absolute;z-index:500;left:0;margin:15px;font-size:23px;">
        <van-icon name="arrow-left" />
      </div>
      <p>
        购物车
        <span></span>
      </p>
      <p class="b3">配送至： {{this.place}}</p>
      <div class="right">
        <p @click="bj">编辑</p>
        <span class="bj" @click="opcaity">
          <div :class="this.poc ==true? 'active' :''">
            <ul class="fl">
              <span class="sj"></span>
              <li>
                <span class="tu1"></span>
                <router-link to="/box">首页</router-link>
              </li>
              <li>
                <span class="tu2"></span>
                <router-link to="/sort">分类</router-link>
              </li>
              <li>
                <span class="tu3"></span>
                <router-link to>搜索</router-link>
              </li>
              <li>
                <span class="tu4"></span>
                <router-link to="/mybl">我的本来</router-link>
              </li>
            </ul>
          </div>
        </span>
      </div>
    </div>
    <div class="che1" :class="this.chek==false ? '' : 'che'" v-if="list1.length>0">
      <div v-for="(item,index) of list1 " :key="index" style="position:relative;">
        <div class="inp">
          <input type="checkbox" :checked="result[index]" @click="checked1(item.num,index)" />
        </div>
        <van-card :price=" item.price" :desc="item.sname" :title="item.name" :thumb="item.img_url" >
          <template #footer>
            <van-stepper v-model="item.num" @change="onChange(item.num,index)" />
          </template>
        </van-card>
        <div style="position: absolute; z-index: 1000; top: 55px; right: 50px;" @click="deletecar(item,index)">
          <img :src="delete_img" alt="" style="width:20px;height:20px;">
          </div>
      </div>
      <!-- <ul>
        <li v-for="(item,index) of list1 " :key="index">
          <div class="img">
            <span></span>
            <img :src="item.img_url" alt />
          </div>
          <div class="introduce">
            <p>{{item.name}}</p>
            <p>￥{{item.price}}</p>
            <van-stepper v-model="value" theme="round" button-size="22" />
          </div>
        </li>
      </ul>-->
    </div>
    <div :class="this.chek==false?' look':this.chek=true ">
      <p>购物车里还没有好吃的，您可以</p>
      <router-link class="gohome" to="/box">回首页逛逛</router-link>
    </div>
    <div style="width:100%;">
      <img src="../assets/img/wntj.png" alt style="width:100%;" />
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div>
          <van-cell />
          <ul class="ulcontent">
            <li v-for="(item,index) of list" :key="index" class="item" @click="xqy(index)">
              <div class="top">
                <p>
                  <img v-lazy="item.simg" alt />
                </p>
                <img  v-lazy="item.bimg" alt />
              </div>
              <div class="libottom">
                <div>
                  <p class="name">
                    <img class="99"  :src="item.snam1?item.sname1:''" alt />
                    {{item.name}}
                  </p>
                  <p class="sname2">{{item.snam2}}</p>
                  <p>
                    <span class="zk">{{item.zk}}</span>
                  </p>
                </div>
                <div class="price">
                  ￥
                  <i>{{item.nprice}}</i>
                  <s>{{item.oprice}}</s>
                  <span class="imgcar"></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </van-list>
    </div>

    <div class="bottom">
      <div :class="this.amend? '' :  'amendfalse' ">
        <div class="b1">
          <span @click="all" :id=" all1 ? '':'all' "></span>
          <i>全选</i>
        </div>
        <div class="b2">
          <i>合计：$</i>
          <span>{{count}}</span>
          <em>去结算</em>
        </div>
      </div>
      <div :class="this.amend? 'amendfalse' : '' ">
        <div class="b1">
          <span></span>
          <i>全选</i>
        </div>
        <div class="b2">
          <em class="btn" @click="remove" style="background-color:#ccc;">删除</em>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
import { List } from "vant";
import less from "less";
import axios from "axios";
import { Card } from "vant";
import { SubmitBar } from "vant";
import { Stepper } from "vant";
import { Checkbox, CheckboxGroup } from "vant";
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Stepper);
Vue.use(SubmitBar);
Vue.use(Card);
Vue.use(List);
Vue.use(less);
Vue.use(Icon);
export default {
  data() {
    return {
      name: "shopcar",
      list: [],
      loading: false,
      finished: false,
      page: 0,
      place: "河南省郑州市",
      poc: true,
      chek: true, //购物车里有东西的时候要边false
      amend: true,
      list1: [],
      checked: true,
      value: 1,
      result: [],
      count: 0,
      all1: true,
      delete_img:require('../assets/img/delete.png') 

    };
  },
  async created() {
    const data = await axios.get(
      `http://81.68.176.64:3000/carlist?username=${window.localStorage.username}`
    );
    console.log(data.data);
    this.list1 = data.data;
    if (this.list1 != []) {
      this.chek = false;
    }
    this.list1.map((item) => {
      item
      this.result.push(false);
    });
    console.log(this.result);
  },
  methods: {
    deletecar(item,index){
      console.log(item.id1,index,window.localStorage.username);
      axios.get(`http://81.68.176.64:3000/deletecar?username=${window.localStorage.username}&id1=${item.id1}`,)
      .then((data)=>{
      //  console.log( data.data);
      Toast.success('删除成功')
      axios.get( `http://81.68.176.64:3000/carlist?username=${window.localStorage.username}`).then(data=>{
        this.list1 = data.data;
      })
    // this.list1 = data.data;
      //  this.$router.go(0);
      })
    },
    all() {
      this.all1 === true ? (this.all1 = false) : (this.all1 = true);
      for (var i = 0; i < this.result.length; i++) {
        this.all1 ? (this.result[i] = false) : (this.result[i] = true);
        // if(this.result[i]){this.all1=false}
      }
      console.log(this.result);
      this.total();
    },
    checked1(val, index) {
      // console.log(arguments);
      // console.log(val, index);
      this.result[index] = !this.result[index];
      console.log(this.result);
      if(this.result.every(item=>{
      return item===true
      })){
        this.all1 = false
      }
      // this.count+=
      this.total();
    },
    onChange(val, index) {
      console.log(val, index);
      // var total = 0;
      console.log(this.list1[index].price);
      console.log(this.result);
      this.total();
    },
    total() {
      var total = 0;
      this.result.map((item, index) => {
        // console.log(item, index);
        if (item) {
          console.log(this.list1[index]);
          total += this.list1[index].num * this.list1[index].price;
        }
      });
      this.count = total.toFixed(2);
      // console.log(this.count);
    },

    remove() { //删除全部商品
      axios.get(`http://81.68.176.64:3000/removecar?username=${window.localStorage.username}`)
        .then((data) => {
         data
    axios.get( `http://81.68.176.64:3000/carlist?username=${window.localStorage.username}`)

        });
    },

    bj() {
      this.amend = !this.amend;
      // this.amend == true ? this.amend = false : this.amend = true;
      console.log(this.amend);
    },
    che() {},
    back() {
      this.$router.go(-1);
    },
    opcaity() {
      // console.log(this.poc);
      this.poc == true ? (this.poc = false) : (this.poc = true);
    },
    async onLoad() {
      this.page++;
      const data = await axios.get(`http://81.68.176.64:3000/shopcar?page=${this.page}`);
      this.list = this.list.concat(data.data);
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.list.length >= 40) {
        this.finished = true;
      }
    },
    xqy(e) {
      this.$router.push(`/shopxq/${e}`);
      console.log(e);
      // axios.get(`http://81.68.176.64:3000/shopxq?id=${e}`).then((data) => {
      //   data.data
      // });
    },
  },
  beforeCreate() {
    this.list1 = [];
  },

  updated() {
    console.log();
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
body{
  background-color: #ccc;
}
#all {
  width: 40px;
  height: 50px;
  position: absolute;
  z-index: 20;
  top: -27%;
  padding-right: 10px;
  left: 0;
  display: block;
  background: url(data:image/png;base64,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)
    10px -94px no-repeat;
  background-size: 3.845rem;
}
.checked {
  z-index: 100000;
  position: absolute;
}
.look {
  display: none;
}
.amendfalse {
  display: none;
}
.bottom {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  z-index: 99999;
  .b1 {
    width: 100px;
    line-height: 50px;
    float: left;
    span {
      width: 40px;
      height: 50px;
      position: absolute;
      z-index: 20;
      top: -27%;
      padding-right: 10px;
      left: 0;
      display: block;
      background: url(../assets/img/new_jia_ab82e82a.png) 10px -253px no-repeat;
      background-size: 3.845rem;
    }
    i {
      margin-left: 10px;
    }
  }
}
.van-card {
  padding: 9px 16px 0 53px;
}
.b2 {
  float: right;
  span {
    margin: 16px 10px;
  }
  i {
    line-height: 50px;
  }
}
.b2 em {
  width: 100px;
  color: #fff;
  display: block;
  float: right;
  height: 50px;
  line-height: 50px;
  right: 0;
  background-color: #ff6700;
}
.bottom .b2 {
  display: flex;
}
.header {
  width: 100%;
  height: 45px;
  position: fixed;
  background-color: #fff;
  z-index: 99999;
  top: 0;
  p {
    margin: 0;
    span {
      display: inline-block;
      background: url(//image.benlailife.com/static/images/ic_5043190b.png)
        center center no-repeat;
      background-size: 24px;
      width: 24px;
      height: 24px;
      vertical-align: top;
    }
  }
}

.header .b3 {
  display: block;
  height: 20px;
  line-height: 19px;
  font-size: 12px;
  color: #ccc;
  border-bottom: 1px solid #ccc;
}

.header .right p {
  display: block;
  position: absolute;
  top: 10px;
  right: 50px;
}
.header .right .bj {
  display: block;
  width: 50px;
  height: 50px;
  background: url(../assets/img/top_new_c262d734.png) center 0px no-repeat;
  position: absolute;
  top: 0;
  right: 5px;
  background-position: 10px -403px;
}
.active {
  display: none;
}
.header .right .bj div {
  top: 50px;
  right: 0;
  position: absolute;
  width: 120px;
}
.right div .fl {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-top: -7px;
  background-color: rgba(51, 51, 51, 0.9);
  .sj {
    position: absolute;
    top: -18px;
    right: 9px;
    width: 0;
    height: 0;
    border: 12px solid white;
    border-bottom-color: rgba(51, 51, 51, 0.9);
    border-top: none;
  }
}

.right div .fl li {
  padding: 6px;
  border-bottom: 1px solid #ccc;
}
.fl li [class^="tu"] {
  position: absolute;
  background: url(//image.benlailife.com/static/images/top/top_new_c262d734.png)
    no-repeat;
  background-size: 29px;
}

.fl li .tu1 {
  width: 39px;
  height: 30px;
  top: -4px;
  left: 4px;
  background-position: 1px -310px;
}
.fl li .tu2 {
  width: 30px;
  height: 24px;
  top: 31px;
  left: 4px;

  background-position: 1px -372px;
}
.fl li .tu3 {
  width: 56px;
  height: 36px;
  top: 65px;
  left: 5px;

  background-position: 1px -655px;
}
.fl li .tu4 {
  width: 31px;
  height: 24px;
  top: 93px;
  left: 3px;

  background-position: 1px -485px;
}
.fl li a {
  color: #fff;
  font-size: 0.875rem;
}
.header .right .span div ul li:nth-child(1) {
  float: left;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 0;
  color: #fff;
  font-size: 14px;
  background: url(//image.benlailife.com/static/images/top/top_new_c262d734.png)
    no-repeat;
}
.che {
  margin-top: 6.1875rem;
  text-align: center;
  background: url(../assets/img/shopcar.png) center top no-repeat #fff;
}
.che1 {
  float: left;
  width: 100%;
  // height: 200px;
  margin-top: 50px;
  text-align: center;
  background-color: #fff;

  background-size: 200px;
  font-size: 40px;
  color: #000;
  .inp {
    width: 50px;
    // height: 100%;
    position: absolute;
    top: 28px;
    left: 5px;
    z-index: 1;
    input {
      width: 20px;
      height: 20px;
    }
  }
  ul {
    width: 90%;
    // margin-left: 60px;
    margin: 0 auto;
    li {
      background-color: #f7f7f7;
      width: 90%;
      height: 100%;
      padding-left: 49px;
      display: inline-block;
      .img {
        float: left;
        height: 100%;
        line-height: 100%;
        margin-top: 20px;
        span {
          width: 39px;
          height: 34px;
          display: inline-block;
          left: 12px;
          position: absolute;
          background: url(data:image/png;base64,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)
            10px -108px no-repeat;
          background-size: 3.845rem;
        }
        img {
          float: left;
          height: 60px;
          width: 60px;
        }
      }
      .introduce {
        float: right;
        width: 80%;
        p {
          font-size: 14px;
        }
      }
    }
  }
}
.gohome {
  display: inline-block;
  color: #add13e;
  border: 1px solid #add13e;
  margin: 15px 0 1.5625rem;
  width: 132px;
  line-height: 2.625rem;
  height: 2.625rem;
  font-size: 0.875rem;
}
.ulcontent {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(238, 238, 238);
  z-index: 1000;
  // justify-content: space-between;
  .item {
    width: 48%;
    margin: 8px auto;
    background-color: #fff;
    .libottom {
      div {
        .name {
          font-size: 12px;
          font-weight: 700;
        }
        .name2 {
          font-size: 16px;
          color: #999;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .zk {
          margin-left: -60px;
          height: 15px;
          // display: block;
          text-align: left;
          color: red;
          font-size: 12px;
          background-color: rgba(231, 168, 96, 0.6);
        }
      }
      .price {
        font-size: 13px;
        text-align: left;
        i {
          font-size: 20px;
          font-weight: 800;
          color: rgb(255, 60, 0);
          margin-right: 10px;
        }
        span {
          float: right;
        }
      }
    }
  }
}

.item img {
  width: 100%;
}
.top {
  position: relative;
}
.top p img {
  width: 25%;
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
}
.price .imgcar {
  width: 28px;
  height: 28px;
  overflow: hidden;
  display: inline-block;
  right: 0;
  /* position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%); */
  background: url(../assets/img/cart.png);
  background-size: 100%;
}
</style>
