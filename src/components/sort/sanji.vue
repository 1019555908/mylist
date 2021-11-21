<template>
  <div id="top">
    <div class="flex-input">
      <div class="tx-lable">{{ itemName }}</div>
      <div class="tx-input" @click="areaChoose">
        <input type="text" :placeholder="phdText" v-model="chooseValue" readonly />
        <!-- <img :src="toRight" /> -->
      </div>
    </div>
    <!-- <DLine v-show="showUnderline"></DLine> -->
    <van-popup v-model="showAddrPopup" position="bottom" class="xzdqd">
      <van-area class="xzdq" title="选择地区" :area-list="areaList" @cancel="showAddrPopup = false" @confirm="confArea"
        @visible-item-count="itemCount" />
    </van-popup>
  </div>
</template>
<script>
// import DLine from "@/components/DLine";
// import AreaList from "@/assets/js/area.js";
import Vue from 'vue'
import { Area, Popup } from 'vant'
Vue.use(Area)
Vue.use(Popup)
export default {
  props: {
    itemName: {
      type: String, //按钮名称
      default: '地区',
    },
    phdText: {
      type: String, //按钮名称
      default: '请选择地区',
    },
    showUnderline: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    // DLine
  },
  data() {
    return {
      areaList: {}, //省市区列表
      itemCount: 7,
      showAddrPopup: false, //弹出层展示
      chooseValue: '',
      //  toRight: require ("@/assets/img/toRight.png")
    }
  },
  created() {
    this.initParams()
  },
  methods: {
    clickhandle() {
      //使用emit，第一个参数为子组件组件方法，第二个参数为该方法传递的参数
      this.$emit('clickhandle', 5)
    },
    initParams() {
      this.areaList = this.AreaList
    },
    areaChoose() {
      this.showAddrPopup = true
    },
    confArea(data) {
      // this.chooseArea = data;
      for (let i = 0; i < data.length; i++) {
        this.chooseValue = data[i].name + this.chooseValue
      }
    },
  },
}
</script>
<style lang="less" scoped>
::v-deep .van-picker {//van-picker van-area
     height: 500px;
}
/deep/ .van-popup  .van-picker__columns .van-picker-column__wrapper{
  margin-top: -99px;
}
::v-deep .van-popup--bottom  .van-picker__columns .van-picker-column__wrapper{
  margin-top: -99px;
}
.flex-input {
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  height: 3.5rem;
  padding: 0 1.5625rem;
  div {
    font-size: 1rem;
    color: #2e042c;
    letter-spacing: 0;
  }
}
.tx-lable {
  margin: 1rem 0;
  height: 1.5rem;
  line-height: 1.5rem;
  vertical-align: -webkit-baseline-middle;
}
.tx-input {
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
  line-height: 1.5rem;
  input {
    border: none;
    margin-right: 0.3125rem;
    text-align: right;
  }
  input::-moz-placeholder {
    color: #f6e9f7;
  }
  img {
    margin: 7px 5px;
    height: 0.75rem;
    width: 0.75rem;
  }
}
</style>
