<template>
    <div class="timely-sale-wrapper">
        <div class="timely-sale">
            <div class="student-banner">
                <span class="icon icon-arrow_lift" @click="goToBack"></span>
                <span>秒杀专区</span>
                <div @click="isShowCover=true"><span></span><span></span><span></span></div>
            </div>
            <div class="student-lunbo" ref="lunbo">
                <div class="container">
                    <img src="https://m.juooo.com/public/basic//Home/app/app-juooo4.2/images/prefer/banner-seckill-20180417.jpg" alt="">
                </div>
            </div>
            <div class="doing-sale-wrapper">
                <div class="doing-time">
                    <ul>
                        <li v-for="(time,index) in timeArr" @click="boxShow(index)" :class="{arrowActive:timeShow[index]}">{{time}}</li>
                    </ul>
                </div>

                <div class="doing-time-detail" v-if="dateTmp.length>0" v-for="(date,index) in dateTmp" v-show="timeShow[index]">
                    <div class="doing-time-detail-nav"><div>{{date[1].site.time}}</div></div>

                    <div class="detail-wrapper" v-for="item in date">
                        <div class="doing-time-box">
                            <div class="box-left">
                                <img :src="item.other.imgUrl" alt="">
                            </div>
                            <div class="box-right">
                                <p>{{item.other.title}}</p>
                                <p>城市 : {{item.site.city}}</p>
                                <p>时间 : {{item.site.date}}</p>
                                <p>
                                    <span>¥ {{item.other.newPrice}}</span>
                                    <span>¥ {{item.other.oldPrice}}</span>
                                </p>
                            </div>
                            <div class="box-circle"></div>
                        </div>
                    </div>


                </div>


                <div class="guess-wrapper">
                    <div class="guess-title">猜你喜欢</div>
                    <div class="guess-title-box" ref="guess">
                        <div class="guess-title-con">
                            <div class="guess" v-for="(item,index) in tourList" v-if="index<6">
                                <div class="guess-pic">
                                    <img :src="item.imgUrl" alt="">
                                </div>
                                <p>{{item.title}}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>



        <cover-choose v-if="isShowCover" @isShow="getShow"></cover-choose>
    </div>
</template>

<script>
    import CoverChoose from "../coverChoose"
    import HotPerformance from "./hotPerformance"
    import BScroll from "better-scroll"
    export default {
        name: "timely-sale",
        components:{
            CoverChoose,
            HotPerformance
        },
        data(){
            return {
                isShowCover:false,
                month:new Date().getMonth()+1,
                day:new Date().getDate(),
                timeArr:[],
                tourList:[],
                timeList:[],
                dateTmp:[],
                placeTmp:[],
                timeShow:[true,false,false],
                guessList:[]
            }
        },
        created(){
            this.timeArr.push(this.month+"月"+this.day+"日",this.month+"月"+(this.day+1)+"日",this.month+"月"+(this.day+2)+"日");
            this.$http.get("api/performances").then(({data})=>{
                this.tourList = data.allList
                console.log(data)
                if(this.month/10 < 1){
                    this.month = "0"+this.month;
                }
                if(this.day/10 < 1){
                    this.day = "0"+this.day;
                }
                if (this.day > 30){
                    this.day = this.day - 30
                }
                console.log(this.month,this.day)


                var arr = [];
                data.allList.forEach((item,i)=>{
                    item.siteAll.forEach((value,index)=>{
                        let o = {};
                        o.site = value;
                        o.other = item;
                        arr.push(o)
                    })
                })
                this.timeList = arr;
                console.log(this.timeList)

                var arr1=[];
                var arr2=[];
                var arr3=[];

                this.timeList.forEach((city)=>{

                        if (this.month == city.site.date.substr(5,2) && this.day == city.site.date.substr(8,2)){
                            arr1.push(city)
                        }
                    if (this.month == city.site.date.substr(5,2) && this.day+1 == city.site.date.substr(8,2)){
                        arr2.push(city)
                    }
                    if (this.month == city.site.date.substr(5,2) && this.day+2 == city.site.date.substr(8,2)){
                        arr3.push(city)
                    }

                })

                this.dateTmp.push(arr1)
                console.log(arr1)

                this.dateTmp.push(arr2)

                this.dateTmp.push(arr3)

                console.log(this.dateTmp)

                this.$nextTick(()=>{
                    console.log(arr1[0].site.time.substr(3,2))
                    if(new Date().getHours() == arr1[0].site.time.substr(0,2) && new Date().getMinutes() == arr1[0].site.time.substr(3,2)){
                        $(".doing-time-detail-nav").find("div").eq(0).addClass("doing")
                        $(".box-circle").addClass("circle")
                    }else{
                        $(".doing-time-detail-nav").find("div").eq(0).addClass("dose")
                        $(".box-circle").addClass("circleDone")
                    }

                        $(".doing-time-detail-nav").find("div").eq(1).addClass("done")
                        $(".doing-time-detail-nav>div").eq(2).addClass("done")
                })

            })



        },

        methods:{
            getShow(bol){
                this.isShowCover =  bol;
            },
            goToBack(){
                this.$router.go(-1)
            },
            boxShow(num){
                this.timeShow = [];
                switch (num){
                    case 0:this.timeShow.push(true,false,false);
                    break;
                    case 1:this.timeShow.push(false,true,false);
                    break;
                    case 2:this.timeShow.push(false,false,true);
                    break;
                    default: this.timeShow.push(true,false,false);
                    break;
                }
            },

        },
        mounted(){
            new BScroll(this.$refs.guess,{
                scrollX:true,
            })


        }
    }
</script>

<style scoped lang="less">
    @import "../../css/style.css";

    .timely-sale-wrapper{
        background: #F3F4F3;
        height: 100%;
    }
    .timely-sale{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: scroll;
    }

    .student-banner{
        position: fixed;
        background: white;
        top: 0;
        left: 0;
        z-index: 555;
        width: 100%;
        height: 87px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon{
            display: inline-block;
            width: 20px;
            height: 20px;
            font-size: 0.36rem;
        }
        span:nth-child(2){
            font-weight: 700;
            font-size: 0.48rem;

        }
        div{

            /*margin-bottom: 0.4rem;*/
            span{
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: black;
                margin-right: 0.1rem;


            }
        }

    }

    .student-lunbo{
        position: relative;
        width: 100%;
        height: 400px;
        overflow: hidden;
        margin-top: 87px;
        .container{
            img{
                width: 100%;
                height: 400px;
            }
        }

    }

    .doing-sale-wrapper{
        .doing-time{
            ul{
                display: flex;
                justify-content: space-around;
                line-height: 70px;

                li{
                    width: 250px;
                    font-size: 28px;
                    font-weight: 500;
                    align-items: center;
                    background: black;
                    color: white;
                    position: relative;
                    &.arrowActive{
                        background: #F65F48;
                        color: white;
                        &:after{
                            content: "";
                            position: absolute;
                            bottom: -5px;
                            left: 0;
                            right: 0;
                            margin: auto;
                            width: 10px;
                            height: 10px;
                            transform: rotateZ(45deg);
                            background: #F65F48;
                        }
                    }
                }
            }
        }
        .doing-time-detail{
            .doing-time-detail-nav{
                width: 100%;
                height: 105px;
                background: white;
                text-align: left;
                padding: 0 20px;
                &>div{
                    width: 202px;
                    line-height: 105px;
                    font-size: 28px;
                    font-weight: 500;
                    padding-left: 10px;
                    color: #F66048;
                    border-bottom: 4px solid #F66048;
                    position: relative;
                    &.doing:after{
                        content: "已开抢";
                        position: absolute;
                        right: 5px;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                        width: 90px;
                        height: 35px;
                        border-radius: 35px;
                        border: 2px solid #F66048;
                        color: #686968;
                        text-align: center;
                        line-height: 35px;
                        font-size: 12px;
                    }
                    &.dose:after{
                        content: "即将开始";
                        position: absolute;
                        right: 5px;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                        width: 110px;
                        height: 35px;
                        border-radius: 35px;
                        color: #686968;
                        text-align: center;
                        line-height: 35px;
                        font-size: 12px;
                        border: 2px solid #F66048;
                    }
                    &.done:after{
                        content: "即将开抢";
                        position: absolute;
                        right: 5px;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                        width: 110px;
                        height: 35px;
                        border-radius: 35px;
                        color: #686968;
                        text-align: center;
                        line-height: 35px;
                        font-size: 12px;
                        border: 2px solid #F66048;
                    }
                }
            }
            .doing-time-box{
                width: 710px;
                padding: 30px 20px;
                background: white;
                margin: 0 auto 20px;
                overflow: hidden;
                position: relative;
                .box-left{
                    float: left;
                    width: 195px;
                    height: 260px;
                    margin-right: 20px;
                    &>img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .box-right{
                    width: 450px;
                    text-align: left;
                    float: left;
                    &>p:nth-child(1){
                        font-size: 30px;
                        font-weight: 500;
                    }
                    &>p:nth-child(2){
                        padding-top: 24px;
                    }
                    &>p:nth-child(2),&>p:nth-child(3){
                        color: #9A9B9A;
                    }
                    &>p:nth-child(3){
                        padding-top: 10px;
                    }
                    &>p:nth-child(4){
                        padding-top: 20px;
                        &>span:nth-child(1){
                            font-size: 35px;
                            color: red;
                            font-weight: 700;
                        }
                        &>span:nth-child(2){
                            color: #9E9F9E;
                            text-decoration-line: line-through;
                            font-weight: 500;
                        }
                    }


                }
                .box-circle{
                    width: 130px;
                    height: 130px;
                    border-radius: 50%;
                    background: #F66048;
                    color: white;
                    font-size: 30px;
                    font-weight: 500;
                    text-align: center;
                    line-height: 130px;
                    position: relative;
                    left:480px;
                    top: 130px;
                    &.circle:after{
                        content: "立即秒杀";
                        position: absolute;
                        right: 0;
                        top: 0;
                    }

                    &.circleDone:after{
                        content: "即将开抢";
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                }
            }
        }
    }
    .guess-wrapper{
        margin-top: 35px;
        background: white;
        .guess-title{
            font-size: 30px;
            height: 100px;
            line-height: 100px;
            &:before{
                content: "";
                display: inline-block;
                width: 242px;
                height: 2px;
                border: 1px solid #F9FAF9;
                vertical-align: middle;
                margin-right: 20px;
            }
            &:after{
                content: "";
                display: inline-block;
                width: 242px;
                height: 1px;
                border: 2px solid #F9FAF9;
                vertical-align: middle;
                margin-left: 20px;

            }
        }
        .guess-title-box{
            width: 100%;
            overflow: hidden;
            padding: 0 20px 20px;

            .guess-title-con{
                width: 1450px;

                display: flex;
                justify-content: space-around;
                .guess{
                    text-align: center;
                    width: 224px;
                    margin-right: 20px;

                    .guess-pic{
                        width: 224px;
                        height: 301px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    p{
                        height: 72px;
                        margin-top: 16px;
                        font-size: 25px;
                        font-weight: 500;
                        line-height: 36px;
                        overflow: hidden;
                    }
                }
            }
        }
    }
</style>