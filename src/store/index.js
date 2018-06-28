import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// console.log(Vuex);
//实例化一个状态仓库
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        sortType:0,
        ticketCon:[],
        curType:-1,
        footShow:true,
        currentCity:'全国',
        calendarCity:'全国',
        showCalendarAddress:false,//演出日历地址显示
        sortType:0
    },
    mutations: {
        getTicket(state,ticket){
            state.ticketCon = ticket;
        },
        changeType(state,type){
            state.curType=type;
        },
        changeCity(state,city){
            state.currentCity=city;
        }
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