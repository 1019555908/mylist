<template>
  <div  id="top">
    <div>
      <div class="header" style>
        <van-icon name="arrow-left" @click="back" />
        <span>广场</span>
        <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
      </div>
    </div>
    <div class="lb">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img
            src="https://image.benlailife.com/undefined4990d240-7799-4c62-a53a-b209f0d39dcb.jpg"
            alt
          />
        </van-swipe-item>
        <van-swipe-item>
          <img
            src="https://image.benlailife.com/undefinedd6b9d1a1-8e4a-4446-8476-b37e1fdc7fd6.jpg"
            alt
          />
        </van-swipe-item>
        <van-swipe-item>
          <img
            src="https://image.benlailife.com/undefined79421223-07e6-4e30-8156-11925a2b8436.jpg"
            alt
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="jx">
      <van-tabs class="aaaa">
        <van-tab
          class="aaaa"
          v-for="(item,index) of jxlist"
          :key="index"
          replace
          :title="item.name "
          :to="item.sysNo?`/eat/${item.sysNo}`:'/eat/-1' "
          type="card"
        ></van-tab>
      </van-tabs>
    </div>
    <div class="content" style=" margin-bottom:100px;">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell />
        <ul class="contentul">
          <li v-for="(item,index) in list" :key="index" :title="item.content">
            <!-- v-show="$route.params.id==item.sysNo" -->
            <div class="top">
              <div class="img1">
                <img v-lazy="item.fileUrl"  alt />
                <div class="kan1">
                  <span>
                    <span class="eye"></span>
                    {{item.readCount}}
                  </span>
                  <span :class="item.fileType===1?  'hot' :''"></span>
                </div>
              </div>
            </div>
            <div class="bottomd">
              <p class="title">{{item.content}}</p>
              <div class="card">
                <img class="dt" v-lazy="item.avatar" alt />
                <span style="font-size:14px;">{{item.nickName}}</span>
                <span class="xx">
                  {{item.likeCount}}
                  <b :class="item.like1==0?'like':''" style></b>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
import { Swipe, SwipeItem } from "vant";
import axios from "axios";
import "../assets/css/eat1.css";
import { List } from "vant";
// import{Waterfall} from 'vant';
// Vue.use(Waterfall);
Vue.use(List);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Icon);
export default {
  data() {
    return {
      name: "eat",
      jxlist: [],
      page: 0,
      list: [],
      loading: false,
      finished: false,
      id: -1,
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async onLoad() {
      // console.log(this.id);
      this.page++;
      const data = await axios.get(`http://81.68.176.64:3000/eat?id=${this.id}&page=${this.page}`);
      // console.log(data.data);
      this.list = this.list.concat(data.data);
      // console.log(this.list);
      //  console.log(this.list.length);
      // 加载状态结束
      this.loading = false;
      // // 数据全部加载完成
      // //   console.log(this.list.length);
      if (this.list.length >= 150) {
        this.finished = true;
      }
    },
  },
  mounted() {
    console.log(this.$children[2].$el.children[1].children);
  },
  async created() {
    // console.log(this.$route);
    this.id = this.$route.params.id;
    const data = await axios("http://81.68.176.64:3000/eatjx");
    // console.log(data.data);
    this.jxlist = data.data;

    // var date = +new Date();
    // console.log(date);
    //   const data1 = await axios.get("http://81.68.176.64:3000/eat/home");
    //   //  axios('http://81.68.176.64:3000/eat')
    //   console.log(data1.data);
    //   this.list = data1.data;
  },
  updated() {
    console.log(this.$route.params.id);
  },
  watch: {
    ["$route.path"]() {
      // console.log(this.$route.params);
      var id = this.$route.params.id;

      // var id =Math.abs(this.$route.params.id) ;
      console.log(id);
      axios.get(`http://81.68.176.64:3000/eat?id=${id}&page=${this.page}`).then((data) => {
        this.list = data.data;
        // console.log(this.list);
      });
    },
  },
};
</script>

<style scoped>
::v-deep .van-tabs__nav {
  margin: 0;
}
div {
  width: 100%;
}
::v-deep .van-list {
  margin-bottom: 3.125rem;
}
::v-deep .van-tabs__line {
  border-bottom: 1px solid rgb(45, 236, 54);
  top: 1.75rem;
  background-color: rgb(45, 236, 54);
  /* z-index: 1111; */
}
::v-deep .van-tab--active {
  font-size: 1.125rem;
  font-weight: 700;
}
.van-tabs__nav {
  margin-left: 0;
}
.header {
  display: flex;
  justify-content: space-between;
}
.header :nth-child(3) img,
.header :nth-child(2),
.header :nth-child(1) {
  width: 2.5rem;
  height: 2.75rem;
  line-height: 2.75rem;
  margin: 0 .9375rem;
}
i {
  font-size: 1.875rem;
}

a,
span {
  font-weight: 700;
  font-size: 1.125rem;
}
.contentul{
  column-count: 2;

}
.contentul li {
  width: 95%;
  height: 100%;
  margin-top: 1rem;
  /* margin-left: 5px;  */
  /* margin: 0 auto; */
}
li .title {
  font-size: 0.875rem;
  padding: .3125rem .625rem 0;
  white-space: normal;
  word-wrap: break-word;
  word-spacing: normal;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

li .top .img1 {
  overflow: hidden;
  position: relative;
  max-height: 17.5rem;
  width: 90%;
  margin: 0 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
li .top .img1 .kan1 {
  position: absolute;
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  justify-content: space-between;
  bottom: 10px;
  color: #fff;
}
li .top .img1 img {
  margin: 0 auto;
  width: 100%;
}
li .bottomd .dt {
  width: 1.25rem;
  float: left;
  border-radius: .625rem;
}
.lb img {
  width: 95%;
  border-radius: 0.625rem;
}
.contentul {
  width: 100%;
  /* display: flex;
  flex-wrap: wrap; */

  /* margin-bottom: 50px; */
}
.contentul li .bottomd {
  padding: 0 15px;
  width: 9.6875rem;
  background-color: #fff;
  /* position: absolute;
  bottom: 5px; */
  /* height: 2.125rem; */
}
.bottomd .card {
  width: 95%;
  display: inline-block;
  height: 1.625rem;
}
.kan1 :nth-child(2) {
  width: 2.4375rem;
  margin-right: .3125rem;
  border-radius: .625rem;
  height: 1rem;
}
/* .active1{
  
} */
.kan1 span {
  font-size: 12px;
}
.kan1 span .eye {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  background: url(../assets/img/eye.png) 50% no-repeat;
  background-size: 100% 100%;
}
.hot {
  background: url(../assets/img/jx.png) 50% no-repeat;
  background-size: 100% 100%;
}
.like {
  background: url(../assets/img/xx.png) 50% no-repeat;
  background-size: 100% 100%;
}
.xx {
  font-size: .625rem;
  float: right;
  line-height: 2.4375rem;
  padding-right: 1.4375rem;
  width: 1.25rem;
  /* height: 30px; */
  margin-top: -0.4375rem;
  position: relative;
}
.xx b {
  width: 25px;
  height: 25px;
  display: inline-block;
  position: absolute;
  right: 0;
  top: 5px;
}
</style>
