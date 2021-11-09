<template>
  <div style=" width:100%">
    <!-- <router-view></router-view> -->
   <!-- <router-link to="/home/water"></router-link> -->
 
      <!-- <div>{{msg}}</div> -->

        <ul class="homebottom">
          <li v-for="(itemlast , index) of arrbottom" :key="index">
            
            <a :href="`http://www.xcgw.shop:80/#/${itemlast.enname}`">
              <img class="bfx" :src="itemlast.name2==msg?itemlast.img_url2:itemlast.img_url" alt />
              <!-- :src="itemlast.enname==msg?(itemlast.name=='eat'?itemlast.img_url:itemlast.img_url2):itemlast.img_url" alt /> -->
 <!-- v-show="$store.state.bottomshow=true" -->
              <p>{{itemlast.name}}</p>
            </a>
          </li>
        </ul>
      </div>


</template>

<script>
import Vue from "vue";
import "vant/lib/index.css";
import { Tab, Tabs } from "vant";
import "../assets/css/home.css";
import { List } from "vant";
import { Cell } from "vant";
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Cell);
// import bottom from "./bottom.vue";
// v-else="enname==itemlast.enname"
//  v-if="enname==itemlast.enname"
const axios = require("axios");
import { Tabbar, TabbarItem } from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);

export default {
  // name: "home",
  props: ["msg"],
  data() {
    return {
      active: "box",
      arrbottom: [],
      // enname1: [],
    };
  },
  watch:{
    ['$route.path'](){
      this.active = this.$route.path
    }
  },
  methods: {
    onChange(index) {
      this.qwe = index;
    },
    onClick() {
      // console.log(name,);
    },
  },
  created() {
    console.log(this.msg);
    console.log(this.enname);
console.log();
    axios.get("http://81.68.176.64:3000/hometab").then((data) => {
      // console.log(data.data);
      this.arrbottom = data.data;
      // for (var i of this.arrbottom) {
      //   // this.enname1.push(i.enname);
      // }
    });
     
  },
};
</script>

<style scoped>
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
.homebottom {
  background-color: #fff;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  width: 100%;z-index: 999999;
  height: 3.9rem;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  box-sizing: border-box;
}
li {
  width: 4.6875rem;
  height: 3.0625rem;
  padding: .3125rem;
  list-style: none;
}
li .bfx {
  margin-top: .3125rem;
  width: 1.5rem;
  height: 1.5rem;
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
  background-position: 0 -2.5rem;
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

</style>
