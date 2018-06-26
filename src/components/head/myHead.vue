<template>
    <div class="head-wrap">
        <!--顶部导航-->
        <div class="navbar-top">
            <div class="left">
                <span>全国</span>
                <i class="icon ion-chevron-down"></i>
            </div>
            <div class="right">
                <div class="search-btn" @click="searchShow=true">
                    <i class="icon ion-android-search"></i>
                    <span>搜索演出,艺人或场馆</span>
                </div>
            </div>
        </div>
        <div class="search-wrap" v-show="searchShow">
            <keep-alive>
                <search></search>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import Search from "../search/Search"
    export default {
        name: "my-head",
        props(){

        },
        data(){
            return{
                searchShow:false
            }
        },
        components:{
            Search
        },
        methods:{
            showSearch(){
                this.$refs.search.show();
            }
        }
    }
</script>

<style lang="less" scoped>
    .head-wrap{
        .navbar-top{
            position: fixed;
            left: 0;
            top: 0;
            display: flex;
            justify-content:center;
            height: 90px;
            width: 100%;
            .left{
                width: 120px;
                font-size: 0;
                margin-right: 32px;
                text-align: right;
                span{
                    display: inline-block;
                    height: 100%;
                    font-size: 28px;
                    line-height:90px;
                    text-align: center;
                    margin-right: 10px;
                }
                .icon{
                    font-size:14px;
                    color: #999;
                }
            }
            .right{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 570px;
                height: 100%;
                .search-btn{
                    width: 100%;
                    height: 60px;
                    background-color: #f2f2f2;
                    border-radius: 28px;
                    font-size: 26px;
                    line-height: 60px;
                    color: #999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .icon{
                        font-size:30px;
                    }
                    span{
                        display: inline-block;
                        margin-left: 20px;
                    }
                }
            }
        }
        .search-wrap{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 22;
            background-color: #fff;
        }
    }

</style>