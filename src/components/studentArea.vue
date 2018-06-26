<template>
    <div class="wrapper-list" ref="wrapperList">
        <div class="wrapper">
            <div class="student-banner">
                <span class="icon icon-arrow_lift" @click="goToBack"></span>
                <span>学生票专区</span>
                <div @click.stop.prevent="isShowCover = !isShowCover"><span></span><span></span><span></span></div>
            </div>

            <div class="student-lunbo" ref="lunbo" @touchstart.stop.prevent @touchend="flag=true">
                <div class="container">
                    <img src="../img/1.jpg" alt="">
                    <img src="../img/1.jpg" alt="">
                    <img src="../img/1.jpg" alt="">

                </div>
                <div class="pagination"></div>

            </div>

            <div class="student-wrapper">
                <div class="student">
                    <span>亮身份牌,向学生特价票</span>
                    <p>立即登录</p>

                </div>
            </div>

            <div class="student-watching-wrapper">
                <div class="student-watching">
                    <div class="watching-top"><img src="../img/3.png" alt=""></div>
                    <div class="student-show" ref="imgsList">
                        <ul >
                            <li v-for="(item,index) in studentList" v-if="index<=4">
                                <img :src="item.imgUrl" alt="">
                                <p>
                                    <span>[{{item.siteAll[0].city}}]</span>
                                    {{item.title}}
                                </p>
                                <p>
                                    学生价 <span>¥{{item.newPrice}}</span> 起
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="student-ticket-wrapper">
                    <div class="student-ticket">
                        <img src="../img/4.png" alt="">
                    </div>

                    <div class="classify" @click="isShowCity=true">
                        <p>全部城市^</p>
                        <p>所有分类^</p>
                    </div>

                    <div class="city-choose" v-show="isShowCity">
                        <div class="classify0">
                            <p class="active-choose" @click="isCity()">全部城市 <span>^</span></p>
                            <p @click="isList()">所有分类 <span>^</span></p>
                        </div>
                        <ul class="city" v-if="studentTmp">
                            <li @click="isChooseAll($event)">
                                <span @click="isChooseAll($event)">全部城市</span>
                                <span class="icon icon-checkmark"></span>
                            </li>
                            <li v-for="item in cityList" @click="isChooseCity($event)">
                                <span>{{item}}</span>
                                <span class="icon icon-checkmark"></span>

                            </li>
                        </ul>
                        <ul class="list">
                            <li @click="isChooseAll($event)">
                                <span @click="isChooseAll($event)">所有分类</span>
                                <span class="icon icon-checkmark"></span>
                            </li>
                            <li v-for="list in listList" @click="isChooseList($event)">
                                <span>{{list}}</span>
                                <span class="icon icon-checkmark"></span>
                            </li>
                        </ul>
                    </div>


                    <div class="student-list-wrapper">
                        <div class="student-list">
                            <!--学生票列表1-->
                            <div class="student-list-container" v-for="list in studentTmp">
                                <div class="student-left">
                                    <img :src="list.imgUrl" alt="">
                                </div>
                                <div class="student-right">
                                    <p>{{list.title}}-{{list.siteAll[0].city}}站</p>
                                    <p>{{list.siteAll[0].date}} {{list.siteAll[0].time}}</p>
                                    <p>
                                        <span v-if="currentCityList!=''">[{{currentCityList}}]</span>
                                        <span v-else>[{{list.siteAll[0].city}}]</span>
                                        <span>{{list.siteAll[0].place}}</span>
                                    </p>
                                    <p>学生价: <span>¥ {{list.newPrice}}</span>起</p>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

            <div class="no-more">没有更多了</div>

        </div>

        <cover-choose v-if="isShowCover"></cover-choose>

    </div>
</template>

<script>
import BScroll from "better-scroll"
import CoverChoose from "../components/coverChoose"
var timer = null;
    export default {
        name: "student-area",
        components:{
            CoverChoose
        },
        data(){
           return  {
               isShowCover:false,
               isShowCity:false,
               Y:0,
               scrollTop:0,
               studentList:[],
               cityList:[],
               tmp:[],
               studentTmp:[],
               currentCityList:[],
               listList:["戏曲综艺","音乐剧","音乐会","话剧歌剧","演唱会","舞蹈芭蕾"],
               listType:[],
               flag:true
           }

        },

        created(){
            //console.log(this.isShowCover)
            this.$nextTick(()=>{
                this.$on('isShow',(isShow)=>{
                    this.isShowCover = isShow;
                })
            })

            this.$http.get("api/student").then(({data})=>{
                if (data.status == 1){
                    this.studentList = data.stuList;
                    this.studentTmp = data.stuList;

                    data.stuList.forEach((citys)=>{

                        citys.siteAll.forEach((items)=>{
                            this.tmp.push(items.city);
                        })
                    })
                    const s = new Set();

                    this.tmp.forEach(x => s.add(x));

                    for (let i of s) {

                        this.cityList.push(i)
                    }


                }

                console.log(this.tmp)
                console.log(data)
                console.log(this.studentList)
            })

        },

        mounted(){
            this.$nextTick(()=>{
                this.init();
                console.log(this.flag)

                if(this.flag == false){
                    clearInterval(timer)
                }else {
                    setTimeout(function(){ timer = setInterval(play,100);},1000)

                    var dx = 0;
                    function play(){
                        dx-=2;
                        //代表正好偏移完一整张图
                        if(dx%10==0){
                            //清除计时器
                            clearInterval(timer);
                            setTimeout(function(){
                                timer = setInterval(play,100);
                            },1000)
                        }
                        if(dx == -20){
                            dx = 0;
                        }
                        $(".container").css({
                            left: dx+"rem"
                        })
                    }
                }
            })

            this.$nextTick(() => {
                window.addEventListener('scroll', function() {
                    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    this.scrollTop = scrollTop;

                    if (this.scrollTop >=663){
                        $(".classify").addClass("Fix")
                    }else {

                        $(".classify").removeClass("Fix")
                    }
                })
                $('.student-lunbo').on('touchstart',()=>{
                    console.log(1)
                    this.flag = false;
                })
            })

            new BScroll(this.$refs.imgsList,{
                click:true,
                scrollX:true,
                probeType:3,

            })
            new BScroll(this.$refs.lunbo,{
                scrollX:true,
                scrollY:false,
                probeType:3,

                loop:true,
                autoPlay:true,
                interval:10


            })



        },
        methods:{
            goToBack(){
                this.$router.go(-1)
            },
            showCover(){
                this.isShowCover = true;
            },
            init(){
                this.isShowCover = false;
            },

            isChooseAll(e){
                this.$nextTick(()=>{
                    $(e.target).find(".icon").css({
                        color:"#F77B1E"
                    }).parent().siblings().find(".icon").css({
                        color:"white"
                    })
                    $(e.target).find("span").eq(0).css({
                        color:"#F77B1E"
                    })
                    setTimeout(()=>{
                        this.isShowCity = false
                    },2000)
                    this.studentTmp = this.studentList;
                    this.currentCityList = [];

                })
            },
            isChooseCity(e){



                this.$nextTick(()=>{
                    setTimeout(()=>{
                        this.isShowCity = false
                    },2000)
                    let con = $.trim(e.target.innerText)
                    console.log(con)
                    $(e.target).find(".icon").css({
                        color:"#F77B1E"
                    }).parent().siblings().find(".icon").css({
                        color:"white"
                    })


                    this.studentTmp=[];
                    this.currentCityList = [];
                    this.currentCityList = con

                    this.studentList.forEach((student)=>{
                        student.siteAll.forEach((site)=>{
                            if(con == site.city){
                                this.studentTmp.push(student)
                            }


                        })
                        console.log(this.studentTmp)
                        return this.studentTmp
                    })



                })
            },

            isChooseList(e){
                this.$nextTick(()=>{
                    setTimeout(()=>{
                        this.isShowCity = false
                    },2000)
                    let c = $.trim(e.target.innerText)
                    $(e.target).find(".icon").css({
                        color:"#F77B1E"
                    }).parent().siblings().find(".icon").css({
                        color:"white"
                    })
                    this.studentTmp = [];
                    this.listList.forEach((list,index)=>{
                        if (list == c){
                            this.studentList.forEach((type)=>{
                                if (type.performType == index){
                                    this.studentTmp.push(type)
                                }
                            })
                        }
                        console.log(this.studentTmp)
                        return this.studentTmp

                    })
                })

            },

            isCity(){
                $(".city").css("display","block").siblings(".classify0").find("p").eq(0).addClass("active-choose").siblings().removeClass("active-choose")
                $(".list").css("display","none")
            },
            isList(){
                $(".city").css("display","none")
                $(".list").css("display","block").siblings(".classify0").find("p").eq(1).addClass("active-choose").siblings().removeClass("active-choose")

            }
        }




    }
</script>

<style scoped lang="less">
    @import "../css/style.css";


    .no-more{
        height: 200px;
        width: 100%;
        padding-top: 100px;
        background: #F3F4F3;
    }

    .wrapper-list{
        height: 100%;
        /*margin-top: 50px;*/
    }
    .wrapper{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: scroll;

        /*z-index: 55;*/
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
            font-weight: 500;
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
        width: 10rem;
        height: 4rem;
        overflow: hidden;
        margin-top: 87px;
        .container{
            position: absolute;
            left: 0;
            top: 0;
            width: 30rem;
            img{
                width: 10rem;
                height: 4rem;
                float: left;
            }
        }
        .pagination{
            position: absolute;
            bottom: 2px;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: white;
        }
    }

    .student-wrapper{

        background: #F3F4F3;
        height: 160px;
        .student{
            height: 140px;
            align-items: center;
            display: flex;
            justify-content: space-between;
            padding: 0 0.35rem;
            background: white;


            span:before{
                content: "";
                display: inline-block;
                width: 70px;
                height: 70px;
                border-radius: 50%;
                vertical-align: middle;

                background: url("../img/2.png") #F3F4F3 no-repeat center;
                background-size: 50px 50px;

            }
            p:nth-child(2){

                width: 2.1rem;
                height: 0.6rem;
                border-radius: 6px;
                text-align: center;
                line-height: 0.6rem;
                background: #F7791B;
                color: white;


            }
        }
    }

    .student-watching-wrapper{
        background: #F4F5F4;
        padding-bottom: 20px;
        .student-watching{

            padding-bottom: 40px;
            background: white;
            .watching-top{
                padding: 40px 0;
                img{
                    width: 324px;

                }
            }
            .student-show{
                overflow: hidden;
                width: 100%;
                ul{
                    width: 1300px;

                    display: flex;
                    justify-content: space-around;
                    li{
                        width: 240px;
                        /*height: 318px;*/
                        background: #F4F5F4;
                        padding-bottom: 25px;
                        img{
                            width: 100%;
                            height: 318px;
                        }
                        p{
                            font-weight: 200;
                            margin-top: 20px;
                        }
                        p:nth-child(2){
                            height: 56px;
                            line-height: 30px;
                            overflow: hidden;
                            /*white-space: nowrap;*/
                            /*text-overflow: ellipsis;*/
                        }
                        p:nth-child(3){

                            span{
                                color: red;
                                font-size: 30px;
                            }
                        }
                    }

                }
            }
        }
    }

    .student-ticket-wrapper{
        .student-ticket{
            padding: 35px 0;
            img{
                width: 342px;
            }
        }
        .classify,.classify0{
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 71px;
            background: #F9FAF9;
            p{
                width: 50%;
            }
            p:nth-child(1){
                border-right: 3px solid #E2E3E2;
            }
            &.Fix,.city-choose{
                position: fixed;
                top: 87px;
                left: 0;
                width: 100%;
            }

        }

        .city-choose{
            position: fixed;
            top: 87px;
            left: 0;
            z-index: 222;
            width: 100%;
            .classify0{
                border-top: 1px solid lightgray;
                border-bottom: 1px solid lightgray;

                .active-choose{
                   color: #F77B1E;
                    span{
                        display: inline-block;
                        transform: rotateZ(180deg);
                    }
                }


            }
            &>ul{
                /*width: 100%;*/
                background: white;
                padding: 30px;
                li{
                    /*width: 100%;*/
                    display: flex;
                    justify-content: space-between;
                    text-align: left;
                    font-size: 28px;
                    line-height: 60px;
                    /*margin-left: 25px;*/
                    border-bottom: 1px solid #F5F6F5;
                    .icon{
                        font-weight: lighter;
                        color: white;
                        margin-top: 15px;
                    }


                }
            }


        }


    }
    .list{
        display: none;
    }


    .student-list{
        padding: 0 30px;
        .student-list-container{
            display: flex;
            padding: 20px 0;
            border-bottom: 1px solid #F3F4F3;

            .student-left{
                margin-right: 25px;

                img{
                    width: 178px;
                    height: 240px;
                }
            }
            .student-right{
                p{
                    margin-top: 25px;
                    text-align: left;
                    color: #ABACAB;
                }
                p:nth-child(1){
                    color: black;
                    font-size: 30px;

                }
                p:nth-child(4){
                    span{
                        color: red;
                        font-size: 30px;
                    }
                }
            }
        }
    }


</style>