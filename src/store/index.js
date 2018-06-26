import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const key = 'user'
// console.log(Vuex);
//实例化一个状态仓库
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        footShow:true,
        currentCity:'全国',
        calendarCity:'全国',
        showCalendarAddress:false//演出日历地址显示
    },
    mutations: {
        // getSeller(state,seller){
        //     state.seller = seller;
        // },
        // cartListShow(state,item){
        //     if(item != ""){
        //         state.cartFlag = !state.cartFlag;
        //     }
        //
        // },
        // disappear(state){
        //     state.cartFlag = false;
        // }
    },
    actions: {
    //     fetchSeller({commit}){
    //         axios.get("api/seller").then(({data})=>{
    //             if(data.status){
    //                 console.log(data.seller);
    //                 commit("getSeller",data.seller);
    //             }
    //         }).catch((err)=>{
    //             console.error(err);
    //         })
    //     }
    }
})