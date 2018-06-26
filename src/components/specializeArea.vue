<template>
    <div class="specialize-wrapper">
        <div class="wrapper">
            <div class="student-banner">
                <span class="icon icon-arrow_lift"></span>
                <span>聚特惠</span>
                <div @click="isShowCover=!isShowCover"><span></span><span></span><span></span></div>
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
                            <p>{{dateMonth}}月{{dateDay}}日 10:00</p>
                            <p class="onDoing">进行中</p>
                            <p class="time-arrow"></p>
                        </div>

                        <div class="time-every" @click="check2()">
                            <p>{{dateMonth}}月{{dateDay+1}}日 10:00</p>
                            <p class="time-arrow"></p>
                        </div>

                        <div class="time-every" @click="check3()">
                            <p>{{dateMonth}}月{{dateDay+2}}日 10:00</p>
                            <p class="time-arrow"></p>
                        </div>
                    </div>


                </div>

                <!--进行中-->
                <div class="timely-pic">
                    <div class="pic">
                        <img :src="imgSrc1" alt="">

                    </div>
                    <p class="pic-title">
                        <span>{{cityList[0]}}</span>
                        <span>3D多媒体音乐剧《梵高》（中文版)</span>
                    </p>
                    <p class="pic-price">
                        <span>¥ 50</span>
                        <span>¥ 30</span>
                    </p>

                </div>

                <div class="timely-pic">
                    <div class="pic">
                        <img :src="imgSrc2" alt="">

                    </div>
                    <p class="pic-title">
                        <span>{{cityList[1]}}</span>
                        <span>3D多媒体音乐剧《梵高》（中文版)</span>
                    </p>
                    <p class="pic-price">
                        <span>¥ 50</span>
                        <span>¥ 30</span>
                    </p>

                </div>

                <div class="timely-pic">
                    <div class="pic">
                        <img :src="imgSrc3" alt="">

                    </div>
                    <p class="pic-title">
                        <span>{{cityList[2]}}</span>
                        <span>3D多媒体音乐剧《梵高》（中文版)</span>
                    </p>
                    <p class="pic-price">
                        <span>¥ 50</span>
                        <span>¥ 30</span>
                    </p>

                </div>

                <div class="timely-more">
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
                    <div class="timely-pic sale-pic" v-for="pics in allTmp">
                        <!--<div v-for="pic in allLists.siteAll">-->
                            <div class="pic">
                                <img :src="pics.imgUrl" alt="">

                            </div>
                            <p class="pic-title">
                                <span v-if="currentCity!=''">{{currentCity}}</span>
                                <span v-else>{{pics.siteAll[0].city}}</span>
                                <span>{{pics.title}}</span>
                            </p>
                            <p class="pic-price">
                                <span>¥ {{pics.newPrice}}</span>
                                <span>¥ {{pics.oldPrice}}</span>
                            </p>
                        <!--</div>-->

                    </div>
                </div>


            </div>
        </div>

        <cover-choose v-if="isShowCover" :isShowCover="isShowCover"></cover-choose>

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
                isShowCover:false,
                isCheck1:false,
                isCheck2:false,
                isCheck3:false,
                dateMonth:new Date().getMonth()+1,
                dateDay:new Date().getDate(),
                dateTmp:[],
                imgTmp:[],
                imgList:[],
                dateList:[],
                cityList:[],
                imgSrc1:"",
                imgSrc2:"",
                imgSrc3:"",
                cityTmp:[],
                //存放所有的数据
                allLists:[],
                //存放变化的列表
                allTmp:[],
            //    当前的城市
                currentCity:[]
            }
        },
        created(){
            this.$http.get("api/performances").then(({data})=>{
                this.allLists = data.allList;
                //默认的列表全部
                this.allTmp = data.allList;
                data.allList.forEach((all)=>{
                    this.imgList.push(all.imgUrl)

                    all.siteAll.forEach((site)=>{
                        this.dateTmp.push(site.date)
                        this.cityTmp.push(site.city)
                        // this.tmp[1].push(site)
                    })
                })
                const s = new Set();
                this.dateTmp.forEach(x => s.add(x));
                for (let i of s) {
                    this.dateList.push(i)
                }
                const c = new Set();
                this.cityTmp.forEach(x => c.add(x));
                for (let i of c) {
                    this.cityList.push(i)
                }
                // console.log(this.imgList)
                // console.log(this.dateList)
                // console.log(this.cityList)
                console.log(data)
                console.log(this.cityTmp)

                this.$nextTick(()=>{
                    $(".timely-pic").eq(2).css("display","none")
                    $(".timely-pic").eq(1).css("display","none")
                })
                this.dateList.forEach((day,index)=>{
                    if(this.dateMonth == day.substr(6,1) && this.dateDay == day.substr(8,2)){
                        this.imgSrc1 = this.imgList[index-13];
                    }
                    if(this.dateMonth == day.substr(6,1) && this.dateDay+1 == day.substr(8,2)){
                        this.imgSrc2 = this.imgList[index-13];
                    }
                    if(this.dateMonth == day.substr(6,1) && this.dateDay+2 == day.substr(8,2)){
                        this.imgSrc3 = this.imgList[index-13];
                    }
                })

            })
        },

        methods:{
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
                  this.allTmp = this.allLists
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
                    console.log(con)
                    //方法1
                    this.allTmp=[];
                    this.currentCity = [];
                    this.currentCity = con
                    for (var i=0;i<this.allLists.length;i++){

                        var citys = this.allLists[i].siteAll;
                        // console.log(citys)
                        for (var j=0;j<citys.length;j++){
                            if (con == citys[j].city){
                                this.allTmp.push(this.allLists[i])
                            }
                        }
                    }
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
            }

        },
        mounted(){

            new BScroll(this.$refs.navScroll,{
                scrollX:true,
                click:true
            })

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

    .timely-pic{
        margin-bottom: 20px;
        text-align: left;
        padding: 10px 16px 12.5px;
        width: 300px;
        background: white;
        .pic{
            width: 280px;
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