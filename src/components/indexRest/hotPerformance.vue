<template>
    <div class="hot-wrapper" v-if="tourList.length>0">
        <!--<div class="box" v-for="p in Place">-->
        <!--<p>{{tourList}}</p>-->
        <ul>
            <li class="hot" v-for="(hot,index) in tourList" v-if="index<hotLength && hot.hotData.siteAll.length>=2">
                <!--<p>{{hot.hotData.imgUrl}}</p>-->

                <div class="hot-left">
                    <img :src="hot.hotData.imgUrl" alt="">
                </div>
                <div class="hot-right">
                    <p class="title">{{hot.hotData.title}}</p>
                    <!--{{item.siteAll[0].date}}-{{item.siteAll[item.siteAll.length-1].date}}-->
                    <p class="hot-date">{{hot.hotData.siteAll[0].date}}--{{hot.hotData.siteAll[hot.hotData.siteAll.length-1].date}}</p>
                    <div class="hot-place" v-if="$store.state.currentCity != '全国'">
                        <span>[{{$store.state.currentCity}}]</span>
                        <span>{{hot.place}}</span>
                    </div>

                    <div class="hot-place" v-else>
                        <span>[{{hot.site.city}}]</span>
                        <span>{{hot.place}}</span>
                    </div>
                    <div class="hot-price">
                        ¥ {{hot.hotData.newPrice}}-{{hot.hotData.oldPrice}}
                    </div>
                </div>


            </li>
        </ul>

    </div>
    <!--</div>-->
</template>

<script>
    export default {
        name: "hot-performance",
        props:{
            hotLength:Number,
            tourList:Array,
        },
        data(){
            return {
                City:"",
                tour:[]
            }
        },
        // created(){
        //     console.log(this.tourList)
        // }


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