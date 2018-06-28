<template>
    <div class="performWrap">
        <foot></foot>
        <div class="navbar-top">
            <div class="left" @click="goToAddress">
                <span>{{$store.state.currentCity}}</span>
                <i class="icon ion-chevron-down"></i>
            </div>
            <div class="right">
                <div class="search-btn" @click="gotoSearch">
                    <i class="icon ion-android-search"></i>
                    <span>搜索演出,艺人或场馆</span>
                </div>
            </div>
            <div class="menus" @click="sortShow=true">
                <i class="icon ion-android-menu"></i>
            </div>
        </div>
        <div class="sortWrap" v-show="sortShow">
             <ul class="sortType">
                 <span class="tri"></span>
                 <li @click="sortChange(0)">推荐排序<i class="icon ion-checkmark-round" v-show="isFlag"></i></li>
                 <li @click="sortChange(1)">时间排序<i class="icon ion-checkmark-round" v-show="!isFlag"></i></li>
             </ul>
        </div>
        <div class="topWrap" ref="topWrap">
            <ul class="topbar">
                <li @click="gotoList(index)" :class="{active:curIndex==index}" v-for="(item,index) in type">{{item}}</li>
            </ul>
        </div>
        <div class="splite"></div>
        <div ref="listWrap" class="listWrap">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import BScroll from "better-scroll"
    import Search from "../../components/search/Search"
    import ShowPerform from "../../components/showPerform/showPerform"
    import Foot from '../../components/foot/foot'
    export default {
        name: 'Performance',
        data() {
            return {
                curIndex: 0,
                searchShow: false,
                isFlag: true,
                listArr: [],
                allFlag: true,
                sortShow: false,
                type: ["全部", "演唱会", "音乐会", "话剧歌剧", "儿童亲子", "音乐剧", "舞蹈芭蕾", "戏曲综艺", "展览"],
                sortType: 0
            }
        },
        created() {
            this.$http.get("/api/performances").then(({data}) => {
                this.listArr = data.allList;
            }).catch((err) => {
                console.error(err);
            });
        },
        mounted() {
            let topWrapper = this.$refs.topWrap;
            this.topScroll = new BScroll(topWrapper, {
                click: true,
                scrollX: true
            })
            let listWrap = this.$refs.listWrap;
            this.listScroll = new BScroll(listWrap, {
                click: true
            })


        },
        methods: {
            gotoSearch() {
                this.$router.push({
                    path: "/search"
                })
            },
            gotoList(index) {
                this.curIndex = index;
                if (this.sortType == 0) {
                    this.$router.push({
                        path: "/performance",
                        query: {
                            id: this.curIndex - 1
                        }
                    });
                } else {
                    this.$router.push({
                        path: "/performance",
                        query: {
                            id: this.curIndex - 1,
                            sort: 1
                        }
                    });
                }
            },
            sortChange(index) {
                this.isFlag = !this.isFlag;
                this.sortShow = false;
                this.sortType=index;
                if (this.sortType == 0) {
                    this.$router.push({
                        path: "/performance",
                        query: {
                            id: this.curIndex - 1
                        }
                    });
                } else {
                    this.$router.push({
                        path: "/performance",
                        query: {
                            id: this.curIndex - 1,
                            sort: 1
                        }
                    });
                }
            },
            goToAddress(){
                this.$router.push({
                    path:'/address'
                })
            }
        },
        components: {
            ShowPerform,
            Search,
            Foot
        }
    }

</script>

<style lang="less" scoped>
    .performWrap{
        position: relative;
        top: 90px;
        bottom: 50px;
        z-index: 33;
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
                margin-right: 15px;
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
                width: 530px;
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
            .menus{
                width: 50px;
                height: 100%;
                line-height: 90px;
                .icon{
                    font-size:40px;
                    color: #999;
                }
            }
        }
        .sortWrap{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.2);
            z-index: 88;
            /*display: none;*/
            .sortType{
                position: absolute;
                right: 16px;
                top: 90px;
                width: 200px;
                padding: 6px 12px;
                background-color: #fff;
                border-radius: 10px;
                .tri{
                    position: absolute;
                    top: -10px;
                    right: 20px;
                    width: 10px;
                    height: 10px;
                    border-left: .21333rem solid transparent;
                    border-right: .21333rem solid transparent;
                    border-bottom: .21333rem solid #fff;
                }
                li{
                    padding-left: 30px;
                    height: 75px;
                    line-height: 75px;
                    color: dimgrey;
                    text-align: left;
                    i{
                        text-indent: 10px;
                        font-size: 24px;
                        color:#ff7919;
                    }
                }
            }
        }
        .search-wrap{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 22;
            background-color: #fff;
        }
        .topWrap{
            width: 100%;
            height: 75px;
            overflow: hidden;
            .topbar{
                margin-left: 30px;
                height: 75px;
                display: flex;
                width: 1200px;
                li{
                    height: 69px;
                    padding: 0 28px;
                    line-height: 75px;
                    &.active{
                        border-bottom: 1px solid orangered;
                        color: orangered;
                    }
                }



            }
        }
        .splite{
            height: 10px;
            width: 100%;
            background-color: #F1F2F1;
        }
        .listWrap{
            height: 1050px;
            overflow: hidden;
        }
    }
</style>
