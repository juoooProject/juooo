<template>
    <!--搜索区域-->
    <div class="search-wrap">
         <div class="search-top">
             <div class="left" @click="goToLast">
                 <i class="icon ion-chevron-left"></i>
             </div>
             <div class="center">
                 <input type="text" placeholder="演出/艺人/场馆" v-model="keyWord">
                 <span class="icon ion-android-search"></span>
             </div>
             <div class="right" @click="getList(keyWord)">搜索</div>
         </div>
         <div class="all">大家都在找</div>
         <ul class="hot-word-list">
             <li @click="keyWord=item" v-for="item in word">{{item}}</li>
         </ul>
        <div class="recent">最近搜索</div>
        <ul class="hot-list">
            <li v-for="(item,index) in history" @click="toList(item)">{{item}}<i class="icon ion-android-close" @click.stop.prevent="remove(index)"></i></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "search",
        data(){
           return{
               word:["孟庭苇","印第安音乐品鉴会","刘瑞琦","邓丽君","久石让"],
               keyWord:"",
               history:[]
           }
        },
        created(){

        },
        methods:{
            show(){
                this.searchShow=true;
            },
            getList(item){
                this.$http.get(`api/search?keys=${item}`).then(({data})=>{
                    console.log(data);
                    if(item!=""){
                        this.$router.push({
                            path:"/performance/showPerform",
                            query:{
                                id:data.searchList[0].performType,
                                key:item
                            }
                        });
                        this.history.unshift(item);
                    }else {
                        this.$router.push({
                            path:"/performance/showPerform",
                            query: {
                                id: -1
                            }
                        });
                    }
                    console.log(this.history)
                    // this.setCookie(this.history,"2018/08/31 19:30");
                }).catch((err)=>{
                    console.error(err);
                })
            },
            toList(item){
                this.$http.get(`api/search?keys=${item}`).then(({data})=>{
                    console.log(data);
                    // this.$router.push({
                    //     path:"/performance/showPerform",
                    //     query:{
                    //         id:data.searchList[0].performType
                    //     }
                    // });
                }).catch((err)=>{
                    console.error(err);
                })
            },
            remove(index){
                 this.history.splice(index,1);
            },
            goToLast(){
                this.$router.go(-1);
            }

        },
        //页面加载调用获取cookie值
        mounted(){
            // this.getCookie();
        }

    }
</script>

<style lang="less" scoped>
    @import "../../assets/css/mixin";
    .search-wrap{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
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
        .recent{
            padding: 10px 30px;
            font-size: 24px;
            color: #999;
            text-align: left;
            padding-top: 40px;
        }
        .hot-list{
            padding:0 35px;
            li{
                position: relative;
                text-align: left;
                font-size: 24px;
                color: black;
                height: 98px;
                line-height: 98px;
                border-bottom:1px solid #e0e0e0 ;
                .icon{
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    font-size: 24px;
                    right: 15px;
               }
            }
        }
    }
</style>