<template>
  <div id="bigdiv">
    <router-view></router-view>
    <!-- <h3>中间</h3> -->
  </div>
</template>

<script>
export default {
  name: 'MylistIndexconent',

  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="less" scoped>
#bigdiv{
  width: 100%;
  height: 100%;
  background-color: #fccccf;
}
</style>