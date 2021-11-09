import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//全局状态管理，他是对象
const store = new Vuex.Store({
    state: {
        bottomshow: true,
        //state是对象
    },
    mutations: {
        //mutations修改state的值 传一个state，一个被修改的值
        changeState(state,val){
            state.bottomshow = val
        }
    }
})
export default store