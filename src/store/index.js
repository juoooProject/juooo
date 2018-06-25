import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// console.log(Vuex);
//实例化一个状态仓库
export default new Vuex.Store({
    //四个配置项
    state:{
        /*初始化所有组件共享的状态，与data功能相仿*/

    },
    getters:{
        /*对于state中的数据进行再次处理，类似组件中的computed*/

    },
    mutations:{
        /*类似methods 不能做异步 */

    },
    actions:{

    }
})