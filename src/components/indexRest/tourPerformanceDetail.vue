<template>
    <div class="wrapper">
        <div class="box">
            <div class="student-banner">
                <span class="icon icon-arrow_lift" @click="goToBack"></span>
                <span>巡回演出</span>
                <div @click.stop.prevent="isShowCover = true"><span></span><span></span><span></span></div>
            </div>
            <div class="tour-performance-detail">
                <tour-performance :length="Len" :tourList="tourList" :minLen="minLen"></tour-performance>
                <div class="no-more">没有更多了</div>
            </div>
        </div>
        <cover-choose v-if="isShowCover" @isShow="getShow"></cover-choose>
    </div>
</template>

<script>
    import TourPerformance from "./tourPerformance"
    import CoverChoose from "../../components/coverChoose"
    export default {
        name: "tour-performance-detail",
        components:{
            TourPerformance,
            CoverChoose
        },
        data(){
            return {
                tourList:[],
                touringTmpList:[],
                Len:29,
                isShowCover:false,
                minLen:13,
                arr:[]
            }
        },
        created(){
            this.$http.get("api/performances").then(({data})=>{
                if (data.status == 1){
                    this.touringTmpList = data.allList
                    this.touringTmpList.forEach((item,i)=>{
                        item.siteAll.forEach((value,index)=>{
                            let o = {};
                            o.site = value
                            o.hotData = item;
                            o.place = value.place;
                            this.arr.push(o);
                            this.arr = this.arr.reverse()
                        })
                    })
                    this.tourList = this.arr
                }
                console.log(data)
            })
        },
        methods:{
            getShow(bol){
                this.isShowCover =  bol;
            },
            goToBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../css/style.css";
    .box{
        position: absolute;
        overflow: scroll;
        height: 100%;
        padding: 20px;
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
    .wrapper{
        height: 100%;
    }
    .tour-performance-detail{
        height: 100%;
        overflow: scroll;
        margin-top: 87px;
    }
    .no-more{
        height: 350px;
        width: 100%;
        padding-top: 80px;
        background: #F3F4F3;
    }

</style>