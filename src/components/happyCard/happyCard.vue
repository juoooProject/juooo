<template>
    <div class="happy-card">
        <div class="topbar">
            <span class="icon ion-ios-arrow-left" @click="goToLast"></span>
            <h3>欢聚橙卡</h3>
            <span class="icon ion-ios-more" @click="showCover=true"></span>
        </div>
        <div class="card-con">
            <div class="top-img">
                <img src="http://10.80.13.228:8088/img/happyCard.jpg" alt="">
                <span>我的卡包></span>
            </div>
            <ul class="vip-container">
                <li v-for="(item,index) in cardArr">
                    <img :src="item.imgSrc" alt="">
                    <div class="mask"></div>
                    <div class="card-box">
                        <div class="title">
                            <span>{{item.title}}</span>
                            <span>{{item.type}}</span>
                        </div>
                        <div class="supports">
                            <span v-for="supports in item.supports">{{supports}}</span>
                        </div>
                        <div class="time-limit">有效期：{{item.timeLimit}}</div>
                        <div class="price">
                            <div class="left">
                                <span>¥</span>
                                <span>{{item.price}}</span>
                            </div>
                            <div class="right">了解详情></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="cover-wrap" v-show="showCover" @click.stop.prevent="showCover=false">
            <ul class="selection" >
                <span class="tri"></span>
                <li>
                    <div @click.stop.prevent="goToHome">
                        <!--<span class="icon ion-android-person"></span>-->
                        <span class="icon ion-ios-home-outline"></span>
                        <span>首页</span>
                    </div>
                </li>
                <li>
                    <div @click.stop.prevent="goToMine">
                        <!--<span class="icon ion-android-home"></span>-->
                        <span class="icon ion-ios-person-outline"></span>
                        <span>我的聚橙</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "happy-card",
        data(){
            return{
                cardArr:[],
                showCover:false
            }
        },
        created(){
            this.$http.get("api/card").then(({data})=>{
                if(data.status){
                    this.cardArr=data.cardList;
                }
            }).catch((err)=>{
                console.error(err);
            })
        },
        methods:{
            goToLast(){
                this.$router.go(-1);
            },
            goToHome(){
                this.showCover=false;
                this.$router.push({
                    path:"/"
                })
            },
            goToMine(){
                this.showCover=false;
                this.$router.push({
                    path:"/mine"
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .happy-card{
        width: 100%;
        height: 100%;
        font-family:Arial,"微软雅黑",sans-serif;
        .topbar{
            position: fixed;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 87px;
            padding: 0 30px;
            .icon{
                display: inline-block;
                font-size: 60px;
            }
            h3{
                height: 48px;
                font-size: 35px;
                line-height: 48px;
            }
            span {
                font-size: 40px;
                height: 48px;
                line-height: 30px;
                text-align: center;
            }
        }
        .card-con{
            position: relative;
            top: 87px;
            width: 100%;
            height: 100%;
            overflow: scroll;
            .top-img{
                position: relative;
                width: 100%;
                height: 320px;
                img{
                    width: 100%;
                    height: 100%;
                }
                span{
                    position: absolute;
                    right: 0;
                    top: 30px;
                    display: block;
                    border-bottom-left-radius: 20px;
                    border-top-left-radius: 20px;
                    padding-left: 20px;
                    width:140px;
                    height:50px;
                    line-height: 50px;
                    font-size:24px;
                    color: #fff;
                    background: rgba(86,57,0,.5);
                    z-index: 20;
                }

            }
            .vip-container{
                padding: 30px;
                width: 100%;
                box-sizing: border-box;
                li{
                    position: relative;
                    width: 100%;
                    height: 360px;
                    margin-bottom:20px;
                    border-radius: 40px;
                    img{
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        opacity: .3;
                        z-index: -1;
                    }
                    .mask{
                        background: rgba(0,0,0,.1);
                        position: absolute;
                        z-index: 5;
                        width: 100%;
                        height: 100%;
                    }
                    .card-box{
                        padding:42px 37.5px 0 37.5px ;
                        box-sizing: border-box;
                        width: 100%;
                        height: 100%;
                        color: white;
                        background: rgba(240,135,51,0.8);
                        .title{
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                            margin-bottom: 25px;
                            span:first-child{
                                font-size: 40px;
                                font-weight: 700;
                                height: 50px;
                                line-height: 50px;
                            }
                            span:last-child{
                                font-size: 28px;
                                height: 37px;
                                line-height: 37px;
                            }
                        }
                        .supports{
                            width: 100%;
                            margin-bottom: 15px;
                            text-align: left;
                            span{
                                display: inline-block;
                                padding:0 10px;
                                margin-right: 12px;
                                margin-bottom:8px;
                                border-radius: 5px;
                                background-color:rgba(255,255,255,.2);
                                height: 40px;
                                font-size: 24px;
                                line-height: 40px;

                            }
                        }
                        .time-limit{
                            text-align: left;
                            height: 40px;
                            padding: 0 5px 15px;


                        }
                        .price{
                            display: flex;
                            justify-content: space-between;
                            margin-top: 60px;
                            .left{
                                span:first-child{
                                    font-size: 20px;
                                }
                                span:last-child{
                                    font-size: 35px;

                                }
                            }
                            .right{
                                font-size: 30px;
                                height: 54px;
                                line-height: 54px;
                                border: 1px solid white;
                                text-align: center;
                                border-radius: 10px;
                            }

                        }
                    }
                }

            }
        }
        .cover-wrap{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.6);
            display: inline;
            z-index: 25;
            .selection{
                position: absolute;
                right: 16px;
                top: 90px;
                width: 280px;
                height: 177px;
                padding: 6px 12px;
                background-color: #fff;
                border-radius: 10px;
                .tri{
                    position: absolute;
                    top: -10px;
                    right: 20px;
                    width: 10px;
                    height: 10px;
                    border-left: .21333rem solid transparent;
                    border-right: .21333rem solid transparent;
                    border-bottom: .21333rem solid #fff;
                }
                li{
                    box-sizing: border-box;
                    width: 100%;
                    padding: 0 30px;
                    height: 87px;
                    div{
                        display: flex;
                        align-items: center;
                        width: 100%;
                        height: 100%;
                        text-align: left;
                        .icon{
                            display: inline-block;
                            margin-right: 30px;
                            color: #b2b2b2;
                            font-size: 40px;
                            vertical-align: middle;
                        }
                        span:last-child{
                            font-size: 28px;
                            height: 40px;
                            line-height: 40px;
                            text-align:center;
                            vertical-align: middle;
                        }
                    }
                }
            }

        }
    }
</style>