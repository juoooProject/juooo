<template>
    <!--由于获取数据是异步的,要先判断数据是否已经获取到,才能进行渲染-->
    <div class="tour-wrapper" v-if="tourList[0]">
        <div class="tour" v-for="(item,index) in tourList" v-if="index<length && item.siteAll.length<minLen">
            <div class="tour-left">
                <img  :src="item.imgUrl" alt="">
            </div>
            <div class="tour-right">
                <p class="title">{{item.title}}</p>

                <p class="tour-date">{{item.siteAll[0].date}}--{{item.siteAll[item.siteAll.length-1].date}}</p>
                <div class="tour-place">
                    <span v-for="(i,index) in item.siteAll" v-if="index<5">{{i.city}}</span><span @click="goToTour(item._id)">查看全部</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "tour-performance",
        props:{
            length:Number,
            tourList:Array,
            minLen:Number

        },
        methods:{
            goToTour(id){
                this.$router.push({
                    path:"/tourInfo",
                    query:{
                        tid:id
                    }
                })
            }
        }



    }
</script>

<style scoped lang="less">
    .tour{
        /*height: 240px;*/
        padding: 15px 0;
        border-bottom: 1px solid #F2F3F2;
        border-top: 1px solid #F2F3F2;
        overflow: hidden;
        .tour-left{
            float: left;
            width: 178px;
            height: 240px;
            margin-right: 25px;
            &>img{
                width: 100%;
                height: 100%;

            }
        }
        .tour-right{
            width: 485px;
            float: left;
            text-align: left;
            &>p{
                margin-bottom: 10px;
                line-height: 30px;
            }
            .title{
                font-size: 28px;
            }
            .tour-date{
                color: #9A9B9A;
            }
            .tour-place{
                span{
                    display: inline-block;
                    width: 134px;
                    height: 44px;
                    border: 1px solid #e6e6e6;
                    text-align: center;
                    line-height: 44px;
                    margin-bottom: 10px;
                    color: #9A9B9A;
                    margin-right:20px ;
                }
                span:last-child{
                    background: #F4F5F4;
                }
            }
        }

    }

</style>