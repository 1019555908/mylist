<template>
   <div  id="top">
    <header>
      <div class="inp">
        <div>
          <van-cell is-link @click="showPopup">
            <span>
              {{this.arrArea}}
              <i class="xiajiantou"></i>
            </span>
          </van-cell>
        </div>
        <div>
          <input type="text" :value="this.inputvalue   " />
          <img
            @click="close"
            src="https://image.benlailife.com/static/images/mycenter/login_n_ico05_b19588ab.png"
          />
        </div>
        <span></span>
      </div>
    </header>
    <div style="display:flex;">
      <div class="leftlist">
        <ul>
          <li
            class="leftitem"
            v-for="(item,index) of leftlist "
            :key="index"
            :class="item.sysNo==$route.path.substring(6) ? 'active' : '' "
          >
            <router-link
              :to="`/sort/${item.sysNo}` ? `/sort/${item.sysNo}` : '/sort' "
            >{{ item.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="right">
        <div
          class="rightheader"
          v-show="$route.params.id==item.sysNo"
          v-for="item of leftlist "
          :key="item.sysNo"
        >
          <router-link to="/sort/43">全部{{$route.params.id == item.sysNo? item.name :''}} ></router-link>
        </div>
        <div v-for="(item,index ) in rightlist" :key="index">
          <h3>
            {{item.name}}
            <van-icon name="arrow" style="float:right;line-height:54px; margin-right:20px;" />
          </h3>
          <ul class="rightul">
            <li v-for="(item1,index) in item.children" :key="index">
              <img :src="item1.imgUrl" alt />
              <p>{{item1.name}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-area
        title="选择你所在的城市"
        :area-list="areaList"
        @cancel="cancels"
        @confirm="genggai"
        :columns-placeholder="['请选择', '请选择', '请选择']"
      />
    </van-popup> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { Icon } from "vant";
import { Area } from "vant";
import { areaList } from "@vant/area-data";
Vue.use(Area);
Vue.use(Icon);
export default {
  data() {
    return {
      leftlist: [],
      rightlist: [],
      show: false,
      areaList,
      inputvalue: "佳沛新西兰阳光金果",
      showAddrPopup: true, //弹出层展示
      arrArea: "郑州",
    };
  },
  methods: {
    close() {
      this.inputvalue = "";
    },
    genggai(data) {
      //  for(let i = 0; i<data.length; i++) {
      //   this.arrArea = data[i].name + this.arrArea;
      // }
      this.arrArea = data[2].name;
      this.show = false;
      console.log(this.arrArea);
    },
    showPopup() {
      this.show = true;
    },
    cancels() {
      this.show = false;
    },
  },
  async created() {
    // console.log(this.$route.params.id);
    var page = this.$route.params.id;
    const data = await axios.get(`http://81.68.176.64:3000/sort/${page}`);
    // console.log(data);
    // console.log( data.data.allCategory[0].parentSysNo ==this.$route.params.id);
    this.leftlist = data.data.menu;

    // this.rightlist = data.data.allCategory[0].category;
    this.rightlist = data.data.category || data.data.allCategory[0].category;
    // console.log(data.data.menu.sysNo);
    // console.log(data.data);

    // console.log(data.data.allCategory[0]);
    // console.log(data.data.menu);
  },
  watch: {
    ["$route.path"]() {
      // console.log(this.$route.path.substring(6));
      console.log(this.$route.params.id);
      var page = this.$route.params.id;
      axios.get(`http://81.68.176.64:3000/sort/${page}`).then((data) => {
        //这是sort区域所有的请求，如果在update里的话会一直请求导致页面重绘
        // this.leftlist = data.data.menu;
        this.rightlist =
          data.data.category || data.data.allCategory[0].category;
      });
    },
  },
  updated() {
    // console.log( data.data.allCategory[0].parentSysNo ==this.$route.params.id);
    // this.rightlist = data.data.allCategory[0].category;
    // console.log(data.data.menu.sysNo);
    // console.log(data.data);
    // console.log( data.data.allCategory[0].parentSysNo);
    // console.log(this.$route);
  },
};
</script>

<style scoped>
#app {
  margin-top: 0;
}

* {
  padding: 0;
  margin: 0;
}
a {
  color: black;
  font-size: 14px;
}
::v-deep .van-icon-arrow::before {
  display: none;
}
body {
  font-size: 12px;
  overflow: hidden;
  background-color: #ccc;
}
p {
  font-size: 12px;
}
.rightheader {
  width: 95%;
  background-color: #fff;
  margin: .625rem auto 0;
  font-weight: 700;
  height: 2.75rem;
}
.rightheader a {
  font-size: 14px;
  line-height: 2.75rem;
}
.inp {
  display: flex;
  position: fixed;
  border-bottom: 1px solid #ccc;
  top: 0;
  width: 100%;
  z-index: 10;
  background-color: #fff;
  left: 0;
  overflow: hidden;
  height: 3.125rem;
  justify-content: space-between;
}
.inp :nth-child(1) {
  width: 6.5rem;
  height: 2.75rem;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 2.75rem;
  padding: 0 0 0 .1875rem;
}
.inp div:nth-child(1) span .xiajiantou {
  display: block;
  width: 2.5625rem;
  height: 2.5625rem;
  top: -0.25rem;
  right: -2.9375rem;
  position: absolute;
  background: url(https://image.benlailife.com/static/images/top/top_new_c262d734.png)
    no-repeat;
  background-size: 1.875rem 20.3125rem;
  background-position: .25rem .5rem;
  color: #333;
  font-size: 1.0625rem;
}
.inp :nth-child(2) {
  position: relative;
  display: inline-block;
  flex: 1;

  margin-right: 0.625rem;
  z-index: 0;
}
.inp :nth-child(2) img {
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  line-height: 1.875rem;
  right: 0;
  top: 0.6875rem;
}
.inp :nth-child(2) input {
  padding: 5px 2.1875rem 5px 51px;
  margin-top: .4375rem;
  font-size: .8125rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #000;
  background: url(//image.benlailife.com/static/images/top/top_new_c262d734.png)
    no-repeat #f3f3f3;
  border: 1px solid #f3f3f3;
  background-size: 2.5625rem 26.4375rem;
  width: 100%;
  background-position: 5px -330px;
  width: 100%;
  height: 1.875rem;
  box-sizing: border-box;
}

/* .inp :nth-child(3) {
  font-size: 15px;
  padding: 0 10px;
  line-height: 44px;
  color: #abd13e;
} */
.leftlist {
  float: left;
  margin-top: 50px;
}

.leftitem {
  width: 5.625rem;
  line-height: 3.125rem;
  height: 3.125rem;
  /* padding: .9375rem .625rem; */
  /* padding: 15px 10px; */
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
}
.right {
  background-color: #f2f2f2;
  float: right;
  margin: 3.125rem 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.right h3 {
  width: 100%;

  height: 3.3125rem;
  text-align: center;
  line-height: 3.3125rem;
  justify-content: center;
}
.active {
  border-left: 1px solid red;
  background-color: #f2f2f2;
}

.active a {
  color: green;
  font-weight: 700;
}
.rightul {
  width: 95%;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
}
.rightul li {
  width: 33%;
  margin-bottom: 5px;
}
.rightul li img {
  width: 62px;
  height: 62px;
}
</style>
