<template>
    <div class="hot-wrapper" v-if="tourList[0]">
        <div class="hot" v-for="(hot,index) in tourList" v-if="index<hotLength && hot.siteAll.length>3">
            <div class="hot-left">
                <img :src="hot.imgUrl" alt="">
            </div>
            <div class="hot-right">
                <p class="title">{{hot.title}}</p>
                <!--{{item.siteAll[0].date}}-{{item.siteAll[item.siteAll.length-1].date}}-->
                <p class="hot-date">{{hot.siteAll[0].date}}--{{hot.siteAll[hot.siteAll.length-1].date}}</p>
                <div class="hot-place">
                    <span>[{{hot.siteAll[0].city}}]</span>
                    <span>{{hot.siteAll[0].place}}</span>
                </div>
                <div class="hot-price">
                    ¥ {{hot.newPrice}}-{{hot.oldPrice}}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "hot-performance",
        props:{
            hotLength:Number,
            tourList:Array,
        }
    }
</script>

<style scoped lang="less">

    .hot{
        /*height: 240px;*/
        padding: 15px 0;
        border-bottom: 1px solid #F2F3F2;
        overflow: hidden;
        .hot-left{
            float: left;
            width: 178px;
            height: 240px;
            margin-right: 25px;
            &>img{
                width: 100%;
                height: 100%;

            }
        }
        .hot-right{
            width: 485px;
            float: left;
            text-align: left;
            &>p{
                margin-bottom: 10px;
                line-height: 30px;
            }
            .hot-title{
                font-size: 30px;
                margin-bottom: 20px;
            }
            .hot-date{
                color: #9A9B9A;
            }
            .hot-place{
                span{
                    color: #9A9B9A;
                    margin-right: 10px;

                }


            }
            .hot-price{
                color: red;
                font-weight: 500;
                font-size: 30px;
                margin-top: 25px;
            }
        }

    }
</style>