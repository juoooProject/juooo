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
        sortType:0,
        address:{
            province:'',
            city:'',
            country:''
        },
        total:{
            totalPrice:0,
            totalCount:0
        },
        good:{
            title:'',
            city:'',
            imgUrl:'',
            place:'',
            time:{
                ymd:'',
                ms:''
            }
        },
        sendAddress:{
            username:'',
            phone:'',
            detail:''
        }
    },
    mutations: {
        // getSeller(state,seller){
        //     state.seller = seller;
        // },
        changeStore(state){
            state.footShow = !state.footShow;
        },
        changeCurrentCity(state,value){
            state.currentCity = value;
        },
        changeCalendarCity(state,value){
            state.calendarCity = value;
        },
        changeAddress(state,addressObj) {
            state.address.province = addressObj.province;
            state.address.city = addressObj.city;
            state.address.country = addressObj.country;
        },
        getTicket(state,ticket){
            state.ticketCon = ticket;
        },
        changeType(state,type){
            state.curType=type;
        },
        saveOne(state,options){
            state.good.title = options.title;
            state.good.city = options.city;
            state.good.imgUrl = options.imgUrl;
            state.good.place = options.place;
            state.good.time.ymd = options.time.ymd;
            state.good.time.ms = options.time.ms;
        },
        calculateTotalPrice(state,options){
            state.total.totalPrice = 0;
            state.total.totalCount = 0;
            state.total.totalPrice = options.totalPrice;
            state.total.totalCount = options.totalCount;
        },
        getDetailAddress(state,options){
            state.sendAddress.username = options.username;
            state.sendAddress.phone = options.phone;
            state.sendAddress.detail = options.detail;
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