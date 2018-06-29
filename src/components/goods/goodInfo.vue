<template>
    <div class="root" ref="ticketWrap">
        <div class="ticketCon">
         <div class="goods_navbar">
            <div class="goods_navbar_inner">
                 <div class="left" @click="goToLast"><a><span class="icon ion-ios-arrow-left" style="font-size: 28px"></span></a></div>
                <div class="center">演出详情</div>
                <div class="right" @click="showMask"><div class="link"><span class="icon-more">...</span></div></div>
            </div>
        </div>
        <div class="wrapper" v-if="ticketCon.other">
            <article class="poster_wrapper">
                <img :src="ticketCon.other.imgUrl" alt="" class="poster">
                <div class="poster_bg"></div>
                <div class="poster_bg_footer"></div>
                <div class="bg_shadow"></div>
                <div class="poster_img">
                    <div class="img_bg">
                        <span></span>
                    </div>
                    <div class="tour" @click="goToTour">{{showCount}}场巡演</div>
                </div>
            </article>
            <article class="text_desc">
                <h3 class="title">{{ticketCon.other.title}}-{{ticketCon.site.city}}站</h3>
                <div class="row">时间:<span class="time">{{ticketCon.other.timePeriod}}</span></div>
                <div class="row">场馆:<a class="place">{{ticketCon.site.place}}</a></div>
                <div class="row price"><i>¥</i><span class="num">{{ticketCon.site.price[0]}}-{{ticketCon.site.price[priceLen-1]}}</span></div>
                <div class="support" v-if="ticketCon.other.cards.length>0"><div class="support_inner">支持：<span v-for="item in ticketCon.other.cards">{{item}}</span></div></div>
                <div class="vipcard" @click="vipShow">
                    <div class="vipleft" v-if="ticketCon.other.cards.length>0">
                        <div>欢聚橙卡：</div>
                        <span v-for="item in ticketCon.other.supports">{{item}}</span>
                    </div>
                    <div class="vipright" v-if="ticketCon.other.cards.length>0">
                        ...
                    </div>
                </div>
            </article>
            <div class="discount"></div>
            <article class="brief-intro">
                <h3>— 演出介绍 —</h3>
                <p class="brief-txt" v-show="briefShow">{{ticketCon.other.title}}</p>
                <span @click="briefShow=false" class="go-detail" v-show="briefShow">查看详情 <span class="icon ion-ios-arrow-down"></span></span>
            </article>
            <div class="detail-intro" v-show="!briefShow">
                <img :src="ticketCon.other.detail.performImgUrl" alt="">
                <p>{{ticketCon.other.detail.article}}</p>
            </div>
            <div class="discount2"></div>
            <article class="ticket-notice">
                <h3>— 购票须知 —</h3>
                <div class="ticket-txt">
                    <p>1.为避免快递配送不能及时到达，距演出开场时间少于3天不提供快递服务，您可以选择电子票或者在线支付后上门自取纸质票。（主办演出可在演出现场取票）。</p>
                    <p>2.网上订购请提前选择您意欲购买的演出和票品价位，根据流程提示完成订票。</p>
                    <p>3.成功下单后，我们将短信与你确认订单信息，如有任何疑问，请致电我们的客服热线：400-185-8666，客服人员将第一时间为您服务。</p>
                    <p>4.因票品的特殊性，一经订购，不退不换，请订票前务必确认购买意向。</p>
                </div>
                <div class="in-to-know">

                    入场须知：<span>1.1米以下儿童谢绝入场，1.1米以上儿童需持票入场</span>
                </div>
            </article>
        </div>
        <div class="goods_footer">
            <span class="service-btn">客服</span>
            <span class="buy-now" @click="goToPrice">立即购票</span>
            <span class="seat-online">在线选座</span>
        </div>
        <div class="empty"></div>


        <div class="mask" v-show="isShow" @click="hideMask">
        </div>

        <transition name="slide-fade">
            <div class="mask-link" ref="maskBox" v-show="masklinkShow">
                <div class="mask-triangle"></div>
                <span  class="mask-home" @click.stop.prevent="goToHome">
                    首页
                </span>
                <span class="mask-myinfo" @click.stop.prevent="goToMine">
                    我的聚橙
                </span>
                <div class="triangle">

                </div>
            </div>
        </transition>

        <transition name="slide-fade">
        <div class="hideVip" v-show="vipcardShow">
            <div class="hideVip-title">
                欢聚橙卡
                <span @click="hideMask" class="icon ion-ios-close-empty" style="font-size: 30px"></span>
            </div>
            <div class="hideVip-content">
                <div class="row" data-rule-id="231">
                    <span class="type">999聚橙会员储值卡</span>
                    <span class="txt">每单限购3张，限4单</span>
                    <span class="txt-right c-gray" >了解详情></span>
                </div>

                <div class="row" data-rule-id="235">
                    <span class="type">599聚橙会员储值卡</span>
                    <span class="txt">每单限购2张，限3单</span>
                    <span class="txt-right c-gray" >了解详情></span>
                </div>
            </div>
        </div>
        </transition>
    </div>

    </div>
</template>

<script>
    import BScroll from "better-scroll"
    export default {
        name: "goodInfo",
        components:{
        },
        data(){
            return{
                isShow:false,
                vipcardShow:false,
                masklinkShow:false,
                ticketCon:{},
                showCount:0,
                priceLen:0,
                briefShow:true
            }
        },
        created(){
            this.$http.get("/api/all").then(({data})=> {
                if (data.status) {
                   var res = [];
                   res=data.allList.filter((value,index) =>{
                        return value.id==this.$route.query.id;
                   })
                   this.ticketCon = res[0];
                   this.showCount=res[0].other.siteAll.length;
                   this.priceLen=res[0].site.price.length;

                }
            });

        },
        mounted(){
             this.$nextTick(()=>{
                 let ticketWrap = this.$refs.ticketWrap;
             })
            console.log($('.root'))
            $('.root').scroll(function () {
                console.log($('.root'))
                if($('.root').scrollTop()>10){
                    console.log($('.root').scrollTop())

                    $(".goods_navbar").css({
                        'background':'#fff',
                        'border-bottom':'1px solid #ebebeb',
                    });
                    $(".ion-ios-arrow-left").css('color','#212121')
                    $(".icon-more").css('color','#212121')
                    $(".center").css("display",'block')
                }else {
                    $(".goods_navbar").css({
                        'background':'transparent',
                        'border-bottom':'none',
                    });
                    $(".ion-ios-arrow-left").css('color','#fff')
                    $(".icon-more").css('color','#fff')
                    $(".center").css("display",'none')
                }
            })

        },
        methods:{
            showMask(){
                this.isShow = !this.isShow;
                this.masklinkShow = true;
            },
            hideMask(){
                this.isShow = !this.isShow;
                this.masklinkShow = false;
                this.vipcardShow=false;
            },
            vipShow(){
                this.vipcardShow=true;
                this.isShow = !this.isShow;
            },
            goToLast(){
                this.$router.push('/');
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
            },
            goToPrice(){
                this.$store.commit('saveOne',{
                    title:this.ticketCon.other.title,
                    city:this.ticketCon.site.city,
                    imgUrl:this.ticketCon.other.imgUrl,
                    place:this.ticketCon.site.place,
                    time:{
                        ymd:this.ticketCon.site.date,
                        ms:this.ticketCon.site.time
                    }
                })
                this.$router.push({
                    path:"/price",
                    query:{
                        id:this.$route.query.id
                    }
                })
            },
            goToTour(){
                this.$router.push({
                    path:"/tourInfo",
                    query:{
                        tid:this.ticketCon.other._id
                    }
                })
            }
        }
    }

</script>

<style scoped lang="less">
    .root{
        width: 100%;
        height: 100%;
        overflow: scroll;
        .ticketCon{
            .goods_navbar{
                height:87.98px;
                width: 100%;
                position: fixed;
                border-bottom: 0;
                background: 0 0;
                color: #fff;
                box-shadow: none;
                z-index: 50000000000000000000000;
                transition: all 1s cubic-bezier(0,0,.25,1);
                .goods_navbar_inner{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    position: relative;
                    left: 0;
                    top: 0;
                    padding: 0;
                    z-index: 50000000000000000;
                    justify-content: space-between;
                    align-items: center;
                    -webkit-box-pack: justify;
                    -webkit-box-align: center;
                    .left{
                        width: 120px;
                        height: 87.98px;
                        display: flex;
                        flex-shrink: 0;
                        -webkit-box-pack: start;
                        -webkit-box-align: center;
                        justify-content: flex-start;
                        align-items: center;
                        position: absolute;
                        a{
                            width: 120px;
                            height: 100%;
                            padding-left: 30px;
                            vertical-align: middle;
                            span{
                                vertical-align: text-top;
                                width: 40px;
                                height: 100%;
                                display: block;
                                font-size: 40px;
                                line-height: 87.98px;
                                color: white;
                            }
                        }
                    }
                    .center{
                        display: none;
                        position: absolute;
                        left: 120px;
                        width: 70%;
                        color: black;
                        line-height: 89.98px;
                        font-size: 34px;
                        height: 89.98px;
                    }
                    .right{
                        width: 120px;
                        height: 87.98px;
                        display: flex;
                        flex-shrink: 0;
                        -webkit-box-pack: start;
                        -webkit-box-align: center;
                        justify-content: flex-start;
                        align-items: center;
                        position: absolute;
                        right: 0;
                        top: 0;
                        .link{
                            width: 100px;
                            padding-left: 20px;
                            height: 100%;
                            vertical-align: middle;
                            span{
                                padding-right: 15px;
                                line-height: 49.98px;
                                display: block;
                                height: 100%;
                                font-size: 40px;
                                vertical-align: text-top;
                                color: white;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
            .wrapper{
                font-family:Arial,"微软雅黑",sans-serif;
                .poster_wrapper{
                    /*background: rgb(177, 124, 214);*/
                    position: relative;
                    width: 100%;
                    height: 528px;
                    overflow: hidden;
                    .bg_shadow{
                        width: 100%;
                        height: 500px;
                        z-index: 4;
                        background: rgba(0,0,0,0.4);
                        left: 0;
                        top: 0;
                        position: absolute;
                        overflow: hidden;
                    }
                    .poster{
                        width: 270px;
                        height: 372px;
                        position: absolute;
                        left: 235px;
                        top:114px;
                        z-index: 9;
                        border: .064rem solid #fff;
                        outline: 0;
                        -webkit-tap-highlight-color:transparent;
                        padding: 0;
                        margin: 0;
                    }
                    .poster_bg_footer{
                        overflow: hidden;
                        position: relative;
                        top: 430px;
                        left: -25%;
                        width: 150%;
                        height: 120px;
                        background: white;
                        border-radius: 50%;
                        z-index: 5;
                    }
                    .poster_img{
                        position: relative;
                        z-index: 29;
                        display: flex;
                        width: 100%;
                        height: 372px;
                        justify-content: center;
                        padding: 0;
                        margin: 0;
                        top: -6px;
                        .img_bg{
                            position: relative;
                            padding: 2px;
                            border: 3px solid #fff;
                            width: 270px;
                            z-index: 4;
                            height: 378px;
                            span{
                                width: 57.98px;
                                height: 69.98px;
                                display: block;
                                position: absolute;
                                top: 0;
                                right: 0;
                                background: url("https://m.juooo.com/public/basic/Home/app/app-juooo4.2/images/juooo.png") no-repeat;
                                background-size: 100%;
                            }
                        }
                        &:after{
                            position: absolute;
                            margin: auto;
                            bottom: -10px;
                            width: 414.984px;
                            height: 39px;
                            background-size: 100% 100%;
                            content: "";
                            background: url("https://m.juooo.com/public/basic/Home/app/app-juooo4.2/images/shadow.png");
                        }
                        .tour{
                            position: absolute;
                            border: 1.1px solid #dadada;
                            border-radius: 8px;
                            padding:0 10px;
                            display: block;
                            right: 20px;
                            font-weight: 700;
                            height: 48px;
                            line-height: 48px;
                            font-size: 27.5px;
                            bottom: 95px;
                            color: #dadada;
                        }
                    }
                }
                .text_desc{
                    padding: 20px;
                    padding-left: 30px;
                    margin-top: -10px;
                    text-align: left;
                    h3{

                        font-size: 34px;
                        text-overflow:ellipsis;
                        margin-bottom: 25px;
                        font-weight: bold;
                        -webkit-line-clamp:3;
                        -webkit-box-orient: vertical;
                        word-break:break-word;
                        line-height: 49px;
                        text-align: left;

                        margin-bottom: 20px;
                    }
                    .row{
                        color: #666;
                        text-align: left;
                        font-size: 30px;
                        height: 40px;
                        line-height: 40px;
                        margin-bottom: 10px;
                        font-weight: bold;
                        a{
                            color: #666;
                            height: 40px;
                            line-height: 40px;
                            font-size: 30px;

                        }
                    }
                    .price{
                        font-size: 37px;
                        color: #ff7919;
                        margin-top: 20px;
                        .num{
                            font-weight: 600;
                            padding-left: 15px;
                        }
                    }
                    .support{
                        border-top:2px dashed #ccc;
                        border-bottom:2px dashed #ccc;
                        color: #999;
                        font-size: 27px;
                        font-weight: bold;
                        line-height: 80px;
                        span{
                            display: inline-block;
                            margin-left: 13px;
                            padding: 0 5px;
                            height: 30px;
                            color: #ff7919;
                            border: 2px solid #ff7919;
                            border-radius: 3px;
                            font-size: 12px;
                            line-height: 30px;
                            margin-left: 13px;
                        }
                    }
                    .vipcard{
                        border-bottom:2px dashed #ccc;
                        .vipleft{
                            display: inline-block;
                            div{
                                display: inline-block;
                                color: #999;
                                font-size: 27px;
                                font-weight: bold;
                                line-height: 80px;
                            }
                            span{
                                display: inline-block;
                                margin-left: 13px;
                                padding: 0 5px;
                                height: 30px;
                                color: #ff7919;
                                border: 2px solid #ff7919;
                                border-radius: 3px;
                                font-size: 12px;
                                line-height: 30px;
                                margin-left: 13px;
                            }
                        }
                        .vipright{
                            float: right;
                            height: 46px;
                            line-height: 46px;
                            font-size: 50px;
                            color: #999;
                        }
                    }
                    .stu-approve{
                        margin-top: 25px;
                        margin-bottom: 20px;
                        padding: 10px;
                        width: 680px;
                        height: 80px;
                        line-height: 80px;
                        border: 2px solid #ffdfd7;
                        background: #fff2f2;
                        a{
                            display: block;
                            overflow: hidden;
                            width: 100%;
                            height: 100%;
                            img{
                                width: 40px;
                                height: 44px;
                                padding: 20px;
                                float: left;
                            }
                            .line{
                                float: left;
                                border-right: 2px solid #dedede;
                                color: #dedede;
                                height: 50px;
                                margin-top: 15px;
                                margin-left: 15px;
                                font-weight: lighter;
                            }
                            .go_to_approve{
                                float: left;
                                width: 510px;
                                height: 25px;
                                color: #666;
                                line-height: 25px;
                                padding: 15px 0px 0px 30px;
                                margin-bottom: 10px;
                                span{
                                    color: #fe5d36;
                                }
                            }
                        }
                    }
                }
                .discount{
                    width: 100%;
                    margin-top: -10px;
                    height: 20px;
                    background: #ECECEC;
                }
                .brief-intro{
                    width: 690px;
                    padding: 0 30px;
                    margin-top: 22px;
                    margin-bottom: 22px;
                    h3{
                        padding-top: 40px;
                        font-size: 32px;
                    }
                    .brief-txt{
                        padding-top: 20px;
                        line-height: 50px;
                        font-size: 28px;
                        color: #666;
                        font-family: Arial,"微软雅黑",sans-serif;
                        text-align: left;
                        font-weight: bold;
                        text-align: center;
                    }
                    .go-detail{
                        display: block;
                        margin-top: 45px;
                        margin-bottom: 40px;
                        color: #999;
                        font-size: 24px;
                    }
                }
                .detail-intro{
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                    padding: 0 30px 40px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                    p{
                        font-family: Arial,"微软雅黑",sans-serif;
                        text-align: left;
                        font-size: 28px;
                        line-height: 50px;
                        color: #666;
                        font-weight: bold;
                    }
                }

                .discount2{
                    width: 100%;
                    height: 22px;
                    background-color: #ececec;
                    margin-top: -22px;
                }
                .ticket-notice{
                    padding: 0 30px;
                    margin-bottom: 22px;
                    h3{
                        padding-top: 40px;
                        font-size: 32px;
                    }
                    .ticket-txt{
                        padding-top: 20px;
                        color: #666;
                        font-size: 28px;
                        text-align: left;
                        line-height: 50px;
                        font-weight: 500;
                    }
                    .in-to-know{
                        padding-top: 26px;
                        padding-bottom: 12px;
                        color: #999;
                        font-weight: 500;
                        font-size: 26px;
                        border-top: 2px dashed #ccc;
                        text-align: left;
                        line-height: 40px;
                        span{
                            color: #666;
                        }
                    }
                }
            }
            .goods_footer{
                background: white;
                position: fixed;
                z-index: 10000;
                width: 100%;
                height: 100px;
                bottom: 0;
                font-weight: 500;
                display: flex;
                .service-btn{
                    width: 130px;
                    height: 100%;
                    line-height: 100px;
                }
                .buy-now{
                    display: block;
                    height: 100%;
                    line-height: 100px;
                    text-align: center;
                    width: 310px;
                    font-size: 35px;
                    color: #666;
                }
                .seat-online{
                    display: block;
                    height: 100%;
                    line-height: 100px;
                    text-align: center;
                    width: 310px;
                    font-size: 35px;
                    color: #fff;
                    background: #ff7919;
                    font-weight: 700;
                }
            }
            .empty{
                width: 100%;
                height: 160px;
                background: #ececec;
            }
            .mask{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                z-index: 1000000000000000000000000000000000000;
                background: rgba(0,0,0,0.6);
            }
            .mask-link{
                width: 280px;
                height:176px;
                background: white;
                border-radius: 10px;
                position: fixed;
                right: 20px;
                top: 88px;
                z-index: 1000000000000000000000000000000000000000000000000000000000000000000;
                .mask-home{
                    width: 100%;
                    background: url("https://m.juooo.com/public/basic/Home/app/app-juooo4.2/images/house-icon.png");
                    background-size: 35px 32px;
                    background-repeat: no-repeat;
                    border-bottom: 1px solid #e7e7e7;
                    background-position: 35px 28px;
                }
                .mask-myinfo{
                    width: 100%;
                    background: url("https://m.juooo.com/public/basic/Home/app/app-juooo4.2/images/mine-icon.png");
                    background-size: 35px 32px;
                    background-repeat: no-repeat;
                    background-position: 35px 28px;
                }
                span{
                    width: 185px;
                    height: 86px;
                    padding-left: 95px;
                    display: block;
                    line-height: 86px;
                    font-size: 28px;
                    text-align: left;
                }
                .triangle{
                    position: absolute;
                    width: 0;
                    height: 0;
                    border: 12px solid #fff;
                    top: -10px;
                    right: 20px;
                    transform: rotate(45deg);
                }
            }

            .slide-fade-enter-active {
                transition: all .1s ease;
            }

            .slide-fade-enter
            {
                transform: translateY(100px);
                opacity: 1;
            }


            .hideVip{
                position: fixed;
                bottom: 0;
                width: 100%;
                height: 334px;
                background: white;
                z-index: 100000000000000;
                .hideVip-title{
                    text-align: center;
                    background: #fafafa;
                    width: 100%;
                    height: 100px;
                    line-height: 100px;
                    font-size: 34px;
                    color: #333;
                    font-weight: 500;
                    span{
                        position: absolute;
                        right: 20px;
                        top: 0;
                        display: block;
                        height: 100px;
                        line-height: 100px;
                    }
                }
                .hideVip-content{
                    padding-left: 32px;
                    padding-right: 20px;
                    .row{
                        height: 100px;
                        border-bottom: 2px dashed #ebebeb;
                        line-height: 100px;
                        text-align: left;
                        position: relative;
                        .type{
                            display: inline-block;
                            border: 1px solid #ff7919;
                            color: #ff7919;
                            height: 38px;
                            line-height: 38px;
                            font-size: 14px;
                            font-weight: 500;
                            padding: 0 10px;
                        }
                        .txt{
                            color: #666;
                            font-size: 28px;
                            font-weight: 500;
                            padding-left: 10px;
                        }
                        .txt-right{
                            color: #b3b3b3;
                            font-size: 24px;
                            font-weight: 700;
                            position: absolute;
                            right: 40px;
                        }
                    }
                }
            }
        }
    }

</style>