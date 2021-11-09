<template>
  <div id="top" class="home">
    <top></top>
    <router-view></router-view>

    <!-- <div class="bottomfixed">
      <bottom></bottom>
    <header>
        <div class="inp">
          <div>
            郑州
            <span></span>
          </div>
          <div>
            <input type="text" />
          </div>
          <div>登录</div>
        </div>

        <van-tabs class="toptab" style  @click="onClick">
          <img  style="width:74px;height:40px; float:left;" src="https://image2.benlailife.com/AppHomePageImageb01ad94e-45bb-41f4-b1e8-726614ba77ea.gif" alt />
       
          <van-tab style="float:right;margin-left:100px;"
        
            v-for="(item,index) of toptab"
            :title="item.name"
            :key="index" 
             replace :to="`/home/${index}`"
          ></van-tab>
        </van-tabs> 
    </header>-->
    <!-- 轮播部分 -->
    <!-- <div>
        <van-swipe :autoplay="1000" style="height:150px;" @change="onChange">
   <van-swipe-item v-for="(image, index) of lunbo" :key="index">
            <img v-lazy="image.imgurl" style="    width: 100%;
    display: block;
    z-index: 2" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              <i v-for="(item,index ) of lunbo" :key="index" :class="qwe==index ? 'active' :''"></i>
            </div>
          </template>
        </van-swipe>
      </div>
      <div>
        <img
          style="width:375px;height:150px;"
          src="https://image1.benlailife.com/AppHomePageImage/d915ba8d6f25410fb0bbe5608710b34b_n-n.jpg"
          alt
        />
        <img
          style="margin-top:-4px;width:375px;height:150px;"
          src="https://image2.benlailife.com/AppHomePageImage/5bd1d077586440bb9eeb96944b8bd38e_n-n.jpg"
          alt
        />
      </div>
      <div class="djfl">
        <img
          :src="item.img_url"
          style="width:93px;height:72px;"
          v-for="(item,index) of liusi"
          :key="index"
          alt
        />
      </div>
      <div class="jkzq" style>
        <img
          src="https://image4.benlailife.com/Customer/GradeIcon/8b0f8eda-cb15-46b6-b00a-4f14b8f8446e_n-n.jpg"
          alt
        />
        <img
          src="https://image1.benlailife.com/Customer/GradeIcon/c3f67dd2-3a1e-496a-8108-1c79739665cb_n-n.jpg"
          alt
        />
      </div>
      <div>
        <ul style="display:flex;flex-wrap:wrap;">
          <li style="width:93px;height:72px;" v-for="(item,index) of liusi1" :key="index">
            <img style="width:93px;height:72px;" :src="item.img_url" alt />
          </li>
        </ul>
      </div>
    </div>
    <van-list
      style="margin-bottom:50px;"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell />
      <a v-for="(item,index) of list" :key="index" :href="item.img_url">
        <img style="width:100%;margin-top:-4px;" :src="item.img_url" alt />
      </a>
    </van-list>-->
  </div>
</template>

<script>
// import Vue from "vue";
import top from "./top";
import "vant/lib/index.css";
// import { Tab, Tabs } from "vant";
import "../assets/css/home.css";
// import { Swipe, SwipeItem } from "vant";
// import { Lazyload } from "vant";
// import { List } from "vant";
// // import { Toast } from "vant";
// import { Cell } from "vant";
// Vue.use(List);
// // Vue.use(Toast);
// Vue.use(Lazyload);
// Vue.use(Swipe);
// Vue.use(SwipeItem);
// Vue.use(Tab);
// Vue.use(Tabs);
// Vue.use(Cell);
// import bottom from "./bottom.vue";
// v-else="enname==itemlast.enname"
//  v-if="enname==itemlast.enname"
const axios = require("axios");
export default {
  props: {},
  data() {
    return {
      arrbottom: [],
      enname: "home",
      toptab: [],
      lunbo: [],
      qwe: 0,
      liusi: [],
      liusi1: [],
      gundong: [],
      list: [],
      loading: false,
      finished: false,
      page: 0,
    };
  },
  methods: {
    onChange(index) {
      this.qwe = index;
    },
    onClick(name ) {
      console.log(name);
    },
    onLoad() {
      setTimeout(() => {
        this.page++;
        axios.get(`http://81.68.176.64:3000/gundong?page=${this.page}`).then((data) => {
          console.log(data.data);
          this.list = this.list.concat(data.data);
        });
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 93) {
          this.finished = true;
        }
      }, 1000);
    },
  },
  created() {
    axios.get("http://81.68.176.64:3000/hometab").then((data) => {
      this.arrbottom = data.data;
    });
    axios.get("http://81.68.176.64:3000/toptab").then((data) => {
      this.toptab = data.data;
    });
    axios.get("http://81.68.176.64:3000/lunbo").then((data) => {
      this.lunbo = data.data;
    });
    axios.get("http://81.68.176.64:3000/liusi").then((data) => {
      this.liusi = data.data;
    });
    axios.get("http://81.68.176.64:3000/liusi/1").then((data) => {
      this.liusi1 = data.data;
    });
  },
  components: {
    top
  },
};
</script>
<style  scoped>
#app {
  margin-top: 0;
}
* {
  padding: 0;
  margin: 0;
}
a {
  color: black;
}
body {
  font-size: 12px;
  overflow: hidden;
}
p {
  font-size: 12px;
}
.bottomfixed {
  width: 100%;
  overflow: hidden;
}
.inp {
  display: flex;
  width: 100%;
  z-index: 10;
  background-color: #fff;
  top: 0;
  left: 0;
  overflow: hidden;
  height: 50px;
  justify-content: space-between;
}
.inp :nth-child(1) {
  width: 34px;
  height: 44px;
  line-height: 44px;
  padding: 0 33px 0 10px;
}
.inp div:nth-child(1) span {
  display: block;
  top: -4px;
  left: 46px;
  position: absolute;
  background: url(https://image.benlailife.com/static/images/top/top_new_c262d734.png)
    no-repeat;
  /* background-size:100px 50px; */
  background-position: 0 -40px;
  /* background-size: 2.8125rem 2.75rem; */
  color: #333;
  font-size: 1.0625rem;
}
.inp :nth-child(2) {
  display: inline-block;
  position: relative;
  flex: 1;
  width: 228px;
  height: 44px;
  margin-right: 0.625rem;
  z-index: 0;
}
.inp :nth-child(2) input {
  padding: 5px 35px 5px 32px;
  margin-top: 7px;
  /* position: absolute; */
  overflow: hidden;
  background-position: -6px -682px;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* font: 400 0.3rem/.58rem "黑体"; */
  color: #000;
  background: url(//image.benlailife.com/static/images/top/top_new_c262d734.png)
    no-repeat #f3f3f3;
  border: 1px solid #f3f3f3;
  background-size: 1.46rem 11.74rem;
  width: 100%;
  height: 1.875rem;
  box-sizing: border-box;
}
.inp :nth-child(3) {
  font-size: 15px;
  padding: 0 10px;
  line-height: 44px;
  color: #abd13e;
}
.toptab {
  position: relative;
  border-bottom: 1px solid #ccc;
  display: inline-block;
}
.toptab img {
  position: absolute;
  left: 0;
  top: 4px;
}
.custom-indicator {
  position: absolute;
  width: 200px;
  margin-left: 90px;
  bottom: 10px;
  padding: 2px 5px;
  font-size: 12px;
}
.custom-indicator i {
  display: inline-block;
  width: 20px;
  height: 3px;
  background-color: #fff;
  color: #ccc;
  margin-right: 15px;
  border-radius: 2px;
}
.custom-indicator i.active {
  background-color: rgb(127, 243, 104);
}
.djfl {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.jkzq {
  display: flex;
  flex-wrap: nowrap;
}
.jkzq img {
  width: 11.6875rem;
  height: 6.875rem;
}
</style>
