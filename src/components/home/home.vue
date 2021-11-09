<template>
  <div id="top" class="home">
    <div class="bottomfixed">
      <div>
        <van-swipe :autoplay="2000" style="height:9.375rem;" @change="onChange">
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
          style="width:100%;height:9.375rem;"
          src="https://image1.benlailife.com/AppHomePageImage/d915ba8d6f25410fb0bbe5608710b34b_n-n.jpg"
          alt
        />
        <img
          style="margin-top:-4px;width:100%;height:9.375rem;"
          src="https://image2.benlailife.com/AppHomePageImage/5bd1d077586440bb9eeb96944b8bd38e_n-n.jpg"
          alt
        />
      </div>
      <div class="djfl">
        <img
          v-lazy="item.img_url"
          style="width:93px;height:4.5rem;"
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
      <div style=" width:100%;">
        <ul style="width:100%; display:flex;flex-wrap:wrap;">
          <li style="width:25%;height:4.5rem;" v-for="(item,index) of liusi1" :key="index">
            <img style="width:100%;height:4.5rem;"  v-lazy="item.img_url" alt />
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
        <img style="width:100%;margin-top:-4px;"  v-lazy="item.img_url" alt />
      </a>
    </van-list>
  </div>
</template>

<script>
import Vue from "vue";
import "vant/lib/index.css";
import { Tab, Tabs } from "vant";
import "../../assets/css/home.css";
import { Swipe, SwipeItem } from "vant";
import { Lazyload } from "vant";
import { List } from "vant";
// import { Toast } from "vant";
import { Cell } from "vant";
Vue.use(List);
// Vue.use(Toast);
Vue.use(Lazyload);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Cell);
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
    onClick(name) {
      console.log(name);
    },
    onLoad() {
      this.page++;
      axios
        .get(`http://81.68.176.64:3000/gundong?page=${this.page}`)
        .then((data) => {
          // console.log(data.data);
          this.list = this.list.concat(data.data);
        });
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      //   console.log(this.list.length);
      if (this.list.length >= 182) {
        this.finished = true;
      }
    },
  },
  updated() { },
  async created() {
    await axios.get("http://81.68.176.64:3000/hometab").then((data) => {
      console.log(data.data);
      this.arrbottom = data.data;
    });
    await axios.get("http://81.68.176.64:3000/toptab").then((data) => {
      console.log(data.data);
      this.toptab = data.data;
    });
    await axios.get("http://81.68.176.64:3000/lunbo").then((data) => {
      console.log(data.data);
      this.lunbo = data.data;
    });
    await axios.get("http://81.68.176.64:3000/liusi").then((data) => {
      // console.log(data.data);
      this.liusi = data.data;
    });
    await axios.get("http://81.68.176.64:3000/liusi/1").then((data) => {
      console.log(data.data);
      this.liusi1 = data.data;
    });
  },
  components: {
    // bottom,
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
  font-size: .75rem;
  overflow: hidden;
}
p {
  font-size: .75rem;
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
  height: 3.125rem;
  justify-content: space-between;
}
.inp :nth-child(1) {
  width: 2.125rem;
  height: 2.75rem;
  line-height: 2.75rem;
  padding: 0 2.0625rem 0 .625rem;
}
.inp div:nth-child(1) span {
  display: block;
  top: -0.25rem;
  left: 2.875rem;
  position: absolute;
  background: url(https://image.benlailife.com/static/images/top/top_new_c262d734.png)
    no-repeat;
  /* background-size:100px 50px; */
  background-position: 0 --2.5rem;
  /* background-size: 2.8125rem 2.75rem; */
  color: #333;
  font-size: 1.0625rem;
}
.inp :nth-child(2) {
  display: inline-block;
  position: relative;
  flex: 1;
  width: 14.25rem;
  height: 2.75rem;
  margin-right: 0.625rem;
  z-index: 0;
}
.inp :nth-child(2) input {
  padding: .3125rem 2.1875rem .3125rem 2rem;
  margin-top: .4375rem;
  /* position: absolute; */
  overflow: hidden;
  background-position: -0.375rem -42.625rem;
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
  font-size: .9375rem;
  padding: 0 .625rem;
  line-height: 2.75rem;
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
  width: 12.5rem;
  margin-left: 5.625rem;
  bottom: .625rem;
  padding: .125rem .3125rem;
  font-size: .75rem;
}
.custom-indicator i {
  display: inline-block;
  width: 1.25rem;
  height: .1875rem;
  background-color: #fff;
  color: #ccc;
  margin-right: .9375rem;
  border-radius: .125rem;
}
.custom-indicator i.active {
  background-color: rgb(127, 243, 104);
}
.djfl {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.jkzq {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
}
.jkzq img {
  width: 50%;
  height: 6.875rem;
}
</style>
