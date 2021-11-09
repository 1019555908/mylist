<template>
  <div>
    <div class="title">
      <div class="inp" @click="search">
        <span></span> 佳沛新西兰阳光金果
      </div>
      <div class="tablist1">
        <ul>
          <li
            ref="tittab"
            v-for="(item,index) of tablist"
            :key="index"
            @click="titletab(item.sysNo,index)"
          >
            <router-link :to="`/sort/${item.sysNo}` ?`/sort/${item.sysNo}` : '/sort'">
              <img :src="item.imgUrl" alt style />
              <p
                :class="item.sysNo ==$route.path.substring(6)  ? 'titletabactive':'' "
              >{{item.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="top" style="    float: right;
    margin-right: 100px;">
        <ul style="display: flex;">
          <li
            style="width: 60px; margin: 0 10px;height: 20px;background-color: #ccc;"
            v-for="(item,index) of this.top "
            :key="index"
            @click="desc(index)"
          >{{item}}</li>
        </ul>
      </div>
      <div class="left">
        <ul>
          <li
            ref="lettab"
            v-for="(item,index) of leftlist"
            :key="index"
            @click="lefttab(item.sysNo,index)"
          >
            <div>
              <router-link :to="`/sort/${item.sysNo}` ?`/sort/${item.sysNo}` : '/sort'">
                <span :class=" item.sysNo ==$route.path.substring(6)?'leftacive':'' ">{{item.name}}</span>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li v-for="(item,index) of list" :key="index"
          @click="shopxq(index)">
            <div class="left_img">
              <img v-show="item.simg" :src="item.simg" class="simg" alt />
              <img :src="item.bimg" class="bimg" alt />
            </div>
            <div class="right_text">
              <p class="name" style>{{item.name}}</p>
              <p class="lp">{{item.lp}}</p>
              <p class="price">
                ￥ {{item.price}}
                <span style>
                  <s>{{item.oldprice}}</s>
                </span>
                <span class="car"></span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { Icon } from "vant";
import { Area } from "vant";
// import { areaList } from "@vant/area-data";
Vue.use(Area);
Vue.use(Icon);
export default {
  name: "sort1",
  data() {
    return {
      leftlist: [],
      list: [],
      tablist: [],
      top: ["全部", "价格"],
      descx: "desc",
    };
  },
  mounted() {},
  methods: {
    shopxq(){
      console.log(this);
    },
    async desc(index) {
      if (index == 1) {
        var page = this.$route.params.id;
        this.descx = this.descx == "desc" ? "asc" : "desc";
        console.log(this.descx);
        //  this.$router.push()
        const data3 = await axios.get(
          `http://81.68.176.64:3000/sort/${page}/${this.descx}`
        );
        console.log(data3);
        this.list = data3.data;
      }
      if (index == 0) {
        var page = this.$route.params.id;
        // this.descx='desc';
        const data = await axios.get(`http://81.68.176.64:3000/sort/${page}`);
        console.log(data);
        this.list = data.data;
      }
    },
    search(){
      this.$router.push('/search')
    },
    titletab(i, index) {
      i, index
      // console.log(i, index);
      //   this.$route.push()
      // console.log(this.$route.path.substring(6));
      // console.log(this.$refs.tittab[index]);
    },
    lefttab(i, index) {
      i, index
      // console.log(this.$route.path.substring(6));
      // console.log(i, index);
      // console.log(this.$refs.lettab[index]);
    },
  },

  async created() {
    var page = this.$route.params.id;
    // console.log(this.$route.params.id);
    const data1 = await axios.get(
      `http://81.68.176.64:3000/sort/${page}/${this.descx}`
    );
    // console.log(data1.data);
    this.list = data1.data;
    const data2 = await axios.get(`http://81.68.176.64:3000/sortleft`);
    // console.log(data2);
    this.leftlist = data2.data;
    const datatab = await axios.get(`http://81.68.176.64:3000/sort2tab`);
    console.log(datatab.data);
    this.tablist = datatab.data;
  },
  watch: {
    ["$route.path"]() {
      var page = this.$route.params.id;
      axios.get(`http://81.68.176.64:3000/sort/${page}`).then((data) => {
        //这是sort区域所有的请求，如果在update里的话会一直请求导致页面重绘
        // this.leftlist = data.data.menu;
        //    this.list=  data.data.category || data.data.allCategory[0].category;
        this.list = data.data;
        console.log(data.data);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.leftacive {
  color: #80d13e;
  font-weight: 500;
  width: 100%;
  display: block;
  height: 100%;
  background-color: #fff;
}
.titletabactive {
  background: linear-gradient(90deg, #9dd300, #46bd01);
  border-radius: 20px;
}
* {
  padding: 0;
  margin: 0;
  font-size: 12px;
}
.title {
  width: 100%;
  height: 7.4375rem;
  .inp {
    margin: 0.4375rem auto;
    line-height: 1.875rem;
    border-radius: 8px;
    background-color: #f2f2f2;
    color: #999;
    text-align: center;
    width: 21.875rem;
    height: 1.875rem;
    ::before {
      content: "";
      display: inline-block;
      vertical-align: middle;
      width: 21px;
      height: 26px;
      background: url(https://image.benlailife.com/wxa/image/search/gray@2x.svg)
        50% no-repeat;
      background-size: 100% 100%;
    }
  }
  .tablist1 {
    overflow: auto;

    ul {
      width: 75rem;
      display: flex;
      padding-right: 2.5rem;
      li {
        display: block;
        flex: 1;
        text-align: center;
        width: 3.75rem;
        color: #666;
        img {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
        }
        p {
          font-size: .75rem;
          color: #000;
        }
      }
    }
  }
}
.content {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  right: 0;
  height: 100%;
  left: 0;
  position: absolute;
  .left {
    box-sizing: border-box;
    width: 80px;
    // height: 100%;
    overflow-x: hidden;
    // overflow-y: scroll;
    background-color: #f9f9fb;
    // top: 0;
    right: auto;
    left: 0;
    position: absolute;
    ul {
      list-style: none;
      li {
        a {
          font-weight: 500;
          background-color: #f9f9fb;
          position: relative;
          display: block;
          height: 50px;
          line-height: 50px;
          text-align: center;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          span {
            padding: 0 10px;
          }
        }
      }
    }
  }
  .right {
    float: right;
    ul {
      margin-bottom: 82px;
      li {
        display: flex;
        width: 275px;
        margin: 0 auto;
        height: 101px;
        padding: 10px 0;
        border-bottom: 1px solid #f2f2f2;
        .left_img {
          position: relative;
          float: left;
          width: 80px;
          height: 80px;
          .simg {
            width: 30px;
            height: 30px;
            position: absolute;
            z-index: 1;
          }
          .bimg {
            width: 80px;
            height: 80px;
            // position: absolute;
          }
        }
        .right_text {
          float: right;
          .name {
            font-size: 14px;
          }
          .lp {
            margin-top: 10px;
            text-align: left;
            margin-left: 25px;
          }
          .price {
            color: red;
            font-size: 19px;
            font-weight: 700;
            text-align: left;
            span {
              color: #000;
              margin-left: 20px;
            }
            .car {
              width: 28px;
              /* float: right; */
              margin-right: 19px;
              height: 28px;
              position: absolute;
              overflow: hidden;
              /* display: block; */
              right: 0;
              background: url(data:image/png;base64,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);
              background-size: 100%;
            }
          }
        }
      }
    }
  }
}
</style>