<template>
  <div>
    <!-- <h2>管理台</h2> -->
    <div id="views">
      <leftcomponent id="left"></leftcomponent>
      <div id="viewscontent">
        <top-component id="top"></top-component>
        <content-component id="content"></content-component>
      </div>
    </div>
  </div>
</template>

<script>
import leftcomponent from './leftlist/index.vue'
import topComponent from './top/index.vue'
import contentComponent from './content/index.vue'
export default {
  name: 'MylistIndex',
  components: {
    leftcomponent,
    topComponent,
    contentComponent,
  },
  data() {
    return {}
  },

  mounted() {
    console.log('1', this.$store)
  },

  methods: {},
}
</script>

<style lang="less" scoped>
#views {
  display: flex;
  flex-wrap: nowrap;
  #left {
    float: left;
    width: 160px;
    height: 100%;
    // background-color: #263445;
  }
  #viewscontent {
    width: 100%;
    float: right;
    height: 100%;
    // display: flex;
    // flex-wrap: wrap;

    #top {
      width: 100%;
      height: 50px;
      background-color: #f3f3f5;
    }
    #content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>