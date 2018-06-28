<template>
    <div class="wrapper">
        <div class="student-banner">
            <span class="icon icon-arrow_lift" @click="goToBack"></span>
            <span>巡回演出</span>
            <div @click.stop.prevent="isShowCover = !isShowCover"><span></span><span></span><span></span></div>
        </div>
        <div class="tour-performance-detail">
            <tour-performance :length="Len" :tourList="tourList" :minLen="minLen"></tour-performance>
            <div class="no-more">没有更多了</div>
        </div>


        <cover-choose v-if="isShowCover" :isShowCover="isShowCover"></cover-choose>
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
                Len:29,
                isShowCover:false,
                minLen:13
            }
        },
        created(){
            this.$http.get("api/performances").then(({data})=>{
                if (data.status == 1){
                    this.tourList = data.allList
                }
                console.log(data)
            })
        },
        methods:{
            goToBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../css/style.css";
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
            margin-left: 30px;
        }
        span:nth-child(2){
            font-weight: 500;
            font-size: 0.48rem;

        }
        div{

            /*margin-bottom: 0.4rem;*/
           margin-right: 30px;
            span{
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: black;
                margin-right: 10px;


            }
        }

    }
    .wrapper{
        height: 100%;
    }
    .tour-performance-detail{
        padding: 20px 30px;
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