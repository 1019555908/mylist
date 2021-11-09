<template>
  <div  id="top">
    <div class="backtop" v-show="top">

  <a href="javascript:;" @click="backtop"></a>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import less from "less";
Vue.use(less);
export default {
  name: "AaaaaaaBacktop",
  data() {
    return {
        scroll:'',
        top:false
    };
  },
  mounted() {
      window.addEventListener('scroll',this.handleScrollx,true)
  },

  methods: {
       handleScrollx() {
//   console.log('滚动高度',window.pageYOffset)
  if(window.pageYOffset<800){
         this.top=false
  }else if(window.pageYOffset>800){
      this.top=true


  }
  else{
      console.log(window.pageYOffset);
  }
//   console.log('距离顶部高度',this.$refs.pronbit.getBoundingClientRect().top)
 },
      backtop(){
        //   window.pageYOffset=0
        //    this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(this.scroll)
        // //   window.document.scrollTop();  
          document.getElementById('top').scrollIntoView()
          console.log(window.pageYOffset);

      }
  },
};
</script>

<style lang="less" scoped>
#top {
    z-index: 99999;
//   width: 100%;
//   height: 2000px;
  .backtop {
    width: 3.125rem;
    height: 3.125rem;
    /* border: 1px solid #ccc; */
    bottom: 5.625rem;
    border-radius: 50%;
    position: fixed;
    right: .625rem;
    a {
      width: 3rem;
      height: 3rem;
      display: block;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAMAAADwSaEZAAAAAXNSR0IArs4c6QAAAPlQTFRFAAAA////4+Pj29vb5ubm39/f4+Pj5ubm4eHh5OTk4+Pj5OTk5OTk5eXl5OTk4+Pj5ubm5eXl5OTk5OTk5OTk5OTk4uLi4eHh4eHh4eHh4ODg4ODg4ODg4ODg3t7e39/f4ODg4uLi5OTk5eXl5+fn6urq6+vr7Ozs7e3t8fHx8vLy9vb2+fn5/Pz8/f39/v7+////5ubm5eXlr6+vqampqqqqq6urrKysra2trq6ur6+vo6OjpKSkpaWlpqamp6enqKionp6eoKCgoaGhoqKimJiYmpqam5ubnJyckpKSk5OTlJSUlZWVlpaWl5eXkpKSfHx8c3NzZmZmV7lcHwAAAFJ0Uk5TAAYJDh4gLTIzOEBCQ1lzi46fo7zEzdTY3N7g4ePk5eXl5eXl5eXl5eXl5eXl5eXl5ejp8fLy8vLy8vLz8/Pz8/P09PT09fX19fb29vb29vf7/AarH+IAAANaSURBVFjDrZhne+IwDIDT0l3K3kMhQBkNwe51b7p3e83//zGnEKBJ8AoXPXyAWH6xY1lL00SyvJ1I54rlGkCtXMylE9vL2oKymcrDnORTm+FJq8kSTtWb3b45sAilxBqY/W5Tx4el5Goo1EYWJxldEyl+IWbXwKHshjJqPQfQ6JiUI2anAZBbV0LFMojqDalAhj3EZWJy1k4V9B6hEiE9Hao7EtQSLqs1oAoyaOHilkSslQLoe1RR9nQorPBZaxUwBlRZBgZU1nisrTq0CQ0hpA31LQ5Lh10aUnZBZ9LW6tCloaULdcZOVyrh1+WurTJ3CksFaNOFpA2FoIVkwCCLwYgBmYDdgx6wCVsgAQvRwXcXYlUI2qo6jO5BNebbZIsuDqMt70bX5zYZTnCjvx4pBz36X9KD3MyvQoP8H4w0YOp7s9KFHRxIl5adxA5oDMWqZ7Z9JtYYNsCNMknoiDVPnRM8Fet0IDmGlcAU6p249nAiVDKhNI61YAjVjqfWdSxUM8CJzimx5zlCzN/xxz4S+6IUwvLCXR4i5Btf2uk3fjkU7jOPuQnoAiMbIeLVOrftc+sVv44EpqbDshaHJl/jBgFvFnVg1HrDHzd83SbEtYTglV3j9HeLujBqvePPa8FLS2hp6POGrxyWY88ujA4d2hVPuw9pvOS893+JUz/Gd2MCo8MPfHTJPYGcVgSO97nAiZ/uPZvC6PATH15w/BAUtTJYzLEHnPY1OecZjJIvfPzAnGBBWasB0zLucdLjdOQXRskjDtwzbQNqGgBr5M7L8sJc2h1rDgAb5rCeflfshVHyxKEhjLXNWz/LD3Npt8xtMg7AuY/P3r/wwyh5Zt1T5wAYprH/Y7/4lhuAUfJi/+yzTINltH9G/q0HYZSM9plGK7hOfBjvOiUUsjIlmHPRhS4oDKwJ2xLnqA4bO0eJ21aGjd22LKCowtyAIgt1ijA31EmDsBJsEoTl6YEKbJoeyBMXOWyWuMhTKjlsllLJkz0pzJPsSdNQKcyThkoTZBnMlyCzUvcwMF/qzioqQsACRQWj3FGHBcsdSSEmhM0XYuISUQhjlIiRFq/RltXRFvzRtiKibZJE276JtrEUbcsr4mZctG3CiBuYEbdWI276TtrRcX87Oi5uR/8D2y1cZkURkOMAAAAASUVORK5CYII=)
        50% no-repeat;
      background-size: 2.75rem;
    }
  }
}
</style>