<template>
  <div>
    <div class="home">
      <div class="bottomfixed">
        <header style="width:100%;">
          <div class="inp">
            <div class="zz">
              <van-cell is-link @click="showPopup" style="width: 100px; height: 45px;">
                <span style="width: 100px;
                  position: absolute; left: 6px;
                  line-height: 42px;font-weight:700;
                  height: 57px font-size: 20px;">{{this.arrArea}}</span>
              </van-cell>
              <span class="xiajiantou"></span>
            </div>
            <div>
              <input type="text" />
            </div>
            <div>
              <router-link to="/login" style="color:green;padding:0;">{{this.dl}}</router-link>
            </div>
          </div>
          <van-tabs class="toptab" v-model="active" @click="onClick">
            <img style="width:74px;height:40px; float:left;"
              src="https://image2.benlailife.com/AppHomePageImageb01ad94e-45bb-41f4-b1e8-726614ba77ea.gif" alt />
            <!-- 顶部tab切换部分 -->
            <van-tab style="float:right;" v-for="(item,index) of toptab" :title="item.name" :name="`/${item.enname}`"
              :key="index" replace :to="`/box/${item.enname}`"></van-tab>
          </van-tabs>
        </header>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-area title="选择你所在的城市" :area-list="areaList" @cancel="cancels" @confirm="genggai"
        :columns-placeholder="['请选择', '请选择', '请选择']" style="margin-top:'-99px' " />
    </van-popup>
  </div>
</template>

<script>
import 'vant/lib/index.css'
import { Tab, Tabs } from 'vant'
import '../assets/css/home.css'
import { List } from 'vant'
import { Cell } from 'vant'
import { Area } from 'vant'
import { areaList } from '@vant/area-data'
import Vue from 'vue'
import { Popup } from 'vant'

Vue.use(Popup)
Vue.use(Area)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Cell)
const axios = require('axios')
import { Tabbar, TabbarItem } from 'vant'

Vue.use(Tabbar)
Vue.use(TabbarItem)

export default {
  // name: "home",
  props: ['msg'],
  data() {
    return {
      // name:'',
      active: 'home',
      arrbottom: [],
      enname1: [],
      enname: 'home',
      toptab: [],
      areaList,
      look: false,
      show: false,
      arrArea: '郑州',
      showAddrPopup: true, //弹出层展示
      dl: '登陆',
    }
  },
  watch: {
    ['$route.path']() {
      this.active = this.$route.path.substring(4)
    },
  },
  methods: {
    showPopup() {
      this.show = true
    },
    cancels() {
      this.show = false
    },
    genggai(data) {
      //  for(let i = 0; i<data.length; i++) {
      //   this.arrArea = data[i].name + this.arrArea;
      // }
      this.arrArea = data[2].name
      this.show = false
      console.log(this.arrArea)
    },
    onChange(index) {
      this.qwe = index
    },
    // islook() {
    //   console.log(this.look);
    //   this.look == false ? (this.look = true) : (this.look = false);
    // },
    onClick() {
      // console.log(name, title);
      console.log(this.$route.path.substring(4))
    },
  },
  created() {
    console.log()
    if (window.localStorage.localMsg) {
      this.dl = '我的'
    }
    axios.get('http://81.68.176.64:3000/toptab').then((data) => {
      // console.log(data.data);
      this.toptab = data.data
    })
  },
  components: {},
}
</script>

<style scoped>
::v-deep .van-popup--bottom  .van-picker__columns ul{
  margin-top: -0px;
}
::v-deep .van-icon-arrow::before {
  display: none;
}
::v-deep .van-tabs__nav {
  width: 325px;
}
* {
  padding: 0;
  margin: 0;
}

p {
  font-size: 12px;
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
  width: 100%;
  height: 3.9rem;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  box-sizing: border-box;
}
li {
  width: 75px;
  height: 49px;
  padding: 5px;
  list-style: none;
}
li .bfx {
  margin-top: 5px;
  width: 24px;
  height: 24px;
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
.inp .zz {
  width: 84px;
  font-size: 20px;
  height: 44px;
  line-height: 44px;
}
.inp div .xiajiantou {
  display: block;
  top: -4px;
  left: 55px;
  position: absolute;
  background: url(https://image.benlailife.com/static/images/top/top_new_c262d734.png)
    no-repeat;
  background-position: 0 -40px;
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
  padding: 5px 35px 5px 59px;
  margin-top: 7px;
  /* position: absolute; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* font: 400 0.3rem/.58rem "黑体"; */
  color: #000;
  background: url(//image.benlailife.com/static/images/top/top_new_c262d734.png)
    no-repeat #f3f3f3;
  border: 1px solid #f3f3f3;
  background-size: 41px 423px;
  width: 100%;
  background-position: 5px -330px;
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
</style>
