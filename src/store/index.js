import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        sortType:0,
        ticketCon:[],
        curType:-1
    },
    mutations: {
        getTicket(state,ticket){
            state.ticketCon = ticket;
        },
        changeType(state,type){
            state.curType=type;
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