<template>
    <div class="specialize-wrapper" ref="specialize">
        <div class="wrapper">
            <div class="student-banner">
                <span class="icon icon-arrow_lift" @click="goToBack"></span>
                <span>聚特惠</span>
                <div @click="isShowCover=true"><span></span><span></span><span></span></div>
            </div>
            <div class="student-lunbo" ref="lunbo">
                <div class="container">
                    <img src="../img/5.png" alt="">

                </div>


            </div>
            <!--天天秒杀-->
            <div class="daily">
                <div class="title">
                    天天秒杀
                </div>
                <p>十点准时开抢，不见不散</p>
                <div class="time">
                    <div class="time-wrapper">
                        <div class="time-every active" @click="check1()">
                            <p>{{month}}月{{day}}日 10:00</p>
                            <p class="onDoing">进行中</p>
                            <p class="time-arrow"></p>
                        </div>
                        <div class="time-every" @click="check2()">
                            <p>{{month}}月{{day+1}}日 10:00</p>
                            <p class="time-arrow"></p>
                        </div>

                        <div class="time-every" @click="check3()">
                            <p>{{month}}月{{day+2}}日 10:00</p>
                            <p class="time-arrow"></p>
                        </div>
                    </div>
                </div>

                <!--进行中-->
                <keep-alive>
                    <div class="wrapper-pic">
                        <div class="timely-pic" v-show="timeShow[index]" v-for="(item,index) in doingList" @click="goToTicket(item)">
                            <div class="pic">
                                <img :src="item.other.imgUrl" alt="">
                            </div>
                            <p class="pic-title">
                                <span>{{item.site.city}}</span>
                                <span>{{item.other.title}}</span>
                            </p>
                            <p class="pic-price">
                                <span>¥ {{item.other.newPrice}}</span>
                                <span>¥ {{item.other.oldPrice}}</span>
                            </p>
                        </div>
                    </div>
                </keep-alive>

                <div class="timely-more" @click="goToMoreTime">
                    更多秒杀
                    <span>> </span>
                </div>

            </div>

            <!--热门活动-->
            <div class="hot-activity">
                <div class="hot-title">
                    <p>热门活动</p>
                    <p>为您推荐最新最in的活动</p>
                </div>
                <div class="hot-doing">
                    <div>
                        <img src="../img/6.jpg" alt="">

                        <p>北京惠民文化消费电子券</p>
                        <div class="doing">进行中</div>
                    </div>
                    <div>
                        <img src="../img/7.jpg" alt="">
                        <p>百老汇原版摇滚音乐剧《吉屋出租》20周年巡演</p>
                        <div class="doing">进行中</div>

                    </div>


                </div>
            </div>
            <!--折扣区-->
            <div class="sale">
                <div class="sale-title">
                    <p>折扣专区</p>
                    <p>限时折扣，尽情畅享百场演出</p>
                </div>

                <div class="sale-nav" ref="navScroll">
                    <ul>
                        <li @click="isAll($event)">全部</li>
                        <li @click="isClick($event)" v-for="chooseCity in cityList">{{chooseCity}}</li>
                    </ul>
                </div>

                <div class="sale-list">
                    <div class="timely-pic sale-pic" v-for="pics in allTmp" @click="goToTicket(pics)">
                        <!--<div v-for="pic in allLists.siteAll">-->
                        <div class="pic">
                            <img :src="pics.other.imgUrl" alt="">

                        </div>
                        <p class="pic-title">
                            <span v-if="currentCity!=''">{{currentCity}}</span>
                            <span v-else>{{pics.site.city}}</span>
                            <span>{{pics.other.title}}</span>
                        </p>
                        <p class="pic-price">
                            <span>¥ {{pics.other.newPrice}}</span>
                            <span>¥ {{pics.other.oldPrice}}</span>
                        </p>
                        <!--</div>-->

                    </div>
                </div>


            </div>
        </div>

        <cover-choose v-if="isShowCover" @isShow="getShow"></cover-choose>

    </div>
</template>

<script>
    import BScroll from "better-scroll";
    import CoverChoose from "../components/coverChoose"
    export default {

        name: "specialize-area",
        components:{
            CoverChoose
        },
        data(){
            return {
                timeArr:[],
                isShowCover:false,
                isCheck1:false,
                isCheck2:false,
                isCheck3:false,
                month:new Date().getMonth()+1,
                day:new Date().getDate(),
                dateTmp:[],
                imgTmp:[],
                imgList:[],
                dateList:[],
                cityList:[],
                timeShow:[true,false,false],
                cityTmp:[],
                //存放所有的数据
                allLists:[],
                //存放变化的列表
                allTmp:[],
                //    当前的城市
                currentCity:[],
                doingList:[]
            }
        },
        created(){
            this.$http.get("api/performances").then(({data})=>{
                this.allLists = data.allList;
                //默认的列表全部
                // console.log(this.allTmp)
                data.allList.forEach((all)=>{
                    // this.imgList.push(all.imgUrl)
                    all.siteAll.forEach((site)=>{
                        // this.dateTmp.push(site.date)
                        this.cityTmp.push(site.city)
                    })
                })
                if(this.month/10 < 1){
                    this.month = "0"+this.month;
                }
                if(this.day/10 < 1){
                    this.day = "0"+this.day;
                }
                if (this.day > 30){
                    this.day = this.day - 30
                }
                // this.timeArr.push(this.month+"月"+this.day+"日",this.month+"月"+(this.day+1)+"日",this.month+"月"+(this.day+2)+"日");
                var arr = [];
                var k = 1;
                data.allList.forEach((item,i)=>{
                    item.siteAll.forEach((value,index)=>{
                        let o = {};
                        o.site = value;
                        o.other = item;
                        o.id = k++;
                        arr.push(o)
                    })
                })
                this.dateList = arr
                this.allLists = arr;
                this.allTmp = arr.slice(11,40);
                const c = new Set();
                this.cityTmp.forEach(x => c.add(x));
                for (let i of c) {
                    this.cityList.push(i)
                }

                this.$nextTick(()=>{
                    var arr1=[],arr2=[],arr3=[];
                    this.dateList.forEach((day,index)=>{
                        if(this.month == day.site.date.substr(5,2) && this.day == day.site.date.substr(8,2)){

                            arr1.push(day)
                        }
                        if(this.month == day.site.date.substr(5,2) && this.day+1 == day.site.date.substr(8,2)){

                            arr2.push(day)
                        }
                        if(this.month == day.site.date.substr(5,2) && this.day+2 == day.site.date.substr(8,2)){
                            arr3.push(day)
                        }
                    })
                    this.doingList.push(arr1[0])
                    this.doingList.push(arr2[0])
                    this.doingList.push(arr3[0])
                    console.log(this.doingList)
                })

            })
        },

        methods:{

            goToMoreTime(){
                this.$router.push({
                    path:"/Timely"
                })
            },
            getShow(bol){
                this.isShowCover =  bol;
            },
            goToBack(){
                this.$router.go(-1)
            },

            isAll(e){
                this.$nextTick(()=>{
                    $(e.target).css({
                        color:"#F66048",
                        borderBottom:"1px solid #F66048"
                    }).siblings().css({
                        color:"black",
                        borderBottom:"none"
                    })
                    this.currentCity=[];
                    this.allTmp = this.allLists.slice(11,40);
                })
            },
            isClick(e){
                this.$nextTick(()=>{
                    let con = e.target.innerText;
                    $(e.target).css({
                        color:"#F66048",
                        borderBottom:"1px solid #F66048"
                    }).siblings().css({
                        color:"black",
                        borderBottom:"none"
                    })
                    //方法1
                    this.allTmp=[];
                    this.currentCity = [];
                    this.currentCity = con
                    // for (var i=0;i<this.allLists.length;i++){
                    //
                    //     var citys = this.allLists[i].siteAll;
                    //     // console.log(citys)
                    //     for (var j=0;j<citys.length;j++){
                    //         if (con == citys[j].city){
                    //             this.allTmp.push(this.allLists[i])
                    //         }
                    //     }
                    // }
                    this.allTmp = this.allLists.filter((value,index)=>{
                        return value.site.city==con;
                    })
                    console.log(this.allTmp)
                    return this.allTmp;

                    //方法2

                    // this.allTmp = [];
                    // this.currentCity = []
                    // this.currentCity = con;
                    // this.allLists.forEach((list)=>{
                    //     list.siteAll.forEach((city)=>{
                    //         if(city.city == con){
                    //             this.allTmp.push(list)
                    //         }
                    //     })
                    //     console.log(this.allTmp)
                    //     return this.allTmp;
                    // })

                })

            },






            check1(){
                //test


                this.$nextTick(()=>{
                    $(".time-every").eq(2).removeClass("active")
                    $(".time-every").eq(1).removeClass("active")
                    $(".timely-pic").eq(2).css("display","none")
                    $(".timely-pic").eq(1).css("display","none")

                })
                this.isCheck1 = true
                if (this.isCheck1){
                    this.$nextTick(()=>{
                        $(".time-every").eq(0).addClass("active")
                        $(".timely-pic").eq(0).css("display","block")
                    })
                    this.isCheck1 = false

                }else{
                    this.$nextTick(()=>{
                        $(".time-every").eq(0).removeClass("active")
                        $(".timely-pic").eq(0).css("display","none")

                    })
                }

            },
            check2(){



                this.$nextTick(()=>{
                    $(".time-every").eq(0).removeClass("active")
                    $(".time-every").eq(2).removeClass("active")
                    $(".timely-pic").eq(2).css("display","none")
                    $(".timely-pic").eq(0).css("display","none")

                })
                this.isCheck2 = true
                if (this.isCheck2){
                    this.$nextTick(()=>{
                        $(".time-every").eq(1).addClass("active")
                        $(".timely-pic").eq(1).css("display","block")
                    })
                    this.isCheck2 = false
                }else{
                    this.$nextTick(()=>{
                        $(".time-every").eq(1).removeClass("active")
                        $(".timely-pic").eq(1).css("display","none")
                    })

                }
            },
            check3(){
                this.$nextTick(()=>{
                    $(".time-every").eq(0).removeClass("active")
                    $(".time-every").eq(1).removeClass("active")
                    $(".timely-pic").eq(0).css("display","none")
                    $(".timely-pic").eq(1).css("display","none")

                })
                this.isCheck3 = true
                if (this.isCheck3){
                    this.$nextTick(()=>{
                        $(".time-every").eq(2).addClass("active")
                        $(".timely-pic").eq(2).css("display","block")
                    })
                    this.isCheck3 = false
                }else{
                    this.$nextTick(()=>{
                        $(".time-every").eq(2).removeClass("active")
                        $(".timely-pic").eq(2).css("display","none")

                    })
                }
            },
            goToTicket(item){
                // this.$store.commit('getTicket',item);
                this.$router.push({
                    path:"/ticket",
                    query:{
                        id:item.id
                    }
                })
            }

        },
        mounted(){
            new BScroll(this.$refs.navScroll,{
                scrollX:true,
                click:true
            })
            // new BScroll(this.$refs.specialize,{
            //     refresh:true
            // })

        }
    }
</script>

<style scoped lang="less">
    @import "../css/style.css";
    .specialize-wrapper{
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .wrapper{
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
        padding: 0 30px;
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
        height: 4rem;
        overflow: hidden;
        margin-top: 87px;
        .container{

            img{
                width: 100%;
                height: 4rem;



            }
        }

    }

    .wrapper-pic{
        width: 100%;
        overflow: hidden;
    }

    .timely-pic{
        margin: 10px;
        text-align: left;
        padding: 20px;
        width: 310px;
        float: left;
        background: white;
        .pic{
            width: 260px;
            height: 350px;
            margin: 10px auto;
            &>img{
                width: 100%;
                height: 100%;
            }
        }
        .pic-title{
            height: 70px;
            overflow: hidden;
            margin: 10px 0;
            line-height: 40px;

            span:nth-child(1){
                color: white;
                display: inline-block;
                width: 100px;
                height: 30px;
                background: #F66C55;
                text-align: center;
                line-height: 30px;
                position: relative;
            }
            span:nth-child(1):after{
                content: "";
                display: inline-block;
                width: 8px;
                height: 8px;
                background: #F66C55;
                transform: rotateZ(45deg);
                position: absolute;
                right: -4px;
                top: 0;
                bottom: 0;
                margin: auto;
            }
            span:nth-child(2){
                /*display: inline-block;*/

                color: black;
                font-weight: 200;
                height: 70px;
                overflow: hidden;
            }
        }
        .pic-price{
            margin-bottom: 10px;
            span:nth-child(1){
                color: red;
                font-weight: 700;
                font-size: 30px;
            }
            span:nth-child(2){
                text-decoration-line: line-through;
            }
        }


    }

    .daily{
        padding: 20px;
        background: #FEF8F0;
        .title{
            font-size: 30px;
            padding-top: 10px;
            margin-bottom: 10px;
            &:before{
                content: "";
                display: inline-block;
                width: 280px;
                height: 1px;
                border-bottom: 1px solid #F8F4EF;
            }
            &:after{
                content: "";
                display: inline-block;
                width: 280px;
                height: 1px;
                border-bottom: 1px solid #F8F4EF;
            }


        }
        p{
            color: #AEADAB;
        }
        .time{
            overflow: auto;
            .time-wrapper{
                display: flex;
                float: left;
                justify-content: space-around;
                .time-every{
                    width: 230px;
                    height: 100px;
                    background: white;
                    margin: 20px 0;
                    position: relative;
                    &>p:nth-child(1){
                        font-size: 30px;
                    }
                    &.active{
                        background: #F66C55;
                        &>p{
                            color: white;
                        }
                        &>.time-arrow{
                            background: #F66C55;
                        }

                    }
                    .onDoing{
                        display: inline;
                        width: 45px;
                        height: 20px;
                        border-radius: 20px;
                        background: rgba(0,0,0,0.5);
                    }
                    .time-arrow{
                        width: 8px;
                        height: 8px;
                        background: white;
                        transform: rotateZ(45deg);
                        position: absolute;
                        bottom: -4px;
                        left: 0;
                        right: 0;
                        margin: auto;
                    }
                }
                .time-every:nth-child(1){
                    &>p:nth-child(1){
                        margin-top: 20px;
                        margin-bottom: 5px;
                    }

                }
                .time-every:nth-child(2),.time-every:nth-child(3){
                    line-height: 100px;

                }
                .time-every:nth-child(2){
                    border-right: 1px solid #DDDEDD;
                    border-left: 1px solid #DDDEDD;

                }

            }
        }




        .timely-more{
            width: 100%;
            height: 80px;
            margin: auto;
            background: white;
            line-height: 80px;
            border: 1px solid #EEEFEE;
            &>span{
                color: red;
                font-weight: 700;
                font-size: 30px;
            }
        }
    }

    .hot-activity{
        background: #EEEFEE;
        width: 100%;
        .hot-title{
            padding-top: 35px;
            margin-bottom: 40px;
            &>p:nth-child(1){
                font-size: 28px;
                font-weight: 500;
                line-height: 30px;
            }
            &>p:nth-child(2){
                color: #989998;
                line-height: 30px;
            }
        }
        .hot-doing{
            padding: 40px 0 30px 20px;
            background: white;
            overflow: hidden;
            &>div{
                float: left;
                position: relative;
                width: 270px;
                height: 170px;
                margin-right: 10px;
                &>p{
                    color: #5D5E5D;
                }
                &>img{
                    width: 100%;

                }
                &>.doing{
                    width: 86px;
                    height: 40px;
                    color: white;
                    background: #F78673;
                    line-height: 40px;
                    position: absolute;
                    left: 0;
                    top: 10px;
                    z-index: 22;
                }
                &>.doing:after{
                    content: "";
                    display: inline-block;
                    width: 25px;
                    height: 25px;
                    background: #F78673;
                    transform: rotateZ(45deg);
                    position: absolute;
                    left: 75px;
                    top: 7px;
                    z-index: 10;
                }


            }
        }
    }
    .sale{
        background: #EEEFEE;
        width: 100%;
        .sale-title{
            padding-top: 35px;
            margin-bottom: 40px;
            &>p:nth-child(1){
                font-size: 28px;
                font-weight: 500;
                line-height: 30px;
            }
            &>p:nth-child(2){
                /*font-weight: lighter;*/
                color: #989998;
                line-height: 30px;
            }
        }
        .sale-nav{
            width: 100%;
            overflow: hidden;
            ul{
                width: 300%;
                height: 74px;
                line-height: 74px;
                background: white;
                display: flex;
                justify-content: space-around;
                &>li:nth-child(1){
                    color:#F66048;
                    border-bottom:1px solid #F66048;
                }
                li{
                    width: 100px;
                    text-align: center;
                }

            }
        }
        .sale-list{
            width: 100%;
            padding: 20px;
            overflow: hidden;

            .sale-pic{
                float: left;
                margin-right: 30px;
            }
        }

    }
</style>