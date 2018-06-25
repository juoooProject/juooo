import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const key = 'user'
// console.log(Vuex);
//实例化一个状态仓库
export default new Vuex.Store({
    //四个配置项
    state(){
        /*初始化所有组件共享的状态，与data功能相仿*/
        return {
            user:null
        }
    },
    getters:{
        /*对于state中的数据进行再次处理，类似组件中的computed*/
        getStorage:(state)=>{
            if(!state.user){
                state.user = JSON.parse(localStorage.getItem(key))
            }
            return state.user;
        }
    },
    mutations:{
        /*类似methods 不能做异步 */
        $_setStorage(state,value){
            state.user = value
            localStorage.setItem(key,JSON.stringify(value))
        },
        $_removeStorage(state){
            state.user = null
            localStorage.removeItem(key)
        }
    },
    actions:{

    }
})