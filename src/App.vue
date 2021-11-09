<template>
  <div id="app">
    <!-- <top></top> -->
        <router-view></router-view>
        <bottom :msg="aaaa" v-show="$store.state.bottomshow"></bottom>
        <backtop></backtop> 
  </div>
</template>

<script>
import bottom from "./components/bottom.vue";
import backtop from "./components/public/backtop";
// import top from './components/top.vue'
export default {
  data(){
return{
  aaaa:''
}
  },
  components: {
    bottom,backtop
  },
  created(){
      window.addEventListener('scroll',this.handleScrollx,true)

    console.log( window.localStorage.localMsg);
    console.log(this.$toute);
    if(window.localStorage.localMsg){
this.$route.name != 'login'&& this.$route.name != 'register'
    }
  },
  beforeUpdate(){
    
 this.aaaa=this.$route.name;
// console.log(this.$route);
  }
}

</script>

<style>
html{
  font-size: 16px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
