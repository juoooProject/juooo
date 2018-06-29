<template>
    <div class="tourWrap">
        <div class="navbar">
            <div class="navber-left" @click="goToLast"><span class="icon ion-ios-arrow-left"></span></div>
            <div class="navbar-center">巡演详情</div>
        </div>
        <div class="wrapper">
            <div class="header">
                <article class="poster_wrapper">
                    <img :src="all.imgUrl" alt="" class="poster">
                    <div class="poster_bg"></div>
                    <!--<div class="bg"></div>-->
                    <div class="poster_bg_footer"></div>
                    <div class="bg_shadow"></div>
                    <div class="poster_img">
                        <div class="img_bg">
                            <span></span>
                        </div>
                        <a>{{siteArr.length}}场巡演</a>
                    </div>
                </article>
            </div>
            <article class="title">
                <h3>{{all.title}}</h3>
                <div class="date-time">时间：<span class="time">{{all.timePeriod}}</span></div>
            </article>
            <article class="round-list">
                <ul class="round-list-wrapper">
                    <li class="round-item" v-for="(item,index) in siteArr">
                        <div class="round-item-left" :class="{active:item.curFlag}">
                            <span class="round-item-day">{{item.date}}</span>
                            <span class="round-item-time">{{item.time}}</span>
                        </div>
                        <div class="round-item-center">
                            <div class="line"></div>
                            <div class="dot" :class="{active:item.curFlag}"></div>
                        </div>
                        <div class="round-item-right">
                            <span>{{item.city}}站</span>
                            <span class="round-item-locate">
                                <i class="icon ion-location" style="font-size: 20px"></i>   {{item.place}}
                            </span>
                        </div>
                        <div class="buy-btn" v-show="item.realTime>=item.nowTime">购票</div>
                    </li>
                </ul>
            </article>
        </div>

    </div>
</template>

<script>
    export default {
        name: "tourInfo",
        data(){
            return{
                arr:[{
                    "price": [200, 480],
                    "_id": "5b29d069fd830d0415387452",
                    "time": "19:30",
                    "date": "2018-07-02",
                    "place": "合肥瑶海大剧院",
                    "city": "合肥"
                }, {
                    "price": ["100", "180", "280", "480", "481"],
                    "_id": "5b29d069fd830d0415387451",
                    "time": "19:30",
                    "date": "2018-07-03",
                    "place": "星海音乐厅交响乐演奏厅",
                    "city": "广州"
                }, {
                    "price": ["100", "180", "280", "480"],
                    "_id": "5b29d069fd830d0415387450",
                    "time": "19:00",
                    "date": "2018-07-21",
                    "place": "豫珑剧场",
                    "city": "沈阳"
                }, {
                    "price": ["100", "180", "280", "459", "480"],
                    "_id": "5b29d069fd830d041538744f",
                    "time": "19:30",
                    "date": "2018-11-23",
                    "place": "重庆文化宫大剧院",
                    "city": "重庆"
                }],
                siteArr:[],
                all:{}
            }
        },
        computed:{

        },
        created(){
            this.$http.get("/api/performances").then(({data})=> {
                if (data.status) {
                    var res = [];
                    res=data.allList.filter((value,index) =>{
                        return value._id==this.$route.query.tid;
                    })
                    this.siteArr=res[0].siteAll;
                    this.all=res[0];
                    this.siteArr.forEach((value,index)=>{
                        var str1 = value.date;
                        var str2 = value.time;
                        var str = str1 + " " + str2;
                        var date =  new Date(str);
                        var time = date.getTime();
                        value.realTime=time;
                        var now = new Date();
                        value.nowTime = now.getTime();
                        value.curFlag=false;
                    })
                    function compare(property){
                        return function(a,b){
                            var value1 = a[property];
                            var value2 = b[property];
                            return value1 - value2;
                        }
                    }
                    this.siteArr=this.siteArr.sort(compare('realTime'))
                    for(var i = 0;i < this.siteArr.length;i++){
                         if(this.siteArr[i].realTime>=this.siteArr[i].nowTime){
                             this.siteArr[i].curFlag=true;
                             return;
                         }
                    }
                }


            });

            this.arr.forEach((item)=>{
                item.date.split(4,5)
            })
        },
        methods:{
            goToLast(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped lang="less">
    .tourWrap{
        width: 100%;
        height: 100%;
        overflow: scroll;
        .navbar{
            position: fixed;
            top: 0;
            display: flex;
            align-items: center;
            width: 688px;
            height: 87.984px;
            padding: 0 32px 0 30px;
            font-size: 40px;
            color: white;
            z-index: 10000;
            .navbar-center{
                width: 200px;
                text-align: right;
                margin: auto;
            }

        }
        .wrapper{
            background: #F4F4F4;
            position: relative;
            z-index: 1000;

        .header{
            .poster_wrapper{
                width: 100%;
                height: 528px;
                overflow: hidden;
                .bg{
                    width: 100%;
                    height: 400px;
                    background: url("http://image.juooo.com/group1/M00/01/4B/rAoKmVsfYbqAL4ajAADbe6bTnfc233.jpg");
                    background-size: cover;
                    filter: blur(.5333rem);
                    position: absolute;
                    top: 0;
                }
                .bg_shadow{
                    width: 100%;
                    height: 500px;
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
                    z-index: 2;
                }
                .poster_img{
                    position: relative;
                    z-index: 30;
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
                    a{
                        position: absolute;
                        border: 1.1px solid #dadada;
                        border-radius: 8px;
                        padding: 10px;
                        display: block;
                        right: 20px;
                        font-weight: 700;
                        line-height: 40px;
                        font-size: 27.5px;
                        bottom: 95px;
                        color: #dadada;
                    }
                }
            }
        }
        .title{
            width: 700px;
            background: white;
            padding: 0 20px 10px 30px;
            text-align: left;
            h3{
                font-size: 33px;
                line-height: 45px;
                font-weight: 400;
                margin-bottom: 25px;
            }
            .date-time{
                font-size: 28px;
                padding-bottom: 10px;
                color: #666;
                line-height: 50px;
                font-weight: 500;
            }
        }
            .round-list{
                width: 750px;
                padding-top: 20px;
                margin-top: 20px;
                background: white;
                .round-item{
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    /*padding-top: 35px;*/

                    .round-item-left{
                        padding-top: 10px;
                        width:150px;
                        height: 155px;
                        text-align: center;
                        &.active{
                            color: #ff7919;
                        }
                        .round-item-day{
                            padding-top: 25px;
                            width: 150px;
                            display: block;
                            line-height: 40px;
                            font-size: 20px;
                            font-weight: 500;
                        }
                        .round-item-time{
                            width: 150px;
                            display: block;
                            font-size: 24px;
                        }
                    }
                    .round-item-center{
                        padding-top: 10px;
                        position: relative;
                        width: 30px;
                        .line{
                            width: 2px;
                            height: 100%;
                            background: #e6e6e6;
                            position: absolute;
                            margin-left: 14px;
                        }
                        .dot{
                            width: 12px;
                            height: 12px;
                            border-radius: 50%;
                            position: absolute;
                            background: #e6e6e6;
                            right: 0;
                            left: 8px;
                            &.active{
                                width: 14px;
                                height: 14px;
                                background: #ff7919;
                            }
                        }
                    }
                    .round-item-right{
                        padding-top: 20px;
                        width: 530px;
                        height: 114px;
                        border-bottom: 1px solid #e6e6e6;
                        padding-left: 20px;
                        margin-right: 20px;
                        text-align: left;
                        font-size: 30px;
                        .round-item-locate{
                            padding-top: 14px;
                            display:block;
                            font-size: 26px;
                            text-overflow: ellipsis;
                            padding-top: 14px;
                            width: 400px;
                            height: 68px;
                            color: #666;
                        }
                    }
                    .buy-btn{
                        position: absolute;
                        right: 30px;
                        bottom: 30px;
                        height: 50px;
                        line-height: 50px;
                        background: #ff7919;
                        border-radius: 6px;
                        color: white;
                        padding: 0 27px;
                        margin-bottom: 30px;
                    }
                }
            }
    }
    }
</style>