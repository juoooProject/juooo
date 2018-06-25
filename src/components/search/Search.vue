<template>
    <!--搜索区域-->
    <div class="search-wrap">
         <div class="search-top">
             <div class="left">
                 <i class="icon ion-chevron-left"></i>
             </div>
             <div class="center">
                 <input type="text" placeholder="演出/艺人/场馆">
                 <span class="icon ion-android-search"></span>
             </div>
             <div class="right">搜索</div>
         </div>
         <div class="all">大家都在找</div>
         <ul class="hot-word-list">
             <li @click="getList(item)" v-for="item in word">{{item}}</li>
         </ul>
    </div>
</template>

<script>
    export default {
        name: "search",
        data(){
           return{
               word:["孟庭苇","印第安音乐品鉴会","刘瑞琦","邓丽君","久石让"]
           }
        },
        created(){

        },
        methods:{
            getList(item){
                this.$http.get(`api/certainList?word=${item}`).then(({data})=>{
                    console.log(data);
                }).catch((err)=>{
                    console.error(err);
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/css/mixin";
    .search-wrap{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 11;
        font-size: 0;
        .search-top{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 90px;
            padding: 0 30px;
            border-bottom: 1px solid #dfdfdf;
            .left{
                width: 55px;
                height: 100%;
                line-height: 90px;
                .icon{
                    font-size:35px;
                    color: #999;
                }
            }
            .center{
                position: relative;
                width: 551px;
                height: 56px;
                padding-left: 66px;
                background-color: #f2f2f2;
                border-radius: 28px;
                line-height: 56px;
                input{
                    height: 100%;
                    background-color: #f2f2f2;
                }
                .icon{
                    font-size: 24px;
                    position: absolute;
                    width: 24px;
                    height: 56px;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    left: 30px;
                    z-index: 15;
                    color: #999;
                }
            }
            .right{
                width: 84px;
                height: 56px;
                color: #666;
                font-size:28px;
                line-height: 56px;
            }
        }
        .all{
            padding-left: 30px;
            font-size: 24px;
            color: #999;
            text-align: left;
            padding-top: 40px;
        }
        .hot-word-list{
            width: 100%;
            padding: 30px 20px;
            display: flex;
            flex-wrap: wrap;
            font-size: 28px;
            color: black;
            li{
                height: 60px;
                line-height: 60px;
                padding: 0 30px;
                margin: 0px 10px 20px;
            }
        }
    }
</style>