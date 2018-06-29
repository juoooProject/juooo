<template>
    <div class="wrapper">
        <div class="navbar">
            <div class="navbar-inner">
                <span class="icon ion-ios-arrow-left" @click="goToLast"></span>
                <div class="navbar-center">
                    选择票价
                </div>
            </div>
        </div>
        <div class="spot-select-box">
            <div class="spot-select-title">
                选择场次
            </div>
            <div class="spot-select-list">
                <ul>
                    <li :class="{'item-active':currentIndex===index}" class="spot-item" style="list-style: none" v-for="(item,index) in arr1" @click="spotSelect(index)">
                        <span class="spot-date">{{item.date}}</span>
                        <span class="spot-time">{{item.time}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="price-select-box">
            <div class="price-select-title">
                选择票价
            </div>
            <div class="price-select-list" v-for="(item,index) in arr2" v-show="currentIndex==index">
                <ul>
                    <div class="price-item" v-for="(ii,index2) in item" @click="priceSelect(ii,index2)"  :class="{'item-active':ii.show}"  :key="index2">
                        <span>￥</span>
                        <span>{{ii.price}}</span>
                    </div>
                </ul>
            </div>
        </div>
        <div class="sele-tickets">
            <div class="row" v-for="(item,index) in goodsList">
                <span class="shopCarList-price">{{item.price}}</span>
                <div class="operate">
                    <span class="minus">
                        <i class="icon ion-minus" @click="reduceCount(index)"></i>
                    </span>
                    <span class="shopCarList-count">{{item.count}}</span>
                    <span class="plus" @click="addCount(index)"><i class="icon ion-plus"></i></span>
                    <span class="line"></span>
                    <span class="delete" @click="deleteGood(index)"><i class="icon ion-trash-a"></i></span>
                </div>
            </div>
        </div>
        <div class="buyNow-footer">
            <div class="buy-info">
                <span></span>
                <div class="ticketCount"><div class="t-num">{{totalCount}}</div>张</div>
                <span class="line"></span>
                <div class="allPrice">￥<div class="p-num">{{totalPrice}}</div></div>
            </div>
            <div class="buy-button" @click="goToBuy">
                确定
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "buyNow",
        data(){
            return{
                currentIndex:0,
                priceIndex:false,
                arr1:[{date:'2018.10.03',time:"周三 19.30"},{date:'2018.10.03',time:"周三 19.30"},{date:'2018.10.03',time:"周三 19.30"}],
                arr2:[[180,280,480,680,880,199],[180,280,480,680,880],[180,280,480,680,880]],
                goodsList:[],
                priceArr:[]
            }
        },
        computed:{
            totalPrice() {
                let total = 0;
                if(this.goodsList!={}){
                    this.goodsList.forEach((good) => {
                        if (good.count) {
                            total += good.price * good.count
                        }
                    })
                }
                return total
            },
            totalCount() {
                let count = 0;
                if(this.goodsList!={}){
                    this.goodsList.forEach((good) => {
                        if (good.count) {
                            count+=good.count
                        }
                    })
                }
                return count
            },
        },
        created(){
            this.$http.get("/api/all").then(({data})=> {
                if (data.status) {
                    console.log(data);
                    var res = [];
                    res=data.allList.filter((value,index) =>{
                        return value.id==this.$route.query.id;
                    })
                    this.priceArr = res[0].site.price;
                    console.log(this.priceArr);
                }
            });
            var temp = []
            this.arr2.forEach((arr)=>{
                let pArr = [];
                arr.forEach((item)=>{
                    let obj = {};
                    obj.price = item;
                    obj.show = false;
                    pArr.push(obj)
                })
                temp.push(pArr)
            })
            this.arr2 = temp;
        },
        methods:{
            clearActive(){
                this.arr2.forEach((item)=>{
                    item.forEach((i)=>{
                       i.show = false;
                    })
                })
            },
            spotSelect(index){
                this.goodsList = [];
                this.$nextTick(()=>{
                    this.clearActive();
                })
                this.currentIndex = index;
            },
            priceSelect(item,index2){
               let obj = {};
               obj.price = item.price;
               obj.count = 1;
               obj.id = index2;
               // console.log(obj)
               if(this.goodsList.length<6){
                   if(this.totalCount<6){
                       if(item.show!=true){
                           this.goodsList.push(obj);
                           item.show = true;
                       }

                   }else{
                       alert('限购6张')
                   }

               }
            },
            addCount(index){
                if(this.totalCount<6){
                    if(this.goodsList[index].count<6){
                        this.goodsList[index].count++;
                    }
                }
                console.log(this.totalCount)

            },
            reduceCount(index){
                if(this.totalCount>0){
                    if(this.goodsList[index].count>1){
                        this.goodsList[index].count--;
                    }

                }

            },
            deleteGood(index){
                console.log(this.goodsList[index].id);
                console.log(this.arr2)
                this.arr2[this.currentIndex][this.goodsList[index].id].show = false;
                this.goodsList.splice(index,1);
            },
            goToLast(){
                //this.$router.go(-1);
                this.$router.push({
                    path:"/ticket",
                    query:{
                        id:this.$route.query.id
                     }
                })
            },
            goToBuy(){
                console.log(1)
                this.$nextTick(()=>{
                    this.$store.commit('calculateTotalPrice',{
                        totalPrice:this.totalPrice,
                        totalCount:this.totalCount
                    })
                })
                this.$router.push({
                    path:"/orderGoods",
                    query:{
                        id:this.$route.query.id
                    }
                })
            }
        }

    }
</script>

<style scoped lang="less">
        .wrapper{
            position: relative;
            z-index: 10;
            background: #f6f6f6;
            height: 1334px;
            width: 750px;
            text-align: left;
            .navbar{
                background: white;
                width: 100%;
                height: 87px;
                border-bottom: 1px solid #e7e7e7;
                position: relative;
                .navbar-inner{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    padding: 0 56px;
                    .icon{
                        line-height: 87px;
                        display: inline-block;
                        font-size: 60px;
                    }
                    .navbar-center{
                        height: 100%;
                        line-height: 87px;
                        font-size: 34px;
                        color: #212121;
                        width: 100%;
                        text-align: center;
                        font-weight: 500;
                    }
                }
            }
            .spot-select-box{
                width: 730px;
                padding: 35px 0 30px 20px;
                background: white;
                margin-top: 22px;
                .spot-select-title{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    font-size: 28px;
                    color: #666;
                    font-weight: 500;
                }
                .spot-select-list{
                    width: 100%;
                    ul{
                        overflow: hidden;
                        .spot-item{
                            width: 218px;
                            height: 98px;
                            border: 2px solid #ebebeb;
                            border-radius: 5px;
                            margin-top: 25px;
                            text-align: center;
                            font-size: 28px;
                            float: left;
                            margin-right: 25px;
                            .spot-time{
                                font-size: 26px;
                                margin-top: 10px;
                                display: block;
                            }
                            .spot-date{
                                display: block;
                                margin-top: 15px;
                            }
                            &.item-active{
                                border: none;
                                font-weight: 700;
                                font-size: 30px;
                                background: #ff7919;
                                color: white;
                                width: 218px;
                                height: 98px;
                                border-radius: 4px;
                            }
                        }
                        .spot-item:nth-child(3n){
                            margin-right: 0;
                        }
                    }
                }
            }
            .price-select-box{
                margin-top: 22px;
                width: 730px;
                padding: 35px 0 30px 20px;
                background: white;
                .price-select-title{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    font-size: 28px;
                    color: #666;
                    font-weight: 500;
                }
                .price-select-list{
                    width: 100%;

                    ul{
                        overflow: hidden;
                        .price-item{
                            width: 218px;
                            height: 98px;
                            border: 2px solid #ebebeb;
                            border-radius: 5px;
                            margin-top: 25px;
                            text-align: center;
                            font-size: 28px;
                            line-height: 98px;
                            display: flex;
                            justify-content: center;
                            float: left;
                            margin-right: 25px;
                            span{
                                display: block;
                            }
                            &.item-active{
                                border: none;
                                font-weight: 700;
                                font-size: 30px;
                                background: #ff7919;
                                color: white;
                                width: 218px;
                                height: 98px;
                                border-radius: 4px;
                            }
                        }
                        .price-item:nth-child(3n){
                            margin-right: 0;
                        }

                    }

                }
            }
            .sele-tickets{
                width: 100%;
                box-shadow: 4px 29px 65px #333;
                background: white;
                position: absolute;
                bottom: 150px;
                .row{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #333;
                    height: 100px;
                    font-size: 30px;
                    font-weight: 500;
                    width: 650px;
                    margin: 0 20px;
                    padding: 0 30px;
                    border-top: 1px dashed #ccc;
                    .minus{
                        color: #e6e6e6;
                        font-size: 30px;
                        display: inline-block;
                    }
                    .plus{
                        font-size: 30px;
                        color: #666;
                        display: inline-block;
                    }
                    .line{
                        width: 2px;
                        display: inline-block;
                        background: #ebebeb;
                        height: 32px;
                        margin: 0 20px;
                    }
                    .shopCarList-count{
                        color: gray;
                        width: 40px;
                        text-align: center;
                        display: inline-block;
                        padding-bottom: 20px;
                        margin: 0 10px;
                        font-weight: 700;
                    }
                    .delete{
                        display: inline-block;
                        font-size: 40px;
                        color: #b1b1b1;
                    }
                }
            }
            .buyNow-footer{
                border-top: 1px solid #ebebeb;
                position: fixed;
                bottom: 0;
                width: 100%;
                display: flex;
                justify-content: space-between;
                height: 110px;
                z-index: 150;
                line-height: 100px;
                background: white;
                .buy-info{
                    width: 339px;
                    padding: 0 76px 0 35px;
                    height: 100%;
                    display: flex;
                    font-size: 34px;
                    justify-content: space-between;
                    .ticketCount{
                        width: 100px;
                        line-height: 110px;
                        .t-num{
                            display: inline-block;
                        }
                    }
                    .allPrice{
                        color: #ff7919;
                        width: 160px;
                        line-height: 100px;
                        .p-num{
                            height: 100px;
                            line-height: 110px;
                            display: inline-block;
                        }
                    }
                    .line{
                        width: 1px;
                        height: 30px;
                        background: #dbdbdb;
                        margin-top: 35px;
                    }
                }
                .buy-button{
                    width: 300px;
                    background: #ff7919;
                    color: #fefefe;
                    line-height: 110px;
                    height: 110px;
                    font-size: 34px;
                    text-align: center;
                    font-weight: 700;
                }
            }
        }

</style>