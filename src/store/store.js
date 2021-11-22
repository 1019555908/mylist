import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//vuex全局状态管理，他是对象
const store = new Vuex.Store({
    state: {//存放的键值对就是所要管理的状态
        //state是对象
        bottomshow: true,
    },
    mutations: {
        //mutations修改state的值 传一个state，一个被修改的值
        changeState(state,val){
            state.bottomshow = val
        }
    }
})
export default store