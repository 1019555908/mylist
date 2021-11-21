<template>
  <div>
    <h2>管理台</h2>
    <div>
      <leftcomponent id="left">
        
      </leftcomponent>
      <top-component id="top"></top-component>
      <content-component id="content"></content-component>
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

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped>
</style>