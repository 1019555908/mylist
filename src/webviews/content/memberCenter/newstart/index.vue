<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'MylistInde123asdfx',

  data() {
    return {
      msg: '',
      err: '',
      clo: '',
    }
  },

  mounted() {
    var ws = new WebSocket('ws://localhost:3000')
    console.log(ws)
    ws.addEventListener('open', this.handelOpen.bind(this), false)
    ws.addEventListener('close', this.handelClose.bind(this), false)
    ws.addEventListener('error', this.handelError.bind(this), false)
    ws.addEventListener('message', this.handelMessage.bind(this), false)
  },

  methods: {
    handelOpen(e) {
      console.log('open',e)
      console.log(1)
      const msg = this.msg
      if (!msg.trim().length) {
        return
      }
    },
    handelClose(e) {
      console.log('close',e)
    },
    handelError(e) {
      console.log('error',e)
    },
    handelMessage(e) {
      console.log('message',e)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>