<template>
    <div class="index-wrapper">
        <div class="limit-sale" v-show="this.$store.state.isShowTour">
            <div class="limit-title">
                <div class="limit-left">限时秒杀</div>
                <div class="limit-right" @click="goToMoreTime">更多秒杀 ></div>
            </div>
            <div class="limit-detail" v-if="tourTmpList[10]">
                <div class="limit-pic">
                    <img :src="tourTmpList[10].imgUrl" alt="">
                </div>
                <div class="limit-produce">
                    <p>{{tourTmpList[10].title}}</p>
                    <p>¥ {{tourTmpList[10].newPrice}}</p>
                    <p><span>¥ {{tourTmpList[10].oldPrice}}</span><span>即将开抢</span></p>
                </div>
            </div>
        </div>
        <div class="touring" v-show="this.$store.state.isShowTour">
            <div class="touring-title">
                <div class="limit-left">巡回演出</div>
                <div class="limit-right" @click="goToMoreTour">更多巡演 ></div>
            </div>
            <tour-performance :length="Len" :tourList="tourList" :minLen="minLen"></tour-performance>
        </div>

        <div class="pic" v-show="!this.$store.state.isShowTour">
            <img src="http://image.juooo.com/group1/M00/01/4F/rAoKmVshDFuAMQXBAAB9RYJFGpQ040.jpg" alt="">
        </div>


        <div class="hot-performance">
            <div class="hot-title"> 热门演出 </div>
            <hot-performance :tourList="tourList" :hotLength="hotLength"></hot-performance>
        </div>

        <div class="footer" @click="goToPerformance">查看全部演出 ></div>

        <p class="blank"></p>

    </div>
</template>

<script>
    import TourPerformance from "./tourPerformance"
    import HotPerformance from "./hotPerformance"
    export default {
        name: "index-rest",

        components:{
            TourPerformance,
            HotPerformance
        },
        data(){
          return {
              tourList:[],
              tourTmpList:[],
              Len:4,
              hotLength:10,
              minLen:5,
              arr:[],
              touringTmp:[],
              // citys:[]
          }
        },
        created(){
            this.$http.get("/api/performances").then(({data})=>{
                if (data.status == 1){
                    this.tourTmpList = data.allList;

                }
                // console.log(data)

                this.tourTmpList.forEach((item,i)=>{
                    item.siteAll.forEach((value,index)=>{
                        let o = {};
                        o.site = value
                        o.hotData = item;
                        o.place = value.place;
                        this.arr.push(o);
                        this.arr = this.arr.reverse()
                    })
                })
                // console.log(this.arr)
            })
        },
        watch:{
            city(){
            },
            currentCity(){
            }
        },
        methods:{
            goToMoreTime(){
              this.$router.push({
                  path:"/Timely"
              })
            },
            goToPerformance(){
                this.$router.push({
                    path:"/performance/showPerform?id=-1"
                })
            },
            goToMoreTour(){
                this.$router.push({
                    path:"/moreTour",

                })
            }
        },

        computed:{
            city(){
                if(this.$store.state.currentCity != "全国"){
                    this.$store.state.isShowTour = false;
                }else{
                    this.$store.state.isShowTour = true;
                }
                return this.$store.state.isShowTour;
            },
            currentCity(){
                console.log(this.$store.state.currentCity)
                this.touringTmp=[]
                if(this.$store.state.currentCity == "全国"){
                    console.log("00")
                    this.touringTmp=this.arr
                    this.tourList = this.touringTmp
                    // console.log(this.tourList)
                }else{

                    this.arr.forEach((sites)=>{
                        console.log("11")
                        // sites.hotData.siteAll.forEach((i)=>{
                            if(this.$store.state.currentCity == sites.site.city){
                                // console.log(sites)
                                // console.log(i)

                                this.touringTmp.push(sites)
                            }
                        // })
                        this.tourList = this.touringTmp
                    })

                }
                // console.log(this.tourList)
                // this.$store.state.List=this.tourList
                // console.log(this.$store.state.List)
                return this.tourList;
            },


        }
    }
</script>

<style scoped lang="less">

    .pic{
        width: 100%;
        height: 120px;
        margin: 20px 0;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .index-wrapper{
        background: #EFF0EF;
        /*width: 100%;*/
    }
    .limit-sale{
        margin-bottom: 20px;
        padding: 30px;

        background: white;
        .limit-title{
            display: flex;
            margin-bottom: 25px;
            justify-content: space-between;
            .limit-left{
                font-weight: 700;
                font-size: 30px;
            }
            .limit-right{
                color: #A4A5A4;
            }
        }
        .limit-detail{
            width: 600px;
            background: #eff0ef;
            overflow: hidden;
            text-align: left;
            .limit-pic{
                float: left;
                width: 180px;
                height: 239px;
                &>img{
                    width: 100%;
                    height: 100%;
                }
            }
            .limit-produce{
                float: left;
                width: 360px;
                padding: 25px;
                p:nth-child(1){
                    height: 78px;
                    font-size: 28px;
                    /*font-weight: 500;*/
                }
                p:nth-child(2){
                    margin-top: 20px;
                    color: red;
                    font-size: 30px;
                    font-weight: 700;
                }
                p:nth-child(3){

                    span:nth-child(1){
                        color: #C3C4C3;
                        text-decoration-line: line-through;
                    }
                    span:nth-child(2){
                        display: inline-block;
                        width: 170px;
                        height: 56px;
                        text-align: center;
                        line-height: 56px;
                        color: white;
                        margin-left: 140px;
                        background: #F7791B;
                    }
                }
            }
        }
    }

    .touring{
        padding: 30px;
        margin-bottom: 30px;

        background: white;
        .touring-title {
            display: flex;
            margin-bottom: 25px;
            justify-content: space-between;
            .limit-left {
                font-weight: 700;
                font-size: 30px;
            }
            .limit-right {
                color: #A4A5A4;
            }
        }
    }

    .hot-performance{
        padding: 30px;

        background: white;
        .hot-title{
            font-size: 30px;
            font-weight: 700;
            text-align: left;
        }
    }

    .footer{
        margin: 30px auto;
        width: 240px;
        height: 60px;
        background: white;
        border-radius: 4px;
        text-align: center;
        line-height: 60px;

    }
    .blank{
        width: 100%;
        height: 300px;
    }
</style>