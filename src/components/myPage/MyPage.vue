<template>
        <div class="my-page" ref="myPage">
            <div class="my-page-wrapper">
                <div class="my-header">
                    <div class="header-wrapper">
                        <div class="avatar">
                            <img height="40" width="40" src="https://m.juooo.com/public/basic/Home/app/app-juooo4/images/common/logo-user.png" alt="">
                        </div>
                        <div class="name">
                            <div class="phone">
                                <span class="number">{{username}}</span>
                                <i class="icon ion-person-stalker"></i>
                                <span class="text">普通用户</span>
                            </div>
                            <div class="idnum">
                                <span>ID:</span>
                                <span>6060822</span>
                            </div>
                        </div>
                        <router-link :to="{path:'/mine/accountSetting',query:{username:username}}" class="icon ion-chevron-right"></router-link>
                    </div>
                </div>
                <div class="my-wealth">
                    <div class="wealth-wrapper">
                        <div class="over v-block">
                            <span class="imp">0.00元</span>
                            <span>余额</span>
                        </div>
                        <div class="integral v-block">
                            <span class="imp">22分</span>
                            <span>积分</span>
                        </div>
                        <div class="cards v-block">
                            <span class="imp">0张</span>
                            <span>橙卡</span>
                        </div>
                        <div class="coupon v-block">
                            <span class="imp">0张</span>
                            <span>优惠券</span>
                        </div>
                    </div>
                </div>
                <div class="my-floor">
                    <div class="order box">
                        <i class="icon ion-ios-briefcase-outline left"></i>
                        <span class="text">我的订单</span>
                        <span>待付款<span>0</span>/待收货<span>0</span></span>
                        <i class="icon ion-chevron-right right"></i>
                    </div>
                    <div class="cards box">
                        <i class="icon ion-bag left"></i>
                        <span class="text">我的卡包</span>
                        <span>了解详情</span>
                        <i class="icon ion-chevron-right right"></i>
                    </div>
                    <div class="vipcenter box">
                        <i class="icon ion-android-contact left"></i>
                        <span class="text">会员中心</span>
                        <i class="icon ion-chevron-right right"></i>
                    </div>
                    <div class="attension box">
                        <i class="icon ion-ios-star left"></i>
                        <span class="text">我的关注</span>
                        <i class="icon ion-chevron-right right"></i>
                    </div>
                    <div class="address box">
                        <i class="icon ion-location left"></i>
                        <span class="text">收货地址</span>
                        <i class="icon ion-chevron-right right"></i>
                    </div>
                    <div class="message box">
                        <i class="icon ion-ios-email-outline left"></i>
                        <span class="text">我的消息</span>
                        <i class="icon ion-chevron-right right"></i>
                    </div>
                    <div class="return box">
                        <i class="icon ion-android-chat left"></i>
                        <span class="text">意见反馈</span>
                        <i class="icon ion-chevron-right right"></i>
                    </div>
                    <div class="phone box">
                        <i class="icon ion-ios-telephone left"></i>
                        <span class="text">联系电话</span>
                        <span>400-185-8666</span>
                        <i class="icon ion-chevron-right right"></i>
                    </div>
                    <!--<div class="service-online">-->
                        <!--<i class="icon ion-android-microphone"></i>-->
                        <!--<span class="service">在线客服</span>-->
                    <!--</div>-->
                </div>
            </div>
            <router-view></router-view>
            <foot></foot>
        </div>

</template>

<script>
    import BScroll from 'better-scroll'
    import Split from '../split/Split'
    import Foot from "../foot/foot"
    export default {
        name: "MyPage",
        components:{
            Split,
            Foot
        },
        data(){
            return{
               username:""
            }
        },
        created(){
            this.$nextTick(() => {
                this.username = sessionStorage.getItem("user");
                new BScroll(this.$refs.myPage,{
                    click:true
                })
            })

        },
        mounted(){

        }
    }
</script>

<style scoped lang="less">
.my-page{
    position: relative;
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    /*overflow: scroll;*/
    z-index: 11;
    .my-header{
        width: 100%;
        height: 200px;
        background: url("integral.jpg");
        background-size: 100% 200px;
        background-repeat: no-repeat;
        .header-wrapper{
            display: flex;
            padding: 50px 30px;
            .avatar{
                flex: 0 0 100px;
                height: 100px;
                width: 100px;
                border-radius: 50%;
                background: #f5f5f5;
                &>img{
                    display: block;
                    border-radius: 50%;
                    margin: 10px;
                }
            }
            .name{
                flex: 1;
                padding: 0 25px;
                text-align: left;
                .phone{
                    height: 40px;
                    margin-top: 10px;
                    line-height: 40px;
                    margin-bottom: 10px;
                    color: #fff;
                    .number{
                        display: inline-block;
                        margin-right: 10px;
                        font-size: 30px;
                        font-weight: 700;
                    }
                    .icon{
                        color: rgba(47,53,59,0.5);
                        font-size: 20px;
                    }
                    .text{
                        display: inline-block;
                        padding:0 5px;
                        -webkit-border-radius: 2px;
                        -moz-border-radius: 2px;
                        border-radius: 2px;
                        font-size: 26px;
                        font-weight: 500;
                        background: darkgray;
                    }
                }
                .idnum{
                    font-size: 26px;
                    font-weight: 600;
                    height: 30px;
                    line-height: 30px;
                    color: #fff;
                }
            }
            .ion-chevron-right{
                flex: 0 0 50px;
                line-height: 100px;
                height: 100px;
                font-size: 24px;
                color: #fff;
            }
        }
    }
    .my-wealth{
        background: #fff;
        width: 100%;
        .wealth-wrapper{
            padding: 30px 0;
            display: flex;
            &>div{
                flex:1;
                border-right: 1px solid rgba(7,17,27,0.3);
                &:last-child{
                    border: none;
                }
            }
            .v-block{
                font-weight: 700;
                &>span{
                    display: block;
                    color: #8c8c8c;
                    font-size: 24px;
                    height: 30px;
                    line-height: 30px;
                }
                .imp{
                    font-size: 30px;
                    color: #ff7919;
                    margin-bottom: 10px;
                }
            }
        }
    }
    .my-floor{
        margin-top: 25px;
        .box{
            display: flex;
            background: #fff;
            padding: 30px;
            margin-bottom: 20px;
            text-align: left;
            color: #999;
            font-weight: 500;
            .left{
                flex: 0 0 50px;
                display: inline-block;
                text-align: left;
                font-size: 24px;
            }
            .text{
                flex: 1;
                font-size: 28px;
                display: inline-block;
            }
            .right{
                flex: 0 0 50px;
                display: inline-block;
                text-align: right;
                font-size: 20px;
            }
        }
        .service-online{
            width: 70%;
            margin-left: 15%;
            height: 78px;
            line-height: 78px;
            font-size: 30px;
            background: #fff;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            color: #ff7919;
            .icon{
                display: inline-block;
            }
            .service{
                display: inline-block;
            }
        }
    }
}
</style>